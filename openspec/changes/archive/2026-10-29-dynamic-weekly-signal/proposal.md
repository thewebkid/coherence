## Why

The "Weekly Signal" section on the Observatory page is currently hardcoded in the Vue component. To enable the site owner to easily publish new weekly signals without deploying code changes, we need to move this content to a database-driven approach. This allows for fluid, markdown-based content updates while preserving the exact existing visual design.

## What Changes

- Create a new `current_signals` Postgres table to store signal data (label, timeframe, content). Named frequency-agnostically so the cadence (weekly, daily, monthly) can evolve without a rename.
- Update the `AdminPage.vue` to include a new "Weekly Signal" authoring interface alongside the existing Interpretive Works.
- Add a markdown editor with a live preview in the admin interface.
- Update `ObservatoryPage.vue` to fetch and display the most recently published signal from the database.
- Parse markdown content using `marked` and `dompurify`, and apply CSS to ensure standard markdown tags match the existing custom styling.

## Capabilities

### New Capabilities
- `weekly-signal-management`: The ability for administrators to author and publish new Weekly Signals via the admin dashboard.
- `dynamic-observatory-content`: The ability for the Observatory page to dynamically fetch and render the latest Weekly Signal from the database.

### Modified Capabilities
- `admin-dashboard`: Extending the existing admin dashboard to support multiple content types (Interpretive Works and Weekly Signals).

## Impact

- **Database**: Adds a new `current_signals` table to the Neon Postgres database.
- **Frontend**: Modifies `AdminPage.vue` to support tabbed navigation and a new authoring component. Modifies `ObservatoryPage.vue` to fetch data on load.
- **Backend API**: Adds new API endpoints (e.g., `GET /api/signals/current` and `POST /api/signals`) for fetching and publishing signals.
- **Dependencies**: Utilizes existing `marked` and `dompurify` dependencies for markdown parsing and sanitization.
