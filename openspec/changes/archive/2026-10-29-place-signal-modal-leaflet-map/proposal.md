# Place Signal Modal with Leaflet Map

## Why

Placement of anonymous signals today happens in two disconnected steps: the user chooses "Select on map" in a small modal, the modal closes, and they click on the globe (globe.gl) on the page. That flow is confusing and the globe is a poor fit for precise placement. Moving placement into a single, large modal that contains a Leaflet map with a standard marker keeps all placement state and confirmation in one place and gives desktop users a proper map for choosing location.

## What Changes

- **PlaceSignalModal** becomes a large modal (up to 1200×900px on desktop) that contains an embedded Leaflet map with a standard marker for choosing location.
- **Geolocation path**: "Allow approximate location" zooms the in-modal map to the user's position, places the marker there, and shows confirmation; the user can click elsewhere on the map to move the marker before confirming.
- **Manual path**: User chooses "Select on map" and the modal shows the Leaflet map; clicks place or move the marker (each click resets coordinates to the clicked point). Marker is both click-to-place and draggable.
- **Placement only in modal**: No placement on the globe. The globe remains the main view for *viewing* all signals; the user's own signal continues to appear in blue on the globe after placement.
- **BREAKING**: Remove "click mode" from SignalMapPage and SignalGlobe—no more enter-click-mode, Confirm Location, or Cancel on the page; no click handling on the globe for placement.
- Add Leaflet (and a Vue-friendly integration) with light/dark tile support so the map respects app theme.

## Capabilities

### New Capabilities

- `place-signal-modal`: Modal UI and flow for placing an anonymous signal—choice (geolocation vs select on map), embedded Leaflet map, standard marker (click + drag), confirm/place/placed/error states, large desktop size, theme-aware tiles.

### Modified Capabilities

- (none)

## Impact

- **PlaceSignalModal.vue**: Major rewrite—embed Leaflet map, new layout/sizing, marker interaction, geolocation zoom-to-marker, all placement state internal.
- **SignalMapPage.vue**: Remove click-mode state and UI (clickMode, pendingClickCoords, enterClickMode, confirmClickLocation, cancelClickMode, onMapClick); simplify to open/close modal and handle signal-placed.
- **SignalGlobe.vue**: Remove click-mode prop and placement click handling; keep display of all signals and blue styling for the user's signal.
- **Dependencies**: Add Leaflet and a Vue 3 + Leaflet integration (e.g. vue3-leaflet); add or configure tile layer(s) for light and dark themes.
- **APIs**: No change to `/api/signals` POST or existing signal shape; localStorage usage for "already placed" / mysignal-id can remain as-is.
