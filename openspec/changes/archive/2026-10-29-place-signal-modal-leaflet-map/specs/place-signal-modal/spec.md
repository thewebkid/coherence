# Place Signal Modal — Spec

## ADDED Requirements

### Requirement: Modal presents placement choice

The place-signal modal SHALL present the user with two options: "Allow approximate location" (geolocation) and "Select on map" (manual). The modal SHALL use a large size on desktop (up to 1200×900px) and remain responsive on smaller viewports.

#### Scenario: User opens modal

- **WHEN** the user opens the place-signal modal
- **THEN** the modal displays the choice screen with the two options and explanatory copy

#### Scenario: Modal size on desktop

- **WHEN** the viewport is large enough (e.g. width ≥ 1280px)
- **THEN** the modal MAY be sized up to 1200px wide and 900px tall so the map step has sufficient space

### Requirement: Geolocation path zooms map and places marker

When the user chooses "Allow approximate location", the system SHALL request browser geolocation and, on success, SHALL show the map step with the map centered and zoomed to that location and a single marker placed at those coordinates. The user SHALL be able to move the marker (by clicking elsewhere or dragging) before confirming.

#### Scenario: Geolocation success

- **WHEN** the user clicks "Allow approximate location" and the browser returns a position
- **THEN** the modal switches to the map step, the map is centered and zoomed to that position, and a marker is placed at that position

#### Scenario: User adjusts marker after geolocation

- **WHEN** the user has received geolocation and is on the map step
- **THEN** the user MAY click elsewhere on the map or drag the marker to change the chosen coordinates before confirming

#### Scenario: Geolocation denied or unsupported

- **WHEN** the user clicks "Allow approximate location" and geolocation is denied or unsupported
- **THEN** the modal SHALL show an error state with an option to try again or select on map instead

### Requirement: Manual path shows map with click-to-place and draggable marker

When the user chooses "Select on map", the modal SHALL show the map step with a Leaflet map. A single standard Leaflet marker SHALL represent the chosen location. Each click on the map SHALL set (or move) the marker to the clicked point and update the chosen coordinates. The marker SHALL be draggable so the user can refine by dragging.

#### Scenario: First click places marker

- **WHEN** the user is on the map step (manual path) and clicks a point on the map
- **THEN** the marker is placed at that point and the chosen coordinates are set to that point

#### Scenario: Subsequent click moves marker

- **WHEN** the user is on the map step and clicks another point on the map
- **THEN** the marker moves to the new point and the chosen coordinates are updated to the new point

#### Scenario: Drag moves marker

- **WHEN** the user drags the marker to a new position
- **THEN** the chosen coordinates are updated to the marker's new position

### Requirement: Map respects app theme (light/dark)

The Leaflet map in the modal SHALL use tile layers (or equivalent) that match the application theme: light tiles in light mode and dark tiles in dark mode.

#### Scenario: Theme matches tiles

- **WHEN** the user has light theme selected and the map step is visible
- **THEN** the map displays light-style tiles

#### Scenario: Dark theme tiles

- **WHEN** the user has dark theme selected and the map step is visible
- **THEN** the map displays dark-style tiles

### Requirement: Confirm and place flow inside modal

From the map step, the user SHALL be able to go Back (to choice) or Place Signal. Place Signal SHALL submit the current chosen coordinates to the existing API and SHALL show a success (placed) or error state. All placement state SHALL remain inside the modal; the parent page SHALL not manage click-mode or placement coordinates.

#### Scenario: Back from map step

- **WHEN** the user clicks Back on the map step
- **THEN** the modal returns to the choice step and any chosen coordinates are cleared

#### Scenario: Place Signal success

- **WHEN** the user clicks Place Signal and the API returns success
- **THEN** the modal shows the placed confirmation and emits signal-placed with the returned signal; the user may close the modal

#### Scenario: Place Signal failure

- **WHEN** the user clicks Place Signal and the API returns an error
- **THEN** the modal shows an error state with an option to try again

### Requirement: No placement on globe

The main page globe SHALL display all signals (including the user's after placement) and SHALL indicate the user's own signal (e.g. blue). The globe SHALL NOT support a "click mode" or any interaction for placing a new signal; placement SHALL occur only inside the place-signal modal.

#### Scenario: Globe shows signals only

- **WHEN** the user is on the Signal Map page
- **THEN** the globe displays existing signals and the user's signal in blue if present; there is no click-to-place or confirm/cancel placement UI on the page

#### Scenario: Placement only in modal

- **WHEN** the user wishes to place a signal
- **THEN** they open the modal and complete the entire flow (choice → map → confirm → place) inside the modal
