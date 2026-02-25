// Content loading utilities using Vite's import.meta.glob

// Paper/Manuscript content
const paperModules = import.meta.glob('/src/content/paper/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Deck slides content
const deckModules = import.meta.glob('/src/content/deck/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Practice slides content
const practiceModules = import.meta.glob('/src/content/practice/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Handbook content
const handbookModules = import.meta.glob('/src/content/handbook/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Helper to sort by filename
function sortByFilename(a, b) {
  const nameA = a.path.split('/').pop();
  const nameB = b.path.split('/').pop();
  return nameA.localeCompare(nameB);
}

// Paper sections with metadata
export function getPaperSections() {
  const sections = Object.entries(paperModules)
    .filter(([path]) => !path.includes('00-table-of-contents'))
    .map(([path, content]) => {
      const filename = path.split('/').pop().replace('.md', '');
      const lines = content.split('\n');
      let title = filename;
      let subtitle = '';

      // Extract title from first heading
      for (const line of lines) {
        if (line.startsWith('## ')) {
          title = line.replace('## ', '').trim();
          break;
        }
        if (line.startsWith('# ')) {
          title = line.replace('# ', '').trim();
          break;
        }
      }

      // Extract subtitle from italic line
      for (const line of lines) {
        if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
          subtitle = line.replace(/^\*|\*$/g, '').trim();
          break;
        }
      }

      return { path, content, filename, title, subtitle };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename));

  return sections;
}

// Deck slides
export function getDeckSlides() {
  const slides = Object.entries(deckModules)
    .map(([path, content]) => {
      const filename = path.split('/').pop().replace('.md', '');
      return { path, content, filename };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename))
    .map(s => s.content);

  return slides;
}

// Practice slides
export function getPracticeSlides() {
  const slides = Object.entries(practiceModules)
    .map(([path, content]) => {
      const filename = path.split('/').pop().replace('.md', '');
      return { path, content, filename };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename))
    .map(s => s.content);

  return slides;
}

// Handbook sections with metadata
export function getHandbookSections() {
  const sections = Object.entries(handbookModules)
    .filter(([path]) => !path.includes('00-table-of-contents') && !path.includes('title.md'))
    .map(([path, content]) => {
      const filename = path.split('/').pop().replace('.md', '');
      const lines = content.split('\n');
      let title = filename;
      let subtitle = '';

      // Extract title from first heading
      for (const line of lines) {
        if (line.startsWith('## ')) {
          title = line.replace('## ', '').trim();
          break;
        }
        if (line.startsWith('# ')) {
          title = line.replace('# ', '').trim();
          break;
        }
      }

      // Extract subtitle from italic line after title
      let foundTitle = false;
      for (const line of lines) {
        if (line.startsWith('## ') || line.startsWith('# ')) {
          foundTitle = true;
          continue;
        }
        if (foundTitle && line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
          subtitle = line.replace(/^\*|\*$/g, '').trim();
          break;
        }
      }

      return { path, content, filename, title, subtitle };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename));

  return sections;
}
