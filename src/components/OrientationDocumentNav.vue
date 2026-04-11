<template>
  <nav class="orientation-doc-nav" aria-label="Related orientation documents">
    <h2 class="orientation-doc-nav__heading">Orientation documents</h2>
    <ul class="orientation-doc-nav__list">
      <li
        v-for="item in items"
        :key="item.id"
        class="orientation-doc-nav__item"
      >
        <RouterLink
          v-if="item.id !== current"
          :to="item.path"
          class="orientation-doc-nav__link"
        >
          <span class="orientation-doc-nav__title">{{ item.title }}</span>
          <span class="orientation-doc-nav__label">{{ item.label }}</span>
        </RouterLink>
        <div
          v-else
          class="orientation-doc-nav__current"
          aria-current="page"
        >
          <span class="orientation-doc-nav__title">{{ item.title }}</span>
          <span class="orientation-doc-nav__label">{{ item.label }}</span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
/** Bottom-of-page links between the three orientation documents; current page is non-interactive and muted. */
defineProps({
  current: {
    type: String,
    required: true,
    validator: (v) => ['note-to-observers', 'stability-permeability', 'first-act'].includes(v),
  },
});

const items = [
  {
    id: 'note-to-observers',
    path: '/note-to-observers',
    title: 'A Note to Observers',
    label: 'Invitation',
  },
  {
    id: 'stability-permeability',
    path: '/practice/stability-and-permeability',
    title: 'Stability & Permeability',
    label: 'Internal System',
  },
  {
    id: 'first-act',
    path: '/practice/first-act-of-observation',
    title: 'The First Act of Observation',
    label: 'Lived Entry',
  },
];
</script>

<style lang="scss" scoped>
.orientation-doc-nav {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
}

.orientation-doc-nav__heading {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.orientation-doc-nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.orientation-doc-nav__item {
  margin: 0;
}

.orientation-doc-nav__link,
.orientation-doc-nav__current {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-height: 100%;
  padding: var(--spacing-md);
  background: var(--bg);
  text-decoration: none;
  transition: background var(--transition-speed) ease;
}

.orientation-doc-nav__link:hover {
  background: var(--bg-secondary);
}

.orientation-doc-nav__current {
  cursor: default;
  opacity: 0.55;
}

.orientation-doc-nav__title {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text);
}

.orientation-doc-nav__link .orientation-doc-nav__title {
  color: var(--accent);
}

.orientation-doc-nav__link:hover .orientation-doc-nav__title {
  text-decoration: underline;
}

.orientation-doc-nav__current .orientation-doc-nav__title {
  color: var(--text-muted);
}

.orientation-doc-nav__label {
  font-family: var(--font-serif);
  font-size: 0.8125rem;
  color: var(--text-muted);
}
</style>
