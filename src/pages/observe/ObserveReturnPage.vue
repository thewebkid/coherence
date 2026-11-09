<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container observe-page">
        <p v-if="loadError" class="page-content">{{ loadError }}</p>

        <p v-else-if="loading" class="text-meta">Loading…</p>

        <div v-else-if="step === 'sitting'">
          <p v-if="!resuming" class="return-lead">The same conditions. Recognize what is familiar now.</p>
          <p v-if="submitError" class="error-message">{{ submitError }}</p>
          <ObserveSitting
            :key="sittingKey"
            :submitting="submitting"
            :version="sittingVersion"
            :initial-answers="resumeAnswers"
            :start-index="resumeIndex"
            :draft-scope="token"
            @complete="onComplete"
            @pause="onPause"
            @cancel="goHome"
          />
        </div>

        <div v-else-if="step === 'paused'" class="page-content">
          <header class="page-header">
            <h1>Your place is saved</h1>
          </header>
          <p>Questions through 9 are kept. You can continue from question 10.</p>
          <p>
            <button type="button" class="quiet-btn quiet-btn--primary" @click="prepareSitting(record)">Continue this sitting</button>
          </p>
        </div>

        <ObserveRecord
          v-else-if="step === 'record' && focusSession"
          :token="token"
          :record="record"
          :session="focusSession"
        />

        <div v-else-if="step === 'compare' && focusSession && priorSession">
          <ObserveRecord
            :token="token"
            :record="record"
            :session="focusSession"
            :prior-session="priorSession"
          />
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
import ObserveRecord from '@/components/observe/ObserveRecord.vue';
import {
  TOKEN_STORAGE_KEY,
  answersFromResponses,
  bankFor,
  clearDraft,
  firstUnansweredIndex,
  postSession,
} from '@/utils/instrument.js';

const route = useRoute();
const router = useRouter();
const anotherId = 'another';

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
const sittingVersion = ref('v0.1.1');
const resumeAnswers = ref(null);
const resumeIndex = ref(0);
const resuming = ref(false);
const sittingKey = ref(0);

const followed = reactive({});

function resetFollowed(priorSession) {
  for (const key of Object.keys(followed)) delete followed[key];
  for (const response of priorSession?.responses || []) {
    followed[response.itemId] = { choiceId: '', note: '' };
  }
}

const completedSessions = computed(() => (record.value?.sessions || []).filter((session) => session.completedAt));

const focusSession = computed(() => completedSessions.value[completedSessions.value.length - 1] || null);

const priorSession = computed(() => {
  const sessions = completedSessions.value;
  if (sessions.length < 2) return null;
  return sessions[sessions.length - 2];
});

const priorResponses = computed(() => priorSession.value?.responses || []);

const followedChoices = computed(() => {
  const version = priorSession.value?.instrumentVersion || record.value?.instrumentVersion;
  return bankFor(version).WHAT_FOLLOWED_CHOICES;
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
    prepareSitting(data);
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

function prepareSitting(data) {
  const sessions = data?.sessions || [];
  const open = [...sessions].reverse().find((session) => !session.completedAt);
  const version = open?.instrumentVersion || data?.instrumentVersion || 'v0.1.1';
  sittingVersion.value = version;
  if (open) {
    const bank = bankFor(version);
    resumeAnswers.value = answersFromResponses(bank.items, open.responses);
    resumeIndex.value = firstUnansweredIndex(bank.items, resumeAnswers.value);
    resuming.value = true;
  } else {
    resumeAnswers.value = null;
    resumeIndex.value = 0;
    resuming.value = false;
  }
  sittingKey.value += 1;
  step.value = 'sitting';
}

async function onComplete(responses) {
  submitting.value = true;
  submitError.value = '';
  try {
    const data = await postSession(
      `/api/instrument/session/${encodeURIComponent(token.value)}`,
      { responses, complete: true }
    );
    record.value = data;
    clearDraft(token.value);
    const finished = (data.sessions || []).filter((session) => session.completedAt);
    step.value = finished.length >= 2 ? 'compare' : 'record';
  } catch (err) {
    submitError.value = err.message;
  } finally {
    submitting.value = false;
  }
}

async function onPause(responses) {
  submitting.value = true;
  submitError.value = '';
  try {
    const data = await postSession(
      `/api/instrument/session/${encodeURIComponent(token.value)}`,
      { responses, complete: false }
    );
    record.value = data;
    clearDraft(token.value);
    step.value = 'paused';
  } catch (err) {
    submitError.value = err.message;
  } finally {
    submitting.value = false;
  }
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
    if (entry.choiceId === anotherId && !String(entry.note || '').trim()) {
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
    font-size: 1.2rem;
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
  font-size: 1.2rem;
}

textarea {
  width: 100%;
  padding: var(--spacing-sm);
  font-family: var(--font-serif);
  font-size: 1.2rem;
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
  font-size: 1.2rem;
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
