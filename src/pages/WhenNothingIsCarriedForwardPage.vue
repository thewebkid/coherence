<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">The Work</p>
          <h1>When Nothing Is Carried Forward</h1>
          <p class="page-subtitle">a micro-essay</p>
        </header>

        <article>
          <MarkdownContent :source="markdownSource" />
        </article>

        <div class="essay-footer">
          <RouterLink to="/work" class="back-link">← The Work</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import markdownSource from '@/content/Micro-Essay_When_Nothing_Is_Carried_Forward.md?raw';

useHead({
  title: 'When Nothing Is Carried Forward — The Work — Coherence Across Scales',
  meta: [
    { name: 'description', content: 'You do not need to become something new. You only need to see what is being carried forward automatically.' },
  ],
});
</script>

<style lang="scss" scoped>
.essay-footer {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
}

.back-link {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--text-muted);
  text-decoration: none;

  &:hover { color: var(--text); }
}
</style>
