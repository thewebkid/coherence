<template>
  <section class="surface-panel weekly-signal">
    <div class="meta-row">
      <span class="text-label">{{ label }}</span>
      <span class="text-meta">{{ timeframe }}</span>
    </div>
    <div class="weekly-signal__body" v-html="renderedContent"></div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps({
  label: { type: String, default: 'Weekly Signal' },
  timeframe: { type: String, default: '' },
  content: { type: String, default: '' },
});

marked.setOptions({ breaks: false, gfm: true });

const renderedContent = computed(() => {
  if (!props.content) return '';
  const raw = marked.parse(props.content);
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(raw);
  }
  return raw;
});
</script>

<style lang="scss" scoped>
.weekly-signal {
  margin-bottom: var(--spacing-xl);
}

// Scoped :deep() overrides for markdown-rendered HTML body content.
// Global typography covers standard tags, but we need precise control here
// because this component renders arbitrary user-submitted markdown.
.weekly-signal__body {
  :deep(p) {
    &:last-child { margin-bottom: 0; }
  }

  :deep(blockquote) {
    border-left: 2px solid var(--border);
    padding-left: var(--spacing-md);
    font-style: italic;
    color: var(--text-muted);
    margin: var(--spacing-md) 0;
    background: transparent;
    border-radius: 0;

    p {
      font-size: inherit;
      margin-bottom: 0;
    }
  }

  :deep(em),
  :deep(i) {
    font-style: italic;
    color: var(--text-muted);
  }
}
</style>
