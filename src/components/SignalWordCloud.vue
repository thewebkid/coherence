<template>
  <div class="word-cloud" :class="{ 'word-cloud--loading': loading, 'word-cloud--empty': !loading && words.length === 0 }">
    <div v-if="loading" class="cloud-placeholder">
      <span v-for="n in 8" :key="n" class="placeholder-word" :style="{ width: `${40 + n * 10}px` }"></span>
    </div>
    <div v-else-if="words.length === 0" class="cloud-empty">
      <span class="empty-hint">Signals will appear here as observations are submitted.</span>
    </div>
    <div v-else class="cloud-words">
      <span
        v-for="w in words"
        :key="w.word"
        class="cloud-word"
        :style="wordStyle(w)"
        :title="`${w.count} signal${w.count !== 1 ? 's' : ''}`"
      >{{ w.word }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  project: { type: String, required: true },
});

const loading = ref(true);
const words = ref([]);

const maxCount = computed(() => words.value.reduce((m, w) => Math.max(m, w.count), 1));

function wordStyle(w) {
  const ratio = w.count / maxCount.value;
  const size = 0.8 + ratio * 1.4; // 0.8rem – 2.2rem
  const opacity = 0.5 + ratio * 0.5;
  return { fontSize: `${size.toFixed(2)}rem`, opacity };
}

onMounted(async () => {
  try {
    const res = await fetch(`/api/observations?project=${encodeURIComponent(props.project)}`);
    if (res.ok) {
      const data = await res.json();
      words.value = data.signals || [];
    }
  } catch {
    // silently degrade
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.word-cloud {
  min-height: 80px;
  padding: var(--spacing-md) 0;
}

.cloud-words {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm) var(--spacing-md);
  align-items: baseline;
}

.cloud-word {
  font-family: var(--font-sans);
  color: var(--text);
  cursor: default;
  transition: opacity 0.2s ease;
  line-height: 1.4;

  &:hover { opacity: 1 !important; }
}

.cloud-placeholder {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm) var(--spacing-md);
  align-items: baseline;
}

.placeholder-word {
  height: 1rem;
  background: var(--border);
  border-radius: 3px;
  animation: shimmer 1.6s ease-in-out infinite;
}

.cloud-empty {
  padding: var(--spacing-sm) 0;
}

.empty-hint {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
}

@keyframes shimmer {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
</style>
