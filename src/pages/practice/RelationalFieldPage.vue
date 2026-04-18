<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">Practice</p>
          <h1>Relational Field</h1>
          <p class="page-subtitle"><em>Ecological Spread of Coherence</em></p>
        </header>

        <div class="page-content">
          <p>
            This project explores how coherence behaves <strong>across environments over time</strong>.
          </p>
          <p>It begins with a simple question:</p>
          <p>
            If one interaction can shift, what happens when that presence repeats?<br>
            Does coherence remain local?<br>
            Or does it begin to <strong>accumulate</strong>?
          </p>

          <section>
            <h2>Core Question</h2>
            <p>Does stabilized presence influence the tone of environments over time?</p>
          </section>

          <section>
            <h2>Working Premise</h2>
            <p>Single interactions matter.</p>
            <p>But patterns may only become visible across:</p>
            <p>days<br>settings<br>relationships</p>
            <p>
              This project observes:<br>
              <strong>whether coherence leaves traces</strong>
            </p>
          </section>

          <section>
            <h2>Working Hypothesis</h2>
            <p>Repeated stabilized participation may gradually influence relational environments.</p>
            <p>
              Not through persuasion.<br>
              Not through explanation.<br>
              Through <strong>consistency of presence</strong>.
            </p>
            <p>Possible pattern:</p>
            <p>
              regulated presence (repeated)<br>
              → consistent signals of safety<br>
              → reduced ambient vigilance<br>
              → increased authenticity<br>
              → reciprocal regulation<br>
              → gradual shift in relational tone
            </p>
            <p>
              If valid:<br>
              environments may begin to <strong>expect regulation rather than reactivity</strong>
            </p>
          </section>

          <section>
            <h2>Suggested Exploration</h2>
            <p>For several days or weeks, if you wish:</p>
            <p>
              Continue as a formative observer.<br>
              But now, notice patterns across:<br>
              work<br>
              home<br>
              friendships<br>
              public spaces<br>
              creative environments
            </p>
            <p>
              Do not explain what you are doing.<br>
              Do not attempt to influence outcomes.<br>
              Just <strong>participate consistently</strong> and observe.
            </p>
          </section>

          <section>
            <h2>What Emerges</h2>
            <div class="signal-section">
              <h3>Word Cloud</h3>
              <p class="text-caption">Environmental patterns across time</p>
              <SignalWordCloud project="Relational Field" />
            </div>
            <div class="signal-section">
              <h3>Recent Signals</h3>
              <p class="text-caption">How coherence behaves over time</p>
              <SignalFeed project="Relational Field" />
            </div>
          </section>

          <div class="submission-section">
            <h2>Submit an Observation</h2>
            <p>All submissions are anonymous.</p>
            <SignalSubmissionForm project="Relational Field" />
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
  title: 'Relational Field — Practice — Coherence Across Scales',
  meta: [{ name: 'description', content: 'Explore how coherence behaves across environments over time. Ecological Spread of Coherence.' }],
});
</script>

