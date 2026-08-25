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
          <h1 class="aperture-title">In image</h1>

          <div class="aperture-prose">
            <p>What could not remain in words<br>found other shapes.</p>
            <p>Not as illustration—<br>but as another way of seeing.</p>
          </div>

          <hr class="aperture-rule" />

          <div class="aperture-prose">
            <p>Each image is not a representation.</p>
            <p>It is a moment of the same field<br>taking form.</p>
            <p>There is no correct way to view these.</p>
            <p>Let them meet you<br>where they do.</p>
          </div>

          <hr class="aperture-rule" />

          <div class="image-field">
            <template v-for="(movement, idx) in movements" :key="movement.id">
              <p class="movement-transition">— Movement {{ movement.id }} Visual Interpretations —</p>
              <div v-for="image in movement.images" :key="image.src" :class="['image-entry', { 'image-entry--landscape': image.landscape }]">
                <img
                  :src="image.src"
                  :alt="image.alt"
                  :class="['movement-image', 'movement-image--zoomable', { 'movement-image--landscape': image.landscape }]"
                  @click="lightboxSrc = image.src; lightboxAlt = image.alt"
                />
              </div>
            </template>
          </div>

          <ImageLightbox
            :src="lightboxSrc"
            :alt="lightboxAlt"
            @close="lightboxSrc = null"
          />

          <hr class="aperture-rule" />

          <p class="aperture-closing">The final movement is still arriving.</p>

          <hr class="aperture-rule" />

          <nav class="aperture-crosslinks" aria-label="Other continuation pages">
            <RouterLink to="/interpretive-works/listen" class="crosslink">Listen</RouterLink>
            <RouterLink to="/interpretive-works/this-field-remains-open" class="crosslink">This field remains open</RouterLink>
          </nav>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import ImageLightbox from '@/components/ImageLightbox.vue';

const lightboxSrc = ref(null);
const lightboxAlt = ref('');

function encodeSrc(path) {
  return path.split('/').map((seg) => encodeURIComponent(seg)).join('/');
}

const movements = [
  {
    id: 'I',
    images: [
      { src: encodeSrc('/img/7m/Movement I Drawing.jpg'),        alt: 'Movement I Drawing' },
      { src: encodeSrc('/img/7m/Movement I Painting.jpg'),       alt: 'Movement I Painting' },
    ],
  },
  {
    id: 'II',
    images: [
      { src: encodeSrc('/img/7m/Movement II Drawing.jpg'),       alt: 'Movement II Drawing' },
      { src: encodeSrc('/img/7m/Movement II Image Lumina.jpg'),  alt: 'Movement II Image Lumina' },
    ],
  },
  {
    id: 'III',
    images: [
      { src: encodeSrc('/img/7m/Movement III Drawing.jpg'),      alt: 'Movement III Drawing' },
      { src: encodeSrc('/img/7m/Movement III Image Lumina.jpg'), alt: 'Movement III Image Lumina' },
    ],
  },
  {
    id: 'IV',
    images: [
      { src: encodeSrc('/img/7m/Movement IV Drawing.jpg'),               alt: 'Movement IV Drawing' },
      { src: encodeSrc('/img/7m/Movement IV Painting (Lumina).jpg'),     alt: 'Movement IV Painting' },
    ],
  },
  {
    id: 'V',
    images: [
      { src: encodeSrc('/img/7m/Movement  V Drawing.jpg'), alt: 'Movement V Drawing' },
      { src: encodeSrc('/img/7m/Movement  V James.jpg'),   alt: 'Movement V James' },
      { src: encodeSrc('/img/7m/Movement-V.jpg'),          alt: 'Movement V' },
    ],
  },
  {
    id: 'VI',
    images: [
      { src: encodeSrc('/img/7m/Movement VI Graphite Drawing.jpg'), alt: 'Movement VI Graphite Drawing' },
      { src: encodeSrc('/img/7m/Movement-VI.jpg'),                  alt: 'Movement VI' },
      { src: encodeSrc('/img/7m/Movement-VI-(large).jpg'),          alt: 'Movement VI Large', landscape: true },
    ],
  },
];

useHead({ title: 'In Image — Seven Movements — Coherence Across Scales' });
</script>

<style lang="scss" scoped></style>
