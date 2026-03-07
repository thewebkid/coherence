## Why

The Practice section currently presents a single-page slide carousel that does not match the depth and structure of the content now specified by the client. The spec defines five distinct pages with their own content and a persistent sub-navigation — none of which exist in the current implementation.

## What Changes

- Replace the current slide-carousel `PracticePage.vue` with a new Practice landing page containing full spec-driven prose content
- Add four new sub-pages under `/practice`: The Loop, Projects, Embodied Transcendence, and Definitions
- Add a persistent Practice sub-navigation component rendered across all five Practice pages
- Add a unified observational submission form used across all three Projects sub-pages
- Add the global footer line **"A quiet laboratory of shared becoming."** to `SiteFooter.vue`
- Register five new routes in `src/router/index.js` under the `/practice` path prefix
- Remove or archive the existing `src/content/practice/slide-*.md` files and `getPracticeSlides()` utility (no longer needed)

## Capabilities

### New Capabilities

- `practice-landing`: Landing page for the Practice section — orientation and invitation into lived practice, with sub-navigation
- `practice-sub-nav`: Horizontal sub-menu component (Practice / The Loop / Projects / Embodied Transcendence / Definitions) rendered on all Practice pages
- `practice-the-loop`: Page describing the behavioral physics of embodied coherence and the Observer → Propagation loop
- `practice-projects`: Index page listing the three practice projects with testable questions and entry links
- `practice-embodied-transcendence`: Page on coherence conducted through ordinary life
- `practice-definitions`: Page of operational language/definitions for lived coherence
- `practice-submission-form`: Unified anonymized observational submission form used across all three project pages

### Modified Capabilities

- `site-footer`: Add global footer line "A quiet laboratory of shared becoming." to the existing footer

## Impact

- `src/pages/PracticePage.vue` — replaced entirely
- `src/components/SiteFooter.vue` — footer line addition
- `src/router/index.js` — five new routes registered
- `src/content/practice/` — existing slide markdown files deprecated; new content lives in page components or new content files
- `src/utils/content.js` — `getPracticeSlides()` removed or deprecated
- No new external dependencies required
