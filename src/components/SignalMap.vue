<template>
  <div class="signal-map-wrapper">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, watch} from 'vue';
import {useThemeStore} from '@/stores/theme';

let maplibregl = null;

const props = defineProps({
  clickMode: {
    type: Boolean,
    default: false
  }
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
        geometry: {type: 'Point', coordinates: [s.lng, s.lat]},
        properties: {id: s.id}
      }))
    };

    if (map.getSource('signals')) {
      map.getSource('signals').setData(geojson);
    } else {
      map.addSource('signals', {type: 'geojson', data: geojson});

      map.addLayer({
        id: 'signals-glow',
        type: 'circle',
        source: 'signals',
        paint: {
          'circle-radius': 12,
          'circle-color': '#c4a96a',
          'circle-opacity': 0.15,
          'circle-blur': 1
        }
      });

      map.addLayer({
        id: 'signals-core',
        type: 'circle',
        source: 'signals',
        paint: {
          'circle-radius': 4,
          'circle-color': '#d4b97a',
          'circle-opacity': 0.7,
          'circle-blur': 0.3
        }
      });
    }
  } catch (e) {
    console.error('Failed to load signals:', e);
  }
}

function addNewSignal(lng, lat) {
  if (!map || !map.getSource('signals')) return;
  const source = map.getSource('signals');
  const data = source._data || {type: 'FeatureCollection', features: []};
  data.features.push({
    type: 'Feature',
    geometry: {type: 'Point', coordinates: [lng, lat]},
    properties: {id: 'new'}
  });
  source.setData(data);
}

function createPulsingPin(color = '#FF4C4C') {
  const el = document.createElement('div');
  el.className = 'pulsing-pin';

  el.innerHTML = `<div class="pulse-ring"></div>`;

  return el;
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
    pitchWithRotate: false
  });

  map.addControl(new maplibregl.NavigationControl({showCompass: false}), 'top-right');

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
      element: createPulsingPin('#FF4C4C'),   // ← pass brighter color for Day mode
      anchor: 'center',                       // pin tip points exactly at the coordinate
      offset: [0, -4]
    })
        .setLngLat(e.lngLat)
        .addTo(map);

    emit('map-click', {lat: e.lngLat.lat, lng: e.lngLat.lng});
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

defineExpose({addNewSignal, clearTempMarker, loadSignals});
</script>

<style lang="scss">
.signal-map-wrapper {
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
}

html[data-theme='dark'] .map-container{
  --markerBg:#fff;
  --markerShadowOut:#fff;
  --markerShadowIn:#000;
}
.map-container {
  width: 100%;
  height: 60vh;
  min-height: 400px;
  --markerBg:#ccc;
  --markerShadowOut:#000;
  --markerShadowIn:#fff;
  .maplibregl-marker.pulsing-pin {
    position: relative;
    width: 12px;
    height: 12px;
    cursor: pointer;
    background-color: var(--markerBg);
    border-radius: 50%;
    box-shadow:inset 0 0 4px var(--markerShadowIn), 0 0 4px var(--markerShadowOut);

    .pulse-ring {
      position: absolute;
      left: -1px;
      top: -1px;
      width: 14px;
      height: 14px;
      border: 1px double green;
      border-radius: 50%;
      opacity: 0.75;
      box-shadow: inset 0 0 6px var(--markerBg);
      animation: soft-pulse 3.5s ease-out infinite;
      z-index: 1;
      pointer-events: none;
    }
  }

  @keyframes soft-pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    /*50% {
      transform: scale(2);
      opacity: .5;
    }*/
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
}

</style>
