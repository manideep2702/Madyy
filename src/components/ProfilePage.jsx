"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Pencil, HeartHandshake, Banknote, Phone, Mail, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

// Design tokens removed; using site theme classes

function ProfileCard({ profile, onEditClick, stats }) {
  const { name, designation, tagline, imageUrl, social } = profile;
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

          <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
            {social?.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook profile"
                className="p-2 rounded-full bg-white/10 text-foreground shadow hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07C1.86 17.09 5.52 21.14 10.3 22v-7.02H7.72v-2.9h2.58V9.69c0-2.55 1.52-3.96 3.85-3.96 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.79-1.68 1.6v1.92h2.85l-.45 2.9h-2.4V22c4.78-.86 8.44-4.9 8.44-9.93z" />
                </svg>
              </a>
            )}
            {social?.whatsapp && (
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp chat"
                className="p-2 rounded-full bg-white/10 text-foreground shadow hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M19.11 17.13c-.32-.16-1.85-.9-2.14-1.01-.29-.11-.5-.16-.71.16-.21.32-.82 1.01-1 1.22-.18.21-.36.24-.68.08-.32-.16-1.34-.5-2.55-1.59-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.36.47-.54.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.97-2.34-.26-.62-.52-.53-.71-.53-.18 0-.4-.02-.61-.02-.21 0-.56.08-.86.4-.29.32-1.13 1.1-1.13 2.68 0 1.58 1.16 3.11 1.32 3.33.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.47.21 2.03.13.62-.09 1.85-.76 2.12-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37z" />
                  <path d="M27.66 4.35C24.79 1.48 21.03 0 17.05 0 8.56 0 1.57 6.97 1.57 15.52c0 2.74.72 5.43 2.09 7.82L2 32l8.86-2.31c2.31 1.26 4.92 1.94 7.62 1.94h.01c8.48 0 15.47-6.97 15.47-15.52 0-3.96-1.55-7.69-4.3-10.46zM17.49 29.1h-.01c-2.39 0-4.74-.64-6.8-1.85l-.49-.29-5.25 1.37 1.4-5.11-.32-.52c-1.29-2.1-1.98-4.52-1.98-7.01 0-7.36 5.99-13.34 13.35-13.34 3.56 0 6.9 1.39 9.41 3.91 2.51 2.52 3.89 5.9 3.88 9.48-.01 7.35-6 13.36-13.39 13.36z" />
                </svg>
              </a>
            )}
            {social?.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram profile"
                className="p-2 rounded-full bg-white/10 text-foreground shadow hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm11 1.5a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </a>
            )}
          </div>
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

function DetailBlock({ title, children }) {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-4 shadow-sm min-h-[120px]">
      <h3 className="text-sm font-semibold mb-2 text-foreground">
        {title}
      </h3>
      <div className="text-sm space-y-1 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function DetailsGrid({ details, social }) {
  return (
    <section aria-labelledby="details-grid-title">
      <h2
        id="details-grid-title"
        className="sr-only"
      >
        Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <DetailBlock title="Associated Since">
          <p>{details?.associatedSince}</p>
        </DetailBlock>
        <DetailBlock title="Roles & Responsibilities">
          <ul className="list-disc pl-5 space-y-1">
            {details?.roles?.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </DetailBlock>
        <DetailBlock title="Contact">
          {details?.contact?.phone && (
            <p>
              <span className="inline-flex items-center gap-2 font-medium text-foreground">
                <Phone size={14} /> Phone:
              </span>{" "}
              <a
                href={`tel:${details.contact.phone}`}
                className="underline decoration-dotted"
                aria-label="Call phone number"
              >
                {details.contact.phone}
              </a>
            </p>
          )}
          {details?.contact?.email && (
            <p>
              <span className="inline-flex items-center gap-2 font-medium text-foreground">
                <Mail size={14} /> Email:
              </span>{" "}
              <a
                href={`mailto:${details.contact.email}`}
                className="underline decoration-dotted"
                aria-label="Send email"
              >
                {details.contact.email}
              </a>
            </p>
          )}
        </DetailBlock>
        <DetailBlock title="Location">
          <p className="inline-flex items-center gap-2"><MapPin size={14} className="text-foreground" /> {details?.location}</p>
        </DetailBlock>
        <DetailBlock title="Social Links">
          <div className="flex flex-wrap gap-2">
            {social?.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-foreground ring-1 ring-border hover:bg-white/20 transition"
              >
                Facebook
              </a>
            )}
            {social?.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-foreground ring-1 ring-border hover:bg-white/20 transition"
              >
                Instagram
              </a>
            )}
            {social?.whatsapp && (
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-foreground ring-1 ring-border hover:bg-white/20 transition"
              >
                WhatsApp
              </a>
            )}
          </div>
        </DetailBlock>
      </div>
    </section>
  );
}

// Support CTA removed per request

const mockProfile = {
  name: "",
  designation: "",
  tagline: "",
  imageUrl: "",
  social: {},
  bioParagraphs: [],
  highlights: [],
  details: {
    associatedSince: "",
    roles: [],
    contact: { phone: "", email: "" },
    location: "",
  },
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
            videoUrl: data.video_url || prev.videoUrl,
            highlights: Array.isArray(data.highlights) ? data.highlights : prev.highlights,
            details: {
              ...prev.details,
              email: data.email || prev.details?.email,
              location: data.location || prev.details?.location,
              phone: data.phone || prev.details?.phone,
              associatedSince: data.associated_since || prev.details?.associatedSince,
              roles: Array.isArray(data.roles) ? data.roles : prev.details?.roles,
            },
            social: {
              ...(prev.social || {}),
              facebook: data.social_facebook || prev.social?.facebook,
              instagram: data.social_instagram || prev.social?.instagram,
              whatsapp: data.social_whatsapp || prev.social?.whatsapp,
            },
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

        <DetailsGrid details={profileData.details} social={profileData.social} />

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
