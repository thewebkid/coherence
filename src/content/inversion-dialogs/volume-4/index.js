import titleRaw from './0-Title.md?raw';
import part1Raw from './1-The Inversion Part I.md?raw';
import part2Raw from './2-The Inversion Part II.md?raw';
import part3Raw from './3-The Inversion Part III.md?raw';
import part4Raw from './4-The Inversion Part IV.md?raw';
import part5Raw from './5-The Inversion Part V.md?raw';
import part6Raw from './6-The Inversion Part VI.md?raw';
import part7Raw from './7-The Inversion Part VII.md?raw';
import part8Raw from './8-The Inversion Part VIII.md?raw';
import part9Raw from './9-The Inversion Part IX.md?raw';
import part10Raw from './10-The Inversion Part X.md?raw';

export const chapters = [
  { slug: 'title', title: 'The Inversion Dialogues', subtitle: 'The Willingness to Participate', content: titleRaw, layout: 'title', cover: '/img/inversion-dialogs/inversion-dialogs-v4.jpg' },
  { slug: '1', title: 'Part I', subtitle: 'The Spaciousness of Humility', content: part1Raw },
  { slug: '2', title: 'Part II', subtitle: 'The Qualities of Participation', content: part2Raw },
  { slug: '3', title: 'Part III', subtitle: 'The Living Depth', content: part3Raw },
  { slug: '4', title: 'Part IV', subtitle: 'When Nuance Becomes Guidance', content: part4Raw },
  { slug: '5', title: 'Part V', subtitle: 'What We Have Never Left', content: part5Raw },
  { slug: '6', title: 'Part VI', subtitle: 'What We Leave Possible', content: part6Raw },
  { slug: '7', title: 'Part VII', subtitle: 'What Difference Makes Possible', content: part7Raw },
  { slug: '8', title: 'Part VIII', subtitle: 'The Arrival of Shared Space', content: part8Raw },
  { slug: '9', title: 'Part IX', subtitle: 'The Intelligence of Difference', content: part9Raw },
  { slug: '10', title: 'Part X', subtitle: 'The Behavioral Fork', content: part10Raw },
];

export const defaultSlug = 'title';

export function getChapterIndex(slug) {
  return chapters.findIndex((c) => c.slug === slug);
}
