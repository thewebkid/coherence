<template>
  <div class="work-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>The Work</h1>
          <p class="page-intro">
            Three interconnected documents exploring coherence from theory to practice.
            Each is readable online and available for download.
          </p>
        </header>

        <div class="work-cards">
          <article class="work-card">
            <div class="work-card-content">
              <h2>The Manuscript</h2>
              <p class="work-card-subtitle">Coherence Across Scales</p>
              <p class="work-card-desc">
                The foundational text exploring coherence from the cellular and personal,
                through the relational and societal, to the civilizational and planetary.
                A framework for understanding how coherence operates across all scales of life.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/manuscript" class="work-link">Read Online</RouterLink>
                <DownloadButton
                  href="/pdf/Coherence Across Scales v1.9.pdf"
                  label="Download PDF"
                />
              </div>
            </div>
          </article>

          <article class="work-card">
            <div class="work-card-content">
              <h2>The Slide Deck</h2>
              <p class="work-card-subtitle">A Visual Orientation</p>
              <p class="work-card-desc">
                A distilled visual presentation of the core concepts. The relational triad,
                the coherence engine, and the patterns that enable civilizational coherence
                to emerge through local practice.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/deck" class="work-link">View Slides</RouterLink>
                <DownloadButton
                  href="/pdf/Coherence Across Scales Slide Deck v2.0.pdf"
                  label="Download PDF"
                />
              </div>
            </div>
          </article>

          <article class="work-card">
            <div class="work-card-content">
              <h2>The Handbook</h2>
              <p class="work-card-subtitle">A Practical Guide</p>
              <p class="work-card-desc">
                A practical guide on carrying coherence in daily life. Five practices —
                alignment, return, harmonized sovereignty, relational coherence, and shared
                becoming — meant to be lived alongside, not studied.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/handbook" class="work-link">Read Online</RouterLink>
                <DownloadButton
                  href="/pdf/Handbook of Practices v1.4.pdf"
                  label="Download PDF"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import DownloadButton from '@/components/DownloadButton.vue';

useHead({
  title: 'The Work — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'The Work — Coherence Across Scales' },
    { property: 'og:description', content: 'Three interconnected documents exploring coherence: The Manuscript (foundational text), The Slide Deck (visual orientation), and The Handbook (practical guide). Readable online and downloadable.' },
    { property: 'og:type', content: 'website' },
    { name: 'description', content: 'Three interconnected documents exploring coherence: The Manuscript (foundational text), The Slide Deck (visual orientation), and The Handbook (practical guide). Readable online and downloadable.' },
  ],
});
</script>

<style lang="scss" scoped>
.work-page {
  padding: var(--spacing-section) 0;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);

  h1 {
    margin-bottom: var(--spacing-sm);
  }
}

.page-intro {
  color: var(--text-muted);
  max-width: 520px;
  margin: 0 auto;
}

.work-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.work-card {
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);

  @media (min-width: 768px) {
    padding: var(--spacing-xl);
  }
}

.work-card-content {
  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: var(--spacing-xs);
    margin-top: 0;
  }
}

.work-card-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.0625rem;
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.work-card-desc {
  color: var(--text);
  margin-bottom: var(--spacing-md);
  line-height: 1.7;
}

.work-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  align-items: center;
}

.work-link {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--accent);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: white;
  text-decoration: none;
  transition: background var(--transition-speed) ease;

  &:hover {
    background: var(--accent-hover);
    color: white;
  }
}
</style>
