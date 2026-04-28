<template>
  <div class="continuation-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <RouterLink to="/interpretive-works/seven-movements" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Seven Movements
        </RouterLink>

        <article class="continuation-body">
          <h1 class="continuation-title">If something remains open…</h1>

          <div class="continuation-intro">
            <p>There is no requirement to continue.</p>
            <p>Nothing here asks for completion.</p>
            <p>And yet—</p>
            <p>sometimes, what is touched does not close.</p>
            <p>It lingers. It listens. It looks for another form.</p>
          </div>

          <hr class="continuation-rule" />

          <div class="continuation-intro">
            <p>If that is present for you,<br>
            these are not directions—</p>
            <p>only additional ways the field has expressed itself.</p>
          </div>

          <hr class="continuation-rule" />

          <nav class="continuation-links" aria-label="Continuation pages">
            <div class="continuation-link-item">
              <RouterLink to="/interpretive-works/listen" class="continuation-link">Listen</RouterLink>
              <p class="continuation-link-desc">What moved through language also moved through sound.</p>
            </div>

            <hr class="continuation-rule" />

            <div class="continuation-link-item">
              <RouterLink to="/interpretive-works/in-image" class="continuation-link">In image</RouterLink>
              <p class="continuation-link-desc">What could not remain in words found other shapes.</p>
            </div>

            <hr class="continuation-rule" />

            <div class="continuation-link-item">
              <RouterLink to="/interpretive-works/this-field-remains-open" class="continuation-link">This field remains open</RouterLink>
              <p class="continuation-link-desc">Not to respond—<br>but to participate.</p>
            </div>
          </nav>

          <hr class="continuation-rule" />

          <div class="continuation-closing">
            <p>You can leave here.</p>
            <p>Or you can follow what continues.</p>
            <p>Both are complete.</p>
          </div>

          <hr class="continuation-rule" />

          <div class="continuation-transmission">
            <RouterLink to="/interpretive-works/when-a-transmission-lands-too-strongly" class="transmission-link">
              → <em>When a transmission lands too strongly</em>
            </RouterLink>
            <p class="transmission-desc">Sometimes, what opens needs space to settle.</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'If something remains open… — Seven Movements — Coherence Across Scales',
  meta: [
    { name: 'description', content: 'A continuation of Seven Movements—additional ways the field has expressed itself.' },
  ],
});
</script>

<style lang="scss" scoped>
.continuation-page {
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

.continuation-body {
  max-width: var(--content-width);
}

.continuation-title {
  font-family: var(--font-serif);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 400;
  font-style: italic;
  color: var(--iw-accent);
  margin-bottom: var(--spacing-xl);
}

.continuation-intro {
  p {
    font-family: var(--font-sans);
    font-size: 1.0625rem;
    line-height: 1.85;
    color: var(--text-muted);
    margin-bottom: var(--spacing-md);
  }
}

.continuation-rule {
  border: none;
  border-top: 1px solid var(--border);
  margin: var(--spacing-xl) 0;
  opacity: 0.5;
}

.continuation-links {
  display: flex;
  flex-direction: column;
}

.continuation-link-item {
  padding: var(--spacing-sm) 0;
}

.continuation-link {
  display: inline-block;
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  color: var(--text);
  text-decoration: none;
  margin-bottom: var(--spacing-xs);
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--iw-accent); }
}

.continuation-link-desc {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text-muted);
  margin: 0;
}

.continuation-closing {
  p {
    font-family: var(--font-sans);
    font-size: 1.0625rem;
    line-height: 1.85;
    color: var(--text-muted);
    margin-bottom: var(--spacing-sm);
  }
}

.continuation-transmission {
  padding: var(--spacing-sm) 0;
}

.transmission-link {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--iw-accent); }
}

.transmission-desc {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  color: var(--text-muted);
  opacity: 0.7;
  margin-top: var(--spacing-xs);
}
</style>
