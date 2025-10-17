-- Migration for public.Volunteer_Bookings (underscore variant)
-- Run this if your table name is Volunteer_Bookings and missing columns.

BEGIN;

CREATE TABLE IF NOT EXISTS public.Volunteer_Bookings (
  id         bigserial PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.Volunteer_Bookings
  ADD COLUMN IF NOT EXISTS name       text,
  ADD COLUMN IF NOT EXISTS email      text,
  ADD COLUMN IF NOT EXISTS phone      text,
  ADD COLUMN IF NOT EXISTS date       date,
  ADD COLUMN IF NOT EXISTS session    text,
  ADD COLUMN IF NOT EXISTS role       text,
  ADD COLUMN IF NOT EXISTS note       text,
  ADD COLUMN IF NOT EXISTS user_id    uuid,
  ADD COLUMN IF NOT EXISTS "timestamp" timestamptz DEFAULT now();

ALTER TABLE public.Volunteer_Bookings
  ALTER COLUMN role SET DEFAULT 'Annadanam Service',
  ALTER COLUMN "timestamp" SET DEFAULT now();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    WHERE c.conname = 'volunteer_bookings_us_session_check'
      AND c.conrelid = 'public.Volunteer_Bookings'::regclass
  ) THEN
    ALTER TABLE public.Volunteer_Bookings
      ADD CONSTRAINT volunteer_bookings_us_session_check CHECK (session IN ('Morning','Evening'));
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    WHERE c.conrelid = 'public.Volunteer_Bookings'::regclass
      AND c.contype = 'f'
  ) THEN
    ALTER TABLE public.Volunteer_Bookings
      ADD CONSTRAINT volunteer_bookings_us_user_fk
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS volunteer_bookings_us_date_idx
  ON public.Volunteer_Bookings (date);

CREATE INDEX IF NOT EXISTS volunteer_bookings_us_date_session_idx
  ON public.Volunteer_Bookings (date, session);

CREATE INDEX IF NOT EXISTS volunteer_bookings_us_user_idx
  ON public.Volunteer_Bookings (user_id);

ALTER TABLE public.Volunteer_Bookings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'volunteer_bookings'
      AND policyname = 'volunteer_bookings_us_select_service'
  ) THEN
    CREATE POLICY volunteer_bookings_us_select_service
      ON public.Volunteer_Bookings
      FOR SELECT TO service_role
      USING (true);
  END IF;
END$$;

COMMIT;

