<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Updates</h1>
        </header>

        <div class="page-content">
          <section class="updates-section">
            <h2 class="section-label">new</h2>
            <div class="updates-list">
              <div class="update-entry">
                <span class="update-date">Jun 2026</span>
                <RouterLink to="/interpretive-works/seven-apertures" class="update-title">Seven Apertures</RouterLink>
              </div>
              <div class="update-entry">
                <span class="update-date">May 2026</span>
                <RouterLink to="/work/dialogue-on-authorship" class="update-title">Dialogue On Authorship</RouterLink>
              </div>
            </div>
          </section>

          <section class="updates-section">
            <h2 class="section-label">revised</h2>
            <div class="updates-list">
              <div class="update-entry">
                <span class="update-date">Jun 2026</span>
                <RouterLink to="/about" class="update-title">About</RouterLink>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Updates — Coherence Across Scales',
  meta: [
    { name: 'description', content: 'A record of new and revised materials at Coherence Across Scales.' },
  ],
});
</script>

<style lang="scss" scoped>
.updates-section {
  margin-bottom: var(--spacing-xl);
}

.section-label {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: var(--spacing-sm);
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid var(--border);
}

.updates-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.update-entry {
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  gap: var(--spacing-md);
  align-items: baseline;
}

.update-date {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-feature-settings: "tnum";
  white-space: nowrap;
}

.update-title {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--text);
  text-decoration: none;
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--accent); }
}
</style>
