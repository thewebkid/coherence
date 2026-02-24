<template>
  <div class="markdown-body" v-html="rendered"></div>
</template>

<script setup>
import { computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps({
  source: { type: String, required: true },
});

marked.setOptions({
  breaks: false,
  gfm: true,
});

const rendered = computed(() => {
  if (!props.source) return '';
  const raw = marked.parse(props.source);
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(raw);
  }
  return raw;
});
</script>

<style lang="scss" scoped>
.markdown-body {
  // Prose typography for rendered markdown
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: var(--line-height-body);
  color: var(--text);

  // Headings
  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    font-family: var(--font-sans);
    font-weight: 500;
    line-height: var(--line-height-heading);
    color: var(--text);
    margin-top: 0;
    margin-bottom: var(--spacing-sm);
  }

  :deep(h1) {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 400;
    letter-spacing: -0.02em;
    margin-bottom: var(--spacing-md);
  }

  :deep(h2) {
    font-size: clamp(1.375rem, 3vw, 1.625rem);
    margin-top: var(--spacing-xl);
    padding-bottom: var(--spacing-xs);
    border-bottom: 1px solid var(--border);
  }

  :deep(h3) {
    font-size: clamp(1.125rem, 2.5vw, 1.25rem);
    margin-top: var(--spacing-lg);
  }

  :deep(h4) {
    font-size: 1rem;
    font-weight: 600;
    margin-top: var(--spacing-md);
  }

  // Paragraphs
  :deep(p) {
    margin-top: 0;
    margin-bottom: var(--spacing-sm);

    &:last-child {
      margin-bottom: 0;
    }
  }

  // Links
  :deep(a) {
    color: var(--accent);
    text-decoration: none;
    transition: color var(--transition-speed) ease;

    &:hover {
      color: var(--accent-hover);
      text-decoration: underline;
    }
  }

  // Emphasis
  :deep(strong),
  :deep(b) {
    font-weight: 600;
  }

  :deep(em),
  :deep(i) {
    font-style: italic;
  }

  // Blockquotes - contemplative, refined
  :deep(blockquote) {
    margin: var(--spacing-lg) 0;
    padding: var(--spacing-md) var(--spacing-lg);
    border-left: 3px solid var(--accent);
    background: var(--bg-secondary);
    font-style: italic;
    color: var(--text-muted);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;

    p {
      margin-bottom: var(--spacing-xs);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  // Lists
  :deep(ul),
  :deep(ol) {
    margin: var(--spacing-sm) 0;
    padding-left: var(--spacing-lg);

    li {
      margin-bottom: var(--spacing-xs);
    }
  }

  :deep(ul) {
    list-style-type: disc;
  }

  :deep(ol) {
    list-style-type: decimal;
  }

  // Nested lists
  :deep(ul ul),
  :deep(ol ol),
  :deep(ul ol),
  :deep(ol ul) {
    margin-top: var(--spacing-xs);
    margin-bottom: 0;
  }

  // Horizontal rule
  :deep(hr) {
    border: none;
    border-top: 1px solid var(--border);
    margin: var(--spacing-lg) 0;
  }

  // Code (inline)
  :deep(code) {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
    font-size: 0.875em;
    background: var(--bg-secondary);
    padding: 0.125em 0.375em;
    border-radius: var(--radius-sm);
    color: var(--text);
  }

  // Code blocks
  :deep(pre) {
    margin: var(--spacing-md) 0;
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
    }
  }

  // Images
  :deep(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: var(--spacing-lg) auto;
    border-radius: var(--radius-md);
  }

  // Tables
  :deep(table) {
    width: 100%;
    margin: var(--spacing-md) 0;
    border-collapse: collapse;
    font-size: 0.9375rem;
  }

  :deep(th),
  :deep(td) {
    padding: var(--spacing-sm);
    text-align: left;
    border-bottom: 1px solid var(--border);
  }

  :deep(th) {
    font-family: var(--font-sans);
    font-weight: 500;
    color: var(--text);
  }

  :deep(td) {
    color: var(--text-muted);
  }

  // First element should have no top margin
  > :deep(:first-child) {
    margin-top: 0;
  }

  // Last element should have no bottom margin
  > :deep(:last-child) {
    margin-bottom: 0;
  }
}
</style>
