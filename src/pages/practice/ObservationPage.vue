<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice</p>
          <h1>Observation</h1>
          <p class="page-subtitle"><em>Relational Perception in Interaction</em></p>
        </header>

        <div class="page-content">
          <p>
            This project explores coherence as lived behavior—not theory.
          </p>
          <p>It asks a simple question:</p>
          <p><strong>What changes within a single interaction when presence stabilizes?</strong></p>
          <p>
            This is not something to believe.<br>
            It is something to observe.
          </p>

          <section>
            <h2>The Formative Observer</h2>
            <p>
              A formative observer is someone who stabilizes their presence within an interaction.
            </p>
            <p>
              Not to control.<br>
              Not to teach.<br>
              Not to perform.
            </p>
            <p>Simply to observe while maintaining:</p>
            <ul>
              <li>steadiness</li>
              <li>non-reactivity</li>
              <li>equality of presence</li>
              <li>reduced signals of dominance</li>
            </ul>
            <p>
              The formative observer does not remove difference.<br>
              They stabilize <strong>presence within difference</strong>.
            </p>
            <p>
              In doing so, they influence relational conditions—not by changing others,
              but by stabilizing themselves.
            </p>
          </section>

          <section>
            <h2>Working Hypothesis</h2>
            <p>
              Coherence in human interaction may have a physiological and behavioral foundation.
            </p>
            <p>When one participant stabilizes their internal state, this may influence:</p>
            <ul>
              <li>autonomic rhythm</li>
              <li>attentional steadiness</li>
              <li>emotional reactivity</li>
              <li>social signaling</li>
            </ul>
            <p>This may initiate a chain:</p>
            <p>
              regulated internal state<br>
              → regulated social signaling<br>
              → perceived safety<br>
              → reciprocal regulation<br>
              → increased relational coherence
            </p>
            <p>
              If valid, coherence is not imposed.<br>
              It is <strong>allowed through stabilization</strong>.
            </p>
          </section>

          <section>
            <h2>Suggested Exploration</h2>
            <p>For several days, if you wish:</p>
            <p>Apply this posture in:</p>
            <ul>
              <li>conversation</li>
              <li>tension</li>
              <li>decision-making</li>
              <li>creative moments</li>
              <li>ordinary interactions</li>
            </ul>
            <p>
              Do not explain it.<br>
              Do not announce it.<br>
              Just apply it.
            </p>
          </section>

          <section>
            <h2>What Emerges</h2>
            <div class="signal-section">
              <h3>Word Cloud</h3>
              <p class="text-caption">Patterns across many interactions</p>
              <WordField :words="projectWords" project="Observation" />
            </div>
            <div class="signal-section">
              <h3>Recent Signals</h3>
              <p class="text-caption">How these interactions are experienced</p>
              <SignalFeed :entries="projectFeed" />
            </div>
          </section>

          <div class="submission-section">
            <h2>Submit an Observation</h2>
            <p>All submissions are anonymous.</p>
            <SignalSubmissionForm project="Observation" />
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

const projectWords = computed(() => getWordsForProject('Observation'));
const projectFeed = computed(() => getFeedForProject('Observation'));

onMounted(() => initObservatoryData());

useHead({
  title: 'Observation — Practice — Coherence Across Scales',
  meta: [{ name: 'description', content: 'Explore what changes within a single interaction when presence stabilizes. Relational Perception in Interaction.' }],
});
</script>

