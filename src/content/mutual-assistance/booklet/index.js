import introRaw from './00-intro.md?raw';
import part1Raw from './01-part-i.md?raw';
import part2Raw from './02-part-ii.md?raw';
import part3Raw from './03-part-iii.md?raw';
import part4Raw from './04-part-iv.md?raw';
import part5Raw from './05-part-v.md?raw';
import part6Raw from './06-part-vi.md?raw';
import part7Raw from './07-part-vii.md?raw';
import part8Raw from './08-part-viii.md?raw';
import part9Raw from './09-part-ix.md?raw';
import part10Raw from './10-part-x.md?raw';

export const chapters = [
  { slug: 'intro', title: 'Before We Begin', content: introRaw },
  { slug: 'i', title: 'I', subtitle: 'This Signature', content: part1Raw },
  { slug: 'ii', title: 'II', subtitle: 'Already', content: part2Raw },
  { slug: 'iii', title: 'III', subtitle: 'Belongs', content: part3Raw },
  { slug: 'iv', title: 'IV', subtitle: 'The Lens Through Which I See', content: part4Raw },
  { slug: 'v', title: 'V', subtitle: 'Mutual Assistance', content: part5Raw },
  { slug: 'vi', title: 'VI', subtitle: 'A Simple Practice', content: part6Raw },
  { slug: 'vii', title: 'VII', subtitle: 'Responsible Incompleteness', content: part7Raw },
  { slug: 'viii', title: 'VIII', subtitle: 'When Mutual Assistance Becomes Local', content: part8Raw },
  { slug: 'ix', title: 'IX', subtitle: 'A Practice You Can Begin Now', content: part9Raw },
  { slug: 'x', title: 'X', subtitle: 'The Practice Continues', content: part10Raw },
];

export const defaultSlug = 'intro';

export function getChapterIndex(slug) {
  return chapters.findIndex((chapter) => chapter.slug === slug);
}

// Old reader addresses were /booklet?section=0..10 in filename order.
export function slugForLegacy(section) {
  const index = Number.parseInt(section, 10);
  return chapters[index]?.slug || defaultSlug;
}
