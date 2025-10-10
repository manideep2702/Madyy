-- Annadanam slots and bookings schema
-- Run this in Supabase SQL editor

-- CREATE EXTENSION IF NOT EXISTS pgcrypto; -- if gen_random_uuid() not available

CREATE TABLE IF NOT EXISTS "Annadanam-Slots" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  session text NOT NULL CHECK (session IN ('Morning','Evening')),
  capacity integer NOT NULL,
  booked_count integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed')),
  CONSTRAINT annadanam_slots_unique UNIQUE (date, session)
);

ALTER TABLE "Annadanam-Slots" ENABLE ROW LEVEL SECURITY;

-- Anyone can read slots
CREATE POLICY IF NOT EXISTS annadanam_slots_select_public
  ON "Annadanam-Slots" FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS "Annadanam-Bookings" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  slot_id uuid NOT NULL REFERENCES "Annadanam-Slots"(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  qty integer NOT NULL DEFAULT 1 CHECK (qty > 0 AND qty <= 3),
  status text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed','cancelled')),
  CONSTRAINT annadanam_unique_per_user UNIQUE (slot_id, user_id)
);

ALTER TABLE "Annadanam-Bookings" ENABLE ROW LEVEL SECURITY;

-- Authenticated users can manage their own bookings
CREATE POLICY IF NOT EXISTS annadanam_bookings_select_own
  ON "Annadanam-Bookings" FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS annadanam_bookings_insert_own
  ON "Annadanam-Bookings" FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS annadanam_bookings_update_own
  ON "Annadanam-Bookings" FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Service role can read everything
CREATE POLICY IF NOT EXISTS annadanam_bookings_select_service
  ON "Annadanam-Bookings" FOR SELECT TO service_role USING (true);

-- RPC to reserve a slot atomically
CREATE OR REPLACE FUNCTION public.reserve_annadanam_slot(
  slot_id uuid,
  user_id uuid,
  name text,
  email text,
  phone text,
  qty integer
)
RETURNS "Annadanam-Bookings" AS $$
DECLARE
  s RECORD;
  b "Annadanam-Bookings";
BEGIN
  IF qty IS NULL OR qty < 1 OR qty > 3 THEN
    RAISE EXCEPTION 'Invalid qty';
  END IF;
  IF email IS NULL OR length(trim(email)) = 0 THEN
    RAISE EXCEPTION 'Email required';
  END IF;
  SELECT * INTO s FROM "Annadanam-Slots" WHERE id = slot_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Slot not found';
  END IF;
  IF s.status <> 'open' THEN
    RAISE EXCEPTION 'Slot is closed';
  END IF;
  IF s.booked_count + qty > s.capacity THEN
    RAISE EXCEPTION 'Slot full';
  END IF;
  INSERT INTO "Annadanam-Bookings" (slot_id, user_id, name, email, phone, qty)
  VALUES (slot_id, user_id, name, email, phone, qty)
  RETURNING * INTO b;
  UPDATE "Annadanam-Slots"
    SET booked_count = booked_count + qty
    WHERE id = slot_id;
  RETURN b;
EXCEPTION WHEN unique_violation THEN
  RAISE EXCEPTION 'You already booked this slot';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

