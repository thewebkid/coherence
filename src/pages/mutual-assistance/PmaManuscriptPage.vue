<template>
  <div class="reader-page fade-in">
    <div class="page-container">
      <div class="reader-layout">
        <ContentSidebar
          title="The Practice of Mutual Assistance"
          :items="sidebarItems"
          :activeIndex="activeIndex"
          @select="setActiveSection"
        />

        <main class="reader-content">
          <header class="reader-header">
            <RouterLink to="/mutual-assistance" class="back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back to Mutual Assistance
            </RouterLink>
            <h1>The Practice of Mutual Assistance</h1>
            <p class="page-subtitle">A Relational Ecology for a More Inhabitable World</p>
          </header>

          <article class="reader-article">
            <MarkdownContent :source="currentContent" />
          </article>

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

          <div class="reader-download">
            <DownloadButton
              href="/pdf/The Practice of Mutual Assistance.pdf"
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
import { getPmaManuscriptSections } from '@/utils/content';

const route = useRoute();
const router = useRouter();

const sections = getPmaManuscriptSections();
const activeIndex = ref(0);

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

watch(() => route.query.section, (val) => {
  if (val !== undefined) {
    const idx = parseInt(val, 10);
    if (idx >= 0 && idx < sections.length && idx !== activeIndex.value) {
      activeIndex.value = idx;
    }
  }
});

useHead({
  title: computed(() => `${currentSection.value?.title || 'The Practice of Mutual Assistance'} — Coherence Across Scales`),
  meta: [
    { property: 'og:title', content: computed(() => `${currentSection.value?.title || 'The Practice of Mutual Assistance'} — Coherence Across Scales`) },
    { property: 'og:description', content: 'A deeper exploration of the relational architecture beneath Mutual Assistance: sovereignty, difference, consequence, continuity, correspondence, Return, behavioral wisdom, and the widening from differentiated participants toward mutual locality.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'A deeper exploration of the relational architecture beneath Mutual Assistance.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => `${currentSection.value?.title || 'The Practice of Mutual Assistance'} — Coherence Across Scales`) },
    { name: 'twitter:description', content: 'A deeper exploration of the relational architecture beneath Mutual Assistance.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.reader-page {
  padding: var(--spacing-lg) 0 var(--spacing-section);
}

.reader-layout {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: var(--spacing-xl);
  }
}

.reader-content {
  flex: 1;
  min-width: 0;
}

.reader-header {
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

.reader-header h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: var(--spacing-xs);
}

.reader-article {
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

.reader-download {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
}
</style>
