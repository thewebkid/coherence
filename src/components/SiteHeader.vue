<template>
  <header>
    <nav>

    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
const menuOpen = ref(false);

const isDark = computed(() => themeStore.resolvedIsDark());
</script>

<style lang="scss" scoped>

</style>
