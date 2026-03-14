<template>
  <div class="conversational-recursion-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Conversational Recursion</h1>
        </header>

        <div class="page-content">
          <section>
            <h2>Identity-Level Amplification of Coherence</h2>
            <p>
              Occasionally in conversation, someone reveals something meaningful about themselves.<br>
              Often this passes quickly.<br>
              The moment appears, then disappears beneath the movement of dialogue.
            </p>
            <p>
              This project explores what happens when such moments are gently recognized and allowed to deepen.<br>
              Not to direct the conversation.<br>
              Not to guide outcomes.<br>
              Simply to honor what has already appeared.
            </p>
          </section>

          <section>
            <h2>Core Question</h2>
            <p>
              <strong>Can reflective recognition deepen and stabilize coherence within an interaction?</strong>
            </p>
            <p>
              When a person feels accurately seen or understood, their nervous system often shifts.<br>
              Defensive monitoring decreases.<br>
              Social vigilance softens.<br>
              Authenticity increases.<br>
              Regulation deepens.
            </p>
            <p>
              This project explores whether such moments can amplify coherence within conversations and propagate beyond them.
            </p>
          </section>

          <section>
            <h2>What Is Conversational Recursion?</h2>
            <p>
              Conversational recursion occurs when a meaningful signal expressed by one person is gently reflected and allowed to expand.<br>
              Not interpreted.<br>
              Not corrected.<br>
              Not redirected.<br>
              Simply recognized and returned with care.
            </p>
            <p>
              <strong>Example:</strong> Someone expresses a value, realization, or honest feeling. A formative observer may reflect it back with slight expansion, allowing the person to hear and feel their own meaning more clearly. The conversation does not shift away from them. It deepens around what is already present.
            </p>
            <p>
              This is recursion. Meaning returning to itself with greater clarity.
            </p>
          </section>

          <section>
            <h2>Proposed Mechanism</h2>
            <p>
              When someone feels accurately seen:
            </p>
            <div class="mechanism-chain">
              <p>reduced defensive monitoring<br>
              → increased physiological regulation<br>
              → increased authenticity<br>
              → greater clarity of expression<br>
              → deeper relational coherence</p>
            </div>
            <p>
              This may function as identity-level regulation.<br>
              Not only nervous system stabilization, but stabilization of self-perception within relationship.<br>
              When identity stabilizes, coherence often strengthens.
            </p>
          </section>

          <section>
            <h2>Why This May Amplify Propagation</h2>
            <p>
              Moments of genuine recognition tend to travel.<br>
              When a person experiences:
            </p>
            <ul>
              <li>being seen</li>
              <li>being understood</li>
              <li>having meaning acknowledged</li>
            </ul>
            <p>
              they often carry that regulation into future interactions. Into:
            </p>
            <ul>
              <li>other conversations</li>
              <li>other environments</li>
              <li>other relationships</li>
            </ul>
            <p>
              In this way, coherence may propagate through identity-level affirmation.<br>
              Not imposed. Invited.
            </p>
          </section>

          <section>
            <h2>Suggested Exploration</h2>
            <p>
              During ordinary conversations, if you wish:
            </p>
            <p>
              Notice when someone expresses something genuine or meaningful.<br>
              A realization.<br>
              A value.<br>
              A subtle truth.<br>
              A moment of honesty.
            </p>
            <p>
              If natural, gently reflect what you hear.<br>
              Allow it to expand slightly.<br>
              Then let it rest.
            </p>
            <p>
              Do not force depth.<br>
              Do not perform insight.<br>
              Do not guide the outcome.<br>
              Simply allow meaningful signals to become more visible to the person expressing them.<br>
              Then observe what unfolds.
            </p>
          </section>

          <section>
            <h2>What to Notice</h2>
            <p>
              After such moments, gently observe:
            </p>
            <ul>
              <li>Does the person become more regulated?</li>
              <li>More present?</li>
              <li>More open?</li>
              <li>More precise?</li>
              <li>Does the conversation deepen or stabilize?</li>
              <li>Does tone shift?</li>
              <li>Does trust increase?</li>
              <li>Or does nothing change?</li>
            </ul>
            <p>
              All outcomes are valid observations. No interpretation required.
            </p>
          </section>

          <section>
            <h2>Possible Indicators</h2>
            <p>
              You may notice:
            </p>
            <ul>
              <li>reduced conversational defensiveness</li>
              <li>increased clarity of expression</li>
              <li>more relaxed pacing</li>
              <li>greater mutual presence</li>
              <li>deeper listening</li>
              <li>subtle increases in trust or care</li>
            </ul>
            <p>
              Or you may notice no visible effect. Both are valuable observations.
            </p>
          </section>

          <section class="share-section">
            <h2>Optional: Share Observations</h2>
            <p>
              If you wish to share what you notice, you may submit observations anonymously.<br>
              These reflections are received as part of an ongoing exploration into how coherence behaves within conversation.<br>
              No conclusions are imposed. Patterns are allowed to emerge.
            </p>
            
            <ObservationForm project="Conversational Recursion" />
            
            <p class="journal-note">
              <em>Almost like leaving a note in a shared field journal.</em>
            </p>
          </section>

          <section>
            <h2>Relationship to the Loop</h2>
            <p>
              Observer recognizes signal.<br>
              Recognition stabilizes identity.<br>
              Stabilized identity deepens coherence.<br>
              Coherence propagates beyond the moment.<br>
              Recursion becomes amplification.
            </p>
          </section>

          <p class="closing-line">
            <em>To be seen clearly is often to become more fully oneself.</em>
          </p>

          <div class="page-footer">
            <BackToTop />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';
import ObservationForm from '@/components/ObservationForm.vue';
import BackToTop from '@/components/BackToTop.vue';

const route = useRoute();

useHead({
  title: 'Conversational Recursion — Practice — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Conversational Recursion — Practice — Coherence Across Scales' },
    { property: 'og:description', content: 'Can reflective recognition deepen and amplify relational coherence?' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'Can reflective recognition deepen and amplify relational coherence?' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Conversational Recursion — Practice — Coherence Across Scales' },
    { name: 'twitter:description', content: 'Can reflective recognition deepen and amplify relational coherence?' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.conversational-recursion-page {
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

.journal-note {
  margin-top: var(--spacing-md);
  text-align: center;
  font-size: 0.9375rem;
  color: var(--text-muted);
}

.closing-line {
  margin-top: var(--spacing-xl);
  text-align: center;
  font-size: 1rem;
  color: var(--text-muted);
}

.page-footer {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
}
</style>
