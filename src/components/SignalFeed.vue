<template>
  <div class="signal-feed">
    <div v-if="!entries.length" class="feed-empty">
      <p>Reflections will appear here as observations are submitted.</p>
    </div>
    <div
      v-else
      class="feed-stage"
      @click="handleClick"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
    >
      <Transition name="feed-toast">
        <p :key="currentIndex" class="feed-entry">{{ current }}</p>
      </Transition>
      <span
        class="feed-control"
        :class="{ 'is-visible': paused || hovered }"
        aria-hidden="true"
      >{{ paused ? '▶' : '‖' }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  entries: { type: Array, default: () => [] },
});

const currentIndex = ref(0);
const current = computed(() => props.entries[currentIndex.value] ?? null);

const paused = ref(false);
const hovered = ref(false);

let timer = null;

function start() {
  if (timer || props.entries.length <= 1 || paused.value) return;
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.entries.length;
  }, 8500);
}

function stop() {
  clearInterval(timer);
  timer = null;
}

function handleClick() {
  if (!paused.value) {
    stop();
    paused.value = true;
  } else {
    currentIndex.value = (currentIndex.value + 1) % props.entries.length;
    paused.value = false;
    start();
  }
}

function onPointerEnter() {
  hovered.value = true;
}

function onPointerLeave() {
  hovered.value = false;
}

onMounted(start);
onBeforeUnmount(stop);

watch(
  () => props.entries.length,
  (len, prev) => {
    if (len && !prev) start();
    if (!len) stop();
    if (currentIndex.value >= len) currentIndex.value = 0;
  },
);
</script>

<style lang="scss" scoped>
.signal-feed {
  min-height: 3.5rem;
}

.feed-stage {
  position: relative;
  min-height: 3.5rem;
  cursor: pointer;
}

.feed-entry {
  position: absolute;
  inset: 0;
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-muted);
  margin: 0;

  &::before {
    content: '— ';
    color: var(--text-muted);
    opacity: 0.6;
  }
}

.feed-control {
  position: absolute;
  right:-34px;
  top: 0;
  font-family: var(--font-sans);
  display: inline-block;
  width: 33px;
  text-align: center;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  opacity: 0;
  transition: opacity var(--transition-speed, 0.2s) ease;
  user-select: none;
  pointer-events: none;
  box-shadow:inset 0 0 2px var(--text-muted);
  border-radius: 50%;
  padding: 0.2rem;
  cursor: pointer;
  &.is-visible {
    opacity: 0.45;
  }
}

.feed-empty p {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0;
}

// ── Toast transition ──────────────────────────────────────────────────────────

.feed-toast-enter-active {
  transition: opacity 0.9s ease, transform 0.9s ease;
}

.feed-toast-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.feed-toast-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.feed-toast-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
