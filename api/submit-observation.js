import { neon } from '@neondatabase/serverless';
import { limiters, checkRateLimit } from './_rate-limit.js';
import { validateHoneypot } from './_honeypot.js';

const PROJECTS = [
  'AI Observation',
  'Observation',
  'Dialogue',
  'Relational Field',
  'Reflection',
  'Presence',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    console.error('POSTGRES_URL environment variable is not set');
    return res.status(500).json({ error: 'Database connection not configured.' });
  }

  if (await checkRateLimit(limiters.observation, req, res)) return;

  const { project, signal, reflection, context, geography, website } = req.body || {};

  try { validateHoneypot(website); } catch (e) { return res.status(e.status).json({ error: e.message }); }

  if (!project || !signal || !reflection) {
    return res.status(400).json({ error: 'Missing required fields: project, signal, and reflection are required.' });
  }

  if (!PROJECTS.includes(project)) {
    return res.status(400).json({ error: `Invalid project. Must be one of: ${PROJECTS.join(', ')}` });
  }

  const signalTrimmed = signal.trim();
  if (!signalTrimmed) {
    return res.status(400).json({ error: 'Signal must not be empty.' });
  }

  const reflectionTrimmed = reflection.trim();
  if (reflectionTrimmed.length > 140) {
    return res.status(400).json({ error: 'Reflection must be 140 characters or fewer.' });
  }
  if (!reflectionTrimmed) {
    return res.status(400).json({ error: 'Reflection must not be empty.' });
  }

  try {
    const sql = neon(POSTGRES_URL);
    await sql`
      INSERT INTO observations (project, signal, reflection, context, geography)
      VALUES (
        ${project},
        ${signalTrimmed},
        ${reflectionTrimmed},
        ${context?.trim() || null},
        ${geography?.trim() || null}
      )
    `;
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Failed to store observation. Please try again.' });
  }
}
