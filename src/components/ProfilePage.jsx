"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Pencil, HeartHandshake, Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

// Design tokens removed; using site theme classes

function ProfileCard({ profile, onEditClick, stats }) {
  const { name, designation, tagline, imageUrl } = profile;
  return (
    <section
      className="relative rounded-2xl border border-border bg-card/70 p-6 md:p-8 shadow-sm"
      aria-labelledby="profile-card-title"
    >
      <button
        type="button"
        onClick={onEditClick}
        className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-md bg-white/10 p-2 text-foreground ring-1 ring-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Edit profile"
        title="Edit profile"
      >
        <Pencil size={16} />
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${name || "User"} profile photo`}
              className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover ring-4 ring-[#D4AF37] transition-transform duration-300 hover:scale-[1.02]"
            />
          ) : (
            <div
              aria-label="Loading profile photo"
              className="h-32 w-32 md:h-40 md:w-40 rounded-full ring-4 ring-[#D4AF37] bg-white/10 animate-pulse"
            />
          )}
        </div>
        <div className="text-center md:text-left">
          <p className="text-xs tracking-widest font-semibold uppercase mb-1 text-amber-300">
            {designation}
          </p>
          <h1
            id="profile-card-title"
            className="text-2xl md:text-3xl font-extrabold text-foreground"
          >
            {name}
          </h1>
          <p className="mt-2 italic text-muted-foreground">
            {tagline}
          </p>

          {stats && (stats.count > 0 || stats.total > 0) && (
            <div className="mt-3 flex items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-white/5 px-2.5 py-1 text-xs text-foreground">
                <HeartHandshake size={14} /> {stats.count} donations
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-white/5 px-2.5 py-1 text-xs text-foreground">
                <Banknote size={14} /> ₹{(stats.total || 0).toLocaleString()}
              </span>
            </div>
          )}

          {/* Social links removed per request */}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ bioParagraphs, highlights }) {
  return (
    <section className="rounded-2xl border border-border bg-card/70 p-6 md:p-8 shadow-sm" aria-labelledby="about-section-title">
      <h2
        id="about-section-title"
        className="text-xl md:text-2xl font-bold mb-4 text-foreground"
      >
        About
      </h2>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          {bioParagraphs?.map((p, i) => (
            <p key={i} className="leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          {highlights?.length ? (
            <div>
              <h3 className="font-semibold mb-2 text-foreground">
                Highlights
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {highlights.map((h, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        {/* Video removed per request */}
      </div>
    </section>
  );
}

// Details grid removed per request

// Support CTA removed per request

const mockProfile = {
  name: "",
  designation: "",
  tagline: "",
  imageUrl: "",
  bioParagraphs: [],
  highlights: [],
  donateHref: "/donate",
  campaigns: [],
};

export default function ProfilePage({ profile = mockProfile }) {
  const [profileData, setProfileData] = useState(profile);
  const [donations, setDonations] = useState([]);
  const router = useRouter();

  // Load profile from Supabase and keep it in sync with auth state
  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    const load = async () => {
      try {
        const { data: userRes } = await supabase.auth.getUser();
        const user = userRes?.user;
        if (!user) return;
        // Try by user_id first
        let { data, error } = await supabase
          .from("Profile-Table")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();
        // Fallback to id for older schemas
        if (error || !data) {
          const second = await supabase
            .from("Profile-Table")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();
          data = second.data;
          error = second.error;
        }
        if (!error && data) {
          setProfileData((prev) => ({
            ...prev,
            name: data.name || data.full_name || prev.name,
            designation: data.designation || prev.designation,
            tagline: data.tagline || prev.tagline,
            imageUrl: data.image_url || data.avatar_url || prev.imageUrl,
            bioParagraphs: Array.isArray(data.bio_paragraphs) ? data.bio_paragraphs : prev.bioParagraphs,
            highlights: Array.isArray(data.highlights) ? data.highlights : prev.highlights,
          }));
        }
      } catch {}
    };

    // initial load
    load();
    // subscribe to auth changes (handles first load racing conditions)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) load();
    });
    return () => sub.subscription?.unsubscribe?.();
  }, []);

  const totals = useMemo(() => {
    const total = donations.reduce((sum, d) => sum + (Number(d?.amount) || 0), 0);
    return { count: donations.length, total };
  }, [donations]);

  const refreshDonations = () => {};


  return (
    <main
      className="min-h-screen bg-background text-foreground"
      aria-label="Profile page"
    >
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-12 md:pb-16 space-y-6">
        <ProfileCard profile={profileData} onEditClick={() => router.push("/profile/edit")} stats={totals} />

        <AboutSection
          bioParagraphs={profileData.bioParagraphs}
          highlights={profileData.highlights}
        />

        {/* Details removed per request */}

        {/* Inline editor removed; now opens at /profile/edit */}

        {/* Donations UI removed demo persistence; section hidden for now */}

        {/* Support CTA removed */}
      </div>
    </main>
  );
}

// Inline editor removed — dedicated edit page used instead.

function DonationsSection({ totals, donations, onRefresh }) {
  return (
    <section className="rounded-2xl border border-border bg-card/70 p-6 md:p-8 shadow-sm" aria-labelledby="donations-title">
      <div className="flex items-center justify-between">
        <h2 id="donations-title" className="text-xl md:text-2xl font-bold text-foreground">
          Donations
        </h2>
        <button
          type="button"
          onClick={onRefresh}
          className="px-3 py-1.5 rounded-lg text-xs font-medium ring-1 ring-border text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          Refresh
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-border bg-white/5 p-3 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Donations</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            ₹{(totals.total || 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-white/5 p-3 shadow-sm">
          <p className="text-xs text-muted-foreground">No. of Donations</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {totals.count || 0}
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-foreground">
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Campaign</th>
              <th className="py-2 pr-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {donations?.slice().reverse().slice(0, 10).map((d) => (
              <tr key={d.id} className="border-t border-border text-muted-foreground">
                <td className="py-2 pr-4">{new Date(d.timestamp).toLocaleString()}</td>
                <td className="py-2 pr-4">{d.campaign || "General"}</td>
                <td className="py-2 pr-4">₹{Number(d.amount || 0).toLocaleString()}</td>
              </tr>
            ))}
            {(!donations || donations.length === 0) && (
              <tr>
                <td colSpan={3} className="py-3 text-center text-muted-foreground">
                  No donations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
