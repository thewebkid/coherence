## 1. Routing and Layout Foundation

- [ ] 1.1 Update `src/router/index.js` to add the `PracticeLayout` parent route at `/practice` with a nested empty-path child for the landing page and children for all Practice sub-pages: `/the-loop`, `/projects` (with its own children `/observation`, `/behavioral-ecology`, `/conversational-recursion`), `/embodied-transcendence`, `/definitions`
- [ ] 1.2 Create `src/components/PracticeLayout.vue` — wrapper component containing the horizontal sub-menu (five `RouterLink` items: Practice, The Loop, Projects, Embodied Transcendence, Definitions) and a `<RouterView />` slot; apply active-link styling using Vue Router's `activeClass`
- [ ] 1.3 Style the `PracticeLayout` sub-menu to be clean, minimal, and calm; horizontal, spaced links with a subtle active state; consistent with the site's SCSS design system

## 2. Practice Landing Page

- [ ] 2.1 Replace `src/pages/PracticePage.vue` content entirely with the v1.3 orientation content: section heading, opening statement, loop diagram, "Why Practice Exists" section, "Enter a Practice" section with project links, Working Hypothesis, and closing italic line
- [ ] 2.2 Add `RouterLink` entries in the "Enter a Practice" section pointing to all four practice areas (three project pages and Embodied Transcendence)
- [ ] 2.3 Update `useHead` meta tags on `PracticePage.vue` with the correct title and description

## 3. The Loop Page

- [ ] 3.1 Create `src/pages/practice/TheLoopPage.vue` with all sections: opening, loop diagram, The Formative Observer, Relational Coherence, Sovereign Presence, Propagation, Across Scales, Transcendent Embodiment, Working Hypothesis, and closing italic line
- [ ] 3.2 Set `useHead` meta tags with title "The Loop — Practice — Coherence Across Scales"

## 4. Projects Index Page

- [ ] 4.1 Create `src/pages/practice/ProjectsIndexPage.vue` with all three project summaries (title, core question, focus, mechanism, entry link) and the Integrative Principle section
- [ ] 4.2 Wire each project's entry `RouterLink` to the correct sub-route (`/practice/projects/observation`, etc.)
- [ ] 4.3 Set `useHead` meta tags with title "Projects — Practice — Coherence Across Scales"

## 5. Project Detail Pages

- [ ] 5.1 Create `src/pages/practice/ObservationProjectPage.vue` with all sections from the spec and the `ObservationForm` component with `project="Observation"`
- [ ] 5.2 Set `useHead` meta tags on `ObservationProjectPage.vue`
- [ ] 5.3 Create `src/pages/practice/BehavioralEcologyProjectPage.vue` with all sections from the spec and the `ObservationForm` component with `project="Behavioral Ecology"`
- [ ] 5.4 Set `useHead` meta tags on `BehavioralEcologyProjectPage.vue`
- [ ] 5.5 Create `src/pages/practice/ConversationalRecursionPage.vue` with all sections from the spec and the `ObservationForm` component with `project="Conversational Recursion"`
- [ ] 5.6 Set `useHead` meta tags on `ConversationalRecursionPage.vue`

## 6. Embodied Transcendence Page

- [ ] 6.1 Create `src/pages/practice/EmbodiedTranscendencePage.vue` with all sections: opening reframing, A Different Orientation, Presence, Propagation, Presence → Propagation, Across Scales, A Working Understanding, Why This Matters, A Simple Way to Hold It, and closing italic line
- [ ] 6.2 Set `useHead` meta tags with title "Embodied Transcendence — Practice — Coherence Across Scales"

## 7. Definitions Page

- [ ] 7.1 Create `src/pages/practice/DefinitionsPage.vue` with introductory framing and all thirteen definition sections (Presence, Propagation, Formative Observer, Coherence, Relational Coherence, Sovereign Presence, Conversational Recursion, Embodied Transcendence, Clear Seeing, Regulation, Participation, Field Effect, Observer Effect)
- [ ] 7.2 Set `useHead` meta tags with title "Definitions — Practice — Coherence Across Scales"

## 8. Unified Observation Form Component

- [ ] 8.1 Create `src/components/ObservationForm.vue` accepting a `project` prop; display project context as a read-only label at top
- [ ] 8.2 Implement the seven form fields: Context (required), What shifted (required), What did not shift (optional), Where coherent (optional), Where resistant or unclear (optional), Additional notes (optional), Geography (optional)
- [ ] 8.3 Implement client-side validation: prevent submit if required fields are empty, show inline error messages
- [ ] 8.4 Implement form submission: POST to `/api/submit-observation` with all field values and project context as JSON; handle loading, success, and error states
- [ ] 8.5 On success, display a quiet confirmation message ("Your observation has been received.") in place of or below the form; on error, show a gentle error state and preserve form content

## 9. Database Schema and Observation Submission API

- [ ] 9.1 Create `scripts/migrate-observations.js` — a one-time migration script using `@neondatabase/serverless` with `DATABASE_URL_UNPOOLED` (direct connection required for DDL) to run `CREATE TABLE IF NOT EXISTS observations (id SERIAL PRIMARY KEY, project TEXT NOT NULL, context TEXT NOT NULL, what_shifted TEXT NOT NULL, what_did_not_shift TEXT, where_coherent TEXT, where_resistant TEXT, notes TEXT, geography TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`
- [ ] 9.2 Run the migration script once: `node scripts/migrate-observations.js` — verify the `observations` table exists in the Neon dashboard before proceeding
- [ ] 9.3 Create `api/submit-observation.js` Vercel serverless function using `@neondatabase/serverless` with `POSTGRES_URL` (pooled connection)
- [ ] 9.4 Validate request method (POST only) and required fields (`project`, `context`, `whatShifted`); return 400 with descriptive error for invalid requests
- [ ] 9.5 Check for `POSTGRES_URL` env var; return 500 with developer-facing message if missing
- [ ] 9.6 INSERT the submission into the `observations` table using a parameterized query (never string-interpolate user input); `created_at` is set by Postgres `DEFAULT NOW()`
- [ ] 9.7 Return HTTP 200 `{ success: true }` on successful storage

## 10. Global Footer Tagline

- [ ] 10.1 Add "A quiet laboratory of shared becoming." to `src/components/SiteFooter.vue` inside the `footer-bottom` section, styled as small, muted text consistent with the existing footer-attribution/footer-copyright style
- [ ] 10.2 Add "This work is offered as a quiet laboratory of shared becoming." to `src/pages/ContactPage.vue`, placed below the main contact content

## 11. Final Verification

- [ ] 11.1 Verify all nine Practice routes render without errors and the sub-menu appears on each
- [ ] 11.2 Verify sub-menu active link highlights correctly on each page
- [ ] 11.3 Verify the observation form renders on all three project pages with the correct project context auto-filled
- [ ] 11.4 Verify the global footer tagline appears on at least the home page, a work page, and a practice page
- [ ] 11.5 Verify `ContactPage` includes the tagline variant
- [ ] 11.6 Run `npm run build` and confirm no SSG build errors
