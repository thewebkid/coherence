import { neon } from '@neondatabase/serverless';

/**
 * GET /api/word-detail?project=<name>&word=<signal>
 *
 * Returns 3–7 reflection fragments and 3–5 co-occurring signals for a given
 * project + word (mapped to the `signal` column). Used by the Word Field
 * drill-down interaction on the Observatory page.
 *
 * Response: { fragments: string[], coOccurring: { word: string }[] }
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    return res.status(500).json({ error: 'Database connection not configured.' });
  }

  const { project, word } = req.query;
  if (!project || !word) {
    return res.status(400).json({ error: 'project and word query parameters are required.' });
  }

  try {
    const sql = neon(POSTGRES_URL);

    const [fragmentRows, coRows] = await Promise.all([
      sql`
        SELECT reflection
        FROM observations
        WHERE project = ${project} AND signal = ${word}
          AND (inappropriate IS NOT TRUE)
        ORDER BY created_at DESC
        LIMIT 7
      `,
      sql`
        SELECT signal, count(*) AS count
        FROM observations
        WHERE project = ${project}
          AND signal != ${word}
          AND created_at >= now() - interval '30 days'
          AND (inappropriate IS NOT TRUE)
        GROUP BY signal
        ORDER BY count DESC
        LIMIT 5
      `,
    ]);

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({
      fragments: fragmentRows.map(r =>
        r.reflection.length > 140 ? r.reflection.slice(0, 137) + '\u2026' : r.reflection
      ),
      coOccurring: coRows.map(r => ({ word: r.signal })),
    });
  } catch (error) {
    console.error('GET /api/word-detail error:', error);
    return res.status(500).json({ error: 'Failed to fetch word detail.' });
  }
}
