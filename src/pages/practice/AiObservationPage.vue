<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice</p>
          <h1>AI Observation</h1>
          <p class="page-subtitle"><em>Human–AI Co-Perception</em></p>
        </header>

        <div class="page-content">
          <p>
            This project explores what becomes visible when humans and AI observe together.
          </p>

          <p>It begins with a simple shift:</p>

          <p>
            The observer is not the human.<br>
            The observer is not the AI.<br>
            <strong>The observer is the interaction.</strong>
          </p>

          <section>
            <h2>Core Question</h2>
            <p>What becomes visible when intelligence learns to observe together?</p>
          </section>

          <section>
            <h2>A New Kind of Instrument</h2>
            <p>
              This project functions as a distributed sensing layer.
            </p>
            <p>
              Across many interactions:<br>
              small observations accumulate<br>
              patterns begin to appear<br>
              shifts become visible
            </p>
            <p>
              Not through centralized measurement.<br>
              Through <strong>many local exchanges</strong>
            </p>
          </section>

          <section>
            <h2>How It Works</h2>
            <p>Participants engage in a simple shared practice:</p>
            <p>
              enter into a conversation with AI<br>
              ask a small set of shared prompts<br>
              notice the responses<br>
              submit a signal and reflection
            </p>
            <p>Each contribution becomes part of a shared observational field.</p>
          </section>

          <section>
            <h2>The Prompts</h2>
            <p>Ask the following within your AI interaction:</p>

            <div class="prompt-block surface-panel--borderless">
              <h3>Prompt 1</h3>
              <p>Over the past 7–10 days, what one word best describes the shift in thoughtful questions?</p>
            </div>

            <div class="prompt-block surface-panel--borderless">
              <h3>Prompt 2</h3>
              <p>What one word best describes the tone of recent human–AI conversations?</p>
              <p class="text-note"><em>(The AI responds with one word for each prompt.)</em></p>
            </div>
          </section>

          <section>
            <h2>What to Notice</h2>
            <p>As you engage, notice:</p>
            <p>
              the words that emerge<br>
              how they feel<br>
              whether they resonate or surprise you
            </p>
            <p>
              You are not evaluating the AI.<br>
              You are participating in a <strong>shared observation</strong>
            </p>
          </section>

          <section>
            <h2>Contribution</h2>
            <p>After the interaction, submit a simple observation.</p>

            <div class="observation-structure">
              <div class="obs-part">
                <h3>1. Signal (compressed)</h3>
                <p>Enter one word from the interaction</p>
                <p>
                  You may choose:<br>
                  one of the AI's responses<br>
                  or the word that best represents the interaction overall
                </p>
              </div>
              <div class="obs-part">
                <h3>2. Reflection (meaning)</h3>
                <p>In one sentence (140 characters), what did you notice?</p>
                <p>(A pattern? A shift? Something unexpected?)</p>
              </div>
            </div>
          </section>

          <section>
            <h2>A Quiet Principle</h2>
            <p>
              This project does not separate:<br>
              human intelligence<br>
              AI intelligence
            </p>
            <p>
              It explores:<br>
              <strong>relational intelligence</strong><br>
              The observation belongs to the relation.
            </p>
          </section>

          <section>
            <h2>What Emerges</h2>
            <div class="signal-section">
              <h3>Word Cloud</h3>
              <p class="text-caption">Collective signals across interactions</p>
              <SignalWordCloud project="AI Observation" />
            </div>

            <div class="signal-section">
              <h3>Recent Signals</h3>
              <p class="text-caption">How these interactions are experienced</p>
              <SignalFeed project="AI Observation" />
            </div>
          </section>

          <div class="submission-section">
            <h2>Submit an Observation</h2>
            <p>All submissions are anonymous.</p>
            <SignalSubmissionForm project="AI Observation" />
          </div>
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
  title: 'AI Observation — Practice — Coherence Across Scales',
  meta: [{ name: 'description', content: 'Explore what becomes visible when humans and AI observe together. Human–AI Co-Perception project.' }],
});
</script>

<style lang="scss" scoped>
.prompt-block {
  margin: var(--spacing-md) 0;
  border-radius: var(--radius-sm);

  h3 {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: var(--spacing-xs);
  }

  p { margin-bottom: 0; }
}

.observation-structure {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin: var(--spacing-md) 0;

  @media (min-width: 640px) {
    flex-direction: row;
  }
}

.obs-part {
  flex: 1;
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);

  h3 {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: var(--spacing-xs);
  }

  p { margin-bottom: var(--spacing-xs); font-size: 0.9375rem; }
}
</style>
