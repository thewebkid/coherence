## 1. Guardrails (do not rebuild v0.1)

- [ ] 1.1 Read `proposal.md`, `design.md`, and the five specs in this change before editing product code. Incoming James email/PDFs after this snapshot are out of scope.
- [ ] 1.2 Confirm v0.1 baseline is present (`src/content/instrument/v0.1.js`, `api/_instrument.js`, observe pages, Neon tables per `.arch-docs/database.md`). Do not mutate frozen `v0.1.js`. Do not rewrite James’s orientation except one factual skip/pause sentence. Do not write to `observations`. Do not add Clerk or email for participants. Do not show lens names.

## 2. Serif sizing

- [ ] 2.1 Add `.cursor/rules/serif-sizing.mdc` (`alwaysApply: true`, globs `**/*.{vue,scss}`): body/UI chrome stays sans; readable serif is 1.2 × surrounding sans; never below `1rem`; include the radio-label example.
- [ ] 2.2 Fix observe serif CSS: `.choice-row` and record/return serif text in `ObserveSitting.vue`, `ObservePage.vue`, `ObserveReturnPage.vue` meet the 1.2× / 1rem floor.

## 3. Item bank v0.1.1

- [ ] 3.1 Add sibling module `src/content/instrument/v0.1.1.js` with `INSTRUMENT_VERSION = 'v0.1.1'`, `lifecycle: prototype`, copied items, `SKIP_CHOICE_ID = 'skip'`, skip helper, and `choiceIdsForItem` including skip + another.
- [ ] 3.2 Change Q6 (`p6-interpretation-mismatch`) choice `held-both-continued` label so it names interpretation and encounter.
- [ ] 3.3 Draft 1–2 additional positive-space / working-relation items in `p8-apparent-fit` voice (kill-test: no obvious CAS-virtue pick). Keep p5, p6, p8 (or successors). Reorder so at least one working-relation item appears before the seventh condition.
- [ ] 3.4 Point sitting UI and `api/_instrument.js` at the v0.1.1 module for **new** sittings. Keep `v0.1.js` importable. Additional sittings on existing v0.1 tokens continue to use the v0.1 bank.

## 4. Persistence: skip and incomplete sessions

- [ ] 4.1 Extend response validation: accept `choice_id = skip` with no `other_text`; add `partial` mode that does not require a full-bank array; complete mode still requires every item (answered, skip, or another).
- [ ] 4.2 Add save-place / resume: `complete: false` (or equivalent) creates or updates a session with `completed_at` null and upserts/replaces responses so far; never return a token if writes failed. Resume loads the incomplete session and continues at the first missing item. Finish sets `completed_at`.
- [ ] 4.3 Ensure `instrument_versions` can hold `v0.1.1`. Optional unique `(session_id, item_id)` on `instrument_responses` if missing. Update `.arch-docs/database.md` and `.arch-docs/api-endpoints.md` for skip, partial save, and v0.1.1.

## 5. Sitting UX

- [ ] 5.1 Question frame: `Question N/T`, stem, prompt, choices; drop duplicate title. Skip below shuffled movements, Another movement last. Copy in the sense of “I cannot recall a recent situation like this.”
- [ ] 5.2 On item change, scroll the question to the top of the viewport. Persist answers in localStorage as they go.
- [ ] 5.3 After question 9, offer Continue now / Pause here. Pause is real resume (task 4.2). Comment in code that pausing splits temporal locality of items 10–18.

## 6. Results epilogue

- [ ] 6.1 Add pure `src/content/instrument/patternObservations.js`: observation → evidence → provisional language; omit weak evidence; write-in count; variety vs sameness of closed choice-ids; skip as “passed over N”; later sittings same vs different without improvement language.
- [ ] 6.2 Replace the sterile results pair with: thanks for attention; pattern observations; numbered `Question N/T` record; quiet non-measure line not as lede. Number return juxtaposition the same way.
- [ ] 6.3 Hold then rewrite or remove the “take this to an AI” sentence now that the epilogue exists. Do not add a server LLM.

## 7. Continuity artifacts

- [ ] 7.1 Remind me to return: 1 week / 1 month / 3 months / custom date → download `.ics` whose description contains `/observe/r/:token`. No email. Do not lead results with “Return to these conditions later.”
- [ ] 7.2 Separate downloads: readable text-layout PDF (record + epilogue, no lenses/scores) and JSON data (existing participant-facing dump). Prefer jsPDF (or similar) over html2canvas.

## 8. Verify on test

- [ ] 8.1 Local `:5777/observe`: new sitting uses v0.1.1; skip; pause after 9 and resume; serif size; epilogue; ICS; PDF; JSON; honeypot still rejected; lens tags absent from API JSON.
- [ ] 8.2 Confirm a v0.1 token still loads historical responses against the frozen v0.1 bank. Keep routes unlisted, noindex, out of `SiteHeader`.
