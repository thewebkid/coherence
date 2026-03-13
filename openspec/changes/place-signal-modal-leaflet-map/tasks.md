## 1. Dependencies and map setup

- [x] 1.1 Add leaflet, vue3-leaflet, and @types/leaflet (if needed) to package.json
- [x] 1.2 Choose and wire light/dark tile URLs (e.g. CartoDB Positron / Dark Matter) and theme switch via useThemeStore

## 2. PlaceSignalModal structure and layout

- [x] 2.1 Update modal overlay and content container for large size (max-width 1200px, max-height 900px; 90vw / 85vh responsive)
- [x] 2.2 Implement step state: choose → map → placed | error; keep existing copy and actions for choose, placed, error
- [x] 2.3 Add map step layout: Leaflet map area + short copy + Back and Place Signal buttons; mount map only when step is "map"

## 3. Leaflet map and marker in modal

- [x] 3.1 Embed Leaflet map in modal (vue3-leaflet) with theme-based tile layer; default center/zoom for manual path (e.g. [20, 0], zoom 2)
- [x] 3.2 Call map.invalidateSize() in nextTick when map step becomes visible so tiles render correctly
- [x] 3.3 Add single draggable marker; on map click set marker position and update coords; on marker dragend update coords
- [x] 3.4 Ensure Place Signal is disabled until at least one coordinate is set (marker placed or geolocation received)

## 4. Geolocation path

- [x] 4.1 On "Allow approximate location": request getCurrentPosition; on success set map center/zoom to position, set marker and coords, switch to map step
- [x] 4.2 On geolocation error or denied: show error state with try again / select on map; no map step

## 5. Confirm and place flow

- [x] 5.1 Back button on map step: return to choice step, clear coords and any map state
- [x] 5.2 Place Signal: POST coords to /api/signals; on success show placed screen and emit signal-placed; on failure show error state
- [x] 5.3 Remove any use of localStorage for pending placement (mysignal) from modal; keep localStorage for already-placed / mysignal-id as needed by page

## 6. SignalMapPage simplification

- [x] 6.1 Remove clickMode, pendingClickCoords, enterClickMode, confirmClickLocation, cancelClickMode, onMapClick and related template (click-mode hint and Confirm Location / Cancel buttons)
- [x] 6.2 Remove ref and call to setManualCoords; keep PlaceSignalModal with visible, close, signal-placed only; keep openModal and onSignalPlaced (addNewSignal, clearTempMarker, alreadyPlaced, localStorage for mysignal-id)

## 7. SignalGlobe cleanup

- [x] 7.1 Remove clickMode prop and all click-mode behavior (onGlobeClick for placement, tempMarkerData, setManualCoords path, localStorage mysignal write from globe)
- [x] 7.2 Keep loadSignals, addNewSignal, clearTempMarker, and blue (isMine) marker styling for displaying the user's signal after placement
