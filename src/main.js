import { ViteSSG } from 'vite-ssg';
import { createPinia } from 'pinia';
import { clerkPlugin } from '@clerk/vue';
import { vBTooltip } from 'bootstrap-vue-next';
import App from './App.vue';
import { routes } from './router';
import { useThemeStore } from './stores/theme';
import 'leaflet/dist/leaflet.css';
import {createBootstrap} from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
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
    app.use(createBootstrap());
    app.directive('b-tooltip', vBTooltip);

    if (isClient) {
      app.use(clerkPlugin, {
        publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
      });
      const theme = useThemeStore();
      theme.applyTheme(theme.preference);
    }
  }
);
