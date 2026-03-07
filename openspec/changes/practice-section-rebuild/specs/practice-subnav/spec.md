## ADDED Requirements

### Requirement: Horizontal sub-menu present on all Practice section pages
A horizontal sub-menu SHALL appear consistently at the top of every page within the Practice section (`/practice`, `/practice/the-loop`, `/practice/projects`, `/practice/projects/*`, `/practice/embodied-transcendence`, `/practice/definitions`). The sub-menu SHALL contain five links in order: Practice, The Loop, Projects, Embodied Transcendence, Definitions.

#### Scenario: Sub-menu renders on Practice landing page
- **WHEN** a visitor navigates to `/practice`
- **THEN** the horizontal sub-menu is visible with all five links

#### Scenario: Sub-menu renders on The Loop page
- **WHEN** a visitor navigates to `/practice/the-loop`
- **THEN** the horizontal sub-menu is visible with all five links

#### Scenario: Sub-menu renders on Projects index page
- **WHEN** a visitor navigates to `/practice/projects`
- **THEN** the horizontal sub-menu is visible with all five links

#### Scenario: Sub-menu renders on a project detail page
- **WHEN** a visitor navigates to any of `/practice/projects/observation`, `/practice/projects/behavioral-ecology`, or `/practice/projects/conversational-recursion`
- **THEN** the horizontal sub-menu is visible with all five links

#### Scenario: Sub-menu renders on Embodied Transcendence page
- **WHEN** a visitor navigates to `/practice/embodied-transcendence`
- **THEN** the horizontal sub-menu is visible with all five links

#### Scenario: Sub-menu renders on Definitions page
- **WHEN** a visitor navigates to `/practice/definitions`
- **THEN** the horizontal sub-menu is visible with all five links

### Requirement: Active link highlighted in sub-menu
The currently active Practice sub-page link SHALL be visually distinguished (e.g., different color or weight) from the inactive links.

#### Scenario: Active link reflects current route
- **WHEN** a visitor is on `/practice/the-loop`
- **THEN** the "The Loop" link in the sub-menu appears in its active state and all other links appear inactive

### Requirement: Sub-menu links navigate to correct routes
Each sub-menu link SHALL navigate to its corresponding page: Practice → `/practice`, The Loop → `/practice/the-loop`, Projects → `/practice/projects`, Embodied Transcendence → `/practice/embodied-transcendence`, Definitions → `/practice/definitions`.

#### Scenario: Clicking a sub-menu link navigates to the correct page
- **WHEN** a visitor clicks "Definitions" in the sub-menu
- **THEN** the visitor is navigated to `/practice/definitions`
