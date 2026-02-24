<template>
  <a
    :href="href"
    :download="filename"
    class="download-btn"
    target="_blank"
    rel="noopener"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="download-icon"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    <span class="download-label">{{ label }}</span>
  </a>
</template>

<script setup>
defineProps({
  href: { type: String, required: true },
  filename: { type: String, default: '' },
  label: { type: String, default: 'Download PDF' },
});
</script>

<style lang="scss" scoped>
.download-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text);
  text-decoration: none;
  cursor: pointer;
  transition: background var(--transition-speed) ease,
              border-color var(--transition-speed) ease;

  &:hover {
    background: var(--bg-secondary);
    border-color: var(--accent);
    color: var(--text);
    text-decoration: none;

    .download-icon {
      color: var(--accent);
    }
  }
}

.download-icon {
  color: var(--text-muted);
  transition: color var(--transition-speed) ease;
}

.download-label {
  white-space: nowrap;
}
</style>
