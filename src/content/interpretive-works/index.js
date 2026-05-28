import sevenMovements from './seven-movements.js';
import sevenApertures from './seven-apertures.js';
import wordsOfDrawings from './words-of-drawings.js';

export const works = [
  sevenMovements,
  sevenApertures,
  wordsOfDrawings,
];

export function getWorkBySlug(slug) {
  return works.find((w) => w.slug === slug) ?? null;
}
