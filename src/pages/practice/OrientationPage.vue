<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice</p>
          <h1>Orientation</h1>
        </header>

        <div class="orientation-page__intro">
          <p>
            What follows is not instruction.<br>
            It is a reorientation—<br>
            a shift in how observation is held.
          </p>
          <p class="orientation-page__sep">—</p>
          <p>
            You are not beginning something new.<br>
            You are noticing something that is already happening.
          </p>
          <p>
            Something is forming—<br>
            across moments, across people.
          </p>
          <p class="orientation-page__sep">—</p>
          <p>
            Across many moments, in many places,<br>
            people are pausing—<br>
            not to withdraw,<br>
            but to see more clearly.
          </p>
          <p>
            They are noticing what is present<br>
            before they move to interpret it.<br>
            They are allowing moments to remain open<br>
            a little longer than usual.
          </p>
          <p>
            Nothing is coordinated.<br>
            Nothing is announced.<br>
            And yet—<br>
            something is forming.
          </p>
          <p class="orientation-page__sep">—</p>
          <p>
            This is the Observational Network.
          </p>
          <p>
            Not a system you join.<br>
            Not a role you take on.
          </p>
          <p>
            But a way of relating<br>
            that begins wherever you are.<br>
            A way of contributing to a shared becoming.
          </p>
          <p class="orientation-page__sep">—</p>
          <p>
            When observation is held without collapse,<br>
            and interpretation is allowed to follow rather than lead,<br>
            a different kind of coherence begins to appear.
          </p>
          <p>A relational coherence.</p>
          <p>It is revealed.</p>
          <p class="orientation-page__sep">—</p>
          <p>
            The three documents below are not instructions.<br>
            They are orientations—<br>
            each pointing to a different aspect of this shift:
          </p>
          <p>
            <em>A Note to Observers</em> → the invitation<br>
            <em>Stability &amp; Permeability</em> → the internal system<br>
            <em>The First Act of Observation</em> → the lived entry
          </p>
          <p class="orientation-page__sep">—</p>
          <p>
            You do not need to read them in sequence.<br>
            You do not need to complete them.<br>
            You only need to begin noticing.
          </p>
          <p class="orientation-page__sep">—</p>
          <p>Enter where you are.</p>
        </div>

        <section class="orientation-page__documents" aria-labelledby="orientation-documents-heading">
          <h2 id="orientation-documents-heading" class="orientation-page__documents-title">
            Document Entry Points
          </h2>
          <div class="orientation-cards">
            <RouterLink
              v-for="card in documentCards"
              :key="card.path"
              :to="card.path"
              class="orientation-card"
            >
              <div class="orientation-card__header">
                <h3>{{ card.title }}</h3>
                <p class="orientation-card__label"><em>{{ card.label }}</em></p>
              </div>
              <span class="orientation-card__link">Read →</span>
            </RouterLink>
          </div>
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

const documentCards = [
  {
    title: 'A Note to Observers',
    label: 'Invitation',
    path: '/note-to-observers',
  },
  {
    title: 'Stability & Permeability',
    label: 'Internal System',
    path: '/practice/stability-and-permeability',
  },
  {
    title: 'The First Act of Observation',
    label: 'Lived Entry',
    path: '/practice/first-act-of-observation',
  },
];

useHead({
  title: 'Orientation — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Orientation — Coherence Across Scales' },
    { property: 'og:description', content: 'An introduction to the Observational Network and three orientation documents for relational observation.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'An introduction to the Observational Network and three orientation documents for relational observation.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Orientation — Coherence Across Scales' },
    { name: 'twitter:description', content: 'An introduction to the Observational Network and three orientation documents for relational observation.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.orientation-page__intro {
  margin-bottom: var(--spacing-xl);
}

.orientation-page__sep {
  //text-align: center;
  color: var(--text-muted);
  margin: var(--spacing-md) 0 !important;
}

.orientation-page__documents {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
}

.orientation-page__documents-title {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: var(--spacing-lg);
}

.orientation-cards {
  display: grid;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.orientation-card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  background: var(--bg);
  text-decoration: none;
  transition: background var(--transition-speed) ease;
  min-height: 100%;

  &:hover {
    background: var(--bg-secondary);
    .orientation-card__link { color: var(--accent); }
  }
}

.orientation-card__header {
  margin-bottom: var(--spacing-sm);
  flex: 1;

  h3 {
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 4px;
  }
}

.orientation-card__label {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--text-muted);
  margin: 0;
}

.orientation-card__link {
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--text-muted);
  transition: color var(--transition-speed) ease;
  margin-top: auto;
}
</style>
