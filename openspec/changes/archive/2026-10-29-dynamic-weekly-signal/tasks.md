## 1. Database & API Setup

- [x] 1.1 Create the `current_signals` table in Neon Postgres (id, created_at, label, timeframe, content) — created manually via Neon SQL editor
- [x] 1.2 Create `POST /api/weekly-signal` endpoint to insert a new Weekly Signal (admin auth required)
- [x] 1.3 Create `GET /api/weekly-signal` endpoint to fetch the most recent Weekly Signal

## 2. Admin Interface Refactor

- [x] 2.1 Refactor `AdminPage.vue` to extract existing Interpretive Works logic into `<AdminInterpretiveWorks>` component
- [x] 2.2 Create `<AdminWeeklySignal>` component for authoring Weekly Signals
- [x] 2.3 Add a dropdown or tab selector to `AdminPage.vue` to toggle between Interpretive Works and Weekly Signal views

## 3. Weekly Signal Authoring

- [x] 3.1 Add "Label", "Timeframe", and Markdown "Content" inputs to `<AdminWeeklySignal>`
- [x] 3.2 Implement live Markdown preview in `<AdminWeeklySignal>` using `marked` and `dompurify` (via shared `<WeeklySignalDisplay>`)
- [x] 3.3 Wire up the "Publish Now" button to call `POST /api/weekly-signal` and handle success/error states

## 4. Observatory Page Integration

- [x] 4.1 Update `ObservatoryPage.vue` to fetch data from `GET /api/weekly-signal` on mount
- [x] 4.2 Replace hardcoded HTML in the `.weekly-signal__body` with a `v-html` block rendering the sanitized Markdown (via shared `<WeeklySignalDisplay>`)
- [x] 4.3 Add CSS rules (in shared `<WeeklySignalDisplay>`) to style standard Markdown tags (`blockquote`, `p`, `em`, etc.) to match the old `.signal-quote` and `.signal-closing` classes
