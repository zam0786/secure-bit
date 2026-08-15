// Sends an email notification via Microsoft Graph whenever a new row is inserted into
// contact_submissions. Triggered by a Supabase Database Webhook (Database > Webhooks)
// configured to fire on INSERT for that table.
//
// SECURITY NOTES (read before changing):
// - The webhook secret check is fail-closed: if WEBHOOK_SECRET is not configured, or the
//   caller doesn't supply a matching one, the request is rejected. There is no "if configured"
//   bypass.
// - The request body is validated at runtime (not just cast to a TS type) before any of it
//   is used.
// - Idempotency is enforced with an atomic DB claim (UPDATE ... WHERE notified_at IS NULL)
//   using the service-role key, so two concurrent/duplicate webhook deliveries for the same
//   row cannot both send an email.
// - Errors returned to the caller are always generic. Diagnostic detail (Graph error bodies,
//   tenant/client IDs, etc.) is only ever written to console.error (server-side logs).
//
// Required Edge Function secrets (Supabase Dashboard > Edge Functions > notify-submission > Secrets):
//   MS_TENANT_ID     - Azure AD tenant ID
//   MS_CLIENT_ID     - App registration (application) client ID
//   MS_CLIENT_SECRET - App registration client secret value
//   MS_SENDER_EMAIL  - Dedicated SecureBit mailbox to send from (not a personal mailbox)
//   NOTIFY_TO_EMAIL  - Where the notification should land (defaults to MS_SENDER_EMAIL if unset)
//   WEBHOOK_SECRET   - Shared secret; must match the "x-webhook-secret" header on the webhook
//
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically by the Supabase Edge
// Functions runtime -- do not set them manually as function secrets.

import { createClient } from "npm:@supabase/supabase-js@2";
import { timingSafeEqual } from "node:crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-webhook-secret",
};

const GENERIC_ERROR = { error: "Internal server error" };

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** Constant-time secret comparison. Falls back to a safe "always false" on any error
 *  (e.g. mismatched lengths handled internally) rather than throwing. */
function secretsMatch(a: string, b: string): boolean {
  const aBuf = new TextEncoder().encode(a);
  const bBuf = new TextEncoder().encode(b);
  if (aBuf.length !== bBuf.length) return false;
  try {
    return timingSafeEqual(aBuf, bBuf);
  } catch {
    return false;
  }
}

interface SubmissionRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  topic: string | null;
  message: string;
  created_at: string;
}

const CRLF = /[\r\n]/;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/** Real runtime validation of the webhook body. Never trust a bare `as` cast on
 *  attacker-reachable input -- this function is invoked over HTTP. */
function validatePayload(body: unknown): { record: SubmissionRecord } | { error: string } {
  if (typeof body !== "object" || body === null) return { error: "invalid body" };
  const b = body as Record<string, unknown>;

  if (b.type !== "INSERT") return { error: "unsupported event type" };
  if (b.table !== "contact_submissions") return { error: "unsupported table" };

  const r = b.record;
  if (typeof r !== "object" || r === null) return { error: "missing record" };
  const rec = r as Record<string, unknown>;

  const id = rec.id;
  const name = rec.name;
  const email = rec.email;
  const company = rec.company;
  const phone = rec.phone ?? null;
  const topic = rec.topic ?? null;
  const message = rec.message;
  const createdAt = rec.created_at;

  if (typeof id !== "string" || id.length === 0 || id.length > 64) {
    return { error: "invalid id" };
  }
  if (typeof name !== "string" || name.length < 1 || name.length > 100 || CRLF.test(name)) {
    return { error: "invalid name" };
  }
  if (typeof email !== "string" || email.length > 255 || !EMAIL_RE.test(email) || CRLF.test(email)) {
    return { error: "invalid email" };
  }
  if (typeof company !== "string" || company.length < 1 || company.length > 100 || CRLF.test(company)) {
    return { error: "invalid company" };
  }
  if (phone !== null && (typeof phone !== "string" || phone.length > 30 || CRLF.test(phone))) {
    return { error: "invalid phone" };
  }
  if (topic !== null && (typeof topic !== "string" || topic.length > 100 || CRLF.test(topic))) {
    return { error: "invalid topic" };
  }
  if (typeof message !== "string" || message.length < 1 || message.length > 1000) {
    return { error: "invalid message" };
  }
  if (typeof createdAt !== "string") {
    return { error: "invalid created_at" };
  }

  return {
    record: {
      id,
      name,
      email,
      company,
      phone: phone as string | null,
      topic: topic as string | null,
      message,
      created_at: createdAt,
    },
  };
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

  const subject = `New contact form submission — ${record.name} (${record.company})`;
  const bodyLines = [
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Company: ${record.company}`,
    record.phone ? `Phone: ${record.phone}` : null,
    record.topic ? `Topic: ${record.topic}` : null,
    `Submitted: ${new Date(record.created_at).toLocaleString()}`,
    "",
    "Message:",
    record.message,
    "",
    "— Sent automatically from securebit.ca",
  ].filter((line): line is string => line !== null);

  // The sender is always the configured SecureBit mailbox. The visitor's email is only
  // ever used as Reply-To, and only after passing the strict format + CRLF checks above.
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
          body: { contentType: "Text", content: bodyLines.join("\n") },
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(GENERIC_ERROR, 405);
  }

  // --- Fail-closed webhook auth. No "if configured" bypass. ---
  const expectedSecret = Deno.env.get("WEBHOOK_SECRET");
  if (!expectedSecret) {
    console.error("WEBHOOK_SECRET is not configured; rejecting all requests");
    return jsonResponse(GENERIC_ERROR, 500);
  }
  const providedSecret = req.headers.get("x-webhook-secret");
  if (!providedSecret || !secretsMatch(providedSecret, expectedSecret)) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  // --- Parse + validate body at runtime. ---
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const validated = validatePayload(rawBody);
  if ("error" in validated) {
    return jsonResponse({ error: "Invalid request" }, 400);
  }
  const { record } = validated;

  // --- Idempotency: atomically claim this row before sending. ---
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY not available to the function");
    return jsonResponse(GENERIC_ERROR, 500);
  }
  const admin = createClient(supabaseUrl, serviceRoleKey);

  const { data: claimed, error: claimError } = await admin
    .from("contact_submissions")
    .update({ notified_at: new Date().toISOString() })
    .eq("id", record.id)
    .is("notified_at", null)
    .select("id")
    .maybeSingle();

  if (claimError) {
    console.error("Idempotency claim failed", claimError);
    return jsonResponse(GENERIC_ERROR, 500);
  }

  if (!claimed) {
    // Row was already claimed (already notified) -- this is a duplicate delivery.
    // Not an error; just don't send a second email.
    return jsonResponse({ sent: false, reason: "already notified" });
  }

  try {
    await sendNotificationEmail(record);
  } catch (error) {
    // Detailed diagnostics stay server-side only.
    console.error("Notification send failed for submission", record.id, error);
    return jsonResponse(GENERIC_ERROR, 502);
  }

  return jsonResponse({ sent: true });
});
