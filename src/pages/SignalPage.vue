<template>
  <div class="signal-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Signal</h1>
        </header>

        <div class="page-content">
          <div class="opening-text">
            <p>This is not a place to join.</p>
            <p>It is a place to signal presence.</p>
            <p>
              If this work aligns with how you see and move in the world, you may place a quiet marker
              on a shared map.
            </p>
            <p>
              No names are shown.
              No contact is made.
              No information is stored beyond a general geographic signal.
            </p>
            <p>It simply allows us to see that we are not alone.</p>
            <p>
              Across disciplines, cultures, and geographies, there are individuals working quietly
              toward coherence in how we live, build, and relate. This page makes that distributed
              presence visible — nothing more.
            </p>

            <blockquote>
              <p>
                A lighthouse does not gather ships.
                It does not organize the sea.
                It simply shines.
              </p>
              <p>
                Each vessel navigates by its own instruments.
                Yet the presence of light changes the journey.
              </p>
              <p>This page serves that function.</p>
            </blockquote>
          </div>

          <div class="what-happens">
            <h2>What happens when you signal</h2>
            <p>If you choose to place a signal:</p>
            <ul>
              <li>A small anonymous marker will appear on the world map</li>
              <li>Your precise location will never be shown</li>
              <li>No one can contact you</li>
              <li>You will not be added to a list</li>
              <li>There is no follow-up or obligation</li>
              <li>You are simply making presence visible</li>
            </ul>
          </div>

          <div class="enter-map">
            <router-link to="/signal/map" class="enter-map-btn">
              Enter the Signal Map
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Signal — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Signal — Coherence Across Scales' },
    { property: 'og:description', content: 'A place to signal presence. Anonymous markers placed by visitors who feel aligned with this work.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'A place to signal presence. Anonymous markers placed by visitors who feel aligned with this work.' },
  ],
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/blockquote';

.signal-page {
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
}

.opening-text {
  margin-bottom: var(--spacing-xl);

  blockquote {
    margin: var(--spacing-lg) 0;

    p {
      margin-bottom: var(--spacing-xs);
    }
  }
}

.what-happens {
  margin-bottom: var(--spacing-xl);

  h2 {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: var(--spacing-md);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: var(--spacing-md) 0;

    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: var(--spacing-xs);
      color: var(--text-muted);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.7em;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--accent);
        opacity: 0.5;
      }
    }
  }
}

.enter-map {
  text-align: center;
  padding: var(--spacing-xl) 0;
}

.enter-map-btn {
  display: inline-block;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--accent);
  text-decoration: none;
  padding: 1rem 2.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: all var(--transition-speed) ease;

  &:hover {
    background: var(--bg-secondary);
    border-color: var(--accent);
    color: var(--accent-hover);
  }
}
</style>
