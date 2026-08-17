<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Updates</h1>
        </header>

        <div class="page-content">
          <section class="updates-section">
            <h2 class="updates-label">new</h2>
            <div class="updates-list">
              <div v-for="entry in updates.new" :key="entry.to" class="update-entry">
                <span class="update-date">{{ entry.date }}</span>
                <RouterLink :to="entry.to" class="update-title">{{ entry.title }}</RouterLink>
              </div>
            </div>
          </section>

          <section v-if="updates.revised.length" class="updates-section">
            <h2 class="updates-label">revised</h2>
            <div class="updates-list">
              <div v-for="entry in updates.revised" :key="entry.to" class="update-entry">
                <span class="update-date">{{ entry.date }}</span>
                <RouterLink :to="entry.to" class="update-title">{{ entry.title }}</RouterLink>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import { updates } from '@/content/updates.js';

useHead({
  title: 'Updates — Coherence Across Scales',
  meta: [
    { name: 'description', content: 'A record of new and revised materials at Coherence Across Scales.' },
  ],
});
</script>
