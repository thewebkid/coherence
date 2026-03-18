<template>
  <div class="work-content" :class="`work-content--${type}`">
    <!-- Image series -->
    <template v-if="type === 'image' || type === 'image-series'">
      <div
        v-for="(item, i) in normalizedItems"
        :key="i"
        class="work-item work-item--image"
      >
        <figure class="artwork-figure">
          <img :src="item.src" :alt="item.alt || title" class="artwork-image" />
        </figure>
        <div v-if="item.text" class="artwork-reflection">
          <p v-for="(line, j) in paragraphs(item.text)" :key="j">{{ line }}</p>
        </div>
      </div>
    </template>

    <!-- Essay / prose -->
    <template v-else-if="type === 'essay'">
      <div class="work-essay">
        <p v-for="(line, i) in paragraphs(content)" :key="i">{{ line }}</p>
      </div>
    </template>

    <!-- Video embed -->
    <template v-else-if="type === 'video'">
      <div class="work-embed work-embed--video">
        <iframe
          :src="embedUrl(content)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </template>

    <!-- Music embed (SoundCloud, Bandcamp, Spotify) -->
    <template v-else-if="type === 'music'">
      <div class="work-embed work-embed--music">
        <iframe :src="embedUrl(content)" frameborder="0" allow="autoplay" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: { type: String, required: true },
  content: { type: [String, Array], default: '' },
  title: { type: String, default: '' },
});

const normalizedItems = computed(() => {
  if (Array.isArray(props.content)) return props.content;
  return props.content ? [{ src: props.content }] : [];
});

function paragraphs(text) {
  if (!text) return [];
  return text.split('\n').filter((l) => l.trim());
}

function embedUrl(url) {
  if (!url) return '';
  if (url.includes('youtube.com/watch')) {
    return url.replace('watch?v=', 'embed/');
  }
  if (url.includes('youtu.be/')) {
    return url.replace('youtu.be/', 'www.youtube.com/embed/');
  }
  return url;
}
</script>

<style lang="scss" scoped>
.work-content {
  width: 100%;
}

.work-item--image {
  margin-bottom: var(--spacing-xl);
}

.artwork-figure {
  margin: 0 0 var(--spacing-md);
}

.artwork-image {
  display: block;
  width: 100%;
  max-width: 900px;
  height: auto;
  border-radius: var(--radius-sm);
}

.artwork-reflection {
  max-width: 680px;

  p {
    line-height: var(--iw-line-height-prose, 2);
    color: var(--text-muted);
    font-style: italic;
    margin-bottom: var(--spacing-sm);
  }
}

.work-essay {
  max-width: 680px;

  p {
    line-height: var(--iw-line-height-prose, 2);
    margin-bottom: var(--spacing-sm);
  }
}

.work-embed {
  position: relative;
  width: 100%;

  iframe {
    display: block;
    width: 100%;
    border-radius: var(--radius-sm);
  }

  &--video {
    padding-top: 56.25%; // 16:9

    iframe {
      position: absolute;
      inset: 0;
      height: 100%;
    }
  }

  &--music {
    iframe {
      height: 166px;
    }
  }
}
</style>
