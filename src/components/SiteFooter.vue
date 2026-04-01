<template>
  <footer class="site-footer">
    <div class="footer-container">

      <!-- The System statement -->
      <div class="footer-system">
        <h3 class="system-title">The System</h3>
        <div class="system-links">
          <RouterLink to="/practice" class="system-link"><strong>Practice</strong></RouterLink>
          <span class="system-arrow">→</span>
          <span class="system-desc">generates signals</span>

          <RouterLink to="/observatory" class="system-link"><strong>Observatory</strong></RouterLink>
          <span class="system-arrow">→</span>
          <span class="system-desc">makes patterns visible</span>

          <RouterLink to="/interpretive-works" class="system-link"><strong>Interpretive Works</strong></RouterLink>
          <span class="system-arrow">→</span>
          <span class="system-desc">translates signals into meaning</span>

          <RouterLink to="/work" class="system-link"><strong>The Work</strong></RouterLink>
          <span class="system-arrow">→</span>
          <span class="system-desc">explains the system</span>
        </div>
      </div>

      <!-- Footer quote -->
      <blockquote class="footer-quote">
        A civilization begins to change when it can observe itself clearly—
        not as isolated parts, but as patterns in relation.
      </blockquote>

      <div class="footer-content">
        <nav class="footer-nav">
          <RouterLink to="/contact">Contact</RouterLink>
          <RouterLink to="/institutional">Institutional Inquiries</RouterLink>
          <RouterLink to="/stewardship">Stewardship</RouterLink>
          <RouterLink to="/simple-terms">Simple Terms</RouterLink>
          <a href="/pdf/The-Mirror-Across-Scales.pdf" target="_blank" rel="noopener">Mirror Across Scales</a>
          <a href="/pdf/TCP Executive Brief.pdf" target="_blank" rel="noopener">TCP Executive Brief</a>
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">&copy; {{ currentYear }} Coherence Across Scales</p>
      </div>

    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.site-footer {
  margin-top: var(--spacing-section);
  padding: var(--spacing-xl) 0 var(--spacing-lg);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
}

.footer-container {
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 0 var(--margin-page);
}

// The System block
.footer-system {
  margin-bottom: var(--spacing-xl);
}

.system-title {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.system-links {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: var(--spacing-xs) var(--spacing-md);
  align-items: baseline;
  max-width: 480px;
}

.system-link {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--text);
  text-decoration: none;

  &:hover { color: var(--accent); }

  strong { font-weight: 500; }
}

.system-arrow {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--text-muted);
}

.system-desc {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.875rem;
  color: var(--text-muted);
}

// Quote
.footer-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.7;
  text-align: center;
  border: none;
  padding: var(--spacing-lg) 0;
  margin: 0 0 var(--spacing-xl);
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

// Nav links
.footer-content {
  margin-bottom: var(--spacing-lg);
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm) var(--spacing-lg);
  justify-content: center;

  a {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--transition-speed) ease;

    &:hover { color: var(--text); }
  }
}

// Bottom bar
.footer-bottom {
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-copyright {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  color: var(--text-muted);
  margin: 0;
}
</style>
