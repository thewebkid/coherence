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
          <h1 class="aperture-title">In image</h1>

          <div class="aperture-prose">
            <p>What could not remain in words<br>found other shapes.</p>
            <p>Not as illustration—<br>but as another way of seeing.</p>
          </div>

          <hr class="aperture-rule" />

          <div class="aperture-prose">
            <p>Each image is not a representation.</p>
            <p>It is a moment of the same field<br>taking form.</p>
            <p>There is no correct way to view these.</p>
            <p>Let them meet you<br>where they do.</p>
          </div>

          <hr class="aperture-rule" />

          <div class="image-field">
            <div v-for="movement in movements" :key="movement.label" class="image-entry">
              <span class="image-label">{{ movement.label }}</span>
              <img v-if="movement.src" :src="movement.src" :alt="movement.label" class="movement-image" />
            </div>
          </div>

          <hr class="aperture-rule" />

          <p class="aperture-closing">The final movement is still arriving.</p>

          <hr class="aperture-rule" />

          <nav class="aperture-crosslinks" aria-label="Other continuation pages">
            <RouterLink to="/interpretive-works/listen" class="crosslink">Listen</RouterLink>
            <RouterLink to="/interpretive-works/this-field-remains-open" class="crosslink">This field remains open</RouterLink>
          </nav>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

const movements = [
  { label: 'Movement I', src: '' },
  { label: 'Movement II', src: '' },
  { label: 'Movement III', src: '' },
  { label: 'Movement IV', src: '' },
  { label: 'Movement V', src: '' },
  { label: 'Movement VI', src: '' },
];

useHead({ title: 'In Image — Seven Movements — Coherence Across Scales' });
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

.image-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-section);
}

.image-entry {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.image-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0.6;
  align-self: flex-start;
}

.movement-image {
  width: 100%;
  max-width: 720px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.aperture-closing {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  font-style: italic;
  color: var(--text-muted);
  opacity: 0.7;
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
