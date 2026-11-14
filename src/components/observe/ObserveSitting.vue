<template>
  <div ref="root" class="scroll-start">
    <p class="text-label text-label--sm">Question {{ currentIndex + 1 }}/{{ items.length }}</p>
    <p class="text-serif">{{ current.stem }}</p>
    <p class="text-caption">{{ current.prompt }}</p>

    <fieldset class="option-list">
      <legend class="visually-hidden">{{ current.prompt }}</legend>
      <label
        v-for="choice in displayedChoices"
        :key="choice.id"
        class="option"
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

    <div v-if="answers[current.id].choiceId === anotherId" class="field">
      <label class="field-label" :for="'other-' + current.id">The movement you recognize</label>
      <textarea
        class="field-control"
        :id="'other-' + current.id"
        v-model="answers[current.id].otherText"
        rows="3"
        maxlength="500"
      ></textarea>
    </div>

    <p v-if="itemError" class="text-note">{{ itemError }}</p>

    <div v-if="offeringPause">
      <p class="text-caption">You can continue now, or pause here and return later.</p>
      <div class="action-row">
        <button type="button" class="quiet-btn" :disabled="submitting" @click="pauseHere">
          {{ submitting ? 'Saving…' : 'Pause here' }}
        </button>
        <button type="button" class="quiet-btn" :disabled="submitting" @click="continueNow">
          Continue now
        </button>
      </div>
    </div>

    <div v-else class="action-row">
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
        class="quiet-btn"
        :disabled="submitting"
        @click="next"
      >
        {{ currentIndex < items.length - 1 ? 'Continue' : (submitting ? 'Saving…' : 'Finish sitting') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
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

async function revealQuestion() {
  await nextTick();
  root.value?.scrollIntoView({ block: 'start' });
}

onMounted(revealQuestion);

watch(currentIndex, async (index, previous) => {
  if (previous == null || index === previous) return;
  await revealQuestion();
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
