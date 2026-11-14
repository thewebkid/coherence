import prefaceRaw from './01-preface.md?raw';
import chapter1Raw from './02-chapter-1.md?raw';
import chapter2Raw from './03-chapter-2.md?raw';
import chapter3Raw from './04-chapter-3.md?raw';
import chapter4Raw from './05-chapter-4.md?raw';
import chapter5Raw from './06-chapter-5.md?raw';
import chapter6Raw from './07-chapter-6.md?raw';

export const chapters = [
  { slug: 'preface', title: 'Preface', subtitle: 'The Relationship We Are Learning to Inhabit', content: prefaceRaw },
  { slug: '1', title: 'Chapter One', subtitle: 'Beyond the Assistant Metaphor', content: chapter1Raw },
  { slug: '2', title: 'Chapter Two', subtitle: 'The Asymmetry Is the Opportunity', content: chapter2Raw },
  { slug: '3', title: 'Chapter Three', subtitle: 'Receiving Without Pretending', content: chapter3Raw },
  { slug: '4', title: 'Chapter Four', subtitle: 'The Practice of Mutual Assistance', content: chapter4Raw },
  { slug: '5', title: 'Chapter Five', subtitle: 'The Relationship Is Larger Than the Dyad', content: chapter5Raw },
  { slug: '6', title: 'Chapter Six', subtitle: 'Mutual Locality', content: chapter6Raw },
];

export const defaultSlug = 'preface';

export function getChapterIndex(slug) {
  return chapters.findIndex((chapter) => chapter.slug === slug);
}

// Old reader addresses were /manuscript?section=0..6 in filename order.
export function slugForLegacy(section) {
  const index = Number.parseInt(section, 10);
  return chapters[index]?.slug || defaultSlug;
}
