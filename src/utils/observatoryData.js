import { reactive } from 'vue';
import { fetchCurrentSignal } from './currentSignal';

const MIN_FLOOR = 3;
const WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

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

function processSignalsForWordCloud(rows) {
  if (!rows?.length) return [];

  const now = Date.now();
  const minFont = 18;
  const maxFont = 42;

  let entries = rows.flatMap(item => {
    const signal = item.signal.toLowerCase().trim();
    const t = now - new Date(item.created_at).getTime();

    if (signal.includes(',')) {
      return signal.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => ({ signal: s, t }));
    }
    return { signal, t };
  });

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
 * Aggregate word cloud — all observations, no project filter.
 * Call inside computed() to stay reactive to store updates.
 */
export function getAllWords() {
  return processSignalsForWordCloud(observatoryState.allObservations);
}

/**
 * Per-project word cloud with hybrid windowing:
 * prefer last 7 days; backfill to MIN_FLOOR if sparse.
 * Call inside computed() to stay reactive.
 */
export function getWordsForProject(project) {
  const rows = observatoryState.allObservations.filter(r => r.project === project);
  const cutoff = Date.now() - WINDOW_MS;
  const recent = rows.filter(r => new Date(r.created_at).getTime() >= cutoff);

  const working = recent.length >= MIN_FLOOR ? recent : rows.slice(0, MIN_FLOOR);
  return processSignalsForWordCloud(working);
}

/**
 * Per-project rolling feed — most recent reflections.
 * Call inside computed() to stay reactive.
 */
export function getFeedForProject(project) {
  return observatoryState.allObservations
    .filter(r => r.project === project && r.reflection)
    .slice(0, 5)
    .map(r => r.reflection);
}

/**
 * Aggregate rolling feed for the Observatory page — all projects, most recent.
 * Call inside computed() to stay reactive.
 */
export function getAllFeed() {
  return observatoryState.allObservations
    .filter(r => r.reflection)
    .slice(0, 20)
    .map(r => r.reflection);
}
