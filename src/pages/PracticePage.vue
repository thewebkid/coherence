<template>
  <div class="practice-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Local Practice</h1>
          <p class="page-subtitle">How coherence becomes lived locally</p>
        </header>

        <div class="page-content">
          <p>
            Coherence is not an idea to understand or a goal to achieve.
          </p>
          <p>
            It is a quality of life that emerges through consistent attention to how we relate —
            to ourselves, to others, and to the systems we participate in.
          </p>
          <p>
            Local practice means beginning where you are. It does not require special conditions,
            large platforms, or widespread agreement. It begins in the smallest field of relationship:
            a conversation, a decision, a moment of attention.
          </p>
          <p>
            Through the five movements of the coherence engine — alignment, return, relational coherence,
            harmonized sovereignty, and shared becoming — coherence can be practiced in any context.
          </p>
          <p>
            This is not instruction.
          </p>
          <p>
            It is invitation.
          </p>

          <blockquote>
            <p>
              No affiliation is required.<br>
              No threshold must be crossed.<br>
              Only a willingness to live in coherence where one stands.
            </p>
          </blockquote>

          <p>
            The <RouterLink to="/work/handbook">Handbook of Practices</RouterLink> offers a practical
            guide to embodying coherence in daily life. It is meant to be lived alongside, not studied.
          </p>

          <div class="practice-cta">
            <RouterLink to="/work/handbook" class="practice-link">
              Explore the Handbook
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Local Practice — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Local Practice — Coherence Across Scales' },
    { property: 'og:description', content: 'How coherence becomes lived locally. An invitation, not an instruction. Begin where you are, in the smallest field of relationship.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'How coherence becomes lived locally. An invitation, not an instruction. Begin where you are, in the smallest field of relationship.' },
  ],
});
</script>

<style lang="scss" scoped>
.practice-page {
  padding: var(--spacing-section) 0;
}

.page-header {
  margin-bottom: var(--spacing-xl);

  h1 {
    margin-bottom: var(--spacing-xs);
  }
}

.page-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.0625rem;
  color: var(--text-muted);
  margin: 0;
}

.page-content {
  p {
    margin-bottom: var(--spacing-sm);
  }

  blockquote {
    margin: var(--spacing-lg) 0;
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
}

.practice-cta {
  margin-top: var(--spacing-xl);
  text-align: center;
}

.practice-link {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  background: transparent;
  border: 1px solid var(--accent);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--accent);
  text-decoration: none;
  transition: background var(--transition-speed) ease,
              color var(--transition-speed) ease;

  &:hover {
    background: var(--accent);
    color: var(--bg);
  }
}
</style>
