import wordsOfDrawings from './words-of-drawings.js';

export const works = [
  wordsOfDrawings,
];

export function getWorkBySlug(slug) {
  return works.find((w) => w.slug === slug) ?? null;
}
