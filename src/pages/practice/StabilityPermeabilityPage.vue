<template>
  <div class="practice-doc-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="practice-doc-header">
          <p class="practice-doc-header__category">Practice</p>
          <h1>Stability &amp; Permeability</h1>
          <p class="practice-doc-header__subtitle">A micro-essay</p>
        </header>

        <article class="practice-doc-article">
          <MarkdownContent :source="markdownSource" />
        </article>

        <OrientationDocumentNav current="stability-permeability" />

        <p class="practice-doc-footer">
          <RouterLink to="/practice" class="text-link">Return to Practice →</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';
import MarkdownContent from '@/components/MarkdownContent.vue';
import OrientationDocumentNav from '@/components/OrientationDocumentNav.vue';
import markdownSource from '@/content/stability-and-permeability.md?raw';

const route = useRoute();

useHead({
  title: 'Stability & Permeability — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Stability & Permeability — Coherence Across Scales' },
    { property: 'og:description', content: 'Stability without conclusion, permeability without closure, and relational intelligence as the movement between them.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'Stability without conclusion, permeability without closure, and relational intelligence as the movement between them.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Stability & Permeability — Coherence Across Scales' },
    { name: 'twitter:description', content: 'Stability without conclusion, permeability without closure, and relational intelligence as the movement between them.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.practice-doc-page {
  padding: var(--spacing-section) 0;
}

.practice-doc-header {
  margin-bottom: var(--spacing-xl);

  h1 {
    margin-bottom: var(--spacing-xs);
  }
}

.practice-doc-header__category {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  margin-bottom: var(--spacing-sm);
}

.practice-doc-header__subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-muted);
  margin-bottom: 0;
}

.practice-doc-article {
  max-width: var(--content-width);
}

.practice-doc-footer {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  line-height: 1.75;
}

.text-link {
  color: var(--accent);
  text-decoration: none;
  &:hover { text-decoration: underline; }
}
</style>
