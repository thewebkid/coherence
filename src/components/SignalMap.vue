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

let signalMarkers = [];

async function loadSignals() {
  try {
    const res = await fetch('/api/signals');
    if (!res.ok) return;
    const signals = await res.json();
    //console.log({signals});
    if (!map) return;

    // Optional: clear old markers if reloading
    signalMarkers.forEach(m => m.remove());
    signalMarkers = [];

    signals.forEach(signal => {
      addNewSignal(signal.lng, signal.lat);
    });

  } catch (e) {
    console.error('Failed to load signals:', e);
  }
}

function addNewSignal(lng, lat) {
  //console.log(JSON.stringify([lng,lat]),mySignal)
  const marker = new maplibregl.Marker({
    element: createPulsingPin(JSON.stringify([lng,lat])===localStorage.getItem('mysignal')),
    anchor: 'center',     // perfect for circles
    offset: [0,0],
  })
      .setLngLat([lng,lat])
      .addTo(map);
  signalMarkers.push(marker);
  marker.getElement().addEventListener('click', () => {
    // emit event, open popup, etc.
    console.log('Clicked signal:', {lat, lng});
    // emit('signal-click', signal); or similar
  });
  return marker;
}

function createPulsingPin(mine = false) {
  const el = document.createElement('div');
  el.className = `pulsing-pin`;
  if (mine){
    el.style.backgroundColor = 'blue';
  }
  el.innerHTML = `<div class="pulse-ring"></div>`;
  // Random cycle: 2.0 – 3.0 seconds
  let duration = (6 + Math.random()) / 2;
  el.style.setProperty('--duration', `${duration.toFixed(2)}s`);
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
    center: [0, 0],
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
    mySignal = JSON.stringify([e.lngLat.lng, e.lngLat.lat]);
    localStorage.setItem('mysignal', mySignal);
    tempMarker = addNewSignal(e.lngLat.lng, e.lngLat.lat);

    emit('map-click', {lat: e.lngLat.lat, lng: e.lngLat.lng});
  });
}
let mySignal = localStorage.getItem('mysignal');
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
  --markerBg:#fff;
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
      animation: soft-pulse var(--duration, 2.5s) ease-out infinite;
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
