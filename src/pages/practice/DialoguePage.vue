<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice</p>
          <h1>Dialogue</h1>
          <p class="page-subtitle"><em>Conversational Recursion</em></p>
        </header>

        <div class="page-content">
          <p>
            This project explores what happens when meaning is
            <strong>recognized and allowed to deepen within conversation</strong>.
          </p>
          <p>It begins with a simple observation:</p>
          <p>
            Sometimes, a person expresses something real—and it passes unnoticed.
          </p>
          <p>This project asks:</p>
          <p><strong>What happens when it is gently recognized instead?</strong></p>

          <section>
            <h2>Core Question</h2>
            <p>Can reflective recognition deepen and stabilize coherence within an interaction?</p>
          </section>

          <section>
            <h2>Conversational Recursion</h2>
            <p>Conversational recursion occurs when meaning is:</p>
            <p>
              noticed<br>
              reflected<br>
              allowed to expand
            </p>
            <p>
              Not interpreted.<br>
              Not corrected.<br>
              Not redirected.<br>
              Simply returned with care.
            </p>

            <div class="example-block">
              <h3>Example</h3>
              <p>A person expresses:</p>
              <p>a realization<br>a value<br>a moment of honesty</p>
              <p>
                A formative observer reflects it back—slightly clarified, slightly expanded.<br>
                The conversation does not move away.<br>
                It deepens around what is already present.
              </p>
            </div>
          </section>

          <section>
            <h2>Suggested Exploration</h2>
            <p>During ordinary conversation, if you wish:</p>
            <p>
              Notice when something real is expressed<br>
              Gently reflect it<br>
              Allow it to expand slightly<br>
              Then let it rest
            </p>
            <p>
              Do not force depth.<br>
              Do not perform insight.<br>
              Just <strong>recognize what is already present</strong>.
            </p>
          </section>

          <current-signals project="Dialogue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useHead } from '@unhead/vue';

import { initObservatoryData } from '@/utils/observatoryData';
import CurrentSignals from '@/components/CurrentSignals.vue';

onMounted(() => initObservatoryData());

useHead({
  title: 'Dialogue — Practice — Coherence Across Scales',
  meta: [{ name: 'description', content: 'Explore what happens when meaning is recognized and allowed to deepen within conversation. Conversational Recursion.' }],
});
</script>

<style lang="scss" scoped>
.example-block {
  margin: var(--spacing-md) 0;
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  border-left: 2px solid var(--border);

  h3 {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: var(--spacing-sm);
  }

  p { margin-bottom: var(--spacing-xs); font-size: 0.9375rem; }
}
</style>
