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
