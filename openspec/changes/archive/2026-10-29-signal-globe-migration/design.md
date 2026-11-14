## Context

`SignalMap.vue` renders a flat Web Mercator map via MapLibre GL. Click placement is accurate near the equator but degrades significantly at high latitudes due to projection distortion — the further from the equator, the more the placed marker visually drifts from the click point, and zooming amplifies the error.

The current component renders pulsing CSS-animated markers (`.pulsing-pin` / `.pulse-ring`) as MapLibre `Marker` instances with `anchor: 'center'`. The parent receives `map-click` events with `{ lat, lng }` and calls `addNewSignal` / `clearTempMarker` / `loadSignals` via `defineExpose`.

## Goals / Non-Goals

**Goals:**
- Replace the flat map with a 3D sphere that places markers at pixel-accurate positions regardless of latitude
- Preserve the exact parent interface: `clickMode` prop, `map-click` / `ready` events, and exposed methods
- Preserve the pulsing CSS animation, including the randomized per-marker duration and the "mine vs others" blue marker distinction
- Support dark/light theme toggling by swapping globe imagery
- Remove MapLibre GL from the dependency graph

**Non-Goals:**
- Supporting tile-based satellite or street-map imagery on the globe (plain dark/light texture only for now)
- Navigation controls (zoom buttons) — the globe is navigated by drag/scroll
- A "flat map" fallback or toggle view

## Decisions

### Decision 1: globe.gl over raw Three.js

**Chosen**: `globe.gl`

**Alternatives considered**:
- *Raw Three.js + three-globe*: Full control but requires manually implementing click-to-lat/lng raycasting, camera controls, and the HTML overlay system — all of which globe.gl provides out of the box.
- *Cesium.js*: Accurate and full-featured but ~10 MB bundle, complex API, and overkill for this use case.
- *OpenGlobus*: Markers are billboard textures, not DOM elements. Pulsing CSS would require rendering to canvas every frame.
- *Deck.gl GlobeView*: WebGL-based and performant but less flexible for custom HTML markers.

**Rationale**: globe.gl exposes an `htmlElement` callback that returns actual DOM nodes, meaning the existing `createPulsingPin()` function and all CSS animations are reused unchanged. The library also handles click-to-lat/lng conversion and camera controls, minimizing new code.

### Decision 2: Preserve DOM-based pulsing markers (not WebGL circles)

**Chosen**: Keep CSS `@keyframes` pulse animation on DOM elements

**Alternatives considered**:
- *Three.js custom shader*: GPU-accelerated, ~1000+ markers at 60 fps. Would require writing GLSL.
- *Canvas 2D overlay*: Animatable but loses CSS variable integration and is harder to theme.

**Rationale**: Signal counts are expected to be well under 100. DOM elements with CSS animations are sufficient and preserve the exact existing visual without any rewrite.

### Decision 3: globe.gl marker wrapper class is not `.maplibregl-marker`

The CSS selector `.maplibregl-marker.pulsing-pin` must become just `.pulsing-pin`. globe.gl wraps HTML elements in a generic `<div>` with no MapLibre class. The fix is to scope styles to `.pulsing-pin` only (drop the `.maplibregl-marker` prefix). No visual change.

### Decision 4: Theme switching via globe imagery URL swap

MapLibre swapped tile styles; globe.gl swaps the `globeImageUrl`. We use:
- Dark theme: `three-globe` dark earth texture (`earth-dark.jpg`)
- Light theme: `three-globe` day earth texture (`earth-day.jpg`)

Both are available from the `three-globe` CDN package that globe.gl depends on.

### Decision 5: Keeping component name `SignalMap.vue` vs renaming to `SignalGlobe.vue`

**Chosen**: Create `SignalGlobe.vue` and replace the import site

**Rationale**: Renaming communicates the visual change clearly and avoids confusion. The parent interface is identical, so the import swap is a one-liner. `SignalMap.vue` is deleted.

## Risks / Trade-offs

- **WebGL availability** → Both MapLibre and globe.gl require WebGL; no regression. Devices that worked before will work after.
- **globe.gl + Three.js bundle size** → globe.gl is ~200 KB gzipped (Three.js ~150 KB + wrapper ~50 KB). MapLibre GL is ~350 KB gzipped. Net change is a bundle size *decrease*.
- **globe.gl version stability** → globe.gl is actively maintained by vasturiano. Pin to a specific minor version in `package.json` to avoid surprise breaking changes.
- **Touch / mobile drag vs click** → globe.gl default controls may conflict with scroll on mobile. The `onGlobeClick` event fires on tap, but users may accidentally rotate instead of placing a marker. Mitigation: test on mobile and consider adding a visual "click to place" affordance.
- **Marker occlusion** → Markers on the far side of the globe should not be visible. globe.gl's `htmlElementVisibilityModifier` callback handles this; set `opacity: 0` when `isVisible === false`.

## Migration Plan

1. Install `globe.gl` via npm
2. Create `SignalGlobe.vue` with identical prop/event/expose interface
3. Update the single import site (likely `App.vue` or the settings/signal page) to use `SignalGlobe`
4. Delete `SignalMap.vue`
5. Remove `maplibre-gl` from `package.json` (verify no other consumers)

Rollback: revert the import site change and restore `SignalMap.vue` from git. No data or API changes are involved.

## Open Questions

- Should the globe auto-rotate when idle, or stay static? (Cosmetic — can decide during implementation)
- What should the globe background be — transparent (shows page bg), black, or a star field? (Default: transparent to inherit page theme)
- Should clicking a signal marker open a popup/panel? (Out of scope for this change, but the `click` event on each element is wired up for future use)
