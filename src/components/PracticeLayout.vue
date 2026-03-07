<template>
  <div class="practice-layout">
    <nav class="practice-subnav">
      <RouterLink to="/practice" exact-active-class="active">Practice</RouterLink>
      <RouterLink to="/practice/the-loop" active-class="active">The Loop</RouterLink>
      <RouterLink to="/practice/projects" active-class="active">Projects</RouterLink>
      <RouterLink to="/practice/embodied-transcendence" active-class="active">Embodied Transcendence</RouterLink>
      <RouterLink to="/practice/definitions" active-class="active">Definitions</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.practice-layout {
  min-height: 100vh;
}

.practice-subnav {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  padding: var(--spacing-md) var(--margin-page);
  border-bottom: 1px solid var(--border);
  background: var(--bg);
  
  a {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--text-muted);
    text-decoration: none;
    padding: var(--spacing-xs) 0;
    transition: color var(--transition-speed) ease;
    
    &:hover {
      color: var(--text);
    }
    
    &.active {
      color: var(--accent);
      font-weight: 500;
    }
  }
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: var(--spacing-sm) var(--spacing-md);
    font-size: 0.8125rem;
  }
}
</style>
