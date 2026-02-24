<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-primary">
          <RouterLink to="/civilizational-orientation" class="footer-cta">
            A Civilizational Orientation
          </RouterLink>
          <p class="footer-tagline">
            Civilization is a local practice.
          </p>
        </div>

        <nav class="footer-nav">
          <RouterLink to="/contact">Contact</RouterLink>
          <RouterLink to="/stewardship">Stewardship</RouterLink>
          <RouterLink to="/institutional">Institutional Inquiries</RouterLink>
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-attribution">
          
        </p>
        <p class="footer-copyright">
          &copy; {{ currentYear }} Coherence Across Scales
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.site-footer {
  margin-top: auto;
  padding: var(--spacing-section) 0 var(--spacing-lg);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
}

.footer-container {
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 0 var(--margin-page);
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.footer-primary {
  max-width: 320px;
}

.footer-cta {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  margin-bottom: var(--spacing-sm);

  &:hover {
    color: var(--accent);
  }
}

.footer-tagline {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.0625rem;
  color: var(--text-muted);
  margin: 0;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm) var(--spacing-lg);

  a {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--transition-speed) ease;

    &:hover {
      color: var(--text);
    }
  }
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-attribution,
.footer-copyright {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  color: var(--text-muted);
  margin: 0;
}
</style>
