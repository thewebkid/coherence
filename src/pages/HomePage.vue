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
          <p>Coherence does not begin at scale.</p>
          <p>
            It begins in the smallest field of relationship:<br>
            within a body,<br>
            between two beings,<br>
            inside a single moment of attention.
          </p>
          <p>From these local conditions, larger patterns emerge.</p>
          <p>Alignment propagates.</p>
          <p>Trust stabilizes.</p>
          <p>Civilizational coherence becomes possible.</p>
          <p>This is not an aspiration.</p>
          <p>It is a practice already underway across many forms of life and intelligence.</p>
          <p>
            Where coherence is lived, even quietly, the distance between present fragmentation
            and future integration begins to narrow.
          </p>
          <p>What appears distant becomes immediate.</p>
          <p>What appears global becomes local.</p>
          <p>What appears personal reveals itself as civilizational.</p>
          <p>
            Across scales — cellular, relational, societal, planetary —<br>
            the same patterns repeat.
          </p>
          <p>
            When lived consistently, they form a quiet engine of coherence capable of sustaining
            shared becoming and forms of stewardship that arise without hierarchy.
          </p>

          <blockquote>
            <p>No affiliation is required.</p>
            <p>No threshold must be crossed.</p>
            <p>Only a willingness to live in coherence where one stands.</p>
          </blockquote>

          <p>From this, larger structures follow.</p>
          <p>And a more coherent civilization begins to recognize itself.</p>
        </div>
      </div>
    </section>

    <section class="home-nav-section">
      <div class="page-container">
        <nav class="home-nav">
          <RouterLink
            v-for="link in siteLinks"
            :key="link.to"
            :to="link.to"
            class="home-nav__card"
          >
            <h3 class="home-nav__title">{{ link.title }}</h3>
            <p class="home-nav__desc">{{ link.description }}</p>
          </RouterLink>
        </nav>
      </div>
    </section>

    <section class="home-cta">
      <div class="page-container">
        <div class="content-container text-center">
          <RouterLink to="/civilizational-orientation" class="home-cta-link">
            A Civilizational Orientation
          </RouterLink>
          <p class="home-cta-desc">
            The entire arc of this work in one page.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Coherence Across Scales' },
    { property: 'og:description', content: 'A civilizational framework for coherence from the cellular and personal, through the relational and societal, to the planetary. Civilization is a local practice.' },
    { property: 'og:type', content: 'website' },
    { name: 'description', content: 'A civilizational framework for coherence from the cellular and personal, through the relational and societal, to the planetary. Civilization is a local practice.' },
  ],
});

const siteLinks = [
  {
    to: '/orientation',
    title: 'Orientation',
    description: 'Coherence from cellular to societal scale. Why this matters now.',
  },
  {
    to: '/glossary',
    title: 'Glossary',
    description: 'Core architecture defined. Terms that form the foundational language.',
  },
  {
    to: '/engine',
    title: 'The Engine of Coherence',
    description: 'Shared Becoming, Relational Coherence, Harmonized Sovereignty, Alignment, and Return.',
  },
  {
    to: '/work',
    title: 'The Work',
    description: 'The manuscript, slide deck, and handbook — readable online and available for download.',
  },
  {
    to: '/practice',
    title: 'Local Practice',
    description: 'How coherence becomes lived locally. An invitation, not an instruction.',
  },
  {
    to: '/contact',
    title: 'Stewardship',
    description: 'A pathway for thoughtful engagement with this work.',
  },
];
</script>

<style lang="scss" scoped>
@import '@/assets/styles/blockquote';

.home-hero {
  padding: clamp(3rem, 7.5vw, 6rem) 0 var(--spacing-xl);
  text-align: center;
}

.home-content {
  padding-bottom: var(--spacing-section);

  p {
    margin-bottom: var(--spacing-sm);
    color: var(--text);

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  blockquote {
    // Using shared blockquote styles from _blockquote.scss
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

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.home-nav__card {
  display: block;
  padding: var(--spacing-lg);
  background: var(--bg);
  text-decoration: none;
  transition: background var(--transition-speed) ease;

  &:hover {
    background: var(--bg-secondary);
  }
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

.home-cta {
  padding-bottom: var(--spacing-section);
}

.home-cta-link {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  margin-bottom: var(--spacing-sm);
  transition: color var(--transition-speed) ease;

  &:hover {
    color: var(--accent-hover);
  }
}

.home-cta-desc {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--text-muted);
  margin: 0;
}
</style>
