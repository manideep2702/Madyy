-- Volunteer Bookings schema
-- Run this in the Supabase SQL editor or psql connected to your project.

-- Table name contains a space; keep the double quotes when referencing
CREATE TABLE IF NOT EXISTS public."Volunteer Bookings" (
  id           bigserial PRIMARY KEY,
  created_at   timestamptz NOT NULL DEFAULT now(),

  -- Booking details captured from the form/backend
  name         text        NOT NULL,
  email        text        NOT NULL,
  phone        text        NOT NULL,
  date         date        NOT NULL, -- YYYY-MM-DD (Annadanam season day)
  session      text        NOT NULL CHECK (session IN ('Morning','Evening')),
  role         text        NOT NULL DEFAULT 'Annadanam Service',
  note         text,

  -- Optional link to authenticated user (if available)
  user_id      uuid        NULL REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Additional server-side timestamp separate from created_at
  "timestamp"  timestamptz NOT NULL DEFAULT now()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS volunteer_bookings_date_idx
  ON public."Volunteer Bookings" (date);

CREATE INDEX IF NOT EXISTS volunteer_bookings_date_session_idx
  ON public."Volunteer Bookings" (date, session);

CREATE INDEX IF NOT EXISTS volunteer_bookings_user_idx
  ON public."Volunteer Bookings" (user_id);

-- Enable RLS
ALTER TABLE public."Volunteer Bookings" ENABLE ROW LEVEL SECURITY;

-- Read policy for service role (backend/admin). Service role bypasses RLS,
-- but policy included for clarity/consistency.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'Volunteer Bookings' AND policyname = 'volunteer_bookings_select_service'
  ) THEN
    CREATE POLICY "volunteer_bookings_select_service"
      ON public."Volunteer Bookings"
      FOR SELECT TO service_role
      USING (true);
  END IF;
END$$;

-- Optional: allow authenticated users to insert their own bookings if you also post from client
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'Volunteer Bookings' AND policyname = 'volunteer_bookings_insert_auth'
  ) THEN
    CREATE POLICY "volunteer_bookings_insert_auth"
      ON public."Volunteer Bookings"
      FOR INSERT TO authenticated
      WITH CHECK (true);
  END IF;
END$$;

-- Optional: allow authenticated users to view their own submissions
-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_policies
--     WHERE schemaname = 'public' AND tablename = 'Volunteer Bookings' AND policyname = 'volunteer_bookings_select_own'
--   ) THEN
--     CREATE POLICY "volunteer_bookings_select_own"
--       ON public."Volunteer Bookings"
--       FOR SELECT TO authenticated
--       USING (auth.uid() = user_id);
--   END IF;
-- END$$;

