<template>
  <div class="page-content observe-record">
    <header class="page-header">
      <h1 v-if="variant === 'compare'">Same conditions. Recognized movement at two sittings.</h1>
      <h1 v-else>Thank you for the attention you gave this sitting.</h1>
    </header>

    <p v-if="variant === 'compare'" class="text-caption">
      This is not better or worse. Same is not stuck. Different is not improvement.
    </p>

    <section v-if="notes.length" class="observations">
      <article v-for="(note, index) in notes" :key="index" class="block">
        <p class="text-serif is-italic">{{ note.observation }}</p>
        <p class="text-serif">{{ note.evidence }}</p>
        <p class="text-caption">{{ note.provisional }}</p>
      </article>
    </section>

    <div v-for="line in lines" :key="line.itemId" class="block">
      <p class="text-label text-label--sm">{{ line.label }}</p>
      <h2>{{ line.title }}</h2>
      <p v-if="variant === 'compare'" class="text-serif"><span class="text-meta">Earlier sitting</span><br>{{ line.earlier }}</p>
      <p v-if="variant === 'compare'" class="text-serif"><span class="text-meta">This sitting</span><br>{{ line.latest }}</p>
      <p v-else class="text-serif">{{ line.movement }}</p>
    </div>

    <p class="text-caption">This is not a measure of coherence.</p>

    <p class="code">
      Return code: <strong>{{ token }}</strong>
    </p>
    <p class="text-caption">Keep this if you want to return. We will not email it to you.</p>

    <section class="section-foot">
      <h2 class="text-serif">Remind me to return</h2>
      <div class="cluster">
        <button type="button" class="quiet-btn" @click="remind('week')">1 week</button>
        <button type="button" class="quiet-btn" @click="remind('month')">1 month</button>
        <button type="button" class="quiet-btn" @click="remind('quarter')">3 months</button>
      </div>
      <form class="cluster" @submit.prevent="remind('custom')">
        <label class="text-meta" for="return-date">Custom date</label>
        <input id="return-date" class="input" v-model="customDate" type="date" />
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
