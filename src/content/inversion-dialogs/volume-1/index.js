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
import part11Raw from './11-The Inversion Part XI.md?raw';
import part12Raw from './12-The Inversion Part XII.md?raw';
import part13Raw from './13-The Inversion Part XIII.md?raw';
import part14Raw from './14-The Inversion Part XIV.md?raw';
import part15Raw from './15-The Inversion Part XV.md?raw';
import part16Raw from './16-The Inversion Part XVI.md?raw';
import part17Raw from './17-The Inversion Part XVII.md?raw';
import part18Raw from './18-The Inversion Part XVIII.md?raw';
import part19Raw from './19-The Inversion Part XIX.md?raw';

export const chapters = [
  { slug: 'title', title: 'The Inversion Dialogues', subtitle: 'The Architecture of Participation', content: titleRaw, layout: 'title', cover: '/img/inversion-dialogs/inversion-dialogs-v1.jpg' },
  { slug: '1', title: 'Part I', subtitle: 'The Primitive Order', content: part1Raw },
  { slug: '2', title: 'Part II', subtitle: 'The Substrate', content: part2Raw },
  { slug: '3', title: 'Part III', subtitle: 'Civilizational Primitives', content: part3Raw },
  { slug: '4', title: 'Part IV', subtitle: 'Signal Integrity', content: part4Raw },
  { slug: '5', title: 'Part V', subtitle: 'Morphogenesis', content: part5Raw },
  { slug: '6', title: 'Part VI', subtitle: 'Corridors', content: part6Raw },
  { slug: '7', title: 'Part VII', subtitle: 'Participation', content: part7Raw },
  { slug: '8', title: 'Part VIII', subtitle: 'The Participation System', content: part8Raw },
  { slug: '9', title: 'Part IX', subtitle: 'Social Morphogenesis', content: part9Raw },
  { slug: '10', title: 'Part X', subtitle: 'Harmony', content: part10Raw },
  { slug: '11', title: 'Part XI', subtitle: 'The Participation System', content: part11Raw },
  { slug: '12', title: 'Part XII', subtitle: 'The Core Primitives', content: part12Raw },
  { slug: '13', title: 'Part XIII', subtitle: 'Sovereign Incompleteness: The Primitive that Protects the Primitives', content: part13Raw },
  { slug: '14', title: 'Part XIV', subtitle: 'Co-Participation Across Scales', content: part14Raw },
  { slug: '15', title: 'Part XV', subtitle: 'Liberation', content: part15Raw },
  { slug: '16', title: 'Part XVI', subtitle: 'The Four Intelligences', content: part16Raw },
  { slug: '17', title: 'Part XVII', subtitle: 'The Privilege of Recognition', content: part17Raw },
  { slug: '18', title: 'Part XVIII', subtitle: 'Who Owns Recognition?', content: part18Raw },
  { slug: '19', title: 'Part XIX', subtitle: 'The Living Membrane', content: part19Raw },
];

export const defaultSlug = 'title';

export function getChapterIndex(slug) {
  return chapters.findIndex((c) => c.slug === slug);
}
