import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const POSTGRES_URL = process.env.POSTGRES_URL;
  
  if (!POSTGRES_URL) {
    console.error('POSTGRES_URL environment variable is not set');
    return res.status(500).json({ 
      error: 'Database connection not configured. Please contact the site administrator.' 
    });
  }

  const { project, context, whatShifted, whatDidNotShift, whereCoherent, whereResistant, notes, geography } = req.body;

  if (!project || !context || !whatShifted) {
    return res.status(400).json({ 
      error: 'Missing required fields: project, context, and whatShifted are required' 
    });
  }

  if (!['Observation', 'Behavioral Ecology', 'Conversational Recursion'].includes(project)) {
    return res.status(400).json({ 
      error: 'Invalid project value. Must be one of: Observation, Behavioral Ecology, Conversational Recursion' 
    });
  }

  try {
    const sql = neon(POSTGRES_URL);
    
    await sql`
      INSERT INTO observations (
        project,
        context,
        what_shifted,
        what_did_not_shift,
        where_coherent,
        where_resistant,
        notes,
        geography
      ) VALUES (
        ${project},
        ${context},
        ${whatShifted},
        ${whatDidNotShift || null},
        ${whereCoherent || null},
        ${whereResistant || null},
        ${notes || null},
        ${geography || null}
      )
    `;
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ 
      error: 'Failed to store observation. Please try again.' 
    });
  }
}
