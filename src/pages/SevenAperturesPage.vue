<template>
  <div class="seven-apertures-page fade-in">
    <div class="page-container">
      <div class="apertures-layout">
        <!-- Sidebar navigation -->
        <ContentSidebar
          title="Seven Apertures"
          :items="sidebarItems"
          :activeIndex="activeIndex"
          @select="setActiveSection"
        />

        <!-- Main content -->
        <main class="apertures-content">
          <header class="apertures-header">
            <RouterLink to="/interpretive-works" class="back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Interpretive Works
            </RouterLink>
            <h1>Seven Apertures</h1>
            <p class="page-subtitle">James Mahu and Lumina — First Edition, 2026</p>
          </header>

          <article class="apertures-article">
            <MarkdownContent :source="currentChapter.content" />
            <PermeabilityDiagram v-if="currentChapter.diagram === 'permeability'" />
          </article>

          <!-- Chapter navigation -->
          <nav class="chapter-nav">
            <button
              v-if="activeIndex > 0"
              class="chapter-nav-btn chapter-nav-prev"
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
              class="chapter-nav-btn chapter-nav-next"
              @click="nextChapter"
            >
              <span>{{ chapters[activeIndex + 1]?.title }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </nav>

          <!-- Download -->
          <div class="apertures-download">
            <DownloadButton
              href="/pdf/Seven Apertures (First Edition).pdf"
              label="Download Full Manuscript (PDF)"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';
import ContentSidebar from '@/components/ContentSidebar.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import PermeabilityDiagram from '@/components/PermeabilityDiagram.vue';
import { chapters } from '@/content/seven-apertures/index.js';

const route = useRoute();
const router = useRouter();

const activeIndex = ref(0);

if (route.query.section) {
  const idx = parseInt(route.query.section, 10);
  if (idx >= 0 && idx < chapters.length) {
    activeIndex.value = idx;
  }
}

const currentChapter = computed(() => chapters[activeIndex.value]);

const sidebarItems = computed(() =>
  chapters.map(c => ({
    title: c.title,
    subtitle: c.subtitle,
  }))
);

function setActiveSection(index) {
  activeIndex.value = index;
  router.replace({ query: { section: index } });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevChapter() {
  if (activeIndex.value > 0) setActiveSection(activeIndex.value - 1);
}

function nextChapter() {
  if (activeIndex.value < chapters.length - 1) setActiveSection(activeIndex.value + 1);
}

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

<style lang="scss" scoped>
.seven-apertures-page {
  background-color: var(--bg);
  min-height: 100vh;
  padding: var(--spacing-lg) 0 var(--spacing-section);
}

.apertures-layout {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: var(--spacing-xl);
  }
}

.apertures-content {
  flex: 1;
  min-width: 0;
}

.apertures-header {
  margin-bottom: var(--spacing-xl);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: var(--spacing-md);
  transition: color var(--transition-speed) ease;

  &:hover {
    color: var(--iw-accent);
  }
}

.apertures-header h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 400;
  color: var(--iw-accent);
  margin-bottom: var(--spacing-xs);
}

.apertures-article {
  max-width: var(--content-width);

  :deep(.markdown-body) {
    line-height: var(--iw-line-height-prose, 2);
    color: var(--text-muted);
  }

  :deep(h1),
  :deep(h2),
  :deep(h3) {
    font-family: var(--font-serif);
    font-weight: 400;
    color: var(--iw-accent);
    border-bottom: none;
  }

  :deep(h1) {
    font-size: clamp(1.375rem, 3vw, 1.625rem);
    margin-bottom: var(--spacing-md);
  }

  :deep(h2) {
    font-size: clamp(1.125rem, 2.5vw, 1.25rem);
  }

  :deep(strong) {
    color: var(--text);
  }

  :deep(em) {
    font-family: var(--font-serif);
  }

  :deep(hr) {
    opacity: 0.4;
  }
}

.chapter-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
  max-width: var(--content-width);
}

.chapter-nav-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--transition-speed) ease,
              border-color var(--transition-speed) ease,
              color var(--transition-speed) ease;
  max-width: 45%;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background: var(--bg-secondary);
    border-color: var(--iw-accent);
    color: var(--iw-accent);
  }

  svg {
    flex-shrink: 0;
    color: var(--text-muted);
  }
}

.chapter-nav-prev {
  text-align: left;
}

.chapter-nav-next {
  text-align: right;
  margin-left: auto;
}

.apertures-download {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
  max-width: var(--content-width);
}
</style>
