## ADDED Requirements

### Requirement: Global footer displays "A quiet laboratory of shared becoming."
The site footer (`SiteFooter.vue`) SHALL display the line "A quiet laboratory of shared becoming." This line SHALL appear globally on every page of the site. It SHALL appear once — it MUST NOT be duplicated within page-level content.

#### Scenario: Footer line appears on all pages
- **WHEN** user visits any page of the site
- **THEN** the footer contains the line "A quiet laboratory of shared becoming."

#### Scenario: Footer line is not duplicated in page content
- **WHEN** user views any Practice section page
- **THEN** the line "A quiet laboratory of shared becoming." appears only in the footer, not also in the page body
