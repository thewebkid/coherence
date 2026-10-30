## ADDED Requirements

### Requirement: Projects index page presents the three experiments as gateway
The `/practice/projects` route SHALL render the Projects index page. The page SHALL present all three projects (The Observation Project, The Behavioral Ecology Project, Conversational Recursion) with each project's: title, sub-title, core question, focus statement, mechanism explored, and a navigable entry link. The page SHALL also include the "Integrative Principle" section showing the loop and the connection to embodied transcendence. The tone SHALL be experimental, not institutional.

#### Scenario: Projects index renders all three project entries
- **WHEN** a visitor navigates to `/practice/projects`
- **THEN** the page displays all three project entries with their titles, questions, and entry links

#### Scenario: Entry link for each project navigates correctly
- **WHEN** a visitor clicks "[Enter The Observation Project]" on the projects index
- **THEN** the visitor is navigated to `/practice/projects/observation`

#### Scenario: Entry link for Behavioral Ecology navigates correctly
- **WHEN** a visitor clicks "[Enter The Behavioral Ecology Project]" on the projects index
- **THEN** the visitor is navigated to `/practice/projects/behavioral-ecology`

#### Scenario: Entry link for Conversational Recursion navigates correctly
- **WHEN** a visitor clicks "[Enter Conversational Recursion]" on the projects index
- **THEN** the visitor is navigated to `/practice/projects/conversational-recursion`

### Requirement: Projects index page has correct meta tags
The page SHALL have a `<title>` of "Projects — Practice — Coherence Across Scales" and an appropriate meta description.

#### Scenario: Meta title is set correctly
- **WHEN** a visitor loads `/practice/projects`
- **THEN** the browser tab displays "Projects — Practice — Coherence Across Scales"
