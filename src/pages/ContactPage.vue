<template>
  <div class="contact-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Stewardship</h1>
        </header>

        <div class="page-content">
          <p class="lead">
            A pathway for thoughtful engagement.
          </p>
          <p>
            This work is offered in service to the emergence of a more coherent civilization.
            It is not owned, promoted, or institutionally managed. It is shared freely for
            those who find resonance with its orientation.
          </p>
          <p>
            If you would like to engage with this work — whether through conversation, collaboration,
            or simply to share how it has touched your life — you are welcome to reach out.
          </p>
          <p>
            There are no expectations, requirements, or thresholds. Only a willingness to meet
            in coherence.
          </p>

          <div class="contact-box">
            <p class="contact-label">Contact</p>
            <a href="mailto:stewardship@coherenceacrossscales.org" class="contact-email">
              stewardship@coherenceacrossscales.org
            </a>
          </div>

          <blockquote>
            <p>
              Participation depends only on willingness.<br>
              Wherever willingness appears, coherence finds an opening through which to move.
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Stewardship — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Stewardship — Coherence Across Scales' },
    { property: 'og:description', content: 'A pathway for thoughtful engagement with this work. Reach out to share how coherence has touched your life or to explore collaboration.' },
    { property: 'og:type', content: 'website' },
    { name: 'description', content: 'A pathway for thoughtful engagement with this work. Reach out to share how coherence has touched your life or to explore collaboration.' },
  ],
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/blockquote';

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
  .lead {
    font-size: 1.125rem;
    font-style: italic;
    color: var(--text-muted);
    margin-bottom: var(--spacing-lg);
  }

  p {
    margin-bottom: var(--spacing-sm);
  }

  blockquote {
    // Using shared blockquote styles from _blockquote.scss
    margin-top: var(--spacing-xl);

    p {
      margin-bottom: 0;
    }
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
