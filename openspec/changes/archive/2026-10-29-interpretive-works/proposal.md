## Why

The site needs a dedicated cultural section — *Interpretive Works* — where curated creative submissions (visual art, essays, video, music) explore themes of the project through interpretation rather than analysis. A companion submission pipeline and admin review panel are required to receive, evaluate, and manage incoming works before they are hand-published to the site.

## What Changes

- Add three public routes: `/interpretive-works` (index), `/interpretive-works/[slug]` (individual work template), `/submit-work` (submission form)
- Wire up Clerk (already connected to Vercel and the project) for Google-only admin authentication, allowlisted to two email addresses
- Create Neon table `interpretive_work_submissions` for incoming submissions
- Add Vercel serverless API for form submission (`api/submit-work.js`) and admin operations (`api/admin/submissions.js`)
- Add protected admin panel at `/admin` for reviewing, annotating, approving, declining, and archiving submissions
- Add Neon migration script for `interpretive_work_submissions` table
- Add `VITE_CLERK_PUBLISHABLE_KEY` env var (Vite requires `VITE_` prefix; `NEXT_PUBLIC_` is only for Next.js)

## Capabilities

### New Capabilities

- `interpretive-works-section`: Public-facing pages — index listing with intro text and submit link; individual work template supporting multiple media types (image, essay, video, music embed); warm visual tone matching the site's design system but slightly softer
- `submission-pipeline`: `/submit-work` form with submitter fields (name, email, optional display-name checkbox, type, description, file/link), Vercel serverless API storing to Neon `interpretive_work_submissions`, optional email notification to admins on new submission
- `admin-auth`: Clerk Google OAuth, Google-only sign-in, email allowlist enforced server-side (`iamthewebkid@gmail.com`, `mahunahi@gmail.com`); session validated on all admin API routes via `CLERK_SECRET_KEY`; 2FA = Google account 2FA
- `admin-review-panel`: Protected `/admin` route; submission list with filters (unread / approved / declined / archived); detail view with content viewer/download by type; internal admin notes field; approve / decline / archive actions; no automated reply (admins respond manually via submitter email)

### Modified Capabilities

- (none)

## Impact

- **New routes**: `src/pages/InterpretiveWorksPage.vue`, `src/pages/InterpretiveWorkPage.vue`, `src/pages/SubmitWorkPage.vue`, `src/pages/AdminPage.vue`
- **New API endpoints**: `api/submit-work.js`, `api/admin/submissions.js`
- **New migration script**: `scripts/migrate-interpretive-works.js`
- **New dependencies**: `@clerk/vue` (Clerk Vue SDK)
- **Env vars**: `VITE_CLERK_PUBLISHABLE_KEY` (frontend), `CLERK_SECRET_KEY` (already in `.env.local`, used server-side)
- **Database**: new table `interpretive_work_submissions` in existing Neon database
- **No new Vercel tier required**: stays on Hobby
- **No published-works table**: hand-publication after admin approval; no pipeline automation in v1
