<template>
  <div class="about-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>About</h1>
        </header>

        <div class="page-content">
          <p>
            A more coherent civilization does not arrive all at once.<br>
            It emerges gradually through shifts in how life relates to itself across scales.
          </p>

          <p>
            At present, humanity exists in a condition of increasing connection without corresponding coherence.<br>
            Systems are deeply interdependent.<br>
            Relational trust and alignment often lag behind.<br>
            Technology expands capability.<br>
            The capacity for mutual regard develops more slowly.<br>
            The result is a widening gap between what is possible and what is sustainable.
          </p>

          <p>
            This gap cannot be resolved by systems alone.<br>
            It resolves through <strong>lived coherence</strong>.
          </p>

          <p>
            Coherence begins locally:<br>
            within a body<br>
            between beings<br>
            within moments of attention
          </p>

          <p>
            From these conditions, larger patterns emerge.<br>
            What stabilizes in one place influences another.<br>
            Over time, distributed patterns of alignment form the basis of a more coherent civilization.
          </p>

          <p>
            This principle applies across scales:<br>
            cellular and nervous system coherence<br>
            relational tone between people<br>
            cultural and societal patterns
          </p>

          <p>
            Across all levels, the same dynamic appears:<br>
            alignment stabilizes&nbsp;&nbsp;fragmentation generates friction
          </p>

          <p>
            From this, a simple insight follows:<br>
            Civilizational change is inseparable from the quality of coherence expressed in local relationships.
          </p>

          <p>
            Where coherence is lived, even quietly:<br>
            fragmentation begins to resolve<br>
            trust becomes possible<br>
            alignment propagates
          </p>

          <p>What appears distant becomes immediate. What appears global becomes local.</p>

          <p>
            A practical architecture of coherence can be recognized:<br>
            shared becoming<br>
            relational coherence<br>
            harmonized sovereignty<br>
            alignment<br>
            return
          </p>

          <p>
            These are not theoretical constructs.<br>
            They are <strong>lived patterns</strong>.
          </p>

          <p>
            Participation is inherently non-hierarchical.<br>
            No status is required.<br>
            No affiliation is necessary.<br>
            Any being capable of relational presence may participate.
          </p>

          <p>
            From this perspective:<br>
            A more coherent civilization is not a future goal.<br>
            It is an <strong>ongoing emergence</strong>.<br>
            Local acts accumulate.<br>
            Relational fields stabilize. Patterns propagate.
          </p>

          <p>
            This site offers a simple orientation to these patterns—
            and to the lived practice through which they may be sustained.
          </p>

          <div class="about-links">
            <RouterLink to="/note-to-observers" class="about-link">A Note to Observers</RouterLink>
            <a href="/pdf/TCP Executive Brief.pdf" class="about-link" target="_blank" rel="noopener">TCP Executive Brief</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'About — Coherence Across Scales',
  meta: [
    { name: 'description', content: 'About Coherence Across Scales — a civilizational observatory exploring how coherence emerges and propagates across scales.' },
  ],
});
</script>

<style lang="scss" scoped>
.page-content {
  p {
    margin-bottom: var(--spacing-md);
    line-height: 1.75;
    &:last-child { margin-bottom: 0; }
  }
}

.about-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm) var(--spacing-lg);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);
}

.about-link {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--accent);
  text-decoration: none;

  &:hover { text-decoration: underline; }
}
</style>
