## Context

See `proposal.md` for why. This design freezes **what we already know** so another environment can implement v0.1.1 without the original chat.

**Code today (v0.1, test branch):** Unlisted `/observe` sitting is implemented and was locally verified on `:5777`. Neon instrument tables exist (`scripts/migrate-instrument-v01.js`). James completed sitting one (return code `3MM4-LZR7-BRMQ`). Staging when `test` is pushed: `https://coherence-drab.vercel.app/observe`.

Shipped files: `src/content/instrument/v0.1.js`, `api/_instrument.js` plus thin Vercel wrappers, `vite.config.js` `/api/instrument` JSON middleware, `src/pages/observe/{ObservePage,ObserveReturnPage,PmaBookletPage}.vue`, `src/components/observe/ObserveSitting.vue`, `src/utils/instrument.js`. `validateResponses` currently requires `responses.length === items.length`. `.choice-row` uses `--font-serif` with no size (the undersized Garamond bug). Results lede is still “A record of recognized movement” / “This is not a measure of coherence” with “Return to these conditions later” as a primary link.

**Source plans (do not edit during apply):** Cursor plans `cas_instrument_assessment_08c28049`, `instrument_v0.1_test_05e61149`, `mci_sitting_iteration_c8a9a21d`. Original stakeholder PDF: `.arch-docs/CAS Coherence Observation Instrument v0.1.pdf`. HMI Personal Well-Being Survey is demand-signal only.

**Conversation freeze (this snapshot ignores later James email/PDFs):**

1. Honest take vs HMI: observational, not diagnostic; no clone of items/scoring/norms/funnel.
2. Identity: participant does not need persistent identity; continuity of observation does → opaque return token, hash at rest.
3. Do not hang the instrument off Observatory `observations`.
4. Five peer apertures collapsed to **four lenses** (Stability, Permeability, Correspondence, Return). Relational Availability dropped as a v0.1 peer (overlaps Permeability).
5. Correspondence (accepted definition): the relationship between interpretation and encounter — including when they appear to fit, when they do not, and how orientation moves or holds. Mismatch is negative-space method across all lenses, not Correspondence-only.
6. Grammar vs lens: every item is grammatically Correspondence-shaped; the Correspondence *lens* is the lived stem. Grammar is item form: Condition → Movement → Relational Response → Continuity → Widening (widening is not a participant score).
7. Return = reorganization, not restoration-as-correct.
8. No preferred movement direction. Closed/refuse/hold/restore remain legitimate.
9. Instrument is Practice-adjacent (it changes vocabulary). Sitting one is induction + first observation, not a naive baseline. Store `session_index`.
10. Eight prototype conditions survived, including kill tests 5, 6, 8. Thin sitting was stress-tested, then a full ~18-item bank was written and shipped as frozen `v0.1`.
11. Three horizons: **My Continuity** (now), **Pattern Field** (consented de-identified later), **Across Scales** (later methods). Schema preserves `lifecycle`, `position`, `scale`, nullable `ensemble_id`.
12. Download is inside the instrument. AI is outside. James later asked results to *listen* (pattern observations + encouragement without evaluation). Interpretation ≠ pattern recognition. v0.1.1 ships **deterministic** observations first; no server LLM.
13. Internally James named it **MCI**. Keep that out of participant copy.
14. Remaining v0.1.1 work is the sitting-iteration plan: serif rule, skip, 9+9, Q6, positive-space reorder, epilogue, ICS, PDF vs JSON.

## Goals / Non-Goals

**Goals:**

- Specify v0.1 as the preserved baseline (do not rebuild it).
- Implement v0.1.1 against the five specs without violating the architecture freeze.
- Leave the change open for later amendment when new James materials are ingested.

**Non-Goals:**

- Ingesting the new James email/PDFs that arrived after this snapshot.
- PMA booklet PDF (stub stays until a file is supplied).
- Pattern Field, Across Scales, Clerk-for-participants, email gate, Observatory mixing, server LLM, radar/percentiles/lens names in UI.
- Site-wide serif audit outside observe sitting/record/return.
- Rewriting orientation except one factual sentence if skip/pause require it.

## Decisions

### 1. Capture as OpenSpec now; implement v0.1.1 from tasks

**Decision:** This change’s apply work is v0.1.1 only. v0.1 code and Neon tables are the baseline. Cloud agents MUST NOT recreate migrations that already ran, MUST NOT mutate `v0.1.js` in place, and MUST NOT “fix” orientation copy.

**Alternatives:** One greenfield rebuild — rejected; James already sat v0.1. Archive v0.1 as a finished change and open a tiny v0.1.1 change — rejected for this snapshot because the freeze and the iteration need to travel together.

### 2. New item-bank module for v0.1.1

**Decision:** Add `src/content/instrument/v0.1.1.js` (or equivalent sibling) that exports `INSTRUMENT_VERSION = 'v0.1.1'`. Copy forward items, then apply skip support, Q6 label, new positive-space items, and reorder. Switch sitting/API imports to the new module for **new** sittings. Keep `v0.1.js` frozen so historical records and the first James sitting remain interpretable.

**Alternatives:** Mutate v0.1.js — rejected (breaks freeze). Parameterize a single file with version flags — harder to prove immutability.

### 3. Skip as `choice_id`, not a parallel column

**Decision:** Store skip as `choice_id = 'skip'` with null `other_text`. Constant `SKIP_CHOICE_ID` beside `ANOTHER_CHOICE_ID`. Display: shuffled movements, then skip, then another.

**Alternatives:** Null `choice_id` — ambiguous vs incomplete pause. Separate `skipped` boolean — extra schema for no gain.

### 4. Pause uses incomplete `instrument_sessions` plus localStorage

**Decision:** Persist answers locally as the participant goes. “Save my place” calls a partial-save path: create-or-update session with `completed_at` null and upsert responses so far; return the token. Resume on `/observe/r/:token` detects incomplete latest session and continues at the first missing item. Finish sets `completed_at`. Comment in code that 9+9 splits temporal locality of items 10–18.

API: either `POST /api/instrument/session` with `{ partial: true, responses }` or a dedicated `.../progress` route. Prefer extending create/update with `complete: false` over a new resource if wrappers stay thin. `validateResponses` gains a `partial` mode (unique item ids, known choices including skip, no full-length requirement).

**Alternatives:** localStorage-only pause — fails if they switch devices, which is the point of the token. Require all 18 always — contradicts James’s friction.

### 5. Version on return tokens

**Decision:** New participants after v0.1.1 ships sit `v0.1.1`. Existing `v0.1` tokens keep sitting `v0.1` for comparability (same stems/choices), unless a later change explicitly migrates them. Do not mix versions inside one session.

**Alternatives:** Force everyone onto v0.1.1 immediately — breaks James’s first-sitting comparability. Rewrite stored rows — forbidden.

### 6. Epilogue is a pure function over responses

**Decision:** `src/content/instrument/patternObservations.js` (pure) takes participant-facing responses and returns zero or more `{ observation, evidence, provisional }` objects. Vue only renders. No LLM. Omit if evidence is weak. Template family from James: write-in count; variety vs sameness of closed choice-ids; skip count as “passed over N conditions”; later sittings same vs different by question number without improvement language.

**Alternatives:** Hand-written static paragraph — does not listen. Server LLM — out of scope; James is right that pattern recognition ≠ interpretation, but v0.1.1 must prove deterministic listening first.

### 7. ICS client-side; PDF text library; JSON stays

**Decision:** Generate `.ics` in the browser (VEVENT, description includes absolute or path `/observe/r/:token`). Intervals: 1 week, 1 month, 3 months, custom date. PDF via a text-layout library (jsPDF or similar), not html2canvas. JSON download remains a second button from the GET payload.

**Alternatives:** Email reminder — violates no-account/no-email-gate. html2canvas — brittle, heavier, worse accessibility.

### 8. Serif rule file plus observe CSS only

**Decision:** Add `.cursor/rules/serif-sizing.mdc` (`alwaysApply: true`, globs `**/*.{vue,scss}`): readable serif is 1.2 × surrounding sans, never below `1rem`. Fix `.choice-row` and observe record/return serif text. Not a site-wide audit.

**Alternatives:** Change global `--font-serif` size — would disturb headings elsewhere.

### 9. Sequential inserts remain acceptable

**Decision:** Keep sequential Neon inserts (no SQL transaction in the serverless driver pattern already used). Do not return a token unless the participant, session, and response writes succeeded. Partial pause writes should upsert by `(session_id, item_id)` if a unique constraint is added, or delete-and-replace responses for that session.

**Alternatives:** Introduce a transaction helper now — nice-to-have, not required for v0.1.1 if failure does not leak a token.

### 10. Positive-space items may be drafted in bank voice

**Decision:** Apply agents draft 1–2 additional working-relation items in the voice of `p8-apparent-fit` (recent recall, closed/refuse still legitimate, no obvious virtue pick) and move at least one such item into the first six. Exact copy is expected to be edited when later James materials are merged; ship a coherent draft rather than blocking.

**Alternatives:** Leave placeholders “TODO item” in the sitting — would break James’s experiential gate.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Pause splits temporal locality of items 10–18 | Comment in code; treat as hypothesis; do not advertise pause as methodologically neutral |
| Deterministic epilogue still feels thin or evaluative | Omit weak patterns; thanks-for-attention first; hold the AI-outside sentence until epilogue is felt |
| Skip used as a hidden “prefer not to say” | One skip wording only; revisit only if a later sitting shows need |
| v0.1 vs v0.1.1 split on return tokens | Keep v0.1 bank frozen; load version from session row when adding a sitting |
| Token-in-ICS / token-in-URL is bearer auth | Same as v0.1; rate limit; no extra PII on the calendar file |
| jsPDF layout ugly | Prefer simple typography matching site (serif for record lines); not a brochure |
| Sequential insert partial failure | Never return token on failure; pause path replace-all responses for the session |
| Draft positive-space items miss James’s ear | Same kill-test discipline as v0.1; later spec amendment expected |
| New James PDFs will contradict this snapshot | Change left open; do not implement those materials in this apply |

## Migration Plan

1. v0.1 tables already exist. No new tables required. Optional: unique `(session_id, item_id)` on `instrument_responses` if not present, to make pause upserts safe.
2. Ship v0.1.1 module + API partial/skip + UI. New creates write `instrument_version = v0.1.1` and a versions row if missing (same insert-or-ignore pattern as v0.1).
3. Deploy on **test** branch only; keep unlisted / noindex / no header.
4. Rollback: revert to v0.1 module import; incomplete sessions remain valid rows with null `completed_at`.
5. Do not run a destructive remigration of `migrate-instrument-v01.js` against production data.

## Open Questions

- Exact stems for the 1–2 new positive-space items (draft now; expected to change when later James PDFs are ingested).
- Whether existing v0.1 return tokens should ever be offered a one-time “sit the revised bank” — not in v0.1.1.
- Whether the “take this to an AI” sentence is removed the same day the epilogue ships or after James inhabits it (spec: hold until epilogue exists, then remove or rewrite).
- PMA booklet file still absent; stub remains.
