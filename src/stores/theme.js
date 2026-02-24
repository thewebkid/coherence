import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const preference = ref(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('cas-theme') || 'system'
      : 'system'
  );

  function applyTheme(pref) {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    if (pref === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else if (pref === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }
  }

  function toggle() {
    const isDark = resolvedIsDark();
    preference.value = isDark ? 'light' : 'dark';
  }

  function resolvedIsDark() {
    if (preference.value === 'dark') return true;
    if (preference.value === 'light') return false;
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }

  watch(preference, (val) => {
    if (typeof localStorage !== 'undefined') {
      if (val === 'system') {
        localStorage.removeItem('cas-theme');
      } else {
        localStorage.setItem('cas-theme', val);
      }
    }
    applyTheme(val);
  }, { immediate: true });

  return { preference, toggle, resolvedIsDark, applyTheme };
});
