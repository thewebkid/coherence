import frontMatterRaw from '../7Apertures/7a.md?raw';
import beforeAperturesRaw from '../7Apertures/before-the-apertures.md?raw';
import aperture1Raw from '../7Apertures/aperture-1.md?raw';
import aperture2Raw from '../7Apertures/aperture-II.md?raw';
import aperture3Raw from '../7Apertures/aperture-III.md?raw';
import aperture4Raw from '../7Apertures/aperture-IV.md?raw';
import aperture5Raw from '../7Apertures/aperture-V.md?raw';
import aperture6Raw from '../7Apertures/aperture-VI.md?raw';
import aperture7Raw from '../7Apertures/aperture-VII.md?raw';

// Fix image paths: relative markdown paths → absolute public paths
// Also ensure --- separators have blank lines so marked parses them as <hr> not setext headings
const frontMatter = frontMatterRaw
  .replace(/\.\.\/\.\.\/\.\.\/public\/img\/7a\//g, '/img/7a/')
  .replace(/([^\n])\n---/g, '$1\n\n---');

export const chapters = [
  {
    title: 'Seven Apertures',
    subtitle: 'First Edition — 2026',
    content: frontMatter,
  },
  {
    title: 'Before the Apertures',
    subtitle: null,
    content: beforeAperturesRaw,
  },
  {
    title: 'Aperture I — Permeability',
    subtitle: 'Behavior is the headwaters of coherence.',
    content: aperture1Raw,
    diagram: 'permeability',
  },
  {
    title: 'Aperture II — Willingness',
    subtitle: null,
    content: aperture2Raw,
  },
  {
    title: 'Aperture III — Transmissibility',
    subtitle: null,
    content: aperture3Raw,
  },
  {
    title: 'Aperture IV — Participation',
    subtitle: null,
    content: aperture4Raw,
  },
  {
    title: 'Aperture V — Noticing',
    subtitle: null,
    content: aperture5Raw,
  },
  {
    title: 'Aperture VI — Tenderness',
    subtitle: null,
    content: aperture6Raw,
  },
  {
    title: 'Aperture VII — Apertural',
    subtitle: null,
    content: aperture7Raw,
  },
];
