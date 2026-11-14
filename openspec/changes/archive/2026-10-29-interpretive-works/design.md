## Context

The site is a Vue 3 + Vite SPA deployed via Vercel, using `vite-ssg` for static generation. Pages live under `src/pages/`, routing via Vue Router (`src/router/index.js`), styled with SCSS and CSS custom properties. The `api/` directory holds Vercel serverless functions using `@neondatabase/serverless` (pooled via `POSTGRES_URL`) for Neon Postgres and plain `fetch` for Upstash Redis.

Clerk has already been connected to the Vercel project and to the production domain (`coherenceacrossscales.org`). `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` are in `.env.local`. Clerk requires the frontend key to be exposed via `VITE_CLERK_PUBLISHABLE_KEY` (Vite exposes only `VITE_`-prefixed vars to the browser; `NEXT_PUBLIC_` is a Next.js convention only).

---

## Goals / Non-Goals

**Goals:**
- Ship `/interpretive-works`, `/interpretive-works/[slug]`, and `/submit-work` public pages with placeholder content for first-pass layout/design
- First real work ("The Practice of Seeing") hand-coded as a Vue component; assets already in `public/img/`
- Google-only admin auth via Clerk; allowlisted to two specific Gmail addresses; 2FA = Google account 2FA
- `interpretive_work_submissions` Neon table with full status lifecycle
- Vercel serverless APIs: public submit-work endpoint and protected admin submissions endpoint
- Admin panel at `/admin` with list/filter, detail view, content viewer/download, internal notes, status actions (approve/decline/archive)
- Optional email notification to admins on new submission (Resend free tier: 3k/month)

**Non-Goals:**
- No published-works database table; works are hand-coded after approval (v1)
- No automated reply to submitters; admins respond manually via submitter email
- No CDN setup for large files in v1; content linked via URL or noted as "file attached" in submission notes
- No Vercel Team tier; stays on Hobby
- No per-submitter accounts

---

## Decisions

### 1. Auth: Clerk `@clerk/vue` + email allowlist

**Decision:** Use `@clerk/vue` on the frontend with `VITE_CLERK_PUBLISHABLE_KEY`. Protect admin API routes server-side by verifying the Clerk session token with `CLERK_SECRET_KEY` and checking that the resolved email is in the allowlist `['iamthewebkid@gmail.com', 'mahunahi@gmail.com']`.

**Rationale:** Clerk is already provisioned and connected to Vercel. `@clerk/vue` provides `useAuth()`, `useUser()`, and `<SignIn>` components out of the box. Rolling a custom Google OAuth backend (code exchange, session cookies, verification middleware) would require multiple new serverless routes with equivalent complexity but no reuse benefit.

**Alternatives considered:**
- Supabase Auth: also free, but adds a separate project and `@supabase/supabase-js` dependency. No advantage when Clerk is already set up.
- Custom Google OAuth: same end result (Google sign-in, session cookie), more code, no saved dependencies.

**Allowlist enforcement:** Checked in every admin API route handler before processing the request. Not enforced via Clerk dashboard (no need to configure allowlists there). If the signed-in user's email is not in the allowlist, return `403`.

**vite-ssg exclusion:** The `/admin` route must not be SSG'd (it's authenticated, dynamic). Add `/admin` to `vite-ssg`'s `excludeRoutes` or configure `includeAllRoutes: false` and explicitly include only public routes.

### 2. Neon table: `interpretive_work_submissions`

**Decision:** Single table, status lifecycle via a `status` TEXT column.

```sql
CREATE TABLE IF NOT EXISTS interpretive_work_submissions (
  id                   SERIAL PRIMARY KEY,
  submitter_name       TEXT NOT NULL,
  submitter_email      TEXT NOT NULL,
  display_name_consent BOOLEAN NOT NULL DEFAULT FALSE,
  work_title           TEXT NOT NULL,
  work_type            TEXT NOT NULL,      -- 'Visual Art' | 'Writing' | 'Video' | 'Music' | 'Other'
  work_description     TEXT NOT NULL,
  work_url             TEXT,               -- link to external content
  work_file_info       TEXT,               -- filename/notes if a physical file was described
  status               TEXT NOT NULL DEFAULT 'unread',  -- 'unread' | 'approved' | 'declined' | 'archived'
  admin_notes          TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Rationale:** Same DB as observations (`POSTGRES_URL`). No new infrastructure. Status as a TEXT column with a known enum set is simple and queryable. `display_name_consent` is a boolean (not storing two separate name fields; the submitted name is always stored internally, consent determines whether it may be shown publicly).

**Migration:** New script `scripts/migrate-interpretive-works.js` using `DATABASE_URL_UNPOOLED` (direct connection required for DDL), mirroring the existing `scripts/migrate-observations.js` pattern.

### 3. Vercel serverless API design

**`POST /api/submit-work`** — public, no auth  
- Validates required fields, writes to `interpretive_work_submissions` with `status = 'unread'`  
- Optionally sends admin notification email via Resend (if `RESEND_API_KEY` is set; degrades gracefully if not)  
- Returns `{ success: true }` or error

**`GET /api/admin/submissions`** — Clerk-verified, email-allowlisted  
- Query params: `status` filter (`unread` / `approved` / `declined` / `archived` / `all`)  
- Returns array of submission rows

**`PATCH /api/admin/submissions`** — Clerk-verified, email-allowlisted  
- Body: `{ id, status?, adminNotes? }`  
- Updates `status` and/or `admin_notes`, sets `updated_at = NOW()`  
- Returns updated row

**Auth verification pattern (all admin routes):**
```js
import { createClerkClient } from '@clerk/backend';
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// In handler:
const token = req.headers.authorization?.replace('Bearer ', '');
const { sub } = await clerk.verifyToken(token);
const user = await clerk.users.getUser(sub);
const email = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;
if (!['iamthewebkid@gmail.com', 'mahunahi@gmail.com'].includes(email)) {
  return res.status(403).json({ error: 'Forbidden' });
}
```

### 4. Admin panel: client-side Vue component

**Decision:** `/admin` is a standard Vue SPA route (not SSG'd). Clerk's `useAuth()` guards navigation client-side; the API also guards server-side. Content viewer renders by `work_type` — images via `<img>`, URLs as links/embeds, text inline. Download link for anything with a URL.

**No admin router middleware complexity:** Since there are only two admins and this is a protected page, a simple `beforeEnter` navigation guard on the `/admin` route checking `useAuth().isSignedIn` (and redirecting to `/admin/sign-in` if not) is sufficient.

### 5. Interpretive Works public pages

**Decision:** `/interpretive-works` and `/interpretive-works/[slug]` are SSG'd static pages. Content for "The Practice of Seeing" is hand-coded as a Vue component (asset in `public/img/Practice-of-Seeing.jpg`, thumbnail at `public/img/Practice-of-Seeing-thumb.jpg`). The slug template is built to support multiple media types via a flexible `<WorkContent>` component driven by a `type` prop.

**Design tone:** Slightly warmer background (`--color-bg-warm: #faf9f7` light / `#1a1916` dark), more generous line spacing for prose, same navigation/grid/typography family as the rest of the site.

---

## Risks / Trade-offs

- **`VITE_CLERK_PUBLISHABLE_KEY` missing** → Frontend can't initialize Clerk. Mitigation: add to `.env.local` and Vercel environment variables; note in migration steps.
- **vite-ssg SSG'ing `/admin`** → Generates a static shell that briefly renders before auth check; not a security risk (APIs guard data), but could flash. Mitigation: exclude `/admin` from SSG routes via config.
- **No file upload in v1** → Submitters can only link to externally hosted content. Mitigation: `work_file_info` text field lets them describe physical files; CDN/upload added in a later change.
- **Resend API key optional** → If not configured, no email notification; admin checks panel manually. Mitigation: graceful degradation; add `RESEND_API_KEY` to env when ready.
- **Status as TEXT** → No DB-level enum constraint. Mitigation: validate in API handler before write.

---

## Migration Plan

1. Add `VITE_CLERK_PUBLISHABLE_KEY` to `.env.local` and Vercel environment variables (same value as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
2. Run `node scripts/migrate-interpretive-works.js` to create the Neon table
3. Deploy: Vercel picks up new API routes and env vars automatically
4. Verify sign-in at `/admin` with both admin Gmail accounts before announcing

## Open Questions

- **Email notification**: Include Resend setup in v1 tasks, or defer? (Recommended: include as optional; `RESEND_API_KEY` in env, degrades gracefully without it)
- **`/submit-work` file uploads**: For v1 submitters link externally; confirm this is acceptable before launch
