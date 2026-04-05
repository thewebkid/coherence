<template>
  <div class="doc-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="doc-header">
          <h1>TCP Executive Vision Brief</h1>
          <p class="doc-subtitle">The Coherence Project — A Planetary Observatory for Coherence</p>
          <div class="doc-download">
            <DownloadButton
              href="/pdf/TCP-Executive-Brief.pdf"
              label="Download PDF"
            />
          </div>
        </header>

        <article class="doc-article">
          <MarkdownContent :source="markdownSource" />
        </article>
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
import DownloadButton from '@/components/DownloadButton.vue';
import markdownSource from '@/content/tcp-executive-brief.md?raw';

const route = useRoute();

useHead({
  title: 'TCP Executive Vision Brief — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'TCP Executive Vision Brief — Coherence Across Scales' },
    { property: 'og:description', content: 'A proposed planetary observatory exploring how institutional signal streams may contribute to a cross-scale observational framework.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'A proposed planetary observatory exploring how institutional signal streams may contribute to a cross-scale observational framework.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'TCP Executive Vision Brief — Coherence Across Scales' },
    { name: 'twitter:description', content: 'A proposed planetary observatory exploring how institutional signal streams may contribute to a cross-scale observational framework.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.doc-page {
  padding: var(--spacing-section) 0;
}

.doc-header {
  margin-bottom: var(--spacing-xl);

  h1 {
    margin-bottom: var(--spacing-xs);
  }
}

.doc-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-muted);
  margin-bottom: var(--spacing-lg);
}

.doc-download {
  margin-top: var(--spacing-md);
}

.doc-article {
  max-width: var(--content-width);
}
</style>
