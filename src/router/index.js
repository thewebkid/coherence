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
    component: () => import('@/components/PracticeLayout.vue'),
    children: [
      {
        path: '',
        name: 'practice',
        component: () => import('@/pages/PracticePage.vue'),
      },
      {
        path: 'the-loop',
        name: 'the-loop',
        component: () => import('@/pages/practice/TheLoopPage.vue'),
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('@/pages/practice/ProjectsIndexPage.vue'),
      },
      {
        path: 'projects/observation',
        name: 'observation-project',
        component: () => import('@/pages/practice/ObservationProjectPage.vue'),
      },
      {
        path: 'projects/behavioral-ecology',
        name: 'behavioral-ecology-project',
        component: () => import('@/pages/practice/BehavioralEcologyProjectPage.vue'),
      },
      {
        path: 'projects/conversational-recursion',
        name: 'conversational-recursion',
        component: () => import('@/pages/practice/ConversationalRecursionPage.vue'),
      },
      {
        path: 'projects/recursive-reflection',
        name: 'recursive-reflection-project',
        component: () => import('@/pages/practice/RecursiveReflectionProjectPage.vue'),
      },
      {
        path: 'embodied-transcendence',
        name: 'embodied-transcendence',
        component: () => import('@/pages/practice/EmbodiedTranscendencePage.vue'),
      },
      {
        path: 'definitions',
        name: 'definitions',
        component: () => import('@/pages/practice/DefinitionsPage.vue'),
      },
    ],
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
    path: '/signal/map',
    name: 'signal-map',
    component: () => import('@/pages/SignalMapPage.vue'),
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
