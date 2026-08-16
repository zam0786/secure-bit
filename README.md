# SecureBit

The source for [securebit.ca](https://securebit.ca) — SecureBit Inc.'s cybersecurity
consulting website.

## Development

You need Node.js 22+ and npm installed.

```sh
git clone https://github.com/zam0786/secure-bit.git
cd secure-bit
npm install
npm run dev
```

## Build & checks

```sh
npm run typecheck   # TypeScript, no emit
npm run lint         # ESLint
npm run build        # production build
```

## Deploy

Deploys automatically to Cloudflare Workers on push to `main` via GitHub Actions
(`.github/workflows/deploy.yml`).

## Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Router
- Supabase (Postgres, Auth, Edge Functions)
- Cloudflare Workers (static assets + SPA routing)

## Admin access (`/submissions`)

The `/submissions` page lets a signed-in admin review contact form leads. There is
intentionally **no public sign-up** for this portal — access is controlled entirely at
the database layer via Postgres Row-Level Security and a `user_roles` table, not by the
frontend.

**To create the first (or any) administrator:**

1. In the Supabase Dashboard, go to **Authentication → Users** and create the user
   (email + password), or have them sign in once via "Continue with Google" so their
   `auth.users` row exists.
2. In the **SQL Editor**, run:
   ```sql
   insert into public.user_roles (user_id, role)
   values ('<their auth.users id>', 'admin');
   ```
   This can only be done with elevated (service_role / SQL editor) access — regular
   authenticated users have no permission to insert into `user_roles` themselves.
3. They can now sign in at `/auth` and will have access to `/submissions`.

## Contact form notifications (Microsoft 365 / Graph)

`supabase/functions/notify-submission` sends an email via Microsoft Graph whenever a
new contact form row is inserted, triggered by a Supabase Database Webhook. See the
comment block at the top of that file for required secrets and setup steps.

**Notification reliability.** A row moves through `notification_status`:
`pending` → `claimed` → `sent` (success, terminal) or `failed` (retryable, up to 5
attempts, then terminal). The claim is atomic and lease-based (5 minute lease), so two
concurrent webhook deliveries for the same row can never both send an email, but a
transient Graph failure doesn't silently lose the notification either -- it just sits
as `failed`/`claimed-but-stale` until the next sweep retries it.

**Retry sweep.** The webhook only fires on INSERT, so something needs to periodically
retry rows stuck in `claimed` (past their lease) or `failed` (with attempts remaining).
Call the function in sweep mode on a schedule -- e.g. every 5 minutes -- via
`POST https://<project-ref>.functions.supabase.co/notify-submission?mode=sweep` with the
same `x-webhook-secret` header. Either:
- Supabase's built-in Cron (Dashboard → Integrations → Cron) pointed at that URL, or
- `pg_cron` + `pg_net` calling it from Postgres directly, or
- Any external scheduler (e.g. a scheduled GitHub Actions workflow) hitting that URL.

If a submission has failed 5 times, it stays `failed` permanently and shows a "notification
failed" badge on `/submissions` so a human notices and can follow up manually.

**Least-privilege mailbox scoping.** `Mail.Send` as an Application permission is
tenant-wide by default -- the app could send as *any* mailbox in the org, not just the
SecureBit contact mailbox. Restrict it with an Exchange Online **Application Access
Policy** so it can only send as the one mailbox this function actually uses:

```powershell
# Run in Exchange Online PowerShell (Connect-ExchangeOnline first)
New-DistributionGroup -Name "SecureBit Graph Senders" -Members contact@securebit.ca
New-ApplicationAccessPolicy `
  -AppId <MS_CLIENT_ID> `
  -PolicyScopeGroupId "SecureBit Graph Senders" `
  -AccessRight RestrictAccess `
  -Description "Restrict notify-submission app to the SecureBit contact mailbox only"
```

Verify it worked with `Test-ApplicationAccessPolicy -AppId <MS_CLIENT_ID> -Identity contact@securebit.ca`
(should report access granted) and again with a different mailbox in your tenant (should
report denied).

## Testing

```sh
npm test              # unit tests (webhook secret comparison, payload validation) -- run in CI
```

`supabase/tests/rls.test.ts` covers the actual Postgres RLS access matrix (anon
insert-only, non-admin denied, admin allowed, no self-elevation via `user_roles`) but
needs a real Postgres instance, so it's skipped automatically when the required env vars
aren't set (including in CI). To run it locally:

```sh
supabase start
supabase db reset
SUPABASE_URL=http://127.0.0.1:54321 \
SUPABASE_ANON_KEY=<local anon key from `supabase start` output> \
SUPABASE_SERVICE_ROLE_KEY=<local service_role key from `supabase start` output> \
npx vitest run supabase/tests/rls.test.ts
```

