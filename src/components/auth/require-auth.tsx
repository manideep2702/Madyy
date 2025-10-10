"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = React.useState(false);
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  React.useEffect(() => {
    const run = async () => {
      if (!hasSupabaseEnv) {
        // If auth isn't configured, route to sign-in and don't crash
        try { router.replace("/sign-in"); } catch {}
        return;
      }
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          // Clear broken session and force re-auth
          try {
            await supabase.auth.signOut();
          } catch {}
        }
        if (error || !data.session) {
          const next = typeof window !== "undefined" ? window.location.pathname + window.location.search + window.location.hash : "/";
          router.replace(`/sign-in?next=${encodeURIComponent(next)}`);
          return;
        }
        setAllowed(true);
      } catch (e) {
        router.replace("/sign-in");
      }
    };
    run();
  }, [router, hasSupabaseEnv]);

  if (!allowed) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-muted-foreground">
        Checking authentication…
      </div>
    );
  }

  return <>{children}</>;
}
