"use client";

import { useEffect, useMemo, useState } from "react";
import RequireAuth from "@/components/auth/require-auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GradientButton } from "@/components/ui/gradient-button";
import { CalendarDays, Clock, HeartHandshake } from "lucide-react";

type VolunteerEntry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  session: "Morning" | "Evening";
  role: string;
  note?: string;
  timestamp: string;
};

export default function VolunteerPage() {
  const season = { start: "November 5th", end: "January 7th" };
  const sessions = [
    { name: "Morning" as const, time: "12:30 – 2:30 pm" },
    { name: "Evening" as const, time: "8:30 – 10:00 pm" },
  ];

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [session, setSession] = useState<"Morning" | "Evening">("Morning");
  const [role, setRole] = useState("Annadanam Service");
  const [note, setNote] = useState("");
  const [list] = useState<VolunteerEntry[]>([]);
  const [savedId, setSavedId] = useState<string | null>(null);

  const submit = () => {
    if (!name || !email || !phone || !date || !session) {
      alert("Please fill Name, Email, Phone, Date, and Session.");
      return;
    }
    const entry: VolunteerEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      email,
      phone,
      date,
      session,
      role,
      note: note.trim() || undefined,
      timestamp: new Date().toISOString(),
    };
    setSavedId(entry.id);
    // lightweight reset
    setDate("");
    setSession("Morning");
    setNote("");
    alert("Thank you! Your volunteer interest is noted.");
  };

  const recent = useMemo(() => list.slice(-5).reverse(), [list]);

  return (
    <RequireAuth>
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/b2.jpeg')" }} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-700/50 via-amber-800/40 to-background/90" />
          <div className="mx-auto max-w-5xl px-6 pt-28 pb-14 text-center">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-black/40 px-4 py-2 text-white ring-1 ring-white/20 backdrop-blur">
              <HeartHandshake size={18} /> Volunteer for Samithi Seva
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">Contribute Your Time & Service</h1>
            <p className="mt-3 text-white/90 md:text-lg">
              Join our annadanam and temple service teams. Choose a day and session that works for you.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto w-full max-w-5xl px-6 pb-16 space-y-8">
          {/* Timings */}
          <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold">Fixed Timings</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Annadanam season runs from <span className="font-medium text-foreground">{season.start}</span> to {" "}
              <span className="font-medium text-foreground">{season.end}</span>.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[360px] w-full text-sm">
                <thead>
                  <tr className="text-left text-foreground">
                    <th className="py-2 pr-4">Session</th>
                    <th className="py-2 pr-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.name} className="border-t border-border text-muted-foreground">
                      <td className="py-2 pr-4 font-medium text-foreground">{s.name}</td>
                      <td className="py-2 pr-4">{s.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold">Volunteer Sign‑Up</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="v-name">Full Name</Label>
                <Input id="v-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="v-email">Email</Label>
                <Input id="v-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="v-phone">Phone</Label>
                <Input id="v-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9xxxxxxxxx" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="v-date">Preferred Date</Label>
                <Input id="v-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="v-session">Session</Label>
                <select
                  id="v-session"
                  value={session}
                  onChange={(e) =>
                    setSession(e.target.value === "Morning" ? "Morning" : "Evening")
                  }
                  className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm ring-1 ring-border focus:ring-2 focus:outline-none"
                >
                  {sessions.map((s) => (
                    <option key={s.name} value={s.name}>{s.name} — {s.time}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="v-role">Preferred Role</Label>
                <select
                  id="v-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl bg_white/5 px-4 py-3 text-sm ring-1 ring-border focus:ring-2 focus:outline-none"
                >
                  <option>Annadanam Service</option>
                  <option>Kitchen/Preparation</option>
                  <option>Prasadam Distribution</option>
                  <option>Cleaning & Maintenance</option>
                  <option>Crowd Management</option>
                  <option>Administration/Desk</option>
                </select>
              </div>
              <div className="md:col-span-2 grid gap-1.5">
                <Label htmlFor="v-note">Notes (optional)</Label>
                <Textarea id="v-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Any additional info…" />
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <GradientButton onClick={submit} className="min-w-[220px]">
                Submit Volunteer Request
              </GradientButton>
            </div>
          </div>

          {/* Recent sign‑ups list removed (no demo storage). */}
        </section>
      </main>
    </RequireAuth>
  );
}
