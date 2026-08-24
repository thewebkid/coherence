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

<style lang="scss" scoped>
.aperture-page {
  background-color: var(--iw-bg);
  min-height: 100vh;
  padding: var(--spacing-lg) 0 var(--spacing-section);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: var(--spacing-xl);
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--iw-accent); }
}

.aperture-body {
  max-width: var(--content-width);
}

.aperture-title {
  font-family: var(--font-serif);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 400;
  font-style: italic;
  color: var(--iw-accent);
  margin-bottom: var(--spacing-xl);
}

.aperture-prose {
  p {
    font-family: var(--font-sans);
    font-size: 1.0625rem;
    line-height: 1.85;
    color: var(--text-muted);
    margin-bottom: var(--spacing-md);
  }
}

.aperture-rule {
  border: none;
  border-top: 1px solid var(--border);
  margin: var(--spacing-xl) 0;
  opacity: 0.5;
}

.image-field {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-section) * 1.5);
  // Break out of the content-width text column so images can breathe wider
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.image-entry {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &--landscape {
    // Break out of the 680px reading column to fill the page-container inner width.
    // Extra space each side = (page-width - 2×margin-page - content-width) / 2
    $extra: calc((var(--page-width) - 2 * var(--margin-page) - var(--content-width)) / 2);
    width: calc(100% + 2 * max(0px, #{$extra}));
    margin-left: calc(-1 * max(0px, #{$extra}));
  }
}

.movement-transition {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0.4;
  text-align: center;
  width: 100%;
  margin: calc(var(--spacing-section) * 0.5) 0;
}

.movement-image {
  width: 100%;
  max-width: 1200px;
  height: auto;
  display: block;

  &--landscape {
    max-width: none;
  }

  &--zoomable {
    cursor: zoom-in;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.92;
    }
  }
}

.aperture-closing {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--text-muted);
  opacity: 0.7;
}

.aperture-crosslinks {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.crosslink {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--iw-accent); }
}
</style>
