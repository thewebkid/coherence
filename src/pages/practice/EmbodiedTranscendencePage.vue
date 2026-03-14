<template>
  <div class="embodied-transcendence-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Embodied Transcendence</h1>
        </header>

        <div class="page-content">
          <section class="opening">
            <h2>Coherence Conducted Through Ordinary Life</h2>
            <p>
              Transcendence is often imagined as departure from the world.<br>
              A movement beyond material life.<br>
              Beyond tension, complexity, and relationship.
            </p>
            <p>
              But there is another form.
            </p>
            <p>
              Embodied transcendence does not rise above life.<br>
              It moves through it.
            </p>
            <p>
              It appears when a person remains fully present<br>
              within ordinary reality<br>
              while carrying a stabilized way of being<br>
              that allows coherence to appear and travel.
            </p>
          </section>

          <section>
            <h2>A Different Orientation</h2>
            <p>
              To transcend is not to escape life.<br>
              It is to conduct coherence through it.
            </p>
            <p>
              Not through belief.<br>
              Not through performance.<br>
              Through participation.
            </p>
            <p>
              A regulated organism participating without needing to control the field.<br>
              This is not a spiritual state. It is a behavioral condition.
            </p>
          </section>

          <section>
            <h2>Presence</h2>
            <p>
              Embodied transcendence begins with presence.
            </p>
            <p>
              Presence is stabilized participation in reality without defensive distortion.<br>
              It includes:
            </p>
            <ul>
              <li>nervous system regulation</li>
              <li>attentional steadiness</li>
              <li>non-reactive listening</li>
              <li>reduced dominance signaling</li>
              <li>equality of relational stance</li>
            </ul>
            <p>
              Presence is not passivity.<br>
              Not detachment.<br>
              Not charisma.<br>
              Not intensity.
            </p>
            <p>
              It is a regulated organism participating without needing to dominate or withdraw.<br>
              Presence stabilizes local conditions within interaction.
            </p>
          </section>

          <section>
            <h2>Propagation</h2>
            <p>
              When coherence stabilizes locally, it rarely remains local.
            </p>
            <p>
              Other organisms register regulation.<br>
              Tone shifts.<br>
              Pacing shifts.<br>
              Signals of safety increase.<br>
              Authenticity becomes easier.
            </p>
            <p>
              This is propagation. The transmission of regulated patterns across relational systems.<br>
              Not through persuasion. Through exposure.
            </p>
            <p>
              Presence is the source condition.<br>
              Propagation is the distribution mechanism.<br>
              Together they form a living circuit.
            </p>
          </section>

          <section>
            <h2>Presence → Propagation</h2>
            <p>
              Presence allows coherence to appear.<br>
              Propagation allows coherence to travel.<br>
              One without the other is incomplete.
            </p>
            <p>
              Presence without propagation remains private.<br>
              Propagation without presence becomes performance.
            </p>
            <p>
              Together, they create living coherence within and across environments.
            </p>
          </section>

          <section>
            <h2>Across Scales</h2>
            <p>
              Coherence does not move only within individuals.<br>
              It moves across nested scales:
            </p>
            <ul>
              <li>self</li>
              <li>relationship</li>
              <li>environment</li>
              <li>culture</li>
              <li>living systems</li>
            </ul>
            <p>
              Perception of reality and participation across scales are not separate.<br>
              They arise and are embodied together.
            </p>
            <p>
              When coherence stabilizes locally, its effects may ripple outward.<br>
              Not always visibly.<br>
              Not always immediately.<br>
              But often enough to notice.
            </p>
            <p>
              Embodied transcendence is participation within this multi-scale reciprocity.
            </p>
          </section>

          <section>
            <h2>A Working Understanding</h2>
            <p>
              Coherence is not metaphysical theory.<br>
              It is embodied biology expressing relational intelligence.
            </p>
            <p>
              If coherence begins physically within the body, then every human being is already equipped for it.<br>
              No initiation required.<br>
              No special status required.<br>
              No ideology required.<br>
              Only participation.
            </p>
          </section>

          <section>
            <h2>Why This Matters</h2>
            <p>
              If coherence can be conducted through ordinary behavior, then small acts of regulated presence may influence relational environments more than dramatic intervention.
            </p>
            <p>
              Not everywhere.<br>
              Not always.<br>
              But often enough to matter.
            </p>
            <p>
              Embodied transcendence is not removal from the world.<br>
              It is the quiet conduction of coherence through daily life.
            </p>
          </section>

          <section>
            <h2>A Simple Way to Hold It</h2>
            <div class="closing-poem">
              <p>To transcend<br>
              is not to leave life.<br>
              It is to remain fully within it<br>
              while carrying a way of being<br>
              that allows coherence to appear<br>
              and travel.</p>
            </div>
          </section>

          <p class="closing-line">
            <em>The most subtle forms of influence are often the most enduring.</em>
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
import BackToTop from '@/components/BackToTop.vue';

const route = useRoute();

useHead({
  title: 'Embodied Transcendence — Practice — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Embodied Transcendence — Practice — Coherence Across Scales' },
    { property: 'og:description', content: 'The integrative principle. Presence and propagation, held together across scales, as a working definition of what transcendence might mean behaviorally.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'The integrative principle. Presence and propagation, held together across scales, as a working definition of what transcendence might mean behaviorally.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Embodied Transcendence — Practice — Coherence Across Scales' },
    { name: 'twitter:description', content: 'The integrative principle. Presence and propagation, held together across scales, as a working definition of what transcendence might mean behaviorally.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
.embodied-transcendence-page {
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
      margin-bottom: var(--spacing-sm);
      line-height: 1.7;
    }
  }
}

.opening {
  font-size: 1.0625rem;
  color: var(--text);
  margin-bottom: var(--spacing-xl);
}

.closing-poem {
  padding: var(--spacing-xl) var(--spacing-lg);
  background: var(--bg-secondary);
  border-left: 3px solid var(--accent);
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--text);
  
  p {
    margin-bottom: var(--spacing-xs);
  }
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
