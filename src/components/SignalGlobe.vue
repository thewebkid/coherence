<template>
  <div class="signal-globe-wrapper">
    <div ref="globeContainer" class="globe-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useThemeStore } from '@/stores/theme';

const props = defineProps({
  clickMode: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['map-click', 'ready']);

const themeStore = useThemeStore();
const globeContainer = ref(null);
let globe = null;
let resizeObserver = null;

const DARK_TEXTURE = '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg';
const LIGHT_TEXTURE = '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg';

function getTexture() {
  return themeStore.resolvedIsDark() ? DARK_TEXTURE : LIGHT_TEXTURE;
}

// Permanent signal data points (from API + confirmed user signals)
let signalData = [];
// Single temporary preview marker while user is picking location
let tempMarkerData = null;

function refreshMarkers() {
  if (!globe) return;
  const all = tempMarkerData ? [...signalData, tempMarkerData] : [...signalData];
  globe.htmlElementsData(all);
}

function createPulsingPin(mine = false) {
  const el = document.createElement('div');
  el.className = 'pulsing-pin';
  if (mine) {
    el.style.backgroundColor = 'blue';
  }
  el.innerHTML = `<div class="pulse-ring"></div>`;
  const duration = (6 + Math.random()) / 2;
  el.style.setProperty('--duration', `${duration.toFixed(2)}s`);
  return el;
}

function addNewSignal(lng, lat, isMine = false) {
  const d = { lat, lng, isMine };
  signalData.push(d);
  refreshMarkers();
  return d;
}

function clearTempMarker() {
  tempMarkerData = null;
  refreshMarkers();
}

async function loadSignals() {
  try {
    const res = await fetch('/api/signals');
    if (!res.ok) return;
    const signals = await res.json();
    const myId = localStorage.getItem('mysignal-id');
    signalData = signals.map(s => ({
      lat: s.lat,
      lng: s.lng,
      isMine: !!myId && s.id === myId
    }));
    refreshMarkers();
  } catch (e) {
    console.error('Failed to load signals:', e);
  }
}

async function initGlobe() {
  if (!globeContainer.value) return;

  const { default: Globe } = await import('globe.gl');

  const el = globeContainer.value;
  globe = Globe()(el);

  globe
    .width(el.clientWidth)
    .height(el.clientHeight)
    .globeImageUrl(getTexture())
    .backgroundColor('rgba(0,0,0,0)')
    .htmlElement(d => createPulsingPin(d.isMine))
    .htmlElementVisibilityModifier((el, isVisible) => {
      el.style.opacity = isVisible ? 1 : 0;
      el.style.pointerEvents = isVisible ? 'auto' : 'none';
    })
    .onGlobeClick(({ lat, lng }) => {
      if (!props.clickMode) return;
      clearTempMarker();
      tempMarkerData = { lat, lng, isMine: true };
      localStorage.setItem('mysignal', JSON.stringify([lng, lat]));
      refreshMarkers();
      emit('map-click', { lat, lng });
    });

  resizeObserver = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    if (globe && width && height) {
      globe.width(width).height(height);
    }
  });
  resizeObserver.observe(el);

  await loadSignals();
  emit('ready');
}

watch(
  () => themeStore.preference,
  () => {
    if (globe) {
      globe.globeImageUrl(getTexture());
    }
  }
);

watch(
  () => props.clickMode,
  (active) => {
    if (!active) {
      clearTempMarker();
    }
  }
);

onMounted(async () => {
  await initGlobe();
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  if (globe) {
    try {
      globe._destructor();
    } catch (e) {
      const renderer = globe.renderer?.();
      if (renderer) renderer.dispose();
    }
    globe = null;
  }
});

defineExpose({ addNewSignal, clearTempMarker, loadSignals });
</script>

<style lang="scss">
.signal-globe-wrapper {
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
}

html[data-theme='dark'] .globe-container {
  --markerBg: #fff;
  --markerShadowOut: #fff;
  --markerShadowIn: #000;
}

.globe-container {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  --markerBg: #fff;
  --markerShadowOut: #000;
  --markerShadowIn: #fff;

  .pulsing-pin {
    position: relative;
    width: 12px;
    height: 12px;
    cursor: pointer;
    background-color: var(--markerBg);
    border-radius: 50%;
    box-shadow: inset 0 0 4px var(--markerShadowIn), 0 0 4px var(--markerShadowOut);

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
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
}
</style>
