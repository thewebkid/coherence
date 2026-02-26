<template>
  <div class="slide-carousel" @keydown="handleKeydown" tabindex="0" ref="carouselRef">
    <!-- Slide content -->
    <div class="slide-viewport">
      <Transition :name="transitionName" mode="out-in">
        <div :key="currentIndex" class="slide-content">
          <MarkdownContent :source="currentSlide" />
        </div>
      </Transition>
    </div>

    <!-- Navigation -->
    <div class="slide-nav">
      <button
        class="slide-nav-btn"
        :disabled="currentIndex === 0"
        @click="prev"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        <span class="slide-nav-label">Previous</span>
      </button>

      <div class="slide-counter">
        <span class="slide-counter-current">{{ currentIndex + 1 }}</span>
        <span class="slide-counter-sep">/</span>
        <span class="slide-counter-total">{{ slides.length }}</span>
      </div>

      <button
        class="slide-nav-btn"
        :disabled="currentIndex === slides.length - 1"
        @click="next"
        aria-label="Next slide"
      >
        <span class="slide-nav-label">Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>

    <!-- Progress dots for mobile -->
    <div class="slide-dots">
      <button
        v-for="(_, index) in slides"
        :key="index"
        class="slide-dot"
        :class="{ 'is-active': index === currentIndex }"
        @click="goTo(index)"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import MarkdownContent from './MarkdownContent.vue';

const props = defineProps({
  slides: { type: Array, required: true },
});

const currentIndex = ref(0);
const transitionName = ref('slide-next');
const carouselRef = ref(null);

const currentSlide = computed(() => props.slides[currentIndex.value] || '');

function prev() {
  if (currentIndex.value > 0) {
    transitionName.value = 'slide-prev';
    currentIndex.value--;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function next() {
  if (currentIndex.value < props.slides.length - 1) {
    transitionName.value = 'slide-next';
    currentIndex.value++;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function goTo(index) {
  if (index !== currentIndex.value) {
    transitionName.value = index > currentIndex.value ? 'slide-next' : 'slide-prev';
    currentIndex.value = index;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function handleKeydown(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    prev();
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    next();
  }
}

onMounted(() => {
  // Focus carousel for keyboard nav
  carouselRef.value?.focus();
});
</script>

<style lang="scss" scoped>
.slide-carousel {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 10rem);
  outline: none;
}

.slide-viewport {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg) 0;
}

.slide-content {
  max-width: var(--content-width);
  width: 100%;
  padding: var(--spacing-xl);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);

  @media (min-width: 768px) {
    padding: var(--spacing-xl) calc(var(--spacing-xl) * 1.5);
  }
}

.slide-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-md) 0;
  border-top: 1px solid var(--border);
}

.slide-nav-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text);
  cursor: pointer;
  transition: background var(--transition-speed) ease,
              border-color var(--transition-speed) ease;

  &:hover:not(:disabled) {
    background: var(--bg-secondary);
    border-color: var(--text-muted);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  svg {
    color: var(--text-muted);
  }
}

.slide-nav-label {
  @media (max-width: 480px) {
    display: none;
  }
}

.slide-counter {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-muted);
  min-width: 60px;
  text-align: center;
}

.slide-counter-current {
  color: var(--text);
  font-weight: 500;
}

.slide-counter-sep {
  margin: 0 0.25em;
}

.slide-dots {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) 0 var(--spacing-md);

  @media (min-width: 768px) {
    display: none;
  }
}

.slide-dot {
  width: 8px;
  height: 8px;
  padding: 0;
  background: var(--border);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background var(--transition-speed) ease;

  &:hover {
    background: var(--text-muted);
  }

  &.is-active {
    background: var(--accent);
  }
}

// Slide transitions
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-next-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-next-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-prev-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
