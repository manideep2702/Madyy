"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Home, CalendarDays, BookOpenText, HeartHandshake, PhoneCall, Landmark } from "lucide-react";
import SabarimalaDropdown from "@/components/ui/sabarimala-dropdown";
import { NavBar } from "@/components/ui/tubelight-navbar";

// Avoid pulling Supabase into the root layout's initial graph during SSR.
// This helps sidestep Turbopack resolution glitches by loading the dropdown on client only.
const NavUserDropdown = dynamic(() => import("@/components/nav/nav-user-dropdown"), { ssr: false });

export default function SiteNavbar() {
  const router = useRouter();

  const items = [
    { name: "Home", url: "/", icon: Home },
    { name: "Calendar", url: "/calendar", icon: CalendarDays },
    { name: "Devotional", url: "/devotional", icon: BookOpenText },
    { name: "Donate", url: "/donate", icon: HeartHandshake },
    { name: "Contact", url: "/contact", icon: PhoneCall },
  ];

  return (
    <div className="w-full px-4 py-2">
      <div className="mx-auto max-w-7xl relative flex items-center justify-center">
        {/* Nav pill */}
        <NavBar
          items={items}
          // Override default fixed positioning so it sits in header
          className="static translate-x-0 left-auto top-auto mb-0 sm:pt-0"
          endSlot={
            <SabarimalaDropdown
              className="relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors bg-transparent text-foreground/80 hover:text-primary h-auto"
              options={[
                { label: "About Sabarimala", onClick: () => router.push("/sabarimala?tab=about") },
                { label: "How to Reach", onClick: () => router.push("/sabarimala/how-to-reach") },
                { label: "Calendar", onClick: () => router.push("/calendar") },
                { label: "Pooja Timing", onClick: () => router.push("/sabarimala?tab=pooja") },
              ]}
            >
              <span className="hidden md:inline">Sabarimala</span>
              <span className="md:hidden"><Landmark className="h-4 w-4" /></span>
            </SabarimalaDropdown>
          }
        />

        {/* Profile trigger pinned to the right for a unique look */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <NavUserDropdown />
        </div>
      </div>
    </div>
  );
}
