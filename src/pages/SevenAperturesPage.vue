<template>
  <div class="manuscript-page fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="manuscript-header">
          <RouterLink to="/interpretive-works" class="manuscript-back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Interpretive Works
          </RouterLink>
          <div class="manuscript-header-row">
            <h1>Seven Apertures</h1>
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

        <article class="manuscript-article manuscript-prose">
          <MarkdownContent :source="currentChapter.content" />
          <PermeabilityDiagram v-if="currentChapter.diagram === 'permeability'" />
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

        <div class="manuscript-footer">
          <DownloadButton
            href="/pdf/Seven Apertures (First Edition).pdf"
            label="Download Full Manuscript (PDF)"
          />
        </div>

      </div>
    </div>

    <!-- Chapters flyout -->
    <Teleport to="body">
    <Transition name="manuscript-flyout">
      <div v-if="isNavOpen" class="manuscript-chapters-flyout">
        <aside class="manuscript-chapters-panel">
          <div class="manuscript-chapters-panel-header">
            <span class="manuscript-chapters-panel-title">Seven Apertures</span>
            <button class="manuscript-chapters-close" @click="isNavOpen = false" aria-label="Close chapters">&#x2715;</button>
          </div>
          <ul class="manuscript-chapters-list">
            <li v-for="(chapter, i) in chapters" :key="i">
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
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';
import MarkdownContent from '@/components/MarkdownContent.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import PermeabilityDiagram from '@/components/PermeabilityDiagram.vue';
import { chapters } from '@/content/seven-apertures/index.js';

const route = useRoute();
const router = useRouter();

const activeIndex = ref(0);
const isNavOpen = ref(false);

if (route.query.section) {
  const idx = parseInt(route.query.section, 10);
  if (idx >= 0 && idx < chapters.length) {
    activeIndex.value = idx;
  }
}

const currentChapter = computed(() => chapters[activeIndex.value]);

function setActiveSection(index) {
  activeIndex.value = index;
  router.replace({ query: { section: index } });
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

watch(() => route.query.section, (val) => {
  if (val !== undefined) {
    const idx = parseInt(val, 10);
    if (idx >= 0 && idx < chapters.length && idx !== activeIndex.value) {
      activeIndex.value = idx;
    }
  }
});

useHead({
  title: computed(() => `${currentChapter.value?.title || 'Seven Apertures'} — Interpretive Works — Coherence Across Scales`),
  meta: [
    { property: 'og:title', content: 'Seven Apertures — Coherence Across Scales' },
    { property: 'og:description', content: 'A manuscript in seven apertures — seven conditions through which coherence becomes available relationally.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: '/img/7a/7a-cover.jpg' },
    { name: 'description', content: 'A manuscript in seven apertures — seven conditions through which coherence becomes available relationally.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Seven Apertures — Coherence Across Scales' },
    { name: 'twitter:description', content: 'A manuscript in seven apertures — seven conditions through which coherence becomes available relationally.' },
    { name: 'twitter:image', content: '/img/7a/7a-cover.jpg' },
  ],
});
</script>