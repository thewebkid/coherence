<template>
  <div class="projects-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Experiments in Embodied Coherence</h1>
        </header>

        <div class="page-content">
          <p class="opening">
            The Loop can be lived.<br>
            The following projects explore different aspects of its operation.<br>
            Each project asks a testable question.<br>
            Each can be practiced within ordinary life.<br>
            None require special status, training, or belief.<br>
            They are experiments in participation.
          </p>

          <div class="project-list">
            <article class="project">
              <h2>Project One — The Observation Project</h2>
              <p class="subtitle">Observer Stabilization</p>
              
              <div class="project-content">
                <div class="project-field">
                  <h3>Question:</h3>
                  <p>Can one regulated participant measurably stabilize an interaction?</p>
                </div>
                
                <div class="project-field">
                  <h3>Focus:</h3>
                  <p>Refining the formative observer. Slowing interpretation and judgment before reacting. Stabilizing presence without control or performance.</p>
                </div>
                
                <div class="project-field">
                  <h3>Mechanism explored:</h3>
                  <p>Autonomic regulation → perceived safety → relational coherence.</p>
                </div>
                
                <p>
                  This project investigates whether coherence has a physiological substrate that becomes visible in real time.
                </p>
                
                <RouterLink to="/practice/projects/observation" class="entry-link">
                  [Enter The Observation Project]
                </RouterLink>
              </div>
            </article>

            <article class="project">
              <h2>Project Two — The Behavioral Ecology Project</h2>
              <p class="subtitle">Ecological Spread</p>
              
              <div class="project-content">
                <div class="project-field">
                  <h3>Question:</h3>
                  <p>Does coherence propagate across environments over time?</p>
                </div>
                
                <div class="project-field">
                  <h3>Focus:</h3>
                  <p>Repeated regulated participation within daily interactions. Noticing whether stabilized presence alters relational patterns beyond a single exchange.</p>
                </div>
                
                <div class="project-field">
                  <h3>Mechanism explored:</h3>
                  <p>Repeated regulated interactions → environmental tone shifts → pattern stabilization.</p>
                </div>
                
                <p>
                  This project moves from individual interaction to ecological participation.
                </p>
                
                <RouterLink to="/practice/projects/behavioral-ecology" class="entry-link">
                  [Enter The Behavioral Ecology Project]
                </RouterLink>
              </div>
            </article>

            <article class="project">
              <h2>Project Three — Conversational Recursion</h2>
              <p class="subtitle">Identity-Level Amplification</p>
              
              <div class="project-content">
                <div class="project-field">
                  <h3>Question:</h3>
                  <p>Can reflective recognition deepen and amplify relational coherence?</p>
                </div>
                
                <div class="project-field">
                  <h3>Focus:</h3>
                  <p>Moments when meaning surfaces in conversation. Gently reflecting and expanding what is already present. Honoring signal without directing outcome.</p>
                </div>
                
                <div class="project-field">
                  <h3>Mechanism explored:</h3>
                  <p>Recognition → identity stabilization → reduced defensive monitoring → deeper regulation.</p>
                </div>
                
                <p>
                  This project explores whether coherence strengthens when identity is accurately seen and affirmed.
                </p>
                
                <RouterLink to="/practice/projects/conversational-recursion" class="entry-link">
                  [Enter Conversational Recursion]
                </RouterLink>
              </div>
            </article>
          </div>

          <section class="integrative-principle">
            <h2>The Integrative Principle</h2>
            <p>
              All three projects operate within the same ecology:
            </p>
            <div class="loop-diagram-small">
              Observer → Coherence → Sovereign Presence → Propagation
            </div>
            <p>
              Over time, practice becomes less deliberate and more natural.<br>
              Not imposed. Conducted.<br>
              This is embodied transcendence in action.
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
  title: 'Projects — Practice — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Projects — Practice — Coherence Across Scales' },
    { property: 'og:description', content: 'Three experimental practices exploring how coherence stabilizes in behavior and propagates across scales.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'Three experimental practices exploring how coherence stabilizes in behavior and propagates across scales.' },
  ],
});
</script>

<style lang="scss" scoped>
.projects-page {
  padding: var(--spacing-section) 0;
}

.page-header {
  margin-bottom: var(--spacing-xl);
  
  h1 {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    margin-bottom: 0;
  }
}

.page-content {
  max-width: 820px;
  margin: 0 auto;
  
  p {
    margin-bottom: var(--spacing-md);
    line-height: 1.7;
  }
  
  section {
    margin-top: var(--spacing-xl);
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: var(--spacing-md);
    }
  }
}

.opening {
  font-size: 1.0625rem;
  margin-bottom: var(--spacing-xl);
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.project {
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  
  h2 {
    font-size: 1.375rem;
    margin-bottom: var(--spacing-xs);
  }
  
  .subtitle {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.9375rem;
    color: var(--text-muted);
    margin-bottom: var(--spacing-lg);
  }
}

.project-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.project-field {
  h3 {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: var(--spacing-xs);
  }
  
  p {
    margin: 0;
    font-size: 0.9375rem;
  }
}

.entry-link {
  display: inline-block;
  margin-top: var(--spacing-sm);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  transition: color var(--transition-speed) ease;
  
  &:hover {
    color: var(--accent-hover);
    text-decoration: underline;
  }
}

.loop-diagram-small {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-xs) var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin: var(--spacing-md) 0;
  font-family: var(--font-sans);
  font-size: 0.875rem;
}

.loop-node {
  font-weight: 500;
  color: var(--accent);
}

.arrow {
  color: var(--text-muted);
}

.closing-line {
  margin-top: var(--spacing-xl);
  text-align: center;
  font-size: 1rem;
  color: var(--text-muted);
}
</style>
