<template>
  <div class="audio-player">
    <audio
      ref="audioEl"
      :src="src"
      :loop="looping"
      preload="metadata"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    />

    <div class="player-timeline-row">
      <span class="player-time">{{ formatTime(currentTime) }}</span>
      <div class="player-timeline-wrap" @click="seekTo" @mousedown="startScrub">
        <div class="player-timeline-track">
          <div class="player-timeline-fill" :style="{ width: progressPercent + '%' }" />
          <div class="player-timeline-thumb" :style="{ left: progressPercent + '%' }" />
        </div>
      </div>
      <span class="player-time player-time-total">{{ formatTime(duration) }}</span>
    </div>

    <div class="player-controls">
      <button class="player-btn" :aria-label="playing ? 'Pause' : 'Play'" @click="togglePlay">
        <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
        </svg>
      </button>

      <button
        class="player-btn player-btn-repeat"
        :class="{ active: looping }"
        aria-label="Repeat"
        @click="toggleLoop"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="17 1 21 5 17 9"/>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
          <polyline points="7 23 3 19 7 15"/>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
});

const audioEl = ref(null);
const playing = ref(false);
const looping = ref(false);
const currentTime = ref(0);
const duration = ref(0);
let scrubbing = false;

const progressPercent = computed(() => {
  if (!duration.value) return 0;
  return (currentTime.value / duration.value) * 100;
});

function togglePlay() {
  if (!audioEl.value) return;
  if (playing.value) {
    audioEl.value.pause();
    playing.value = false;
  } else {
    audioEl.value.play();
    playing.value = true;
  }
}

function toggleLoop() {
  looping.value = !looping.value;
}

function onTimeUpdate() {
  if (!scrubbing && audioEl.value) {
    currentTime.value = audioEl.value.currentTime;
  }
}

function onLoadedMetadata() {
  if (audioEl.value) {
    duration.value = audioEl.value.duration;
  }
}

function onEnded() {
  playing.value = false;
  currentTime.value = 0;
}

function seekTo(e) {
  const track = e.currentTarget.querySelector('.player-timeline-track');
  const rect = track.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  if (audioEl.value && duration.value) {
    audioEl.value.currentTime = ratio * duration.value;
    currentTime.value = audioEl.value.currentTime;
  }
}

function startScrub(e) {
  scrubbing = true;
  const onMove = (ev) => {
    const track = e.currentTarget.querySelector('.player-timeline-track');
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
    if (audioEl.value && duration.value) {
      currentTime.value = ratio * duration.value;
    }
  };
  const onUp = (ev) => {
    scrubbing = false;
    if (audioEl.value && duration.value) {
      const track = e.currentTarget.querySelector('.player-timeline-track');
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      audioEl.value.currentTime = ratio * duration.value;
      currentTime.value = audioEl.value.currentTime;
    }
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  };
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
}

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
</script>

<style lang="scss" scoped>
.audio-player {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) 0;
}

.player-timeline-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.player-time {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-muted);
  min-width: 2.5rem;
  letter-spacing: 0.03em;
  user-select: none;

  &.player-time-total {
    text-align: right;
  }
}

.player-timeline-wrap {
  flex: 1;
  padding: var(--spacing-sm) 0;
  cursor: pointer;
}

.player-timeline-track {
  position: relative;
  height: 1px;
  background: var(--border);
  border-radius: 1px;
}

.player-timeline-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--iw-accent);
  border-radius: 1px;
  transition: width 0.1s linear;
}

.player-timeline-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--iw-accent);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;

  .player-timeline-wrap:hover & {
    opacity: 1;
  }
}

.player-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.player-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  color: var(--text-muted);
  cursor: pointer;
  transition: color var(--transition-speed) ease;

  &:hover {
    color: var(--iw-accent);
  }

  &.player-btn-repeat {
    opacity: 0.5;

    &.active {
      opacity: 1;
      color: var(--iw-accent);
    }
  }
}
</style>
