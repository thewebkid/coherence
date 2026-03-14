<template>
  <div class="signal-map-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Signal Map</h1>
          <p class="page-subtitle">
            Anonymous markers placed by visitors who feel aligned with this work.
            Nothing more. Nothing expected.
          </p>
        </header>

        <p class="map-intro">
          Each point of light represents a quiet signal of presence.
          No names. No identities. No communication layer.
          Just the visible reminder that others, in many places, are working from
          similar questions and orientations.
        </p>
      </div>
    </div>

    <div class="map-section">
      <div class="map-container-outer">
        <SignalMap ref="signalMap" />
      </div>
    </div>

    <div class="page-container">
      <div class="content-container">
        <div class="map-actions">
          <button
            class="action-btn place-signal"
            @click="openModal"
          >
            {{ alreadyPlaced ? 'Update your signal' : 'Place a Signal' }}
          </button>
        </div>

        <PlaceSignalModal
          :visible="showModal"
          @close="closeModal"
          @signal-placed="onSignalPlaced"
        />

        <div class="why-section">
          <h2>Why a page like this exists</h2>
          <p>
            Every major intellectual or civilizational shift has shared a similar pattern:
            not mass agreement — but distributed recognition among a small number of individuals.
          </p>
          <p>
            Early scientists of the Royal Society.
            Early internet architects.
            Early systems theorists.
            Early AI researchers.
          </p>
          <p>
            They did not begin by forming movements.
            They recognized one another's existence.
            That recognition accelerated everything.
          </p>
          <p>
            When people working on similar civilizational questions believe they are isolated,
            they tend to self-limit, dilute expression, abandon initiatives, or assume their
            work has no wider relevance.
          </p>
          <p>When they know others exist:</p>
          <ul>
            <li>Confidence increases</li>
            <li>Clarity sharpens</li>
            <li>Long-term thinking stabilizes</li>
            <li>Collaboration emerges naturally when needed</li>
          </ul>
          <p>
            This is not ideology or affiliation.
            It is simple network psychology.
          </p>
          <p>The purpose of this page is only to make distributed presence visible.</p>
        </div>

        <p class="return-note">
          Return anytime to observe the map. No account or sign-in is required.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { SITE_BASE_URL, OG_IMAGE_URL } from '@/constants/seo';
import SignalMap from '@/components/SignalGlobe.vue';
import PlaceSignalModal from '@/components/PlaceSignalModal.vue';

const route = useRoute();

useHead({
  title: 'Signal Map — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Signal Map — Coherence Across Scales' },
    { property: 'og:description', content: 'Anonymous markers of distributed presence. Each point of light represents a quiet signal.' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => SITE_BASE_URL + route.path) },
    { property: 'og:image', content: OG_IMAGE_URL },
    { name: 'description', content: 'Anonymous markers of distributed presence. Each point of light represents a quiet signal.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Signal Map — Coherence Across Scales' },
    { name: 'twitter:description', content: 'Anonymous markers of distributed presence. Each point of light represents a quiet signal.' },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ],
});

const signalMap = ref(null);
const showModal = ref(false);
const alreadyPlaced = ref(false);

onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    alreadyPlaced.value = localStorage.getItem('mysignal-id') != null;
  }
});

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function onSignalPlaced(signal) {
  alreadyPlaced.value = true;
  if (signal) {
    if (signal.id) localStorage.setItem('mysignal-id', signal.id);
    signalMap.value?.addNewSignal(signal.lng, signal.lat, true);
  }
}
</script>

<style lang="scss" scoped>
.signal-map-page {
  padding: var(--spacing-section) 0;
}

.page-header {
  margin-bottom: var(--spacing-lg);

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

.map-intro {
  font-size: 0.9375rem;
  color: var(--text-muted);
  margin-bottom: var(--spacing-lg);
  line-height: 1.7;
}

.map-section {
  width: 100%;
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 0 var(--margin-page);
}

.map-container-outer {
  width: 100%;
}

.map-actions {
  text-align: center;
  padding: var(--spacing-lg) 0;
}

.action-btn {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  background: transparent;
  color: var(--text);

  &.place-signal,
  &.primary {
    font-family: var(--font-serif);
    font-size: 1.125rem;
    font-style: italic;
    padding: 0.875rem 2.5rem;
    color: var(--accent);
    border-color: var(--accent);

    &:hover:not(:disabled) {
      background: var(--accent);
      color: #fff;
    }
  }

  &.secondary {
    &:hover {
      background: var(--bg-secondary);
    }
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.why-section {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border);

  h2 {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: var(--spacing-md);
  }

  p {
    margin-bottom: var(--spacing-sm);
  }

  ul {
    margin: var(--spacing-md) 0;
    padding-left: 0;
    list-style: none;

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

.return-note {
  margin-top: var(--spacing-xl);
  font-size: 0.875rem;
  font-style: italic;
  color: var(--text-muted);
  text-align: center;
  opacity: 0.7;
}
</style>
