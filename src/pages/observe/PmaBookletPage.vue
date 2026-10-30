<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container observe-page">
        <header class="page-header">
          <h1>Practice of Mutual Assistance</h1>
        </header>
        <div class="page-content">
          <p>The booklet is not yet available here. It will be added when the file is ready.</p>
          <p>You do not need the booklet to use the observational instrument.</p>
          <p>
            <RouterLink class="text-link" to="/observe">Return to the instrument</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'PMA booklet — Coherence Across Scales',
  meta: [{ name: 'robots', content: 'noindex' }],
});
</script>

<style lang="scss" scoped>
.observe-page {
  max-width: 40rem;
}
.page-content p {
  line-height: 1.8;
}
</style>
