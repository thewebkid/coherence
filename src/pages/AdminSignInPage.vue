<template>
  <div class="admin-sign-in-page fade-in">
    <div class="sign-in-container">
      <p class="sign-in-label">Administrator Access</p>
      <SignIn :after-sign-in-url="'/admin'" :routing="'hash'" />
    </div>
  </div>
</template>

<script setup>
import { SignIn } from '@clerk/vue';
import { useHead } from '@unhead/vue';

useHead({
  title: 'Admin Sign In — Coherence Across Scales',
  meta: [{ name: 'robots', content: 'noindex' }],
});
</script>

<style lang="scss" scoped>
.admin-sign-in-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) var(--margin-page);
}

.sign-in-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.sign-in-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin: 0;
}
</style>
