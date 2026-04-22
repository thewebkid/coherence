<template>
  <div class="signal-feed">
    <div v-if="!entries.length" class="feed-empty">
      <p>Reflections will appear here as observations are submitted.</p>
    </div>
    <div v-else class="feed-stage">
      <Transition name="feed-toast">
        <p :key="currentIndex" class="feed-entry">{{ current }}</p>
      </Transition>
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

let timer = null;

function start() {
  if (timer || props.entries.length <= 1) return;
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.entries.length;
  }, 8500);
}

function stop() {
  clearInterval(timer);
  timer = null;
}

onMounted(start);
onBeforeUnmount(stop);

watch(
  () => props.entries.length,
  (len, prev) => {
    if (len && !prev) start();
    if (!len) stop();
    // Reset index if it's now out of bounds
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
