<template>
  <div class="seven-movements-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="movements-header">
          <RouterLink to="/interpretive-works" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Interpretive Works
          </RouterLink>
          <h1>Seven Movements</h1>
        </header>

        <article class="movements-article">
          <MarkdownContent :source="rawSource" />
        </article>

        <div class="movements-ending">
          <RouterLink to="/interpretive-works/continuation" class="continuation-link">
            If something remains open…
          </RouterLink>
        </div>

        <div class="movements-download">
          <DownloadButton
            href="/pdf/Seven_Movements.pdf"
            label="Download PDF"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';
import MarkdownContent from '@/components/MarkdownContent.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import rawSource from '@/content/7movements.md?raw';

const route = useRoute();

useHead({
  title: 'Seven Movements — Interpretive Works — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Seven Movements — Coherence Across Scales' },
    { property: 'og:description', content: 'A text in seven movements exploring the dissolution of separation and the emergence of coherence as field.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'A text in seven movements exploring the dissolution of separation and the emergence of coherence as field.' },
  ],
});
</script>

<style lang="scss" scoped>
.seven-movements-page {
  background-color: var(--iw-bg);
  min-height: 100vh;
  padding: var(--spacing-lg) 0 var(--spacing-section);
}

.movements-header {
  margin-bottom: var(--spacing-xl);
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

  &:hover { color: var(--iw-accent); }
}

.movements-header h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 400;
  color: var(--iw-accent);
  margin-bottom: 0;
}

.movements-article {
  max-width: var(--content-width);
}

.movements-ending {
  max-width: var(--content-width);
  padding-top: calc(var(--spacing-section) * 1.5);
  padding-bottom: var(--spacing-xl);
}

.continuation-link {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  font-style: italic;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--iw-accent); }
}

.movements-download {
  max-width: var(--content-width);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
}
</style>
