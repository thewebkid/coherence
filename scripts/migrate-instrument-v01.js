import { neon } from '@neondatabase/serverless';

const DATABASE_URL_UNPOOLED = process.env.DATABASE_URL_UNPOOLED;

if (!DATABASE_URL_UNPOOLED) {
  console.error('❌ DATABASE_URL_UNPOOLED environment variable is not set');
  console.error('   This migration requires a direct (non-pooled) connection to Neon Postgres');
  console.error('   Add DATABASE_URL_UNPOOLED to your .env.local file and run:');
  console.error('   node -r dotenv/config scripts/migrate-instrument-v01.js dotenv_config_path=.env.local');
  process.exit(1);
}

const sql = neon(DATABASE_URL_UNPOOLED);

async function migrate() {
  console.log('🔄 Creating observation instrument tables (v0.1)...');

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS instrument_versions (
        id          serial PRIMARY KEY,
        label       text NOT NULL UNIQUE,
        lifecycle   text NOT NULL DEFAULT 'prototype',
        created_at  timestamptz NOT NULL DEFAULT now()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS instrument_participants (
        id                 serial PRIMARY KEY,
        return_token_hash  text NOT NULL UNIQUE,
        created_at         timestamptz NOT NULL DEFAULT now()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS instrument_sessions (
        id                      serial PRIMARY KEY,
        participant_id          integer NOT NULL REFERENCES instrument_participants(id) ON DELETE CASCADE,
        instrument_version      text NOT NULL,
        observational_position  text NOT NULL DEFAULT 'interior',
        scale                   text NOT NULL DEFAULT 'sovereign_participant',
        session_index           integer NOT NULL,
        ensemble_id             text,
        started_at              timestamptz NOT NULL DEFAULT now(),
        completed_at            timestamptz,
        UNIQUE (participant_id, session_index)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS instrument_responses (
        id          serial PRIMARY KEY,
        session_id  integer NOT NULL REFERENCES instrument_sessions(id) ON DELETE CASCADE,
        item_id     text NOT NULL,
        choice_id   text NOT NULL,
        other_text  text,
        created_at  timestamptz NOT NULL DEFAULT now()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS instrument_consent_events (
        id            serial PRIMARY KEY,
        participant_id integer NOT NULL REFERENCES instrument_participants(id) ON DELETE CASCADE,
        consent_type  text NOT NULL,
        text_version  text NOT NULL,
        granted       boolean NOT NULL,
        created_at    timestamptz NOT NULL DEFAULT now()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS instrument_what_followed (
        id                serial PRIMARY KEY,
        prior_session_id  integer NOT NULL REFERENCES instrument_sessions(id) ON DELETE CASCADE,
        item_id           text NOT NULL,
        choice_id         text NOT NULL,
        note              text,
        created_at        timestamptz NOT NULL DEFAULT now()
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS instrument_sessions_participant_idx ON instrument_sessions (participant_id)`;
    await sql`CREATE INDEX IF NOT EXISTS instrument_responses_session_idx ON instrument_responses (session_id)`;
    await sql`CREATE INDEX IF NOT EXISTS instrument_what_followed_session_idx ON instrument_what_followed (prior_session_id)`;

    await sql`
      INSERT INTO instrument_versions (label, lifecycle)
      VALUES ('v0.1', 'prototype')
      ON CONFLICT (label) DO NOTHING
    `;

    console.log('✅ Instrument tables ready');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
