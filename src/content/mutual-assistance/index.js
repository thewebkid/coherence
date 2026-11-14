import * as bookletChapters from './booklet/index.js';
import * as manuscriptChapters from './manuscript/index.js';

export const booklet = {
  key: 'booklet',
  base: '/mutual-assistance/booklet',
  title: 'The Practice of Mutual Assistance',
  subtitle: 'An Invitation to Relational Practice',
  panelTitle: 'The Booklet',
  pdfHref: '/pdf/The Practice of Mutual Assistance (Booklet).pdf',
  pdfLabel: 'Download Booklet (PDF)',
  description: 'A brief invitation into the Practice of Mutual Assistance. Begin with a simple orientation, bring it into an actual relationship, and notice what becomes available for discernment, participation, consequence, and Return.',
  shortDescription: 'A brief invitation into the Practice of Mutual Assistance.',
  chapters: bookletChapters.chapters,
  defaultSlug: bookletChapters.defaultSlug,
  getChapterIndex: bookletChapters.getChapterIndex,
  slugForLegacy: bookletChapters.slugForLegacy,
};

export const manuscript = {
  key: 'manuscript',
  base: '/mutual-assistance/manuscript',
  title: 'The Practice of Mutual Assistance',
  subtitle: 'A Relational Ecology for a More Inhabitable World',
  panelTitle: 'The Full Manuscript',
  pdfHref: '/pdf/The Practice of Mutual Assistance.pdf',
  pdfLabel: 'Download Full Manuscript (PDF)',
  description: 'A deeper exploration of the relational architecture beneath Mutual Assistance: sovereignty, difference, consequence, continuity, correspondence, Return, behavioral wisdom, and the widening from differentiated participants toward mutual locality.',
  shortDescription: 'A deeper exploration of the relational architecture beneath Mutual Assistance.',
  chapters: manuscriptChapters.chapters,
  defaultSlug: manuscriptChapters.defaultSlug,
  getChapterIndex: manuscriptChapters.getChapterIndex,
  slugForLegacy: manuscriptChapters.slugForLegacy,
};

export const readers = { booklet, manuscript };
