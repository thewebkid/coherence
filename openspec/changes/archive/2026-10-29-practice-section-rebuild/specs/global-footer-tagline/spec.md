## ADDED Requirements

### Requirement: Global footer displays the tagline on all pages
The `SiteFooter` component SHALL display the text "A quiet laboratory of shared becoming." in small text on every page of the site. The tagline SHALL be placed in the `footer-bottom` section, below the copyright line or as a distinct element within it. The text SHALL be styled to be discoverable rather than declared — small, muted, centered or slightly offset.

#### Scenario: Footer tagline appears on the home page
- **WHEN** a visitor loads the home page
- **THEN** the footer contains the text "A quiet laboratory of shared becoming."

#### Scenario: Footer tagline appears on a Practice section page
- **WHEN** a visitor loads `/practice/the-loop`
- **THEN** the footer contains the text "A quiet laboratory of shared becoming."

#### Scenario: Footer tagline styling is appropriately subtle
- **WHEN** a visitor views the footer
- **THEN** the tagline text is visually small and muted, not prominent or declarative

### Requirement: Contact page includes the tagline variant
The `ContactPage` component SHALL include the text "This work is offered as a quiet laboratory of shared becoming." placed below the main contact content or near the submit button area, functioning as orientation for institutional or serious entrants.

#### Scenario: Contact page tagline variant is present
- **WHEN** a visitor loads `/contact`
- **THEN** the page contains the text "This work is offered as a quiet laboratory of shared becoming."
