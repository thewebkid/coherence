<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice</p>
          <h1>Stability &amp; Permeability</h1>
          <p class="page-subtitle">A micro-essay</p>
        </header>

        <article>
          <MarkdownContent :source="markdownSource" />
        </article>

        <OrientationDocumentNav current="stability-permeability" />

        <p class="doc-footer">
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
.doc-footer {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  line-height: 1.75;
}
</style>
