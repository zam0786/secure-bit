// Pure, runtime-agnostic logic for notify-submission. Deliberately has ZERO Deno-specific
// globals (no Deno.env, no Deno.serve) so it can be unit-tested under Vitest/Node as well as
// imported directly by the Deno-runtime Edge Function. Keep it that way.
import { timingSafeEqual } from "node:crypto";

export interface SubmissionRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  topic: string | null;
  message: string;
  created_at: string;
}

export type ValidationResult =
  | { ok: true; record: SubmissionRecord }
  | { ok: false; error: string };

const CRLF = /[\r\n]/;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/** Constant-time secret comparison. Returns false (never throws) on any mismatch,
 *  including a length mismatch, so callers can't distinguish failure reasons by timing
 *  or by catching an exception. */
export function secretsMatch(a: string, b: string): boolean {
  const aBuf = new TextEncoder().encode(a);
  const bBuf = new TextEncoder().encode(b);
  if (aBuf.length !== bBuf.length) return false;
  try {
    return timingSafeEqual(aBuf, bBuf);
  } catch {
    return false;
  }
}

/** Real runtime validation of the webhook body. Never trust a bare `as` type cast on
 *  attacker-reachable input -- this is invoked over HTTP by (nominally) the Supabase
 *  Database Webhook, but the function has no way to prove that beyond the shared secret,
 *  so the body must still be validated as untrusted input. */
export function validatePayload(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) return { ok: false, error: "invalid body" };
  const b = body as Record<string, unknown>;

  if (b.type !== "INSERT") return { ok: false, error: "unsupported event type" };
  if (b.table !== "contact_submissions") return { ok: false, error: "unsupported table" };

  const r = b.record;
  if (typeof r !== "object" || r === null) return { ok: false, error: "missing record" };
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
    return { ok: false, error: "invalid id" };
  }
  if (typeof name !== "string" || name.length < 1 || name.length > 100 || CRLF.test(name)) {
    return { ok: false, error: "invalid name" };
  }
  if (
    typeof email !== "string" ||
    email.length > 255 ||
    !EMAIL_RE.test(email) ||
    CRLF.test(email)
  ) {
    return { ok: false, error: "invalid email" };
  }
  if (
    typeof company !== "string" ||
    company.length < 1 ||
    company.length > 100 ||
    CRLF.test(company)
  ) {
    return { ok: false, error: "invalid company" };
  }
  if (phone !== null && (typeof phone !== "string" || phone.length > 30 || CRLF.test(phone))) {
    return { ok: false, error: "invalid phone" };
  }
  if (topic !== null && (typeof topic !== "string" || topic.length > 100 || CRLF.test(topic))) {
    return { ok: false, error: "invalid topic" };
  }
  if (typeof message !== "string" || message.length < 1 || message.length > 1000) {
    return { ok: false, error: "invalid message" };
  }
  if (typeof createdAt !== "string") {
    return { ok: false, error: "invalid created_at" };
  }

  return {
    ok: true,
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

/** Builds the plain-text Graph message body for a submission. Pulled out so tests can
 *  assert on content (e.g. that a visitor's message can't inject extra header-like lines)
 *  without needing a live Graph connection. */
export function buildNotificationEmail(record: SubmissionRecord) {
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

  return { subject, body: bodyLines.join("\n") };
}
