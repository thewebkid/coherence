## Context

The site is a Vue 3 + Vite SPA deployed via Vercel, using `vite-ssg` for static generation. Pages are single-file Vue components under `src/pages/`. Routing is handled by Vue Router (`src/router/index.js`). Styling is SCSS with custom CSS properties. The existing `/practice` route renders `PracticePage.vue` using a slide carousel.

The `api/` directory exists for Vercel serverless functions. `@upstash/redis` is already installed, suggesting a Redis-backed API pattern is already in use elsewhere (e.g., signal submissions). The codebase follows a flat pages convention with shared layout components (`SiteHeader`, `SiteFooter`).

The Practice section currently contains a single page using a SlideCarousel. James's v1.3 spec requires replacing this with a structured multi-page section of five conceptual pages plus three project sub-pages — nine pages total, plus navigation, form, and footer changes.

## Goals / Non-Goals

**Goals:**
- Implement all nine Practice sub-pages as individual Vue page components under `/practice/*` routes
- Create a `PracticeLayout.vue` component with the horizontal sub-menu that wraps all Practice pages
- Replace the current `PracticePage.vue` (landing) with the updated v1.3 orientation content
- Implement `ObservationForm.vue` — a shared form component used across all three project pages
- Create a Vercel API endpoint (`api/submit-observation.js`) that stores submissions to Neon Postgres
- Add the global tagline "A quiet laboratory of shared becoming." to `SiteFooter.vue`
- Add the tagline variant to `ContactPage.vue`

**Non-Goals:**
- v2/v3 pattern visualization and word cloud (spec marks these as future work)
- Admin panel or observation retrieval UI (backend storage only in this change)
- Authentication or access control on submissions
- Changes to site-wide navigation (main nav `Practice` link stays as-is)

## Decisions

### 1. Practice section layout via shared layout component vs. route nesting

**Decision:** Create `PracticeLayout.vue` as a wrapping layout component used in a nested route configuration (`/practice` as parent with `<RouterView />`, sub-pages as children).

**Rationale:** Vue Router's nested routes cleanly isolate the sub-menu to the Practice section without touching `App.vue` or any other layout. The parent route renders `PracticeLayout.vue` (containing the horizontal sub-menu + `<RouterView />`), and each child renders its page component. This is the idiomatic Vue Router approach and avoids duplicating nav markup across nine files.

**Alternative considered:** Add the sub-menu directly to each page component. Rejected — causes duplication and makes the active-link logic harder to maintain.

### 2. Observation form submission backend

**Decision:** Use a Vercel serverless function (`api/submit-observation.js`) with Neon Postgres (via `@neondatabase/serverless`) to store submissions as rows in an `observations` table. Connection uses the `POSTGRES_URL` (pooled via pgBouncer) environment variable injected by Vercel's Neon integration.

**Rationale:** Observation submissions are irreplaceable qualitative reflections from real people. Redis — while already in the stack for signals — is optimized for speed, not durability: it is not ACID-compliant, has no write-ahead log, and offers only a 6-hour point-in-time restore window on the free tier. Postgres is the appropriate tool for data that must not be lost.

Critically, the v2+ pattern visualization James described ("where coherence stabilizes most", cross-project correlations, phrase clustering) requires queryable, structured storage. Redis has no GROUP BY, no WHERE clause, no full-text search — all of that work would have to happen in the serverless function against a full data dump on every page view. Postgres handles these queries natively, at any scale the site is likely to reach.

`@neondatabase/serverless` is installed (`npm install @neondatabase/serverless`). It communicates over HTTP rather than a persistent TCP connection, making it well-suited for Vercel's stateless serverless functions with no connection pool warm-up required.

**Alternative considered:** Storing to Redis (RPUSH to `observation:submissions`). Rejected — not ACID-compliant, no point-in-time recovery, no native query capability, and migration to a queryable store before v2 visualization work would add unnecessary overhead.

**Note on signals vs. observations:** Redis remains correct for the signal map feature. Signals are spatial, numeric, and replaceable — Redis's native GEOADD/GEOPOS commands are purpose-built for that use case. The two features intentionally use different storage layers.

### 3. Form component integration across three project pages

**Decision:** Create a single `ObservationForm.vue` component that accepts a `project` prop (values: `"Observation"`, `"Behavioral Ecology"`, `"Conversational Recursion"`). Each project page passes the appropriate context prop. The form submits to the `/api/submit-observation` endpoint.

**Rationale:** The spec is explicit: one structure, one database. A single component with a prop is the cleanest approach — no duplication, consistent UX, easy future modification.

### 4. Replacing vs. extending PracticePage.vue

**Decision:** Replace the existing `PracticePage.vue` content entirely. The component becomes the Practice landing page (Page 1 of the section). The SlideCarousel import can be removed if no longer used.

**Rationale:** The spec says the new content "replaces the current Practice content." The existing carousel-based implementation is incompatible with the new long-form page design.

### 5. Sub-menu active state

**Decision:** Use Vue Router's `RouterLink` with `activeClass` or `exact-active-class` to handle active link highlighting on the sub-menu.

**Rationale:** Native Vue Router approach — no extra state management needed.

## Risks / Trade-offs

- **Risk:** vite-ssg static generation may require the observation form to degrade gracefully when the API is not available during build. → **Mitigation:** The form component should handle its async submission state client-side; the API endpoint is never called during SSG build.
- **Risk:** `POSTGRES_URL` environment variable may not be set in all environments. → **Mitigation:** The API function checks for its presence on startup and returns a clear 500 with a developer-facing message if missing. Vercel's Neon integration injects it automatically for Development and Production environments; local dev uses `.env.local`.
- **Risk:** The Practice section now has nine routes — adding them all as nested children means the router file grows. → **Mitigation:** This is acceptable for this project scale; no route lazy-loading complications since they're already lazy-loaded via dynamic imports.

## Migration Plan

1. Update `src/router/index.js` to add nested routes under `/practice`
2. Create `PracticeLayout.vue` with sub-menu
3. Refactor `PracticePage.vue` into the landing page content
4. Create eight new Vue page components for the sub-pages
5. Create `ObservationForm.vue` shared component
6. Run database migration script to create the `observations` table in Neon Postgres
7. Create `api/submit-observation.js` Vercel endpoint
8. Update `SiteFooter.vue` with global tagline
9. Update `ContactPage.vue` with tagline variant
10. Test all routes and form submission locally before deploy

Rollback: the original `PracticePage.vue` and router entry are preserved in git; reverting is a single commit undo.

## Open Questions

- Should the `/practice` route redirect to `/practice/` (trailing slash) or use the landing page directly as the index child? Vue Router nested routes handle this via an empty-string path child — no redirect needed.
- Are there any existing analytics/tracking hooks that need to be applied to the new pages? Not visible in the current codebase; assume no action needed.
