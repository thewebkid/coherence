<template>
  <div class="home-page fade-in">
    <section class="home-hero">
      <div class="page-container">
        <p class="text-axis">Civilization is a local practice.</p>
        <div class="home-framing">
          <p>
            Coherence Across Scales is a framework for understanding and practicing
            coherence — from the cellular and personal, through the relational and societal,
            to the civilizational and planetary.
          </p>
          <p>
            It is not a theory to adopt but a pattern to recognize:
            one already present wherever life learns to relate without losing itself.
          </p>
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
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Coherence Across Scales' },
    { property: 'og:description', content: 'A civilizational language of coherence from the personal to the planetary.' },
    { property: 'og:type', content: 'website' },
    { name: 'description', content: 'A civilizational language of coherence from the personal to the planetary. Civilization is a local practice.' },
  ],
});

const siteLinks = [
  {
    to: '/orientation',
    title: 'Orientation',
    description: 'Coherence from cellular to societal scale. Why this matters now.',
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
.home-hero {
  padding: clamp(4rem, 12vw, 10rem) 0 var(--spacing-section);
  text-align: center;
}

.text-axis {
  margin-bottom: 2.5rem;
}

.home-framing {
  max-width: 580px;
  margin: 0 auto;
  font-size: 1.0625rem;
  color: var(--text-muted);
  line-height: 1.85;

  p:last-child {
    margin-bottom: 0;
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
  border-radius: 4px;
  overflow: hidden;
}

.home-nav__card {
  display: block;
  padding: 1.75rem 2rem;
  background: var(--bg);
  text-decoration: none;
  transition: background var(--transition-speed) ease;

  &:hover {
    background: var(--bg-secondary);
  }
}

.home-nav__title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 0.375rem;
}

.home-nav__desc {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  color: var(--text-muted);
  margin-bottom: 0;
  line-height: 1.6;
}
</style>
