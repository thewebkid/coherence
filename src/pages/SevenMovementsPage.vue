<template>
  <div class="seven-movements-page fade-in">
    <div class="page-container">
      <div class="movements-layout">

        <ContentSidebar
          title="Seven Movements"
          :items="sidebarItems"
          :activeIndex="activeIndex"
          @select="setActiveSection"
        />

        <main class="movements-content">
          <header class="movements-header">
            <RouterLink to="/interpretive-works" class="back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Interpretive Works
            </RouterLink>
            <h1>Seven Movements</h1>
          </header>

          <article class="movements-article">
            <MarkdownContent :source="currentSection.content" />
          </article>

          <!-- Aperture links — only on final movement -->
          <div v-if="isLastSection" class="apertures">
            <div class="apertures-divider" />
            <nav aria-label="Apertures">
              <RouterLink to="/interpretive-works/listen" class="aperture-link">Listen</RouterLink>
              <RouterLink to="/interpretive-works/in-image" class="aperture-link">In image</RouterLink>
              <RouterLink to="/interpretive-works/this-field-remains-open" class="aperture-link">This field remains open</RouterLink>
            </nav>
          </div>

          <!-- Prev / next navigation -->
          <nav class="section-nav">
            <button
              v-if="activeIndex > 0"
              class="section-nav-btn section-nav-prev"
              @click="prevSection"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              <span>{{ sections[activeIndex - 1].title }}</span>
            </button>
            <div v-else />
            <button
              v-if="activeIndex < sections.length - 1"
              class="section-nav-btn section-nav-next"
              @click="nextSection"
            >
              <span>{{ sections[activeIndex + 1].title }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            <div v-else />
          </nav>

          <div class="movements-download">
            <DownloadButton
              href="/pdf/Seven_Movements.pdf"
              label="Download PDF"
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
import rawSource from '@/content/7movements.md?raw';

const route = useRoute();
const router = useRouter();

// Split the markdown into sections at each top-level movement heading.
// We split on Roman-numeral movements only (I–VII), leaving VI.V attached to VI.
function parseSections(raw) {
  const movementRe = /^## (Movement (?:VII|VI|V|IV|III|II|I)(?:\s|$)[^\n]*|Seven Movements)\s*$/gm;
  const matches = [...raw.matchAll(movementRe)];
  const result = [];

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : raw.length;
    const content = raw.slice(start, end).trimEnd();
    const headingText = matches[i][1].trim();

    // Derive a clean display title
    let title = headingText === 'Seven Movements' ? 'Overview' : headingText;

    // Subtitle from the first ### line in the section
    const subMatch = content.match(/^###\s+_?(.+?)_?\s*$/m);
    const subtitle = subMatch ? subMatch[1].replace(/[_*]/g, '').trim() : '';

    result.push({ title, subtitle, content });
  }

  return result;
}

const sections = parseSections(rawSource);
const activeIndex = ref(0);

// Restore from query param
if (route.query.section !== undefined) {
  const idx = parseInt(route.query.section, 10);
  if (idx >= 0 && idx < sections.length) activeIndex.value = idx;
}

const currentSection = computed(() => sections[activeIndex.value]);
const isLastSection = computed(() => activeIndex.value === sections.length - 1);

const sidebarItems = computed(() =>
  sections.map((s) => ({ title: s.title, subtitle: s.subtitle }))
);

function setActiveSection(index) {
  activeIndex.value = index;
  router.replace({ query: { section: index } });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevSection() {
  if (activeIndex.value > 0) setActiveSection(activeIndex.value - 1);
}

function nextSection() {
  if (activeIndex.value < sections.length - 1) setActiveSection(activeIndex.value + 1);
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
  title: 'Seven Movements — Interpretive Works — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Seven Movements — Coherence Across Scales' },
    { property: 'og:description', content: 'A text in seven movements exploring the dissolution of separation and the emergence of coherence as field.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'A text in seven movements exploring the dissolution of separation and the emergence of coherence as field.' },
  ],
});
</script>

<style lang="scss" scoped>
.seven-movements-page {
  background-color: var(--iw-bg);
  min-height: 100vh;
  padding: var(--spacing-lg) 0 var(--spacing-section);
}

.movements-layout {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: var(--spacing-xl);
  }
}

.movements-content {
  flex: 1;
  min-width: 0;
}

.movements-header {
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

  &:hover { color: var(--iw-accent); }
}

.movements-header h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 400;
  color: var(--iw-accent);
  margin-bottom: 0;
}

.movements-article {
  max-width: var(--content-width);
}

// Aperture links
.apertures {
  margin-top: var(--spacing-xl);
}

.apertures-divider {
  width: 48px;
  height: 1px;
  background: var(--iw-accent);
  opacity: 0.4;
  margin-bottom: var(--spacing-xl);
}

.aperture-link {
  display: block;
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  font-style: italic;
  color: var(--text-muted);
  text-decoration: none;
  padding: var(--spacing-xs) 0;
  transition: color var(--transition-speed) ease;

  &:hover { color: var(--iw-accent); }
}

// Section navigation (matches handbook pattern)
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
    border-color: var(--iw-accent);
  }

  svg { flex-shrink: 0; color: var(--text-muted); }
}

.section-nav-next {
  margin-left: auto;
}

.movements-download {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
}
</style>
