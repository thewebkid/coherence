<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice · Orientation</p>
          <h1>Noticing</h1>
          <p class="page-subtitle">when nothing needs to be integrated</p>
        </header>

        <article>
          <MarkdownContent :source="markdownSource" />
        </article>

        <OrientationDocumentNav current="noticing" />

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
import markdownSource from '@/content/Noticing.md?raw';

const route = useRoute();

useHead({
  title: 'Noticing — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Noticing — Coherence Across Scales' },
    { property: 'og:description', content: 'When nothing needs to be integrated. What remains when what was assumed is no longer organizing what is seen.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'When nothing needs to be integrated. What remains when what was assumed is no longer organizing what is seen.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Noticing — Coherence Across Scales' },
    { name: 'twitter:description', content: 'When nothing needs to be integrated. What remains when what was assumed is no longer organizing what is seen.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped></style>
