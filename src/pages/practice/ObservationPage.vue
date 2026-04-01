<template>
  <div class="project-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="project-category">Practice</p>
          <h1>Observation</h1>
          <p class="project-subtitle"><em>Relational Perception in Interaction</em></p>
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
              <p class="section-label">Patterns across many interactions</p>
              <SignalWordCloud project="Observation" />
            </div>
            <div class="signal-section">
              <h3>Recent Signals</h3>
              <p class="section-label">How these interactions are experienced</p>
              <SignalFeed project="Observation" />
            </div>
          </section>

          <section class="submission-section">
            <h2>Submit an Observation</h2>
            <p>All submissions are anonymous.</p>
            <SignalSubmissionForm project="Observation" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import SignalSubmissionForm from '@/components/SignalSubmissionForm.vue';
import SignalWordCloud from '@/components/SignalWordCloud.vue';
import SignalFeed from '@/components/SignalFeed.vue';

useHead({
  title: 'Observation — Practice — Coherence Across Scales',
  meta: [{ name: 'description', content: 'Explore what changes within a single interaction when presence stabilizes. Relational Perception in Interaction.' }],
});
</script>

<style lang="scss" scoped>
.project-category {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  margin-bottom: var(--spacing-xs);
}

.project-subtitle {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  color: var(--text-muted);
  margin-top: var(--spacing-xs);
}

.page-content {
  section {
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--border);
  }

  p { margin-bottom: var(--spacing-md); line-height: 1.75; }

  ul {
    margin: var(--spacing-sm) 0 var(--spacing-md);
    padding-left: 1.5rem;
    li { margin-bottom: var(--spacing-xs); line-height: 1.7; }
  }
}

.signal-section {
  margin-bottom: var(--spacing-xl);

  h3 {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: var(--spacing-xs);
  }
}

.section-label {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: var(--spacing-sm);
}

.submission-section {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  margin-top: var(--spacing-xl);
  border-top: none !important;
}
</style>
