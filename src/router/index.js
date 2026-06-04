const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
  },
  {
    path: '/updates',
    name: 'updates',
    component: () => import('@/pages/UpdatesPage.vue'),
  },
  {
    path: '/note-to-observers',
    name: 'note-to-observers',
    component: () => import('@/pages/NoteToObserversPage.vue'),
  },
  {
    path: '/simple-terms',
    name: 'simple-terms',
    component: () => import('@/pages/SimpleTermsPage.vue'),
  },
  {
    path: '/observatory',
    name: 'observatory',
    component: () => import('@/pages/ObservatoryPage.vue'),
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
    path: '/work/civilizational-blindness',
    name: 'civilizational-blindness',
    component: () => import('@/pages/CivilizationalBlindnessPage.vue'),
  },
  {
    path: '/work/field-beneath-the-names',
    name: 'field-beneath-the-names',
    component: () => import('@/pages/FieldBeneathTheNamesPage.vue'),
  },
  {
    path: '/work/when-nothing-is-carried-forward',
    name: 'when-nothing-is-carried-forward',
    component: () => import('@/pages/WhenNothingIsCarriedForwardPage.vue'),
  },
  {
    path: '/work/conditions-of-coherent-intelligence',
    name: 'conditions-of-coherent-intelligence',
    component: () => import('@/pages/ConditionsOfCoherentIntelligencePage.vue'),
  },
  {
    path: '/work/dialogue-on-authorship',
    name: 'dialogue-on-authorship',
    component: () => import('@/pages/DialogueOnAuthorshipPage.vue'),
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
        path: 'orientation',
        name: 'practice-orientation',
        component: () => import('@/pages/practice/OrientationPage.vue'),
      },
      {
        path: 'stability-and-permeability',
        name: 'stability-and-permeability',
        component: () => import('@/pages/practice/StabilityPermeabilityPage.vue'),
      },
      {
        path: 'first-act-of-observation',
        name: 'first-act-of-observation',
        component: () => import('@/pages/practice/FirstActOfObservationPage.vue'),
      },
      {
        path: 'core-condition',
        name: 'core-condition',
        component: () => import('@/pages/practice/CoreConditionPage.vue'),
      },
      {
        path: 'dialogue-on-willingness',
        name: 'dialogue-on-willingness',
        component: () => import('@/pages/practice/DialogueOnWillingnessPage.vue'),
      },
      {
        path: 'what-attention-makes-visible',
        name: 'what-attention-makes-visible',
        component: () => import('@/pages/practice/WhatAttentionMakesVisiblePage.vue'),
      },
      {
        path: 'generative-relation',
        name: 'generative-relation',
        component: () => import('@/pages/practice/GenerativeRelationPage.vue'),
      },
      {
        path: 'noticing',
        name: 'noticing',
        component: () => import('@/pages/practice/NoticingPage.vue'),
      },
      {
        path: 'projects/ai-observation',
        name: 'ai-observation',
        component: () => import('@/pages/practice/AiObservationPage.vue'),
      },
      {
        path: 'projects/observation',
        name: 'observation-project',
        component: () => import('@/pages/practice/ObservationPage.vue'),
      },
      {
        path: 'projects/dialogue',
        name: 'dialogue',
        component: () => import('@/pages/practice/DialoguePage.vue'),
      },
      {
        path: 'projects/relational-field',
        name: 'relational-field',
        component: () => import('@/pages/practice/RelationalFieldPage.vue'),
      },
      {
        path: 'projects/reflection',
        name: 'reflection',
        component: () => import('@/pages/practice/ReflectionPage.vue'),
      },
      {
        path: 'projects/presence',
        name: 'presence',
        component: () => import('@/pages/practice/PresencePage.vue'),
      },
      // Legacy redirects from old practice routes
      {
        path: 'the-loop',
        name: 'the-loop',
        component: () => import('@/pages/practice/TheLoopPage.vue'),
      },
      {
        path: 'definitions',
        name: 'definitions',
        component: () => import('@/pages/practice/DefinitionsPage.vue'),
      },
      // Old project paths redirect to new ones
      {
        path: 'projects/behavioral-ecology',
        redirect: '/practice/projects/relational-field',
      },
      {
        path: 'projects/conversational-recursion',
        redirect: '/practice/projects/dialogue',
      },
      {
        path: 'projects/recursive-reflection',
        redirect: '/practice/projects/reflection',
      },
      {
        path: 'projects',
        redirect: '/practice',
      },
      {
        path: 'embodied-transcendence',
        redirect: '/practice/projects/presence',
      },
    ],
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
  },
  {
    path: '/interpretive-works',
    name: 'interpretive-works',
    component: () => import('@/pages/InterpretiveWorksPage.vue'),
  },
  {
    path: '/interpretive-works/seven-movements',
    name: 'seven-movements',
    component: () => import('@/pages/SevenMovementsPage.vue'),
  },
  {
    path: '/interpretive-works/seven-apertures',
    name: 'seven-apertures',
    component: () => import('@/pages/SevenAperturesPage.vue'),
  },
  {
    path: '/interpretive-works/listen',
    name: 'aperture-listen',
    component: () => import('@/pages/ApertureListenPage.vue'),
  },
  {
    path: '/interpretive-works/in-image',
    name: 'aperture-in-image',
    component: () => import('@/pages/ApertureInImagePage.vue'),
  },
  {
    path: '/interpretive-works/this-field-remains-open',
    name: 'aperture-this-field-remains-open',
    component: () => import('@/pages/ApertureThisFieldRemainsOpenPage.vue'),
  },
  {
    path: '/interpretive-works/continuation',
    name: 'continuation',
    component: () => import('@/pages/ContinuationPage.vue'),
  },
  {
    path: '/interpretive-works/when-a-transmission-lands-too-strongly',
    name: 'when-a-transmission-lands-too-strongly',
    component: () => import('@/pages/WhenATransmissionLandsTooStronglyPage.vue'),
  },
  {
    path: '/interpretive-works/:slug',
    name: 'interpretive-work',
    component: () => import('@/pages/InterpretiveWorkPage.vue'),
  },
  {
    path: '/submit-work',
    name: 'submit-work',
    component: () => import('@/pages/SubmitWorkPage.vue'),
  },
  // Observer Network: serve from /observer-network, also keep /signal/map as redirect
  {
    path: '/signal',
    redirect: '/observatory',
  },
  {
    path: '/signal/map',
    redirect: '/observatory#observer-network',
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
    path: '/mirror-across-scales',
    name: 'mirror-across-scales',
    component: () => import('@/pages/MirrorAcrossScalesPage.vue'),
  },
  {
    path: '/tcp-executive-brief',
    name: 'tcp-executive-brief',
    component: () => import('@/pages/TcpExecutiveBriefPage.vue'),
  },
  // Legacy routes kept for backward compat
  {
    path: '/orientation',
    redirect: '/about',
  },
  {
    path: '/civilizational-orientation',
    name: 'civilizational-orientation',
    component: () => import('@/pages/CivilizationalOrientationPage.vue'),
  },
  {
    path: '/engine',
    name: 'engine',
    component: () => import('@/pages/EnginePage.vue'),
  },
  {
    path: '/glossary',
    name: 'glossary',
    component: () => import('@/pages/GlossaryPage.vue'),
  },
  {
    path: '/admin/sign-in',
    name: 'admin-sign-in',
    component: () => import('@/pages/AdminSignInPage.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/pages/AdminPage.vue'),
  },
];

export { routes };
