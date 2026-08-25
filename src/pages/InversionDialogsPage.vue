<template>
  <div class="manuscript-page fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="manuscript-header">
          <div class="manuscript-header-row">
            <h1>
              The Inversion Dialogues
              <span class="manuscript-header-volume">{{ currentVolume.title }}</span>
            </h1>
            <button class="manuscript-chapters-toggle" @click="isNavOpen = true" aria-label="Open chapter list">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
              <span>Chapters</span>
            </button>
          </div>
        </header>

        <article
          class="manuscript-article manuscript-prose"
          :class="{ 'title-page': currentChapter.layout === 'title' }"
        >
          <img
            v-if="currentChapter.cover"
            :src="currentChapter.cover"
            :alt="`${currentVolume.title} cover`"
            class="manuscript-title-image"
            @click="lightboxSrc = currentChapter.cover"
          />
          <ImageLightbox
            :src="lightboxSrc"
            :alt="`${currentVolume.title} cover`"
            @close="lightboxSrc = null"
          />
          <MarkdownContent :source="currentChapter.content" />
        </article>

        <nav class="manuscript-chapter-nav">
          <button
            v-if="prevTarget"
            class="manuscript-chapter-nav-btn"
            @click="goTo(prevTarget)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            <span>{{ prevTarget.label }}</span>
          </button>
          <div v-else />
          <button
            v-if="nextTarget"
            class="manuscript-chapter-nav-btn manuscript-chapter-nav-next"
            @click="goTo(nextTarget)"
          >
            <span>{{ nextTarget.label }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </nav>

      </div>
    </div>

    <!-- Chapters flyout -->
    <Teleport to="body">
    <Transition name="manuscript-flyout">
      <div v-if="isNavOpen" class="manuscript-chapters-flyout">
        <aside class="manuscript-chapters-panel">
          <div class="manuscript-chapters-panel-header">
          <div class="manuscript-chapters-panel-titles">
            <RouterLink
              to="/inversion-dialogs"
              class="manuscript-chapters-panel-title manuscript-chapters-panel-home"
              aria-label="All volumes"
              @click="isNavOpen = false"
            >The Inversion Dialogues</RouterLink>
            <RouterLink
              to="/inversion-dialogs/about"
              class="manuscript-chapters-panel-about"
              @click="isNavOpen = false"
            >About the Dialogues</RouterLink>
          </div>
          <button class="manuscript-chapters-close" @click="isNavOpen = false" aria-label="Close chapters">&#x2715;</button>
        </div>

          <ul class="manuscript-chapters-list">
            <li v-for="(chapter, i) in currentVolume.chapters" :key="chapter.slug">
              <button
                class="manuscript-chapter-item"
                :class="{ 'is-active': i === activeIndex }"
                @click="selectFromNav(i)"
              >
                <span v-if="chapter.layout === 'title'" class="manuscript-chapter-item-volume">{{ currentVolume.title }}</span>
                <span class="manuscript-chapter-item-title">{{ chapter.title }}</span>
                <span v-if="chapter.subtitle" class="manuscript-chapter-item-subtitle">{{ chapter.subtitle }}</span>
              </button>
            </li>
          </ul>
        </aside>
        <div class="manuscript-chapters-backdrop" @click="isNavOpen = false" />
      </div>
    </Transition>
  </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL } from '@/constants/seo';
import MarkdownContent from '@/components/MarkdownContent.vue';
import ImageLightbox from '@/components/ImageLightbox.vue';
import { volumes, defaultVolumeSlug, getVolumeBySlug } from '@/content/inversion-dialogs/index.js';

const route = useRoute();
const router = useRouter();

const isNavOpen = ref(false);
const activeIndex = ref(0);
const lightboxSrc = ref(null);

const currentVolume = ref(volumes[0]);

function resolveFromRoute() {
  const vol = getVolumeBySlug(route.params.volume) || getVolumeBySlug(defaultVolumeSlug);

  // A forthcoming volume has no chapters yet — the space is simply quiet.
  if (vol.forthcoming) {
    router.replace(`/inversion-dialogs/${defaultVolumeSlug}/title`);
    return;
  }

  currentVolume.value = vol;

  const slug = route.params.section || vol.defaultSlug;
  const idx = vol.getChapterIndex(slug);
  if (idx === -1) {
    router.replace(`/inversion-dialogs/${vol.slug}/${vol.defaultSlug}`);
    return;
  }
  activeIndex.value = idx;
}

resolveFromRoute();

const currentChapter = computed(() => currentVolume.value.chapters[activeIndex.value] || {});

// ── Navigation across chapters and volume boundaries ────────────────────────

const prevTarget = computed(() => {
  if (activeIndex.value > 0) {
    const c = currentVolume.value.chapters[activeIndex.value - 1];
    return { volumeSlug: currentVolume.value.slug, slug: c.slug, label: c.title };
  }
  // Crossing into the previous volume's last chapter
  const prevVol = volumes[volumes.findIndex((v) => v.slug === currentVolume.value.slug) - 1];
  if (prevVol && !prevVol.forthcoming && prevVol.chapters.length) {
    const last = prevVol.chapters[prevVol.chapters.length - 1];
    return { volumeSlug: prevVol.slug, slug: last.slug, label: last.title };
  }
  return null;
});

const nextTarget = computed(() => {
  const chapters = currentVolume.value.chapters;
  if (activeIndex.value < chapters.length - 1) {
    const c = chapters[activeIndex.value + 1];
    return { volumeSlug: currentVolume.value.slug, slug: c.slug, label: c.title };
  }
  // Crossing into the next volume's first chapter (title page)
  const nextVol = volumes[volumes.findIndex((v) => v.slug === currentVolume.value.slug) + 1];
  if (nextVol && !nextVol.forthcoming && nextVol.chapters.length) {
    const first = nextVol.chapters[0];
    return { volumeSlug: nextVol.slug, slug: first.slug, label: first.title };
  }
  return null;
});

function goTo(target) {
  router.push(`/inversion-dialogs/${target.volumeSlug}/${target.slug}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectFromNav(index) {
  isNavOpen.value = false;
  const c = currentVolume.value.chapters[index];
  router.push(`/inversion-dialogs/${currentVolume.value.slug}/${c.slug}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function onKeydown(e) {
  if (e.key === 'Escape' && isNavOpen.value) isNavOpen.value = false;
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));

watch(() => [route.params.volume, route.params.section], () => {
  resolveFromRoute();
});

useHead({
  title: computed(() => currentChapter.value?.title === 'The Inversion Dialogues'
    ? `${currentVolume.value.title} — The Inversion Dialogues — Coherence Across Scales`
    : `${currentChapter.value?.title || 'The Inversion Dialogues'} — ${currentVolume.value.title} — Coherence Across Scales`),
  meta: [
    { property: 'og:title', content: 'The Inversion Dialogues — Coherence Across Scales' },
    { property: 'og:description', content: 'The Inversion Dialogues — a manuscript in volumes.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { name: 'description', content: 'The Inversion Dialogues — a manuscript in volumes.' },
  ],
});
</script>

<style lang="scss" scoped>
// Title page — centered frontispiece layout, unique to this one chapter.
// Uses flexbox (rather than text-align + nth-of-type targeting) so every
// element centers reliably regardless of how many paragraphs the content has.
.title-page {
  margin-left: auto;
  margin-right: auto;

  .manuscript-title-image {
    margin-bottom: 3rem;
  }

  :deep(.markdown-body) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    > * {
      max-width: 42ch;
    }

    h1 {
      margin-bottom: 1.75rem;
    }
  }
}
</style>
