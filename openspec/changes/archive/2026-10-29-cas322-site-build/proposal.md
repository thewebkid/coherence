## Why

Stakeholder content and IA for the CAS public site are now finalized in `openspec/content/` (the “CAS BUILD CHECKLIST” and section copy). The live site still reflects an older information architecture (e.g. Orientation / Engine / Signal naming), an older Practice project set, and a **seven-field** observation form backed by a matching `observations` table. We need to align navigation, footer, Practice, Observatory, Observer Network, The Work, About, and legal copy with that source of truth, and replace the submission model with the **unified signal + reflection** structure described in the content pack—without relying on in-app LLM calls for v1 (participants use their own tools; the site stores human-entered submissions only).

## What Changes

- **Header**: Main menu matches the checklist—Home, Practice, Observatory, Interpretive, The Work, About (no dropdowns v1); rename “Interpretive Works” → **Interpretive**; remove or relocate items that are not in the checklist (e.g. Orientation, Engine, Glossary as primary nav—exact mapping in implementation).
- **Footer**: Add System statement (Practice → Observatory → Interpretive Works → The Work) with links; footer quote; links for Contact, Institutional, TCP Executive Brief, Mirror Across Scales PDF, **Simple Terms**; keep look-and-feel consistent with current UI.
- **Home, About, Simple Terms, A Note to Observers**: Replace or add pages using **verbatim** copy from `openspec/content/` (not paraphrased).
- **Practice**: Six projects (AI Observation, Observation, Dialogue, Relational Field, Reflection, Presence) with **one shared submission shape** per checklist: **signal (one word)** + **reflection (≤140 characters)** + optional fields as specified in content; each project page includes **word cloud** + **rolling feed** (3–5 entries visible); Practice index and project bodies from `openspec/content/Practice Section Content.md`.
- **Postgres `observations` table + API**: **BREAKING** — Replace legacy columns (`context`, `what_shifted`, …) with a schema aligned to the new form (only two test rows exist; safe to migrate). Update `api/submit-observation.js` and `ObservationForm` (or successor) accordingly; add migration script runnable with `POSTGRES_URL` / `DATABASE_URL_UNPOOLED` from env (never commit secrets).
- **Observatory** (new index): Weekly Signal block (manual/editorial, 120–250 words), short intro, six **Observational Units** (title, micro-copy, word cloud, Recent Signals, link to Practice project), optional aggregated six-cloud / six-feed section per checklist; Planetary Signals placeholder.
- **Observer Network**: Rename **Signal Map** → **Observer Network**; micro-copy from checklist / `openspec/content/Observatory Index Page.md`; embed existing globe (or map) experience under Observatory narrative.
- **The Work**: Index structure + essays including **Civilizational Blindness** from `openspec/content/civilizational blindness essay.md`; other assets as already on site.
- **Interpretive**: Minor spacing/refinements per checklist; gallery largely complete.
- **Explicitly out of scope for this change**: Updating `public/pdf/The-Mirror-Across-Scales.pdf` (already updated); hosting an in-app LLM for AI Observation v1; usernames and timestamps on feeds (optional later per checklist).

## Capabilities

### New Capabilities

- `site-frame`: Sitewide header navigation and footer (System statement, links, quote, Simple Terms) per `openspec/content/Read me First.md`.
- `cas322-content-pages`: Verbatim static pages and copy sources—Home, About, Simple Terms, A Note to Observers, and Explore links where specified—drawn from `openspec/content/home page content.md`, `About.md`, `Simple Terms.md`, `A Note to Observers.md`.
- `practice-signal-pipeline`: Six Practice projects, unified signal/reflection form, Postgres persistence, word clouds and feeds fed from stored data, routes and content aligned to `openspec/content/Practice Section Content.md` and checklist.
- `observatory-page`: Observatory index layout—Weekly Signal, intro, six observational units, optional aggregate, placeholder—per `openspec/content/Observatory Index Page.md` and checklist.
- `observer-network`: Observer Network section (renamed Signal Map), integration with Observatory and existing globe/map components, copy from content pack.
- `work-section-cas322`: The Work index/navigation, Civilizational Blindness essay (verbatim from content pack), Interpretive gallery polish per checklist.

### Modified Capabilities

- None under `openspec/specs/` (no archived baseline specs in-repo). Behavioral supersession: the completed change `practice-section-rebuild` defined a seven-field form; this change **replaces** that product behavior for submissions.

## Impact

- **Vue routes** (`src/router/index.js`), `SiteHeader.vue`, `SiteFooter.vue`, multiple pages under `src/pages/` and `src/pages/practice/`.
- **API** `api/submit-observation.js`; optional `scripts/migrate-observations.js` or new migration script; Vercel env `POSTGRES_URL` (and local `.env.local`).
- **New dependencies** possible for word-cloud visualization (e.g. D3 or a small component)—decision in `design.md`.
- **Content**: All user-facing prose for listed sections MUST be traceable to files in `openspec/content/` as the source of truth.
