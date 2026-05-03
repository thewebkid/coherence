<template>
  <Teleport to="body">
    <Transition name="lb">
      <div v-if="src" class="lb-backdrop" @click.self="close">
        <button class="lb-close" @click="close" aria-label="Close enlarged image">&#x2715;</button>
        <img :src="src" :alt="alt" class="lb-img" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  src: { type: String, default: null },
  alt: { type: String, default: '' },
});

const emit = defineEmits(['close']);

function close() {
  emit('close');
}

function onKeydown(e) {
  if (e.key === 'Escape' && props.src) close();
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<style lang="scss" scoped>
.lb-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

.lb-img {
  max-width: min(92vw, 1400px);
  max-height: 92vh;
  width: auto;
  height: auto;
  display: block;
  border-radius: 2px;
  cursor: default;
  user-select: none;
}

.lb-close {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.25);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.25rem 0.4rem;
  border-radius: 2px;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.75);
    background: rgba(255, 255, 255, 0.07);
  }
}

/* fade */
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.22s ease;
}

.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
</style>
