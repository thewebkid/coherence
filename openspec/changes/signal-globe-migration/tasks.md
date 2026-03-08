## 1. Dependency Setup

- [ ] 1.1 Install `globe.gl` via npm (`npm install globe.gl`)
- [ ] 1.2 Verify `globe.gl` and `three` are added to `package.json`

## 2. Create SignalGlobe Component

- [ ] 2.1 Create `src/components/SignalGlobe.vue` with the same props as `SignalMap.vue`: `clickMode: Boolean`
- [ ] 2.2 Declare the same emits: `map-click` and `ready`
- [ ] 2.3 Add `defineExpose` with `addNewSignal`, `clearTempMarker`, and `loadSignals`

## 3. Globe Initialization

- [ ] 3.1 Dynamically import `globe.gl` in `onMounted` (lazy load to keep initial bundle lean)
- [ ] 3.2 Initialize `Globe()` on the container ref with `backgroundColor('rgba(0,0,0,0)')`
- [ ] 3.3 Set the initial `globeImageUrl` based on `themeStore.resolvedIsDark()` (dark vs day texture)
- [ ] 3.4 Emit `ready` after the globe initializes and signals are loaded

## 4. Pulsing Markers

- [ ] 4.1 Port the `createPulsingPin(mine)` function from `SignalMap.vue` unchanged
- [ ] 4.2 Wire up `htmlElementsData` and `htmlElement` on the globe using the signal data array
- [ ] 4.3 Add `htmlElementVisibilityModifier` to set `opacity: 0` when `isVisible === false`
- [ ] 4.4 Implement `addNewSignal(lng, lat)` — adds a data point to the globe's HTML elements dataset and returns a reference for removal
- [ ] 4.5 Implement `clearTempMarker()` — removes the temporary marker data point from the dataset
- [ ] 4.6 Implement `loadSignals()` — fetches `/api/signals`, clears existing markers, re-renders all signals

## 5. Click Mode

- [ ] 5.1 Register `onGlobeClick` handler on the globe instance
- [ ] 5.2 In the handler, check `props.clickMode`; if false, return early
- [ ] 5.3 On click: call `clearTempMarker()`, call `addNewSignal(lng, lat)` with the clicked coords, save to `localStorage` under `mysignal`, emit `map-click` with `{ lat, lng }`
- [ ] 5.4 Watch `props.clickMode`: when it transitions to `false`, call `clearTempMarker()`

## 6. Theme Support

- [ ] 6.1 Watch `themeStore.preference` and call `.globeImageUrl(...)` on the globe instance to swap the texture when the theme changes

## 7. Styles

- [ ] 7.1 Copy the `.pulsing-pin` and `.pulse-ring` CSS blocks from `SignalMap.vue` into `SignalGlobe.vue`
- [ ] 7.2 Remove the `.maplibregl-marker` parent selector — scope to `.pulsing-pin` directly
- [ ] 7.3 Ensure CSS custom properties (`--markerBg`, `--markerShadowOut`, `--markerShadowIn`) are defined for both dark and light themes

## 8. Wire Up in Parent

- [ ] 8.1 Find the component(s) that import `SignalMap.vue` and update the import to `SignalGlobe.vue`
- [ ] 8.2 Update the template tag name (e.g., `<SignalMap>` → `<SignalGlobe>`) — no prop or event changes needed

## 9. Cleanup

- [ ] 9.1 Delete `SignalMap.vue`
- [ ] 9.2 Remove `maplibre-gl` from `package.json` (confirm no other imports remain)
- [ ] 9.3 Run `npm install` to update `package-lock.json`
- [ ] 9.4 Add `onUnmounted` cleanup: call the globe's `_destructor()` or equivalent teardown to prevent memory leaks
