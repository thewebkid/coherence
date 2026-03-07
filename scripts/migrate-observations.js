import { neon } from '@neondatabase/serverless';

const DATABASE_URL_UNPOOLED = process.env.DATABASE_URL_UNPOOLED;

if (!DATABASE_URL_UNPOOLED) {
  console.error('❌ DATABASE_URL_UNPOOLED environment variable is not set');
  console.error('   This migration requires a direct (non-pooled) connection to Neon Postgres');
  console.error('   Add DATABASE_URL_UNPOOLED to your .env.local file');
  process.exit(1);
}

const sql = neon(DATABASE_URL_UNPOOLED);

async function migrate() {
  try {
    console.log('🔄 Creating observations table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS observations (
        id            SERIAL PRIMARY KEY,
        project       TEXT        NOT NULL,
        context       TEXT        NOT NULL,
        what_shifted  TEXT        NOT NULL,
        what_did_not_shift  TEXT,
        where_coherent      TEXT,
        where_resistant     TEXT,
        notes               TEXT,
        geography           TEXT,
        created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    
    console.log('✅ observations table created successfully');
    console.log('   You can verify this in the Neon dashboard');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
