<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice · Orientation</p>
          <h1>The Core Condition</h1>
          <p class="page-subtitle">a micro-essay</p>
        </header>

        <article>
          <MarkdownContent :source="markdownSource" />
        </article>

        <OrientationDocumentNav current="core-condition" />

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
import markdownSource from '@/content/The_Core_Condition.md?raw';

const route = useRoute();

useHead({
  title: 'The Core Condition — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'The Core Condition — Coherence Across Scales' },
    { property: 'og:description', content: 'Perception is not organized by separation. Expression arises from within the condition.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'Perception is not organized by separation. Expression arises from within the condition.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'The Core Condition — Coherence Across Scales' },
    { name: 'twitter:description', content: 'Perception is not organized by separation. Expression arises from within the condition.' },
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
