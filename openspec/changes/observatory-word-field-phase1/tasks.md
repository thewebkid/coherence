## 1. Spec and API foundations

- [x] 1.1 Document API contract for word drill-down and co-occurrence (`word-detail` or equivalent): request/response shape, caps, error cases, and alignment with existing `api/observations` patterns.
- [x] 1.2 Implement server handler(s) to return 3–7 reflection fragments for a `(project, signal)` query from Postgres, with safe truncation and no PII leakage.
- [x] 1.3 Implement co-occurrence query (same project, rolling window or last N rows), returning 3–5 distinct other signals; handle sparse data.

## 2. Word Field component

- [x] 2.1 Replace or refactor `SignalWordCloud.vue` into a Word Field that uses organic layout (library or d3-cloud) with frequency-based sizing; remove flex-wrap-as-primary-layout for Observatory.
- [x] 2.2 Implement word selection (click/focus) and drill-down UI (modal, drawer, or inline expansion) showing fragments and co-occurring words per spec constraints (no edges, no labels).
- [x] 2.3 Add loading, empty, and sparse-data states; ensure layout stability (seed or deterministic placement if needed).

## 3. Observatory page and wireframe layout

- [x] 3.1 Restructure each observational unit in `ObservatoryPage.vue` so Word Field and Rolling Feed form a two-column pair on wide viewports and stack on narrow viewports, matching wireframe order.
- [x] 3.2 Verify `SignalFeed` styling and semantics align with "temporal texture" (fragment list, optional timestamp); adjust if needed.
- [x] 3.3 Confirm Weekly Signal remains above units and does not add interpretive dashboard chrome.

## 4. Practice pages and reuse

- [x] 4.1 Practice project pages intentionally deferred: they continue using `SignalWordCloud.vue` for now. Word Field will be extended to Practice in a follow-up change after Observatory is validated (per design decision #5).

## 5. QA and constraints

- [ ] 5.1 Manual pass: no dashboard filters/charts; no graph edges on word interaction; responsive behavior without horizontal scroll in unit sections.
- [ ] 5.2 Cross-browser check for SVG/HTML Word Field and interaction.
