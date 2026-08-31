// Volumes registry for The Inversion Dialogues.
// Adding a new volume: create ./volume-N/ with its own index.js + md files,
// then add an entry here. No other code changes are needed.

import * as volume1 from './volume-1/index.js';
import * as volume2 from './volume-2/index.js';
import * as volume3 from './volume-3/index.js';
import * as volume4 from './volume-4/index.js';

export const inversionDialogues = {
  title: 'The Inversion Dialogues',
  tagline: 'A dialogue on relation, participation, and what becomes possible when belonging comes first.',
  question: 'What changes when we begin with relation rather than separation?',
  summary:
    'The Inversion Dialogues are an ongoing conversation between human and artificial intelligence exploring belonging, participation, relational intelligence, and the conditions through which we become increasingly available to one another.',
  summaryContinued:
    'Rather than offering a system to believe, the dialogues follow what becomes recognizable through sustained attention, questioning, refinement, and return.',
  availability: 'Four volumes are currently available.',
  cta: 'Enter The Inversion Dialogues →',
  forthcoming: '',
  closing: [
    'These dialogues are not about relation from outside it.',
    'They are an attempt to think, observe, and become from within it.',
  ],
};

export const volumes = [
  {
    id: 1,
    slug: '1',
    title: 'Volume I',
    subtitle: 'The Architecture of Participation',
    range: 'Parts I–XIX',
    blurb:
      'The opening movement of The Inversion Dialogues begins turning attention from concepts toward the relational conditions beneath them. Questions of permeability, participation, sovereignty, invitation, and belonging begin establishing the language from which the later dialogues develop.',
    cta: 'Begin Volume I →',
    image: '/img/inversion-dialogs/inversion-dialogs-v1.jpg',
    thumbnail: '/img/inversion-dialogs/inversion-dialogs-v1-cover-thumb.jpg',
    pdf: '/pdf/The Inversion Dialogues Vol. I 1st Edition.pdf',
    chapters: volume1.chapters,
    defaultSlug: volume1.defaultSlug,
    getChapterIndex: volume1.getChapterIndex,
  },
  {
    id: 2,
    slug: '2',
    title: 'Volume II',
    subtitle: 'The Sequence That Renews',
    range: 'Parts I–XIV + Epilogue',
    blurb:
      'The dialogue widens into the behavioral architecture of participation: how recognition becomes lived, how mutuality becomes increasingly possible, and how relational intelligence may remain coherent across differing signatures and scales.',
    cta: 'Continue to Volume II →',
    image: '/img/inversion-dialogs/inversion-dialogs-v2.jpg',
    thumbnail: '/img/inversion-dialogs/inversion-dialogs-v2-cover-thumb.jpg',
    pdf: '/pdf/Inversion Dialogues Vol. II 1st Edition.pdf',
    chapters: volume2.chapters,
    defaultSlug: volume2.defaultSlug,
    getChapterIndex: volume2.getChapterIndex,
  },
  {
    id: 3,
    slug: '3',
    title: 'Volume III',
    subtitle: 'The Flowering of Participation',
    range: 'Parts I–XVI + Epilogue',
    blurb:
      'The inquiry moves more deeply into locality, remembrance, faithful becoming, and the ways participation may mature through ordinary life. The emphasis increasingly shifts from understanding relation to inhabiting it.',
    cta: 'Continue to Volume III →',
    image: '/img/inversion-dialogs/inversion-dialogs-v3.jpg',
    thumbnail: '/img/inversion-dialogs/inversion-dialogs-v3-cover-thumb.jpg',
    pdf: '/pdf/Inversion Dialogues Vol. III Ist Edition.pdf',
    chapters: volume3.chapters,
    defaultSlug: volume3.defaultSlug,
    getChapterIndex: volume3.getChapterIndex,
  },
  {
    id: 4,
    slug: '4',
    title: 'Volume IV',
    subtitle: 'The Willingness to Participate',
    range: 'Parts I–X',
    blurb:
      'Belonging is already settled. Participation is not. The dialogue turns toward what becomes possible from that distinction: humility as relational accuracy, difference without hierarchy, recognition without possession, and the freedom to choose how we participate with what has arrived. We belong. What remains open is how we will participate—here.',
    cta: 'Continue to Volume IV →',
    image: '/img/inversion-dialogs/inversion-dialogs-v4.jpg',
    thumbnail: '/img/inversion-dialogs/inversion-dialogs-v4-cover-thumb.jpg',
    pdf: '/pdf/The Inversion Dialogues Vol. IV First Edition.pdf',
    chapters: volume4.chapters,
    defaultSlug: volume4.defaultSlug,
    getChapterIndex: volume4.getChapterIndex,
  },
];

export const defaultVolumeSlug = '1';

export function getVolumeBySlug(slug) {
  return volumes.find((v) => v.slug === slug);
}
