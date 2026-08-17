<template>
  <div class="manuscript-page fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="manuscript-header">
          <h1 class="inversion-landing-title">The Inversion Dialogues</h1>
          <p class="inversion-landing-subtitle">a trilogy</p>
        </header>

        <div class="volume-tiles">
          <component
            :is="v.forthcoming ? 'article' : 'RouterLink'"
            v-for="v in volumes"
            :key="v.slug"
            :to="v.forthcoming ? undefined : `/inversion-dialogs/${v.slug}/title`"
            class="volume-tile"
            :class="{ 'is-forthcoming': v.forthcoming }"
          >
            <img
              v-if="v.thumbnail || v.image"
              :src="v.thumbnail || v.image"
              :alt="`${v.title} cover`"
              class="volume-tile-image"
              loading="lazy"
            />
            <div v-else class="volume-tile-image volume-tile-placeholder" aria-hidden="true" />
            <div class="volume-tile-body">
              <h2 class="volume-tile-title">{{ v.title }}</h2>
              <p class="volume-tile-subtitle">{{ v.forthcoming ? 'Forthcoming' : v.subtitle }}</p>
            </div>
          </component>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL } from '@/constants/seo';
import { volumes } from '@/content/inversion-dialogs/index.js';

const route = useRoute();

useHead({
  title: 'The Inversion Dialogues — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'The Inversion Dialogues — Coherence Across Scales' },
    { property: 'og:description', content: 'The Inversion Dialogues — a trilogy.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { name: 'description', content: 'The Inversion Dialogues — a trilogy.' },
  ],
});
</script>
