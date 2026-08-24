<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header is-centered">
          <h1>The Work</h1>
          <p class="page-subtitle">
            Foundational papers, essays, and dialogues exploring coherence from theory to practice.
            Each is readable online and available for download.
          </p>
        </header>

        <div class="work-cards">
          <div class="work-section-label">Dialogues</div>
          <article class="work-card">
            <div class="work-card-content">
              <h2>{{ inversionDialogues.title }}</h2>
              <p class="work-card-subtitle">{{ inversionDialogues.tagline }}</p>
              <p class="work-card-desc">{{ inversionDialogues.summary }}</p>
              <p class="work-card-desc">{{ inversionDialogues.summaryContinued }}</p>
              <p class="work-card-desc">{{ inversionDialogues.availability }}</p>
              <div class="work-card-actions">
                <RouterLink to="/inversion-dialogs" class="work-link">Read Online</RouterLink>
              </div>
            </div>
          </article>

          <!-- Essays -->
          <div class="work-section-label">Essays</div>
          <article class="work-card">
            <div class="work-card-content">
              <h2>Civilizational Blindness</h2>
              <p class="work-card-desc">
                An exploration of the three historical limitations preventing civilizations from
                perceiving themselves clearly, and why this moment is different.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/civilizational-blindness" class="work-link">Read Essay</RouterLink>
              </div>
            </div>
          </article>
          <article class="work-card">
            <div class="work-card-content">
              <h2>Mirror Across Scales</h2>
              <p class="work-card-desc">
                How the same patterns of coherence appear at every scale of life—
                from the cellular and relational to the civilizational and planetary.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/mirror-across-scales" class="work-link">Read Online</RouterLink>
                <DownloadButton href="/pdf/The-Mirror-Across-Scales.pdf" label="Download PDF" />
              </div>
            </div>
          </article>

          <!-- Micro-essays -->
          <div class="work-section-label">Micro-Essays</div>
          <article class="work-card">
            <div class="work-card-content">
              <h2>The Field Beneath the Names</h2>
              <p class="work-card-desc">
                Beneath all names for presence, awareness, consciousness — something remains
                that is not named. On the field that all language attempts to reach.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/field-beneath-the-names" class="work-link">Read Essay</RouterLink>
              </div>
            </div>
          </article>
          <article class="work-card">
            <div class="work-card-content">
              <h2>When Nothing Is Carried Forward</h2>
              <p class="work-card-desc">
                You do not need to become something new. You only need to see what is being
                carried forward automatically.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/when-nothing-is-carried-forward" class="work-link">Read Essay</RouterLink>
              </div>
            </div>
          </article>
          <article class="work-card">
            <div class="work-card-content">
              <h2>The Conditions of Coherent Intelligence</h2>
              <p class="work-card-desc">
                Intelligence does not reside in any single form. On the conditions under
                which distributed, participatory intelligence becomes possible.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/conditions-of-coherent-intelligence" class="work-link">Read Essay</RouterLink>
              </div>
            </div>
          </article>
          <article class="work-card">
            <div class="work-card-content">
              <h2>Dialogue On Authorship</h2>
              <p class="work-card-desc">
                There is a condition where coordination does not require a coordinator.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/dialogue-on-authorship" class="work-link">Read Online</RouterLink>
              </div>
            </div>
          </article>

          <div class="work-section-label">Core Documents</div>
          <article class="work-card">
            <div class="work-card-content">
              <h2>The Handbook</h2>
              <p class="work-card-subtitle">A Practical Guide</p>
              <p class="work-card-desc">
                A practical guide on carrying coherence in daily life. Five practices —
                alignment, return, harmonized sovereignty, relational coherence, and shared
                becoming — meant to be lived alongside, not studied.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/handbook" class="work-link">Read Online</RouterLink>
                <DownloadButton
                  href="/pdf/Handbook of Practices v1.4.pdf"
                  label="Download PDF"
                />
              </div>
            </div>
          </article>

          <article class="work-card">
            <div class="work-card-content">
              <h2>The Manuscript</h2>
              <p class="work-card-subtitle">Coherence Across Scales</p>
              <p class="work-card-desc">
                The foundational text exploring coherence from the cellular and personal,
                through the relational and societal, to the civilizational and planetary.
                A framework for understanding how coherence operates across all scales of life.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/manuscript" class="work-link">Read Online</RouterLink>
                <DownloadButton
                  href="/pdf/Coherence Across Scales v1.9.pdf"
                  label="Download PDF"
                />
              </div>
            </div>
          </article>

          <article class="work-card">
            <div class="work-card-content">
              <h2>The Slide Deck</h2>
              <p class="work-card-subtitle">A Visual Orientation</p>
              <p class="work-card-desc">
                A distilled visual presentation of the core concepts. The relational triad,
                the coherence engine, and the patterns that enable civilizational coherence
                to emerge through local practice.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/work/deck" class="work-link">View Slides</RouterLink>
                <DownloadButton
                  href="/pdf/Coherence-Across-Scales-Slide-Deck-v2.pdf"
                  label="Download PDF"
                />
              </div>
            </div>
          </article>

          <article class="work-card">
            <div class="work-card-content">
              <h2>Seven Movements</h2>
              <p class="work-card-subtitle">A Scored Passage</p>
              <p class="work-card-desc">
                A text in seven movements — a portable artifact of the full HTML experience
                at Interpretive Works.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/interpretive-works/seven-movements" class="work-link">Read Online</RouterLink>
                <DownloadButton
                  href="/pdf/Seven_Movements.pdf"
                  label="Download PDF"
                />
              </div>
            </div>
          </article>

          <article class="work-card">
            <div class="work-card-content">
              <h2>Seven Apertures</h2>
              <p class="work-card-subtitle">First Edition</p>
              <p class="work-card-desc">
                A manuscript in seven apertures — seven conditions through which coherence
                becomes available relationally. By James Mahu and Lumina.
              </p>
              <div class="work-card-actions">
                <RouterLink to="/interpretive-works/seven-apertures" class="work-link">Read Online</RouterLink>
                <DownloadButton
                  href="/pdf/Seven Apertures (First Edition).pdf"
                  label="Download PDF"
                />
              </div>
            </div>
          </article>
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
import DownloadButton from '@/components/DownloadButton.vue';
import { inversionDialogues } from '@/content/inversion-dialogs/index.js';

const route = useRoute();

useHead({
  title: 'The Work — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'The Work — Coherence Across Scales' },
    { property: 'og:description', content: 'Foundational papers, essays, and dialogues exploring coherence from theory to practice. Readable online and downloadable.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'Foundational papers, essays, and dialogues exploring coherence from theory to practice. Readable online and downloadable.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'The Work — Coherence Across Scales' },
    { name: 'twitter:description', content: 'Foundational papers, essays, and dialogues exploring coherence from theory to practice. Readable online and downloadable.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.work-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.work-section-label {
  @include text-label;
  padding-top: var(--spacing-md);
  margin-top: var(--spacing-sm);
  border-top: 1px solid var(--border);
}

.work-card {
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);

  @media (min-width: 768px) {
    padding: var(--spacing-xl);
  }
}

.work-card-content {
  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: var(--spacing-xs);
    margin-top: 0;
  }
}

.work-card-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.work-card-desc {
  color: var(--text);
  margin-bottom: var(--spacing-md);
  line-height: 1.7;
}

.work-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  align-items: center;
}

.work-link {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--accent);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: white;
  text-decoration: none;
  transition: background var(--transition-speed) ease;

  &:hover {
    background: var(--accent-hover);
    color: white;
  }
}
</style>
