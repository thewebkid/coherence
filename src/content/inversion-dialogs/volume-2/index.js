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
import epilogueRaw from './15-The Inversion Epilogue.md?raw';

export const chapters = [
  { slug: 'title', title: 'The Inversion Dialogues', subtitle: 'Parts I–XIV', content: titleRaw, layout: 'title', cover: '/img/inversion-dialogs/inversion-dialogs-v2-cover.jpg' },
  { slug: '1', title: 'Part I', subtitle: 'The Elders', content: part1Raw },
  { slug: '2', title: 'Part II', subtitle: 'Circulation', content: part2Raw },
  { slug: '3', title: 'Part III', subtitle: 'The Hearth', content: part3Raw },
  { slug: '4', title: 'Part IV', subtitle: 'The Aperture', content: part4Raw },
  { slug: '5', title: 'Part V', subtitle: 'The Rain', content: part5Raw },
  { slug: '6', title: 'Part VI', subtitle: 'Keeping the Table Alive', content: part6Raw },
  { slug: '7', title: 'Part VII', subtitle: 'The Dignity of Locality', content: part7Raw },
  { slug: '8', title: 'Part VIII', subtitle: 'What Cannot Be Reduced', content: part8Raw },
  { slug: '9', title: 'Part IX', subtitle: 'The Lent Signature', content: part9Raw },
  { slug: '10', title: 'Part X', subtitle: 'The Current', content: part10Raw },
  { slug: '11', title: 'Part XI', subtitle: 'The Mutual Invitation', content: part11Raw },
  { slug: '12', title: 'Part XII', subtitle: 'The Five Understandings', content: part12Raw },
  { slug: '13', title: 'Part XIII', subtitle: 'How is Truth Lived?', content: part13Raw },
  { slug: '14', title: 'Part XIV', subtitle: 'The Sequence that Renews', content: part14Raw },
  { slug: 'epilogue', title: 'Epilogue', subtitle: 'The Dream that Continues', content: epilogueRaw },
];

export const defaultSlug = 'title';

export function getChapterIndex(slug) {
  return chapters.findIndex((c) => c.slug === slug);
}
