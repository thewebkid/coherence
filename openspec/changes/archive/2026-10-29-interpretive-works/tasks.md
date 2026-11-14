## 1. Environment and Dependencies

- [x] 1.1 Add `VITE_CLERK_PUBLISHABLE_KEY` to `.env.local` (same value as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`) and to Vercel environment variables
- [x] 1.2 Install `@clerk/vue` — `npm install @clerk/vue`
- [x] 1.3 Install `@clerk/backend` — `npm install @clerk/backend` (for server-side token verification in Vercel functions)

## 2. Clerk Integration (Frontend)

- [x] 2.1 Initialize Clerk in `src/main.js` using `clerkPlugin` with `VITE_CLERK_PUBLISHABLE_KEY`
- [x] 2.2 Add `/admin/sign-in` route to `src/router/index.js` pointing to a new `AdminSignInPage.vue`
- [x] 2.3 Add `/admin` route to `src/router/index.js` with a `beforeEnter` guard that redirects to `/admin/sign-in` if not signed in (using `useAuth()`)
- [x] 2.4 Create `src/pages/AdminSignInPage.vue` rendering Clerk `<SignIn>` component (Google provider only, `afterSignInUrl="/admin"`)
- [x] 2.5 Configure `vite-ssg` to exclude `/admin` and `/admin/sign-in` from static pre-rendering

## 3. Database Migration

- [x] 3.1 Create `scripts/migrate-interpretive-works.js` using `@neondatabase/serverless` with `DATABASE_URL_UNPOOLED` to run `CREATE TABLE IF NOT EXISTS interpretive_work_submissions` with all columns: `id`, `submitter_name`, `submitter_email`, `display_name_consent`, `work_title`, `work_type`, `work_description`, `work_url`, `work_file_info`, `status` (default `'unread'`), `admin_notes`, `created_at`, `updated_at`
- [x] 3.2 Run `node scripts/migrate-interpretive-works.js` to create the table in Neon

## 4. Submit Work API

- [x] 4.1 Create `api/submit-work.js` Vercel serverless function: POST only, validates required fields (`submitterName`, `submitterEmail`, `workTitle`, `workType`, `workDescription`), validates `workType` enum, inserts into `interpretive_work_submissions`, returns `{ success: true }`
- [x] 4.2 Add optional Resend email notification in `api/submit-work.js`: if `RESEND_API_KEY` is set, send notification to both admin emails with submission summary; degrade gracefully if absent

## 5. Admin Submissions API

- [x] 5.1 Create a shared `api/_clerk-auth.js` helper that verifies the Clerk session token (`Authorization: Bearer`) using `@clerk/backend`, resolves the user's primary email, and throws `401`/`403` if invalid or not allowlisted
- [x] 5.2 Create `api/admin/submissions.js` handling both GET and PATCH methods
- [x] 5.3 GET `/api/admin/submissions`: verify auth, accept optional `?status=` query param, return matching rows sorted by `created_at` DESC
- [x] 5.4 PATCH `/api/admin/submissions`: verify auth, accept `{ id, status?, adminNotes? }`, update row, set `updated_at = NOW()`, return updated row

## 6. Public Pages — Interpretive Works Section

- [x] 6.1 Add routes to `src/router/index.js`: `/interpretive-works` → `InterpretiveWorksPage.vue`, `/interpretive-works/:slug` → `InterpretiveWorkPage.vue`, `/submit-work` → `SubmitWorkPage.vue`
- [x] 6.2 Create `src/pages/InterpretiveWorksPage.vue` with section intro text (James's copy), work listing (initially just "The Practice of Seeing"), and "Submit an Interpretive Work →" link; apply warm background CSS variable
- [x] 6.3 Create `src/pages/InterpretiveWorkPage.vue` — flexible template with `<WorkContent>` component supporting image, essay, video embed, music embed types; display title, creator, type, year, medium, intro, content, optional creator reflection, and prev/next navigation
- [x] 6.4 Create `src/components/WorkContent.vue` — renders content by `type` prop: image (with `<img>` and alt), essay (prose with generous line spacing), video (iframe embed), music (iframe embed)
- [x] 6.5 Create `src/pages/SubmitWorkPage.vue` with form fields: submitter name, submitter email, work title, work type (select), work description (textarea), work URL (optional), display name consent checkbox; POST to `/api/submit-work`; show success/error state
- [x] 6.6 Add "Interpretive Works" link to site navigation (SiteHeader)
- [x] 6.7 Define warm tone CSS custom properties (`--iw-bg-light`, `--iw-bg-dark`, etc.) in SCSS; apply scoped to interpretive works pages

## 7. First Work — The Practice of Seeing

- [ ] 7.1 Create `src/content/interpretive-works/words-of-drawings.js` (or `.json`) with metadata: `{ slug, title, creator, type, year, medium, intro, content, reflection }` and image references for `public/img/Practice-of-Seeing.jpg` and `public/img/Practice-of-Seeing-thumb.jpg`
- [x] 7.2 Wire `InterpretiveWorkPage.vue` to load content by route `slug` from the content module and render via `WorkContent`
- [x] 7.3 Verify the full page renders correctly with the artwork image, text, and navigation at both mobile and desktop breakpoints

## 8. Admin Review Panel

- [x] 8.1 Create `src/pages/AdminPage.vue` — main admin panel; fetch submissions from `GET /api/admin/submissions`; render filter tabs (Unread / Approved / Declined / Archived / All); show submission list with name, title, type, date, status
- [x] 8.2 Add submission detail panel/section in `AdminPage.vue`: show all fields, content URL as clickable link, submitter email as copyable text, status badge
- [x] 8.3 Add internal notes text area and "Save Notes" button in detail view; PATCH to `/api/admin/submissions`
- [x] 8.4 Add Approve / Decline / Archive action buttons in detail view; PATCH status on click; update UI state optimistically
- [x] 8.5 Send the Clerk session token with all admin API requests (`Authorization: Bearer <token>` via `useAuth().getToken()`)

## 9. Verification

- [ ] 9.1 Confirm `VITE_CLERK_PUBLISHABLE_KEY` is set in Vercel production environment and deploy succeeds
- [ ] 9.2 Sign in to `/admin` with `iamthewebkid@gmail.com` — confirm access granted
- [ ] 9.3 Sign in to `/admin` with `mahunahi@gmail.com` — confirm access granted
- [ ] 9.4 Confirm a non-allowlisted Google account is blocked at `/admin`
- [ ] 9.5 Submit a test entry via `/submit-work` — confirm it appears in the admin panel under "Unread"
- [ ] 9.6 Approve the test submission, add notes, archive — confirm status and notes persist
- [ ] 9.7 Verify `/interpretive-works` and `/interpretive-works/words-of-drawings` render correctly in light and dark mode on mobile and desktop
- [x] 9.8 Confirm `/admin` is not included as a static file in the `dist/` build output
