<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">The Work</p>
          <h1>The Field Beneath the Names</h1>
          <p class="page-subtitle">a micro-essay</p>
        </header>

        <article>
          <MarkdownContent :source="markdownSource" />
        </article>

        <div class="essay-footer">
          <RouterLink to="/work" class="back-link-text">← The Work</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import markdownSource from '@/content/Micro-essay_The_Field_Beneath_the_Names v3.md?raw';

useHead({
  title: 'The Field Beneath the Names — The Work — Coherence Across Scales',
  meta: [
    { name: 'description', content: 'Beneath all names for presence, awareness, consciousness — something remains that is not named. A micro-essay on the field that all language attempts to reach.' },
  ],
});
</script>

<style lang="scss" scoped></style>
