<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container quick-start-page">
        <header class="page-header">
          <RouterLink to="/mutual-assistance/mci" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to MCI
          </RouterLink>
          <h1>Movement Continuity Instrument (MCI)</h1>
          <p class="page-subtitle">A Quick Start</p>
        </header>

        <div class="page-content">
          <p class="text-caption">
            The Quick Start provides context about what kind of instrument MCI is, what happens during a sitting, why continuity matters, and how MCI relates to the larger Mutual Assistance ecology. Reading the Quick Start is not required before participating. The primary action remains
            <RouterLink class="text-link" to="/mutual-assistance/mci">Begin Observation</RouterLink>.
          </p>

          <MarkdownContent :source="markdownSource" />

          <div class="section-foot">
            <DownloadButton
              href="/pdf/Movement Continuity Instrument (MCI) (1).pdf"
              filename="Movement-Continuity-Instrument-Quick-Start.pdf"
              label="Download Quick Start (PDF)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import markdownSource from '@/content/mutual-assistance/mci/quick-start.md?raw';

useHead({
  title: 'MCI Quick Start — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'MCI Quick Start — Coherence Across Scales' },
    { property: 'og:description', content: 'A quick start guide for the Movement Continuity Instrument (MCI), an observational instrument for noticing movements that become recognizable under different relational conditions.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: 'https://coherenceacrossscales.org/mutual-assistance/mci/quick-start' },
    { property: 'og:image', content: 'https://coherenceacrossscales.org/og-image.jpg' },
    { name: 'description', content: 'A quick start guide for the Movement Continuity Instrument (MCI).' },
  ],
});
</script>
