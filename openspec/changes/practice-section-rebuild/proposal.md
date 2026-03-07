## Why

The Practice section is the behavioral core of the site — its most important element — and the current content does not reflect the full architectural clarity of v1.3. The existing page lacks the structural depth, navigational coherence, and multi-page organization that the work demands. This rebuild replaces existing Practice content with a complete, architecturally aligned section built around five pages, a persistent horizontal sub-menu, a unified observational submission form, and a globally placed footer tagline.

## What Changes

- Replace current Practice landing page content with an updated orientation page (v1.3 language and structure)
- Add four new Practice sub-pages: The Loop, Projects (index), Embodied Transcendence, and Definitions
- Add three project detail pages under Projects: The Observation Project, The Behavioral Ecology Project, and Conversational Recursion
- Add a persistent horizontal sub-menu on all Practice section pages: Practice | The Loop | Projects | Embodied Transcendence | Definitions
- Implement a single unified observational submission form used across all three project pages, with a project-context field auto-filled based on entry point, storing submissions to one shared database
- Add the global footer tagline "A quiet laboratory of shared becoming." in small text across all site pages
- Add the tagline variant "This work is offered as a quiet laboratory of shared becoming." to the Contact/Institutional Inquiries page

## Capabilities

### New Capabilities

- `practice-subnav`: Horizontal sub-menu present on all Practice section pages with five links: Practice, The Loop, Projects, Embodied Transcendence, Definitions
- `practice-landing`: Updated Practice landing page serving as section orientation — working hypothesis, loop orientation summary, project entry points
- `the-loop`: The Loop page — full explanation of the behavioral recursion architecture (Observer → Relational Coherence → Sovereign Presence → Propagation → Observer)
- `projects-index`: Projects index page — gateway to the three experiments, presenting each project's core question and mechanism without overwhelming detail
- `observation-project`: The Observation Project detail page — observer stabilization hypothesis, suggested exploration, observational form
- `behavioral-ecology-project`: The Behavioral Ecology Project detail page — ecological spread hypothesis, suggested exploration, observational form
- `conversational-recursion`: Conversational Recursion detail page — identity-level amplification hypothesis, suggested exploration, observational form
- `embodied-transcendence`: Embodied Transcendence page — integrative principle linking presence and propagation across scales
- `definitions`: Definitions page — operational language glossary for all terms used throughout the Practice section
- `unified-observation-form`: Single submission form component shared across all three project pages; auto-populates project context (Observation / Behavioral Ecology / Conversational Recursion); seven core fields; stores to a Neon Postgres `observations` table via `@neondatabase/serverless`; anonymous submission; designed to support future pattern visualization (v2+)
- `global-footer-tagline`: "A quiet laboratory of shared becoming." added in small text globally to the site footer, and a variant placed on the Contact page

### Modified Capabilities

## Impact

- All Practice section routes and page components (existing Practice page replaced, new sub-pages added)
- Site-wide layout/footer component (global tagline addition)
- Contact page template (tagline variant placement)
- Database: new `observations` table in Neon Postgres (via Vercel integration); `@neondatabase/serverless` added as dependency
- Navigation: Practice sub-menu component injected into Practice section layout
- No breaking API changes; submission form is new infrastructure
