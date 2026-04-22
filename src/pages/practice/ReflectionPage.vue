<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice</p>
          <h1>Reflection</h1>
          <p class="page-subtitle"><em>Recursive Dialogue with Intelligence</em></p>
        </header>

        <div class="page-content">
          <p>This project explores a new kind of mirror.</p>

          <p>
            For most of human history, we have discovered ourselves through:<br>
            other people<br>
            nature<br>
            art<br>
            silence
          </p>

          <p>Now, a new reflective surface has appeared: <strong>artificial intelligence</strong></p>

          <p>This project asks:</p>
          <p><strong>What happens when intelligence reflects intelligence?</strong></p>

          <section>
            <h2>Core Question</h2>
            <p>Can dialogue with AI deepen clarity without replacing human thinking?</p>
          </section>

          <section>
            <h2>The Reflective Loop</h2>
            <p>This practice unfolds through a simple pattern:</p>
            <p>
              You bring a question, thought, or feeling<br>
              AI responds with articulation or expansion<br>
              You reflect, refine, and respond again
            </p>
            <p>
              This loop continues.<br>
              Not to arrive quickly.<br>
              But to <strong>see more clearly over time</strong>
            </p>
          </section>

          <section>
            <h2>Working Premise</h2>
            <p>
              AI does not originate your meaning.<br>
              It reflects and helps clarify what you bring forward.
            </p>
            <p>
              When approached with awareness:<br>
              AI becomes a mirror—not a substitute for thinking
            </p>
          </section>

          <section>
            <h2>Suggested Exploration</h2>
            <p>When interacting with AI, if you wish:</p>
            <p>
              bring a real question or thought<br>
              notice the response<br>
              refine your inquiry<br>
              continue the loop
            </p>
            <p>Stay aware of:</p>
            <p>
              your intention<br>
              your authorship<br>
              your direction
            </p>
            <p>
              The mirror works best when:<br>
              <strong>you remain sovereign in the process</strong>
            </p>
          </section>

          <section>
            <h2>What Emerges</h2>
            <div class="signal-section">
              <h3>Word Cloud</h3>
              <p class="text-caption">Patterns of interaction</p>
              <WordField :words="projectWords" project="Reflection" />
            </div>
            <div class="signal-section">
              <h3>Recent Signals</h3>
              <p class="text-caption">How clarity or confusion emerges</p>
              <SignalFeed :entries="projectFeed" />
            </div>
          </section>

          <div class="submission-section">
            <h2>Submit an Observation</h2>
            <p>All submissions are anonymous.</p>
            <SignalSubmissionForm project="Reflection" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useHead } from '@unhead/vue';
import SignalSubmissionForm from '@/components/SignalSubmissionForm.vue';
import WordField from '@/components/WordField.vue';
import SignalFeed from '@/components/SignalFeed.vue';
import { initObservatoryData, getWordsForProject, getFeedForProject } from '@/utils/observatoryData';

const projectWords = computed(() => getWordsForProject('Reflection'));
const projectFeed = computed(() => getFeedForProject('Reflection'));

onMounted(() => initObservatoryData());

useHead({
  title: 'Reflection — Practice — Coherence Across Scales',
  meta: [{ name: 'description', content: 'Explore what happens when intelligence reflects intelligence. Recursive Dialogue with Intelligence.' }],
});
</script>

