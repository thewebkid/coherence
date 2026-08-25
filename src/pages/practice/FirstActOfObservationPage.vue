<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice</p>
          <h1>The First Act of Observation</h1>
          <p class="page-subtitle">A micro-essay</p>
        </header>

        <article>
          <MarkdownContent :source="markdownSource" />
        </article>

        <OrientationDocumentNav current="first-act" />

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
import markdownSource from '@/content/first-act-of-observation.md?raw';

const route = useRoute();

useHead({
  title: 'The First Act of Observation — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'The First Act of Observation — Coherence Across Scales' },
    { property: 'og:description', content: 'You begin by noticing. The first act of observation and how participation forms a field across many moments.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'You begin by noticing. The first act of observation and how participation forms a field across many moments.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'The First Act of Observation — Coherence Across Scales' },
    { name: 'twitter:description', content: 'You begin by noticing. The first act of observation and how participation forms a field across many moments.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped></style>
