<template>
  <nav class="content-nav" v-if="prev || next">
    <RouterLink v-if="prev" :to="prev.to" class="content-nav__link content-nav__prev">
      <span class="content-nav__label">Previous</span>
      <span class="content-nav__title">{{ prev.label }}</span>
    </RouterLink>
    <div v-else class="content-nav__spacer"></div>

    <RouterLink v-if="next" :to="next.to" class="content-nav__link content-nav__next">
      <span class="content-nav__label">Next</span>
      <span class="content-nav__title">{{ next.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
defineProps({
  prev: { type: Object, default: null },
  next: { type: Object, default: null },
});
</script>

<style lang="scss" scoped>
.content-nav {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2.5rem 0;
  margin-top: 3rem;
  border-top: 1px solid var(--border);
}

.content-nav__link {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: color var(--transition-speed) ease;
}

.content-nav__prev {
  align-items: flex-start;
}

.content-nav__next {
  align-items: flex-end;
  margin-left: auto;
}

.content-nav__label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.content-nav__title {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  color: var(--accent);
  transition: color var(--transition-speed) ease;

  .content-nav__link:hover & {
    color: var(--accent-hover);
  }
}

.content-nav__spacer {
  flex: 1;
}
</style>
