<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container observe-page">
        <div v-if="step === 'orientation'" class="page-content">
          <RouterLink class="back-link" to="/mutual-assistance">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to Mutual Assistance
          </RouterLink>
          <header class="page-header">
            <h1>Before You Begin</h1>
          </header>

          <p v-if="storedToken" class="return-hint">
            A return code is saved on this device.
            <RouterLink class="text-link" :to="'/observe/r/' + storedToken">Continue from that sitting</RouterLink>
          </p>

          <p>This is an observational instrument for noticing how you tend to move under different relational conditions.</p>

          <p>You will be asked to recall recent situations and recognize the movement that feels most familiar in each one. The purpose is not to determine what you should have done. It is to provide a structured way to observe your own patterns of participation.</p>

          <p>You may recognize movements you already know well. You may encounter language for movements you have not previously named. Neither is considered better.</p>

          <p>At the end, you will receive a private record of what you recognized during this sitting.</p>

          <p>If you choose to return at another time, you can place observations made under the same conditions beside one another. What remains familiar and what differs can then be seen without treating sameness as being stuck or difference as improvement.</p>

          <p>This is an observational instrument, not a test.</p>

          <p>It does not measure whether you are coherent, well, or good at participating. The choices are not ranked. Each may be an appropriate movement under some real conditions.</p>

          <p>Choose what you recognize as familiar—not what you wish had happened, what seems most desirable, or what you think you should do next time.</p>

          <p>If none of the choices fits, you can record another movement.</p>

          <p>If you cannot recall a recent situation like one of these, you can pass over that question, and after the ninth question you may pause and continue later with your return code.</p>

          <p>Your observation is private. At the end you will receive a return code. Keep it if you want to return. Returning does not enroll you in research.</p>

          <p>This sitting itself may affect what you notice afterward. That is part of observation, not a result that CAS interprets for you.</p>

          <section class="pma-section">
            <h2>About the Practice of Mutual Assistance</h2>
            <p>This instrument grew from The Practice of Mutual Assistance, an exploration of how differentiated participants can become useful to one another while preserving sovereignty, discernment, and responsibility.</p>
            <p>You do not need to know or practice Mutual Assistance to use this instrument.</p>
            <p>
              If you would like more context, a brief invitation is available in
              <RouterLink class="text-link" to="/mutual-assistance/booklet">The Practice of Mutual Assistance (Booklet)</RouterLink>,
              and the full manuscript is available as
              <RouterLink class="text-link" to="/mutual-assistance/manuscript">The Practice of Mutual Assistance</RouterLink>.
            </p>
          </section>

          <p class="begin-wrap">
            <button type="button" class="quiet-btn quiet-btn--primary" @click="step = 'sitting'">
              Begin Observation
            </button>
            <RouterLink class="quick-start-link text-link" to="/mutual-assistance/mci/quick-start">MCI Quick Start</RouterLink>
          </p>
        </div>

        <div v-else-if="step === 'sitting'">
          <p v-if="submitError" class="submit-error">{{ submitError }}</p>
          <ObserveSitting
            :submitting="submitting"
            version="v0.1.1"
            draft-scope="new"
            @complete="onComplete"
            @pause="onPause"
            @cancel="step = 'orientation'"
          />
        </div>

        <div v-else-if="step === 'paused'" class="page-content">
          <header class="page-header">
            <h1>Your place is saved</h1>
          </header>
          <p>Questions through 9 are kept. You can continue from question 10.</p>
          <p class="return-code">Return code: <strong>{{ token }}</strong></p>
          <p>
            <RouterLink class="text-link" :to="'/observe/r/' + token">Continue this sitting</RouterLink>
          </p>
        </div>

        <ObserveRecord
          v-else-if="step === 'record' && focusSession"
          :token="token"
          :record="record"
          :session="focusSession"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useHead } from '@unhead/vue';
import ObserveSitting from '@/components/observe/ObserveSitting.vue';
import ObserveRecord from '@/components/observe/ObserveRecord.vue';
import {
  TOKEN_STORAGE_KEY,
  clearDraft,
  postSession,
} from '@/utils/instrument.js';

useHead({
  title: 'Observation — Coherence Across Scales',
  meta: [
    { name: 'robots', content: 'noindex' },
    { name: 'description', content: 'A private observational instrument for noticing recognized movement under relational conditions.' },
  ],
});

const step = ref('orientation');
const submitting = ref(false);
const submitError = ref('');
const token = ref('');
const record = ref(null);
const storedToken = ref('');

const focusSession = computed(() => {
  const sessions = record.value?.sessions || [];
  return [...sessions].reverse().find((session) => session.completedAt) || sessions[sessions.length - 1] || null;
});

onMounted(() => {
  try {
    storedToken.value = localStorage.getItem(TOKEN_STORAGE_KEY) || '';
  } catch {
    storedToken.value = '';
  }
});

function rememberToken(value) {
  token.value = value;
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
  clearDraft('new');
}

async function onComplete(responses) {
  submitting.value = true;
  submitError.value = '';
  try {
    const data = await postSession('/api/instrument/session', { responses, complete: true });
    record.value = data;
    rememberToken(data.token);
    step.value = 'record';
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
    const data = await postSession('/api/instrument/session', { responses, complete: false });
    record.value = data;
    rememberToken(data.token);
    step.value = 'paused';
  } catch (err) {
    submitError.value = err.message;
  } finally {
    submitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
.observe-page {
  max-width: 40rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: var(--spacing-lg);
  transition: color var(--transition-speed) ease;

  &:hover {
    color: var(--accent);
  }
}

.quick-start-link {
  margin-left: var(--spacing-lg);
  font-size: 0.875rem;
}

.page-content p {
  line-height: 1.8;
}

.pma-section {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);

  h2 {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: 1.25rem;
  }
}

.submit-error {
  font-style: italic;
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.begin-wrap {
  margin-top: var(--spacing-xl);
}

.return-hint {
  font-style: italic;
  color: var(--text-muted);
}

.not-a-measure,
.outside-note {
  font-style: italic;
  color: var(--text-muted);
}

.record-block {
  margin: var(--spacing-lg) 0;
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border);

  h2 {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: 1.15rem;
    margin-bottom: var(--spacing-xs);
  }
}

.return-code {
  margin-top: var(--spacing-xl);
  font-family: var(--font-sans);

  strong {
    letter-spacing: 0.04em;
  }
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

  &:hover {
    color: var(--text);
  }

  &--primary {
    color: var(--accent);
  }
}
</style>
