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
    console.log('🔄 Creating interpretive_work_submissions table...');

    await sql`
      CREATE TABLE IF NOT EXISTS interpretive_work_submissions (
        id                   SERIAL PRIMARY KEY,
        submitter_name       TEXT        NOT NULL,
        submitter_email      TEXT        NOT NULL,
        display_name_consent BOOLEAN     NOT NULL DEFAULT FALSE,
        work_title           TEXT        NOT NULL,
        work_type            TEXT        NOT NULL,
        work_description     TEXT        NOT NULL,
        work_url             TEXT,
        work_file_info       TEXT,
        status               TEXT        NOT NULL DEFAULT 'unread',
        admin_notes          TEXT,
        created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    console.log('✅ interpretive_work_submissions table created successfully');
    console.log('   You can verify this in the Neon dashboard');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
