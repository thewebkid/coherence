## ADDED Requirements

### Requirement: Globe renders as an interactive 3D sphere
The system SHALL render a rotatable, zoomable 3D globe using globe.gl. The globe SHALL display a world map texture that reflects the application's current dark/light theme.

#### Scenario: Globe initializes on mount
- **WHEN** the `SignalGlobe` component mounts
- **THEN** a 3D globe SHALL be visible in the component's container

#### Scenario: Dark theme globe
- **WHEN** the application is in dark mode
- **THEN** the globe SHALL display a dark earth texture

#### Scenario: Light theme globe
- **WHEN** the application is in light mode
- **THEN** the globe SHALL display a light (day) earth texture

#### Scenario: Theme change at runtime
- **WHEN** the user toggles the application theme while the globe is mounted
- **THEN** the globe texture SHALL update without remounting the component

### Requirement: Signal markers render as pulsing circles
The system SHALL render each signal as a pulsing CSS-animated circle marker positioned at the signal's exact latitude/longitude on the globe surface. Each marker SHALL have a randomized animation duration between 2.0 and 3.5 seconds.

#### Scenario: Signal markers appear on globe
- **WHEN** signals are loaded from `/api/signals`
- **THEN** each signal SHALL be displayed as a pulsing circle at its correct geographic position

#### Scenario: "My signal" marker is visually distinct
- **WHEN** a signal's coordinates match the value stored in `localStorage` under the key `mysignal`
- **THEN** that marker's background SHALL be blue to distinguish it from others

#### Scenario: Markers on far side of globe are hidden
- **WHEN** a signal marker is on the hemisphere facing away from the viewer
- **THEN** the marker SHALL not be visible (opacity set to 0)

#### Scenario: Markers on near side of globe are visible
- **WHEN** a signal marker is on the hemisphere facing the viewer
- **THEN** the marker SHALL be visible with full opacity

### Requirement: User can place a signal by clicking the globe
The system SHALL support a `clickMode` prop. When `clickMode` is `true`, clicking the globe SHALL place a pulsing marker at the clicked latitude/longitude and emit a `map-click` event with `{ lat, lng }`. Only one temporary marker SHALL exist at a time; placing a new one removes the previous.

#### Scenario: Click places marker in click mode
- **WHEN** `clickMode` is `true` and the user clicks the globe
- **THEN** a pulsing marker SHALL appear at the clicked position
- **AND** a `map-click` event SHALL be emitted with `{ lat, lng }`

#### Scenario: Second click replaces first marker
- **WHEN** `clickMode` is `true` and the user clicks a second position
- **THEN** the previously placed marker SHALL be removed
- **AND** a new marker SHALL appear at the new position

#### Scenario: Click mode disabled prevents placement
- **WHEN** `clickMode` is `false`
- **THEN** clicking the globe SHALL NOT place a marker and SHALL NOT emit `map-click`

#### Scenario: Click accuracy is uniform across latitudes
- **WHEN** the user clicks near the poles (latitude > 60° or < -60°)
- **THEN** the placed marker SHALL appear at the clicked position without visible offset

### Requirement: Component exposes signal management methods
The system SHALL expose `addNewSignal(lng, lat)`, `clearTempMarker()`, and `loadSignals()` methods via `defineExpose` so parent components can programmatically manage markers.

#### Scenario: addNewSignal adds a marker
- **WHEN** `addNewSignal(lng, lat)` is called
- **THEN** a pulsing marker SHALL appear at the given coordinates on the globe

#### Scenario: clearTempMarker removes the temporary marker
- **WHEN** `clearTempMarker()` is called
- **THEN** any currently placed temporary marker SHALL be removed

#### Scenario: loadSignals refreshes markers from API
- **WHEN** `loadSignals()` is called
- **THEN** existing signal markers SHALL be cleared and replaced with the latest data from `/api/signals`

### Requirement: Component emits ready event after initialization
The system SHALL emit a `ready` event once the globe is fully initialized and signals have been loaded, matching the existing `SignalMap.vue` interface.

#### Scenario: Ready event fires on load
- **WHEN** the globe finishes initializing
- **THEN** a `ready` event SHALL be emitted

### Requirement: Disabling click mode clears the temporary marker
The system SHALL watch the `clickMode` prop. When it transitions from `true` to `false`, any temporary marker placed by the user SHALL be automatically removed.

#### Scenario: Leaving click mode clears marker
- **WHEN** `clickMode` changes from `true` to `false`
- **THEN** the temporary marker SHALL be removed from the globe
