const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/orientation',
    name: 'orientation',
    component: () => import('@/pages/OrientationPage.vue'),
  },
  {
    path: '/glossary',
    name: 'glossary',
    component: () => import('@/pages/GlossaryPage.vue'),
  },
  {
    path: '/engine',
    name: 'engine',
    component: () => import('@/pages/EnginePage.vue'),
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('@/pages/WorkPage.vue'),
  },
  {
    path: '/work/manuscript',
    name: 'manuscript',
    component: () => import('@/pages/ManuscriptPage.vue'),
  },
  {
    path: '/work/deck',
    name: 'deck',
    component: () => import('@/pages/DeckPage.vue'),
  },
  {
    path: '/work/handbook',
    name: 'handbook',
    component: () => import('@/pages/HandbookPage.vue'),
  },
  {
    path: '/practice',
    name: 'practice',
    component: () => import('@/pages/PracticePage.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
  },
  {
    path: '/signal',
    name: 'signal',
    component: () => import('@/pages/SignalPage.vue'),
  },
  {
    path: '/stewardship',
    name: 'stewardship',
    component: () => import('@/pages/StewardshipPage.vue'),
  },
  {
    path: '/institutional',
    name: 'institutional',
    component: () => import('@/pages/InstitutionalPage.vue'),
  },
  {
    path: '/civilizational-orientation',
    name: 'civilizational-orientation',
    component: () => import('@/pages/CivilizationalOrientationPage.vue'),
  },
];

export { routes };
