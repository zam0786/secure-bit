import { describe, it, expect } from "vitest";
import { secretsMatch, validatePayload, buildNotificationEmail } from "./validate";

describe("secretsMatch", () => {
  it("returns true for identical secrets", () => {
    expect(secretsMatch("correct-horse-battery-staple", "correct-horse-battery-staple")).toBe(
      true
    );
  });

  it("returns false for a wrong secret of the same length", () => {
    expect(secretsMatch("aaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbb")).toBe(false);
  });

  it("returns false (not throws) for mismatched lengths", () => {
    expect(() => secretsMatch("short", "a-much-longer-secret-value")).not.toThrow();
    expect(secretsMatch("short", "a-much-longer-secret-value")).toBe(false);
  });

  it("returns false for empty vs non-empty", () => {
    expect(secretsMatch("", "nonempty")).toBe(false);
  });
});

const validRecord = {
  type: "INSERT",
  table: "contact_submissions",
  record: {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Jane Doe",
    email: "jane@example.com",
    company: "Example Co",
    phone: null,
    topic: "Vulnerability Management",
    message: "Interested in a consultation.",
    created_at: "2026-08-15T12:00:00.000Z",
  },
};

describe("validatePayload", () => {
  it("accepts a well-formed webhook payload", () => {
    const result = validatePayload(validRecord);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.record.email).toBe("jane@example.com");
    }
  });

  it("rejects a non-object body", () => {
    expect(validatePayload("not an object").ok).toBe(false);
    expect(validatePayload(null).ok).toBe(false);
    expect(validatePayload(42).ok).toBe(false);
  });

  it("rejects wrong event type", () => {
    const result = validatePayload({ ...validRecord, type: "UPDATE" });
    expect(result.ok).toBe(false);
  });

  it("rejects wrong table", () => {
    const result = validatePayload({ ...validRecord, table: "some_other_table" });
    expect(result.ok).toBe(false);
  });

  it("rejects a missing record", () => {
    const result = validatePayload({ type: "INSERT", table: "contact_submissions" });
    expect(result.ok).toBe(false);
  });

  it("rejects an invalid email format", () => {
    const result = validatePayload({
      ...validRecord,
      record: { ...validRecord.record, email: "not-an-email" },
    });
    expect(result.ok).toBe(false);
  });

  it("rejects CRLF injection in the name field", () => {
    const result = validatePayload({
      ...validRecord,
      record: { ...validRecord.record, name: "Jane\r\nBcc: attacker@evil.example" },
    });
    expect(result.ok).toBe(false);
  });

  it("rejects CRLF injection in the email field", () => {
    const result = validatePayload({
      ...validRecord,
      record: { ...validRecord.record, email: "jane@example.com\r\nBcc:attacker@evil.example" },
    });
    expect(result.ok).toBe(false);
  });

  it("rejects an oversized message", () => {
    const result = validatePayload({
      ...validRecord,
      record: { ...validRecord.record, message: "x".repeat(1001) },
    });
    expect(result.ok).toBe(false);
  });

  it("rejects an empty message", () => {
    const result = validatePayload({
      ...validRecord,
      record: { ...validRecord.record, message: "" },
    });
    expect(result.ok).toBe(false);
  });

  it("accepts null phone/topic (optional fields)", () => {
    const result = validatePayload(validRecord);
    expect(result.ok).toBe(true);
  });

  it("rejects an oversized phone", () => {
    const result = validatePayload({
      ...validRecord,
      record: { ...validRecord.record, phone: "1".repeat(31) },
    });
    expect(result.ok).toBe(false);
  });

  it("rejects a missing/non-string id", () => {
    const result = validatePayload({
      ...validRecord,
      record: { ...validRecord.record, id: 12345 },
    });
    expect(result.ok).toBe(false);
  });
});

describe("buildNotificationEmail", () => {
  it("does not let a visitor's message masquerade as extra headers", () => {
    // validatePayload should already have rejected CRLF by the time this runs, but
    // buildNotificationEmail should still be inert against any newline content that
    // slips through (defense in depth) -- it only ever builds a single plain-text body.
    const { subject, body } = buildNotificationEmail({
      id: "1",
      name: "Jane",
      email: "jane@example.com",
      company: "Example Co",
      phone: null,
      topic: null,
      message: "Line one\nLine two",
      created_at: "2026-08-15T12:00:00.000Z",
    });
    expect(subject).toContain("Jane");
    expect(body).toContain("Line one");
    expect(body).toContain("Line two");
  });
});
