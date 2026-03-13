<template>
  <div class="practice-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Embodied participation in shared becoming</h1>
        </header>

        <div class="page-content">
          <p class="opening-statement">
            <strong>Perception of reality and participation across scales are not separate.</strong><br>
            <strong>They arise and are embodied together.</strong>
          </p>
          
          <p>
            Practice begins here.<br>
            Not as improvement.<br>
            Not as performance.<br>
            Not as belief.<br>
            But as lived experimentation<br>
            with coherence in daily life.
          </p>
          
          <p>
            Most systems offer insight.<br>
            Some offer inspiration.<br>
            Few extend into behavior.
          </p>
          
          <p>
            This space exists for that extension.
          </p>

          <section class="loop-orientation">
            <h2>Orientation: The Loop</h2>
            <p>
              There is a simple ecology underlying embodied coherence.<br>
              It functions whether named or not.<br>
              It becomes visible when practiced.
            </p>
            <div class="loop-diagram">
              <span class="loop-node">Observer</span>
              <span class="arrow">→</span>
              <span class="loop-node">Relational Coherence</span>
              <span class="arrow">→</span>
              <span class="loop-node">Sovereign Presence</span>
              <span class="arrow">→</span>
              <span class="loop-node">Propagation</span>
              <span class="arrow">→</span>
              <span class="loop-node">Observer</span>
            </div>
            <p>
              A living loop.<br>
              When perception becomes clearer,<br>
              participation changes.<br>
              When participation changes,<br>
              relational fields reorganize.<br>
              When relational fields reorganize,<br>
              new perception becomes possible.
            </p>
            <p>
              This is the loop of behavioral physics.<br>
              This is transcendent embodiment.<br>
              Not an ideal.<br>
              A lived recursion.
            </p>
          </section>

          <section class="why-section">
            <h2>Why Practice Exists</h2>
            <p>
              Insight alone does not reorganize the world.<br>
              Behavior does.
            </p>
            <p>
              Practice here is not about adopting beliefs or performing techniques.<br>
              It is about noticing:
            </p>
            <ul>
              <li>how perception forms</li>
              <li>how reaction arises</li>
              <li>how coherence can be embodied in real time</li>
              <li>how small behavioral shifts propagate through relational fields</li>
            </ul>
            <p>
              Nothing is required.<br>
              Nothing is performed.<br>
              Only observed, embodied, and lived.
            </p>
          </section>

          <section class="enter-practice">
            <h2>Enter a Practice</h2>
            <p class="section-intro">
              Each project below explores one aspect of the loop.<br>
              They can be entered in any order.<br>
              They are most revealing when lived gently and quietly.
            </p>

            <div class="practice-entries">
              <RouterLink to="/practice/projects/observation" class="practice-entry">
                <h3>The Observation Project</h3>
                <p>
                  Refining the formative observer.<br>
                  Learning to slow interpretation and judgment before reacting.<br>
                  Developing clear seeing as behavioral substrate.
                </p>
              </RouterLink>

              <RouterLink to="/practice/projects/behavioral-ecology" class="practice-entry">
                <h3>The Behavioral Ecology Project</h3>
                <p>
                  Exploring how coherence spreads across interactions and environments over time.
                </p>
              </RouterLink>

              <RouterLink to="/practice/projects/conversational-recursion" class="practice-entry">
                <h3>Conversational Recursion</h3>
                <p>
                  Exploring whether recognition and reflective amplification deepen relational coherence and propagation.
                </p>
              </RouterLink>

              <RouterLink to="/practice/projects/recursive-reflection" class="practice-entry">
                <h3>The Recursive Reflection Project</h3>
                <p>
                  Using AI as a reflective mirror to deepen sovereign clarity and coherence.
                </p>
              </RouterLink>

              <RouterLink to="/practice/embodied-transcendence" class="practice-entry">
                <h3>Embodied Transcendence</h3>
                <p>
                  The integrative principle linking presence and propagation across scales.
                </p>
              </RouterLink>
            </div>
            
            <p class="post-entries-text">
              Each practice is a lived experiment.<br>
              Not a program.<br>
              Not a course.<br>
              A test drive of embodied coherence.
            </p>
          </section>

          <section class="hypothesis">
            <h2>Working Hypothesis</h2>
            <p>
              Changing perception is not private.<br>
              It changes participation everywhere.<br>
              When participation changes,<br>
              relational fields reorganize.<br>
              When relational fields reorganize,<br>
              new possibilities of coherence emerge.<br>
              This is shared becoming<br>
              as lived practice.
            </p>
          </section>

          <p class="closing-line">
            <em>When metaphor completes its work, it disappears into behavior.</em>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Practice — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Practice — Coherence Across Scales' },
    { property: 'og:description', content: 'Embodied participation in shared becoming. A quiet laboratory exploring how coherence stabilizes in lived behavior and propagates across scales.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'Embodied participation in shared becoming. A quiet laboratory exploring how coherence stabilizes in lived behavior and propagates across scales.' },
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
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    margin-bottom: 0;
  }
}

.page-content {
  max-width: 720px;
  margin: 0 auto;
  
  p {
    margin-bottom: var(--spacing-md);
    line-height: 1.7;
  }
  
  section {
    margin-bottom: var(--spacing-xl);
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: var(--spacing-md);
    }
    
    h3 {
      font-size: 1.125rem;
      margin-bottom: var(--spacing-sm);
    }
  }
}

.opening-statement {
  font-size: 1.0625rem;
  color: var(--text);
  margin-bottom: var(--spacing-xl);
}

.loop-diagram {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs) var(--spacing-sm);
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin: var(--spacing-lg) 0;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
}

.loop-node {
  font-weight: 500;
  color: var(--accent);
}

.arrow {
  color: var(--text-muted);
}

.section-intro {
  font-style: italic;
  color: var(--text-muted);
  margin-bottom: var(--spacing-lg);
}

.practice-entries {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.practice-entry {
  display: block;
  padding: var(--spacing-lg) var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--transition-speed) ease, 
              border-color var(--transition-speed) ease;
  
  &:hover {
    background: var(--bg);
    border-color: var(--accent);
  }
  
  h3 {
    margin-bottom: var(--spacing-sm);
    color: var(--text);
    transition: color var(--transition-speed) ease;
  }
  
  &:hover h3 {
    color: var(--accent);
  }
  
  p {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--text-muted);
  }
}

.post-entries-text {
  margin-top: var(--spacing-xl);
}

.closing-line {
  margin-top: var(--spacing-xl);
  text-align: center;
  font-size: 1rem;
  color: var(--text-muted);
}
</style>

