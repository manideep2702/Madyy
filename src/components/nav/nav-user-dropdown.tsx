"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnClickOutside } from "usehooks-ts";
import { User, LogIn, LogOut, ChevronDown } from "lucide-react";
import { useAlert } from "@/components/ui/alert-provider";

export default function NavUserDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { show } = useAlert();
  const anchorRef = useRef<HTMLDivElement>(null);
  const supabaseRef = useRef<ReturnType<any> | null>(null);
  useOnClickOutside<HTMLDivElement>(anchorRef as unknown as React.RefObject<HTMLDivElement>, () => setOpen(false));
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    if (!hasSupabaseEnv) {
      // No env: keep dropdown functional but unauthenticated
      setLoggedIn(false);
      return;
    }
    let unsub: (() => void) | null = null;
    (async () => {
      try {
        const { getSupabaseBrowserClient } = await import("@/lib/supabase/client");
        const supabase = getSupabaseBrowserClient();
        supabaseRef.current = supabase as unknown as ReturnType<any>;
        supabase.auth.getSession().then(({ data }) => setLoggedIn(Boolean(data.session)));
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
          setLoggedIn(Boolean(session));
        });
        unsub = () => sub.subscription?.unsubscribe?.();
      } catch (err) {
        // Soft-fail if env misconfigured
        setLoggedIn(false);
      }
    })();
    return () => { try { unsub?.(); } catch {} };
  }, []);

  const login = () => {
    window.location.href = "/sign-in";
  };

  const logout = async () => {
    if (!hasSupabaseEnv) {
      show({ title: "Auth not configured", description: "Contact admin to configure Supabase.", variant: "warning" });
      setLoggedIn(false);
      setOpen(false);
      try { router.replace("/"); } catch {}
      if (typeof window !== "undefined") window.location.assign("/");
      return;
    }
    let supabase = supabaseRef.current as any;
    if (!supabase) {
      const mod = await import("@/lib/supabase/client");
      supabase = mod.getSupabaseBrowserClient();
      supabaseRef.current = supabase;
    }
    // Capture user's name/email before signing out
    let who = "User";
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes?.user;
      if (user) {
        let name = (user.user_metadata?.full_name || user.user_metadata?.name || "").toString();
        if (!name) {
          try {
            let { data: row } = await supabase
              .from("Profile-Table")
              .select("name, full_name")
              .eq("user_id", user.id)
              .maybeSingle();
            if (!row) {
              const alt = await supabase
                .from("Profile-Table")
                .select("name, full_name")
                .eq("id", user.id)
                .maybeSingle();
              row = alt.data ?? null;
            }
            name = (row?.name || row?.full_name || "").toString();
          } catch {}
        }
        who = name || user.email || who;
      }
    } catch {}
    await supabase.auth.signOut();
    setLoggedIn(false);
    setOpen(false);
    show({ title: "Logged out", description: `${who}`, variant: "info" });
    try { router.replace("/"); } catch {}
    // Fallback if router is unavailable for any reason
    if (typeof window !== "undefined") window.location.assign("/");
  };

  return (
    <div ref={anchorRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-xl bg-white/15 px-3 py-2 text-xs font-medium text-white ring-1 ring-white/20 hover:bg-white/25"
      >
        <User size={16} />
        <span className="hidden sm:inline">Account</span>
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 top-[110%] z-50">
          <div className="w-56 rounded-lg border border-white/10 bg-neutral-900/90 p-2 text-neutral-100 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs">
              {loggedIn ? (
                <>
                  <button onClick={() => (window.location.href = "/profile")}
                    className="inline-flex items-center gap-2 rounded px-2 py-1 hover:bg-white/10">
                    <User size={14} /> Profile
                  </button>
                  <button onClick={logout} className="inline-flex items-center gap-2 rounded px-2 py-1 hover:bg-white/10">
                    <LogOut size={14} /> Logout
                  </button>
                </>
              ) : (
                <button onClick={login} className="inline-flex items-center gap-2 rounded px-2 py-1 hover:bg-white/10">
                  <LogIn size={14} /> Login
                </button>
              )}
            </div>
            {/* Additional menu items intentionally removed per request */}
          </div>
        </div>
      )}
    </div>
  );
}
