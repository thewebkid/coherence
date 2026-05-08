<template>
  <div class="signal-form">
    <div v-if="!submitted" class="form-container">
      <form @submit.prevent="handleSubmit" novalidate>

        <div class="form-field" :class="{ 'has-error': errors.signal }">
          <label for="signal-input">
            Signal <span class="required">*</span>
          </label>
          <p class="field-hint">(a word or short phrase)</p>
          <input
            id="signal-input"
            v-model="formData.signal"
            type="text"
            placeholder="e.g., steady, open, shifting"
            maxlength="60"
            :disabled="loading"
            autocomplete="off"
          />
          <span v-if="errors.signal" class="error-message">{{ errors.signal }}</span>
        </div>

        <div class="form-field" :class="{ 'has-error': errors.reflection }">
          <label for="reflection-input">
            Reflection <span class="required">*</span>
          </label>
          <p class="field-hint">What did you notice? ({{ charCount }}/140)</p>
          <textarea
            id="reflection-input"
            v-model="formData.reflection"
            placeholder="One sentence about what you noticed"
            rows="3"
            maxlength="140"
            :disabled="loading"
          ></textarea>
          <span v-if="errors.reflection" class="error-message">{{ errors.reflection }}</span>
        </div>

        <div class="form-field optional-fields">
          <button
            type="button"
            class="optional-toggle"
            @click="showOptional = !showOptional"
          >
            {{ showOptional ? '− Hide' : '+ Add' }} optional context
          </button>

          <div v-if="showOptional" class="optional-content">
            <div class="form-field">
              <label for="context-input">Context</label>
              <p class="field-hint">Where did this occur? (optional)</p>
              <input
                id="context-input"
                v-model="formData.context"
                type="text"
                placeholder="e.g., work meeting, family conversation, public space"
                :disabled="loading"
              />
            </div>

            <div class="form-field">
              <label for="geography-input">Geography</label>
              <p class="field-hint">City/country or leave blank</p>
              <input
                id="geography-input"
                v-model="formData.geography"
                type="text"
                placeholder="e.g., New York, France"
                :disabled="loading"
              />
            </div>
          </div>
        </div>

        <div aria-hidden="true" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden">
          <label for="website-signal">Website</label>
          <input id="website-signal" v-model="formData.website" type="text" name="website" tabindex="-1" autocomplete="off" />
        </div>

        <div v-if="submitError" class="error-banner">{{ submitError }}</div>

        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? 'Submitting…' : 'Submit anonymously' }}
        </button>

        <p class="anon-note">All submissions are anonymous.</p>
      </form>
    </div>

    <div v-else class="confirmation">
      <div class="confirmation-icon">✓</div>
      <p>Your observation has been received.</p>
      <p class="confirmation-note">Thank you for contributing to the shared field.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const props = defineProps({
  project: {
    type: String,
    required: true,
  },
});

const showOptional = ref(false);
const loading = ref(false);
const submitted = ref(false);
const submitError = ref('');

const formData = reactive({ signal: '', reflection: '', context: '', geography: '', website: '' });
const errors = reactive({ signal: '', reflection: '' });

const charCount = computed(() => formData.reflection.length);

function validate() {
  errors.signal = '';
  errors.reflection = '';
  let ok = true;

  if (!formData.signal.trim()) {
    errors.signal = 'Signal is required.';
    ok = false;
  }
  if (!formData.reflection.trim()) {
    errors.reflection = 'Reflection is required.';
    ok = false;
  } else if (formData.reflection.length > 140) {
    errors.reflection = 'Reflection must be 140 characters or fewer.';
    ok = false;
  }
  return ok;
}

async function handleSubmit() {
  if (!validate()) return;

  loading.value = true;
  submitError.value = '';

  try {
    const res = await fetch('/api/submit-observation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project: props.project,
        signal: formData.signal.trim(),
        reflection: formData.reflection.trim(),
        context: formData.context.trim() || null,
        geography: formData.geography.trim() || null,
        website: formData.website,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Submission failed.');
    }

    submitted.value = true;
  } catch (e) {
    submitError.value = e.message || 'An error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.signal-form {
  margin-top: var(--spacing-xl);
}

.form-container {
  max-width: 560px;
}

.form-field {
  margin-bottom: var(--spacing-lg);

  &.has-error {
    label { color: var(--error, #c0392b); }
    input, textarea { border-color: var(--error, #c0392b); }
  }
}

label {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 2px;

  .required { color: var(--accent); }
}

.field-hint {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0 0 var(--spacing-xs);
}

input, textarea {
  width: 100%;
  padding: var(--spacing-sm);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: border-color var(--transition-speed) ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &::placeholder { color: var(--text-muted); opacity: 0.6; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

textarea { resize: vertical; line-height: 1.6; }

.optional-toggle {
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover { color: var(--text); }
}

.optional-content {
  margin-top: var(--spacing-md);
}

.error-message {
  display: block;
  margin-top: var(--spacing-xs);
  font-size: 0.8125rem;
  color: var(--error, #c0392b);
}

.error-banner {
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-md);
  background: rgba(192, 57, 43, 0.08);
  border: 1px solid var(--error, #c0392b);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--error, #c0392b);
}

.submit-button {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--bg);
  background: var(--accent);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color var(--transition-speed) ease;
  margin-bottom: var(--spacing-sm);

  &:hover:not(:disabled) { filter: brightness(1.1); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.anon-note {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  text-align: center;
  margin: 0;
}

.confirmation {
  max-width: 480px;
  padding: var(--spacing-xl);
  text-align: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);

  p {
    margin-bottom: var(--spacing-sm);
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text);
    &:last-child { margin-bottom: 0; }
  }
}

.confirmation-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: var(--spacing-md);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--bg);
  background: var(--accent);
  border-radius: 50%;
}

.confirmation-note {
  font-style: italic;
  font-size: 0.875rem;
  color: var(--text-muted);
}
</style>
