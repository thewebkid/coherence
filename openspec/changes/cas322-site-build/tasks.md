## 1. Data layer (Postgres + API)

- [ ] 1.1 Author SQL migration for `observations`: new columns `signal` (TEXT NOT NULL), `reflection` (TEXT NOT NULL), optional nullable `context`, `geography`; retain `id`, `project`, `created_at`; drop legacy columns (`what_shifted`, `what_did_not_shift`, `where_coherent`, `where_resistant`, `notes`) after confirming only test data; document exact DDL in repo (e.g. `scripts/migrate-observations-cas322.sql`).
- [ ] 1.2 Update or add a Node migration runner (pattern: existing `scripts/migrate-observations.js`) that reads `POSTGRES_URL` or `DATABASE_URL_UNPOOLED` from `.env.local` / Vercel env and applies migration; document one command for Ron to run locally against Neon.
- [ ] 1.3 Rewrite `api/submit-observation.js` to accept CAS322 JSON body (`project`, `signal`, `reflection`, optional `context`, `geography`); validate 140-char reflection and allowed `project` enum for all six projects; insert into migrated schema.
- [ ] 1.4 Add read API or serverless handler(s) for recent reflections and aggregate signals **per project** (for feeds and word clouds), with safe limits and no PII; or define static generation approach in code if skipping public GET—document choice in commit.

## 2. Site frame (header + footer)

- [ ] 2.1 Update `SiteHeader.vue` nav to Home, Practice, Observatory, Interpretive, The Work, About; label Interpretive per spec; add/adjust routes that are missing; remove or redirect obsolete primary items per `openspec/content/Read me First.md`.
- [ ] 2.2 Update `SiteFooter.vue`: System statement with four links; footer nav links (Contact, Institutional, TCP brief, Mirror PDF, Simple Terms); centered quote from checklist; preserve styling consistent with site.
- [ ] 2.3 Add route and page for Simple Terms with verbatim `openspec/content/Simple Terms.md` (if not only a modal).

## 3. Verbatim static pages (`openspec/content/`)

- [ ] 3.1 Home: apply `openspec/content/home page content.md` verbatim; link to A Note to Observers.
- [ ] 3.2 About: apply `openspec/content/About.md` verbatim; add links per checklist.
- [ ] 3.3 A Note to Observers: apply `openspec/content/A Note to Observers.md` verbatim.

## 4. Practice — structure and content

- [ ] 4.1 Define six project slugs and `project` enum strings; add/rewrite routes under `/practice/...` for AI Observation, Observation, Dialogue, Relational Field, Reflection, Presence; plan redirects from old project URLs (`observation`, `behavioral-ecology`, etc.).
- [ ] 4.2 Replace or extend `ObservationForm.vue` (or new `SignalSubmissionForm.vue`) for signal + 140-char reflection + optional context/geography; wire to updated API; remove legacy seven-field UI.
- [ ] 4.3 For each of six project pages: paste instructional sections verbatim from `openspec/content/Practice Section Content.md`; mount shared form + word cloud + feed components; ensure “Enter Project” targets from Observatory match these routes.
- [ ] 4.4 Rebuild Practice index (`ProjectsIndexPage.vue` / `PracticePage.vue`): intro and project cards from Practice Section Content + Read me First; link list style per stakeholder notes.
- [ ] 4.5 Implement word cloud component (choose minimal library) fed by per-project signals from read API or build-time data.
- [ ] 4.6 Implement rolling feed component (3–5 recent reflections, no usernames v1) fed by read API or equivalent.

## 5. Observatory index

- [ ] 5.1 Add `/observatory` route and `ObservatoryPage.vue` (or similar): page header, Weekly Signal block structure, intro verbatim from `openspec/content/Observatory Index Page.md`.
- [ ] 5.2 Build six Observational Unit cards with title, micro-copy (from content pack), word cloud, Recent Signals, Enter Project link.
- [ ] 5.3 Add Planetary Signals “coming soon” placeholder; optional aggregated six-cloud section—implement or explicitly defer with comment in tasks/spec follow-up.
- [ ] 5.4 Weekly Signal: implement as static Vue section or imported content module; Ron can edit copy weekly without DB.

## 6. Observer Network (ex–Signal Map)

- [ ] 6.1 Rename user-facing strings and routes: `/signal/map` → integrate or redirect to Observatory anchor or `/observatory#observer-network` per IA; update `SignalMapPage.vue` title/meta and copy to Observer Network micro-copy.
- [ ] 6.2 Embed Observer Network section on Observatory page (globe + optional Place Signal) per `specs/observer-network/spec.md`.
- [ ] 6.3 Verify `PlaceSignalModal` / map markers still work after route changes; update any deep links in `SignalPage.vue`.

## 7. The Work + Interpretive

- [ ] 7.1 The Work index: navigation to manuscript, deck, handbook, glossary, essays per checklist; add Civilizational Blindness route with verbatim `openspec/content/civilizational blindness essay.md` (dedupe if source repeats sections).
- [ ] 7.2 Interpretive: spacing/line breaks gallery pass; optional full-image/back links per checklist; link “Submit your own interpretations” if required.

## 8. Meta, redirects, QA

- [ ] 8.1 Update `useHead` titles/meta for renamed pages; add `vercel.json` redirects for removed paths as needed.
- [ ] 8.2 Mobile pass: stack Observatory and Practice units full-width; no horizontal scroll per checklist.
- [ ] 8.3 Manual test: submit one row per project; verify DB row shape; verify feeds and clouds update.

## 9. Content integrity check (manual)

- [ ] 9.1 Diff-check rendered pages against `openspec/content/*.md` sources for Home, About, Note, Simple Terms, Practice sections, Observatory blocks, Civilizational Blindness—stakeholder sign-off.
