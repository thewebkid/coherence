## Context

The "Weekly Signal" section of the Observatory page currently relies on hardcoded HTML in `ObservatoryPage.vue`. To allow James (the site owner) to update this content without deploying code, we are migrating it to a database-driven model. The admin interface will be expanded to support authoring these signals using Markdown, which will then be parsed and rendered on the frontend.

## Goals / Non-Goals

**Goals:**
- Store Weekly Signals in a new `current_signals` Postgres table (frequency-agnostic name).
- Provide a Markdown-based authoring interface in the Admin dashboard.
- Render the latest Weekly Signal dynamically on the Observatory page.
- Ensure the rendered Markdown matches the existing custom CSS styling exactly.

**Non-Goals:**
- Editing existing signals (new signals simply overwrite the current one by being the latest).
- Building a public archive page for past signals (though data will be preserved for future use).
- Modifying the design or layout of the Observatory page.

## Decisions

- **Database Table (`current_signals`)**: We will create a new table with `id`, `created_at`, `label`, `timeframe`, and `content`. We will fetch the single most recent row (`ORDER BY created_at DESC LIMIT 1`) for display. The table is named `current_signals` rather than `weekly_signals` so the publishing cadence (weekly, daily, monthly, ad-hoc) can change without needing a schema rename.
  - *Alternative considered*: A single-row table that gets updated. *Rationale*: A multi-row append-only table naturally supports a future archive feature without schema migrations.
- **Markdown Parsing**: We will use `marked` and `dompurify` on the frontend (both already in `package.json`).
  - *Alternative considered*: Custom Vue components for each block. *Rationale*: Markdown is simpler for authoring and `marked` is already available.
- **WYSIWYG Authoring**: We use `@tiptap/vue-3` + `@tiptap/starter-kit` + `@tiptap/markdown` to give the admin a WYSIWYG editor with Bold/Italic/Blockquote/Bullet List/Link toolbar buttons, while keeping Markdown as the stored transport format.
  - *Alternative considered*: Raw textarea with Markdown hints. *Rationale*: James is not fluent in Markdown; a visual editor removes syntax friction.
  - *Alternative considered*: Storing HTML directly. *Rationale*: Rejected — Markdown is the consistent transport language across the app.
  - *Underline excluded*: Markdown (CommonMark/GFM) has no underline concept. Including an Underline button would either drop data on serialize or inject raw `<u>` HTML, violating the "Markdown-only transport" rule.
- **Pre-fill from latest signal**: When the admin opens the Weekly Signal authoring view, we fetch `GET /api/weekly-signal` and pre-populate all three fields with the latest record. The admin edits a copy, then publishes a new row.
- **Admin Interface Refactor**: `AdminPage.vue` will be refactored to use a tabbed or dropdown selector to switch between the existing Interpretive Works view and the new Weekly Signal authoring view.
  - *Alternative considered*: Creating a separate route (e.g., `/admin/weekly-signal`). *Rationale*: Keeping it in one dashboard simplifies navigation for the sole admin user.
- **CSS Styling**: We will add global or scoped CSS to `ObservatoryPage.vue` to style standard Markdown tags (`<blockquote>`, `<p>`) inside `.weekly-signal__body` to match the old `.signal-quote` and `.signal-closing` classes.

## Risks / Trade-offs

- [Risk] Markdown parsing might introduce XSS vulnerabilities.
  - *Mitigation*: Use `dompurify` to sanitize the HTML output from `marked` before rendering it with `v-html`.
- [Risk] Standard Markdown tags might not perfectly map to the custom classes previously used.
  - *Mitigation*: Write specific CSS selectors (e.g., `.weekly-signal__body blockquote`) to replicate the exact styles of the old custom classes.
