"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, HandCoins, BookOpenText, MapPin, Users, Images as ImagesIcon } from "lucide-react";

// FeaturesPage.jsx
// Devotional, calm, trustworthy features overview for the Sree Sabari Sastha Seva Samithi (SSSSS) site
// - Uses mock/static data only. Replace sections marked with "Dynamic data" when integrating APIs.

const MONTHS = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CATEGORIES = ["All", "Pooja", "Festival"];

// Mock calendar data — Dynamic data: replace with real calendar feed
const EVENTS = [
  { title: "Makaravilakku Pooja", date: "2025-01-14", month: "January", category: "Festival" },
  { title: "Monthly Ayyappa Pooja", date: "2025-02-02", month: "February", category: "Pooja" },
  { title: "Mandala Pooja", date: "2025-12-27", month: "December", category: "Festival" },
  { title: "Sahasranama Archana", date: "2025-03-08", month: "March", category: "Pooja" },
];

export default function FeaturesPage() {
  const [month, setMonth] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return EVENTS.filter((e) =>
      (month === "All" || e.month === month) &&
      (category === "All" || e.category === category)
    ).slice(0, 4);
  }, [month, category]);

  return (
    <section className="w-full bg-[#FFF8E7] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <header className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A]">
            Samithi Features
          </h2>
          <p className="mt-2 text-[#0F172A]/70">
            Explore services, resources, and ways to connect with the Samithi.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Samithi Calendar Integration */}
          <div className="group rounded-2xl bg-white border border-[#0F172A]/10 shadow-sm hover:shadow-md transition p-5">
            <CardHeader icon={<CalendarDays className="h-6 w-6" />} title="Samithi Calendar" />
            <div className="mt-3 flex gap-2">
              <select
                className="flex-1 rounded-lg border border-[#0F172A]/15 bg-white px-3 py-2 text-sm text-[#0F172A]"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                aria-label="Filter by month"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                className="rounded-lg border border-[#0F172A]/15 bg-white px-3 py-2 text-sm text-[#0F172A]"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Filter by category"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-[#0F172A]">
              {filtered.map((e) => (
                <li key={`${e.title}-${e.date}`} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#D4AF37]" />
                  <span>
                    <span className="font-medium">{e.title}</span>
                    <span className="text-[#0F172A]/60"> — {e.date}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="#" className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white bg-[#0F172A] hover:bg-[#0c1328]">
                View Calendar
              </Link>
            </div>
          </div>

          {/* Donation System */}
          <div className="group rounded-2xl bg-white border border-[#0F172A]/10 shadow-sm hover:shadow-md transition p-5">
            <CardHeader icon={<HandCoins className="h-6 w-6" />} title="Donation System" />
            <ul className="mt-3 space-y-2 text-sm text-[#0F172A]">
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#FF9933]" /> Safe, secure UPI/Netbanking</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#FF9933]" /> Recurring donation option</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#FF9933]" /> Instant confirmation & GST-ready receipts</li>
            </ul>
            <div className="mt-4">
              <Link href="/donate" className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white bg-[#D4AF37] hover:brightness-95">
                Donate Now
              </Link>
            </div>
          </div>

          {/* Devotional Resources */}
          <div className="group rounded-2xl bg-white border border-[#0F172A]/10 shadow-sm hover:shadow-md transition p-5">
            <CardHeader icon={<BookOpenText className="h-6 w-6" />} title="Devotional Resources" />
            {/* Expandable sections — Dynamic data: populate from CMS or files */}
            <div className="mt-3 space-y-3 text-sm text-[#0F172A]">
              <details className="rounded-lg border border-[#0F172A]/10 bg-[#FFF8E7] p-3 open:shadow-sm">
                <summary className="cursor-pointer font-medium">Harivarasanam Lyrics</summary>
                <p className="mt-2 text-[#0F172A]/70">Available in English, Tamil, Telugu.</p>
                <p className="mt-1 text-[#0F172A]/70">Sample: “Harivarasanam Viswamohanam...”</p>
              </details>
              <details className="rounded-lg border border-[#0F172A]/10 bg-[#FFF8E7] p-3 open:shadow-sm">
                <summary className="cursor-pointer font-medium">108 Sarana Gosham</summary>
                <p className="mt-2 text-[#0F172A]/70">“Swamiye Saranam Ayyappa” repetitions with guidance.</p>
              </details>
              <details className="rounded-lg border border-[#0F172A]/10 bg-[#FFF8E7] p-3 open:shadow-sm">
                <summary className="cursor-pointer font-medium">Slokas & Mantras</summary>
                <p className="mt-2 text-[#0F172A]/70">Short daily prayers; more coming soon.</p>
              </details>
            </div>
            <div className="mt-4">
              <Link href="#" className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-[#0F172A] border border-[#0F172A]/20 hover:bg-[#FFF8E7]">
                View All Resources
              </Link>
            </div>
          </div>

          {/* Pilgrimage Assistance */}
          <div className="group rounded-2xl bg-white border border-[#0F172A]/10 shadow-sm hover:shadow-md transition p-5">
            <CardHeader icon={<MapPin className="h-6 w-6" />} title="Pilgrimage Assistance" />
            <ul className="mt-3 space-y-2 text-sm text-[#0F172A]">
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#D4AF37]" /> Virtual Queue booking guidance</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#D4AF37]" /> Accommodation tips & local contacts</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#D4AF37]" /> “How to Reach” summary</li>
            </ul>
            <div className="mt-4">
              <Link href="/sabarimala/how-to-reach" className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white bg-[#0F172A] hover:bg-[#0c1328]">
                Get Directions
              </Link>
            </div>
          </div>

          {/* Community Engagement */}
          <div className="group rounded-2xl bg-white border border-[#0F172A]/10 shadow-sm hover:shadow-md transition p-5">
            <CardHeader icon={<Users className="h-6 w-6" />} title="Community Engagement" />
            <ul className="mt-3 space-y-2 text-sm text-[#0F172A]">
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#FF9933]" /> Announcements & Samithi news</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#FF9933]" /> Volunteer/Seva opportunities</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#FF9933]" /> Donor support wall (preview)</li>
            </ul>
            <div className="mt-4">
              <Link href="#" className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-[#0F172A] border border-[#0F172A]/20 hover:bg-[#FFF8E7]">
                Volunteer Sign-up
              </Link>
            </div>
          </div>

          {/* Media */}
          <div className="group rounded-2xl bg-white border border-[#0F172A]/10 shadow-sm hover:shadow-md transition p-5">
            <CardHeader icon={<ImagesIcon className="h-6 w-6" />} title="Media Gallery" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              {/* Dynamic data: replace with media gallery thumbnails */}
              <MediaThumb src="/temple.png" alt="Samithi" />
              <MediaThumb src="/front.jpeg" alt="Samithi front" />
              <MediaThumb src="/b2.jpeg" alt="Pooja" />
            </div>
            <div className="mt-4">
              <Link href="/gallery" className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white bg-[#D4AF37] hover:brightness-95">
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardHeader({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A]/5 text-[#D4AF37]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#0F172A]">{title}</h3>
    </div>
  );
}

function MediaThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#0F172A]/10 bg-[#0F172A]/5 p-1">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 33vw, 200px"
        className="object-contain"
      />
    </div>
  );
}
