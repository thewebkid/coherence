<template>
  <div class="stewardship-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Stewardship</h1>
          <p class="page-subtitle">A pathway for thoughtful engagement</p>
        </header>

        <div class="page-content">
          <p>
            Content for this section is being revised and will be available shortly.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Stewardship — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Stewardship — Coherence Across Scales' },
    { property: 'og:description', content: 'A pathway for thoughtful engagement with the work of Coherence Across Scales.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'A pathway for thoughtful engagement with the work of Coherence Across Scales.' },
  ],
});
</script>

<style lang="scss" scoped>
.stewardship-page {
  padding: var(--spacing-section) 0;
}

.page-header {
  margin-bottom: var(--spacing-xl);

  h1 {
    margin-bottom: var(--spacing-xs);
  }
}

.page-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.0625rem;
  color: var(--text-muted);
  margin: 0;
}

.page-content {
  p {
    margin-bottom: var(--spacing-sm);
    color: var(--text-muted);
  }
}
</style>
