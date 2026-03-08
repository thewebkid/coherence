<template>
  <div class="observation-form">
    <div v-if="!submitted" class="form-container">
      <div class="form-header">
        <p class="project-context">Project context: {{ project }}</p>
        <p class="optional-note">Most fields are optional. Share what feels relevant.</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-field" :class="{ 'has-error': errors.context }">
          <label for="context">
            Where did this occur? <span class="required">*</span>
          </label>
          <input
            id="context"
            v-model="formData.context"
            type="text"
            placeholder="e.g., a work meeting, a family dinner, a public transit station"
            :disabled="loading"
          />
          <span v-if="errors.context" class="error-message">{{ errors.context }}</span>
        </div>

        <div class="form-field" :class="{ 'has-error': errors.whatShifted }">
          <label for="what-shifted">
            What shifted? <span class="required">*</span>
          </label>
          <textarea
            id="what-shifted"
            v-model="formData.whatShifted"
            placeholder="Describe what changed — in yourself, in the other person, in the relational field"
            rows="4"
            :disabled="loading"
          ></textarea>
          <span v-if="errors.whatShifted" class="error-message">{{ errors.whatShifted }}</span>
        </div>

        <div class="form-field">
          <label for="what-did-not-shift">
            What did not shift?
          </label>
          <textarea
            id="what-did-not-shift"
            v-model="formData.whatDidNotShift"
            placeholder="What remained unchanged or resistant"
            rows="3"
            :disabled="loading"
          ></textarea>
        </div>

        <div class="form-field">
          <label for="where-coherent">
            Where did it feel coherent?
          </label>
          <textarea
            id="where-coherent"
            v-model="formData.whereCoherent"
            placeholder="Moments where things felt stable, clear, or aligned"
            rows="3"
            :disabled="loading"
          ></textarea>
        </div>

        <div class="form-field">
          <label for="where-resistant">
            Where did it feel resistant or unclear?
          </label>
          <textarea
            id="where-resistant"
            v-model="formData.whereResistant"
            placeholder="Moments of confusion, friction, or structural instability"
            rows="3"
            :disabled="loading"
          ></textarea>
        </div>

        <div class="form-field">
          <label for="notes">
            Additional notes
          </label>
          <textarea
            id="notes"
            v-model="formData.notes"
            placeholder="Anything else you noticed"
            rows="3"
            :disabled="loading"
          ></textarea>
        </div>

        <div class="form-field">
          <label for="geography">
            Geography
          </label>
          <input
            id="geography"
            v-model="formData.geography"
            type="text"
            placeholder="city/country or leave blank"
            :disabled="loading"
          />
        </div>

        <div v-if="submitError" class="error-banner">
          {{ submitError }}
        </div>

        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? 'Submitting...' : 'Submit anonymously' }}
        </button>
      </form>
    </div>

    <div v-else class="confirmation">
      <div class="confirmation-icon">✓</div>
      <p>Your observation has been received.</p>
      <p class="confirmation-note">Thank you for contributing to the shared field of practice.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  project: {
    type: String,
    required: true,
    validator: (value) => ['Observation', 'Behavioral Ecology', 'Conversational Recursion'].includes(value)
  }
});

const formData = reactive({
  context: '',
  whatShifted: '',
  whatDidNotShift: '',
  whereCoherent: '',
  whereResistant: '',
  notes: '',
  geography: ''
});

const errors = reactive({
  context: '',
  whatShifted: ''
});

const loading = ref(false);
const submitted = ref(false);
const submitError = ref('');

const validateForm = () => {
  let isValid = true;
  
  errors.context = '';
  errors.whatShifted = '';
  
  if (!formData.context.trim()) {
    errors.context = 'This field is required';
    isValid = false;
  }
  
  if (!formData.whatShifted.trim()) {
    errors.whatShifted = 'This field is required';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  submitError.value = '';
  
  try {
    const response = await fetch('/api/submit-observation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        project: props.project,
        context: formData.context,
        whatShifted: formData.whatShifted,
        whatDidNotShift: formData.whatDidNotShift || null,
        whereCoherent: formData.whereCoherent || null,
        whereResistant: formData.whereResistant || null,
        notes: formData.notes || null,
        geography: formData.geography || null
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to submit observation');
    }
    
    submitted.value = true;
  } catch (error) {
    console.error('Submission error:', error);
    submitError.value = error.message || 'An error occurred while submitting your observation. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.observation-form {
  margin-top: var(--spacing-lg);
}

.form-container {
  max-width: 640px;
  margin: 0 auto;
}

.form-header {
  margin-bottom: var(--spacing-lg);
}

.project-context {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin: 0 0 var(--spacing-xs) 0;
}

.optional-note {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

.form-field {
  margin-bottom: var(--spacing-lg);
  
  &.has-error {
    label {
      color: var(--error, #d32f2f);
    }
    
    input,
    textarea {
      border-color: var(--error, #d32f2f);
    }
  }
}

label {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: var(--spacing-xs);
  
  .required {
    color: var(--accent);
  }
}

input,
textarea {
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
  
  &::placeholder {
    color: var(--text-muted);
    opacity: 0.6;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

textarea {
  resize: vertical;
  line-height: 1.6;
}

.error-message {
  display: block;
  margin-top: var(--spacing-xs);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--error, #d32f2f);
}

.error-banner {
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-md);
  background: rgba(211, 47, 47, 0.1);
  border: 1px solid var(--error, #d32f2f);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--error, #d32f2f);
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
  
  &:hover:not(:disabled) {
    background: var(--accent-hover, var(--accent));
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.confirmation {
  max-width: 640px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  text-align: center;
  background: var(--bg-secondary);
  border: 2px solid var(--accent);
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  
  p {
    margin-bottom: var(--spacing-sm);
    font-size: 1.0625rem;
    line-height: 1.7;
    color: var(--text);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.confirmation-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: var(--spacing-md);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--bg);
  background: var(--accent);
  border: 2px solid var(--accent);
  border-radius: 50%;
}

.confirmation-note {
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--text-muted);
}
</style>
