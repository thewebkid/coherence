<template>
  <div class="project-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="project-category">Practice</p>
          <h1>Dialogue</h1>
          <p class="project-subtitle"><em>Conversational Recursion</em></p>
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

          <section>
            <h2>What Emerges</h2>
            <div class="signal-section">
              <h3>Word Cloud</h3>
              <p class="section-label">Patterns across many conversations</p>
              <SignalWordCloud project="Dialogue" />
            </div>
            <div class="signal-section">
              <h3>Recent Signals</h3>
              <p class="section-label">How recognition is experienced</p>
              <SignalFeed project="Dialogue" />
            </div>
          </section>

          <section class="submission-section">
            <h2>Submit an Observation</h2>
            <p>All submissions are anonymous.</p>
            <SignalSubmissionForm project="Dialogue" />
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
  title: 'Dialogue — Practice — Coherence Across Scales',
  meta: [{ name: 'description', content: 'Explore what happens when meaning is recognized and allowed to deepen within conversation. Conversational Recursion.' }],
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
}

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
