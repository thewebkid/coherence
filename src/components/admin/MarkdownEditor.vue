<template>
  <div class="md-editor" :class="{ 'md-editor--disabled': disabled }">
    <div class="md-toolbar" v-if="editor">
      <button
        type="button"
        class="md-btn"
        :class="{ 'is-active': editor.isActive('bold') }"
        :disabled="disabled"
        @click="editor.chain().focus().toggleBold().run()"
        title="Bold (Ctrl/Cmd+B)"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        class="md-btn"
        :class="{ 'is-active': editor.isActive('italic') }"
        :disabled="disabled"
        @click="editor.chain().focus().toggleItalic().run()"
        title="Italic (Ctrl/Cmd+I)"
      >
        <em>I</em>
      </button>
      <span class="md-sep" aria-hidden="true" />
      <button
        type="button"
        class="md-btn"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        :disabled="disabled"
        @click="editor.chain().focus().toggleBlockquote().run()"
        title="Blockquote"
      >
        &ldquo; &rdquo;
      </button>
      <button
        type="button"
        class="md-btn"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        :disabled="disabled"
        @click="editor.chain().focus().toggleBulletList().run()"
        title="Bullet list"
      >
        •&nbsp;&nbsp;•
      </button>
      <span class="md-sep" aria-hidden="true" />
      <button
        type="button"
        class="md-btn"
        :class="{ 'is-active': editor.isActive('link') }"
        :disabled="disabled"
        @click="toggleLink"
        title="Link"
      >
        ↗
      </button>
    </div>

    <EditorContent :editor="editor" class="md-content" />
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount, onMounted } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';

const props = defineProps({
  modelValue: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

const editor = ref(null);
let suppressEmit = false;

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        // StarterKit v3 already bundles bold, italic, blockquote, bulletList,
        // orderedList, link, etc. We disable the bits that don't round-trip
        // cleanly to Markdown or aren't part of this editor's UI.
        heading: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
        underline: false,
        strike: false,
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: 'noopener noreferrer' },
        },
      }),
      Markdown,
    ],
    content: props.modelValue,
    editorProps: {
      attributes: {
        class: 'md-prose',
      },
    },
    onCreate: ({ editor: e }) => {
      if (props.modelValue) {
        suppressEmit = true;
        e.commands.setContent(props.modelValue, { contentType: 'markdown' });
        suppressEmit = false;
      }
    },
    onUpdate: ({ editor: e }) => {
      if (suppressEmit) return;
      const md = e.getMarkdown();
      emit('update:modelValue', md);
    },
  });
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (!editor.value) return;
    if (suppressEmit) return;
    const current = editor.value.getMarkdown();
    if ((newVal ?? '') === current) return;
    suppressEmit = true;
    editor.value.commands.setContent(newVal ?? '', { contentType: 'markdown' });
    suppressEmit = false;
  }
);

watch(
  () => props.disabled,
  (isDisabled) => {
    if (editor.value) editor.value.setEditable(!isDisabled);
  }
);

onBeforeUnmount(() => {
  editor.value?.destroy();
});

function toggleLink() {
  if (!editor.value) return;
  const prev = editor.value.getAttributes('link').href;
  const url = window.prompt('URL', prev || 'https://');
  if (url === null) return;
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }
  editor.value
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run();
}
</script>

<style lang="scss" scoped>
.md-editor {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &--disabled { opacity: 0.6; pointer-events: none; }
}

.md-toolbar {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}

.md-btn {
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background var(--transition-speed) ease, color var(--transition-speed) ease;

  &:hover:not(:disabled) {
    background: var(--bg);
    border-color: var(--border);
  }

  &.is-active {
    background: var(--bg);
    border-color: var(--iw-accent, var(--accent));
    color: var(--iw-accent, var(--accent));
  }

  &:disabled { cursor: not-allowed; opacity: 0.5; }
}

.md-sep {
  width: 1px;
  height: 1.25rem;
  background: var(--border);
  margin: 0 0.25rem;
}

.md-content {
  padding: var(--spacing-sm) var(--spacing-md);
  min-height: 18rem;
  max-height: 40rem;
  overflow-y: auto;
  background: var(--bg);

  :deep(.md-prose) {
    outline: none;
    font-family: var(--font-sans);
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text);
    min-height: 16rem;

    > * + * { margin-top: 0.6em; }

    p { margin: 0; }

    strong, b { font-weight: 700; }
    em, i { font-style: italic; }

    blockquote {
      border-left: 3px solid var(--border);
      padding: 0.25rem 0 0.25rem var(--spacing-md);
      margin: 0;
      color: var(--text-muted);
      font-style: italic;
    }

    ul, ol {
      padding-left: 1.5rem;
      margin: 0;

      li { margin: 0.15rem 0; }
    }

    a {
      color: var(--accent);
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    // Empty-editor placeholder (browser-native for simplicity).
    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      color: var(--text-muted);
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
}
</style>
