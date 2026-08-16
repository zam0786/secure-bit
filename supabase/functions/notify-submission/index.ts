// Sends an email notification via Microsoft Graph for contact_submissions rows.
//
// Two invocation modes:
//   1. Webhook mode (default): a Supabase Database Webhook fires on INSERT and posts the
//      new row here. We validate + claim + send for that single row.
//   2. Sweep mode (?mode=sweep): intended to be called on a schedule (e.g. every 5 minutes
//      via pg_cron + pg_net, or an external scheduler). Finds rows stuck in a "claimed" state
//      past their lease, or "failed" with attempts remaining, and retries them. This is what
//      prevents a transient Graph failure from silently losing a notification forever --
//      see the comment block in the migration file for the full state machine.
//
// SECURITY NOTES:
// - The webhook secret check is fail-closed in both modes: if WEBHOOK_SECRET is not
//   configured, or the caller doesn't supply a matching one, the request is rejected.
// - The request body is validated at runtime (validate.ts), not just cast to a TS type,
//   before any of it is used.
// - Idempotency + retry is enforced via an atomic DB claim (see
//   claim_contact_submission_for_notification in the migration), so concurrent/duplicate
//   invocations for the same row cannot both send an email, while a genuinely failed send
//   can still be retried later rather than being silently lost.
// - Errors returned to the caller are always generic. Diagnostic detail (Graph error
//   bodies, tenant/client IDs, etc.) is only ever written to console.error (server-side).
//
// Required Edge Function secrets (Supabase Dashboard > Edge Functions > notify-submission > Secrets):
//   MS_TENANT_ID     - Azure AD tenant ID
//   MS_CLIENT_ID     - App registration (application) client ID
//   MS_CLIENT_SECRET - App registration client secret value
//   MS_SENDER_EMAIL  - Dedicated SecureBit mailbox to send from (not a personal mailbox)
//   NOTIFY_TO_EMAIL  - Where the notification should land (defaults to MS_SENDER_EMAIL if unset)
//   WEBHOOK_SECRET   - Shared secret; must match the "x-webhook-secret" header
//
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically by the Supabase Edge
// Functions runtime -- do not set them manually as function secrets.

import { createClient } from "npm:@supabase/supabase-js@2";
import { secretsMatch, validatePayload, buildNotificationEmail, type SubmissionRecord } from "./validate.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-webhook-secret",
};

const GENERIC_ERROR = { error: "Internal server error" };
const LEASE_SECONDS = 300;
const MAX_ATTEMPTS = 5;
const SWEEP_BATCH_LIMIT = 20;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function getGraphAccessToken(): Promise<string> {
  const tenantId = Deno.env.get("MS_TENANT_ID");
  const clientId = Deno.env.get("MS_CLIENT_ID");
  const clientSecret = Deno.env.get("MS_CLIENT_SECRET");
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Graph credentials are not configured");
  }

  const tokenRes = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  );

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    console.error("Graph token request failed", tokenRes.status, text);
    throw new Error("Graph auth failed");
  }

  const data = await tokenRes.json();
  return data.access_token as string;
}

async function sendNotificationEmail(record: SubmissionRecord) {
  const senderEmail = Deno.env.get("MS_SENDER_EMAIL");
  const notifyTo = Deno.env.get("NOTIFY_TO_EMAIL") ?? senderEmail;
  if (!senderEmail || !notifyTo) {
    throw new Error("MS_SENDER_EMAIL is not configured");
  }

  const accessToken = await getGraphAccessToken();
  const { subject, body } = buildNotificationEmail(record);

  // The sender is always the configured SecureBit mailbox. The visitor's email is only
  // ever used as Reply-To, and only after passing the strict format + CRLF checks in
  // validate.ts.
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(senderEmail)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: "Text", content: body },
          toRecipients: [{ emailAddress: { address: notifyTo } }],
          replyTo: [{ emailAddress: { address: record.email, name: record.name } }],
        },
        saveToSentItems: true,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Graph sendMail failed", res.status, text);
    throw new Error("Graph sendMail failed");
  }
}

/** Attempts to claim `id` for notification, and if claimed, sends the email and records
 *  the outcome. Returns a short status string for logging/summary purposes. Never throws --
 *  all failure paths are caught and recorded on the row itself. */
async function claimAndNotify(
  // Deno-only file; the full generated Supabase Database type lives in src/ and isn't
  // worth cross-importing here.
  // deno-lint-ignore no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  id: string,
  record: SubmissionRecord | null
): Promise<"sent" | "skipped" | "failed" | "claim_error"> {
  const { data: claimed, error: claimError } = await admin
    .rpc("claim_contact_submission_for_notification", {
      _id: id,
      _lease_seconds: LEASE_SECONDS,
      _max_attempts: MAX_ATTEMPTS,
    })
    .maybeSingle();

  if (claimError) {
    console.error("Claim RPC failed for", id, claimError);
    return "claim_error";
  }
  if (!claimed) {
    // Not eligible: already sent, already validly claimed elsewhere, or attempts exhausted.
    return "skipped";
  }

  // Prefer the record passed in (webhook mode, guaranteed validated); fall back to the
  // claimed row itself (sweep mode, where we didn't receive a webhook body).
  const toSend: SubmissionRecord = record ?? {
    id: claimed.id,
    name: claimed.name,
    email: claimed.email,
    company: claimed.company,
    phone: claimed.phone,
    topic: claimed.topic,
    message: claimed.message,
    created_at: claimed.created_at,
  };

  try {
    await sendNotificationEmail(toSend);
    await admin
      .from("contact_submissions")
      .update({ notification_status: "sent", notified_at: new Date().toISOString() })
      .eq("id", id);
    return "sent";
  } catch (error) {
    console.error("Notification send failed for submission", id, error);
    const message = error instanceof Error ? error.message : "unknown error";
    await admin
      .from("contact_submissions")
      .update({ notification_status: "failed", last_notification_error: message.slice(0, 500) })
      .eq("id", id);
    return "failed";
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse(GENERIC_ERROR, 405);
  }

  // --- Fail-closed webhook auth. No "if configured" bypass, for both modes. ---
  const expectedSecret = Deno.env.get("WEBHOOK_SECRET");
  if (!expectedSecret) {
    console.error("WEBHOOK_SECRET is not configured; rejecting all requests");
    return jsonResponse(GENERIC_ERROR, 500);
  }
  const providedSecret = req.headers.get("x-webhook-secret");
  if (!providedSecret || !secretsMatch(providedSecret, expectedSecret)) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY not available to the function");
    return jsonResponse(GENERIC_ERROR, 500);
  }
  const admin = createClient(supabaseUrl, serviceRoleKey);

  const url = new URL(req.url);
  const sweep = url.searchParams.get("mode") === "sweep";

  if (sweep) {
    const { data: eligible, error } = await admin.rpc(
      "list_contact_submissions_needing_notification",
      { _lease_seconds: LEASE_SECONDS, _max_attempts: MAX_ATTEMPTS, _limit: SWEEP_BATCH_LIMIT }
    );
    if (error) {
      console.error("Sweep listing failed", error);
      return jsonResponse(GENERIC_ERROR, 500);
    }

    const results = { sent: 0, skipped: 0, failed: 0, claim_error: 0 };
    for (const row of eligible ?? []) {
      const outcome = await claimAndNotify(admin, row.id, null);
      results[outcome]++;
    }
    return jsonResponse({ swept: (eligible ?? []).length, ...results });
  }

  // --- Webhook mode: parse + validate body at runtime, then claim + send. ---
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const validated = validatePayload(rawBody);
  if (!validated.ok) {
    return jsonResponse({ error: "Invalid request" }, 400);
  }

  const outcome = await claimAndNotify(admin, validated.record.id, validated.record);
  if (outcome === "claim_error") return jsonResponse(GENERIC_ERROR, 500);
  if (outcome === "failed") return jsonResponse(GENERIC_ERROR, 502);
  if (outcome === "skipped") return jsonResponse({ sent: false, reason: "not eligible" });
  return jsonResponse({ sent: true });
});
