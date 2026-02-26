<template>
  <header class="site-header">
    <div class="header-container">
      <RouterLink to="/" class="site-logo">
        Coherence Across Scales
      </RouterLink>

      <nav class="nav-desktop">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="header-actions">
        <button
          class="theme-toggle"
          @click="themeStore.toggle()"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <button
          class="menu-toggle"
          @click="menuOpen = true"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu overlay -->
    <Transition name="fade">
      <div v-if="menuOpen" class="menu-overlay" @click="menuOpen = false" />
    </Transition>

    <!-- Mobile menu -->
    <Transition name="slide">
      <aside v-if="menuOpen" class="nav-mobile" aria-label="Mobile menu">
        <div class="nav-mobile-header">
          <span class="nav-mobile-title">Menu</span>
          <button class="menu-close" @click="menuOpen = false" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-mobile-link"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
      </aside>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
const menuOpen = ref(false);

const isDark = computed(() => themeStore.resolvedIsDark());

const navLinks = [
  { to: '/orientation', label: 'Orientation' },
  { to: '/work', label: 'The Work' },
  { to: '/engine', label: 'The Engine' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/practice', label: 'Practice' },
  { to: '/signal', label: 'Signal' },
];
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.header-container {
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 0 var(--margin-page);
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.site-logo {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: var(--accent);
  }
}

.nav-desktop {
  display: none;
  gap: var(--spacing-lg);

  @media (min-width: 900px) {
    display: flex;
  }
}

.nav-link {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-speed) ease;

  &:hover,
  &.router-link-active {
    color: var(--text);
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.theme-toggle,
.menu-toggle,
.menu-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: color var(--transition-speed) ease,
              background var(--transition-speed) ease;

  &:hover {
    color: var(--text);
    background: var(--bg-secondary);
  }
}

.menu-toggle {
  @media (min-width: 900px) {
    display: none;
  }
}

// Mobile menu overlay
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
}

// Mobile menu panel
.nav-mobile {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(320px, 85vw);
  background: var(--bg);
  a, div{
    background-color: var(--bg);
  }
  background-color: var(--bg) !important;
  z-index: 201;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.5);
}

.nav-mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--border);
}

.nav-mobile-title {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
}

.nav-mobile-link {
  display: block;
  padding: var(--spacing-md) var(--spacing-lg);
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: background var(--transition-speed) ease;

  &:hover {
    background: var(--bg-secondary);
  }

  &.router-link-active {
    color: var(--accent);
  }
}

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
