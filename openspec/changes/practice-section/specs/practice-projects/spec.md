## ADDED Requirements

### Requirement: Projects page exists at /practice/projects
A new route SHALL exist at `/practice/projects` rendering the `PracticeProjectsPage` component. The page SHALL render the `PracticeSubNav` at the top followed by the intro prose and all three project entries.

#### Scenario: User navigates to /practice/projects
- **WHEN** user navigates to `/practice/projects`
- **THEN** the Projects page renders with sub-nav, intro text, and all three projects listed

### Requirement: Projects page displays all three project entries
The page SHALL display three project entries, each with: project title, Question, Focus, Mechanism explored, and an entry link. Projects are:
1. Project One — The Observation Project
2. Project Two — The Behavioral Ecology Project
3. Project Three — Conversational Recursion

#### Scenario: All three projects are listed
- **WHEN** user views the Projects page
- **THEN** all three projects are rendered with their Question, Focus, Mechanism explored fields, and entry links

#### Scenario: Entry links are present for each project
- **WHEN** user views the Projects page
- **THEN** each project displays a labeled entry link (e.g., "Enter The Observation Project")
