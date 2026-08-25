<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice · Orientation</p>
          <h1>Dialogue on Willingness</h1>
        </header>

        <article>
          <MarkdownContent :source="markdownSource" />
        </article>

        <OrientationDocumentNav current="dialogue-on-willingness" />

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
import markdownSource from '@/content/Dialogue on Willingness.md?raw';

const route = useRoute();

useHead({
  title: 'Dialogue on Willingness — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Dialogue on Willingness — Coherence Across Scales' },
    { property: 'og:description', content: 'Willingness is the aperture condition — the absence of resistance to coherence expanding its aperture.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'Willingness is the aperture condition — the absence of resistance to coherence expanding its aperture.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Dialogue on Willingness — Coherence Across Scales' },
    { name: 'twitter:description', content: 'Willingness is the aperture condition — the absence of resistance to coherence expanding its aperture.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped></style>
