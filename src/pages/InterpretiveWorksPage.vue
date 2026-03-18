<template>
  <div class="interpretive-works-page fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="page-header">
          <h1>Interpretive Works</h1>
          <p class="page-tagline">Interpretations of the signals shaping our shared world.</p>
        </header>

        <div class="page-intro">
          <p>Creative expression often serves as one of the earliest ways societies explore new ways of seeing the world. Artists, writers, filmmakers, and thinkers interpret signals emerging from culture, science, and lived experience. Through these interpretations, patterns that may be difficult to articulate in formal analysis sometimes become visible in story, image, sound, and form.</p>
          <p>This section presents a growing collection of works that explore themes related to observation, coherence, planetary awareness, and the evolving relationship between human intelligence, technological intelligence, and the living systems of Earth.</p>
          <p>Each contribution represents an interpretation rather than a conclusion.</p>
          <p>Together, they form a cultural layer of reflection that accompanies the observational work explored throughout this site.</p>
        </div>

        <div class="iw-divider" />

        <section class="works-list">
          <article
            v-for="work in works"
            :key="work.slug"
            class="work-entry"
          >
            <div class="work-entry-text">
              <div class="work-meta">
                <span class="work-creator">{{ work.creator }}</span>
                <span class="work-sep">·</span>
                <span class="work-type">{{ work.type }}</span>
              </div>
              <h2 class="work-title">{{ work.title }}</h2>
              <p v-if="work.subtitle" class="work-subtitle">{{ work.subtitle }}</p>
              <RouterLink :to="`/interpretive-works/${work.slug}`" class="work-link">
                View Work →
              </RouterLink>
            </div>
            <RouterLink
              v-if="work.thumbnail"
              :to="`/interpretive-works/${work.slug}`"
              class="work-thumb-link"
              aria-hidden="true"
              tabindex="-1"
            >
              <img :src="work.thumbnail" :alt="work.title" class="work-thumb" />
            </RouterLink>
          </article>
        </section>

        <div class="iw-divider" />

        <div class="submit-prompt">
          <p class="submit-note">Additional interpretive works will appear here as they are submitted and curated.</p>
          <RouterLink to="/submit-work" class="submit-link">Submit an Interpretive Work →</RouterLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { works } from '@/content/interpretive-works/index.js';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';

const route = useRoute();

useHead({
  title: 'Interpretive Works — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Interpretive Works — Coherence Across Scales' },
    { property: 'og:description', content: 'A growing collection of creative works exploring themes of observation, coherence, and planetary awareness.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'A growing collection of creative works exploring themes of observation, coherence, and planetary awareness.' },
  ],
});
</script>

<style lang="scss" scoped>
.interpretive-works-page {
  padding: var(--spacing-section) 0;
  background-color: var(--iw-bg);
  min-height: 100vh;
}

.page-header {
  margin-bottom: var(--spacing-xl);

  h1 {
    margin-bottom: var(--spacing-xs);
    color: var(--iw-accent);
  }
}

.page-tagline {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.125rem;
  color: var(--text-muted);
  margin: 0;
}

.page-intro {
  max-width: 680px;

  p {
    line-height: var(--iw-line-height-prose, 2);
    margin-bottom: var(--spacing-sm);
  }
}

.iw-divider {
  width: 48px;
  height: 1px;
  background: var(--iw-accent);
  opacity: 0.4;
  margin: var(--spacing-xl) 0;
}

.works-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.work-entry {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-lg);
}

.work-entry-text {
  flex: 1;
  min-width: 0;
}

.work-meta {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  margin-bottom: var(--spacing-xs);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.work-title {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 1.3;
  margin-bottom: var(--spacing-xs);
}

.work-subtitle {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.9375rem;
  margin-bottom: var(--spacing-sm);
}

.work-link {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--iw-accent);
  text-decoration: none;
  letter-spacing: 0.02em;

  &:hover {
    color: var(--iw-accent-hover);
    text-decoration: underline;
  }
}

.work-thumb-link {
  flex-shrink: 0;
}

.work-thumb {
  width: 100px;
  height: 125px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  display: block;
  opacity: 0.9;
  transition: opacity var(--transition-speed) ease;

  &:hover {
    opacity: 1;
  }

  @media (min-width: 600px) {
    width: 140px;
    height: 175px;
  }
}

.submit-prompt {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.submit-note {
  font-size: 0.875rem;
  color: var(--text-muted);
  font-style: italic;
  margin: 0;
}

.submit-link {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--iw-accent);
  text-decoration: none;
  letter-spacing: 0.02em;

  &:hover {
    color: var(--iw-accent-hover);
    text-decoration: underline;
  }
}
</style>
