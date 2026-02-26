<template>
  <div class="institutional-page fade-in">
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

          <div class="contact-box">
            <p class="contact-label">For institutional or professional inquiries</p>
            <a href="mailto:Inquiries@CoherenceAcrossScales.org" class="contact-email">
              Inquiries@CoherenceAcrossScales.org
            </a>
          </div>

          <p class="note">Please include a brief description of context and intention.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Institutional Inquiries — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Institutional Inquiries — Coherence Across Scales' },
    { property: 'og:description', content: 'We welcome thoughtful engagement with organizations, research groups, and institutions interested in coherence-based approaches across scales.' },
    { property: 'og:type', content: 'website' },
    { name: 'description', content: 'We welcome thoughtful engagement with organizations, research groups, and institutions interested in coherence-based approaches across scales.' },
  ],
});
</script>

<style lang="scss" scoped>
.institutional-page {
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

  .note {
    margin-top: var(--spacing-lg);
    font-style: italic;
    color: var(--text-muted);
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
