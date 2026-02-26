<template>
  <div class="stewardship-page fade-in">
    <div class="page-container">
      <div class="content-container">
        <header class="page-header">
          <h1>Stewardship</h1>
        </header>

        <div class="page-content">
          <p>Stewardship is the ongoing care for coherence without the need to possess, control, or define it.</p>
          <p>It is not a role or a title.</p>
          <p>It is a way of standing in relation to what matters.</p>
          <p>
            In this work, stewardship means helping maintain the conditions under which coherence can remain visible and viable across scales — in how we live, relate, build, and participate within the larger Field we share.
          </p>
          <p>Coherence that is invisible remains abstract.</p>
          <p>Coherence that is visible becomes embodied.</p>
          <p>
            Visibility, in this sense, is not marketing.<br>
            It is manifestation — the lived expression of alignment in conduct and structure.
          </p>

          <hr>

          <h2>Why Stewardship Matters</h2>
          <p>When stewardship centralizes, work often becomes personality‑bound.</p>
          <p>When stewardship distributes, work becomes field‑bound.</p>
          <p>This distinction matters.</p>
          <p>The aim is not to build a movement or a following.</p>
          <p>It is to help maintain the conditions under which coherence can remain visible and viable across scales.</p>
          <p>Distributed stewardship allows coherence to remain present without requiring ownership or authority.</p>
          <p>It enables continuity without hierarchy.</p>
          <p>This is why <strong>Practice</strong> matters.</p>
          <p>This is why <strong>Signal</strong> matters.</p>
          <p>And this is why <strong>Stewardship</strong> itself matters.</p>
          <p>
            Each makes coherence visible in a different way —<br>
            in conduct,<br>
            in recognition,<br>
            and in responsibility.
          </p>

          <hr>

          <h2>What Is Being Stewarded</h2>
          <p>We are not stewarding a personality, a platform, or a fixed body of ideas.</p>
          <p>We steward the conditions that allow coherence to remain visible and viable.</p>
          <p>These conditions exist across many scales:</p>
          <ul>
            <li>in how we care for the clarity and integrity of our own lives</li>
            <li>in how we relate and communicate with others</li>
            <li>in how we design and conduct our work</li>
            <li>in how institutions and systems evolve</li>
            <li>in how we participate within the wider ecological and planetary context</li>
            <li>and in how we recognize our place within the larger Field of relationship and intelligence</li>
          </ul>
          <p>Stewardship, in this sense, is not confined to any single domain.</p>
          <p>It is a pattern of attention and responsibility that moves with us across contexts.</p>

          <hr>

          <h2>Distributed Stewardship</h2>
          <p>Participation does not require appointment or permission.</p>
          <p>
            Anyone who lives with care for coherence in how they think, act, design, and relate<br>
            is already participating in stewardship.
          </p>
          <p>This participation is quiet and often invisible.</p>
          <p>It does not seek recognition.</p>
          <p>It does not require affiliation.</p>
          <p>It does not depend on shared belief.</p>
          <p>
            It is expressed through fidelity to clarity,<br>
            to relationship,<br>
            and to the long‑term well‑being of the systems and fields we inhabit.
          </p>
          <p>As stewardship distributes, coherence stabilizes.</p>
          <p>As coherence stabilizes, trust becomes easier.</p>
          <p>And where trust becomes easier, new forms of collaboration and shared understanding can emerge naturally.</p>

          <hr>

          <h2>Closing</h2>
          <p>Stewardship is not ownership.</p>
          <p>It is participation in the ongoing care for what allows life, intelligence, and relationship to remain coherent across time.</p>
          <p>It asks for no special status.</p>
          <p>Only attention, integrity, and a willingness to care for what we help bring into the world.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Stewardship — Coherence Across Scales',
  meta: [
    { property: 'og:title', content: 'Stewardship — Coherence Across Scales' },
    { property: 'og:description', content: 'Stewardship is the ongoing care for coherence without the need to possess, control, or define it. It is a way of standing in relation to what matters.' },
    { property: 'og:type', content: 'article' },
    { name: 'description', content: 'Stewardship is the ongoing care for coherence without the need to possess, control, or define it. It is a way of standing in relation to what matters.' },
  ],
});
</script>

<style lang="scss" scoped>
.stewardship-page {
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

  h2 {
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
  }

  hr {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: var(--spacing-xl) 0;
  }

  ul {
    margin: var(--spacing-md) 0;
    padding-left: var(--spacing-lg);

    li {
      margin-bottom: var(--spacing-xs);
    }
  }

  strong {
    font-weight: 600;
  }
}
</style>
