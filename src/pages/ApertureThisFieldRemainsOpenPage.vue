<template>
  <div class="aperture-page page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <RouterLink to="/interpretive-works/continuation" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          If something remains open…
        </RouterLink>

        <article class="aperture-body">
          <h1 class="aperture-title">This field remains open</h1>

          <div class="aperture-prose">
            <p>Not to respond—<br>but to participate.</p>
          </div>

          <hr class="aperture-rule" />

          <div class="aperture-prose">
            <p>What you experienced is not separate<br>from what you are.</p>
            <p>And what you are<br>is not separate from what continues.</p>
          </div>

          <hr class="aperture-rule" />

          <div class="aperture-prose">
            <p>If something moved—<br>it can move further.</p>
            <p>Not by effort.</p>
            <p>By expression.</p>
          </div>

          <hr class="aperture-rule" />

          <div v-if="!submitted" class="submission-form-wrap">
            <form class="submission-form" @submit.prevent="handleSubmit">
              <div class="form-field">
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Name"
                  autocomplete="name"
                  :disabled="submitting"
                />
              </div>
              <div class="form-field">
                <input
                  v-model="form.location"
                  type="text"
                  placeholder="Location"
                  autocomplete="off"
                  :disabled="submitting"
                />
              </div>
              <div class="form-field">
                <input
                  v-model="form.formOfExpression"
                  type="text"
                  placeholder="Form of expression"
                  autocomplete="off"
                  :disabled="submitting"
                />
              </div>
              <div class="form-field">
                <select v-model="form.movementNumber" :disabled="submitting" class="movement-select">
                  <option value="">Which movement, if any…</option>
                  <option v-for="m in movements" :key="m.value" :value="m.value">{{ m.label }}</option>
                </select>
              </div>
              <div class="form-field">
                <textarea
                  v-model="form.submission"
                  rows="6"
                  placeholder="What moves through you…"
                  :disabled="submitting"
                />
              </div>
              <div class="form-field">
                <label class="file-label">
                  <input type="file" :disabled="submitting" @change="onFileChange" />
                  <span class="file-text">{{ fileName || 'Attach a file' }}</span>
                </label>
              </div>
              <div aria-hidden="true" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden">
                <label for="website-field">Website</label>
                <input id="website-field" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" />
              </div>
              <p v-if="submitError" class="submit-error">{{ submitError }}</p>
              <button type="submit" class="submit-btn" :disabled="submitting">
                {{ submitting ? 'Sending…' : 'Submit' }}
              </button>
            </form>
          </div>

          <div v-else class="submission-received">
            <p>Received. Thank you for participating.</p>
          </div>

          <hr class="aperture-rule" />

          <div class="aperture-prose">
            <p>There is no expectation here.</p>
            <p>No requirement to contribute.</p>
            <p>No correct form of response.</p>
          </div>

          <hr class="aperture-rule" />

          <div class="aperture-prose">
            <p>Only this:</p>
            <p>If the field continues through you,<br>it is already part of what this is.</p>
          </div>

          <hr class="aperture-rule" />

          <nav class="aperture-crosslinks" aria-label="Other continuation pages">
            <RouterLink to="/interpretive-works/listen" class="crosslink">Listen</RouterLink>
            <RouterLink to="/interpretive-works/in-image" class="crosslink">In image</RouterLink>
          </nav>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useHead } from '@unhead/vue';

useHead({ title: 'This Field Remains Open — Seven Movements — Coherence Across Scales' });

const submitted = ref(false);
const submitting = ref(false);
const submitError = ref('');
const fileName = ref('');

const movements = [
  { value: 'I', label: 'Movement I' },
  { value: 'II', label: 'Movement II' },
  { value: 'III', label: 'Movement III' },
  { value: 'IV', label: 'Movement IV' },
  { value: 'V', label: 'Movement V' },
  { value: 'VI', label: 'Movement VI' },
  { value: 'VII', label: 'Movement VII' },
];

const form = reactive({
  name: '',
  location: '',
  formOfExpression: '',
  movementNumber: '',
  submission: '',
  file: null,
  website: '',
});

function onFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    form.file = file;
    fileName.value = file.name;
  }
}

async function handleSubmit() {
  submitError.value = '';

  const hasText = form.name.trim() || form.location.trim() || form.formOfExpression.trim() || form.submission.trim();
  if (!hasText && !form.file) {
    submitError.value = 'Please share at least one field.';
    return;
  }

  submitting.value = true;
  try {
    const data = new FormData();
    if (form.name) data.append('name', form.name);
    if (form.location) data.append('location', form.location);
    if (form.formOfExpression) data.append('formOfExpression', form.formOfExpression);
    if (form.movementNumber) data.append('movementNumber', form.movementNumber);
    if (form.submission) data.append('submission', form.submission);
    if (form.file) data.append('file', form.file);
    data.append('website', form.website);

    const res = await fetch('/api/field-submission', { method: 'POST', body: data });
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      submitError.value = json.error || 'Something went wrong. Please try again.';
      return;
    }

    submitted.value = true;
  } catch {
    submitError.value = 'Something went wrong. Please try again.';
  } finally {
    submitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
.aperture-page {
  background-color: var(--iw-bg);
  min-height: 100vh;
  padding: var(--spacing-lg) 0 var(--spacing-section);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: var(--spacing-xl);
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--iw-accent); }
}

.aperture-body {
  max-width: var(--content-width);
}

.aperture-title {
  font-family: var(--font-serif);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 400;
  font-style: italic;
  color: var(--iw-accent);
  margin-bottom: var(--spacing-xl);
}

.aperture-prose {
  p {
    font-family: var(--font-sans);
    font-size: 1.0625rem;
    line-height: 1.85;
    color: var(--text-muted);
    margin-bottom: var(--spacing-md);
  }
}

.aperture-rule {
  border: none;
  border-top: 1px solid var(--border);
  margin: var(--spacing-xl) 0;
  opacity: 0.5;
}

.submission-form-wrap {
  padding: var(--spacing-sm) 0;
}

.submission-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-field {
  input[type='text'],
  textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    padding: var(--spacing-sm) 0;
    font-family: var(--font-serif);
    font-size: 1rem;
    color: var(--text);
    line-height: 1.6;
    outline: none;
    resize: none;
    transition: border-color var(--transition-speed) ease;

    &::placeholder {
      color: var(--text-muted);
      opacity: 0.5;
    }

    &:focus {
      border-bottom-color: var(--iw-accent);
    }
  }
}

.movement-select {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  padding: var(--spacing-sm) 0;
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--text);
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: border-color var(--transition-speed) ease;

  option { background: var(--bg, #fff); }

  &:focus { border-bottom-color: var(--iw-accent); }

  &:disabled { opacity: 0.5; }
}

.file-label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  input[type='file'] {
    display: none;
  }
}

.file-text {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  padding-bottom: var(--spacing-xs);
  transition: color var(--transition-speed) ease, border-color var(--transition-speed) ease;

  &:hover {
    color: var(--iw-accent);
    border-bottom-color: var(--iw-accent);
  }
}

.submit-error {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-style: italic;
  color: var(--text-muted);
  opacity: 0.7;
  margin: 0;
}

.submit-btn {
  align-self: flex-start;
  background: transparent;
  border: none;
  padding: 0;
  font-family: var(--font-serif);
  font-size: 1rem;
  font-style: italic;
  color: var(--text-muted);
  cursor: pointer;
  transition: color var(--transition-speed) ease;
  margin-top: var(--spacing-sm);

  &:hover:not(:disabled) {
    color: var(--iw-accent);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}

.submission-received {
  p {
    font-family: var(--font-serif);
    font-size: 1.0625rem;
    font-style: italic;
    color: var(--text-muted);
    line-height: 1.85;
  }
}

.aperture-crosslinks {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.crosslink {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-style: italic;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--iw-accent); }
}
</style>
