<template>
  <!-- Detail view when an image is selected -->
  <div v-if="selectedItem" ref="detailRoot" class="series-detail">
    <nav class="series-nav-bar" aria-label="Image navigation">
      <button
        class="nav-btn"
        :disabled="isFirst"
        :aria-label="`Previous image`"
        @click="navigate(-1)"
      >
        &lt; Previous
      </button>
      <span class="nav-position" aria-live="polite">{{ selectedIndex + 1 }}/{{ media.length }}</span>
      <button
        class="nav-btn"
        :disabled="isLast"
        :aria-label="`Next image`"
        @click="navigate(1)"
      >
        Next &gt;
      </button>
    </nav>

    <figure class="detail-figure">
      <img
        :src="selectedItem.src"
        :alt="selectedItem.alt"
        class="detail-image"
      />
    </figure>

    <div class="detail-content">
      <h2 class="detail-title">{{ selectedItem.title }}</h2>

      <div class="detail-description">
        <p v-for="(line, i) in descriptionLines" :key="i">{{ line }}</p>
      </div>

      <nav class="detail-links" aria-label="Image actions">
        <a
          class="detail-link detail-link--disabled"
          aria-disabled="true"
          role="link"
          tabindex="-1"
          @click.prevent
        >About</a>
        <a
          class="detail-link detail-link--disabled"
          aria-disabled="true"
          role="link"
          tabindex="-1"
          @click.prevent
        >Companion essay</a>
        <button
          v-if="!isLast"
          class="detail-link"
          @click="navigate(1)"
        >
          Next &gt;
        </button>
        <a
          class="detail-link detail-link--disabled"
          aria-disabled="true"
          role="link"
          tabindex="-1"
          @click.prevent
        >Download high-resolution image</a>
      </nav>

      <button class="back-to-gallery" @click="backToGallery">
        ← Back to gallery
      </button>
    </div>
  </div>

  <!-- Gallery grid view -->
  <div v-else class="series-gallery">
    <header class="gallery-header">
      <h1 class="gallery-title">{{ work.title }}</h1>
      <p v-if="work.subtitle" class="gallery-subtitle">{{ work.subtitle }}</p>
      <div v-if="work.intro" class="gallery-intro">
        <p v-for="(line, i) in introLines" :key="i">{{ line }}</p>
      </div>
    </header>

    <div class="gallery-grid" role="list">
      <div
        v-for="item in media"
        :key="item.number"
        class="gallery-grid-item"
        role="listitem"
      >
        <button
          class="gallery-thumb-btn"
          :aria-label="`View image ${item.number}: ${item.title}`"
          v-b-tooltip.focus.top="item.alt"
          @click="select(item.number)"
        >
          <img
            :src="item.thumbSrc"
            :alt="item.alt"
            class="gallery-thumb"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  work: { type: Object, required: true },
});

const route = useRoute();
const router = useRouter();
const detailRoot = ref(null);

const media = computed(() => props.work.media ?? []);

const selectedIndex = computed(() => {
  const n = parseInt(route.query.image, 10);
  if (isNaN(n)) return -1;
  return media.value.findIndex((item) => item.number === n);
});

const selectedItem = computed(() =>
  selectedIndex.value >= 0 ? media.value[selectedIndex.value] : null
);

const isFirst = computed(() => selectedIndex.value <= 0);
const isLast = computed(() => selectedIndex.value >= media.value.length - 1);

const descriptionLines = computed(() =>
  selectedItem.value?.description
    ? selectedItem.value.description.split('\n').filter((l) => l.trim())
    : []
);

const introLines = computed(() =>
  props.work.intro ? props.work.intro.split('\n').filter((l) => l.trim()) : []
);

watch(selectedIndex, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function select(number) {
  router.push({ query: { ...route.query, image: number } });
}

function navigate(dir) {
  const next = media.value[selectedIndex.value + dir];
  if (next) select(next.number);
}

function backToGallery() {
  const query = { ...route.query };
  delete query.image;
  router.push({ query });
}
</script>

<style lang="scss" scoped>
/* ─── Detail View ─────────────────────────────────────────── */

.series-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.series-nav-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
}

.nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  color: var(--text-muted);
  padding: 0;
  transition: color var(--transition-speed);

  &:hover:not(:disabled) {
    color: var(--iw-accent);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.nav-position {
  color: var(--text-muted);
  min-width: 3.5rem;
  text-align: center;
}

.detail-figure {
  margin: 0 0 var(--spacing-lg);
  width: 100%;
  max-width: 560px;
}

.detail-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-sm);
}

.detail-content {
  width: 100%;
  max-width: 560px;
}

.detail-title {
  font-family: var(--font-serif);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 400;
  line-height: 1.3;
  margin-bottom: var(--spacing-sm);
}

.detail-description {
  margin-bottom: var(--spacing-lg);

  p {
    font-size: 0.9375rem;
    line-height: 1.75;
    margin: 0 0 0.15rem;
    color: var(--text);
  }
}

.detail-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: var(--spacing-lg);
}

.detail-link {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--iw-accent);
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  letter-spacing: 0.01em;
  transition: color var(--transition-speed);

  &:hover:not(.detail-link--disabled):not(:disabled) {
    color: var(--iw-accent-hover);
    text-decoration: underline;
  }

  &--disabled {
    color: var(--text-muted);
    opacity: 0.55;
    cursor: not-allowed;
    pointer-events: none;
    text-decoration: none;
  }
}

.back-to-gallery {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  letter-spacing: 0.02em;
  transition: color var(--transition-speed);

  &:hover {
    color: var(--iw-accent);
  }
}

/* ─── Gallery Grid View ───────────────────────────────────── */

.series-gallery {
  width: 100%;
}

.gallery-header {
  margin-bottom: var(--spacing-xl);
}

.gallery-title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: var(--spacing-xs);
}

.gallery-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.125rem;
  color: var(--text-muted);
  margin-bottom: var(--spacing-lg);
}

.gallery-intro {
  max-width: 680px;
  margin-top: var(--spacing-sm);

  p {
    line-height: var(--iw-line-height-prose, 2);
    margin-bottom: var(--spacing-sm);
    color: var(--text);
  }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: var(--spacing-xs);

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--spacing-sm);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
}

.gallery-grid-item {
  min-width: 0;
}

.gallery-thumb-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: block;
  width: 100%;
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: opacity var(--transition-speed), transform var(--transition-speed);

  &:hover {
    opacity: 0.82;
    transform: scale(1.015);
  }

  &:focus-visible {
    outline: 2px solid var(--iw-accent);
    outline-offset: 2px;
  }
}

.gallery-thumb {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius-sm);
}
</style>
