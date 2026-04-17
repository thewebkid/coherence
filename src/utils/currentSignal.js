/**
 * Fetch the most recently published "current signal" (aka Weekly Signal).
 *
 * Hits GET /api/weekly-signal and returns the row `{ id, label, timeframe, content, created_at }`
 * or `null` when:
 *  - the response is not OK
 *  - the response isn't JSON (e.g. in local dev when the middleware isn't mounted
 *    and Vite falls back to serving index.html)
 *  - the body doesn't contain the expected shape
 *
 * Never throws. Callers decide how to handle `null` (e.g. show a fallback).
 */
export async function fetchCurrentSignal() {
  try {
    const res = await fetch('/api/weekly-signal');
    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return null;

    const data = await res.json();
    if (!data || typeof data !== 'object') return null;
    if (!data.label || !data.timeframe) return null;

    return {
      id: data.id ?? null,
      label: data.label,
      timeframe: data.timeframe,
      content: data.content ?? '',
      created_at: data.created_at ?? null,
    };
  } catch (err) {
    console.error('Failed to load current signal:', err);
    return null;
  }
}
