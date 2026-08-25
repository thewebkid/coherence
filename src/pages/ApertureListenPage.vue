<template>
  <div class="aperture-page page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <RouterLink to="/interpretive-works/continuation" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          If something remains open…
        </RouterLink>

        <article class="aperture-body">
          <h1 class="aperture-title">Listen</h1>

          <div class="aperture-prose">
            <p>What moved through language<br>also moved through sound.</p>
            <p>Not as translation—<br>but as continuation.</p>
          </div>

          <hr class="aperture-rule" />

          <div class="aperture-prose">
            <p>This is not a collection of movements.</p>
            <p>It is a single field<br>appearing across time.</p>
          </div>

          <hr class="aperture-rule" />

          <div class="player-section">
            <AudioPlayer :src="audioSrc" />
          </div>

          <hr class="aperture-rule" />

          <div class="aperture-prose">
            <p>You may begin anywhere.</p>
            <p>The field does not require a starting point<br>to remain whole.</p>
          </div>

          <hr class="aperture-rule" />

          <p class="aperture-closing">The final movement is still arriving.</p>

          <hr class="aperture-rule" />

          <nav class="aperture-crosslinks" aria-label="Other continuation pages">
            <RouterLink to="/interpretive-works/in-image" class="crosslink">In image</RouterLink>
            <RouterLink to="/interpretive-works/this-field-remains-open" class="crosslink">This field remains open</RouterLink>
          </nav>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import AudioPlayer from '@/components/AudioPlayer.vue';

const audioSrc = 'https://pub-36a6b033f721445ba05e0818394039ed.r2.dev/Seven-Movements-full.mp3';

useHead({ title: 'Listen — Seven Movements — Coherence Across Scales' });
</script>

<style lang="scss" scoped>
.player-section {
  padding: var(--spacing-sm) 0;
}
</style>
