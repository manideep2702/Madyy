-- Drop profile fields per removal request
-- Run this in Supabase SQL Editor (adjust schema/table if different)

-- Table uses quoted identifier because of hyphen in name
ALTER TABLE IF EXISTS "Profile-Table"
  DROP COLUMN IF EXISTS associated_since,
  DROP COLUMN IF EXISTS roles,
  DROP COLUMN IF EXISTS phone,
  DROP COLUMN IF EXISTS location,
  DROP COLUMN IF EXISTS social_facebook,
  DROP COLUMN IF EXISTS social_instagram,
  DROP COLUMN IF EXISTS social_whatsapp,
  DROP COLUMN IF EXISTS video_url;

