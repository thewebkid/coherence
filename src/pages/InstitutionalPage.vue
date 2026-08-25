<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Institutional Inquiries</h1>
        </header>

        <div class="page-content">
          <p>
            We welcome thoughtful engagement with organizations, research groups, and institutions interested in coherence-based approaches across scales.
          </p>
          <p>
            This may include dialogue, exploratory collaboration, or the integration of these principles within existing systems and contexts.
          </p>
          <p>
            All inquiries are considered on a case-by-case basis and approached with care for alignment, clarity, and long-term coherence.
          </p>

          <div class="contact-box surface-panel">
            <p class="text-label">For institutional or professional inquiries</p>
            <a href="mailto:Inquiries@CoherenceAcrossScales.org" class="contact-email">
              Inquiries@CoherenceAcrossScales.org
            </a>
          </div>

          <p class="text-note">Please include a brief description of context and intention.</p>

          <section class="download-section">
            <h2 class="download-section__title">The Mirror Across Scales</h2>
            <p class="download-section__desc">
              A conceptual architecture describing how human observation, artificial intelligence, and planetary sensing may form a feedback system across scales of intelligence.
            </p>
            <p>
              <RouterLink to="/mirror-across-scales" class="download-link">Read the document →</RouterLink>
            </p>
          </section>

          <section class="download-section">
            <h2 class="download-section__title">The Coherence Project (TCP)</h2>
            <p class="download-section__desc">
              A proposed planetary observatory exploring how institutional signal streams may contribute to this cross-scale observational framework.
            </p>
            <p>
              <RouterLink to="/tcp-executive-brief" class="download-link">Read the executive brief →</RouterLink>
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';

const route = useRoute();

useHead({
  title: 'Institutional Inquiries — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Institutional Inquiries — Coherence Across Scales' },
    { property: 'og:description', content: 'We welcome thoughtful engagement with organizations, research groups, and institutions interested in coherence-based approaches across scales.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'We welcome thoughtful engagement with organizations, research groups, and institutions interested in coherence-based approaches across scales.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Institutional Inquiries — Coherence Across Scales' },
    { name: 'twitter:description', content: 'We welcome thoughtful engagement with organizations, research groups, and institutions interested in coherence-based approaches across scales.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.download-section {
  margin-top: var(--spacing-xl);

  & + .download-section {
    margin-top: var(--spacing-lg);
  }

  &__title {
    font-size: 1.125rem;
    margin-bottom: var(--spacing-xs);
  }

  &__desc {
    color: var(--text-muted);
    margin-bottom: var(--spacing-sm);
  }
}
</style>
