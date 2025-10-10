"use client";

import { useEffect, useState } from "react";
import { useAlert } from "@/components/ui/alert-provider";

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [annaDate, setAnnaDate] = useState<string>("");
  const [annaSession, setAnnaSession] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { show } = useAlert();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/admin/me", { cache: "no-store" });
        setAuthed(res.ok);
      } catch {
        setAuthed(false);
      }
    };
    check();
  }, []);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setError(j?.error || "Login failed");
        setAuthed(false);
      } else {
        setAuthed(true);
        show({ title: "Welcome, Admin", description: "Logged in successfully.", variant: "success" });
      }
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    try { await fetch("/api/admin/logout", { method: "POST" }); } catch {}
    setAuthed(false);
    show({ title: "Logged out", description: "Admin session ended.", variant: "info" });
    if (typeof window !== "undefined") window.location.assign("/");
  };

  const download = (format: "json" | "excel" | "pdf") => {
    const params = new URLSearchParams();
    params.set("format", format);
    if (start) params.set("start", start);
    if (end) params.set("end", end);
    const url = `/api/admin/export?${params.toString()}`;
    // trigger browser download
    window.location.href = url;
  };

  const downloadAnnadanam = (format: "json" | "excel" | "pdf") => {
    const params = new URLSearchParams();
    params.set("dataset", "annadanam");
    params.set("format", format);
    if (annaDate) params.set("date", annaDate);
    if (annaSession) params.set("session", annaSession);
    const url = `/api/admin/export?${params.toString()}`;
    window.location.href = url;
  };

  if (authed === null) {
    return (
      <main className="min-h-screen grid place-items-center">
        <p className="text-sm text-muted-foreground">Checking admin session…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="min-h-screen grid place-items-center p-4">
        <form
          onSubmit={onLogin}
          className="w-full max-w-sm space-y-4 border rounded-xl p-6 shadow bg-card/70"
        >
          <h1 className="text-xl font-semibold">Admin Login</h1>
          {error && (
            <p className="text-sm text-red-600" role="alert">{error}</p>
          )}
          <div className="space-y-2">
            <label className="text-sm" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded border px-3 py-2 bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              className="w-full rounded border px-3 py-2 bg-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-black text-white py-2 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button onClick={onLogout} className="rounded border px-3 py-1.5">Logout</button>
        </div>

        <div className="rounded-xl border p-6 space-y-4 bg-card/70">
          <h2 className="font-semibold">Export Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm" htmlFor="start">Start date</label>
              <input
                id="start"
                type="date"
                className="w-full rounded border px-3 py-2 bg-background"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm" htmlFor="end">End date</label>
              <input
                id="end"
                type="date"
                className="w-full rounded border px-3 py-2 bg-background"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => download("json")} className="rounded bg-black text-white px-4 py-2">Download JSON</button>
            <button onClick={() => download("excel")} className="rounded border px-4 py-2">Download Excel</button>
            <button onClick={() => download("pdf")} className="rounded border px-4 py-2">Download PDF</button>
          </div>
          <p className="text-xs text-muted-foreground">Date filtering applies to tables with a "created_at" column.</p>
        </div>

        <div className="rounded-xl border p-6 space-y-4 bg-card/70 mt-6">
          <h2 className="font-semibold">Annadanam List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm" htmlFor="annaDate">Date</label>
              <input
                id="annaDate"
                type="date"
                className="w-full rounded border px-3 py-2 bg-background"
                value={annaDate}
                onChange={(e) => setAnnaDate(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm" htmlFor="annaSession">Timing</label>
              <select
                id="annaSession"
                className="w-full rounded border px-3 py-2 bg-background"
                value={annaSession}
                onChange={(e) => setAnnaSession(e.target.value)}
              >
                <option value="all">All Timings</option>
                <option>12:45 PM - 1:30 PM</option>
                <option>1:30 PM - 2:00 PM</option>
                <option>2:00 PM - 2:30 PM</option>
                <option>2:30 PM - 3:00 PM</option>
                <option>8:00 PM - 8:30 PM</option>
                <option>8:30 PM - 9:00 PM</option>
                <option>9:00 PM - 9:30 PM</option>
                <option>9:30 PM - 10:00 PM</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2 flex-wrap">
            <button onClick={() => downloadAnnadanam("json")} className="rounded bg-black text-white px-4 py-2">Download JSON</button>
            <button onClick={() => downloadAnnadanam("excel")} className="rounded border px-4 py-2">Download Excel</button>
            <button onClick={() => downloadAnnadanam("pdf")} className="rounded border px-4 py-2">Download PDF</button>
          </div>
          <p className="text-xs text-muted-foreground">Exports Annadanam bookings for the selected date and timing.</p>
        </div>
      </div>
    </main>
  );
}
