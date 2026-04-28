<template>
  <div class="transmission-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <RouterLink to="/interpretive-works/continuation" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          If something remains open…
        </RouterLink>

        <article class="transmission-body">
          <MarkdownContent :source="rawSource" />
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import rawSource from '@/content/When a Transmission Lands Too Strongly.md?raw';

useHead({
  title: 'When a Transmission Lands Too Strongly — Coherence Across Scales',
  meta: [
    { name: 'description', content: 'On what to do when a transmission arrives with more intensity than the system can immediately integrate.' },
  ],
});
</script>

<style lang="scss" scoped>
.transmission-page {
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

.transmission-body {
  max-width: var(--content-width);
}
</style>
