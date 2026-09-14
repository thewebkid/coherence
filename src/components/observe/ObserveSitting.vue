<template>
  <div class="observe-sitting">
    <p class="sitting-progress text-meta">{{ currentIndex + 1 }} / {{ items.length }}</p>

    <h2 class="sitting-title">{{ current.title }}</h2>
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

    <div class="sitting-nav">
      <button
        v-if="currentIndex > 0"
        type="button"
        class="quiet-btn"
        @click="currentIndex -= 1"
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
import { computed, reactive, ref, watch } from 'vue';
import {
  ANOTHER_CHOICE_ID,
  items as bankItems,
} from '@/content/instrument/v0.1.js';
import { emptyAnswers, shuffleChoices, answersToResponses } from '@/utils/instrument.js';

const props = defineProps({
  submitting: { type: Boolean, default: false },
});

const emit = defineEmits(['complete', 'cancel']);

const items = bankItems;
const anotherId = ANOTHER_CHOICE_ID;
const currentIndex = ref(0);
const itemError = ref('');
const answers = reactive(emptyAnswers());
const shuffledByItem = reactive({});

const current = computed(() => items[currentIndex.value]);
const displayedChoices = computed(() => shuffledByItem[current.value.id] || current.value.choices);

watch(
  currentIndex,
  (index) => {
    const item = items[index];
    if (item && !shuffledByItem[item.id]) {
      shuffledByItem[item.id] = shuffleChoices(item);
    }
    itemError.value = '';
  },
  { immediate: true }
);

function next() {
  const item = current.value;
  const answer = answers[item.id];
  if (!answer.choiceId) {
    itemError.value = 'Please choose the movement that feels most familiar, or record another.';
    return;
  }
  if (answer.choiceId === ANOTHER_CHOICE_ID && !answer.otherText.trim()) {
    itemError.value = 'Please describe the other movement.';
    return;
  }
  itemError.value = '';
  if (currentIndex.value < items.length - 1) {
    currentIndex.value += 1;
    return;
  }
  emit('complete', answersToResponses(answers));
}
</script>

<style lang="scss" scoped>
.observe-sitting {
  max-width: 40rem;
}

.sitting-progress {
  margin-bottom: var(--spacing-md);
}

.sitting-title {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 1.35rem;
  line-height: 1.4;
  margin-bottom: var(--spacing-md);
}

.sitting-stem,
.sitting-prompt {
  color: var(--text);
  line-height: 1.8;
}

.sitting-prompt {
  font-style: italic;
  color: var(--text-muted);
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
  line-height: 1.5;

  input {
    margin-top: 0.35rem;
    accent-color: var(--accent);
  }

  &.selected span {
    color: var(--text);
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
    font-size: 1rem;
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
  font-size: 1.05rem;
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
