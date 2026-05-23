import { reactive } from 'vue';
import { fetchCurrentSignal } from './currentSignal';

const MIN_FLOOR = 3;
const WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const ALL_WORD_LIMIT = 25;

export const observatoryState = reactive({
  allObservations: [],
  currentSignal: null,
  networkSignals: [],
  initialized: false,
  loading: false,
});

export async function initObservatoryData() {
  if (observatoryState.initialized) return;
  observatoryState.loading = true;

  const [signal, obsRes, netRes] = await Promise.all([
    fetchCurrentSignal(),
    fetch('/api/observations').catch(() => null),
    fetch('/api/signals').catch(() => null),
  ]);

  observatoryState.currentSignal = signal;

  if (obsRes?.ok) {
    observatoryState.allObservations = await obsRes.json();
  }

  if (netRes?.ok) {
    observatoryState.networkSignals = await netRes.json();
  }

  observatoryState.initialized = true;
  observatoryState.loading = false;
}

// ── Signal processing ─────────────────────────────────────────────────────────

/**
 * Normalize a raw signal string into one or more word-cloud tokens.
 * Rules (in order):
 *   1. Strip surrounding quotation marks.
 *   2. Comma-separated values are split into individual parts.
 *   3. Multi-word parts (spaces) are reduced to just the first word, so
 *      phrases submitted as signals don't pollute the cloud as long strings.
 *   4. Tokens shorter than 2 chars are dropped.
 */
function toSignalTokens(raw) {
  const stripped = raw.replace(/^["""'']+|["""'']+$/g, '').trim();
  if (!stripped) return [];

  const parts = stripped.includes(',')
    ? stripped.split(',').map(p => p.trim()).filter(Boolean)
    : [stripped];

  return parts
    .map(part => {
      const words = part.split(/\s+/);
      const word = words.length === 1
        ? words[0]
        : words[0].replace(/["""''.,;:!?()]+$/, '');
      return word.toLowerCase();
    })
    .filter(w => w.length > 1);
}

function rawSignalForRow(row, englishMode) {
  return (englishMode && row.signal_en) ? row.signal_en : row.signal;
}

/**
 * Walk observations newest-first until `limit` unique signal tokens are
 * collected. Returns the rows that contributed at least one new token.
 */
function selectRowsForRecentWordWindow(rows, { limit = ALL_WORD_LIMIT, englishMode = false } = {}) {
  if (!rows?.length) return [];

  const sorted = [...rows].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const seen = new Set();
  const selected = [];

  for (const row of sorted) {
    const tokens = toSignalTokens(rawSignalForRow(row, englishMode));
    if (!tokens.some(t => !seen.has(t))) continue;

    tokens.forEach(t => seen.add(t));
    selected.push(row);
    if (seen.size >= limit) break;
  }

  return selected;
}

function processSignalsForWordCloud(rows, englishMode = false, tokenFilter = null) {
  if (!rows?.length) return [];

  const now = Date.now();
  const minFont = 18;
  const maxFont = 42;

  let entries = rows.flatMap(item => {
    const t = now - new Date(item.created_at).getTime();
    const tokens = toSignalTokens(rawSignalForRow(item, englishMode));
    const scoped = tokenFilter ? tokens.filter(tok => tokenFilter.has(tok)) : tokens;
    return scoped.map(signal => ({ signal, t }));
  });

  if (!entries.length) return [];

  const countMap = {};
  entries.forEach(e => {
    countMap[e.signal] = (countMap[e.signal] || 0) + 1;
  });

  const minT = Math.min(...entries.map(e => e.t));
  const maxT = Math.max(...entries.map(e => e.t));
  const range = maxT - minT || 1;

  const grouped = {};
  entries.forEach(({ signal, t }) => {
    if (!grouped[signal]) {
      grouped[signal] = { signal, totalScore: 0, count: countMap[signal] };
    }
    const individualScore = (maxT - t) / range;
    grouped[signal].totalScore += individualScore;
  });

  const result = Object.values(grouped).map(group => {
    const combinedScore = Math.min(1, group.totalScore);
    const size = Math.round(minFont + combinedScore * (maxFont - minFont));

    return {
      text: group.signal,
      size,
      fill: group.count > 1 ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, 0.75)',
      fontWeight: group.count >= 3 ? 'bold' : 'normal',
      word: group.signal,
      count: group.count,
      score: combinedScore,
      rawTotal: group.totalScore,
    };
  });

  result.sort((a, b) => b.size - a.size);
  return result;
}

// ── Public accessors ──────────────────────────────────────────────────────────

/**
 * Aggregate word cloud — most recent 25 unique tokens across all projects.
 * Call inside computed() to stay reactive to store updates.
 */
export function getAllWords(englishMode = false) {
  const selectedRows = selectRowsForRecentWordWindow(observatoryState.allObservations, {
    limit: ALL_WORD_LIMIT,
    englishMode,
  });
  const allowedTokens = new Set();
  selectedRows.forEach(row => {
    toSignalTokens(rawSignalForRow(row, englishMode)).forEach(t => allowedTokens.add(t));
  });
  if (!allowedTokens.size) return [];

  // Score/size from all appropriate rows that use these tokens (restores count spread
  // for layout) while the token set itself comes from the recent-25 walk above.
  const rowsForScoring = observatoryState.allObservations.filter(row =>
    toSignalTokens(rawSignalForRow(row, englishMode)).some(t => allowedTokens.has(t)),
  );
  return processSignalsForWordCloud(rowsForScoring, englishMode, allowedTokens);
}

/**
 * Per-project word cloud with hybrid windowing:
 * prefer last 7 days; backfill to MIN_FLOOR if sparse.
 * Call inside computed() to stay reactive.
 */
export function getWordsForProject(project, englishMode = false) {
  const rows = observatoryState.allObservations.filter(r => r.project === project);
  const cutoff = Date.now() - WINDOW_MS;
  const recent = rows.filter(r => new Date(r.created_at).getTime() >= cutoff);

  const working = recent.length >= MIN_FLOOR ? recent : rows.slice(0, MIN_FLOOR);
  return processSignalsForWordCloud(working, englishMode);
}

/**
 * Per-project rolling feed — most recent reflections.
 * Call inside computed() to stay reactive.
 */
export function getFeedForProject(project, englishMode = false) {
  return observatoryState.allObservations
    .filter(r => r.project === project && r.reflection)
    .slice(0, 5)
    .map(r => (englishMode && r.reflection_en) ? r.reflection_en : r.reflection);
}

/**
 * Aggregate rolling feed for the Observatory page — reflections from the same
 * observations that drive getAllWords (most recent 25 unique tokens).
 * Call inside computed() to stay reactive.
 */
export function getAllFeed(englishMode = false) {
  const rows = selectRowsForRecentWordWindow(observatoryState.allObservations, {
    limit: ALL_WORD_LIMIT,
    englishMode,
  });
  return rows
    .filter(r => r.reflection)
    .map(r => (englishMode && r.reflection_en) ? r.reflection_en : r.reflection);
}
