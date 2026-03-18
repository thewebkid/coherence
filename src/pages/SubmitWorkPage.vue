<template>
  <div class="submit-work-page fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="page-header">
          <RouterLink to="/interpretive-works" class="back-link">← Interpretive Works</RouterLink>
          <h1>Submit an Interpretive Work</h1>
          <p class="page-tagline">Share a work that engages the themes of this project.</p>
        </header>

        <div class="page-intro">
          <p>We welcome submissions of creative work that interprets or engages with themes related to observation, coherence, planetary awareness, and the relationship between human and natural intelligence.</p>
          <p>All submissions are reviewed before publication. If your work is selected, we will contact you directly.</p>
        </div>

        <div class="iw-divider" />

        <!-- Success state -->
        <div v-if="submitted" class="submit-success">
          <p class="success-title">Thank you.</p>
          <p>Your submission has been received. We will be in touch if your work is selected for inclusion.</p>
          <RouterLink to="/interpretive-works" class="return-link">← Return to Interpretive Works</RouterLink>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="submit-form" novalidate>

          <fieldset class="form-section">
            <legend class="form-legend">About You</legend>

            <div class="form-field" :class="{ 'has-error': errors.submitterName }">
              <label for="submitter-name">Your name <span class="required">*</span></label>
              <input
                id="submitter-name"
                v-model="form.submitterName"
                type="text"
                placeholder="Your full name"
                :disabled="loading"
              />
              <span v-if="errors.submitterName" class="error-msg">{{ errors.submitterName }}</span>
            </div>

            <div class="form-field" :class="{ 'has-error': errors.submitterEmail }">
              <label for="submitter-email">Email address <span class="required">*</span></label>
              <input
                id="submitter-email"
                v-model="form.submitterEmail"
                type="email"
                placeholder="you@example.com"
                :disabled="loading"
              />
              <p class="field-note">Used for correspondence only. Not displayed publicly.</p>
              <span v-if="errors.submitterEmail" class="error-msg">{{ errors.submitterEmail }}</span>
            </div>

            <div class="form-field form-field--checkbox">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="form.displayNameConsent"
                  :disabled="loading"
                />
                <span>Display my name publicly if this work is selected</span>
              </label>
            </div>
          </fieldset>

          <div class="iw-divider" />

          <fieldset class="form-section">
            <legend class="form-legend">About the Work</legend>

            <div class="form-field" :class="{ 'has-error': errors.workTitle }">
              <label for="work-title">Title <span class="required">*</span></label>
              <input
                id="work-title"
                v-model="form.workTitle"
                type="text"
                placeholder="Title of the work"
                :disabled="loading"
              />
              <span v-if="errors.workTitle" class="error-msg">{{ errors.workTitle }}</span>
            </div>

            <div class="form-field" :class="{ 'has-error': errors.workType }">
              <label for="work-type">Type <span class="required">*</span></label>
              <select id="work-type" v-model="form.workType" :disabled="loading">
                <option value="" disabled>Select a type</option>
                <option v-for="t in workTypes" :key="t" :value="t">{{ t }}</option>
              </select>
              <span v-if="errors.workType" class="error-msg">{{ errors.workType }}</span>
            </div>

            <div class="form-field" :class="{ 'has-error': errors.workDescription }">
              <label for="work-description">Description <span class="required">*</span></label>
              <textarea
                id="work-description"
                v-model="form.workDescription"
                rows="5"
                placeholder="Describe the work and how it relates to the themes of this project."
                :disabled="loading"
              />
              <span v-if="errors.workDescription" class="error-msg">{{ errors.workDescription }}</span>
            </div>

            <div class="form-field">
              <label for="work-url">Link to work</label>
              <input
                id="work-url"
                v-model="form.workUrl"
                type="url"
                placeholder="https://..."
                :disabled="loading"
              />
              <p class="field-note">Optional. If the work is hosted online, share a link. Otherwise describe the format below.</p>
            </div>

            <div class="form-field">
              <label for="work-file-info">File or format notes</label>
              <textarea
                id="work-file-info"
                v-model="form.workFileInfo"
                rows="2"
                placeholder="e.g., High-resolution images available, PDF essay, MP3 recording"
                :disabled="loading"
              />
            </div>
          </fieldset>

          <div v-if="submitError" class="error-banner">
            {{ submitError }}
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? 'Submitting…' : 'Submit Work' }}
          </button>

        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';

useHead({
  title: 'Submit an Interpretive Work — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Submit an Interpretive Work' },
    { property: 'og:description', content: 'Share a creative work that interprets or engages with themes of observation, coherence, and planetary awareness.' },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'Share a creative work that interprets or engages with themes of observation, coherence, and planetary awareness.' },
  ],
});

const workTypes = ['Visual Art', 'Writing', 'Video', 'Music', 'Other'];

const form = reactive({
  submitterName: '',
  submitterEmail: '',
  displayNameConsent: false,
  workTitle: '',
  workType: '',
  workDescription: '',
  workUrl: '',
  workFileInfo: '',
});

const errors = reactive({});
const loading = ref(false);
const submitted = ref(false);
const submitError = ref('');

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k]);

  if (!form.submitterName.trim()) errors.submitterName = 'Name is required.';
  if (!form.submitterEmail.trim()) {
    errors.submitterEmail = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.submitterEmail)) {
    errors.submitterEmail = 'Please enter a valid email address.';
  }
  if (!form.workTitle.trim()) errors.workTitle = 'Title is required.';
  if (!form.workType) errors.workType = 'Please select a type.';
  if (!form.workDescription.trim()) errors.workDescription = 'Description is required.';

  return Object.keys(errors).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;

  loading.value = true;
  submitError.value = '';

  try {
    const res = await fetch('/api/submit-work', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submitterName: form.submitterName.trim(),
        submitterEmail: form.submitterEmail.trim(),
        displayNameConsent: form.displayNameConsent,
        workTitle: form.workTitle.trim(),
        workType: form.workType,
        workDescription: form.workDescription.trim(),
        workUrl: form.workUrl.trim() || undefined,
        workFileInfo: form.workFileInfo.trim() || undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Submission failed');

    submitted.value = true;
  } catch (err) {
    submitError.value = err.message || 'An error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.submit-work-page {
  padding: var(--spacing-section) 0;
  background-color: var(--iw-bg);
  min-height: 100vh;
}

.back-link {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: var(--spacing-md);

  &:hover { color: var(--iw-accent); }
}

.page-header {
  margin-bottom: var(--spacing-xl);

  h1 { margin-bottom: var(--spacing-xs); }
}

.page-tagline {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.125rem;
  color: var(--text-muted);
  margin: 0;
}

.page-intro {
  max-width: 680px;

  p {
    line-height: var(--iw-line-height-prose, 2);
    margin-bottom: var(--spacing-sm);
  }
}

.iw-divider {
  width: 48px;
  height: 1px;
  background: var(--iw-accent);
  opacity: 0.4;
  margin: var(--spacing-xl) 0;
}

.submit-success {
  max-width: 540px;
  padding: var(--spacing-lg);
  background: var(--iw-bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);

  .success-title {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    margin-bottom: var(--spacing-xs);
  }

  p { margin-bottom: var(--spacing-sm); }
}

.return-link {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--iw-accent);
  text-decoration: none;

  &:hover { text-decoration: underline; }
}

.submit-form {
  max-width: 600px;
}

.form-section {
  border: none;
  padding: 0;
  margin: 0 0 var(--spacing-lg);
}

.form-legend {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--iw-accent);
  margin-bottom: var(--spacing-md);
  padding: 0;
}

.form-field {
  margin-bottom: var(--spacing-md);

  label {
    display: block;
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 0.375rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.625rem 0.75rem;
    background: var(--iw-bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    color: var(--text);
    transition: border-color var(--transition-speed) ease;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: var(--iw-accent);
    }

    &:disabled { opacity: 0.6; }
  }

  textarea { resize: vertical; }

  &.has-error input,
  &.has-error textarea,
  &.has-error select {
    border-color: #c0392b;
  }

  &--checkbox {
    label { margin: 0; }
  }
}

.checkbox-label {
  display: flex !important;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  font-size: 0.9375rem !important;
  font-weight: 400 !important;

  input[type='checkbox'] {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
}

.field-note {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 0.375rem 0 0;
}

.required {
  color: var(--iw-accent);
}

.error-msg {
  display: block;
  font-size: 0.8125rem;
  color: #c0392b;
  margin-top: 0.25rem;
}

.error-banner {
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(192, 57, 43, 0.08);
  border: 1px solid rgba(192, 57, 43, 0.3);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  color: #c0392b;
  margin-bottom: var(--spacing-md);
}

.submit-btn {
  padding: 0.75rem 2rem;
  background: var(--iw-accent);
  color: var(--iw-bg);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-speed) ease;

  &:hover:not(:disabled) { background: var(--iw-accent-hover); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}
</style>
