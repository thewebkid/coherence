# Auth — Clerk

## Decision: staging-only, 2-person admin access

Clerk is used **exclusively for the admin panel** (`/admin`). It is not used for any public-facing feature. There are no user accounts, no sign-up flows, and no session management for visitors.

The authorized email list is hard-coded in `api/_clerk-auth.js`:

```js
const ALLOWED_EMAILS = [
  'iamthewebkid@gmail.com',
  'mahunahi@gmail.com',
  'kid@thewebkid.com',
];
```

Anyone who authenticates via Clerk but whose email is not on this list receives a `403 Forbidden`. Adding a third person means adding their email here — there is intentionally no self-service or role system.

---

## Test instance — do not change

After significant debugging, it was decided to use the **Clerk test instance** permanently, even in the production admin panel. The test instance is sufficient for a 2-person private admin flow and avoids the overhead and risk of managing a production Clerk instance for this use case.

**The Clerk keys are intentionally kept as test keys:**
- `VITE_CLERK_PUBLISHABLE_KEY` — `pk_test_...` in `.env.local`
- `CLERK_SECRET_KEY` — `sk_test_...` in `.env.local`

**These are NOT stored as Vercel Development env vars** — they are manually maintained in `.env.local`. Running `vercel env pull` will remove them from the local file. After any pull, add them back manually from the previous `.env.local` backup (or from your password manager).

Do not promote Clerk to a production instance. Do not move the keys to Vercel env. The current setup works and has been stable.

---

## How verification works

Every admin API endpoint calls `verifyAdminAuth` from `api/_clerk-auth.js` as its first step:

```js
import { verifyAdminAuth } from '../_clerk-auth.js';

export default async function handler(req, res) {
  const admin = await verifyAdminAuth(req, res);
  if (!admin) return; // response already sent
  // ... proceed
}
```

`verifyAdminAuth`:
1. Reads the `Authorization: Bearer <token>` header
2. Verifies the JWT against `CLERK_SECRET_KEY` using `@clerk/backend`
3. Looks up the user in Clerk to get their email address
4. Checks the email against `ALLOWED_EMAILS`
5. Returns `{ userId, email }` on success, or sends a `401`/`403` and returns `null`

The frontend Vue admin page (`/admin`) uses `@clerk/vue` to sign in and attach the session token to all API requests.

---

## Dev server

The Vite dev server (`vite.config.js`) contains a parallel implementation of `verifyAdminAuth` inline in the middleware, using the same Clerk SDK. This ensures admin-protected endpoints behave identically in dev and production.

The dev implementation also has an `authorizedParties` restriction to `http://localhost:5777`.
