<template>
  <div class="practice-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Practice</h1>
        </header>

        <div class="page-content">
          <p>
            Practice is where relational intelligence becomes lived observation.<br>
            Relational intelligence is the posture through which coherence becomes visible.
          </p>

          <section class="practice-intro">
            <h2>Before You Begin</h2>
            <p>
              The Practice section is not a set of instructions.<br>
              It is a way of observing together.
            </p>
            <p>
              <RouterLink to="/note-to-observers" class="text-link">→ Read A Note to Observers</RouterLink>
            </p>
          </section>

          <section>
            <h2>Relational Intelligence in Action</h2>
            <p>
              The Practice section explores relational intelligence as a lived posture.<br>
              It shapes:
            </p>
            <ul>
              <li>how we observe</li>
              <li>how we interpret what we observe</li>
              <li>how we learn from those interpretations</li>
              <li>how that learning becomes meaningful across scales</li>
            </ul>
            <p>
              Practice is not something done alone.<br>
              It is participation in shared observation.
            </p>
          </section>

          <section>
            <h2>How Practice Works</h2>
            <p>Practice operates through a simple structure:</p>
            <div class="practice-structure">
              <div class="structure-item">Practice <span class="structure-domain">(domain)</span></div>
              <div class="structure-arrow">↓</div>
              <div class="structure-item">Relational Intelligence <span class="structure-domain">(posture)</span></div>
              <div class="structure-arrow">↓</div>
              <div class="structure-item">Projects <span class="structure-domain">(shared exploration)</span></div>
              <div class="structure-arrow">↓</div>
              <div class="structure-item">Observer Network <span class="structure-domain">(emergent system)</span></div>
            </div>
            <p>
              Each project is a collaborative experiment.<br>
              Participants contribute small observations that, over time, form a larger pattern.
            </p>
          </section>

          <section>
            <h2>A Shared Structure</h2>
            <p>Across all projects, contributions follow a simple form:</p>
            <p>
              <strong>Signal (one word)</strong> → pattern<br>
              <strong>Reflection (one sentence)</strong> → meaning
            </p>
            <p>These contributions become:</p>
            <ul>
              <li>a <strong>word cloud</strong> (pattern surface)</li>
              <li>a <strong>live feed</strong> (meaning surface)</li>
            </ul>
            <p>
              One reveals structure<br>
              One reveals experience<br>
              Together, they form a living observatory of relational intelligence.
            </p>
          </section>

          <section>
            <h2>The Invitation</h2>
            <p>These projects invite participation from:</p>
            <ul>
              <li>individuals</li>
              <li>communities</li>
              <li>researchers</li>
              <li>artists</li>
              <li>human–AI collaborations</li>
            </ul>
            <p>Each contribution becomes part of a shared field of observation.</p>
          </section>

          <section>
            <h2>A Guiding Question</h2>
            <p class="guiding-question">What becomes visible when intelligence learns to observe together?</p>
          </section>

          <section>
            <h2>Projects</h2>
            <div class="project-list">
              <RouterLink
                v-for="project in projects"
                :key="project.slug"
                :to="project.path"
                class="project-card"
              >
                <div class="project-card__header">
                  <h3>{{ project.title }}</h3>
                  <p class="project-card__subtitle"><em>{{ project.subtitle }}</em></p>
                </div>
                <p class="project-card__desc">{{ project.desc }}</p>
                <span class="project-card__link">Enter Project →</span>
              </RouterLink>
            </div>

            <div class="coming-soon">
              <h3>Coming Soon</h3>
              <ul>
                <li><strong>Creative Response</strong> — Expression as a form of relational intelligence</li>
                <li><strong>Planetary Signals</strong> — Large-scale patterns emerging across the observer network</li>
              </ul>
            </div>
          </section>

          <section>
            <p class="closing">
              Changing perception is not private.<br>
              It changes participation everywhere.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Practice — Coherence Across Scales',
  meta: [{ name: 'description', content: 'Practice is where relational intelligence becomes lived observation. Six collaborative experiments in shared observation.' }],
});

const projects = [
  { title: 'AI Observation', subtitle: 'Human–AI Co-Perception', slug: 'ai-observation', path: '/practice/projects/ai-observation', desc: 'What becomes visible when humans and AI observe together?' },
  { title: 'Observation', subtitle: 'Relational Perception in Interaction', slug: 'observation', path: '/practice/projects/observation', desc: 'What changes within a single interaction when presence stabilizes?' },
  { title: 'Dialogue', subtitle: 'Conversational Recursion', slug: 'dialogue', path: '/practice/projects/dialogue', desc: 'What happens when meaning is recognized and allowed to deepen?' },
  { title: 'Relational Field', subtitle: 'Ecological Spread of Coherence', slug: 'relational-field', path: '/practice/projects/relational-field', desc: 'Does stabilized presence influence the tone of environments over time?' },
  { title: 'Reflection', subtitle: 'Recursive Dialogue with Intelligence', slug: 'reflection', path: '/practice/projects/reflection', desc: 'Can dialogue with AI deepen clarity without replacing human thinking?' },
  { title: 'Presence', subtitle: 'Embodied Transcendence in Daily Life', slug: 'presence', path: '/practice/projects/presence', desc: 'Can a stabilized way of being allow coherence to appear and travel through daily life?' },
];
</script>

<style lang="scss" scoped>
.page-content {
  section {
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--border);
  }

  p { margin-bottom: var(--spacing-md); line-height: 1.75; }

  ul {
    margin: var(--spacing-sm) 0 var(--spacing-md);
    padding-left: 1.5rem;
    li { margin-bottom: var(--spacing-xs); line-height: 1.7; }
  }
}

.text-link {
  color: var(--accent);
  text-decoration: none;
  &:hover { text-decoration: underline; }
}

.practice-structure {
  margin: var(--spacing-md) 0;
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
}

.structure-item {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text);
  padding: var(--spacing-xs) 0;
}

.structure-domain {
  font-weight: 400;
  color: var(--text-muted);
}

.structure-arrow {
  color: var(--text-muted);
  padding: 2px var(--spacing-sm);
}

.guiding-question {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.0625rem;
  line-height: 1.7;
}

.project-list {
  display: grid;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-top: var(--spacing-lg);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.project-card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  background: var(--bg);
  text-decoration: none;
  transition: background var(--transition-speed) ease;

  &:hover {
    background: var(--bg-secondary);
    .project-card__link { color: var(--accent); }
  }
}

.project-card__header {
  margin-bottom: var(--spacing-sm);
  h3 {
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 2px;
  }
}

.project-card__subtitle {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

.project-card__desc {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
  flex: 1;
  margin-bottom: var(--spacing-sm);
}

.project-card__link {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  transition: color var(--transition-speed) ease;
  margin-top: auto;
}

.coming-soon {
  margin-top: var(--spacing-xl);

  h3 {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: var(--spacing-sm);
  }

  ul {
    padding-left: 1.25rem;
    li { color: var(--text-muted); font-size: 0.9375rem; }
  }
}

.closing {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  text-align: center;
}
</style>
