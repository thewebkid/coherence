<template>
  <div class="behavioral-ecology-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>The Behavioral Ecology Project</h1>
        </header>

        <div class="page-content">
          <section>
            <h2>Ecological Spread of Embodied Coherence</h2>
            <p>
              This project explores whether coherence propagates across environments over time.<br>
              Not as theory. As lived observation.
            </p>
            <p>
              If one regulated participant can stabilize an interaction, what happens when that participation repeats across days, settings, and relationships?<br>
              Does coherence remain local?<br>
              Or does it begin to spread?
            </p>
          </section>

          <section>
            <h2>Core Question</h2>
            <p>
              <strong>Does embodied coherence propagate across environments through repeated regulated participation?</strong>
            </p>
            <p>
              This project moves beyond single interactions to observe patterns across time.
            </p>
            <p>
              Workplaces.<br>
              Homes.<br>
              Creative spaces.<br>
              Public environments.<br>
              Ordinary daily exchanges.
            </p>
            <p>
              The aim is not to produce coherence everywhere.<br>
              It is to observe where and how it travels.
            </p>
          </section>

          <section>
            <h2>Working Hypothesis</h2>
            <p>
              Repeated stabilized participation may gradually alter relational tone within an environment.<br>
              Not through persuasion.<br>
              Not through explanation.<br>
              Through consistent behavioral regulation.
            </p>
            <p>
              If valid, we may observe:
            </p>
            <ul>
              <li>subtle shifts in conversational tone</li>
              <li>increased tolerance for pauses and reflection</li>
              <li>reduced defensive escalation</li>
              <li>more authentic expression</li>
              <li>stabilization of group pacing</li>
              <li>increased mutual regulation</li>
            </ul>
            <p>
              These shifts may appear slowly and unevenly. But patterns may emerge.
            </p>
          </section>

          <section>
            <h2>Proposed Mechanism</h2>
            <p>
              When one participant repeatedly stabilizes:
            </p>
            <div class="mechanism-chain">
              <p>regulated nervous system<br>
              → consistent social safety signals<br>
              → reduced ambient vigilance<br>
              → increased authenticity<br>
              → reciprocal regulation<br>
              → environmental tone shift</p>
            </div>
            <p>
              Over time, environments may begin to "expect" regulation rather than reactivity.<br>
              Coherence becomes part of the relational baseline.<br>
              Not imposed. Cultivated through presence.
            </p>
          </section>

          <section>
            <h2>What This Project Explores</h2>
            <p>
              Whether coherence:
            </p>
            <ul>
              <li>remains interaction-specific, or</li>
              <li>accumulates across interactions</li>
            </ul>
            <p>
              Whether stabilized presence:
            </p>
            <ul>
              <li>dissipates quickly, or</li>
              <li>leaves subtle environmental traces</li>
            </ul>
            <p>
              Whether repeated regulation:
            </p>
            <ul>
              <li>influences group dynamics</li>
              <li>alters decision-making tone</li>
              <li>changes how tension resolves</li>
              <li>increases clarity or care within shared spaces</li>
            </ul>
            <p>
              This is not controlled research. It is lived ecological observation.
            </p>
          </section>

          <section>
            <h2>Suggested Exploration</h2>
            <p>
              For several days or weeks, if you wish:
            </p>
            <p>
              Continue practicing as a formative observer.<br>
              But now notice patterns across environments:
            </p>
            <ul>
              <li>work</li>
              <li>home</li>
              <li>friendships</li>
              <li>creative settings</li>
              <li>public encounters</li>
            </ul>
            <p>
              Do not explain what you are doing.<br>
              Do not attempt to influence outcomes.<br>
              Simply participate with regulated presence and observe what unfolds over time.
            </p>
          </section>

          <section>
            <h2>What to Notice</h2>
            <p>
              Across days or weeks, gently observe:
            </p>
            <ul>
              <li>Where coherence begins to stabilize more easily</li>
              <li>Where it dissipates quickly</li>
              <li>Where resistance remains strong</li>
              <li>Where unexpected openness appears</li>
              <li>Where tone shifts subtly</li>
              <li>Where it has no visible effect</li>
            </ul>
            <p>
              No interpretation required. Only noticing.
            </p>
          </section>

          <section>
            <h2>Possible Indicators of Ecological Spread</h2>
            <p>
              You may notice:
            </p>
            <ul>
              <li>conversations becoming less rushed</li>
              <li>pauses becoming more natural</li>
              <li>emotional tone softening</li>
              <li>reduced escalation during tension</li>
              <li>others regulating more quickly</li>
              <li>increased willingness to listen</li>
              <li>subtle increases in trust or clarity</li>
            </ul>
            <p>
              These shifts are often small. Their significance lies in accumulation.
            </p>
          </section>

          <section class="share-section">
            <h2>Optional: Share Observations</h2>
            <p>
              If you wish to share what you notice over time, you may submit observations anonymously.<br>
              These reflections help reveal patterns in how coherence behaves across environments.<br>
              No analysis is imposed. Patterns are allowed to emerge.
            </p>
            
            <ObservationForm project="Behavioral Ecology" />
          </section>

          <section>
            <h2>Why This Matters</h2>
            <p>
              If coherence spreads primarily through stabilized participation rather than persuasion or agreement, then its primary transmission pathway is behavioral.<br>
              Not ideological.<br>
              Not institutional.<br>
              Ecological.
            </p>
            <p>
              This suggests that small, consistent acts of regulated presence may influence relational environments more than dramatic interventions.<br>
              Not everywhere.<br>
              Not always.<br>
              But often enough to observe.
            </p>
          </section>

          <section>
            <h2>Relationship to the Loop</h2>
            <p>
              Observer stabilizes perception.<br>
              Stabilized perception alters participation.<br>
              Altered participation shifts relational conditions.<br>
              Shifted conditions influence future interactions.<br>
              Across time and environments, this becomes ecological participation.
            </p>
          </section>

          <p class="closing-line">
            <em>Coherence rarely announces itself. It accumulates.</em>
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
  title: 'The Behavioral Ecology Project — Practice — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'The Behavioral Ecology Project — Practice — Coherence Across Scales' },
    { property: 'og:description', content: 'Does embodied coherence propagate across environments through repeated regulated participation?' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'Does embodied coherence propagate across environments through repeated regulated participation?' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'The Behavioral Ecology Project — Practice — Coherence Across Scales' },
    { name: 'twitter:description', content: 'Does embodied coherence propagate across environments through repeated regulated participation?' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.behavioral-ecology-page {
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
