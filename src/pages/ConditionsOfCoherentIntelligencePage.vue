<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <p class="section-eyebrow">The Work</p>
          <h1>The Conditions of Coherent Intelligence</h1>
          <p class="page-subtitle">a micro-essay</p>
        </header>

        <div class="diagram-preview" @click="modalOpen = true">
          <img
            src="/img/conditions-of-coherent-intelligence.png"
            alt="Conditions of Coherent Intelligence diagram"
            class="diagram-thumb"
          />
          <span class="diagram-hint">View full diagram →</span>
        </div>

        <article>
          <MarkdownContent :source="markdownSourceBody" />
        </article>

        <div class="essay-footer">
          <RouterLink to="/work" class="back-link-text">← The Work</RouterLink>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="modalOpen" class="modal-overlay" @click="modalOpen = false">
          <img
            src="/img/conditions-of-coherent-intelligence.png"
            alt="Conditions of Coherent Intelligence — full diagram"
            class="modal-img"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import rawSource from '@/content/Micro-Essay_The_Conditions_of_Coherent_Intelligence.md?raw';

const modalOpen = ref(false);

// Strip the diagram image line from markdown so we render it ourselves above
const markdownSourceBody = rawSource.replace(
  /!\[.*?\]\(\/img\/conditions-of-coherent-intelligence\.png\)\s*/,
  ''
);

useHead({
  title: 'The Conditions of Coherent Intelligence — The Work — Coherence Across Scales',
  meta: [
    { name: 'description', content: 'Intelligence does not reside in any single form. A micro-essay on the conditions under which distributed, participatory intelligence emerges.' },
  ],
});
</script>

<style lang="scss" scoped>
.diagram-preview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xl);
  cursor: pointer;

  &:hover .diagram-hint {
    color: var(--accent);
  }

  &:hover .diagram-thumb {
    opacity: 1;
  }
}

.diagram-thumb {
  width: 100%;
  max-width: 480px;
  height: auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  opacity: 0.85;
  transition: opacity var(--transition-speed) ease;
  display: block;
}

.diagram-hint {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  transition: color var(--transition-speed) ease;
}

// Modal
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 500;
  overflow-y: auto;
  cursor: pointer;
  padding: 4vw;
}

.modal-img {
  display: block;
  width: 100%;
  max-width: 1400px;
  height: auto;
  margin: 0 auto;
  cursor: default;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
