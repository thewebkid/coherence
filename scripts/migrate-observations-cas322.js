import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATABASE_URL_UNPOOLED = process.env.DATABASE_URL_UNPOOLED;

if (!DATABASE_URL_UNPOOLED) {
  console.error('❌ DATABASE_URL_UNPOOLED environment variable is not set');
  console.error('   This migration requires a direct (non-pooled) connection to Neon Postgres');
  console.error('   Add DATABASE_URL_UNPOOLED to your .env.local file and run:');
  console.error('   node -r dotenv/config scripts/migrate-observations-cas322.js dotenv_config_path=.env.local');
  process.exit(1);
}

const sql = neon(DATABASE_URL_UNPOOLED);

async function migrate() {
  console.log('🔄 Migrating observations table to CAS322 schema...');

  try {
    // Show current row count
    const [{ count }] = await sql`SELECT count(*) FROM observations`;
    console.log(`   Existing rows: ${count}`);

    // Add new columns if not present
    await sql`ALTER TABLE observations ADD COLUMN IF NOT EXISTS signal TEXT`;
    await sql`ALTER TABLE observations ADD COLUMN IF NOT EXISTS reflection TEXT`;
    console.log('✅ Added signal, reflection columns');

    // Drop legacy columns
    await sql`ALTER TABLE observations DROP COLUMN IF EXISTS what_shifted`;
    await sql`ALTER TABLE observations DROP COLUMN IF EXISTS what_did_not_shift`;
    await sql`ALTER TABLE observations DROP COLUMN IF EXISTS where_coherent`;
    await sql`ALTER TABLE observations DROP COLUMN IF EXISTS where_resistant`;
    await sql`ALTER TABLE observations DROP COLUMN IF EXISTS notes`;
    console.log('✅ Dropped legacy columns');

    // Make context nullable
    await sql`ALTER TABLE observations ALTER COLUMN context DROP NOT NULL`;
    console.log('✅ Made context nullable');

    // Backfill nulls in existing test rows so we can enforce NOT NULL
    await sql`
      UPDATE observations
      SET signal = 'legacy',
          reflection = 'legacy test row'
      WHERE signal IS NULL
    `;

    // Enforce NOT NULL on new columns
    await sql`ALTER TABLE observations ALTER COLUMN signal SET NOT NULL`;
    await sql`ALTER TABLE observations ALTER COLUMN reflection SET NOT NULL`;
    console.log('✅ Enforced NOT NULL on signal and reflection');

    // Add length constraint (may already exist on re-run — ignore error)
    try {
      await sql`
        ALTER TABLE observations
        ADD CONSTRAINT reflection_max_length CHECK (char_length(reflection) <= 140)
      `;
      console.log('✅ Added reflection_max_length constraint');
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log('ℹ️  reflection_max_length constraint already exists — skipping');
      } else {
        throw e;
      }
    }

    // Verify final shape
    const cols = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'observations'
      ORDER BY ordinal_position
    `;
    console.log('\n📋 Final schema:');
    cols.forEach(c => console.log(`   ${c.column_name} (${c.data_type}) nullable=${c.is_nullable}`));

    console.log('\n✅ Migration complete.');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
