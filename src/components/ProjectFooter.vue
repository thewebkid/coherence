<template>
  <div class="project-footer">
    <section class="signals-section">
      <div class="signals-header">
        <h2 class="text-label">Recent Signals</h2>
        <div class="lang-toggle" role="group" aria-label="Language view">
          <button :class="{ active: !showEnglish }" @click="showEnglish = false">Original</button>
          <span class="lang-toggle__divider">/</span>
          <button :class="{ active: showEnglish }" @click="showEnglish = true">English</button>
        </div>
      </div>
      <WordField :words="projectWords" :project="project" />
      <div class="pt-5 mt-5">
        <SignalFeed :entries="projectFeed" />
      </div>
    </section>

    <div class="submission-section">
      <h2>Submit an Observation</h2>
      <p>All submissions are anonymous.</p>
      <SignalSubmissionForm :project="project" />
    </div>

    <nav class="project-nav" aria-label="Projects">
      <h2 class="project-nav__heading">Projects</h2>
      <ul class="project-nav__grid">
        <li
          v-for="p in projects"
          :key="p.path"
          class="project-nav__item"
        >
          <RouterLink
            v-if="p.path !== route.path"
            :to="p.path"
            class="project-nav__tile"
          >
            <span class="project-nav__title">{{ p.title }}</span>
            <span class="project-nav__subtitle">{{ p.subtitle }}</span>
          </RouterLink>
          <div v-else class="project-nav__tile project-nav__tile--current" aria-current="page">
            <span class="project-nav__title">{{ p.title }}</span>
            <span class="project-nav__subtitle">{{ p.subtitle }}</span>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import SignalSubmissionForm from '@/components/SignalSubmissionForm.vue';
import SignalFeed from '@/components/SignalFeed.vue';
import WordField from '@/components/WordField.vue';
import { getWordsForProject, getFeedForProject } from '@/utils/observatoryData';

const props = defineProps({ project: { type: String, required: true } });

const showEnglish = ref(false);

const route = useRoute();

const projects = [
  { title: 'AI Observation', subtitle: 'Human–AI Co-Perception', path: '/practice/projects/ai-observation' },
  { title: 'Observation', subtitle: 'Relational Perception in Interaction', path: '/practice/projects/observation' },
  { title: 'Dialogue', subtitle: 'Conversational Recursion', path: '/practice/projects/dialogue' },
  { title: 'Relational Field', subtitle: 'Ecological Spread of Coherence', path: '/practice/projects/relational-field' },
  { title: 'Reflection', subtitle: 'Recursive Dialogue with Intelligence', path: '/practice/projects/reflection' },
  { title: 'Presence', subtitle: 'Embodied Transcendence in Daily Life', path: '/practice/projects/presence' },
];

const projectWords = computed(() => getWordsForProject(props.project, showEnglish.value));
const projectFeed = computed(() => getFeedForProject(props.project, showEnglish.value));

</script>

<style lang="scss" scoped>
.project-footer {
  margin-top: var(--spacing-xl);
}

.signals-section {
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border);
}

.signals-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.lang-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);

  button {
    background: none;
    border: none;
    padding: 0;
    font-family: var(--font-sans);
    font-size: 0.75rem;
    color: var(--text-muted);
    cursor: pointer;
    transition: color var(--transition-speed) ease;

    &:hover { color: var(--text); }
    &.active { color: var(--text); }
  }
}

.lang-toggle__divider {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-muted);
  opacity: 0.5;
  user-select: none;
}

.submission-section {
  margin-top: var(--spacing-xl);
}

.project-nav {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
}

.project-nav__heading {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.project-nav__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-nav__item {
  margin: 0;
}

.project-nav__tile {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-height: 100%;
  padding: var(--spacing-md);
  background: var(--bg);
  text-decoration: none;
  transition: background var(--transition-speed) ease;

  &:hover {
    background: var(--bg-secondary);

    .project-nav__title { color: var(--accent); }
  }

  &--current {
    cursor: default;
    opacity: 0.5;
  }
}

.project-nav__title {
  font-family: var(--font-sans);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text);

  .project-nav__tile:not(.project-nav__tile--current) & {
    color: var(--accent);
  }
}

.project-nav__subtitle {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--text-muted);
}
</style>
