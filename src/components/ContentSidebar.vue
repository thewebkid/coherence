<template>
  <aside class="content-sidebar" :class="{ 'is-open': isOpen }">
    <!-- Mobile toggle -->
    <button
      class="sidebar-toggle"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-label="Toggle navigation"
    >
      <span class="sidebar-toggle-label">{{ currentTitle }}</span>
      <svg
        class="sidebar-toggle-icon"
        :class="{ 'is-rotated': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <!-- Navigation list -->
    <nav class="sidebar-nav" :class="{ 'is-visible': isOpen }">
      <div class="sidebar-header">
        <h3 class="sidebar-title">{{ title }}</h3>
      </div>
      <ul class="sidebar-list">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="sidebar-item"
        >
          <button
            class="sidebar-link"
            :class="{ 'is-active': index === activeIndex }"
            @click="selectItem(index)"
          >
            <span class="sidebar-link-title">{{ item.title }}</span>
            <span v-if="item.subtitle" class="sidebar-link-subtitle">{{ item.subtitle }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Overlay for mobile -->
    <div
      v-if="isOpen"
      class="sidebar-overlay"
      @click="isOpen = false"
    />
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  title: { type: String, default: 'Contents' },
  items: { type: Array, required: true },
  activeIndex: { type: Number, default: 0 },
});

const emit = defineEmits(['select']);

const isOpen = ref(false);

const currentTitle = computed(() => {
  if (props.items[props.activeIndex]) {
    return props.items[props.activeIndex].title;
  }
  return props.title;
});

function selectItem(index) {
  emit('select', index);
  isOpen.value = false;
}

// Close sidebar when activeIndex changes externally
watch(() => props.activeIndex, () => {
  isOpen.value = false;
});
</script>

<style lang="scss" scoped>
.content-sidebar {
  position: relative;
}

// Mobile toggle button
.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--text);
  cursor: pointer;
  transition: background var(--transition-speed) ease;

  &:hover {
    background: var(--border);
  }

  @media (min-width: 1024px) {
    display: none;
  }
}

.sidebar-toggle-label {
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-toggle-icon {
  flex-shrink: 0;
  margin-left: var(--spacing-sm);
  transition: transform var(--transition-speed) ease;

  &.is-rotated {
    transform: rotate(180deg);
  }
}

// Navigation panel
.sidebar-nav {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(320px, 85vw);
  background-color: var(--bg);
  z-index: 201;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);

  &.is-visible {
    display: flex;
  }

  @media (min-width: 1024px) {
    display: flex;
    position: sticky;
    top: 5rem;
    width: var(--sidebar-width);
    max-height: calc(100vh - 6rem);
    background-color: var(--bg);
    box-shadow: none;
    border-right: 1px solid var(--border);
    padding-right: var(--spacing-md);
  }
}

.sidebar-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border);

  @media (min-width: 1024px) {
    padding: 0 0 var(--spacing-sm) 0;
  }
}

.sidebar-title {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.sidebar-list {
  list-style: none;
  margin: 0;
  padding: var(--spacing-sm) 0;

  @media (min-width: 1024px) {
    padding: var(--spacing-sm) 0 0 0;
  }
}

.sidebar-item {
  margin: 0;
}

.sidebar-link {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color var(--transition-speed) ease;
  color: var(--text);

  &:hover {
    background-color: var(--bg-secondary);
  }

  &.is-active {
    background-color: var(--accent);
    
    .sidebar-link-title {
      color: var(--bg);
    }

    .sidebar-link-subtitle {
      color: var(--bg);
      opacity: 0.8;
    }
  }

  @media (min-width: 1024px) {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
  }
}

.sidebar-link-title {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
  line-height: 1.4;
}

.sidebar-link-subtitle {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-top: 2px;
}

// Overlay for mobile
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;

  @media (min-width: 1024px) {
    display: none;
  }
}
</style>
