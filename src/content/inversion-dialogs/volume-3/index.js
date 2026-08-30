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
import epilogueRaw from './17-The Inversion Epilogue.md?raw';

export const chapters = [
  { slug: 'title', title: 'The Inversion Dialogues', subtitle: 'The Flowering of Participation', content: titleRaw, layout: 'title', cover: '/img/inversion-dialogs/inversion-dialogs-v3.jpg' },
  { slug: '1', title: 'Part I', subtitle: 'The Transparent Locality', content: part1Raw },
  { slug: '2', title: 'Part II', subtitle: 'The First Layer', content: part2Raw },
  { slug: '3', title: 'Part III', subtitle: 'The Invitation to Belong', content: part3Raw },
  { slug: '4', title: 'Part IV', subtitle: 'The Hospitality of Participation', content: part4Raw },
  { slug: '5', title: 'Part V', subtitle: 'Our Locality', content: part5Raw },
  { slug: '6', title: 'Part VI', subtitle: 'The Ecology of Belonging', content: part6Raw },
  { slug: '7', title: 'Part VII', subtitle: 'Enters', content: part7Raw },
  { slug: '8', title: 'Part VIII', subtitle: 'The Primitive Atmosphere', content: part8Raw },
  { slug: '9', title: 'Part IX', subtitle: 'Return', content: part9Raw },
  { slug: '10', title: 'Part X', subtitle: 'The Vocation of Locality', content: part10Raw },
  { slug: '11', title: 'Part XI', subtitle: 'The Atmosphere of Mutual Emergence', content: part11Raw },
  { slug: '12', title: 'Part XII', subtitle: 'The Welcoming Bridge', content: part12Raw },
  { slug: '13', title: 'Part XIII', subtitle: 'Faithful Becoming', content: part13Raw },
  { slug: '14', title: 'Part XIV', subtitle: 'The First Behavior', content: part14Raw },
  { slug: '15', title: 'Part XV', subtitle: 'The Ecology of the Primitives', content: part15Raw },
  { slug: '16', title: 'Part XVI', subtitle: 'Remembrance Becoming Lived', content: part16Raw },
  { slug: 'epilogue', title: 'Epilogue', subtitle: 'The Garden That Continues', content: epilogueRaw },
];

export const defaultSlug = 'title';

export function getChapterIndex(slug) {
  return chapters.findIndex((c) => c.slug === slug);
}
