<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Contact</h1>
        </header>

        <div class="page-content">
          <p>This work is offered openly and without affiliation.</p>
          <p>General correspondence is welcome where it supports clarity, understanding, or thoughtful exchange.</p>
          <p>While we cannot respond to every message, all communications are received and read with care.</p>

          <div class="contact-box surface-panel">
            <p class="text-label">For general inquiries</p>
            <a href="mailto:Contact@CoherenceAcrossScales.org" class="contact-email">
              Contact@CoherenceAcrossScales.org
            </a>
          </div>

          <div class="contact-box surface-panel">
            <p class="text-label">For technical or site-related questions</p>
            <a href="mailto:Contact@CoherenceAcrossScales.org" class="contact-email">
              Contact@CoherenceAcrossScales.org
            </a>
          </div>

          <p class="closing">Thank you for your attention and presence.</p>
          
          <p class="tagline-variant">
            This work is offered as a quiet laboratory of shared becoming.
          </p>
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
  title: 'Contact — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Contact — Coherence Across Scales' },
    { property: 'og:description', content: 'This work is offered openly and without affiliation. General correspondence is welcome where it supports clarity, understanding, or thoughtful exchange.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'This work is offered openly and without affiliation. General correspondence is welcome where it supports clarity, understanding, or thoughtful exchange.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Contact — Coherence Across Scales' },
    { name: 'twitter:description', content: 'This work is offered openly and without affiliation. General correspondence is welcome where it supports clarity, understanding, or thoughtful exchange.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.tagline-variant {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--text-muted);
  text-align: center;
}
</style>
