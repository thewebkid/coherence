<template>
  <button 
    class="back-to-top"
    @click="scrollToTop"
    aria-label="Back to top"
  >
    <span class="arrow">↑</span>
  </button>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style lang="scss" scoped>
.back-to-top {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  margin-top: var(--spacing-xl);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  
  &:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--bg);
  }
  
  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.arrow {
  font-size: 1.25rem;
  line-height: 1;
}
</style>
