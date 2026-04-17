<template>
  <section class="weekly-signal">
    <div class="weekly-signal__inner">
      <div class="weekly-signal__meta">
        <span class="weekly-signal__label">{{ label }}</span>
        <span class="weekly-signal__date">{{ timeframe }}</span>
      </div>
      <div class="weekly-signal__body" v-html="renderedContent"></div>
    </div>
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
  padding: var(--spacing-xl);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}

.weekly-signal__meta {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.weekly-signal__label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

.weekly-signal__date {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.weekly-signal__body {
  :deep(p) {
    margin-bottom: var(--spacing-sm);
    line-height: 1.75;

    &:last-child { margin-bottom: 0; }
  }

  :deep(ul),
  :deep(ol) {
    margin: var(--spacing-sm) 0;
    padding-left: 1.5rem;

    li {
      margin-bottom: var(--spacing-xs);
      line-height: 1.7;
    }
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

  :deep(strong),
  :deep(b) {
    font-weight: 600;
  }

  :deep(a) {
    color: var(--accent);
    text-decoration: none;

    &:hover { text-decoration: underline; }
  }

  :deep(hr) {
    border: none;
    border-top: 1px solid var(--border);
    margin: var(--spacing-md) 0;
  }
}
</style>
