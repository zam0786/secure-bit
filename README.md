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
