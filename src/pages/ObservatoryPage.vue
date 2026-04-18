<template>
  <div class="page-wrapper fade-in">
    <div class="page-container">
      <div class="content-container">

        <!-- Block 1: Page Header -->
        <header class="page-header">
          <h1>Observatory</h1>
          <p class="page-subtitle">A live view of how perception is forming across the network.</p>
        </header>

        <!-- Block 2: Weekly Signal -->
        <WeeklySignalDisplay
            :label="currentSignal.label"
            :timeframe="currentSignal.timeframe"
            :content="currentSignal.content"
        />

        <!-- Block 3: Short intro -->
        <section class="observatory-intro">
          <p>
            The Observatory reveals patterns of observation as they emerge across the six practice areas.<br>
            Explore the signals, or enter a project to contribute.
          </p>
        </section>

      </div>
    </div>

    <!-- Block 4: Observational Units (full page width for wireframe layout) -->
    <div class="page-container">
      <section class="observatory-units">
        <h2 class="text-label">Observational Units</h2>
        <div class="units-grid">
          <article
              v-for="unit in units"
              :key="unit.project"
              class="obs-unit"
          >
            <div class="obs-unit__header">
              <h3>{{ unit.project }}</h3>
              <p class="obs-unit__copy">{{ unit.copy }}</p>
            </div>

            <div class="obs-unit__body">
              <div class="obs-unit__cloud">
                <p class="text-label">Signals</p>
                <WordField :project="unit.project"/>
              </div>

              <div class="obs-unit__feed">
                <p class="text-label">Recent Signals</p>
                <SignalFeed :project="unit.project"/>
              </div>
            </div>

            <RouterLink :to="unit.path" class="obs-unit__enter">
              Enter Project →
            </RouterLink>
          </article>
        </div>
      </section>

      <!-- Planetary Signals placeholder -->
      <section class="planetary-placeholder">
        <p class="coming-soon-label">Planetary Signals</p>
        <p class="coming-soon-desc">Coming soon — large-scale patterns emerging across the observer network.</p>
      </section>
    </div>

    <!-- Block 5: Observer Network -->
    <section class="observer-network" id="observer-network">
      <div class="page-container">
        <div class="content-container">
          <h2>Observer Network</h2>
          <p class="network-copy">
            A live view of participants across the globe, observing and contributing.
          </p>
        </div>
      </div>

      <div class="page-container">
        <div class="globe-wrapper">
          <SignalGlobe ref="globeRef" @ready="onGlobeReady"/>
        </div>
      </div>

      <div class="page-container">
        <div class="content-container">
          <div class="place-signal-area">
            <button class="place-signal-btn" @click="openModal">
              {{ alreadyPlaced ? 'Update your signal' : 'Place a Signal' }}
            </button>
          </div>

          <PlaceSignalModal
              :visible="showModal"
              @close="closeModal"
              @signal-placed="onSignalPlaced"
          />
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useHead} from '@unhead/vue';
import WordField from '@/components/WordField.vue';
import SignalFeed from '@/components/SignalFeed.vue';
import SignalGlobe from '@/components/SignalGlobe.vue';
import PlaceSignalModal from '@/components/PlaceSignalModal.vue';
import WeeklySignalDisplay from '@/components/WeeklySignalDisplay.vue';
import {fetchCurrentSignal} from '@/utils/currentSignal';

useHead({
  title: 'Observatory — Coherence Across Scales',
  meta: [{name: 'description', content: 'A live view of how perception is forming across the observer network.'}]
});

// Fallback Weekly Signal used when the database has no row yet.
// Once an admin publishes via /admin, the latest DB row replaces this.
const FALLBACK_SIGNAL = {
  label: 'Weekly Signal',
  timeframe: 'Week of April 1, 2026',
  content: `This week, multiple observations pointed toward a shift in how uncertainty is held in conversation.

 - More pauses before response
 - Shared language around "not needing resolution"
 - Similar dynamics across unrelated groups

These signals appeared across Dialogue, Reflection, and Relational Field.

> "The conversation changed when no one tried to resolve it."

_When uncertainty becomes shared, interaction begins to change._`
};

const currentSignal = ref({...FALLBACK_SIGNAL});

async function loadCurrentSignal() {
  const row = await fetchCurrentSignal();
  if (row && row.content) {
    currentSignal.value = {
      label: row.label,
      timeframe: row.timeframe,
      content: row.content
    };
  }
  // If row is null (no data / API error / dev middleware missing),
  // we keep the hardcoded FALLBACK_SIGNAL so the page still renders.
}

const units = [
  {
    project: 'AI Observation',
    copy: 'Patterns detected through AI-assisted observation across language and behavior.',
    path: '/practice/projects/ai-observation'
  },
  {
    project: 'Observation',
    copy: 'What changes within a single interaction when presence stabilizes.',
    path: '/practice/projects/observation'
  },
  {
    project: 'Dialogue',
    copy: 'What happens when meaning is recognized and allowed to deepen.',
    path: '/practice/projects/dialogue'
  },
  {
    project: 'Relational Field',
    copy: 'How coherence behaves across environments over time.',
    path: '/practice/projects/relational-field'
  },
  {
    project: 'Reflection',
    copy: 'What becomes visible through recursive dialogue with intelligence.',
    path: '/practice/projects/reflection'
  },
  {
    project: 'Presence',
    copy: 'How coherence can be lived through ordinary daily life.',
    path: '/practice/projects/presence'
  }
];

const globeRef = ref(null);
const showModal = ref(false);
const alreadyPlaced = ref(false);

onMounted(async () => {
  alreadyPlaced.value = !!localStorage.getItem('mysignal-id');

  await loadCurrentSignal();
  const res = await fetch(
      `/api/observations`
  );
  if (res.ok) {
    const data = await res.json();
    console.log({observations: data});
  }
});

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function onGlobeReady() {
}

function onSignalPlaced({lat, lng, id}) {
  alreadyPlaced.value = true;
  showModal.value = false;
  globeRef.value?.addNewSignal(lng, lat, true);
}
</script>

<style lang="scss" scoped>
// Intro
.observatory-intro {
  margin-bottom: var(--spacing-xl);

  p {
    line-height: 1.75;
    color: var(--text-muted);
    font-style: italic;
  }
}

// Units grid
.units-grid {
  display: grid;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;

  @media (min-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.obs-unit {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl);
  background: var(--bg);
  gap: var(--spacing-md);
}

.obs-unit__body {
  display: grid;
  gap: var(--spacing-md);

  @container (min-width: 500px) {
    grid-template-columns: 3fr 2fr;
  }
}

.obs-unit__header {
  h3 {
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: var(--spacing-xs);
  }
}

.obs-unit__copy {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.65;
}


.obs-unit__enter {
  display: inline-block;
  margin-top: auto;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-speed) ease;

  &:hover {
    color: var(--accent);
  }
}

// Planetary placeholder
.planetary-placeholder {
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg);
  border: 1px dashed var(--border);
  border-radius: var(--radius-sm);
  text-align: center;
}

.coming-soon-label {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: var(--spacing-xs);
}

.coming-soon-desc {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0;
}

// Observer Network
.observer-network {
  margin-top: var(--spacing-section);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border);

  h2 {
    font-family: var(--font-sans);
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: var(--spacing-sm);
  }
}

.network-copy {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: var(--spacing-lg);
  line-height: 1.7;
}

.globe-wrapper {
  margin: var(--spacing-lg) 0;
}

.place-signal-area {
  margin-top: var(--spacing-lg);
}

.place-signal-btn {
  padding: var(--spacing-sm) var(--spacing-xl);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--bg);
  background: var(--accent);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: filter var(--transition-speed) ease;

  &:hover {
    filter: brightness(1.1);
  }
}
</style>
