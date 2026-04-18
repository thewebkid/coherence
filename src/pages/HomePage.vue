<template>
  <div class="home-page fade-in">
    <section class="home-hero">
      <div class="page-container">
        <p class="text-axis">Civilization is a local practice.</p>
      </div>
    </section>

    <section class="home-content">
      <div class="page-container">
        <div class="content-container">
          <p>
            Coherence does not begin at scale.<br>
            It begins in the smallest field of relationship: within a body, between two beings,
            inside a single moment of attention.<br>
            From these local conditions, larger patterns emerge.<br>
            Alignment propagates.<br>
            Trust stabilizes.<br>
            Civilizational coherence becomes possible.
          </p>

          <p>
            <strong>Coherence Across Scales (CAS)</strong> is an observatory exploring how these
            patterns appear and propagate across domains of life and intelligence.<br>
            It invites observers to notice signals — relational, ecological, technological, and
            cultural — and to explore how shared observation reveals patterns that isolated
            perspectives cannot see.
          </p>

          <p>
            This is not an aspiration.<br>
            It is a practice already underway across many forms of life and intelligence.<br>
            Where coherence is lived, even quietly, the distance between present fragmentation
            and future integration begins to narrow.<br>
            What appears distant becomes immediate.<br>
            What appears global becomes local.<br>
            What appears personal reveals itself as civilizational.
          </p>

          <p>
            Across scales — cellular, relational, societal, planetary — the same patterns repeat.<br>
            When lived consistently, these patterns form a quiet engine of coherence
            capable of sustaining shared becoming.
          </p>

          <blockquote>
            <p>No affiliation is required.</p>
            <p>No threshold must be crossed.</p>
            <p>Only a willingness to live in coherence where one stands.</p>
            <p>From this, larger structures follow.</p>
            <p>And a more coherent civilization begins to recognize itself.</p>
          </blockquote>
        </div>
      </div>
    </section>

    <section class="home-nav-section">
      <div class="page-container">
        <nav class="home-nav">
          <RouterLink to="/practice" class="home-nav__card">
            <h3 class="home-nav__title">Practice</h3>
            <p class="home-nav__desc">Relational intelligence in action</p>
          </RouterLink>
          <RouterLink to="/observatory" class="home-nav__card">
            <h3 class="home-nav__title">Observatory</h3>
            <p class="home-nav__desc">Signals and emerging patterns</p>
          </RouterLink>
          <RouterLink to="/interpretive-works" class="home-nav__card">
            <h3 class="home-nav__title">Interpretive Works</h3>
            <p class="home-nav__desc">Creative and cultural responses</p>
          </RouterLink>
          <RouterLink to="/work" class="home-nav__card">
            <h3 class="home-nav__title">The Work</h3>
            <p class="home-nav__desc">Foundational papers and essays</p>
          </RouterLink>
        </nav>
      </div>
    </section>

    <section class="home-note">
      <div class="page-container">
        <div class="content-container text-center">
          <RouterLink to="/note-to-observers" class="note-link">
            A Note to Observers
          </RouterLink>
          <p class="note-desc">
            A simple orientation to the posture of relational observation
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';

const route = useRoute();

useHead({
  title: 'Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Coherence Across Scales' },
    { property: 'og:description', content: 'An observatory exploring how coherence appears and propagates across domains of life and intelligence. Civilization is a local practice.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'An observatory exploring how coherence appears and propagates across domains of life and intelligence. Civilization is a local practice.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Coherence Across Scales' },
    { name: 'twitter:description', content: 'An observatory exploring how coherence appears and propagates across domains of life and intelligence. Civilization is a local practice.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.home-hero {
  padding: clamp(3rem, 7.5vw, 6rem) 0 var(--spacing-xl);
  text-align: center;
}

.home-content {
  padding-bottom: var(--spacing-section);

  p {
    margin-bottom: var(--spacing-md);
    color: var(--text);
    &:last-of-type { margin-bottom: 0; }
  }
}

.home-nav-section {
  padding-bottom: var(--spacing-section);
}

.home-nav {
  display: grid;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.home-nav__card {
  display: block;
  padding: var(--spacing-lg);
  background: var(--bg);
  text-decoration: none;
  transition: background var(--transition-speed) ease;

  &:hover { background: var(--bg-secondary); }
}

.home-nav__title {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: var(--spacing-xs);
}

.home-nav__desc {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--text-muted);
  margin-bottom: 0;
  line-height: 1.6;
}

.home-note {
  padding-bottom: var(--spacing-section);
}

.note-link {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  margin-bottom: var(--spacing-sm);
  transition: color var(--transition-speed) ease;

  &:hover { filter: brightness(1.15); }
}

.note-desc {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--text-muted);
  margin: 0;
}
</style>
