## Why

The CAS322 site build used stakeholder notes in `openspec/content/Read me First.md`, but James’s fuller **CAS Observatory — Phase 1** brief (PDF: *Development Brief and Notes for Ron (draft 2)*) was not folded into that pack. The shipped Observatory implements six observational units with a tag-style `SignalWordCloud` (flex-wrap) and no word-level drill-down. The brief calls for a **Word Field** as the core perceptual interface—organic spatial layout, frequency-sized words, and click-to-reveal fragments and co-occurring words—paired with a **Rolling Feed**, matching the attached wireframe (Word Cloud | Rolling Feed per unit). This change closes that gap so the live site matches the stated “field, not dashboard” intent.

## What Changes

- Replace or substantially upgrade the observatory **word visualization** from a simple wrapped tag list to a **Word Field** that behaves per the PDF (organic layout, no axes, no explicit sorting UI, word interaction).
- Add **interaction**: selecting a word surfaces **3–7 short fragments** from submissions and **3–5 co-occurring words** (unlabeled), without graph edges or categories.
- Align **Observational Unit** layout with the wireframe: within each unit, **Word Field** and **Rolling Feed** presented as the primary pair (side-by-side where width allows, stacked on narrow viewports); preserve project title and micro-copy above the pair.
- Extend **read APIs** (or serverless handlers) as needed to support frequency, co-occurrence for interaction, and time-ordered feed fragments—mapping to the existing **signal + reflection** observation model unless a separate migration is explicitly approved.
- **Out of scope for this change** (per PDF Phase 1 “Does NOT Include” and Phase 2 preview): full weekly archive UI, dashboards, charts, multi-view navigation, cross-week analytics beyond what is needed for co-occurrence in the current window.

## Capabilities

### New Capabilities

- `observatory-word-field`: Behavioral and UX requirements for the Word Field, Rolling Feed pairing per unit, wireframe layout, interaction semantics, and non-dashboard constraints from the stakeholder PDF.

### Modified Capabilities

- *(none in `openspec/specs/` — prior CAS322 requirements live under `openspec/changes/cas322-site-build/`; this change supersedes observatory *behavior* for implementation going forward via the new capability above.)*

## Impact

- **Frontend**: `ObservatoryPage.vue`, `SignalWordCloud.vue` (rename or replace), `SignalFeed.vue`, shared styles; possibly Practice pages if the same cloud component is reused.
- **API**: `api/` routes for observations—new or extended query parameters for word drill-down and co-occurrence; document limits and privacy (no PII).
- **Dependencies**: Possible addition of a layout library for Word Field (e.g. wordcloud layout) or custom canvas/SVG—decision in `design.md`.
- **Source documents**: Authoritative stakeholder text: PDF *Development Brief and Notes for Ron (draft 2)*, Observatory section (pages 4–11); wireframe image (Observational Unit: Word Cloud + Rolling Feed).
