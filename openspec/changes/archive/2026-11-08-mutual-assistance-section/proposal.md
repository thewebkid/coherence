## Why

In his September 17–21 updates (`resources/Sep 17 Email update from James.md` and `resources/READ FIRST_Mutual Assistance Section Brief for CAS.md`), James Mahu clarified that *The Practice of Mutual Assistance* (PMA) and the *Movement Continuity Instrument* (MCI) are not hidden add-ons to `coherenceacrossscales.org` (CAS)—they form a new public **Mutual Assistance** top-navigation section with three unnumbered, independent apertures:

1. **Presence — *The Practice of Mutual Assistance Booklet*** (online reader + PDF download)
2. **Movement — *The Practice of Mutual Assistance* (Full Manuscript)** (online reader + PDF download)
3. **Trace — *Movement Continuity Instrument (MCI)*** (orientation doorway with **Begin Observation** as primary action and **MCI Quick Start** online reader + PDF download as secondary option)

All markdown sources (`resources/markdown/pma booklet/`, `resources/markdown/pma/`, `resources/markdown/Movement Continuity Instrument (MCI).md`), cover images (`public/img/mci/`), and downloadable PDFs (`public/pdf/`) are already converted and present in the repository. Splitting this static content and navigation work out from `mci-observation-instrument` (which handles the stateful MCI v0.1.1 sitting and Neon database refinements) allows the public Mutual Assistance section to ship cleanly and independently.

## What Changes

- **Top Navigation (`SiteHeader.vue`):** Add **Mutual Assistance** (`/mutual-assistance`) to the primary site navigation.
- **Head Page (`/mutual-assistance`):** Sparse, unnumbered landing page (`H1: The Practice of Mutual Assistance`) introducing the three independent apertures (**Presence — The Booklet**, **Movement — The Full Manuscript**, **Trace — The Movement Continuity Instrument**) with clickable cover images and clickable titles.
- **Booklet Reader (`/mutual-assistance/booklet`):** Unobtrusive `← Back to Mutual Assistance` return link, cover image, online section-by-section markdown reader (Intro + Sections I–X using the `HandbookPage` `ContentSidebar` + `MarkdownContent` + prev/next pattern), and `DownloadButton` for `/pdf/The Practice of Mutual Assistance (Booklet).pdf`.
- **Full Manuscript Reader (`/mutual-assistance/manuscript`):** Unobtrusive `← Back to Mutual Assistance` return link, cover image, online chapter-by-chapter markdown reader (Preface + Chapters 1–6 using the same reader pattern), and `DownloadButton` for `/pdf/The Practice of Mutual Assistance.pdf`.
- **MCI Doorway (`/mutual-assistance/mci`) & Quick Start (`/mutual-assistance/mci/quick-start`):**
  - Doorway includes `← Back to Mutual Assistance`, James's existing short orientation copy (with PMA context links pointing to the sibling Booklet and Manuscript pages), **Begin Observation** as primary action, and **MCI Quick Start** as secondary option.
  - Quick Start page renders `Movement Continuity Instrument (MCI).md` online with `← Back to MCI` and a PDF download button for `/pdf/Movement Continuity Instrument (MCI) (1).pdf` (using a clean download filename).
- **Content Relocation & Line-Wrap Cleanup:** Copy the converted markdown files from `openspec/changes/mutual-assistance-section/resources/markdown/` into `src/content/mutual-assistance/{booklet,manuscript,mci}/`, fixing only PDF conversion line-wrap artifacts (such as the split 11-word vow in the booklet intro) without altering James's wording.
- **Redirects & Continuity Preservation:**
  - Redirect `/observe/pma-booklet` → `/mutual-assistance/booklet`.
  - Keep `/observe` and `/observe/r/:token` working so existing return tokens (`3MM4-LZR7-BRMQ`), bookmarks, and `.ics` reminders never break.
  - Update `src/content/updates.js` to point the Mutual Assistance / Observational Instrument entry at `/mutual-assistance`.

## Capabilities

### New Capabilities

- `mutual-assistance-section`: Top-nav entry, sparse three-aperture head page, online + PDF readers for the PMA Booklet and Full Manuscript, MCI doorway, and MCI Quick Start online + PDF page.

### Modified Capabilities

- `site-frame`: Adds `Mutual Assistance` to the primary navigation links in `SiteHeader.vue`.

## Impact

- **Content:** New `src/content/mutual-assistance/` directory containing booklet (11 markdown files), manuscript (7 markdown files), and MCI Quick Start (1 markdown file), wired into `src/utils/content.js` (or dedicated content loaders).
- **Pages & Routing:** New Vue pages under `src/pages/mutual-assistance/` and routes in `src/router/index.js`; updates to `src/pages/observe/ObservePage.vue` and `src/pages/observe/PmaBookletPage.vue` (redirect); update to `src/components/SiteHeader.vue` and `src/content/updates.js`.
- **Database / API:** Zero database or API changes. Instrument sitting refinements remain in sibling change `mci-observation-instrument`.
