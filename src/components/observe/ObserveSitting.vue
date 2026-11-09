<template>
  <div ref="root" class="observe-sitting">
    <p class="question-label">Question {{ currentIndex + 1 }}/{{ items.length }}</p>
    <p class="sitting-stem">{{ current.stem }}</p>
    <p class="sitting-prompt">{{ current.prompt }}</p>

    <fieldset class="choice-set">
      <legend class="visually-hidden">{{ current.prompt }}</legend>
      <label
        v-for="choice in displayedChoices"
        :key="choice.id"
        class="choice-row"
        :class="{ selected: answers[current.id].choiceId === choice.id }"
      >
        <input
          type="radio"
          :name="current.id"
          :value="choice.id"
          v-model="answers[current.id].choiceId"
        />
        <span>{{ choice.label }}</span>
      </label>
    </fieldset>

    <div v-if="answers[current.id].choiceId === anotherId" class="other-field">
      <label :for="'other-' + current.id">The movement you recognize</label>
      <textarea
        :id="'other-' + current.id"
        v-model="answers[current.id].otherText"
        rows="3"
        maxlength="500"
      ></textarea>
    </div>

    <p v-if="itemError" class="error-message">{{ itemError }}</p>

    <div v-if="offeringPause" class="pause-offer">
      <p>You can continue now, or pause here and return later.</p>
      <div class="sitting-nav">
        <button type="button" class="quiet-btn" :disabled="submitting" @click="pauseHere">
          {{ submitting ? 'Saving…' : 'Pause here' }}
        </button>
        <button type="button" class="quiet-btn quiet-btn--primary" :disabled="submitting" @click="continueNow">
          Continue now
        </button>
      </div>
    </div>

    <div v-else class="sitting-nav">
      <button
        v-if="currentIndex > 0"
        type="button"
        class="quiet-btn"
        @click="goPrevious"
      >
        Previous
      </button>
      <button
        v-else
        type="button"
        class="quiet-btn"
        @click="$emit('cancel')"
      >
        Back
      </button>
      <button
        type="button"
        class="quiet-btn quiet-btn--primary"
        :disabled="submitting"
        @click="next"
      >
        {{ currentIndex < items.length - 1 ? 'Continue' : (submitting ? 'Saving…' : 'Finish sitting') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue';
import {
  answersToResponses,
  bankFor,
  draftKey,
  emptyAnswers,
  shuffleChoices,
} from '@/utils/instrument.js';

const props = defineProps({
  submitting: { type: Boolean, default: false },
  version: { type: String, default: 'v0.1.1' },
  initialAnswers: { type: Object, default: null },
  startIndex: { type: Number, default: 0 },
  draftScope: { type: String, default: 'new' },
});

const emit = defineEmits(['complete', 'pause', 'cancel']);

const bank = computed(() => bankFor(props.version));
const items = computed(() => bank.value.items);
const anotherId = computed(() => bank.value.ANOTHER_CHOICE_ID);
const currentIndex = ref(props.startIndex || 0);
const itemError = ref('');
const offeringPause = ref(false);
const root = ref(null);
const answers = reactive(emptyAnswers(bank.value.items));
const shuffledByItem = reactive({});

if (props.initialAnswers) {
  for (const item of bank.value.items) {
    const saved = props.initialAnswers[item.id];
    if (saved?.choiceId) answers[item.id] = { choiceId: saved.choiceId, otherText: saved.otherText || '' };
  }
} else {
  try {
    const saved = JSON.parse(localStorage.getItem(draftKey(props.draftScope)) || 'null');
    if (saved?.version === props.version && saved.answers) {
      for (const item of bank.value.items) {
        const row = saved.answers[item.id];
        if (row?.choiceId) answers[item.id] = { choiceId: row.choiceId, otherText: row.otherText || '' };
      }
      if (Number.isInteger(saved.index)) currentIndex.value = saved.index;
    }
  } catch {
    /* ignore */
  }
}

const current = computed(() => items.value[currentIndex.value]);
const displayedChoices = computed(() => shuffledByItem[current.value.id] || current.value.choices);

watch(
  currentIndex,
  (index) => {
    const item = items.value[index];
    if (item && !shuffledByItem[item.id]) {
      shuffledByItem[item.id] = shuffleChoices(item, bank.value);
    }
    itemError.value = '';
    offeringPause.value = false;
  },
  { immediate: true }
);

watch(currentIndex, async (index, previous) => {
  if (previous == null || index === previous) return;
  await nextTick();
  root.value?.scrollIntoView({ block: 'start' });
});

watch(answers, () => {
  try {
    localStorage.setItem(draftKey(props.draftScope), JSON.stringify({
      version: props.version,
      index: currentIndex.value,
      answers,
    }));
  } catch {
    /* ignore */
  }
}, { deep: true });

function answerIsValid(item) {
  const answer = answers[item.id];
  if (!answer.choiceId) {
    itemError.value = 'Please choose the movement that feels most familiar, pass over it if you cannot recall a recent situation, or record another.';
    return false;
  }
  if (answer.choiceId === anotherId.value && !answer.otherText.trim()) {
    itemError.value = 'Please describe the other movement.';
    return false;
  }
  itemError.value = '';
  return true;
}

function goPrevious() {
  if (currentIndex.value > 0) currentIndex.value -= 1;
}

function next() {
  const item = current.value;
  if (!answerIsValid(item)) return;
  if (currentIndex.value === 8 && items.value.length > 9) {
    offeringPause.value = true;
    return;
  }
  if (currentIndex.value < items.value.length - 1) {
    currentIndex.value += 1;
    return;
  }
  emit('complete', answersToResponses(items.value, answers));
}

function continueNow() {
  offeringPause.value = false;
  if (currentIndex.value < items.value.length - 1) currentIndex.value += 1;
}

function pauseHere() {
  // Pausing after item 9 splits the temporal locality of items 10–18.
  // The pause is a hypothesis under test, not methodologically neutral.
  const item = current.value;
  if (!answerIsValid(item)) return;
  emit('pause', answersToResponses(items.value, answers, { partial: true }));
}
</script>

<style lang="scss" scoped>
.observe-sitting {
  max-width: 40rem;
}

.question-label {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.sitting-stem {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text);
}

.sitting-prompt {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.choice-set {
  border: 0;
  padding: 0;
  margin: 0 0 var(--spacing-lg);
}

.choice-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  line-height: 1.5;

  input {
    margin-top: 0.35rem;
    accent-color: var(--accent);
  }
}

.other-field {
  margin-bottom: var(--spacing-lg);

  label {
    display: block;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: var(--spacing-xs);
  }

  textarea {
    width: 100%;
    padding: var(--spacing-sm);
    font-family: var(--font-serif);
    font-size: 1.2rem;
    color: var(--text);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    resize: vertical;

    &:focus {
      outline: none;
      border-color: var(--accent);
    }
  }
}

.pause-offer p {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--text-muted);
}

.error-message {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: var(--spacing-md);
}

.sitting-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
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
    cursor: wait;
    opacity: 0.6;
  }

  &--primary {
    color: var(--accent);
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
