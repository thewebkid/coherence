<template>
  <div class="reading fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="page-header">
          <RouterLink to="/mutual-assistance" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to Mutual Assistance
          </RouterLink>
          <div class="split">
            <div>
              <h1>{{ work.title }}</h1>
              <p class="page-subtitle">{{ work.subtitle }}</p>
            </div>
            <button class="drawer-toggle" type="button" @click="isNavOpen = true" aria-label="Open chapter list">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
              <span>Chapters</span>
            </button>
          </div>
        </header>

        <article>
          <MarkdownContent :source="currentChapter.content" />
        </article>

        <nav class="pager" aria-label="Chapter">
          <RouterLink
            v-if="prevChapter"
            class="pager-btn"
            :to="chapterPath(prevChapter)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            <span>{{ chapterLabel(prevChapter) }}</span>
          </RouterLink>
          <div v-else />
          <RouterLink
            v-if="nextChapter"
            class="pager-btn pager-end"
            :to="chapterPath(nextChapter)"
          >
            <span>{{ chapterLabel(nextChapter) }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </RouterLink>
        </nav>

        <div class="section-foot">
          <DownloadButton :href="work.pdfHref" :label="work.pdfLabel" />
        </div>

      </div>
    </div>

    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="isNavOpen" class="drawer">
          <aside class="drawer-panel">
            <div class="drawer-header">
              <span class="drawer-title">{{ work.panelTitle }}</span>
              <button class="drawer-close" type="button" @click="isNavOpen = false" aria-label="Close chapters">&#x2715;</button>
            </div>
            <ul class="drawer-list">
              <li v-for="chapter in work.chapters" :key="chapter.slug">
                <RouterLink
                  class="drawer-item"
                  :class="{ 'is-active': chapter.slug === currentChapter.slug }"
                  :to="chapterPath(chapter)"
                  @click="isNavOpen = false"
                >
                  <span class="drawer-item-title">{{ chapter.title }}</span>
                  <span v-if="chapter.subtitle" class="drawer-item-meta">{{ chapter.subtitle }}</span>
                </RouterLink>
              </li>
            </ul>
          </aside>
          <div class="drawer-backdrop" @click="isNavOpen = false" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';
import MarkdownContent from '@/components/MarkdownContent.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import { readers } from '@/content/mutual-assistance/index.js';

const route = useRoute();
const router = useRouter();
const isNavOpen = ref(false);

const work = computed(() => readers[route.meta.reader]);

const activeIndex = computed(() => work.value.getChapterIndex(route.params.section));

const currentChapter = computed(() => work.value.chapters[activeIndex.value] || work.value.chapters[0]);

const prevChapter = computed(() => work.value.chapters[activeIndex.value - 1] || null);
const nextChapter = computed(() => work.value.chapters[activeIndex.value + 1] || null);

function chapterPath(chapter) {
  return `${work.value.base}/${chapter.slug}`;
}

function chapterLabel(chapter) {
  return chapter.subtitle ? `${chapter.title} — ${chapter.subtitle}` : chapter.title;
}

if (activeIndex.value === -1) {
  router.replace(chapterPath(work.value.chapters[0]));
}

function onKeydown(event) {
  if (event.key === 'Escape' && isNavOpen.value) isNavOpen.value = false;
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));

const pageTitle = computed(() => {
  const chapter = currentChapter.value;
  const name = chapter.subtitle ? `${chapter.title} — ${chapter.subtitle}` : chapter.title;
  return `${name} — Coherence Across Scales`;
});

useHead({
  title: pageTitle,
  meta: [
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: computed(() => work.value.description) },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: computed(() => work.value.shortDescription) },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: computed(() => work.value.shortDescription) },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>
