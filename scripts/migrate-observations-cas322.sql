-- CAS322 observations table migration
-- Alters the existing observations table to match the CAS322 signal/reflection model.
-- Run using: node scripts/migrate-observations-cas322.js
--
-- Old shape: id, project, context (NOT NULL), what_shifted (NOT NULL),
--            what_did_not_shift, where_coherent, where_resistant, notes, geography, created_at
-- New shape: id, project, signal (NOT NULL), reflection (NOT NULL, max 140 chars),
--            context (optional), geography, created_at
--
-- SAFE: only two test rows in production at time of migration.

BEGIN;

-- Add new columns
ALTER TABLE observations
  ADD COLUMN IF NOT EXISTS signal TEXT,
  ADD COLUMN IF NOT EXISTS reflection TEXT;

-- Remove legacy columns no longer in use
ALTER TABLE observations
  DROP COLUMN IF EXISTS what_shifted,
  DROP COLUMN IF EXISTS what_did_not_shift,
  DROP COLUMN IF EXISTS where_coherent,
  DROP COLUMN IF EXISTS where_resistant,
  DROP COLUMN IF EXISTS notes;

-- context was NOT NULL before; make it nullable (optional in new form)
ALTER TABLE observations
  ALTER COLUMN context DROP NOT NULL;

-- Now make signal and reflection required (after migration so old rows stay)
-- If old rows exist, delete them first or handle below.
-- We'll set dummy values for existing rows then enforce NOT NULL.
UPDATE observations SET signal = 'legacy', reflection = 'legacy test row' WHERE signal IS NULL;

ALTER TABLE observations
  ALTER COLUMN signal SET NOT NULL,
  ALTER COLUMN reflection SET NOT NULL;

-- Add check constraint for reflection length
ALTER TABLE observations
  ADD CONSTRAINT IF NOT EXISTS reflection_max_length CHECK (char_length(reflection) <= 140);

COMMIT;
