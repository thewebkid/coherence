<template>
  <div class="practice-page fade-in">
    <div class="page-container">
      <header class="practice-header">
        <RouterLink to="/work" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to The Work
        </RouterLink>
        <h1>Coherence Across Scales</h1>
        <p class="practice-subtitle">Practice</p>
      </header>

      <SlideCarousel :slides="slides" />
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import SlideCarousel from '@/components/SlideCarousel.vue';
import { getPracticeSlides } from '@/utils/content';

const slides = getPracticeSlides();

useHead({
  title: 'Practice — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Practice — Coherence Across Scales' },
    { property: 'og:description', content: 'Where coherence becomes lived behavior. Orientation cues for conversation, decision-making, systems, conflict, and solitude.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'Where coherence becomes lived behavior. Orientation cues for conversation, decision-making, systems, conflict, and solitude.' },
  ],
});
</script>

<style lang="scss" scoped>
.practice-page {
  padding: var(--spacing-lg) 0 var(--spacing-section);
}

.practice-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: var(--spacing-md);
  transition: color var(--transition-speed) ease;

  &:hover {
    color: var(--accent);
  }
}

.practice-header h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: var(--spacing-xs);
}

.practice-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-muted);
  margin: 0;
}
</style>
