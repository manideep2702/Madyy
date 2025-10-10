"use client";

import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Home, CalendarDays, BookOpenText, HeartHandshake, PhoneCall, Landmark } from "lucide-react";
import SabarimalaDropdown from "@/components/ui/sabarimala-dropdown";

// Avoid pulling Supabase into the root layout's initial graph during SSR.
// This helps sidestep Turbopack resolution glitches by loading the dropdown on client only.
const NavUserDropdown = dynamic(() => import("@/components/nav/nav-user-dropdown"), { ssr: false });

export default function SiteNavbar() {
  const router = useRouter();
  const tabs = [
    { title: "Home", icon: Home },
    { title: "Calendar", icon: CalendarDays },
    { title: "Devotional", icon: BookOpenText },
    { type: "separator" as const },
    { title: "Donate", icon: HeartHandshake },
    { title: "Contact", icon: PhoneCall },
  ];

  // Route map aligned with tab indices (use null for separator)
  const routes: (string | null)[] = [
    "/",
    "/calendar",
    "/devotional",
    null,
    "/donate",
    "/contact",
  ];

  return (
    <div className="w-full px-4 py-2">
      <div className="mx-auto max-w-7xl flex justify-center">
        <div className="flex items-center gap-2 rounded-full bg-black/70 text-white/90 border border-white/10 backdrop-blur-sm px-3 py-2 shadow-md">
          <ExpandableTabs
            tabs={tabs}
            activeColor="text-amber-600 dark:text-amber-300"
            className="justify-center rounded-full bg-transparent"
            onChange={(index) => {
              if (index === null) return;
              const href = routes[index];
              if (href) router.push(href);
            }}
          />
          {/* Sabarimala icon dropdown */}
          <SabarimalaDropdown
            options={[
              { label: "About Sabarimala", onClick: () => router.push("/sabarimala?tab=about") },
              { label: "How to Reach", onClick: () => router.push("/sabarimala/how-to-reach") },
              { label: "Calendar", onClick: () => router.push("/calendar") },
              { label: "Pooja Timing", onClick: () => router.push("/sabarimala?tab=pooja") },
            ]}
          >
            <span className="inline-flex items-center gap-1 text-xs text-white/90" title="Sabarimala">
              <Landmark className="h-4 w-4" />
            </span>
          </SabarimalaDropdown>

          <NavUserDropdown />
        </div>
      </div>
    </div>
  );
}
