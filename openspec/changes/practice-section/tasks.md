## 1. Router Setup

- [ ] 1.1 Add four new routes to `src/router/index.js`: `/practice/the-loop`, `/practice/projects`, `/practice/embodied-transcendence`, `/practice/definitions`
- [ ] 1.2 Verify the existing `/practice` route still resolves to `PracticePage.vue` (will be replaced in task 3.1)

## 2. Practice Sub-Nav Component

- [ ] 2.1 Create `src/components/PracticeSubNav.vue` with five router-links: Practice, The Loop, Projects, Embodied Transcendence, Definitions
- [ ] 2.2 Style `PracticeSubNav.vue` — horizontal, minimal, calm; active link visually distinguished; flex-wrap on small viewports

## 3. Practice Landing Page

- [ ] 3.1 Replace the content of `src/pages/PracticePage.vue` — remove `SlideCarousel` and import `PracticeSubNav`; render all five spec-defined content sections verbatim
- [ ] 3.2 Verify all five sections render: intro, Orientation: The Loop (with loop sequence), Why Practice Exists (bullet list), Enter a Practice (four entries), Working Hypothesis

## 4. The Loop Page

- [ ] 4.1 Create `src/pages/PracticeTheLoopPage.vue` — import `PracticeSubNav`; render all eight spec-defined sections verbatim
- [ ] 4.2 Verify the Sovereign Presence statement is rendered as a visually emphasized bold block

## 5. Projects Page

- [ ] 5.1 Create `src/pages/PracticeProjectsPage.vue` — import `PracticeSubNav`; render intro prose and all three project entries (Question, Focus, Mechanism explored, entry link)
- [ ] 5.2 Add entry links for each project (placeholders acceptable for v1 if target routes don't exist yet)

## 6. Embodied Transcendence Page

- [ ] 6.1 Create `src/pages/PracticeEmbodiedTranscendencePage.vue` — import `PracticeSubNav`; render spec-defined prose under "Coherence conducted through ordinary life"

## 7. Definitions Page

- [ ] 7.1 Create `src/pages/PracticeDefinitionsPage.vue` — import `PracticeSubNav`; render "Operational language for lived coherence" heading, intro description, all thirteen terms as a list
- [ ] 7.2 Render the closing statement: "Language stabilizes practice. Practice stabilizes participation."

## 8. Unified Submission Form

- [ ] 8.1 Create `src/components/PracticeSubmissionForm.vue` with all seven fields (Context required, What shifted? required, five optional fields), and a "Submit anonymously" button
- [ ] 8.2 Implement a visible confirmation state displayed after form submission (no API wiring required for v1)
- [ ] 8.3 Include `PracticeSubmissionForm` on the Projects page below the three project listings

## 9. Global Footer Update

- [ ] 9.1 Add the line "A quiet laboratory of shared becoming." to `src/components/SiteFooter.vue`
- [ ] 9.2 Confirm the line does not appear duplicated in any Practice page body content

## 10. Cleanup

- [ ] 10.1 Search codebase for any other consumers of `getPracticeSlides()` in `src/utils/content.js`
- [ ] 10.2 Remove or deprecate `getPracticeSlides()` from `src/utils/content.js` if no other consumers exist
- [ ] 10.3 Archive `src/content/practice/slide-*.md` files (move to an `_archive` subfolder or delete if unused)
