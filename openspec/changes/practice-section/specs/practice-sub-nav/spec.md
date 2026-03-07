## ADDED Requirements

### Requirement: Practice sub-navigation renders on all Practice pages
A horizontal sub-navigation component (`PracticeSubNav`) SHALL be rendered at the top of each of the five Practice section pages. It SHALL contain five links in order: Practice, The Loop, Projects, Embodied Transcendence, Definitions. Each link SHALL navigate to its corresponding route. The active link (matching the current route) SHALL be visually distinguished. The component SHALL be styled minimally, calmly, and horizontally. On small viewports it SHALL wrap gracefully without breaking layout.

#### Scenario: Sub-nav appears on Practice landing
- **WHEN** user navigates to `/practice`
- **THEN** the Practice sub-nav is visible with all five links

#### Scenario: Sub-nav appears on The Loop page
- **WHEN** user navigates to `/practice/the-loop`
- **THEN** the Practice sub-nav is visible with all five links

#### Scenario: Sub-nav appears on Projects page
- **WHEN** user navigates to `/practice/projects`
- **THEN** the Practice sub-nav is visible with all five links

#### Scenario: Sub-nav appears on Embodied Transcendence page
- **WHEN** user navigates to `/practice/embodied-transcendence`
- **THEN** the Practice sub-nav is visible with all five links

#### Scenario: Sub-nav appears on Definitions page
- **WHEN** user navigates to `/practice/definitions`
- **THEN** the Practice sub-nav is visible with all five links

#### Scenario: Active link is visually distinguished
- **WHEN** the user is on any Practice sub-page
- **THEN** the sub-nav link corresponding to the current page SHALL be styled distinctly from inactive links

#### Scenario: Sub-nav links navigate correctly
- **WHEN** user clicks a sub-nav link
- **THEN** the router navigates to the corresponding Practice sub-page route
