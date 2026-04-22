<template>
  <div class="word-field" ref="containerRef">

    <!-- Loading -->
    <div v-if="loading" class="wf-loading" :style="{ height: placeholderHeight + 'px' }">
      <span
        v-for="n in 8"
        :key="n"
        class="wf-placeholder-word"
        :style="{ width: `${30 + n * 12}px`, height: `${10 + (n % 3) * 4}px` }"
      />
    </div>

    <!-- Empty -->
    <div v-else-if="!words.length" class="wf-empty">
      <span class="wf-empty-hint">
        Signals will appear here as observations are submitted.
      </span>
    </div>

    <!-- Word field canvas -->
    <template v-else>
      <div
        class="wf-canvas"
        :style="{ height: canvasHeight + 'px' }"
        role="group"
        aria-label="Word field"
      >
        <button
          v-for="item in layout"
          :key="item.word"
          type="button"
          class="wf-word"
          :class="{ 'wf-word--active': selectedWord === item.word }"
          :style="{
            left: item.x + 'px',
            top: item.y + 'px',
            fontSize: item.fontSize + 'px',
            opacity: 0.45 + item.ratio * 0.55,
            cursor: project ? 'pointer' : 'default',
          }"
          :title="`${item.count} signal${item.count !== 1 ? 's' : ''}`"
          @click="onWordClick(item.word)"
        >{{ item.word }}</button>
      </div>

      <!-- Drill-down detail panel -->
      <Transition name="wf-panel">
        <div v-if="selectedWord" class="wf-detail">
          <div class="wf-detail__head">
            <span class="wf-detail__word">{{ selectedWord }}</span>
            <button
              type="button"
              class="wf-detail__close"
              aria-label="Close detail"
              @click="clearSelection"
            >&times;</button>
          </div>

          <div v-if="detailLoading" class="wf-detail__loading">
            <span class="wf-detail__spinner" />
          </div>

          <template v-else-if="detail">
            <ul v-if="detail.fragments.length" class="wf-fragments">
              <li v-for="(frag, i) in detail.fragments" :key="i">{{ frag }}</li>
            </ul>
            <p v-else class="wf-detail__none">No fragments available.</p>

            <div v-if="detail.coOccurring.length" class="wf-related">
              <button
                v-for="co in detail.coOccurring"
                :key="co.word"
                type="button"
                class="wf-related__tag"
                @click="onWordClick(co.word)"
              >{{ co.word }}</button>
            </div>
          </template>
        </div>
      </Transition>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch, toRef } from 'vue';

const props = defineProps({
  project: { type: String, default: null },
  words: { type: Array, default: () => [] },
});

const containerRef = ref(null);
const containerWidth = ref(0);

const loading = ref(true);
const words = ref([]);
const selectedWord = ref(null);
const detail = ref(null);
const detailLoading = ref(false);

const placeholderHeight = 180;

let resizeObserver = null;

// ── Data fetching ──────────────────────────────────────────────

onMounted(async () => {
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      if (w > 0 && Math.abs(w - containerWidth.value) > 8) {
        containerWidth.value = w;
      }
    });
    resizeObserver.observe(containerRef.value);

    await nextTick();
    if (containerWidth.value === 0) {
      containerWidth.value = containerRef.value.clientWidth;
    }
    words.value = props.words;
    loading.value = false;
  }

  /*try {
    const res = await fetch(
      `/api/observations?project=${encodeURIComponent(props.project)}`
    );
    if (res.ok) {
      const data = await res.json();
      words.value = data.signals || [];
      console.log({[props.project]: words.value})
    }
  } catch {
    // silently degrade
  } finally {
    loading.value = false;
    await nextTick();
    if (containerRef.value && containerWidth.value === 0) {
      containerWidth.value = containerRef.value.clientWidth;
    }
  }*/
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});

watch(toRef(props, 'words'), (val) => {
  words.value = val;
  loading.value = false;
});

// ── Layout computation ─────────────────────────────────────────

const canvasHeight = computed(() => {
  const w = containerWidth.value;
  if (!w) return 0;
  return Math.min(Math.max(Math.round(w * 0.7), 200), 320);
});

let _measureCtx = null;
function getTextWidth(text, fontSize) {
  if (!_measureCtx) {
    const canvas = document.createElement('canvas');
    _measureCtx = canvas.getContext('2d');
  }
  _measureCtx.font = `${fontSize}px Inter, -apple-system, sans-serif`;
  return _measureCtx.measureText(text).width;
}

function computeCloudLayout(wordList, width, height) {
  if (!wordList.length || !width || !height) return [];

  const maxCount = Math.max(...wordList.map(w => w.count), 1);
  const PAD = 4;

  const items = wordList
    .map(w => {
      const ratio = w.count / maxCount;
      const fontSize = (w.size/2) + ratio * 24;
      const textW = getTextWidth(w.word, fontSize);
      return {
        word: w.word,
        count: w.count,
        ratio,
        fontSize,
        w: textW + 14,
        h: fontSize * 1.35 + 6,
      };
    })
    .sort((a, b) => b.count - a.count);

  const placed = [];
  const cx = width / 2;
  const cy = height / 2;

  for (const item of items) {
    let found = false;
    for (let step = 0; step < 500; step++) {
      const angle = step * 0.3;
      const r = step * 0.6;
      const x = cx + r * Math.cos(angle) - item.w / 2;
      const y = cy + r * Math.sin(angle) - item.h / 2;

      if (x < 0 || y < 0 || x + item.w > width || y + item.h > height) continue;

      const overlaps = placed.some(
        p =>
          x < p.x + p.w + PAD &&
          x + item.w + PAD > p.x &&
          y < p.y + p.h + PAD &&
          y + item.h + PAD > p.y
      );

      if (!overlaps) {
        placed.push({ ...item, x, y });
        found = true;
        break;
      }
    }
    // Words that can't be placed are omitted (sparse-data handling)
  }

  return placed;
}

const layout = computed(() =>
  computeCloudLayout(words.value, containerWidth.value, canvasHeight.value)
);

// ── Word interaction ───────────────────────────────────────────

async function onWordClick(word) {
  if (!props.project) return;

  if (selectedWord.value === word) {
    clearSelection();
    return;
  }

  selectedWord.value = word;
  detail.value = null;
  detailLoading.value = true;

  try {
    const res = await fetch(
      `/api/word-detail?project=${encodeURIComponent(props.project)}&word=${encodeURIComponent(word)}`
    );
    if (res.ok) {
      detail.value = await res.json();
    }
  } catch {
    // silently degrade
  } finally {
    detailLoading.value = false;
  }
}

function clearSelection() {
  selectedWord.value = null;
  detail.value = null;
}
</script>

<style lang="scss" scoped>
.word-field {
  min-height: 80px;
}

// ── Canvas ──────────────────────────────────────────────────────

.wf-canvas {
  position: relative;
  overflow: hidden;
}

.wf-word {
  position: absolute;
  background: none;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  padding: 1px 5px;
  font-family: var(--font-sans);
  color: var(--text);
  cursor: pointer;
  white-space: nowrap;
  line-height: 1.3;
  transition: opacity 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    opacity: 1 !important;
    color: var(--accent);
  }

  &--active {
    opacity: 1 !important;
    border-color: var(--accent);
    color: var(--accent);
  }
}

// ── Detail panel ────────────────────────────────────────────────

.wf-detail {
  margin-top: var(--spacing-sm);
  padding: var(--spacing-md);
  border-top: 1px solid var(--border);
}

.wf-detail__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.wf-detail__word {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text);
}

.wf-detail__close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;

  &:hover { color: var(--text); }
}

.wf-detail__loading {
  padding: var(--spacing-xs) 0;
}

.wf-detail__spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: wf-spin 0.8s linear infinite;
}

@keyframes wf-spin {
  to { transform: rotate(360deg); }
}

.wf-detail__none {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0;
}

.wf-fragments {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  li {
    font-family: var(--font-serif);
    font-size: 0.875rem;
    line-height: 1.65;
    color: var(--text);
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid var(--border);

    &:last-child { border-bottom: none; }
    &::before { content: '\2014\00a0'; color: var(--text-muted); }
  }
}

.wf-related {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.wf-related__tag {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 2px 10px;
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
}

// ── Transition ──────────────────────────────────────────────────

.wf-panel-enter-active,
.wf-panel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.wf-panel-enter-from,
.wf-panel-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

// ── Loading / empty ─────────────────────────────────────────────

.wf-loading {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 10px 14px;
  padding: var(--spacing-md);
}

.wf-placeholder-word {
  background: var(--border);
  border-radius: 3px;
  animation: wf-shimmer 1.6s ease-in-out infinite;
}

@keyframes wf-shimmer {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.65; }
}

.wf-empty {
  padding: var(--spacing-md) 0;
}

.wf-empty-hint {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
}
</style>
