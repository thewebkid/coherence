<template>
  <div class="signal-feed">
    <div v-if="loading" class="feed-placeholder">
      <div v-for="n in 3" :key="n" class="placeholder-entry"></div>
    </div>
    <div v-else-if="entries.length === 0" class="feed-empty">
      <p>Reflections will appear here as observations are submitted.</p>
    </div>
    <ul v-else class="feed-list">
      <li v-for="(entry, i) in entries" :key="i" class="feed-entry">
        {{ entry }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  project: { type: String, required: true },
});

const loading = ref(true);
const entries = ref([]);

onMounted(async () => {
  try {
    const res = await fetch(`/api/observations?project=${encodeURIComponent(props.project)}`);
    if (res.ok) {
      const data = await res.json();
      entries.value = data.feed || [];
    }
  } catch {
    // silently degrade
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.signal-feed {
  margin-top: var(--spacing-md);
}

.feed-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.feed-entry {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border);

  &:last-child { border-bottom: none; }

  &::before {
    content: '— ';
    color: var(--text-muted);
  }
}

.feed-empty p {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0;
}

.feed-placeholder {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.placeholder-entry {
  height: 1.2rem;
  background: var(--border);
  border-radius: 3px;
  animation: shimmer 1.6s ease-in-out infinite;
  width: 90%;

  &:nth-child(2) { width: 75%; }
  &:nth-child(3) { width: 82%; }
}

@keyframes shimmer {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
</style>
