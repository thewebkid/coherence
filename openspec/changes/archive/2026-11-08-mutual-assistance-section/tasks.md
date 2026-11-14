## 1. Content Relocation & Markdown Cleanup

- [x] 1.1 Copy converted Booklet markdown files (`0 - pma booklet intro.md` through `10 - pma booklet X.md`) from `openspec/changes/mutual-assistance-section/resources/markdown/pma booklet/` into `src/content/mutual-assistance/booklet/` with clean zero-padded filenames (`00-intro.md` .. `10-part-x.md`). Fix PDF line-wrap scars (including the 11-word vow line break in `00-intro.md`) without changing James's words.
- [x] 1.2 Copy converted Full Manuscript markdown files (`1 - The Practice of Mutual Assistance - preface.md` through `7 - The Practice of Mutual Assistance - ch6.md`) into `src/content/mutual-assistance/manuscript/` (`01-preface.md` .. `07-chapter-6.md`) and clean up PDF line-wrap artifacts without altering copy.
- [x] 1.3 Copy `Movement Continuity Instrument (MCI).md` into `src/content/mutual-assistance/mci/quick-start.md`.
- [x] 1.4 Add `getPmaBookletSections()` and `getPmaManuscriptSections()` helpers in `src/utils/content.js` following the `getHandbookSections()` pattern.

## 2. Mutual Assistance Head Page & Reader Pages

- [x] 2.1 Create `src/pages/mutual-assistance/MutualAssistancePage.vue` implementing the sparse head page (`H1: The Practice of Mutual Assistance`, two-paragraph intro, and the three unnumbered apertures: **Presence — The Booklet**, **Movement — The Full Manuscript**, **Trace — The Movement Continuity Instrument**) with both image and title clickable for each aperture.
- [x] 2.2 Create `src/pages/mutual-assistance/PmaBookletPage.vue` with `← Back to Mutual Assistance`, `ContentSidebar`, `MarkdownContent`, prev/next section buttons, and `DownloadButton` for `/pdf/The Practice of Mutual Assistance (Booklet).pdf`.
- [x] 2.3 Create `src/pages/mutual-assistance/PmaManuscriptPage.vue` with `← Back to Mutual Assistance`, `ContentSidebar`, `MarkdownContent`, prev/next chapter buttons, and `DownloadButton` for `/pdf/The Practice of Mutual Assistance.pdf`.
- [x] 2.4 Create `src/pages/mutual-assistance/MciQuickStartPage.vue` rendering `quick-start.md` online with `← Back to Mutual Assistance` / `← Back to MCI` and a `DownloadButton` for `/pdf/Movement Continuity Instrument (MCI) (1).pdf`.

## 3. MCI Doorway, Routing & Navigation

- [x] 3.1 Update `src/pages/observe/ObservePage.vue` (served at `/mutual-assistance/mci` and aliased/redirected from `/observe`) to include `← Back to Mutual Assistance` on the orientation step, update the PMA booklet/manuscript links to `/mutual-assistance/booklet` and `/mutual-assistance/manuscript`, and offer **Begin Observation** (primary) plus **MCI Quick Start** (secondary link to `/mutual-assistance/mci/quick-start`).
- [x] 3.2 Update `src/router/index.js` to register `/mutual-assistance`, `/mutual-assistance/booklet`, `/mutual-assistance/manuscript`, `/mutual-assistance/mci`, and `/mutual-assistance/mci/quick-start`; redirect `/observe/pma-booklet` → `/mutual-assistance/booklet`; keep `/observe` and `/observe/r/:token` working.
- [x] 3.3 Add `{ to: '/mutual-assistance', label: 'Mutual Assistance' }` to `src/components/SiteHeader.vue` (and verify desktop nav spacing so 6 items do not wrap awkwardly) and update `src/content/updates.js` so the Mutual Assistance / Observational Instrument entry links to `/mutual-assistance`.

## 4. Verification

- [x] 4.1 Verify on local dev server (`:5777`) that Top Nav → `/mutual-assistance` → all three apertures (Booklet reader + PDF, Manuscript reader + PDF, MCI doorway + Quick Start + PDF) render cleanly, back links work, and `/observe/r/:token` remains intact and `noindex`.
