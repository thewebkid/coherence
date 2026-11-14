## ADDED Requirements

### Requirement: Index page lists all interpretive works
The system SHALL provide an `/interpretive-works` page that displays a section introduction, lists all available works with title, creator, type, and a "View Work" link, and includes a "Submit an Interpretive Work" link to `/submit-work`.

#### Scenario: Index page renders with intro and work listing
- **WHEN** a visitor navigates to `/interpretive-works`
- **THEN** the page displays the section title "Interpretive Works", the section intro paragraph, at least one work entry (The Practice of Seeing), and a "Submit an Interpretive Work →" link

#### Scenario: Each work entry links to its individual page
- **WHEN** a visitor clicks "View Work →" on any work listing
- **THEN** the browser navigates to `/interpretive-works/[slug]` for that work

### Requirement: Individual work page displays flexible media content
The system SHALL provide an `/interpretive-works/[slug]` page that renders the work title, creator, type, year, medium, intro description, work content (supporting image, essay, video embed, and music embed media types), optional creator reflection, and back navigation to `/interpretive-works`.

#### Scenario: Image work renders artwork and associated reflections
- **WHEN** a visitor navigates to `/interpretive-works/words-of-drawings`
- **THEN** the page displays "The Practice of Seeing", creator "James Mahu", type "Visual Art / Writing", the large artwork image(s), accompanying reflection text, and a "← Back to Interpretive Works" link

#### Scenario: Work page supports previous/next navigation
- **WHEN** a visitor is on an individual work page and multiple works exist
- **THEN** previous and next navigation links are visible and navigate between works in listing order

### Requirement: Submit work page provides a submission form
The system SHALL provide a `/submit-work` page with a form collecting: submitter name, submitter email, work title, work type (Visual Art / Writing / Video / Music / Other), work description, optional external URL to content, and a checkbox for "Display my name publicly if selected".

#### Scenario: Visitor submits a valid work submission
- **WHEN** a visitor fills in all required fields and submits the form
- **THEN** the submission is stored and a confirmation message is displayed

#### Scenario: Visitor submits with missing required fields
- **WHEN** a visitor submits the form with a required field empty
- **THEN** an inline validation message is displayed and the form is not submitted

### Requirement: Section visual tone is warm but architecturally consistent
The system SHALL apply a subtly warmer background tone, slightly increased prose line spacing, and optionally a secondary accent color for section headings and dividers in the interpretive works section — while preserving the same navigation, layout grid, typography family, page width, and spacing system as the rest of the site.

#### Scenario: Dark mode warm tone
- **WHEN** a visitor views `/interpretive-works` in dark mode
- **THEN** the background is a slightly warmer dark neutral (not the same pure dark as other sections) and the typography and grid remain identical to the rest of the site

#### Scenario: Light mode warm tone
- **WHEN** a visitor views `/interpretive-works` in light mode
- **THEN** the background has a subtle parchment or warm-white tone and the layout/nav/type are unchanged from other sections
