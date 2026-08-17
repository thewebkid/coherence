// Volumes registry for The Inversion Dialogues.
// Adding a new volume: create ./volume-N/ with its own index.js + md files,
// then add an entry here. No other code changes are needed.

import * as volume1 from './volume-1/index.js';
import * as volume2 from './volume-2/index.js';
import * as volume3 from './volume-3/index.js';

export const volumes = [
  {
    id: 1,
    slug: '1',
    title: 'Volume I',
    subtitle: 'The Architecture of Participation',
    range: 'Parts I–XIX',
    image: '/img/inversion-dialogs/inversion-dialogs-v1-cover.jpg',
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
    image: '/img/inversion-dialogs/inversion-dialogs-v2-cover.jpg',
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
    image: '/img/inversion-dialogs/inversion-dialogs-v3-cover.jpg',
    chapters: volume3.chapters,
    defaultSlug: volume3.defaultSlug,
    getChapterIndex: volume3.getChapterIndex,
  },
];

export const defaultVolumeSlug = '1';

export function getVolumeBySlug(slug) {
  return volumes.find((v) => v.slug === slug);
}
