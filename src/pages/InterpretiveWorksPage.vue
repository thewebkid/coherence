<template>
  <div class="interpretive-works-page page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="page-header">
          <h1>Interpretive Works</h1>
          <p class="page-subtitle">Interpretations of the signals shaping our shared world.</p>
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

        <article class="work-entry work-entry--linked">
          <div class="work-entry-text">
            <div class="work-meta">
              <span class="work-creator">James Mahu and Lumina</span>
              <span class="work-sep">·</span>
              <span class="work-type">Writing</span>
            </div>
            <h2 class="work-title">{{ inversionDialogues.title }}</h2>
            <p class="work-subtitle">{{ inversionDialogues.tagline }}</p>
            <p class="work-excerpt">{{ inversionDialogues.summary }}</p>
            <RouterLink to="/inversion-dialogs" class="work-link">
              {{ inversionDialogues.cta }}
            </RouterLink>
          </div>
          <div class="work-thumbs">
            <RouterLink
              v-for="v in volumes"
              :key="v.slug"
              to="/inversion-dialogs"
              class="work-thumb-link"
              aria-hidden="true"
              tabindex="-1"
            >
              <img
                :src="v.thumbnail"
                :alt="`${v.title}: ${v.subtitle}`"
                class="work-thumb"
              />
            </RouterLink>
          </div>
        </article>

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
import { inversionDialogues, volumes } from '@/content/inversion-dialogs/index.js';
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

<style lang="scss" scoped></style>
