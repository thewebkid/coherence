<template>
  <div class="contact-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Contact</h1>
        </header>

        <div class="page-content">
          <p>This work is offered openly and without affiliation.</p>
          <p>General correspondence is welcome where it supports clarity, understanding, or thoughtful exchange.</p>
          <p>While we cannot respond to every message, all communications are received and read with care.</p>

          <div class="contact-box">
            <p class="contact-label">For general inquiries</p>
            <a href="mailto:Contact@CoherenceAcrossScales.org" class="contact-email">
              Contact@CoherenceAcrossScales.org
            </a>
          </div>

          <div class="contact-box">
            <p class="contact-label">For technical or site-related questions</p>
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
.contact-page {
  padding: var(--spacing-section) 0;
}

.page-header {
  margin-bottom: var(--spacing-xl);

  h1 {
    margin-bottom: 0;
  }
}

.page-content {
  p {
    margin-bottom: var(--spacing-sm);
  }

  .closing {
    margin-top: var(--spacing-xl);
  }
  
  .tagline-variant {
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--border);
    font-style: italic;
    font-size: 0.9375rem;
    color: var(--text-muted);
    text-align: center;
  }
}

.contact-box {
  margin: var(--spacing-xl) 0;
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  text-align: center;
}

.contact-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: var(--spacing-sm);
}

.contact-email {
  font-family: var(--font-sans);
  font-size: 1.125rem;
  color: var(--accent);
  text-decoration: none;
  word-break: break-all;
  transition: color var(--transition-speed) ease;

  &:hover {
    color: var(--accent-hover);
    text-decoration: underline;
  }
}
</style>
