/**
 * Deterministic pattern observations for a completed sitting.
 * Each result is { observation, evidence, provisional }.
 * Weak evidence is omitted. No scores, advice, or improvement language.
 */

const ANOTHER = 'another';
const SKIP = 'skip';

function isClosed(choiceId) {
  return choiceId && choiceId !== ANOTHER && choiceId !== SKIP;
}

/**
 * @param {Array<{ itemId: string, choiceId: string }>} responses
 * @param {{ priorResponses?: Array<{ itemId: string, choiceId: string }> | null }} [options]
 */
export function patternObservations(responses, options = {}) {
  const rows = Array.isArray(responses) ? responses : [];
  const total = rows.length;
  if (!total) return [];

  const notes = [];
  const writeIns = rows.filter((row) => row.choiceId === ANOTHER).length;
  if (writeIns >= 4) {
    notes.push({
      observation: 'Another movement was recognized on several conditions.',
      evidence: `Another movement was used on ${writeIns} of ${total} conditions.`,
      provisional: 'The listed movements did not cover every condition you recalled.',
    });
  }

  const skips = rows.filter((row) => row.choiceId === SKIP).length;
  if (skips >= 3) {
    notes.push({
      observation: 'Some conditions were passed over.',
      evidence: `You passed over ${skips} conditions.`,
      provisional: 'Those conditions may not have had a recent situation you could recall.',
    });
  }

  const closed = rows.filter((row) => isClosed(row.choiceId));
  if (closed.length >= 8) {
    const counts = new Map();
    for (const row of closed) {
      counts.set(row.choiceId, (counts.get(row.choiceId) || 0) + 1);
    }
    const highest = Math.max(...counts.values());
    const unique = counts.size;
    if (highest >= 6 && highest >= closed.length / 2) {
      notes.push({
        observation: 'One recognized movement recurred across closed choices.',
        evidence: `The same closed movement was recognized on ${highest} of ${closed.length} closed conditions.`,
        provisional: 'That recurrence is visible in this sitting. It is not a measure of the movement.',
      });
    } else if (unique >= Math.ceil(closed.length * 0.75) && highest <= 2) {
      notes.push({
        observation: 'The closed movements in this sitting were varied.',
        evidence: `${unique} different closed movements appear across ${closed.length} closed conditions.`,
        provisional: 'Variety here is a description of this sitting, not a direction to pursue.',
      });
    }
  }

  const prior = options.priorResponses;
  if (Array.isArray(prior) && prior.length) {
    const priorByItem = new Map(prior.map((row) => [row.itemId, row.choiceId]));
    let comparable = 0;
    let same = 0;
    for (const row of rows) {
      if (!priorByItem.has(row.itemId)) continue;
      comparable += 1;
      if (priorByItem.get(row.itemId) === row.choiceId) same += 1;
    }
    const different = comparable - same;
    if (comparable >= 6 && same / comparable >= 0.75) {
      notes.push({
        observation: 'Under many of the same questions, the recognized movement was the same.',
        evidence: `The movement was the same on ${same} of ${comparable} questions that appear in both sittings.`,
        provisional: 'Same is not stuck. It is what was recognized again.',
      });
    } else if (comparable >= 6 && different / comparable >= 0.75) {
      notes.push({
        observation: 'Under many of the same questions, the recognized movement was different.',
        evidence: `The movement differed on ${different} of ${comparable} questions that appear in both sittings.`,
        provisional: 'Different is not improvement. It is what was recognized this time.',
      });
    }
  }

  return notes;
}
