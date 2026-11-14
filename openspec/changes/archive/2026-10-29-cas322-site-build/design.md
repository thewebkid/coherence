## Context

The Coherence Across Scales site is a Vue + Vite SSG app on Vercel. Practice submissions currently POST to `api/submit-observation.js` and insert into Neon Postgres using the legacy `observations` schema (seven fields). James’s CAS322 checklist and the canonical copy in **`openspec/content/`** define a new IA, six Practice projects, a **unified** observation unit (one word + 140-character reflection), Observatory + Weekly Signal + Observer Network, and footer/header updates. Only two test rows exist in `observations`; migrating the table is acceptable.

**Content source of truth (verbatim):**

| Deliverable | File under `openspec/content/` |
|-------------|--------------------------------|
| Checklist / phase order | `Read me First.md` |
| Simple Terms (page body) | `Simple Terms.md` |
| Home | `home page content.md` |
| About | `About.md` |
| A Note to Observers | `A Note to Observers.md` |
| Practice (index + six projects) | `Practice Section Content.md` |
| Observatory layout / blocks | `Observatory Index Page.md` |
| Civilizational Blindness essay | `civilizational blindness essay.md` |

Implementers MUST copy body text from these files without paraphrasing unless a task explicitly allows trimming whitespace or fixing obvious markdown artifacts (e.g. stray `` ` ``).

## Goals / Non-Goals

**Goals:**

- Align primary navigation and footer with `Read me First.md`.
- Ship six Practice project experiences with identical **signal + reflection** mechanics, word clouds, and rolling feeds backed by Postgres.
- Add Observatory index with Weekly Signal (editorial), six units, and Observer Network (renamed from Signal Map).
- Migrate `observations` schema and API to the new shape; provide a migration SQL/script runnable with env-based DB URL.
- Preserve existing visual design language (“do not change look and feel” per checklist).

**Non-Goals:**

- In-app LLM or server-side inference for “AI Observation” v1 (participants use external AI; site collects self-reported signal/reflection only).
- Automating Weekly Signal generation in the database (v1: manual copy in repo or CMS-like single source; optional LLM assist offline per Ron’s workflow).
- Changing the Mirror PDF in this change (already replaced on disk).
- Usernames, timestamps on feeds (later).

## Decisions

1. **Unified form vs per-project forms**  
   **Decision:** One shared **signal submission** component with a `project` discriminator matching the six CAS322 project identifiers (exact strings TBD in implementation; must map 1:1 to DB `project` column and routes).  
   **Rationale:** Checklist requires “consistent component structure across all.”  
   **Alternative considered:** Separate form components—rejected as duplicate validation and API wiring.

2. **Observations table shape**  
   **Decision:** Replace legacy columns with (minimum): `id`, `project` (TEXT), `signal` (TEXT, single word or short token—enforce max length in API), `reflection` (TEXT, max 140 chars—enforce in API and client), optional `context` (TEXT nullable), optional `geography` (TEXT nullable), `created_at` (timestamptz). Drop `what_shifted`, `what_did_not_shift`, etc., after backup of the two test rows if needed.  
   **Rationale:** Matches `Practice Section Content.md` Observation Unit; old schema does not.  
   **Alternative:** EAV or JSONB payload—rejected for query simplicity for word clouds and feeds.

3. **Weekly Signal**  
   **Decision:** Static block in Vue or imported markdown/JSON committed to repo; updated manually (optionally assisted by offline LLM). Not stored in `observations`.  
   **Rationale:** Checklist says manual update, observational tone; no requirement for DB.  
   **Alternative:** `weekly_signals` table—defer until editorial workflow needs history in DB.

4. **Word cloud computation**  
   **Decision:** Derive word frequencies from `signal` column (and optionally tokenized reflection later) per `project` via API read endpoint or build-time script—exact approach in tasks.  
   **Rationale:** Keeps a single source of truth in Postgres.

5. **Observer Network**  
   **Decision:** Reuse existing `SignalGlobe` / map stack from current Signal Map flow; update routes, titles, and copy; place the section on Observatory or link clearly per IA.  
   **Rationale:** Avoid new map API keys; globe already uses CDN textures.

6. **Environment variables**  
   **Decision:** Continue using `POSTGRES_URL` on Vercel for serverless; local migration scripts may use `DATABASE_URL_UNPOOLED` or document the same variable as `submit-observation` (align script docs with `.env.local`—never commit values).

## Risks / Trade-offs

- **[Risk] Breaking existing bookmarks** to `/signal`, `/orientation`, etc. → **Mitigation:** Add redirects in `vercel.json` or router where old paths are removed.
- **[Risk] Verbatim content is very long** → **Mitigation:** Split into section components; still paste full text from `openspec/content/`.
- **[Risk] Word cloud library bundle size** → **Mitigation:** Lazy-load chart code per route; pick a minimal library.
- **[Trade-off] Public read API** for feeds/clouds vs build-time fetch → Start with serverless GET or SSG data pull; lock down if abuse appears.

## Migration Plan

1. Add SQL migration file (e.g. `scripts/migrate-observations-cas322.sql` or extend `migrate-observations.js`) that drops legacy columns or recreates table with new shape; document running against Neon using env var.
2. Deploy API + frontend after migration in same release window (or feature-flag if needed).
3. Rollback: restore previous `api/submit-observation.js` and table from backup (Neon branches/snapshot); keep migration SQL in repo.

## Open Questions

- **Exact route map** for the six projects (kebab-case slugs) and redirects from old project URLs—finalize in first implementation task.
- **Interpretive** gallery: confirm whether “Submit your own interpretations” links to existing `/submit-work` or new copy only.
- **GET endpoint** for listing recent reflections: public anonymous read vs static rebuild only—pick based on hosting constraints (Vercel function cold starts).
