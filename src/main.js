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
  ({ app, router, isClient }) => {
    const pinia = createPinia();
    app.use(pinia);
    app.use(createBootstrap());
    app.directive('b-tooltip', vBTooltip);

    if (isClient) {
      router.onError((err, to) => {
        const isChunkError =
          err.message.includes('Failed to fetch dynamically imported module') ||
          err.message.includes('Importing a module script failed') ||
          err.message.includes('Unable to preload CSS');
        if (isChunkError) {
          window.location.href = to.fullPath;
        }
      });
      const clerkOptions = {
        publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
      };
      if (import.meta.env.VITE_CLERK_PROXY_URL) {
        clerkOptions.proxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
      }
      app.use(clerkPlugin, clerkOptions);
      const theme = useThemeStore();
      theme.applyTheme(theme.preference);
    }
  }
);
