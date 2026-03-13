<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="visible" class="modal-overlay" @click.self="close">
        <div class="modal-content">
          <template v-if="state === 'map'">
            <div class="modal-header">
              <h2>Place an anonymous signal</h2>
              <button type="button" class="modal-close" aria-label="Close" @click="close">×</button>
            </div>
            <p class="coords-note">
              Click the map to place the marker, or
              <button type="button" class="link-btn" @click="useGeolocation">use your location</button>.
              Drag the marker to adjust.
            </p>
            <div class="map-wrapper" ref="mapWrapperRef">
              <l-map
                ref="mapRef"
                :use-global-leaflet="false"
                :center="mapCenter"
                :zoom="mapZoom"
                :options="{ zoomControl: true }"
                style="height: 100%; width: 100%"
                @click="onMapClick"
                @ready="onMapReady"
              >
                <l-tile-layer
                  :url="tileUrl"
                  layer-type="base"
                  :attribution="tileAttribution"
                />
                <l-marker
                  v-if="coords"
                  :lat-lng="[coords.lat, coords.lng]"
                  :draggable="true"
                  @dragend="onMarkerDragEnd"
                />
              </l-map>
            </div>
            <div class="modal-actions">
              <button
                class="modal-btn primary"
                @click="placeSignal"
                :disabled="submitting || !coords"
              >
                {{ submitting ? 'Placing...' : 'Place Signal' }}
              </button>
            </div>
          </template>

          <template v-if="state === 'placed'">
            <div class="modal-header">
              <h2>Signal placed</h2>
              <button type="button" class="modal-close" aria-label="Close" @click="close">×</button>
            </div>
            <div class="placed-message">
              <p class="placed-secondary">Thank you for making presence visible.</p>
            </div>
          </template>

          <template v-if="state === 'error'">
            <div class="modal-header">
              <h2>Something went wrong</h2>
              <button type="button" class="modal-close" aria-label="Close" @click="close">×</button>
            </div>
            <p class="error-message">{{ errorMessage }}</p>
            <div class="modal-actions">
              <button class="modal-btn secondary" @click="goToMapFromError">Try again</button>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import { useThemeStore } from '@/stores/theme';

// Theme-aware tile URLs (CartoDB: light and dark)
const TILE_LIGHT = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const TILE_DARK = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(['close', 'signal-placed']);

const themeStore = useThemeStore();
const tileUrl = computed(() =>
  themeStore.resolvedIsDark() ? TILE_DARK : TILE_LIGHT
);
const tileAttribution = TILE_ATTRIBUTION;

const state = ref('map');
const coords = ref(null);
const mapCenter = ref([20, 0]);
const mapZoom = ref(3);
const submitting = ref(false);
const errorMessage = ref('');
const mapRef = ref(null);
const mapWrapperRef = ref(null);

async function loadExistingSignalForUpdate() {
  const myId = typeof localStorage !== 'undefined' ? localStorage.getItem('mysignal-id') : null;
  if (!myId) return;
  try {
    const res = await fetch('/api/signals');
    if (!res.ok) return;
    const signals = await res.json();
    const mine = signals.find((s) => s.id === myId);
    if (mine && typeof mine.lat === 'number' && typeof mine.lng === 'number') {
      coords.value = { lat: mine.lat, lng: mine.lng };
      mapCenter.value = [mine.lat, mine.lng];
      mapZoom.value = 13;
    }
  } catch (e) {
    // ignore; modal opens with default view
  }
}

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible) {
      loadExistingSignalForUpdate();
    }
  }
);

function close() {
  state.value = 'map';
  coords.value = null;
  mapCenter.value = [20, 0];
  mapZoom.value = 3;
  emit('close');
}

function useGeolocation() {
  if (!navigator.geolocation) {
    errorMessage.value = 'Geolocation is not supported by your browser. Please click on the map instead.';
    state.value = 'error';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      coords.value = { lat, lng };
      mapCenter.value = [lat, lng];
      mapZoom.value = 13;
    },
    () => {
      errorMessage.value = 'Location access was denied. Click on the map to choose a location.';
      state.value = 'error';
    },
    { enableHighAccuracy: false, timeout: 10000 }
  );
}

function goToMapFromError() {
  errorMessage.value = '';
  state.value = 'map';
}

function onMapClick(event) {
  const { lat, lng } = event.latlng;
  coords.value = { lat, lng };
}

function onMarkerDragEnd(event) {
  const { lat, lng } = event.target.getLatLng();
  coords.value = { lat, lng };
}

function onMapReady() {
  nextTick(() => {
    if (mapRef.value?.leafletObject) {
      mapRef.value.leafletObject.invalidateSize();
    }
  });
}

watch(
  () => state.value === 'map',
  (isMap) => {
    if (isMap) {
      nextTick(() => {
        if (mapRef.value?.leafletObject) {
          mapRef.value.leafletObject.invalidateSize();
        }
      });
    }
  }
);

async function placeSignal() {
  if (!coords.value) return;
  submitting.value = true;

  try {
    const body = { ...coords.value };
    const existingId = typeof localStorage !== 'undefined' ? localStorage.getItem('mysignal-id') : null;
    if (existingId) body.id = existingId;

    const res = await fetch('/api/signals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.status === 404) {
      if (typeof localStorage !== 'undefined') localStorage.removeItem('mysignal-id');
      errorMessage.value = 'Your previous signal was not found. Place a new one below.';
      state.value = 'error';
      return;
    }

    if (!res.ok) {
      throw new Error(data.error || 'Server returned ' + res.status);
    }

    state.value = 'placed';
    emit('signal-placed', data.signal);
  } catch (e) {
    errorMessage.value = e.message || 'Failed to place your signal. Please try again.';
    state.value = 'error';
  } finally {
    submitting.value = false;
  }
}

function reset() {
  state.value = 'map';
  coords.value = null;
  mapCenter.value = [20, 0];
  mapZoom.value = 3;
}

defineExpose({ reset });
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
  max-width: 1200px;
  max-height: 900px;
  width: 90vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h2 {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    font-weight: 400;
    margin: 0;
  }

  p {
    color: var(--text-muted);
    margin: 0 0 var(--spacing-sm);
    font-size: 0.9375rem;
    line-height: 1.5;
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  flex-shrink: 0;
}

.modal-close {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-muted);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: color var(--transition-speed) ease;

  &:hover {
    color: var(--text);
  }
}

.link-btn {
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  border: none;
  background: none;
  color: var(--accent);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: var(--accent-hover);
  }
}

.map-wrapper {
  flex: 1;
  min-height: 420px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border);
  margin-bottom: var(--spacing-md);
  cursor: crosshair;

  :deep(.leaflet-container) {
    cursor: crosshair;
  }
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: var(--spacing-sm);
  flex-shrink: 0;
}

.modal-btn {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  background: transparent;
  color: var(--text);

  &.primary {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);

    &:hover:not(:disabled) {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }
  }

  &.secondary {
    &:hover {
      background: var(--bg-secondary);
      border-color: var(--accent);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.placed-message {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  .placed-secondary {
    color: var(--text-muted);
    font-size: 0.9375rem;
  }
}

.coords-note {
  font-size: 0.875rem;
  flex-shrink: 0;
}

.error-message {
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
