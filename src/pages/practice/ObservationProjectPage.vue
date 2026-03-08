<template>
  <div class="observation-project-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>The Observation Project</h1>
        </header>

        <div class="page-content">
          <p class="opening">
            This work explores coherence as lived behavior, not theory.<br>
            Some visitors choose to test these ideas within their own daily interactions.
          </p>
          
          <p>
            Observation is simple:<br>
            notice what changes<br>
            when one person stabilizes their presence<br>
            within a situation.
          </p>
          
          <p>
            You are welcome to participate.
          </p>

          <section>
            <h2>The Formative Observer</h2>
            <p>
              A formative observer is someone who intentionally stabilizes their presence within an interaction.<br>
              Not to control it.<br>
              Not to teach.<br>
              Not to perform.<br>
              Simply to observe while maintaining:
            </p>
            <ul>
              <li>steadiness</li>
              <li>non-reactivity</li>
              <li>equality of presence</li>
              <li>reduced display of superiority</li>
            </ul>
            <p>
              The formative observer does not erase difference.<br>
              They stabilize equality of presence within difference.
            </p>
            <p>
              In this way, the formative observer becomes a regulator of relational conditions —<br>
              not by controlling others, but by stabilizing self.
            </p>
          </section>

          <section>
            <h2>Working Hypothesis</h2>
            <p>
              Coherence within human interaction may have a physiological and behavioral foundation.
            </p>
            <p>
              A formative observer intentionally stabilizes their presence within an interaction.<br>
              This stabilization occurs across multiple levels:
            </p>
            <ul>
              <li>breath and autonomic rhythm</li>
              <li>attentional steadiness</li>
              <li>non-reactive listening</li>
              <li>reduction of dominance signals</li>
              <li>equality of presence</li>
            </ul>
            <p>
              When one participant stabilizes in this way, measurable shifts may occur.
            </p>
          </section>

          <section>
            <h2>Proposed Mechanism</h2>
            <p>
              Conscious, non-reactive observation may stabilize autonomic rhythm.<br>
              Stabilized autonomic rhythm communicates safety through subtle social signals.<br>
              Perceived safety allows more authentic expression.<br>
              Authentic expression increases relational coherence.
            </p>
            <p>
              This suggests a possible chain:
            </p>
            <div class="mechanism-chain">
              <p><strong>Regulated autonomic state →</strong><br>
              <strong>regulated social signaling →</strong><br>
              <strong>perceived safety →</strong><br>
              <strong>reciprocal regulation →</strong><br>
              <strong>increased relational coherence</strong></p>
            </div>
            <p>
              If valid, this would indicate a physiological substrate beneath what we have been calling <em>field effect</em>.<br>
              Not mystical. Potentially measurable within relational biology.
            </p>
          </section>

          <section>
            <h2>Observable Indicators</h2>
            <p>
              If conscious, non-reactive observation increases autonomic flexibility and vagal tone, we may observe subtle shifts such as:
            </p>
            <ul>
              <li>facial muscles softening</li>
              <li>vocal tone and pacing changing</li>
              <li>micro-expressions becoming less guarded</li>
              <li>breathing stabilizing</li>
              <li>conversational timing slowing</li>
              <li>increased tolerance for pauses</li>
              <li>reduced defensive behavior</li>
            </ul>
            <p>
              These signals are often read unconsciously by others and may contribute to reciprocal regulation within an interaction.
            </p>
          </section>

          <section>
            <h2>Research Context</h2>
            <p>
              This hypothesis is consistent with emerging research in:
            </p>
            <ul>
              <li>autonomic regulation and vagal tone</li>
              <li>polyvagal theory</li>
              <li>affect regulation</li>
              <li>social baseline theory</li>
              <li>interpersonal synchrony</li>
              <li>unconscious mirroring and behavioral entrainment</li>
            </ul>
            <p>
              The Observation Project does not attempt to prove these models.<br>
              It simply explores whether similar patterns are observable in daily life through direct experience.
            </p>
          </section>

          <section>
            <h2>What We Are Exploring</h2>
            <p>
              If even one regulated participant can measurably shift the quality of an interaction, then coherence may spread primarily through stabilized presence rather than persuasion or agreement.
            </p>
            <p>
              This is testable in ordinary life.<br>
              Not everywhere.<br>
              Not always.<br>
              But often enough to notice patterns.
            </p>
            <p>
              If coherence has a physiological foundation, it should be observable wherever human beings meet.
            </p>
          </section>

          <section>
            <h2>Suggested Exploration</h2>
            <p>
              For several days, if you wish:
            </p>
            <p>
              Practice being a formative observer in:
            </p>
            <ul>
              <li>conversation</li>
              <li>tension</li>
              <li>decision-making</li>
              <li>creative moments</li>
              <li>ordinary daily exchanges</li>
            </ul>
            <p>
              Do not explain the practice.<br>
              Do not teach it.<br>
              Do not announce it.<br>
              Simply apply it.
            </p>
          </section>

          <section>
            <h2>What to Notice</h2>
            <p>
              Afterward, note:
            </p>
            <ul>
              <li>what shifts</li>
              <li>what does not shift</li>
              <li>where it fails</li>
              <li>where it stabilizes</li>
              <li>whether safety increases</li>
              <li>whether authenticity increases</li>
              <li>whether clarity increases</li>
            </ul>
            <p>
              No interpretation required. Just observation.
            </p>
          </section>

          <section class="share-section">
            <h2>Optional: Share Observations</h2>
            <p>
              If you wish to share what you notice, you may submit observations anonymously.<br>
              These are read as part of an ongoing exploration into how coherence behaves across contexts.
            </p>
            
            <ObservationForm project="Observation" />
          </section>

          <div class="page-footer">
            <BackToTop />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import ObservationForm from '@/components/ObservationForm.vue';
import BackToTop from '@/components/BackToTop.vue';

useHead({
  title: 'The Observation Project — Practice — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'The Observation Project — Practice — Coherence Across Scales' },
    { property: 'og:description', content: 'Refining the formative observer. Learning to slow interpretation and judgment before reacting. Developing clear seeing as behavioral substrate.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'Refining the formative observer. Learning to slow interpretation and judgment before reacting. Developing clear seeing as behavioral substrate.' },
  ],
});
</script>

<style lang="scss" scoped>
.observation-project-page {
  padding: var(--spacing-section) 0;
}

.page-header {
  margin-bottom: var(--spacing-xl);
  
  h1 {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    margin-bottom: 0;
  }
}

.page-content {
  max-width: 720px;
  margin: 0 auto;
  
  p {
    margin-bottom: var(--spacing-md);
    line-height: 1.7;
  }
  
  section {
    margin-bottom: var(--spacing-xl);
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: var(--spacing-md);
    }
  }
  
  ul {
    margin: var(--spacing-md) 0;
    padding-left: var(--spacing-lg);
    
    li {
      margin-bottom: var(--spacing-xs);
      line-height: 1.7;
    }
  }
}

.opening {
  font-size: 1.0625rem;
  color: var(--text);
  margin-bottom: var(--spacing-xl);
}

.mechanism-chain {
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--accent);
  
  p {
    margin: 0;
    line-height: 1.6;
  }
}

.share-section {
  margin-top: var(--spacing-section);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border);
}

.page-footer {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
}
</style>
