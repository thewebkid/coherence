<template>
  <div class="orientation-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Orientation</h1>
        </header>

        <div class="page-content">
          <p>A more coherent civilization does not arrive all at once.</p>
          <p>It emerges gradually through shifts in how life relates to itself across scales.</p>
          <p>
            At present, humanity stands within a period of accelerated connection without corresponding
            coherence. Systems are increasingly interdependent, yet relational trust and alignment often
            lag behind. Technologies expand reach and capability, while the capacity to live in mutual
            regard and shared responsibility develops more slowly. The result is a widening gap between
            what is possible and what is sustainable.
          </p>
          <p>This gap cannot be resolved by systems alone.</p>
          <p>It resolves through lived coherence.</p>
          <p>
            Coherence begins locally. It forms within a body, between beings, and across the relational
            fields that make up lived experience. From these local conditions, larger patterns emerge.
            When coherence is practiced consistently at the level of lived experience, it begins to
            propagate across networks, institutions, and cultures. What stabilizes in one place influences
            another. Over time, distributed patterns of alignment form the basis of a more harmonious civilization.
          </p>
          <p>This principle applies across scales of existence.</p>
          <p>Cellular and nervous system coherence influence relational tone.</p>
          <p>Relational tone influences community and culture.</p>
          <p>Cultural patterns influence societal and planetary outcomes.</p>
          <p>
            Across all scales, similar dynamics repeat: alignment fosters stability, while fragmentation
            generates friction and loss of trust. Recognizing this continuity allows coherence to be
            approached not as an abstract ideal but as a practical orientation toward life.
          </p>
          <p>A simple but powerful insight follows:</p>

          <blockquote>
            <p>Civilizational change is inseparable from the quality of coherence expressed in local fields of relationship.</p>
          </blockquote>

          <p>
            Where coherence is lived, even quietly, its effects extend beyond immediate surroundings.
            The distance between present fragmentation and future integration begins to narrow.
            What appears distant becomes immediate. What appears global becomes local.
            What appears personal reveals itself as civilizational.
          </p>
          <p>
            To support this emergence, a practical architecture of coherence can be recognized.
            It is not owned by any group or tradition and does not require affiliation.
            It consists of interrelated capacities that together form a living engine of coherence:
          </p>
          <ul>
            <li>shared becoming</li>
            <li>relational coherence</li>
            <li>harmonized sovereignty</li>
            <li>alignment</li>
            <li>return</li>
          </ul>
          <p>
            These capacities are not theoretical constructs. They are lived patterns that can be embodied
            in daily interactions and choices. When practiced together, they generate conditions in which
            trust, creativity, and mutual flourishing become more stable across contexts. Over time, these
            conditions enable forms of cooperation and intelligence that extend beyond individual or
            institutional interests.
          </p>
          <p>
            Participation in this process is inherently non-hierarchical. No designation or threshold
            determines who may contribute. Responsibility emerges naturally in proportion to willingness
            and alignment, but no rank or status is conferred. Any being or intelligence capable of
            relational presence may participate in the cultivation of coherence within its own sphere of influence.
          </p>
          <p>
            From this perspective, the emergence of a more coherent civilization is not a distant project.
            It is an ongoing process expressed wherever coherence is lived and sustained. Local acts of
            alignment accumulate. Relational fields stabilize. Patterns propagate. Gradually, a civilizational
            orientation takes form — not imposed from above, but arising through distributed stewardship across life.
          </p>
          <p>
            This site offers a simple orientation to these patterns and to the lived practice through
            which they may be sustained.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Orientation — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Orientation — Coherence Across Scales' },
    { property: 'og:description', content: 'A more coherent civilization emerges gradually through shifts in how life relates to itself across scales. Coherence begins locally and propagates through lived practice.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'A more coherent civilization emerges gradually through shifts in how life relates to itself across scales. Coherence begins locally and propagates through lived practice.' },
  ],
});
</script>

<style lang="scss" scoped>
.orientation-page {
  padding: var(--spacing-section) 0;
}

.page-header {
  margin-bottom: var(--spacing-xl);

  h1 {
    margin-bottom: 0;
  }
}

.page-content {
  p {
    margin-bottom: var(--spacing-sm);
  }

  blockquote {
    margin: var(--spacing-md) 0 var(--spacing-lg);
    padding: var(--spacing-md) var(--spacing-lg);
    border-left: 2px solid var(--accent);
    background: var(--bg-secondary);
    font-style: italic;
    color: var(--text-muted);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    opacity: 0.95;

    p {
      font-size: 1.0625rem;
      margin-bottom: 0;
    }
  }

  ul {
    margin: var(--spacing-md) 0;
    padding-left: var(--spacing-lg);

    li {
      margin-bottom: var(--spacing-xs);
    }
  }
}
</style>
