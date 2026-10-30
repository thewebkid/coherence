## ADDED Requirements

### Requirement: Gallery images are sourced from the practiceofseeing directory
The “Practice of Seeing” gallery SHALL source its images from `public/img/practiceofseeing/` using the filename pattern:

- Full image: `Image<N>.jpg`
- Thumbnail: `Image<N>-thumb.jpg`

#### Scenario: Thumbnails discovered map to full images
- **WHEN** the system discovers a thumbnail `Image<N>-thumb.jpg`
- **THEN** it resolves a corresponding full image `Image<N>.jpg`

### Requirement: The gallery page lists all thumbnails present
The gallery page for the work SHALL list all `*-thumb.jpg` files present in `public/img/practiceofseeing/`.

#### Scenario: All thumbnails are shown
- **WHEN** the gallery page is rendered
- **THEN** it displays one thumbnail per `*-thumb.jpg` found in the directory

### Requirement: Per-image titles and descriptions are represented in content
For each image in the series, the system SHALL provide:
- A title
- A description

These MUST appear in the detail view for the selected image.

#### Scenario: Detail view renders title and description
- **WHEN** a user opens any image detail view
- **THEN** the UI renders that image’s title and description text

### Requirement: Alt text is derived from the markdown heading
Alt text for each image MUST be taken from the `##` heading associated with that image in `gallery.md`.

#### Scenario: Alt text matches the heading
- **WHEN** the media array is authored from `gallery.md`
- **THEN** each media item’s `alt` equals the corresponding `##` heading text

### Requirement: Links not yet available are rendered disabled
The gallery detail view SHALL render the following links as present-but-disabled UI:
- About
- Companion essay
- Download high-resolution image

Disabled links MUST be non-interactive and expose `aria-disabled="true"`.

#### Scenario: Disabled links do not navigate
- **WHEN** a user activates any disabled link
- **THEN** no navigation occurs

