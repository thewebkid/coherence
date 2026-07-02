<template>
  <div class="manuscript-page fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="manuscript-header">
          <div class="manuscript-header-row">
            <h1>The Inversion Dialogues</h1>
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
          <MarkdownContent :source="currentChapter.content" />
        </article>

        <nav class="manuscript-chapter-nav">
          <button
            v-if="activeIndex > 0"
            class="manuscript-chapter-nav-btn"
            @click="prevChapter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            <span>{{ chapters[activeIndex - 1]?.title }}</span>
          </button>
          <div v-else />
          <button
            v-if="activeIndex < chapters.length - 1"
            class="manuscript-chapter-nav-btn manuscript-chapter-nav-next"
            @click="nextChapter"
          >
            <span>{{ chapters[activeIndex + 1]?.title }}</span>
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
            <span class="manuscript-chapters-panel-title">The Inversion Dialogues</span>
            <button class="manuscript-chapters-close" @click="isNavOpen = false" aria-label="Close chapters">&#x2715;</button>
          </div>
          <ul class="manuscript-chapters-list">
            <li v-for="(chapter, i) in chapters" :key="chapter.slug">
              <button
                class="manuscript-chapter-item"
                :class="{ 'is-active': i === activeIndex }"
                @click="selectFromNav(i)"
              >
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
import { chapters, getChapterIndex, defaultSlug } from '@/content/inversion-dialogs/index.js';

const route = useRoute();
const router = useRouter();

const isNavOpen = ref(false);

const activeIndex = ref(0);

function resolveFromRoute() {
  const idx = getChapterIndex(route.params.section);
  if (idx === -1) {
    router.replace(`/inversion-dialogs/${defaultSlug}`);
    return;
  }
  activeIndex.value = idx;
}

resolveFromRoute();

const currentChapter = computed(() => chapters[activeIndex.value]);

function setActiveSection(index) {
  router.push(`/inversion-dialogs/${chapters[index].slug}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectFromNav(index) {
  isNavOpen.value = false;
  setActiveSection(index);
}

function prevChapter() {
  if (activeIndex.value > 0) setActiveSection(activeIndex.value - 1);
}

function nextChapter() {
  if (activeIndex.value < chapters.length - 1) setActiveSection(activeIndex.value + 1);
}

function onKeydown(e) {
  if (e.key === 'Escape' && isNavOpen.value) isNavOpen.value = false;
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));

watch(() => route.params.section, () => {
  resolveFromRoute();
});

useHead({
  title: computed(() => `${currentChapter.value?.title || 'The Inversion Dialogues'} — The Inversion Dialogues — Coherence Across Scales`),
  meta: [
    { property: 'og:title', content: 'The Inversion Dialogues — Coherence Across Scales' },
    { property: 'og:description', content: 'The Inversion Dialogues — a manuscript in nineteen parts.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { name: 'description', content: 'The Inversion Dialogues — a manuscript in nineteen parts.' },
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

  :deep(.markdown-body) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    > * {
      max-width: 42ch;
    }

    // Thematic break (`---` in markdown) — generous space, echoing the
    // manuscript's title page. Robust to content edits since it doesn't
    // depend on paragraph order.
    hr {
      width: 80px;
      margin: var(--spacing-section) 0;
    }
  }
}
</style>
