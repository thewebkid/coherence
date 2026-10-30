## 1. Dependency Setup

- [x] 1.1 Install `globe.gl` via npm (`npm install globe.gl`)
- [x] 1.2 Verify `globe.gl` and `three` are added to `package.json`

## 2. Create SignalGlobe Component

- [x] 2.1 Create `src/components/SignalGlobe.vue` with the same props as `SignalMap.vue`: `clickMode: Boolean`
- [x] 2.2 Declare the same emits: `map-click` and `ready`
- [x] 2.3 Add `defineExpose` with `addNewSignal`, `clearTempMarker`, and `loadSignals`

## 3. Globe Initialization

- [x] 3.1 Dynamically import `globe.gl` in `onMounted` (lazy load to keep initial bundle lean)
- [x] 3.2 Initialize `Globe()` on the container ref with `backgroundColor('rgba(0,0,0,0)')`
- [x] 3.3 Set the initial `globeImageUrl` based on `themeStore.resolvedIsDark()` (dark vs day texture)
- [x] 3.4 Emit `ready` after the globe initializes and signals are loaded

## 4. Pulsing Markers

- [x] 4.1 Port the `createPulsingPin(mine)` function from `SignalMap.vue` unchanged
- [x] 4.2 Wire up `htmlElementsData` and `htmlElement` on the globe using the signal data array
- [x] 4.3 Add `htmlElementVisibilityModifier` to set `opacity: 0` when `isVisible === false`
- [x] 4.4 Implement `addNewSignal(lng, lat)` — adds a data point to the globe's HTML elements dataset and returns a reference for removal
- [x] 4.5 Implement `clearTempMarker()` — removes the temporary marker data point from the dataset
- [x] 4.6 Implement `loadSignals()` — fetches `/api/signals`, clears existing markers, re-renders all signals

## 5. Click Mode

- [x] 5.1 Register `onGlobeClick` handler on the globe instance
- [x] 5.2 In the handler, check `props.clickMode`; if false, return early
- [x] 5.3 On click: call `clearTempMarker()`, call `addNewSignal(lng, lat)` with the clicked coords, save to `localStorage` under `mysignal`, emit `map-click` with `{ lat, lng }`
- [x] 5.4 Watch `props.clickMode`: when it transitions to `false`, call `clearTempMarker()`

## 6. Theme Support

- [x] 6.1 Watch `themeStore.preference` and call `.globeImageUrl(...)` on the globe instance to swap the texture when the theme changes

## 7. Styles

- [x] 7.1 Copy the `.pulsing-pin` and `.pulse-ring` CSS blocks from `SignalMap.vue` into `SignalGlobe.vue`
- [x] 7.2 Remove the `.maplibregl-marker` parent selector — scope to `.pulsing-pin` directly
- [x] 7.3 Ensure CSS custom properties (`--markerBg`, `--markerShadowOut`, `--markerShadowIn`) are defined for both dark and light themes

## 8. Wire Up in Parent

- [x] 8.1 Find the component(s) that import `SignalMap.vue` and update the import to `SignalGlobe.vue`
- [x] 8.2 Update the template tag name (e.g., `<SignalMap>` → `<SignalGlobe>`) — no prop or event changes needed

## 9. Cleanup

- [x] 9.1 Delete `SignalMap.vue`
- [x] 9.2 Remove `maplibre-gl` from `package.json` (confirm no other imports remain)
- [x] 9.3 Run `npm install` to update `package-lock.json`
- [x] 9.4 Add `onUnmounted` cleanup: call the globe's `_destructor()` or equivalent teardown to prevent memory leaks
