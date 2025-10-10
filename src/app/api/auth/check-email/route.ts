import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const rawEmail = url.searchParams.get("email");
    const email = rawEmail?.trim().toLowerCase();
    if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceKey) {
      // Service key not configured; cannot check precisely on server.
      return NextResponse.json({ exists: null });
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Prefer GoTrue Admin API to avoid exposing auth schema and RLS concerns
    const res = await admin.auth.admin.getUserByEmail(email);
    if (res.error && res.error.message?.toLowerCase().includes('user not found')) {
      return NextResponse.json({ exists: false });
    }
    if (res.error) return NextResponse.json({ error: res.error.message }, { status: 400 });
    const user = res.data?.user;
    if (!user) return NextResponse.json({ exists: false });

    // Providers can be in app_metadata.provider or app_metadata.providers
    const meta = (user as any).app_metadata || {};
    let providers: string[] = [];
    if (Array.isArray(meta.providers)) providers = meta.providers as string[];
    else if (typeof meta.provider === "string") providers = [meta.provider];
    // Fallback: derive from identities array
    if (!providers.length && Array.isArray((user as any).identities)) {
      providers = (user as any).identities.map((i: any) => i.provider).filter(Boolean);
    }

    return NextResponse.json({ exists: true, providers });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "unknown" }, { status: 500 });
  }
}
