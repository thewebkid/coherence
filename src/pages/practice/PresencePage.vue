<template>
  <div class="project-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="project-category">Practice</p>
          <h1>Presence</h1>
          <p class="project-subtitle"><em>Embodied Transcendence in Daily Life</em></p>
        </header>

        <div class="page-content">
          <p>This project explores a simple possibility:</p>
          <p>
            Coherence can be lived through ordinary life.<br>
            Not outside it, and not beyond it.<br>
            Through it.
          </p>

          <section>
            <h2>Core Question</h2>
            <p>Can a stabilized way of being allow coherence to appear and travel through daily life?</p>
          </section>

          <section>
            <h2>A Different Orientation</h2>
            <p>
              Transcendence is often imagined as leaving the world.<br>
              This project explores another form:
            </p>
            <p>
              Not leaving life—<br>
              but remaining fully within it, differently.
            </p>
          </section>

          <section>
            <h2>Working Premise</h2>
            <p>Coherence does not require belief.</p>
            <p>It emerges when a person:</p>
            <ul>
              <li>remains present</li>
              <li>participates without domination or withdrawal</li>
              <li>stabilizes their internal state</li>
            </ul>
            <p>
              This is not a spiritual performance.<br>
              It is a <strong>behavioral condition</strong>
            </p>
          </section>

          <section>
            <h2>Presence</h2>
            <p>Presence is stabilized participation in reality.</p>
            <p>It includes:</p>
            <ul>
              <li>regulated nervous system</li>
              <li>steady attention</li>
              <li>non-reactive listening</li>
              <li>reduced dominance signaling</li>
              <li>equality of relational stance</li>
            </ul>
            <p>Presence is not:</p>
            <ul>
              <li>passivity</li>
              <li>detachment</li>
              <li>intensity</li>
              <li>performance</li>
            </ul>
            <p>
              It is:<br>
              <strong>a regulated organism participating without needing to control the field</strong>
            </p>
          </section>

          <section>
            <h2>Propagation</h2>
            <p>
              When coherence stabilizes, it rarely remains isolated.<br>
              Others register it.
            </p>
            <p>
              tone shifts<br>
              pacing changes<br>
              safety increases<br>
              authenticity becomes easier
            </p>
            <p>
              This is propagation.<br>
              Coherence traveling through relationship.
            </p>
            <p>
              presence → propagation<br>
              Presence allows coherence to appear<br>
              Propagation allows coherence to travel<br>
              One without the other is incomplete.
            </p>
          </section>

          <section>
            <h2>Suggested Exploration</h2>
            <p>For several days, if you wish:</p>
            <p>
              move through ordinary life<br>
              remain present in interaction<br>
              stabilize your participation
            </p>
            <p>
              Do not perform it.<br>
              Do not announce it.<br>
              Just <strong>live it</strong>.
            </p>
          </section>

          <section>
            <h2>What Emerges</h2>
            <div class="signal-section">
              <h3>Word Cloud</h3>
              <p class="section-label">Patterns of lived presence</p>
              <SignalWordCloud project="Presence" />
            </div>
            <div class="signal-section">
              <h3>Recent Signals</h3>
              <p class="section-label">How coherence moves through life</p>
              <SignalFeed project="Presence" />
            </div>
          </section>

          <section class="submission-section">
            <h2>Submit an Observation</h2>
            <p>All submissions are anonymous.</p>
            <SignalSubmissionForm project="Presence" />
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
  title: 'Presence — Practice — Coherence Across Scales',
  meta: [{ name: 'description', content: 'Explore how coherence can be lived through ordinary life. Embodied Transcendence in Daily Life.' }],
});
</script>

<style lang="scss" scoped>
.project-category { font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: var(--spacing-xs); }
.project-subtitle { font-family: var(--font-serif); font-size: 1.0625rem; color: var(--text-muted); margin-top: var(--spacing-xs); }
.page-content {
  section { margin-top: var(--spacing-xl); padding-top: var(--spacing-lg); border-top: 1px solid var(--border); }
  p { margin-bottom: var(--spacing-md); line-height: 1.75; }
  ul { margin: var(--spacing-sm) 0 var(--spacing-md); padding-left: 1.5rem; li { margin-bottom: var(--spacing-xs); line-height: 1.7; } }
}
.signal-section { margin-bottom: var(--spacing-xl); h3 { font-family: var(--font-sans); font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: var(--spacing-xs); } }
.section-label { font-family: var(--font-serif); font-style: italic; font-size: 0.875rem; color: var(--text-muted); margin-bottom: var(--spacing-sm); }
.submission-section { background: var(--bg-secondary); border-radius: var(--radius-md); padding: var(--spacing-xl); margin-top: var(--spacing-xl); border-top: none !important; }
</style>
