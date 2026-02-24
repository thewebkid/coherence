import { ViteSSG } from 'vite-ssg';
import { createPinia } from 'pinia';
import App from './App.vue';
import { routes } from './router';
import { useThemeStore } from './stores/theme';
import './assets/styles/main.scss';

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash, behavior: 'smooth' };
      return { top: 0, behavior: 'smooth' };
    },
  },
  ({ app, isClient }) => {
    const pinia = createPinia();
    app.use(pinia);

    if (isClient) {
      const theme = useThemeStore();
      theme.applyTheme(theme.preference);
    }
  }
);
