<template>
  <div class="interpretive-work-page fade-in">
    <div class="page-container">
      <div class="content-container">

        <div v-if="!work" class="not-found">
          <p>Work not found.</p>
          <RouterLink to="/interpretive-works">← Back to Interpretive Works</RouterLink>
        </div>

        <template v-else>
          <RouterLink to="/interpretive-works" class="back-link">← Interpretive Works</RouterLink>

          <header class="work-header">
            <div class="work-meta">
              <span class="work-creator">{{ work.creator }}</span>
              <span class="work-sep">·</span>
              <span class="work-type">{{ work.type }}</span>
              <span class="work-sep">·</span>
              <span class="work-year">{{ work.year }}</span>
            </div>
            <h1 class="work-title">{{ work.title }}</h1>
            <p v-if="work.subtitle" class="work-subtitle">{{ work.subtitle }}</p>
          </header>

          <div class="work-meta-detail">
            <dl class="meta-list">
              <div class="meta-row">
                <dt>Medium</dt>
                <dd>{{ work.medium }}</dd>
              </div>
            </dl>
          </div>

          <div class="iw-divider" />

          <div v-if="work.intro" class="work-intro">
            <p v-for="(line, i) in introLines" :key="i">{{ line }}</p>
          </div>

          <WorkContent
            :type="work.contentType"
            :content="work.content"
            :title="work.title"
          />

          <div v-if="work.reflection" class="work-reflection">
            <h2 class="reflection-label">Creator Reflection</h2>
            <p v-for="(line, i) in reflectionLines" :key="i">{{ line }}</p>
          </div>

          <div class="iw-divider" />

          <nav class="work-nav">
            <RouterLink
              v-if="prevWork"
              :to="`/interpretive-works/${prevWork.slug}`"
              class="work-nav-link work-nav-link--prev"
            >
              ← {{ prevWork.title }}
            </RouterLink>
            <span v-else class="work-nav-placeholder" />
            <RouterLink
              v-if="nextWork"
              :to="`/interpretive-works/${nextWork.slug}`"
              class="work-nav-link work-nav-link--next"
            >
              {{ nextWork.title }} →
            </RouterLink>
            <span v-else class="work-nav-placeholder" />
          </nav>

          <RouterLink to="/interpretive-works" class="back-link back-link--bottom">
            ← Back to Interpretive Works
          </RouterLink>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import WorkContent from '@/components/WorkContent.vue';
import { works, getWorkBySlug } from '@/content/interpretive-works/index.js';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';

const route = useRoute();

const work = computed(() => getWorkBySlug(route.params.slug));

const currentIndex = computed(() => works.findIndex((w) => w.slug === route.params.slug));
const prevWork = computed(() => (currentIndex.value > 0 ? works[currentIndex.value - 1] : null));
const nextWork = computed(() => (currentIndex.value < works.length - 1 ? works[currentIndex.value + 1] : null));

const introLines = computed(() =>
  work.value?.intro ? work.value.intro.split('\n').filter((l) => l.trim()) : []
);

const reflectionLines = computed(() =>
  work.value?.reflection ? work.value.reflection.split('\n').filter((l) => l.trim()) : []
);

useHead(computed(() => ({
  title: work.value ? `${work.value.title} — Interpretive Works — Coherence Across Scales` : 'Interpretive Works — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: work.value?.title ?? 'Interpretive Works' },
    { property: 'og:description', content: work.value?.subtitle ?? '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: SITE_BASE_URL + route.path },
    { property: 'og:image', content: work.value?.thumbnail ? SITE_BASE_URL + work.value.thumbnail : OG_IMAGE_URL },
    { name: 'description', content: work.value?.subtitle ?? '' },
  ],
})));
</script>

<style lang="scss" scoped>
.interpretive-work-page {
  padding: var(--spacing-section) 0;
  background-color: var(--iw-bg);
  min-height: 100vh;
}

.back-link {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: var(--spacing-lg);
  letter-spacing: 0.02em;

  &:hover {
    color: var(--iw-accent);
  }

  &--bottom {
    margin-top: var(--spacing-lg);
    margin-bottom: 0;
  }
}

.not-found {
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.work-header {
  margin-bottom: var(--spacing-lg);
}

.work-meta {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  margin-bottom: var(--spacing-xs);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.work-title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: var(--spacing-xs);
}

.work-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.125rem;
  color: var(--text-muted);
  margin: 0;
}

.work-meta-detail {
  margin-bottom: var(--spacing-lg);
}

.meta-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-row {
  display: flex;
  gap: var(--spacing-sm);

  dt {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    min-width: 6rem;
  }

  dd {
    font-size: 0.9375rem;
    margin: 0;
  }
}

.iw-divider {
  width: 48px;
  height: 1px;
  background: var(--iw-accent);
  opacity: 0.4;
  margin: var(--spacing-xl) 0;
}

.work-intro {
  max-width: 680px;
  margin-bottom: var(--spacing-xl);

  p {
    line-height: var(--iw-line-height-prose, 2);
    margin-bottom: var(--spacing-sm);
  }
}

.work-reflection {
  max-width: 680px;
  margin-top: var(--spacing-xl);
}

.reflection-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--iw-accent);
  margin-bottom: var(--spacing-sm);
}

.work-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
}

.work-nav-link {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--iw-accent);
  text-decoration: none;
  max-width: 45%;

  &:hover {
    color: var(--iw-accent-hover);
    text-decoration: underline;
  }
}

.work-nav-placeholder {
  flex: 1;
}
</style>
