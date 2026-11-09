## Context

James Mahu provided the design brief (`resources/READ FIRST_Mutual Assistance Section Brief for CAS.md`) and philosophical framing (`resources/Sep 17 Email update from James.md`) for housing *The Practice of Mutual Assistance* (PMA) and the *Movement Continuity Instrument* (MCI) on `coherenceacrossscales.org` (CAS).

CAS is the **house of observation and encounter** (restrained, empirical, behavioral), in contrast to Alignos (the house of inquiry and meaning) and The Mutual House (`c:\src\mutualhouse`, the multi-inhabitant household application). Within CAS, **Mutual Assistance** is a top-level section with three equal, unnumbered apertures:
- **Presence** — *The Practice of Mutual Assistance Booklet*
- **Movement** — *The Practice of Mutual Assistance* (Full Manuscript)
- **Trace** — *The Movement Continuity Instrument (MCI)*

All assets are already in the repository:
- Cover images in `public/img/mci/`:
  - `The-Practice-of-Mutual-Assistance-Booklet.jpg` (sleeping whales — Booklet)
  - `The-Practice-of-Mutual-Assistance.jpg` (descending whales — Full Manuscript)
  - `Movement-Continuity-Instrument.jpg` (trace field — MCI)
- Downloadable PDFs in `public/pdf/`:
  - `The Practice of Mutual Assistance (Booklet).pdf`
  - `The Practice of Mutual Assistance.pdf`
  - `Movement Continuity Instrument (MCI) (1).pdf`
- Converted markdown in `openspec/changes/mutual-assistance-section/resources/markdown/`:
  - `pma booklet/` (`0 - pma booklet intro.md` through `10 - pma booklet X.md`)
  - `pma/` (`1 - The Practice of Mutual Assistance - preface.md` through `7 - The Practice of Mutual Assistance - ch6.md`)
  - `Movement Continuity Instrument (MCI).md`

## Goals / Non-Goals

**Goals:**
- Implement the `Mutual Assistance` top-nav section and its three destination apertures exactly as specified in `READ FIRST_Mutual Assistance Section Brief for CAS.md`.
- Reuse the established `HandbookPage.vue` reading pattern (`ContentSidebar` + `MarkdownContent` + prev/next section navigation + `DownloadButton`) for the Booklet and Manuscript online readers.
- Keep the MCI orientation page austere and immediate (**Begin Observation** primary, **MCI Quick Start** secondary) while preserving `/observe` and `/observe/r/:token` continuity.
- Move the converted markdown into `src/content/mutual-assistance/` and clean up PDF line-break artifacts without changing James's copy.

**Non-Goals:**
- Modifying the MCI item bank, sitting mechanics, results epilogue, or Neon instrument tables (all scoped to sibling change `mci-observation-instrument`).
- Building any Mutual House multi-user or MCP features on CAS (scoped to `c:\src\mutualhouse`).
- Numbering or sequencing the three Mutual Assistance offerings.

## Decisions

### 1. Route Structure & Legacy `/observe` Continuity

```
/mutual-assistance                   → MutualAssistancePage.vue (Head page: 3 apertures)
/mutual-assistance/booklet           → PmaBookletReaderPage.vue (Presence: Intro + I–X + PDF)
/mutual-assistance/manuscript        → PmaManuscriptReaderPage.vue (Movement: Preface + Ch 1–6 + PDF)
/mutual-assistance/mci               → ObservePage.vue (Trace: Orientation + Begin Observation + Quick Start link)
/mutual-assistance/mci/quick-start   → MciQuickStartPage.vue (Quick Start online + PDF)

/observe                             → Alias or redirect to /mutual-assistance/mci
/observe/pma-booklet                 → Redirect to /mutual-assistance/booklet
/observe/r/:token                    → ObserveReturnPage.vue (Unchanged, noindex)
```

**Why:** Hosting the MCI orientation and in-place sitting at `/mutual-assistance/mci` (while keeping `/observe` as an alias/redirect and `/observe/r/:token` untouched) gives visitors a coherent path (`Mutual Assistance` → `MCI` → `← Back to Mutual Assistance`) without breaking existing return tokens or bookmarks.

### 2. Reuse `HandbookPage` Reader Pattern for Booklet and Manuscript

**Decision:** Load `src/content/mutual-assistance/booklet/*.md` and `src/content/mutual-assistance/manuscript/*.md` via `import.meta.glob` in `src/utils/content.js` (matching `getHandbookSections()`), and render both readers using `ContentSidebar`, `MarkdownContent`, prev/next navigation, and `DownloadButton`, with `← Back to Mutual Assistance` at the top.

**Why:** Consistent with `.arch-docs/design-principles.md` (*"If a simpler structure works, use it — no abstraction layers that don't earn their place"*). Both readers share the exact same layout and interaction model as `/work/handbook`.

### 3. Tone Split: Invitational Ecology, Austere Sitting

**Decision:**
- The head page (`/mutual-assistance`), Booklet reader, Manuscript reader, and Quick Start page are public, indexable pages that may use the name **Movement Continuity Instrument (MCI)** and display the cover artwork.
- On `/mutual-assistance/mci`, the orientation remains James's concise "Before You Begin" text. Clicking **Begin Observation** transitions into the austere `ObserveSitting` component without cover images or Mutual Assistance promotional chrome.
- `/observe/r/:token` remains `noindex` because the URL contains a bearer token.

### 4. Navigation Placement

**Decision:** Place `{ to: '/mutual-assistance', label: 'Mutual Assistance' }` in `SiteHeader.vue` immediately after `Practice` (`Practice · Mutual Assistance · Observatory · Interpretive · The Work · About`), and verify desktop header spacing so the six links do not wrap awkwardly on standard desktop viewports.
