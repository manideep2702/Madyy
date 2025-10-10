-- Optional SQL to add additional columns used by the profile editor
-- Run this in Supabase SQL Editor once. Adjust table/schema if needed.

-- Use quoted identifier because table name contains a hyphen
ALTER TABLE IF EXISTS "Profile-Table"
  ADD COLUMN IF NOT EXISTS associated_since text,
  ADD COLUMN IF NOT EXISTS roles text[],
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS social_facebook text,
  ADD COLUMN IF NOT EXISTS social_instagram text,
  ADD COLUMN IF NOT EXISTS social_whatsapp text;

