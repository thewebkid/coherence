import { neon } from '@neondatabase/serverless';

/**
 * GET /api/observations?project=<name>
 * Returns recent reflections (feed) and aggregated signal word counts (word cloud) for a project.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    return res.status(500).json({ error: 'Database connection not configured.' });
  }

  const { project } = req.query;

  try {
    const sql = neon(POSTGRES_URL);

    if (!project) {
      const rows = await sql`
        SELECT * FROM observations
        WHERE created_at >= now() - interval '100 days'
          AND (inappropriate IS NOT TRUE)
        ORDER BY created_at DESC
      `;
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
      return res.status(200).json(rows);
    }

    // 5 most recent reflections for the feed
    const recentRows = await sql`
      SELECT reflection, created_at
      FROM observations
      WHERE project = ${project}
        AND (inappropriate IS NOT TRUE)
      ORDER BY created_at DESC
      LIMIT 5
    `;

    // Signal word frequencies for word cloud
    const signalRows = await sql`
      SELECT signal, count(*) AS count
      FROM observations
      WHERE project = ${project}
        AND (inappropriate IS NOT TRUE)
      GROUP BY signal
      ORDER BY count DESC
      LIMIT 30
    `;

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({
      feed: recentRows.map(r => r.reflection),
      signals: signalRows.map(r => ({ word: r.signal, count: Number(r.count) })),
    });
  } catch (error) {
    console.error('GET /api/observations error:', error);
    return res.status(500).json({ error: 'Failed to fetch observations.' });
  }
}
