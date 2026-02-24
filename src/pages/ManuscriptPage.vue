<template>
  <div class="manuscript-page fade-in">
    <div class="page-container">
      <div class="manuscript-layout">
        <!-- Sidebar navigation -->
        <ContentSidebar
          title="Manuscript"
          :items="sidebarItems"
          :activeIndex="activeIndex"
          @select="setActiveSection"
        />

        <!-- Main content -->
        <main class="manuscript-content">
          <header class="manuscript-header">
            <RouterLink to="/work" class="back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back to The Work
            </RouterLink>
            <h1>Coherence Across Scales</h1>
            <p class="manuscript-subtitle">The Manuscript</p>
          </header>

          <article class="manuscript-article">
            <MarkdownContent :source="currentContent" />
          </article>

          <!-- Section navigation -->
          <nav class="section-nav">
            <button
              v-if="activeIndex > 0"
              class="section-nav-btn section-nav-prev"
              @click="prevSection"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              <span>{{ sections[activeIndex - 1]?.title }}</span>
            </button>
            <div v-else />
            <button
              v-if="activeIndex < sections.length - 1"
              class="section-nav-btn section-nav-next"
              @click="nextSection"
            >
              <span>{{ sections[activeIndex + 1]?.title }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </nav>

          <!-- Download -->
          <div class="manuscript-download">
            <DownloadButton
              href="/pdf/Coherence Across Scales v1.9.pdf"
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
import ContentSidebar from '@/components/ContentSidebar.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import { getPaperSections } from '@/utils/content';

const route = useRoute();
const router = useRouter();

const sections = getPaperSections();
const activeIndex = ref(0);

// Initialize from query param
if (route.query.section) {
  const idx = parseInt(route.query.section, 10);
  if (idx >= 0 && idx < sections.length) {
    activeIndex.value = idx;
  }
}

const currentContent = computed(() => sections[activeIndex.value]?.content || '');
const currentSection = computed(() => sections[activeIndex.value]);

const sidebarItems = computed(() =>
  sections.map(s => ({
    title: s.title,
    subtitle: s.subtitle,
  }))
);

function setActiveSection(index) {
  activeIndex.value = index;
  router.replace({ query: { section: index } });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevSection() {
  if (activeIndex.value > 0) {
    setActiveSection(activeIndex.value - 1);
  }
}

function nextSection() {
  if (activeIndex.value < sections.length - 1) {
    setActiveSection(activeIndex.value + 1);
  }
}

// Watch for query param changes
watch(() => route.query.section, (val) => {
  if (val !== undefined) {
    const idx = parseInt(val, 10);
    if (idx >= 0 && idx < sections.length && idx !== activeIndex.value) {
      activeIndex.value = idx;
    }
  }
});

useHead({
  title: computed(() => `${currentSection.value?.title || 'Manuscript'} — Coherence Across Scales`),
  meta: [
    { property: 'og:title', content: computed(() => `${currentSection.value?.title || 'Manuscript'} — Coherence Across Scales`) },
    { property: 'og:description', content: 'The foundational manuscript exploring coherence from the cellular and personal, through the relational and societal, to the civilizational and planetary.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'The foundational manuscript exploring coherence from the cellular and personal, through the relational and societal, to the civilizational and planetary.' },
  ],
});
</script>

<style lang="scss" scoped>
.manuscript-page {
  padding: var(--spacing-lg) 0 var(--spacing-section);
}

.manuscript-layout {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: var(--spacing-xl);
  }
}

.manuscript-content {
  flex: 1;
  min-width: 0;
}

.manuscript-header {
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
    color: var(--accent);
  }
}

.manuscript-header h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: var(--spacing-xs);
}

.manuscript-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-muted);
  margin: 0;
}

.manuscript-article {
  max-width: var(--content-width);
}

.section-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
}

.section-nav-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text);
  cursor: pointer;
  transition: background var(--transition-speed) ease,
              border-color var(--transition-speed) ease;
  max-width: 45%;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background: var(--bg-secondary);
    border-color: var(--accent);
  }

  svg {
    flex-shrink: 0;
    color: var(--text-muted);
  }
}

.section-nav-prev {
  text-align: left;
}

.section-nav-next {
  text-align: right;
  margin-left: auto;
}

.manuscript-download {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
}
</style>
