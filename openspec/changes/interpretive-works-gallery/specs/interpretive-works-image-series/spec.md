## ADDED Requirements

### Requirement: Image series work is representable as ordered media items
The system SHALL support an “image series” interpretive work represented as an ordered list of media items.

Each media item MUST include:
- A numeric `number`
- A full image `src`
- A thumbnail image `thumbSrc`
- A `title`
- A `description`
- An `alt` string

#### Scenario: Series metadata exists for all items
- **WHEN** the image series content module is loaded
- **THEN** the system provides a `media[]` array with all fields present for every item

### Requirement: Thumbnail gallery lists all thumbnails in numeric order
The system SHALL render a grid gallery that lists all thumbnail images in numeric order by their `number`.

#### Scenario: Thumbnails are rendered in correct order
- **WHEN** the gallery is rendered for an image series
- **THEN** thumbnails appear ordered by `number` ascending (e.g., 2 appears before 10)

### Requirement: Selecting a thumbnail opens an image detail view
The system SHALL allow selecting any thumbnail to open an image detail view for that item.

#### Scenario: Clicking a thumbnail selects the correct image
- **WHEN** a user clicks the thumbnail for image \(N\)
- **THEN** the image detail view shows the full image for \(N\)

### Requirement: Detail view supports previous/next navigation across the series
The system SHALL provide previous/next navigation within the image series detail view.

#### Scenario: Navigate to next image
- **WHEN** a user activates “Next” on image \(N\) where \(N < last\)
- **THEN** the detail view shows image \(N+1\)

#### Scenario: Navigate to previous image
- **WHEN** a user activates “Previous” on image \(N\) where \(N > 1\)
- **THEN** the detail view shows image \(N-1\)

### Requirement: Detail view shows position indicator
The system SHALL display a position indicator in the detail view in the format `current/total`.

#### Scenario: Position indicator is shown
- **WHEN** a user views image \(N\) in a series of size \(T\)
- **THEN** the UI displays `N/T`

### Requirement: Deep-linking to an image is supported via query parameter
The system SHALL support deep-linking to a specific image in the series using a query parameter (e.g., `?image=12`).

#### Scenario: Opening a deep link selects the image
- **WHEN** a user navigates to the series page with `?image=N`
- **THEN** the detail view opens with image \(N\) selected

