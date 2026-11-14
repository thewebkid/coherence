# Design: Place Signal Modal with Leaflet Map

## Context

- **Current state**: PlaceSignalModal is a small (~480px) dialog. "Select on map" closes the modal and enables click-mode on the main page's globe (globe.gl); the user clicks the globe, then confirms on the page and the modal reopens with coords from localStorage. Placement state is split between page and modal.
- **Stack**: Vue 3, Vite, Pinia (theme store). Globe uses globe.gl. No Leaflet today.
- **Constraints**: Must support light/dark theme (existing `useThemeStore()` and `data-theme`). Modal must work on desktop (large) and mobile (usable). No backend or API changes.

## Goals / Non-Goals

**Goals:**

- Single modal that owns the full placement flow: choice → map (with marker) → confirm → place → placed/error.
- Leaflet map inside the modal with a standard marker; marker is click-to-place and draggable; map respects app theme (light/dark tiles or equivalent).
- Geolocation zooms map to user location and places marker; user can move marker by clicking or dragging before confirming.
- Large modal on desktop (max 1200×900px); responsive on small screens.
- Remove all placement behavior from the globe and from SignalMapPage (no click-mode).

**Non-Goals:**

- Changing how signals are stored or displayed on the globe after placement (blue "mine" marker stays as-is).
- Adding new APIs or changing existing `/api/signals` contract.
- Supporting other map providers beyond Leaflet for this modal.

## Decisions

### 1. Vue 3 + Leaflet: vue3-leaflet

- **Choice**: Use **vue3-leaflet** (Vue 3 bindings for Leaflet) so the map and marker are declarative and lifecycle is handled (e.g. invalidation when modal opens).
- **Alternatives**: Imperative Leaflet in onMounted with a single container ref—works but more boilerplate and easy to miss invalidation/cleanup. Another wrapper (e.g. vue-leaflet next) was not evaluated in depth; vue3-leaflet is widely used and maintained.
- **Caveat**: Map must be mounted only when the modal is visible (or when the "map" step is shown) and `map.invalidateSize()` called after the modal is open so tiles render correctly.

### 2. Theme-aware tiles (light/dark)

- **Choice**: Prefer **two tile layer URLs** (one light, one dark) and switch by theme from the existing theme store. Use the same store as SignalGlobe (`useThemeStore()`, `resolvedIsDark()`).
- **Alternatives**: (1) CSS filter on a single tile layer—possible but can look inconsistent across providers. (2) Paid dark tiles (e.g. Stadia, Jawg)—unnecessary for this scope. (3) Leaflet theme control plugin—adds dependency; switching URL by theme is simple and keeps control in-app.
- **Implementation**: Use free tile URLs that offer light and dark variants where available (e.g. CartoDB Positron / Dark Matter, or OpenStreetMap + a dark overlay). If no single provider has both, use OSM for light and CartoDB Dark Matter (or similar) for dark.

### 3. Modal layout and map visibility

- **Choice**: Modal has two main "steps" in the same overlay: (1) **Choice** screen: "Allow approximate location" and "Select on map". (2) **Map** screen: Leaflet map + marker + copy + actions (Back, Place Signal). After "Place Signal", show **Placed** or **Error** as today. The map component is mounted only when the user is on the map step (or when modal opens to map step) to avoid Leaflet init in a hidden container.
- **Rationale**: Keeps one modal open for the whole flow; no closing/reopening. Map step is the only place where the map exists, so we can call invalidateSize when that step is shown.

### 4. Marker behavior

- **Choice**: One Leaflet marker. **Click on map** sets marker position (or moves it). **Draggable**: true so the user can drag to refine. Each click updates internal coords ref; dragend updates coords. "Place Signal" uses current coords.
- **Rationale**: Matches user request: "clicks can be treated as marker placements and should reset the coordinates to be where they clicked" and "I like both" (click and drag).

### 5. Initial map center/zoom

- **Choice**: Default center and zoom when opening the map step without geolocation (e.g. world or continental view, e.g. center [20, 0], zoom 2). When user chose "Allow approximate location", after getCurrentPosition we set map center and zoom to that location (e.g. zoom 12–14), add the marker, then show the map step so they see their position and can adjust.
- **Rationale**: Avoids assuming a region; geolocation path gets a clear "you are here" view.

### 6. Modal size

- **Choice**: CSS max-width and max-height (e.g. max-width: 1200px, max-height: 900px), with width/height as a large percentage of viewport (e.g. 90vw, 85vh) so it scales down on smaller screens. Inner content (map area) uses flex or fixed height so the map has a defined size for Leaflet.
- **Rationale**: User specified "as high as 1200px by 900px"; fixed max with responsive bounds keeps desktop large and mobile usable.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Leaflet map doesn't render correctly when modal opens | Mount map only when map step is visible; call `map.invalidateSize()` in nextTick after modal open/step transition. |
| vue3-leaflet SSR/hydration issues | Modal is client-only (Teleport, v-if). Ensure map components are not rendered on server or use a client-only wrapper if needed. |
| Two tile URLs add maintenance | Document chosen URLs and theme logic in code; prefer well-known free providers (e.g. CartoDB, OSM). |
| Globe and modal both show "my" signal | No change: globe continues to show all signals with blue for `isMine`; modal is placement-only. No conflict. |

## Migration Plan

- Implement in feature branch. No data migration. No backend deploy.
- **Deploy**: Merge; release as single front-end deploy.
- **Rollback**: Revert front-end to previous version; no API or DB rollback.

## Open Questions

- None. Tile provider choice (CartoDB vs OSM vs other) can be finalized during implementation based on availability of light/dark pairs and attribution requirements.
