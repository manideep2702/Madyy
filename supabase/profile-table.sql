-- NOTE: These columns are now deprecated in the app UI.
-- If you previously added them and want to remove, see: profile-table-drop.sql
-- Optional SQL to add additional columns used by the legacy profile editor
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
