## ADDED Requirements

### Requirement: Interpretive works page supports warm background token
Interpretive works pages that render an image series SHALL apply a warm grey-beige background color via a CSS custom property.

The design token MUST be centrally defined and used by the gallery page.

#### Scenario: Background token is applied
- **WHEN** a user visits the “Practice of Seeing” gallery page
- **THEN** the page background uses the interpretive-works warm background token

### Requirement: Disabled destination links are visible in the detail view
The interpretive work detail view for an image series SHALL render the following destinations as disabled links until content exists:
- About
- Companion essay

Disabled links MUST be non-interactive and expose `aria-disabled="true"`.

#### Scenario: Links are visible but disabled
- **WHEN** the image detail view is displayed
- **THEN** the About and Companion essay links are present and disabled

