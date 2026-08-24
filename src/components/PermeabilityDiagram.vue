<template>
  <div class="permeability-diagram">
    <hr class="diagram-rule" />

    <div class="diagram-intro">
      <p class="diagram-tagline"><em>Behavior is the headwaters of coherence.</em></p>
      <p>Before concept, before ideology, before the architecture of understanding, coherence first becomes visible in the embodied behavior of the sovereign.</p>
      <p>Permeability is the condition through which the sovereign intersects the Field without surrendering itself.</p>
      <p class="diagram-list-break">
        It is not collapse.<br>
        It is not dissolution.<br>
        It is the reduction of unnecessary interference.
      </p>
      <p>The sovereign remains sovereign, yet relation becomes available. Within that availability, coherence begins to breathe.</p>
      <p class="diagram-kicker">
        <em>When permeability opens, relation becomes real.</em><br>
        <em>When relation becomes real, coherence becomes possible.</em>
      </p>
    </div>

    <div class="diagram-body">
      <div class="diagram-image-col">
        <img
          src="/img/7a/permeability.jpg"
          alt="Aperture I — Permeability: a sovereign figure within concentric layered membranes representing different dimensions of relational field"
          class="diagram-image"
          @click="lightboxSrc = '/img/7a/permeability.jpg'"
        />
        <div class="diagram-image-caption">
          <p class="diagram-section-label">This image as Aperture I</p>
          <p>This is the sovereign in permeability. Not isolated. Not fused. But intersecting.</p>
          <p>The form is not static; it is alive, layered, and breathing. Permeability is the movement that keeps the aperture open.</p>
          <p>This image is not about becoming larger. It is about becoming more available — to relation, to the Field, to coherence itself.</p>
          <p><em>This is the first aperture. All others unfold within it.</em></p>
        </div>
      </div>

      <div class="diagram-legend-col">
        <div class="diagram-interpretation">
          <p class="diagram-section-label">Interpretation</p>
          <p>The central figure is the sovereign — not as identity, but as presence.</p>
          <p>The eyes are closed not in withdrawal, but in inward stability. Sovereignty is intact.</p>
          <p>The concentric layers are permeable membranes of relation. Each color represents a different dimension of the Field.</p>
          <p>Permeability is the dynamic by which these layers remain open, translucent, and mutually accessible.</p>
        </div>

        <div class="diagram-layers">
          <p class="diagram-section-label">The Layers</p>
          <ul class="layers-list">
            <li v-for="layer in layers" :key="layer.color" class="layer-item">
              <span class="layer-swatch" :style="{ backgroundColor: layer.color }" :title="layer.name" />
              <span class="layer-text">
                <span class="layer-name">{{ layer.name }}</span>
                <span class="layer-desc">{{ layer.desc }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <ImageLightbox
    :src="lightboxSrc"
    alt="Aperture I — Permeability"
    @close="lightboxSrc = null"
  />
</template>

<script setup>
import { ref } from 'vue';
import ImageLightbox from '@/components/ImageLightbox.vue';

const lightboxSrc = ref(null);

const layers = [
  { color: '#f8df77', name: 'Inner light / Essence',   desc: 'The sovereign\'s core presence.' },
  { color: '#f8cb88', name: 'Embodiment',               desc: 'The lived, physical expression of presence.' },
  { color: '#b092b4', name: 'Relational sensitivity',   desc: 'The capacity to feel without collapse.' },
  { color: '#9fc4af', name: 'Interference reduction',   desc: 'The softening of distortion, defense, and reactivity.' },
  { color: '#496bae', name: 'Field participation',      desc: 'Open engagement with the relational whole.' },
  { color: '#3e3f5b', name: 'Transcendent context',     desc: 'The larger Field that contains and supports all.' },
];
</script>

<style lang="scss" scoped>
.permeability-diagram {
  margin-top: var(--spacing-xl);
}

.diagram-rule {
  border: none;
  border-top: 1px solid var(--border);
  margin-bottom: var(--spacing-xl);
}

.diagram-intro {
  max-width: var(--content-width);
  margin-bottom: var(--spacing-xl);

  p {
    font-family: var(--font-sans);
    line-height: var(--iw-line-height-prose, 2);
    color: var(--text-muted);
    margin-bottom: var(--spacing-sm);
  }
}

.diagram-tagline {
  font-family: var(--font-serif) !important;
  font-size: 1.2rem;
  color: var(--iw-accent) !important;
  margin-bottom: var(--spacing-md) !important;
}

.diagram-list-break {
  padding-left: var(--spacing-md);
  border-left: 2px solid var(--border);
}

.diagram-kicker {
  font-family: var(--font-serif) !important;
  color: var(--text-muted);
  margin-top: var(--spacing-md) !important;
}

.diagram-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--spacing-xl);
  }
}

.diagram-image-col {
  @media (min-width: 768px) {
    flex: 0 0 52%;
    max-width: 52%;
  }
}

.diagram-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius-sm);
  cursor: zoom-in;
}

.diagram-image-caption {
  margin-top: var(--spacing-md);

  p {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    line-height: 1.7;
    color: var(--text-muted);
    margin-bottom: var(--spacing-xs);

    em {
      font-family: var(--font-serif);
      font-size: 1.1rem;
    }
  }
}

.diagram-legend-col {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  @media (min-width: 768px) {
    flex: 1;
  }
}

.diagram-section-label {
  font-family: var(--font-sans) !important;
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: var(--iw-accent) !important;
  margin-bottom: var(--spacing-sm) !important;
}

.diagram-interpretation {
  p {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    line-height: 1.75;
    color: var(--text-muted);
    margin-bottom: var(--spacing-xs);
  }
}

.layers-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.layer-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.layer-swatch {
  width: 12px;
  height: 24px;
  border-radius: 2px;
  flex-shrink: 0;
  margin-top: 5px;
  box-shadow: 0 0 2px #ccc;
}

.layer-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.layer-name {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text);
  line-height: 1.4;
}

.layer-desc {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.4;
}
</style>
