"use client";

import RequireAuth from "@/components/auth/require-auth";
import { useRouter } from "next/navigation";
import { GradientButton } from "@/components/ui/gradient-button";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAlert } from "@/components/ui/alert-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const START = new Date(2025, 10, 6); // Nov 6, 2025 local
const END = new Date(2026, 0, 7); // Jan 7, 2026 local

export default function PoojaBookingPage() {
  const router = useRouter();
  const { show } = useAlert();
  const [selectedDate, setSelectedDate] = useState<Date>(START);
  const [session, setSession] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { setSelectedDate(START); }, []);

  const dateIso = useMemo(() => {
    const y = selectedDate.getFullYear();
    const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const d = String(selectedDate.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [selectedDate]);

  const book = async () => {
    try {
      if (!name.trim() || !email.trim() || !session || !phone.trim()) {
        show({ title: "Missing info", description: "Please fill name, email, phone and select a session.", variant: "warning" });
        return;
      }
      setSubmitting(true);
      const supabase = getSupabaseBrowserClient();
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes?.user;
      const res = await fetch('/api/pooja/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: dateIso, session, name: name.trim(), email: email.trim(), phone: phone.trim(), user_id: user?.id || null }),
      });
      const j = await res.json();
      if (!res.ok) {
        show({ title: "Booking failed", description: j?.error || "Unable to book", variant: "error" });
        return;
      }
      show({ title: "Pooja booked", description: `${dateIso} • ${session}`, variant: "success" });
      setSession("");
    } catch (e: any) {
      show({ title: "Booking failed", description: e?.message || "Unexpected error", variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RequireAuth>
      <main className="min-h-[60vh] w-full flex items-start justify-center px-6 pt-24 pb-16">
        <div className="w-full max-w-4xl space-y-8">
          <header className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Pooja Booking</h1>
            <p className="mt-2 text-muted-foreground">Booking window: 6 Nov 2025 – 7 Jan 2026. Sessions: 10:30 AM and 6:30 PM.</p>
          </header>

          <section className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold mb-3">Select Date</h2>
                <Card>
                  <CardContent className="p-4">
                    <div className="max-h-[360px] overflow-y-auto sm:max-h-none">
                      <Calendar
                        selected={selectedDate}
                        onSelect={(d) => d && d >= START && d <= END && setSelectedDate(d)}
                        disabled={(d) => d < START || d > END}
                        className="rounded-lg border-0"
                        fromDate={START}
                        toDate={END}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-3">Your Details</h2>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required autoComplete="name" autoCapitalize="words" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" inputMode="email" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" required autoComplete="tel" inputMode="tel" pattern="^\+?[0-9]{10,15}$" />
                  </div>
                  <div className="space-y-1">
                    <Label>Session</Label>
                    <select className="w-full rounded-md border border-border bg-background p-3 text-base" value={session} onChange={(e) => setSession(e.target.value)} required aria-label="Select session">
                      <option value="">Select a session</option>
                      <option value="10:30 AM">Morning — 10:30 AM</option>
                      <option value="6:30 PM">Evening — 6:30 PM</option>
                    </select>
                  </div>
                  <div className="pt-4 flex justify-center">
                    <GradientButton
                      variant="pooja"
                      onClick={book}
                      disabled={submitting}
                      aria-busy={submitting}
                      className="w-full sm:w-auto"
                    >
                      {submitting ? "Booking…" : "Book Now"}
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </RequireAuth>
  );
}
