import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Missing Supabase env vars. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.");
  }
  const admin = createClient(url, serviceKey, {
    global: { headers: { "x-ayya-client": "api-admin" } },
  });
  return admin;
}

