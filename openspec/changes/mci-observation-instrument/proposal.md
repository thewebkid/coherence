## Why

James Mahu asked CAS to host a private observational sitting (internally **MCI**, Movement Continuity Instrument; participant-facing name remains **My Continuity** / Observation). HeartMath’s Personal Well-Being Survey is demand-signal only — CAS must not clone items, scoring, norms, or funnel. v0.1 is already live as an unlisted prototype on the **test** branch (`/observe`): frozen 18-item bank, opaque return token, first-sitting record, blind return, optional what-followed, JSON/plaintext download. James’s first complete sitting (`3MM4-LZR7-BRMQ`) confirmed the bank works as a non-evaluative instrument and exposed the remaining hole: Sitting One’s ending feels sterile (“why did I just do that?”), plus skip, 9+9 pause, question/results UX, Q6 wording, serif sizing, ICS return reminder, and a readable PDF. This change captures the architecture freeze, the shipped v0.1, and the unbuilt **v0.1.1** iteration so cloud agents can continue without the original chat. Incoming James email/PDFs after that sitting are **out of scope** for this snapshot; the change is left open for later amendment.

## What Changes

- **Already shipped (v0.1, preserve and specify):** Unlisted `/observe` sitting (noindex, not in site header); James orientation copy; PMA booklet stub; 18-item frozen bank with shuffled choices + “another movement”; Neon instrument tables distinct from Observatory `observations`; token identity (raw shown once, SHA-256 at rest); first-sitting record; return `/observe/r/:token`; optional what-followed; client download JSON + plaintext; Simple Terms sentence; Vite `/api/instrument` mirrors for local `:5777`.
- **v0.1.1 iteration (this change’s remaining work):** Serif sizing rule + observe CSS; skip as a distinct choice; 9+9 pause with incomplete session; question frame `Question N/18`; Q6 both-wording; 1–2 extra positive-space items and reorder; deterministic results **epilogue** (observation → evidence → provisional language; no scores, no LLM); numbered record; ICS “remind me to return”; PDF vs JSON downloads.
- **Not in this snapshot:** New James materials after the first sitting; PMA booklet PDF (still stub until a file is supplied); Pattern Field / Across Scales products; Clerk for participants; public email gate; feeding results into the Observatory word field; server LLM; radar/percentiles/lens names in participant UI.

## Capabilities

### New Capabilities

- `mci-architecture-freeze`: Non-negotiable method constraints (observational not diagnostic; four lenses as metadata; grammar vs lens; interior / sovereign_participant; no preferred movement; skip ≠ another movement; Return as reorganization; three horizons in schema only; instrument isolated from Observatory `observations`).
- `mci-item-bank`: Versioned recall item bank. v0.1 frozen at 18 items (kill tests p5/p6/p8, demand-characteristic p10). v0.1.1 adds skip id, Q6 wording, extra positive-space items, reorder; never mutate a frozen version in place.
- `mci-sitting`: Participant flow: orientation → one-at-a-time sitting → record → download/continuity tools; blind return sitting then juxtaposition; optional what-followed. v0.1.1 adds skip, 9+9 pause/resume, question UX, scroll-to-top.
- `mci-instrument-persistence`: Opaque return token, hashed at rest; Neon tables + `/api/instrument/*`; rate limit + honeypot; private storage consent; skip and incomplete sessions for pause/resume; no lens tags in participant payloads.
- `mci-results-epilogue`: Sitting-end listening without evaluation: thanks for attention; deterministic pattern observations from this sitting only; numbered record; quiet non-measure line; ICS reminder; PDF + JSON. No server LLM in v0.1.1.

### Modified Capabilities

- None under `openspec/specs/` (no archived baseline for this instrument). Behavioral isolation: do **not** modify `practice-signal-pipeline` / Observatory observation storage.

## Impact

- **Already in tree (v0.1):** `src/content/instrument/v0.1.js`, `api/_instrument.js` + thin wrappers, `scripts/migrate-instrument-v01.js`, `src/pages/observe/*`, `src/components/observe/ObserveSitting.vue`, `src/utils/instrument.js`, `vite.config.js` `/api/instrument` middleware, `api/_rate-limit.js` `instrument` limiter, `.arch-docs/database.md` + `api-endpoints.md`, Simple Terms sentence.
- **v0.1.1 adds:** `.cursor/rules/serif-sizing.mdc`; item bank `v0.1.1` module (sibling, do not rewrite frozen v0.1); `src/content/instrument/patternObservations.js`; ObserveSitting/ObservePage/ObserveReturnPage/instrument utils; API skip + incomplete `completed_at`; likely `jspdf` (or similar) for PDF; `.ics` generation client-side.
- **Database:** Existing instrument tables stay; incomplete sessions use nullable `completed_at` (already on `instrument_sessions`). Skip is a `choice_id`, not a schema change. No writes to `observations`.
- **Deploy:** Unlisted on **test** branch; staging historically `https://coherence-drab.vercel.app/observe`. Clerk remains admin-only.
- **Source plans (do not edit as part of apply):** `cas_instrument_assessment_08c28049.plan.md`, `instrument_v0.1_test_05e61149.plan.md`, `mci_sitting_iteration_c8a9a21d.plan.md`.
