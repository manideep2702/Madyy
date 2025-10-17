-- Non-destructive migration for an existing public."Volunteer Bookings" table
-- that was originally created with only (id, created_at) columns.
-- Run this in the Supabase SQL editor.

BEGIN;

-- Ensure table exists (creates minimal shell if missing)
CREATE TABLE IF NOT EXISTS public."Volunteer Bookings" (
  id         bigserial PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Add required columns if they do not exist yet
ALTER TABLE public."Volunteer Bookings"
  ADD COLUMN IF NOT EXISTS name       text,
  ADD COLUMN IF NOT EXISTS email      text,
  ADD COLUMN IF NOT EXISTS phone      text,
  ADD COLUMN IF NOT EXISTS date       date,
  ADD COLUMN IF NOT EXISTS session    text,
  ADD COLUMN IF NOT EXISTS role       text,
  ADD COLUMN IF NOT EXISTS note       text,
  ADD COLUMN IF NOT EXISTS user_id    uuid,
  ADD COLUMN IF NOT EXISTS "timestamp" timestamptz DEFAULT now();

-- Set sensible defaults where applicable (safe for new rows)
ALTER TABLE public."Volunteer Bookings"
  ALTER COLUMN role SET DEFAULT 'Annadanam Service',
  ALTER COLUMN "timestamp" SET DEFAULT now();

-- Optional: backfill NOT NULL constraints only if there are no violating rows
-- (Skip hard constraints to keep migration resilient. Your API validates on write.)

-- Add a session check constraint if not present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    WHERE c.conname = 'volunteer_bookings_session_check'
      AND c.conrelid = 'public."Volunteer Bookings"'::regclass
  ) THEN
    ALTER TABLE public."Volunteer Bookings"
      ADD CONSTRAINT volunteer_bookings_session_check CHECK (session IN ('Morning','Evening'));
  END IF;
END$$;

-- Add FK to auth.users for user_id if not present (PG15+ supports IF NOT EXISTS on FK via DO block)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    WHERE c.conrelid = 'public."Volunteer Bookings"'::regclass
      AND c.contype = 'f'
  ) THEN
    ALTER TABLE public."Volunteer Bookings"
      ADD CONSTRAINT volunteer_bookings_user_fk
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END$$;

-- Indexes (will succeed even with existing indexes)
CREATE INDEX IF NOT EXISTS volunteer_bookings_date_idx
  ON public."Volunteer Bookings" (date);

CREATE INDEX IF NOT EXISTS volunteer_bookings_date_session_idx
  ON public."Volunteer Bookings" (date, session);

CREATE INDEX IF NOT EXISTS volunteer_bookings_user_idx
  ON public."Volunteer Bookings" (user_id);

-- Enable RLS
ALTER TABLE public."Volunteer Bookings" ENABLE ROW LEVEL SECURITY;

-- Service role read policy (clarity; service role bypasses RLS anyway)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'Volunteer Bookings'
      AND policyname = 'volunteer_bookings_select_service'
  ) THEN
    CREATE POLICY "volunteer_bookings_select_service"
      ON public."Volunteer Bookings"
      FOR SELECT TO service_role
      USING (true);
  END IF;
END$$;

COMMIT;

