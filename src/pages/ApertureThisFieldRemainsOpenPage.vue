<template>
  <div class="aperture-page page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <RouterLink to="/interpretive-works/seven-movements" class="back-link">← Seven Movements</RouterLink>
        <div class="aperture-body">
          <p class="aperture-text">This field is forming. It will open here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({ title: 'This Field Remains Open — Seven Movements — Coherence Across Scales' });
</script>

<style lang="scss" scoped>
.aperture-page {
  background-color: var(--iw-bg);
  min-height: 100vh;
}

.back-link {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: var(--spacing-xl);
  letter-spacing: 0.02em;

  &:hover { color: var(--iw-accent); }
}

.aperture-body {
  padding-top: var(--spacing-xl);
}

.aperture-text {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  color: var(--text-muted);
  line-height: 1.8;
}
</style>
