<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice · Orientation</p>
          <h1>What Attention Makes Visible</h1>
          <p class="page-subtitle">a micro-essay</p>
        </header>

        <article>
          <MarkdownContent :source="markdownSource" />
        </article>

        <OrientationDocumentNav current="what-attention-makes-visible" />

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
import markdownSource from '@/content/Micro-Essay_What_Attention_Makes_Visible.md?raw';

const route = useRoute();

useHead({
  title: 'What Attention Makes Visible — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'What Attention Makes Visible — Coherence Across Scales' },
    { property: 'og:description', content: 'Attention is not separate from observation. It is the position from which observation occurs — and that position is not fixed.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'Attention is not separate from observation. It is the position from which observation occurs — and that position is not fixed.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'What Attention Makes Visible — Coherence Across Scales' },
    { name: 'twitter:description', content: 'Attention is not separate from observation. It is the position from which observation occurs — and that position is not fixed.' },
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
