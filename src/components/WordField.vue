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
          x-dont-use-title="`${item.count} signal${item.count !== 1 ? 's' : ''}`"
          xdisabledclick="onWordClick(item.word)"
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
  console.log({[props.project]: val})
  loading.value = false;
});

// ── Layout computation ─────────────────────────────────────────

const DESIGN_WIDTH   = 600;  // px — reference width for full-size fonts
const MIN_SCALE      = 0.50; // never shrink below 50%
const MAX_JITTER     = 100;  // max px shift for edge words
const BAND_THRESHOLD = 0.75; // fraction of avgH used for row-grouping

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

// Deterministic 0..1 value per word so jitter is stable across re-renders.
function wordHash(word) {
  let h = 0;
  for (let i = 0; i < word.length; i++)
    h = (Math.imul(31, h) + word.charCodeAt(i)) | 0;
  return (h >>> 0) / 0xFFFFFFFF;
}

function applyEdgeJitter(placed, width) {
  if (!placed.length) return placed;

  const avgH = placed.reduce((s, p) => s + p.h, 0) / placed.length;
  const bandGap = avgH * BAND_THRESHOLD;

  // Sort a copy by vertical center to build horizontal bands.
  const byY = [...placed].sort((a, b) => (a.y + a.h / 2) - (b.y + b.h / 2));

  // Group into bands by proximity of vertical centers.
  const bands = [];
  let band = [byY[0]];
  let bandCY = byY[0].y + byY[0].h / 2;

  for (let i = 1; i < byY.length; i++) {
    const cy = byY[i].y + byY[i].h / 2;
    if (cy - bandCY <= bandGap) {
      band.push(byY[i]);
      bandCY = band.reduce((s, p) => s + p.y + p.h / 2, 0) / band.length;
    } else {
      bands.push(band);
      band = [byY[i]];
      bandCY = cy;
    }
  }
  bands.push(band);

  // Build a lookup for quick mutation by word identity.
  const offsets = new Map();

  for (const b of bands) {
    if (b.length >= 4) continue; // 4+ words: no variance

    b.sort((a, b) => a.x - b.x);

    if (b.length === 1) {
      const item = b[0];
      const hash = wordHash(item.word); // 0..1
      const raw  = (hash * 2 - 1) * MAX_JITTER;
      const lo   = -item.x;
      const hi   = width - (item.x + item.w);
      offsets.set(item.word, Math.max(lo, Math.min(hi, raw)));
    }

    if (b.length === 2 || b.length === 3) {
      const left  = b[0];
      const right = b[b.length - 1];

      const leftRoom  = Math.min(left.x, MAX_JITTER);
      const rightRoom = Math.min(width - (right.x + right.w), MAX_JITTER);

      offsets.set(left.word,  -wordHash(left.word)  * leftRoom);
      offsets.set(right.word,  wordHash(right.word) * rightRoom);
    }
  }

  if (!offsets.size) return placed;

  return placed.map(p =>
    offsets.has(p.word) ? { ...p, x: p.x + offsets.get(p.word) } : p
  );
}

function computeCloudLayout(wordList, width, height) {
  if (!wordList.length || !width || !height) return [];

  const maxCount  = Math.max(...wordList.map(w => w.count), 1);
  const fontScale = Math.max(MIN_SCALE, Math.min(1, width / DESIGN_WIDTH));
  const PAD = 4;

  const items = wordList
    .map(w => {
      const ratio    = w.count / maxCount;
      const fontSize = ((w.size / 2) + ratio * 24) * fontScale;
      const textW    = getTextWidth(w.word, fontSize);
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
      const r     = step * 0.6;
      const x     = cx + r * Math.cos(angle) - item.w / 2;
      const y     = cy + r * Math.sin(angle) - item.h / 2;

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

  return applyEdgeJitter(placed, width);
}

const layout = computed(() =>
  computeCloudLayout(words.value, containerWidth.value, canvasHeight.value)
);

// ── Word interaction ───────────────────────────────────────────

async function onWordClick(word) {
  if (!props.project) return;

  /*if (selectedWord.value === word) {
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
  }*/
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
