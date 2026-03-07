## Context

The site is a Vue 3 + Vite SSG application using `vue-router` v4 with manually declared routes. The current Practice section is a single route (`/practice`) backed by `PracticePage.vue`, which renders a `SlideCarousel` fed by five `slide-*.md` content files loaded via `import.meta.glob`.

The client specification (v1.3) defines an expanded Practice section: five distinct pages with their own prose content and a persistent horizontal sub-navigation. The existing carousel pattern is incompatible with this structure and will be replaced.

Stakeholders: client (content owner), builder (implementation). All prose content is verbatim from `practice-section.spec.md` — it must not be rewritten.

## Goals / Non-Goals

**Goals:**
- Implement five new/replaced routes: `/practice`, `/practice/the-loop`, `/practice/projects`, `/practice/embodied-transcendence`, `/practice/definitions`
- Build a `PracticeSubNav` component rendered consistently across all five pages, linking each route with minimal, calm styling
- Replace `PracticePage.vue` with a new landing page matching the spec content
- Add four new page components for the sub-section pages
- Add the unified submission form component used within the Projects page
- Add the global footer line to `SiteFooter.vue`
- Retire the slide carousel, `getPracticeSlides()`, and `slide-*.md` files

**Non-Goals:**
- Data persistence or back-end for submission form (v1 = UI only; form submission behavior is out of scope unless confirmed)
- Visual design system changes outside the Practice sub-nav and page layout
- Any change to routes outside the `/practice` prefix
- Pagination, filtering, or visualization of submissions (tagged as v2+ in spec)

## Decisions

**1. Sub-routes vs. query params vs. tabs**
Using actual sub-routes (`/practice/the-loop`, etc.) rather than query params or tab state. Rationale: each page has unique prose content and its own identity; deep-linking and browser history should work naturally. Vue Router child routes (nested `<RouterView>`) are an option but add layout complexity without benefit — flat named routes with a shared sub-nav component is simpler and sufficient.

**2. Sub-nav as a standalone component, not a layout**
`PracticeSubNav.vue` will be imported and rendered at the top of each of the five Practice page components, rather than injected via a nested layout or `App.vue` conditional. Rationale: the site has no existing per-section layout mechanism. Adding one would be a larger architectural change. Co-locating the sub-nav import in each page component is explicit, low-coupling, and matches the existing pattern.

**3. Content in `.vue` SFC templates, not markdown files**
The spec content is structured prose with specific typographic intent (em-dashes, line breaks, bold terms). Rendering it from markdown adds a parsing layer with no benefit — the content is stable and not CMS-driven. Content lives directly in each page's SFC template as semantic HTML. This avoids `marked`/`remark` dependencies and keeps the rendering chain simple.

**4. Submission form: UI only, no backend wiring**
The spec describes the form's fields and anonymous submission intent. No backend endpoint or database is specified. V1 implementation: form renders correctly with all fields; submission triggers a visible confirmation state (no API call). This matches the spec's intent while keeping scope controlled.

**5. Route registration: flat named child routes**
Five routes will be added to `src/router/index.js`:
- `{ path: '/practice', name: 'practice', component: PracticePage }`
- `{ path: '/practice/the-loop', name: 'practice-the-loop', component: PracticeTheLoopPage }`
- `{ path: '/practice/projects', name: 'practice-projects', component: PracticeProjectsPage }`
- `{ path: '/practice/embodied-transcendence', name: 'practice-embodied-transcendence', component: PracticeEmbodiedTranscendencePage }`
- `{ path: '/practice/definitions', name: 'practice-definitions', component: PracticeDefinitionsPage }`

The existing `/practice` route is replaced in place; no redirect needed.

## Risks / Trade-offs

- **Risk**: Slide carousel removal breaks any existing bookmark/link to carousel-specific behavior → **Mitigation**: The carousel was an internal implementation detail, not a public deep-link. The `/practice` URL remains valid.
- **Risk**: Verbatim prose content in SFC templates is harder to edit for non-developer content owners → **Mitigation**: Acceptable for v1; content is stable per spec. A content extraction pass can happen separately if needed.
- **Risk**: Sub-nav adds visual weight on mobile → **Mitigation**: Styled minimally; wraps gracefully on small viewports using flex-wrap. Matches the "clean, minimal, calm" design direction.
- **Risk**: `getPracticeSlides()` import in other files → **Mitigation**: Search codebase before removal to confirm no other consumers.
