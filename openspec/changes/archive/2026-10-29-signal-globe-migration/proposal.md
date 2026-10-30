## Why

The current `SignalMap.vue` uses MapLibre GL with Web Mercator projection, which produces inaccurate click-to-marker placement at high latitudes — the further from the equator a user clicks, the more the placed marker drifts from the click position, and zooming worsens the offset. A 3D globe avoids this problem entirely by using spherical coordinates with no projection distortion.

## What Changes

- Replace `SignalMap.vue` (MapLibre GL flat map) with a new `SignalGlobe.vue` component built on `globe.gl`
- Preserve all existing pulsing marker CSS animations and the "mine vs others" marker distinction
- Preserve the `clickMode` prop, `map-click` event, and `ready` event interface so parent components need no changes
- Expose the same `addNewSignal`, `clearTempMarker`, and `loadSignals` methods via `defineExpose`
- Support dark/light theme switching (globe imagery swaps with theme)
- Remove the MapLibre GL dependency from the bundle

## Capabilities

### New Capabilities

- `signal-globe`: A 3D interactive globe that renders signal markers as pulsing CSS-animated circles, supports click-to-place a signal, loads signals from `/api/signals`, and integrates with the app's dark/light theme system.

### Modified Capabilities

<!-- None - the parent component interface is preserved exactly -->

## Impact

- **Replaced dependency**: `maplibre-gl` → `globe.gl` (Three.js-based, ~200KB gzipped)
- **Affected components**: `SignalMap.vue` (replaced), any parent that imports `SignalMap.vue` (no interface changes required)
- **CSS**: Pulsing marker styles move to the new component; `.maplibregl-marker` wrapper class no longer applies
- **Bundle**: MapLibre GL removed; Three.js + globe.gl added (comparable or smaller footprint)
- **Browser requirements**: WebGL required (already true for MapLibre GL)
