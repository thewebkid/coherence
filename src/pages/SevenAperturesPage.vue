<template>
  <div class="seven-apertures-page fade-in">
    <div class="page-container">
      <div class="content-container">

        <header class="apertures-header">
          <RouterLink to="/interpretive-works" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Interpretive Works
          </RouterLink>
          <div class="apertures-header-row">
            <h1>Seven Apertures</h1>
            <button class="chapters-toggle" @click="isNavOpen = true" aria-label="Open chapter list">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
              <span>Chapters</span>
            </button>
          </div>
        </header>

        <article class="apertures-article">
          <MarkdownContent :source="currentChapter.content" />
          <PermeabilityDiagram v-if="currentChapter.diagram === 'permeability'" />
        </article>

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

        <div class="apertures-download">
          <DownloadButton
            href="/pdf/Seven Apertures (First Edition).pdf"
            label="Download Full Manuscript (PDF)"
          />
        </div>

      </div>
    </div>

    <!-- Chapters flyout -->
    <Teleport to="body">
    <Transition name="flyout">
      <div v-if="isNavOpen" class="chapters-flyout">
        <aside class="chapters-panel">
          <div class="chapters-panel-header">
            <span class="chapters-panel-title">Seven Apertures</span>
            <button class="chapters-close" @click="isNavOpen = false" aria-label="Close chapters">&#x2715;</button>
          </div>
          <ul class="chapters-list">
            <li v-for="(chapter, i) in chapters" :key="i">
              <button
                class="chapter-item"
                :class="{ 'is-active': i === activeIndex }"
                @click="selectFromNav(i)"
              >
                <span class="chapter-item-title">{{ chapter.title }}</span>
                <span v-if="chapter.subtitle" class="chapter-item-subtitle">{{ chapter.subtitle }}</span>
              </button>
            </li>
          </ul>
        </aside>
        <div class="chapters-backdrop" @click="isNavOpen = false" />
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

<style lang="scss" scoped>
.seven-apertures-page {
  background-color: var(--bg);
  min-height: 100vh;
  padding: var(--spacing-lg) 0 var(--spacing-section);
}

.apertures-header {
  margin-bottom: var(--spacing-xl);
}

.apertures-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-md);
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

  &:hover { color: var(--iw-accent); }
}

.apertures-header h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2rem);
  font-weight: 400;
  color: var(--iw-accent);
  margin-bottom: 0;
}

.chapters-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
  margin-top: 0.375rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  padding: 0.3rem 0.625rem;
  cursor: pointer;
  transition: color var(--transition-speed) ease,
              border-color var(--transition-speed) ease;

  &:hover {
    color: var(--iw-accent);
    border-color: var(--iw-accent);
  }
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

  svg { flex-shrink: 0; }
}

.chapter-nav-next { margin-left: auto; }

.apertures-download {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
  max-width: var(--content-width);
}

// ── Flyout panel ──────────────────────────────────────

.chapters-flyout {
  position: fixed;
  inset: 0;
  z-index: 9000;
}

.chapters-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}

.chapters-panel {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(320px, 85vw);
  background: var(--bg);
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
}

.chapters-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.chapters-panel-title {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.chapters-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.25rem 0.375rem;
  border-radius: var(--radius-sm);
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--text); }
}

.chapters-list {
  list-style: none;
  margin: 0;
  padding: var(--spacing-sm) 0;
}

.chapter-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background var(--transition-speed) ease;

  &:hover { background: var(--bg-secondary); }

  &.is-active {
    background: var(--accent);

    .chapter-item-title { color: var(--bg); }
    .chapter-item-subtitle { color: var(--bg); opacity: 0.8; }
  }
}

.chapter-item-title {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
  line-height: 1.4;
}

.chapter-item-subtitle {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin-top: 2px;
}

// ── Flyout transition ─────────────────────────────────

.flyout-enter-active,
.flyout-leave-active {
  transition: opacity 0.22s ease;
}

.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
}
</style>
