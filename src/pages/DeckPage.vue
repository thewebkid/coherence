<template>
  <div class="deck-page fade-in">
    <div class="page-container">
      <header class="deck-header">
        <RouterLink to="/work" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to The Work
        </RouterLink>
        <h1>Coherence Across Scales</h1>
        <p class="deck-subtitle">The Slide Deck</p>
      </header>

      <SlideCarousel :slides="slides" />

      <div class="deck-download">
        <DownloadButton
          href="/pdf/Coherence Across Scales Slide Deck v2.0.pdf"
          label="Download Full Deck (PDF)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import SlideCarousel from '@/components/SlideCarousel.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import { getDeckSlides } from '@/utils/content';

const slides = getDeckSlides();

useHead({
  title: 'Slide Deck — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Slide Deck — Coherence Across Scales' },
    { property: 'og:description', content: 'A visual orientation to the core concepts of coherence. The relational triad, the coherence engine, and patterns enabling civilizational coherence through local practice.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'A visual orientation to the core concepts of coherence. The relational triad, the coherence engine, and patterns enabling civilizational coherence through local practice.' },
  ],
});
</script>

<style lang="scss" scoped>
.deck-page {
  padding: var(--spacing-lg) 0 var(--spacing-section);
}

.deck-header {
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

.deck-header h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: var(--spacing-xs);
}

.deck-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-muted);
  margin: 0;
}

.deck-download {
  margin-top: var(--spacing-lg);
  text-align: center;
}
</style>
