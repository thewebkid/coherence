const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },

  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
  },
];

export { routes };
