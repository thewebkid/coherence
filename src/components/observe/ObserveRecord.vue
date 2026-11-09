<template>
  <div class="page-content observe-record">
    <header class="page-header">
      <h1 v-if="variant === 'compare'">Same conditions. Recognized movement at two sittings.</h1>
      <h1 v-else>Thank you for the attention you gave this sitting.</h1>
    </header>

    <p v-if="variant === 'compare'" class="quiet-line">
      This is not better or worse. Same is not stuck. Different is not improvement.
    </p>

    <section v-if="notes.length" class="observations">
      <article v-for="(note, index) in notes" :key="index" class="observation">
        <p class="observation-line">{{ note.observation }}</p>
        <p>{{ note.evidence }}</p>
        <p class="provisional">{{ note.provisional }}</p>
      </article>
    </section>

    <div v-for="line in lines" :key="line.itemId" class="record-block">
      <p class="question-label">{{ line.label }}</p>
      <h2>{{ line.title }}</h2>
      <p v-if="variant === 'compare'"><span class="text-meta">Earlier sitting</span><br>{{ line.earlier }}</p>
      <p v-if="variant === 'compare'"><span class="text-meta">This sitting</span><br>{{ line.latest }}</p>
      <p v-else>{{ line.movement }}</p>
    </div>

    <p class="quiet-line">This is not a measure of coherence.</p>

    <p class="return-code">
      Return code: <strong>{{ token }}</strong>
    </p>
    <p class="quiet-line">Keep this if you want to return. We will not email it to you.</p>

    <section class="continuity">
      <h2>Remind me to return</h2>
      <div class="interval-row">
        <button type="button" class="quiet-btn" @click="remind('week')">1 week</button>
        <button type="button" class="quiet-btn" @click="remind('month')">1 month</button>
        <button type="button" class="quiet-btn" @click="remind('quarter')">3 months</button>
      </div>
      <form class="custom-date" @submit.prevent="remind('custom')">
        <label for="return-date">Custom date</label>
        <input id="return-date" v-model="customDate" type="date" />
        <button type="submit" class="quiet-btn" :disabled="!customDate">Download reminder</button>
      </form>

      <p>
        <button type="button" class="quiet-btn" @click="onPdf">Download a readable record (PDF)</button>
      </p>
      <p>
        <button type="button" class="quiet-btn" @click="onJson">Download your data (JSON)</button>
      </p>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { patternObservations } from '@/content/instrument/patternObservations.js';
import {
  bankFor,
  dateFromInterval,
  downloadJson,
  downloadPdf,
  downloadReturnIcs,
  movementText,
  numberedRecord,
} from '@/utils/instrument.js';

const props = defineProps({
  token: { type: String, required: true },
  record: { type: Object, required: true },
  session: { type: Object, required: true },
  priorSession: { type: Object, default: null },
});

const customDate = ref('');
const variant = computed(() => (props.priorSession ? 'compare' : 'record'));
const bank = computed(() => bankFor(props.session.instrumentVersion || props.record.instrumentVersion));

const notes = computed(() => patternObservations(props.session.responses || [], {
  priorResponses: props.priorSession?.responses || null,
}));

const lines = computed(() => {
  const base = numberedRecord(bank.value.items, props.session.responses || []);
  if (!props.priorSession) return base;
  const earlier = props.priorSession.responses || [];
  return base.map((line) => ({
    ...line,
    earlier: movementText(earlier.find((row) => row.itemId === line.itemId)),
    latest: line.movement,
  }));
});

function remind(interval) {
  downloadReturnIcs(props.token, dateFromInterval(interval, customDate.value));
}

function onPdf() {
  downloadPdf(props.token, props.record, notes.value, lines.value.map((line) => ({
    label: line.label,
    title: line.title,
    movement: props.priorSession
      ? `Earlier sitting: ${line.earlier}\nThis sitting: ${line.latest}`
      : line.movement,
  })));
}

function onJson() {
  downloadJson(props.token, props.record);
}
</script>

<style lang="scss" scoped>
.question-label {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: var(--spacing-xs);
}

.quiet-line,
.provisional {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--text-muted);
}

.observation {
  margin: var(--spacing-lg) 0;

  p {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    line-height: 1.6;
  }
}

.observation-line {
  font-style: italic;
}

.record-block {
  margin: var(--spacing-lg) 0;
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border);

  h2 {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: 1.2rem;
    margin-bottom: var(--spacing-xs);
  }

  p {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    line-height: 1.6;
  }
}

.return-code {
  margin-top: var(--spacing-xl);
  font-family: var(--font-sans);

  strong {
    letter-spacing: 0.04em;
  }
}

.continuity {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);

  h2 {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: 1.2rem;
  }
}

.interval-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin: var(--spacing-md) 0;
}

.custom-date {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);

  label {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  input {
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--text);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.35rem 0.5rem;
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

  &:hover:not(:disabled) {
    color: var(--text);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}
</style>
