<template>
  <div class="signal-map-wrapper">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useThemeStore } from '@/stores/theme';

let maplibregl = null;

const props = defineProps({
  clickMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['map-click', 'ready']);

const themeStore = useThemeStore();
const mapContainer = ref(null);
let map = null;
let tempMarker = null;

const DARK_STYLE = 'https://tiles.openfreemap.org/styles/dark';
const LIGHT_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

function getStyle() {
  return themeStore.resolvedIsDark() ? DARK_STYLE : LIGHT_STYLE;
}

async function loadSignals() {
  try {
    const res = await fetch('/api/signals');
    if (!res.ok) return;
    const signals = await res.json();

    if (!map) return;

    const geojson = {
      type: 'FeatureCollection',
      features: signals.map((s) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [s.lng, s.lat] },
        properties: { id: s.id },
      })),
    };

    if (map.getSource('signals')) {
      map.getSource('signals').setData(geojson);
    } else {
      map.addSource('signals', { type: 'geojson', data: geojson });

      map.addLayer({
        id: 'signals-glow',
        type: 'circle',
        source: 'signals',
        paint: {
          'circle-radius': 12,
          'circle-color': '#c4a96a',
          'circle-opacity': 0.15,
          'circle-blur': 1,
        },
      });

      map.addLayer({
        id: 'signals-core',
        type: 'circle',
        source: 'signals',
        paint: {
          'circle-radius': 4,
          'circle-color': '#d4b97a',
          'circle-opacity': 0.7,
          'circle-blur': 0.3,
        },
      });
    }
  } catch (e) {
    console.error('Failed to load signals:', e);
  }
}

function addNewSignal(lng, lat) {
  if (!map || !map.getSource('signals')) return;
  const source = map.getSource('signals');
  const data = source._data || { type: 'FeatureCollection', features: [] };
  data.features.push({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [lng, lat] },
    properties: { id: 'new' },
  });
  source.setData(data);
}

async function initMap() {
  if (!mapContainer.value) return;

  if (!maplibregl) {
    const mod = await import('maplibre-gl');
    await import('maplibre-gl/dist/maplibre-gl.css');
    maplibregl = mod.default;
  }

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: getStyle(),
    center: [0, 20],
    zoom: 1.5,
    attributionControl: false,
    dragRotate: false,
    pitchWithRotate: false,
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

  map.on('load', () => {
    loadSignals();
    emit('ready');
  });

  map.on('click', (e) => {
    if (!props.clickMode) return;

    if (tempMarker) {
      tempMarker.remove();
    }

    tempMarker = new maplibregl.Marker({
      color: '#d4b97a',
      scale: 0.8,
    })
      .setLngLat(e.lngLat)
      .addTo(map);

    emit('map-click', { lat: e.lngLat.lat, lng: e.lngLat.lng });
  });
}

function clearTempMarker() {
  if (tempMarker) {
    tempMarker.remove();
    tempMarker = null;
  }
}

watch(
  () => themeStore.preference,
  () => {
    if (map) {
      map.setStyle(getStyle());
      map.once('style.load', () => {
        loadSignals();
      });
    }
  }
);

watch(
  () => props.clickMode,
  (active) => {
    if (map) {
      map.getCanvas().style.cursor = active ? 'crosshair' : '';
    }
    if (!active) {
      clearTempMarker();
    }
  }
);

onMounted(async () => {
  await initMap();
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
});

defineExpose({ addNewSignal, clearTempMarker, loadSignals });
</script>

<style lang="scss" scoped>
.signal-map-wrapper {
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
}

.map-container {
  width: 100%;
  height: 60vh;
  min-height: 400px;
}
</style>
