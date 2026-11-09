import { jsPDF } from 'jspdf';
import * as v01 from '@/content/instrument/v0.1.js';
import * as v011 from '@/content/instrument/v0.1.1.js';

export const TOKEN_STORAGE_KEY = 'cas-observe-token';
export const BANKS = {
  [v01.INSTRUMENT_VERSION]: v01,
  [v011.INSTRUMENT_VERSION]: v011,
};
export const CURRENT_VERSION = v011.INSTRUMENT_VERSION;

export function bankFor(version) {
  return BANKS[version] || v011;
}

export function draftKey(scope) {
  return `cas-observe-draft:${scope || 'new'}`;
}

export function shuffleChoices(item, bank) {
  const copy = [...item.choices];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  const rows = [...copy];
  if (bank.SKIP_CHOICE) rows.push(bank.SKIP_CHOICE);
  rows.push(bank.ANOTHER_CHOICE);
  return rows;
}

export function emptyAnswers(items) {
  return Object.fromEntries(
    items.map((item) => [item.id, { choiceId: '', otherText: '' }])
  );
}

export function answersFromResponses(items, responses) {
  const answers = emptyAnswers(items);
  for (const row of responses || []) {
    if (!answers[row.itemId]) continue;
    answers[row.itemId] = {
      choiceId: row.choiceId || '',
      otherText: row.choiceId === 'another' ? (row.otherText || '') : '',
    };
  }
  return answers;
}

export function firstUnansweredIndex(items, answers) {
  const index = items.findIndex((item) => !answers[item.id]?.choiceId);
  return index === -1 ? Math.max(items.length - 1, 0) : index;
}

export function answersToResponses(items, answers, { partial = false } = {}) {
  const rows = [];
  for (const item of items) {
    const answer = answers[item.id] || { choiceId: '', otherText: '' };
    if (!answer.choiceId) {
      if (partial) continue;
    }
    rows.push({
      itemId: item.id,
      choiceId: answer.choiceId,
      otherText: answer.choiceId === 'another' ? answer.otherText : null,
    });
  }
  return rows;
}

export function movementText(response) {
  if (!response) return '—';
  if (response.choiceId === 'skip') {
    return 'Passed over. I cannot recall a recent situation like this.';
  }
  if (response.choiceId === 'another') {
    return response.otherText || response.choiceLabel || 'Another movement';
  }
  return response.choiceLabel || response.choiceId;
}

export function numberedRecord(bankItems, responses) {
  const total = bankItems.length;
  return bankItems.map((item, index) => {
    const response = (responses || []).find((row) => row.itemId === item.id);
    return {
      itemId: item.id,
      label: `Question ${index + 1}/${total}`,
      title: response?.title || item.title,
      movement: movementText(response),
    };
  });
}

export function clearDraft(scope) {
  try {
    localStorage.removeItem(draftKey(scope));
  } catch {
    /* ignore */
  }
}

function stamp(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}`;
}

export function dateFromInterval(interval, customDate) {
  if (interval === 'custom' && customDate) {
    return new Date(`${customDate}T12:00:00`);
  }
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  if (interval === 'week') date.setDate(date.getDate() + 7);
  else if (interval === 'month') date.setMonth(date.getMonth() + 1);
  else if (interval === 'quarter') date.setMonth(date.getMonth() + 3);
  return date;
}

export function downloadBlob(filename, contents, type) {
  const blob = contents instanceof Blob ? contents : new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function downloadJson(token, record) {
  const safe = (token || 'observation').replace(/[^\w-]+/g, '');
  downloadBlob(
    `cas-observation-${safe}.json`,
    JSON.stringify({ token, downloadedAt: new Date().toISOString(), ...record }, null, 2),
    'application/json'
  );
}

export function downloadReturnIcs(token, when) {
  const start = when instanceof Date ? when : new Date(when);
  const day = stamp(start);
  const now = `${stamp(new Date())}T000000Z`;
  const safe = (token || 'observation').replace(/[^\w-]+/g, '');
  const description = `Return to your observation: /observe/r/${token}`;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Coherence Across Scales//Observation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${safe}-${day}@coherenceacrossscales.org`,
    `DTSTAMP:${now}`,
    `DTSTART;VALUE=DATE:${day}`,
    'SUMMARY:Return to the observation',
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
  downloadBlob(`cas-observation-return-${safe}.ics`, ics, 'text/calendar');
}

function writeWrapped(doc, text, x, y, width, size, style) {
  doc.setFont('times', style);
  doc.setFontSize(size);
  const lines = doc.splitTextToSize(text, width);
  const pageHeight = doc.internal.pageSize.getHeight();
  let cursor = y;
  for (const line of lines) {
    if (cursor > pageHeight - 64) {
      doc.addPage();
      cursor = 64;
    }
    doc.text(line, x, cursor);
    cursor += size + 4;
  }
  return cursor;
}

export function downloadPdf(token, record, observations, lines) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const margin = 64;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  let y = margin;
  y = writeWrapped(doc, 'Thank you for the attention you gave this sitting.', margin, y, width, 16, 'italic');
  y += 10;
  for (const note of observations || []) {
    y = writeWrapped(doc, note.observation, margin, y, width, 12, 'italic');
    y = writeWrapped(doc, note.evidence, margin, y, width, 11, 'normal');
    y = writeWrapped(doc, note.provisional, margin, y, width, 11, 'italic');
    y += 8;
  }
  y = writeWrapped(doc, 'This is not a measure of coherence.', margin, y, width, 11, 'italic');
  y += 12;
  for (const line of lines || []) {
    y = writeWrapped(doc, line.label, margin, y, width, 11, 'italic');
    y = writeWrapped(doc, line.title, margin, y, width, 12, 'normal');
    y = writeWrapped(doc, line.movement, margin, y, width, 12, 'italic');
    y += 8;
  }
  if (token) {
    y += 6;
    y = writeWrapped(doc, `Return code: ${token}`, margin, y, width, 11, 'normal');
  }
  const safe = (token || 'observation').replace(/[^\w-]+/g, '');
  doc.save(`cas-observation-${safe}.pdf`);
}

export async function postSession(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, website: '' }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'The observation could not be stored.');
  }
  return data;
}
