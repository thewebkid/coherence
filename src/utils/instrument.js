import { ANOTHER_CHOICE_ID, items } from '@/content/instrument/v0.1.js';

export const TOKEN_STORAGE_KEY = 'cas-observe-token';

export function shuffleChoices(item) {
  const copy = [...item.choices];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return [
    ...copy,
    { id: ANOTHER_CHOICE_ID, label: 'Another movement' },
  ];
}

export function emptyAnswers() {
  return Object.fromEntries(
    items.map((item) => [item.id, { choiceId: '', otherText: '' }])
  );
}

export function answersToResponses(answers) {
  return items.map((item) => ({
    itemId: item.id,
    choiceId: answers[item.id].choiceId,
    otherText: answers[item.id].choiceId === ANOTHER_CHOICE_ID
      ? answers[item.id].otherText
      : null,
  }));
}

export function formatObservationText(token, record) {
  const lines = [
    'CAS Observation Instrument — a record of recognized movement',
    'This is not a measure of coherence.',
    '',
    token ? `Return code: ${token}` : '',
    `Instrument version: ${record.instrumentVersion || 'v0.1'}`,
    '',
  ].filter((line, i, arr) => line !== '' || arr[i - 1] !== '');

  for (const session of record.sessions || []) {
    lines.push(`Sitting ${session.sessionIndex}${session.completedAt ? ` — ${session.completedAt}` : ''}`);
    lines.push('');
    for (const response of session.responses || []) {
      lines.push(response.title);
      lines.push(`You recognized: ${response.choiceLabel}`);
      if (response.otherText && response.choiceId === ANOTHER_CHOICE_ID) {
        lines.push(response.otherText);
      }
      lines.push('');
    }
  }

  if (record.whatFollowed?.length) {
    lines.push('What followed (looking back)');
    lines.push('');
    for (const followed of record.whatFollowed) {
      lines.push(followed.title);
      lines.push(followed.choiceLabel);
      if (followed.note) lines.push(followed.note);
      lines.push('');
    }
  }

  lines.push('Taking this record into a conversation — with a person, or with an AI — is yours. It is not part of this instrument.');
  return lines.join('\n');
}

export function downloadBlob(filename, contents, type) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function downloadObservation(token, record) {
  const safe = (token || 'observation').replace(/[^\w-]+/g, '');
  downloadBlob(
    `cas-observation-${safe}.json`,
    JSON.stringify({ token, downloadedAt: new Date().toISOString(), ...record }, null, 2),
    'application/json'
  );
  downloadBlob(
    `cas-observation-${safe}.txt`,
    formatObservationText(token, record),
    'text/plain;charset=utf-8'
  );
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
