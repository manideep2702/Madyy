"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Use a global cache so HMR/dev and multiple imports don't create multiple
// GoTrueClient instances under the same storage key.
type GlobalWithSupabase = typeof globalThis & {
  __supabaseClients?: Record<string, SupabaseClient>;
};
const globalAny = globalThis as GlobalWithSupabase;
globalAny.__supabaseClients ??= {};

function buildStorageKey(url: string, anonKey: string) {
  try {
    const host = new URL(url).host; // e.g. lszc....supabase.co
    const ref = host.split(".")[0]; // project ref
    return `ayya.supabase.${ref}.auth.v1`;
  } catch {
    return `ayya.supabase.${(anonKey || "").slice(0, 8)}.auth.v1`;
  }
}

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  const storageKey = buildStorageKey(url, anonKey);
  if (globalAny.__supabaseClients![storageKey]) return globalAny.__supabaseClients![storageKey];

  const client = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      flowType: "pkce",
      // Let the SDK handle OAuth code exchange on the callback URL
      detectSessionInUrl: true,
      storageKey,
    },
    global: { headers: { "x-ayya-client": "web" } },
    realtime: { params: { eventsPerSecond: 2 } },
  });
  globalAny.__supabaseClients![storageKey] = client;
  return client;
}

// Expose a safe debug helper in development so you can use it from DevTools.
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).getSupabaseBrowserClient = getSupabaseBrowserClient;
}
