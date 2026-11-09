<template>
  <div class="mutual-assistance-page page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="page-header">
          <h1>The Practice of Mutual Assistance</h1>
        </header>

        <div class="page-intro">
          <p>Mutual Assistance is a relational practice for differentiated participants learning how to become useful to relation without surrendering sovereignty, discernment, or difference.</p>
          <p>It can be entered through practice, explored through its deeper relational architecture, or observed through the movements that become recognizable in locality.</p>
        </div>

        <div class="ma-divider" />

        <section class="apertures">
          <article
            v-for="aperture in apertures"
            :key="aperture.title"
            class="aperture-entry"
          >
            <div class="aperture-text">
              <p class="aperture-eyebrow">{{ aperture.eyebrow }}</p>
              <h2 class="aperture-title">
                <RouterLink :to="aperture.to" class="aperture-link">{{ aperture.title }}</RouterLink>
              </h2>
              <p v-if="aperture.subtitle" class="aperture-subtitle">{{ aperture.subtitle }}</p>
              <RouterLink :to="aperture.to" class="aperture-thumb-link" :aria-label="aperture.title">
                <img :src="aperture.thumbnail" :alt="aperture.title" class="aperture-thumb" />
              </RouterLink>
              <p class="aperture-desc">{{ aperture.description }}</p>
              <RouterLink :to="aperture.to" class="aperture-link-text">
                {{ aperture.linkLabel }} →
              </RouterLink>
            </div>
          </article>
        </section>

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

const apertures = [
  {
    eyebrow: 'Presence',
    title: 'The Booklet',
    subtitle: 'An Invitation to Relational Practice',
    to: '/mutual-assistance/booklet',
    thumbnail: '/img/mci/The-Practice-of-Mutual-Assistance-Booklet.jpg',
    description: 'A brief invitation into the Practice of Mutual Assistance. Begin with a simple orientation, bring it into an actual relationship, and notice what becomes available for discernment, participation, consequence, and Return.',
    linkLabel: 'Read the booklet',
  },
  {
    eyebrow: 'Movement',
    title: 'The Full Manuscript',
    subtitle: 'A Relational Ecology for a More Inhabitable World',
    to: '/mutual-assistance/manuscript',
    thumbnail: '/img/mci/The-Practice-of-Mutual-Assistance.jpg',
    description: 'A deeper exploration of the relational architecture beneath Mutual Assistance: sovereignty, difference, consequence, continuity, correspondence, Return, behavioral wisdom, and the widening from differentiated participants toward mutual locality.',
    linkLabel: 'Read the manuscript',
  },
  {
    eyebrow: 'Trace',
    title: 'Movement Continuity Instrument (MCI)',
    to: '/mutual-assistance/mci',
    thumbnail: '/img/mci/Movement-Continuity-Instrument.jpg',
    description: 'An observational instrument for noticing movements that become recognizable in you under different relational conditions. MCI does not score coherence or prescribe better responses. It makes participation observable and, through Return, allows observation to acquire continuity.',
    linkLabel: 'Begin an observation',
  },
];

useHead({
  title: 'The Practice of Mutual Assistance — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'The Practice of Mutual Assistance — Coherence Across Scales' },
    { property: 'og:description', content: 'Mutual Assistance is a relational practice for differentiated participants learning how to become useful to relation without surrendering sovereignty, discernment, or difference.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'Mutual Assistance is a relational practice for differentiated participants learning how to become useful to relation without surrendering sovereignty, discernment, or difference.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'The Practice of Mutual Assistance — Coherence Across Scales' },
    { name: 'twitter:description', content: 'A relational practice for differentiated participants learning how to become useful to relation without surrendering sovereignty, discernment, or difference.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.mutual-assistance-page {
  .page-intro {
    max-width: var(--content-width);
    margin-bottom: var(--spacing-lg);
  }

  .page-intro p {
    line-height: 1.8;
  }
}

.ma-divider {
  border-top: 1px solid var(--border);
  margin: var(--spacing-xl) 0;
}

.apertures {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.aperture-entry {
  display: flow-root;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) min(16rem, 34%);
    column-gap: var(--spacing-xl);
    align-items: start;
  }
}

.aperture-text {
  min-width: 0;

  @media (min-width: 768px) {
    display: contents;
  }
}

.aperture-eyebrow {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 var(--spacing-xs);
}

.aperture-title {
  font-family: var(--font-sans);
  font-size: clamp(1.4rem, 3vw, 1.85rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  margin: 0 0 var(--spacing-xs);
}

.aperture-link {
  color: var(--text);
  text-decoration: none;

  &:hover {
    color: var(--accent);
  }
}

.aperture-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--text-muted);
  margin: 0 0 var(--spacing-md);
}

.aperture-desc {
  line-height: 1.8;
  color: var(--text);
  margin: 0 0 var(--spacing-md);
}

.aperture-link-text {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-speed) ease;

  &:hover {
    color: var(--text);
  }
}

.aperture-eyebrow,
.aperture-title,
.aperture-subtitle,
.aperture-desc,
.aperture-link-text {
  @media (min-width: 768px) {
    grid-column: 1;
  }
}

.aperture-thumb-link {
  float: right;
  line-height: 0;
  width: 4.75rem;
  margin: 0.2rem 0 0.35rem 0.85rem;

  @media (min-width: 768px) {
    float: none;
    grid-column: 2;
    grid-row: 1 / span 6;
    width: 100%;
    margin: 0;
  }
}

.aperture-entry:nth-child(even) .aperture-thumb-link {
  float: left;
  margin: 0.2rem 0.85rem 0.35rem 0;

  @media (min-width: 768px) {
    float: none;
    margin: 0;
  }
}

.aperture-thumb {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}
</style>
