<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="visible" class="ro-overlay" @click.self="close">
        <div class="ro-modal" role="dialog" aria-modal="true" aria-labelledby="ro-title">
          <div class="ro-header">
            <div class="ro-heading">
              <h2 id="ro-title">Recent Observations</h2>
              <p class="ro-meta">
                <span v-if="loading">Loading…</span>
                <span v-else-if="error" class="ro-meta--error">{{ error }}</span>
                <span v-else>
                  {{ rows.length }} observation{{ rows.length === 1 ? '' : 's' }} · {{ rangeLabel }}
                </span>
              </p>
            </div>
            <button type="button" class="ro-close" aria-label="Close" @click="close">×</button>
          </div>

          <div class="ro-controls">
            <div class="ro-range" role="group" aria-label="Date range">
              <button
                v-for="r in RANGES"
                :key="r.value"
                type="button"
                class="ro-range-btn"
                :class="{ 'is-active': range === r.value }"
                :disabled="loading"
                @click="range = r.value"
              >
                {{ r.label }}
              </button>
            </div>
            <button
              type="button"
              class="ro-copy"
              :disabled="loading || !rows.length"
              @click="copyToClipboard"
            >
              {{ copyLabel }}
            </button>
          </div>

          <div class="ro-list">
            <p v-if="loading" class="ro-empty">Loading observations…</p>
            <p v-else-if="error" class="ro-empty ro-empty--error">{{ error }}</p>
            <p v-else-if="!rows.length" class="ro-empty">No observations in this range.</p>
            <article v-for="row in rows" v-else :key="row.id" class="ro-obs">
              <header class="ro-obs__head">
                <span class="ro-obs__project">{{ row.project }}</span>
                <span class="ro-obs__signal">{{ row.signal }}</span>
                <span class="ro-obs__date">{{ formatDate(row.created_at) }}</span>
              </header>
              <p class="ro-obs__reflection">{{ row.reflection }}</p>
              <footer v-if="row.context || row.geography" class="ro-obs__footer">
                <span v-if="row.context" class="ro-obs__footer-item">
                  <span class="ro-obs__footer-label">Context:</span> {{ row.context }}
                </span>
                <span v-if="row.geography" class="ro-obs__footer-item">
                  <span class="ro-obs__footer-label">Location:</span> {{ row.geography }}
                </span>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import { useAuth } from '@clerk/vue';

const props = defineProps({
  visible: { type: Boolean, default: false },
});

const emit = defineEmits(['close']);

const { getToken } = useAuth();

const RANGES = [
  { value: '7', label: 'Past 7 days' },
  { value: '14', label: 'Past 14 days' },
  { value: '21', label: 'Past 21 days' },
  { value: 'all', label: 'All' },
];

const range = ref('7');
const rows = ref([]);
const loading = ref(false);
const error = ref('');
const copied = ref(false);

const rangeLabel = computed(
  () => RANGES.find((r) => r.value === range.value)?.label ?? ''
);

const copyLabel = computed(() => (copied.value ? 'Copied!' : 'Copy all'));

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const token = await getToken.value();
    const res = await fetch(`/api/admin/observations?days=${range.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const ct = res.headers.get('content-type') || '';
    if (!res.ok) {
      let msg = `Failed (${res.status})`;
      if (ct.includes('application/json')) {
        const body = await res.json().catch(() => ({}));
        if (body.error) msg = body.error;
      }
      throw new Error(msg);
    }
    if (!ct.includes('application/json')) {
      throw new Error('Unexpected response format');
    }
    rows.value = await res.json();
  } catch (err) {
    console.error('Failed to load observations:', err);
    error.value = err.message || 'Failed to load observations.';
    rows.value = [];
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible) load();
  }
);

watch(range, () => {
  if (props.visible) load();
});

function close() {
  emit('close');
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return String(iso);
  }
}

async function copyToClipboard() {
  if (!rows.value.length) return;
  const text = rows.value
    .map((row) => {
      const date = formatDate(row.created_at);
      const parts = [`[${date}] ${row.project} — ${row.signal}`, row.reflection];
      const meta = [];
      if (row.context) meta.push(`Context: ${row.context}`);
      if (row.geography) meta.push(`Location: ${row.geography}`);
      if (meta.length) parts.push(meta.join(' | '));
      return parts.join('\n');
    })
    .join('\n\n');

  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1500);
  } catch (err) {
    console.error('Clipboard write failed:', err);
    error.value = 'Could not copy to clipboard.';
  }
}

function onKeydown(e) {
  if (e.key === 'Escape' && props.visible) close();
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', onKeydown);
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
}
</script>

<style lang="scss" scoped>
.ro-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.ro-modal {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
  max-width: 860px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ro-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  flex-shrink: 0;
}

.ro-heading {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.ro-heading h2 {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
}

.ro-meta {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 0;

  &--error { color: #c0392b; }
}

.ro-close {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-muted);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--text); }
}

.ro-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border);
  margin-bottom: var(--spacing-sm);
  flex-shrink: 0;
}

.ro-range {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  flex-wrap: wrap;
}

.ro-range-btn {
  padding: 0.35rem 0.75rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  border-radius: calc(var(--radius-sm) - 2px);
  cursor: pointer;
  transition: background var(--transition-speed) ease, color var(--transition-speed) ease;

  &:hover:not(:disabled):not(.is-active) { color: var(--text); }

  &.is-active {
    background: var(--bg);
    color: var(--text);
    box-shadow: 0 0 0 1px var(--border);
  }

  &:disabled { cursor: not-allowed; opacity: 0.5; }
}

.ro-copy {
  padding: 0.45rem 0.9rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition-speed) ease, color var(--transition-speed) ease;

  &:hover:not(:disabled) {
    background: var(--bg);
    border-color: var(--iw-accent, var(--accent));
  }

  &:disabled { cursor: not-allowed; opacity: 0.5; }
}

.ro-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding-right: 0.25rem;
}

.ro-empty {
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  text-align: center;
  margin: var(--spacing-lg) 0;

  &--error { color: #c0392b; }
}

.ro-obs {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  &__head {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    font-family: var(--font-sans);
    font-size: 0.75rem;
  }

  &__project {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--iw-accent, var(--accent));
  }

  &__signal {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.1rem 0.55rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--text);
  }

  &__date {
    margin-left: auto;
    color: var(--text-muted);
  }

  &__reflection {
    font-family: var(--font-serif);
    font-size: 0.9375rem;
    line-height: 1.55;
    color: var(--text);
    margin: 0;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    font-family: var(--font-sans);
    font-size: 0.75rem;
    color: var(--text-muted);
    padding-top: 0.25rem;
    border-top: 1px dashed var(--border);
  }

  &__footer-label {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    font-size: 0.65rem;
    margin-right: 0.25rem;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
