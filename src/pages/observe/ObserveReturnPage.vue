<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container observe-page">
        <p v-if="loadError" class="page-content">{{ loadError }}</p>

        <p v-else-if="loading" class="text-meta">Loading…</p>

        <div v-else-if="step === 'sitting'">
          <p class="return-lead">The same conditions. Recognize what is familiar now.</p>
          <p v-if="submitError" class="error-message">{{ submitError }}</p>
          <ObserveSitting
            :submitting="submitting"
            @complete="onComplete"
            @cancel="goHome"
          />
        </div>

        <div v-else-if="step === 'compare'" class="page-content">
          <header class="page-header">
            <h1>Same conditions. Recognized movement at two sittings.</h1>
          </header>
          <p class="not-a-measure">
            This is not better or worse. Same is not stuck. Different is not improvement.
          </p>

          <div
            v-for="row in comparisonRows"
            :key="row.itemId"
            class="compare-block"
          >
            <h2>{{ row.title }}</h2>
            <p><span class="text-meta">Earlier sitting</span><br>{{ row.earlier }}</p>
            <p><span class="text-meta">This sitting</span><br>{{ row.latest }}</p>
          </div>

          <p>
            <button type="button" class="quiet-btn" @click="onDownload">Download your observation</button>
          </p>
          <p>
            <button type="button" class="quiet-btn quiet-btn--primary" @click="step = 'followed'">
              Optionally look back
            </button>
          </p>
          <p>
            <RouterLink class="text-link" to="/observe">Finished</RouterLink>
          </p>
        </div>

        <div v-else-if="step === 'followed'" class="page-content">
          <header class="page-header">
            <h1>Looking back at the earlier sitting</h1>
          </header>
          <p>
            If you want, you may record what became recognizable afterward. This is not a judgment of that movement. You can skip this.
          </p>
          <p>When you participated again after that, what followed?</p>

          <div
            v-for="row in priorResponses"
            :key="row.itemId"
            class="followed-block"
          >
            <h2>{{ row.title }}</h2>
            <p class="prior-move">You recognized then: <em>{{ row.choiceLabel }}</em></p>
            <fieldset class="choice-set">
              <label
                v-for="choice in followedChoices"
                :key="choice.id"
                class="choice-row"
              >
                <input
                  type="radio"
                  :name="'followed-' + row.itemId"
                  :value="choice.id"
                  v-model="followed[row.itemId].choiceId"
                />
                <span>{{ choice.label }}</span>
              </label>
            </fieldset>
            <textarea
              v-if="followed[row.itemId].choiceId === anotherId"
              v-model="followed[row.itemId].note"
              rows="2"
              maxlength="500"
              placeholder="What followed"
            ></textarea>
          </div>

          <p v-if="followError" class="error-message">{{ followError }}</p>

          <div class="sitting-nav">
            <button type="button" class="quiet-btn" @click="step = 'compare'">Back</button>
            <button type="button" class="quiet-btn" @click="skipFollowed">Skip</button>
            <button type="button" class="quiet-btn quiet-btn--primary" :disabled="savingFollowed" @click="saveFollowed">
              {{ savingFollowed ? 'Saving…' : 'Save look-back' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import ObserveSitting from '@/components/observe/ObserveSitting.vue';
import {
  ANOTHER_CHOICE_ID,
  WHAT_FOLLOWED_CHOICES,
  items,
} from '@/content/instrument/v0.1.js';
import {
  TOKEN_STORAGE_KEY,
  downloadObservation,
  postSession,
} from '@/utils/instrument.js';

const route = useRoute();
const router = useRouter();
const anotherId = ANOTHER_CHOICE_ID;
const followedChoices = WHAT_FOLLOWED_CHOICES;

useHead({
  title: 'Observation — Coherence Across Scales',
  meta: [{ name: 'robots', content: 'noindex' }],
});

const loading = ref(true);
const loadError = ref('');
const submitting = ref(false);
const submitError = ref('');
const savingFollowed = ref(false);
const followError = ref('');
const step = ref('sitting');
const record = ref(null);
const token = computed(() => String(route.params.token || ''));

const followed = reactive({});

function resetFollowed(priorSession) {
  for (const key of Object.keys(followed)) delete followed[key];
  for (const response of priorSession?.responses || []) {
    followed[response.itemId] = { choiceId: '', note: '' };
  }
}

const priorSession = computed(() => {
  const sessions = record.value?.sessions || [];
  if (sessions.length < 2) return sessions[0] || null;
  return sessions[sessions.length - 2];
});

const latestSession = computed(() => {
  const sessions = record.value?.sessions || [];
  return sessions[sessions.length - 1] || null;
});

const priorResponses = computed(() => priorSession.value?.responses || []);

const comparisonRows = computed(() => {
  const earlier = priorSession.value?.responses || [];
  const latest = latestSession.value?.responses || [];
  return items.map((item) => {
    const a = earlier.find((r) => r.itemId === item.id);
    const b = latest.find((r) => r.itemId === item.id);
    return {
      itemId: item.id,
      title: item.title,
      earlier: a?.choiceLabel || '—',
      latest: b?.choiceLabel || '—',
    };
  });
});

watch(priorSession, (session) => {
  if (session) resetFollowed(session);
});

async function loadRecord() {
  loading.value = true;
  loadError.value = '';
  try {
    const res = await fetch(`/api/instrument/session/${encodeURIComponent(token.value)}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      loadError.value = data.error || 'This return code was not found.';
      return;
    }
    record.value = data;
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, token.value);
    } catch {
      /* ignore */
    }
  } catch {
    loadError.value = 'This return code could not be loaded.';
  } finally {
    loading.value = false;
  }
}

onMounted(loadRecord);

function goHome() {
  router.push('/observe');
}

async function onComplete(responses) {
  submitting.value = true;
  submitError.value = '';
  try {
    const data = await postSession(
      `/api/instrument/session/${encodeURIComponent(token.value)}`,
      { responses }
    );
    record.value = data;
    step.value = 'compare';
  } catch (err) {
    submitError.value = err.message;
  } finally {
    submitting.value = false;
  }
}

function onDownload() {
  downloadObservation(token.value, record.value);
}

function skipFollowed() {
  router.push('/observe');
}

async function saveFollowed() {
  followError.value = '';
  const priorId = priorSession.value?.id;
  if (!priorId) {
    followError.value = 'There is no earlier sitting to look back on.';
    return;
  }
  const entries = priorResponses.value
    .filter((row) => followed[row.itemId]?.choiceId)
    .map((row) => ({
      priorSessionId: priorId,
      itemId: row.itemId,
      choiceId: followed[row.itemId].choiceId,
      note: followed[row.itemId].note,
    }));
  if (!entries.length) {
    followError.value = 'Choose at least one look-back, or skip.';
    return;
  }
  for (const entry of entries) {
    if (entry.choiceId === ANOTHER_CHOICE_ID && !String(entry.note || '').trim()) {
      followError.value = 'Please describe what followed, or skip.';
      return;
    }
  }
  savingFollowed.value = true;
  try {
    const data = await postSession(
      `/api/instrument/session/${encodeURIComponent(token.value)}/followed`,
      { entries }
    );
    record.value = data;
    step.value = 'compare';
  } catch (err) {
    followError.value = err.message;
  } finally {
    savingFollowed.value = false;
  }
}
</script>

<style lang="scss" scoped>
.observe-page {
  max-width: 40rem;
}

.return-lead,
.not-a-measure {
  font-style: italic;
  color: var(--text-muted);
  margin-bottom: var(--spacing-lg);
}

.compare-block,
.followed-block {
  margin: var(--spacing-lg) 0;
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border);

  h2 {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: 1.15rem;
  }
}

.prior-move {
  color: var(--text-muted);
}

.choice-set {
  border: 0;
  padding: 0;
  margin: var(--spacing-sm) 0;
}

.choice-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.45rem 0;
  cursor: pointer;
  font-family: var(--font-serif);
}

textarea {
  width: 100%;
  padding: var(--spacing-sm);
  font-family: var(--font-serif);
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  resize: vertical;
}

.sitting-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.error-message {
  font-style: italic;
  color: var(--text-muted);
}

.quiet-btn {
  background: none;
  border: 0;
  padding: 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--text-muted);
  cursor: pointer;

  &:hover:not(:disabled) {
    color: var(--text);
  }

  &--primary {
    color: var(--accent);
  }
}
</style>
