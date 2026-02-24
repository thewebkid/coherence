<template>
  <div class="signal-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Signal</h1>
          <p class="page-subtitle">Coming soon</p>
        </header>

        <div class="page-content">
          <p>
            This section is under development and will be available shortly.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Signal — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Signal — Coherence Across Scales' },
    { property: 'og:description', content: 'Signal - Coming soon.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'Signal - Coming soon.' },
  ],
});
</script>

<style lang="scss" scoped>
.signal-page {
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
