-- Contact messages schema for Supabase
-- Supports hyphenated table name "contact-us" (quoted) or underscore variant contact_us

-- Extension required for gen_random_uuid on some projects
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Preferred table name with hyphen (quoted identifier)
CREATE TABLE IF NOT EXISTS "contact-us" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name text NULL,
  email text NOT NULL,
  phone text NULL,
  subject text NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','in_progress','closed'))
);

ALTER TABLE "contact-us" ENABLE ROW LEVEL SECURITY;

-- Allow anyone (authenticated or anonymous) to submit contact forms
CREATE POLICY "contact_submit_public" ON "contact-us"
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to read their own submissions
CREATE POLICY "contact_read_own" ON "contact-us"
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow service role to read all (for admin purposes)
CREATE POLICY "contact_read_service" ON "contact-us"
  FOR SELECT
  TO service_role
  USING (true);

-- Optional: allow admins to read/update (adjust role/claims as needed)
-- CREATE POLICY "contact_read_admin" ON "contact-us"
--   FOR SELECT TO authenticated
--   USING (EXISTS (
--     SELECT 1 FROM auth.jwt() j WHERE (j.role)::text = 'service_role'
--   ));

-- Alternate underscore table name, if you prefer
-- CREATE TABLE IF NOT EXISTS contact_us (
--   LIKE "contact-us" INCLUDING ALL
-- );
-- ALTER TABLE contact_us ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "contact_submit_public" ON contact_us FOR INSERT WITH CHECK (true);

