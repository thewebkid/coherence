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
    console.log('🔄 Creating current_signals table...');

    await sql`
      CREATE TABLE IF NOT EXISTS current_signals (
        id         SERIAL      PRIMARY KEY,
        label      TEXT        NOT NULL,
        timeframe  TEXT        NOT NULL,
        content    TEXT        NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    console.log('✅ current_signals table created successfully');
    console.log('   You can verify this in the Neon dashboard');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
