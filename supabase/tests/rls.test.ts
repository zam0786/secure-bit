// RLS integration tests for contact_submissions / user_roles.
//
// NOT run as part of `npm test` (see vitest.config.ts's `include`) and NOT executed by
// Claude when this file was written -- there is no Docker / live Postgres available in
// that sandbox. This suite requires an actual running Supabase instance with the current
// migrations applied. To run it locally:
//
//   supabase start                     # starts local Postgres + Auth + API via Docker
//   supabase db reset                  # applies all migrations in supabase/migrations/
//   SUPABASE_URL=http://127.0.0.1:54321 \
//   SUPABASE_ANON_KEY=<local anon key printed by `supabase start`> \
//   SUPABASE_SERVICE_ROLE_KEY=<local service_role key printed by `supabase start`> \
//   npx vitest run supabase/tests/rls.test.ts
//
// (The local anon/service_role keys are fixed, well-known values Supabase CLI prints on
// every `supabase start` for local dev -- they are NOT your production keys and are safe
// to use here.)
//
// Verifies exactly the access matrix the security review asked for:
//   anon:                 INSERT allow (valid row) / SELECT deny / UPDATE deny / DELETE deny
//   authenticated non-admin: SELECT deny / UPDATE deny
//   authenticated admin:     SELECT allow / UPDATE allow
//   non-admin cannot self-elevate via user_roles

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const canRun = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_ROLE_KEY);

// Skips the whole suite with a clear message instead of failing noisily when the local
// Supabase env vars aren't set (e.g. when `npm test` runs in CI without `supabase start`).
const maybeDescribe = canRun ? describe : describe.skip;

maybeDescribe("contact_submissions RLS", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let adminUserClient: SupabaseClient;
  let nonAdminUserClient: SupabaseClient;
  let adminUserId: string;
  let nonAdminUserId: string;
  let insertedId: string;

  const adminEmail = `rls-admin-${Date.now()}@example.test`;
  const nonAdminEmail = `rls-user-${Date.now()}@example.test`;
  const password = "correct-horse-battery-staple-1";

  beforeAll(async () => {
    admin = createClient(SUPABASE_URL!, SERVICE_ROLE_KEY!);
    anon = createClient(SUPABASE_URL!, ANON_KEY!);

    const { data: adminUser, error: adminErr } = await admin.auth.admin.createUser({
      email: adminEmail,
      password,
      email_confirm: true,
    });
    if (adminErr) throw adminErr;
    adminUserId = adminUser.user.id;

    const { data: nonAdminUser, error: nonAdminErr } = await admin.auth.admin.createUser({
      email: nonAdminEmail,
      password,
      email_confirm: true,
    });
    if (nonAdminErr) throw nonAdminErr;
    nonAdminUserId = nonAdminUser.user.id;

    const { error: roleErr } = await admin
      .from("user_roles")
      .insert({ user_id: adminUserId, role: "admin" });
    if (roleErr) throw roleErr;

    adminUserClient = createClient(SUPABASE_URL!, ANON_KEY!);
    await adminUserClient.auth.signInWithPassword({ email: adminEmail, password });

    nonAdminUserClient = createClient(SUPABASE_URL!, ANON_KEY!);
    await nonAdminUserClient.auth.signInWithPassword({ email: nonAdminEmail, password });
  });

  afterAll(async () => {
    if (insertedId) {
      await admin.from("contact_submissions").delete().eq("id", insertedId);
    }
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
    if (nonAdminUserId) await admin.auth.admin.deleteUser(nonAdminUserId);
  });

  it("allows anon to INSERT a valid submission", async () => {
    const { data, error } = await anon
      .from("contact_submissions")
      .insert({
        name: "Test Visitor",
        email: "visitor@example.test",
        company: "Example Co",
        message: "This is a valid test message.",
      })
      .select("id")
      .single();

    expect(error).toBeNull();
    expect(data?.id).toBeTruthy();
    insertedId = data!.id;
  });

  it("rejects anon INSERT with an invalid email format", async () => {
    const { error } = await anon.from("contact_submissions").insert({
      name: "Test Visitor",
      email: "not-an-email",
      company: "Example Co",
      message: "This is a valid test message.",
    });
    expect(error).not.toBeNull();
  });

  it("rejects anon INSERT with CRLF in the name", async () => {
    const { error } = await anon.from("contact_submissions").insert({
      name: "Test\r\nBcc:attacker@evil.example",
      email: "visitor@example.test",
      company: "Example Co",
      message: "This is a valid test message.",
    });
    expect(error).not.toBeNull();
  });

  it("denies anon SELECT", async () => {
    const { data, error } = await anon.from("contact_submissions").select("*");
    // RLS denial surfaces as an empty result set, not necessarily a thrown error.
    expect(error).toBeNull();
    expect(data).toEqual([]);
  });

  it("denies anon UPDATE", async () => {
    const { data } = await anon
      .from("contact_submissions")
      .update({ handled_at: new Date().toISOString() })
      .eq("id", insertedId)
      .select();
    expect(data).toEqual([]);
  });

  it("denies anon DELETE", async () => {
    const { data } = await anon.from("contact_submissions").delete().eq("id", insertedId).select();
    expect(data).toEqual([]);
    // Confirm it's actually still there via the service-role client.
    const { data: stillThere } = await admin
      .from("contact_submissions")
      .select("id")
      .eq("id", insertedId)
      .maybeSingle();
    expect(stillThere?.id).toBe(insertedId);
  });

  it("denies SELECT for an authenticated non-admin", async () => {
    const { data, error } = await nonAdminUserClient.from("contact_submissions").select("*");
    expect(error).toBeNull();
    expect(data).toEqual([]);
  });

  it("denies UPDATE for an authenticated non-admin", async () => {
    const { data } = await nonAdminUserClient
      .from("contact_submissions")
      .update({ handled_at: new Date().toISOString() })
      .eq("id", insertedId)
      .select();
    expect(data).toEqual([]);
  });

  it("allows SELECT for an authenticated admin", async () => {
    const { data, error } = await adminUserClient
      .from("contact_submissions")
      .select("id")
      .eq("id", insertedId);
    expect(error).toBeNull();
    expect(data?.length).toBe(1);
  });

  it("allows UPDATE for an authenticated admin", async () => {
    const { data, error } = await adminUserClient
      .from("contact_submissions")
      .update({ handled_at: new Date().toISOString(), handled_by: adminUserId })
      .eq("id", insertedId)
      .select();
    expect(error).toBeNull();
    expect(data?.length).toBe(1);
  });

  it("prevents a non-admin from inserting their own admin role (self-elevation)", async () => {
    const { error } = await nonAdminUserClient
      .from("user_roles")
      .insert({ user_id: nonAdminUserId, role: "admin" });
    // Expect this to fail outright (no INSERT grant to authenticated on user_roles at all).
    expect(error).not.toBeNull();
  });

  it("prevents a non-admin from updating their own role via any exposed path", async () => {
    const { data } = await nonAdminUserClient
      .from("user_roles")
      .update({ role: "admin" })
      .eq("user_id", nonAdminUserId)
      .select();
    expect(data).toEqual([]);
  });
});
