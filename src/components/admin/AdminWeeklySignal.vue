<template>
  <div class="admin-ws">
    <div class="ws-container">
      <div class="ws-title-row">
        <h2 class="ws-title">Compose Weekly Signal</h2>
        <button
          type="button"
          class="btn-secondary ws-observations-btn"
          @click="showObservations = true"
        >
          Recent Observations
        </button>
      </div>
      <p class="ws-help">
        Each publish creates a new Weekly Signal record; the Observatory page always shows the most recent one.
        Past signals are preserved in the database.
      </p>

      <div class="ws-field">
        <label class="ws-label" for="ws-label">Label</label>
        <input
          id="ws-label"
          v-model="label"
          type="text"
          class="ws-input"
          placeholder="Weekly Signal"
          :disabled="publishing || loading"
        />
      </div>

      <div class="ws-field">
        <label class="ws-label" for="ws-timeframe">Timeframe</label>
        <input
          id="ws-timeframe"
          v-model="timeframe"
          type="text"
          class="ws-input"
          placeholder="Week of April 1, 2026"
          :disabled="publishing || loading"
        />
      </div>

      <div class="ws-field">
        <label class="ws-label">Content</label>
        <MarkdownEditor
          v-model="content"
          :disabled="publishing || loading"
        />
      </div>

      <div class="ws-preview-divider">
        <span class="ws-preview-divider__line" aria-hidden="true" />
        <span class="ws-preview-divider__label">Preview — this is how it will appear on the Observatory page</span>
        <span class="ws-preview-divider__arrow" aria-hidden="true">↓</span>
      </div>

      <WeeklySignalDisplay
        :label="label || 'Weekly Signal'"
        :timeframe="timeframe"
        :content="content"
      />

      <div class="ws-actions">
        <button
          class="btn-publish"
          :disabled="!canPublish || publishing || loading"
          @click="publish"
        >
          {{ publishing ? 'Publishing…' : 'Publish Now' }}
        </button>
        <span v-if="statusMessage" class="ws-status" :class="{ 'ws-status--error': statusIsError }">
          {{ statusMessage }}
        </span>
      </div>
    </div>

    <RecentObservationsModal
      :visible="showObservations"
      @close="showObservations = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth } from '@clerk/vue';
import WeeklySignalDisplay from '@/components/WeeklySignalDisplay.vue';
import MarkdownEditor from '@/components/admin/MarkdownEditor.vue';
import RecentObservationsModal from '@/components/admin/RecentObservationsModal.vue';
import { fetchCurrentSignal } from '@/utils/currentSignal';

const props = defineProps({
  // Pre-loaded signal passed down from AdminPage so this view shows data instantly
  // when the user switches the dropdown.
  initialSignal: { type: Object, default: null },
  initialLoading: { type: Boolean, default: false },
});

const emit = defineEmits(['published']);

const { getToken } = useAuth();

const label = ref('Weekly Signal');
const timeframe = ref('');
const content = ref('');
const loading = ref(true);
const publishing = ref(false);
const statusMessage = ref('');
const statusIsError = ref(false);
const showObservations = ref(false);

const canPublish = computed(
  () => label.value.trim() && timeframe.value.trim() && content.value.trim()
);

function applySignal(row) {
  if (!row) return;
  if (row.label) label.value = row.label;
  if (row.timeframe) timeframe.value = row.timeframe;
  content.value = row.content ?? '';
}

// If the parent already has a row, use it immediately; otherwise fetch ourselves.
if (props.initialSignal) {
  applySignal(props.initialSignal);
  loading.value = false;
}

// If the parent is still loading when we mount, wait for it before falling back to a self-fetch.
watch(
  () => props.initialSignal,
  (row) => {
    if (row) {
      applySignal(row);
      loading.value = false;
    }
  }
);

async function publish() {
  if (!canPublish.value || publishing.value) return;

  publishing.value = true;
  statusMessage.value = '';
  statusIsError.value = false;

  try {
    const token = await getToken.value();
    const res = await fetch('/api/weekly-signal', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: label.value.trim(),
        timeframe: timeframe.value.trim(),
        content: content.value,
      }),
    });

    if (!res.ok) {
      let errBody = {};
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        errBody = await res.json().catch(() => ({}));
      }
      throw new Error(errBody.error || `Failed to publish (${res.status})`);
    }

    const inserted = await res.json().catch(() => null);
    if (inserted) emit('published', inserted);

    statusMessage.value = 'Published successfully.';
    statusIsError.value = false;
  } catch (err) {
    console.error('Publish failed:', err);
    statusMessage.value = err.message || 'Failed to publish.';
    statusIsError.value = true;
  } finally {
    publishing.value = false;
  }
}

onMounted(async () => {
  // Parent is expected to preload. We only self-fetch if it never produced a row
  // (e.g. if this component is used standalone somewhere else in the future).
  if (props.initialSignal) return;
  if (props.initialLoading) return;

  const row = await fetchCurrentSignal();
  if (row) applySignal(row);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.admin-ws {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
}

.ws-container {
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.ws-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.ws-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
}

.btn-secondary.ws-observations-btn {
  padding: 0.45rem 0.9rem;
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-speed) ease, border-color var(--transition-speed) ease, color var(--transition-speed) ease;

  &:hover {
    background: var(--bg-secondary);
    border-color: var(--iw-accent, var(--accent));
    color: var(--iw-accent, var(--accent));
  }
}

.ws-help {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0 0 var(--spacing-sm) 0;
  line-height: 1.6;
}

.ws-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.ws-label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--iw-accent, var(--accent));
  font-weight: 500;
}

.ws-input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--text);
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--iw-accent, var(--accent));
  }

  &:disabled { opacity: 0.6; }
}

.ws-preview-divider {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);

  &__line {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  &__label {
    font-family: var(--font-sans);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-muted);
    font-weight: 500;
  }

  &__arrow {
    color: var(--text-muted);
    font-size: 0.875rem;
  }
}

.ws-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
  flex-wrap: wrap;
}

.btn-publish {
  padding: 0.6rem 1.5rem;
  background: var(--iw-accent, var(--accent));
  color: var(--bg);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: filter var(--transition-speed) ease;

  &:hover:not(:disabled) { filter: brightness(1.08); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.ws-status {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);

  &--error { color: #c0392b; }
}
</style>
