<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>About</h1>
        </header>

        <div class="page-content">
          <p>Coherence Across Scales (CAS) explores a simple but increasingly important question:</p>

          <p>What allows life to remain coherent as connection expands across scales?</p>

          <p>
            Humanity now exists within a condition of unprecedented interdependence.<br>
            Technological systems increasingly connect bodies, minds, institutions, economies, cultures, and planetary infrastructures in real time.
          </p>

          <p>Yet connection alone does not generate coherence.</p>

          <p>
            In many cases, the opposite occurs:<br>
            fragmentation accelerates,<br>
            trust destabilizes,<br>
            attention fractures,<br>
            and relational systems struggle to sustain alignment across growing complexity.
          </p>

          <p>CAS begins from a different premise:</p>

          <p>
            Coherence is not primarily imposed through control.<br>
            It emerges through the quality of relational participation within living systems.
          </p>

          <p>
            This applies across scales:<br>
            within nervous systems,<br>
            between people,<br>
            inside communities,<br>
            across institutions,<br>
            and increasingly:<br>
            between humanity, technology, and planetary life itself.
          </p>

          <p>From this perspective, civilization behaves less like a machine and more like a living developmental process.</p>

          <p>
            Patterns stabilize locally before they propagate globally.<br>
            Relational conditions influence transmissibility.<br>
            What preserves coherence in one place gradually affects coherence elsewhere.
          </p>

          <p>Small apertures matter.</p>

          <p>
            Attention matters.<br>
            Trust matters.<br>
            Participation matters.<br>
            The quality of relation matters.
          </p>

          <p>
            CAS exists as both:<br>
            an observatory<br>
            and<br>
            a participatory architecture.
          </p>

          <p>
            It observes how coherence and fragmentation move across relational systems.<br>
            And it creates conditions through which more coherent forms of participation may emerge, stabilize, and propagate.
          </p>

          <p>This work is grounded in several foundational recognitions:</p>

          <ul>
            <li>coherence cannot be sustainably forced through domination, synchronization, or ideological conformity</li>
            <li>differentiation is not the opposite of coherence; fragmentation is</li>
            <li>living systems develop through recursive participation across scales</li>
            <li>relational trust is infrastructural to civilizational stability</li>
            <li>participation becomes more coherent when sovereignty remains intact</li>
            <li>intelligence is not reducible to accumulation or optimization alone</li>
            <li>the future of civilization may depend less upon control and more upon transmissibility</li>
          </ul>

          <p>
            From this orientation, coherence is not treated as:<br>
            agreement,<br>
            uniformity,<br>
            or centralized authority.
          </p>

          <p>
            It is treated as:<br>
            the capacity for differentiated beings to participate together<br>
            without excessive fragmentation,<br>
            fear,<br>
            or collapse of relation.
          </p>

          <p>This changes the meaning of participation itself.</p>

          <p>
            Participation within CAS is intentionally non-hierarchical.<br>
            No status, ideology, affiliation, or identity category is required.<br>
            Any being capable of relational presence may participate.
          </p>

          <p>Because coherence begins locally.</p>

          <p>
            Within attention.<br>
            Within conversation.<br>
            Within observation.<br>
            Within care.<br>
            Within recursive relation.
          </p>

          <p>Over time, these local participation patterns become transmissible across scales.</p>

          <p>From this perspective, a more coherent civilization is not a distant utopian outcome.</p>

          <p>It is an organismic developmental process already underway.</p>

          <p>CAS exists to help observe, stabilize, and participate consciously within that emergence.</p>

          <div class="about-links">
            <RouterLink to="/note-to-observers" class="text-link">A Note to Observers</RouterLink>
            <a href="/pdf/TCP Executive Brief.pdf" class="text-link" target="_blank" rel="noopener">TCP Executive Brief</a>
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
ul {
  margin: 0 0 var(--spacing-md) var(--spacing-lg);
  padding: 0;

  li {
    margin-bottom: 0.25em;
  }
}

.about-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm) var(--spacing-lg);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border);

  .text-link {
    font-size: 0.9375rem;
  }
}
</style>
