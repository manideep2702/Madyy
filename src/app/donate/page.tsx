"use client";

import { useMemo, useState } from "react";
import { ShieldCheck, BadgeCheck, FileText, Phone, Mail, MapPin, HeartHandshake } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import RequireAuth from "@/components/auth/require-auth";

export default function DonatePage() {
  // Psychological pricing: 99-ending amounts
  const preset = [249, 499, 999] as const;
  const [amount, setAmount] = useState<number | null>(preset[0]);
  const [custom, setCustom] = useState<string>("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [panFile, setPanFile] = useState<File | null>(null);
  const [address, setAddress] = useState("");

  const finalAmount = useMemo(() => {
    const v = custom.trim() !== "" ? Number(custom) : amount ?? 0;
    return isFinite(v) ? v : 0;
  }, [amount, custom]);

  const requirePan = finalAmount >= 1999; // PAN card upload required for ₹1999 and above

  async function proceed() {
    if (!finalAmount || finalAmount < 1) {
      alert("Please enter a valid amount.");
      return;
    }
    if (!name || !email || !phone) {
      alert("Please fill Name, Email and Phone.");
      return;
    }
    if (requirePan && !panFile) {
      alert("PAN card upload is required for donations of ₹1999 and above.");
      return;
    }
    if (panFile && panFile.size > 5 * 1024 * 1024) {
      alert("PAN file is too large. Maximum allowed size is 5MB.");
      return;
    }
    try {
      const hasSupabaseEnv = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      if (!hasSupabaseEnv) {
        // If auth is not configured, still ask to sign in per requirement
        const next = `/donate?amount=${finalAmount}`;
        window.location.assign(`/sign-in?next=${encodeURIComponent(next)}`);
        return;
      }
      const { getSupabaseBrowserClient } = await import("@/lib/supabase/client");
      const supabase = getSupabaseBrowserClient();
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes?.user;
      if (!user) {
        const params = new URLSearchParams();
        params.set("amount", String(finalAmount));
        const next = `/donate?${params.toString()}`;
        window.location.assign(`/sign-in?next=${encodeURIComponent(next)}`);
        return;
      }
      alert(`Thank you, ${name}! Proceeding with donation of ₹${finalAmount}.`);
      // TODO: integrate payment gateway here
    } catch {
      // Fallback: ask sign-in
      const next = `/donate?amount=${finalAmount}`;
      window.location.assign(`/sign-in?next=${encodeURIComponent(next)}`);
    }
  }

  return (
    <RequireAuth>
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/b1.jpeg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-700/50 via-amber-800/40 to-background/90" />

        <div className="mx-auto max-w-5xl px-6 pt-28 pb-14 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-black/40 px-4 py-2 text-white ring-1 ring-white/20 backdrop-blur">
            <HeartHandshake size={18} /> Support Annadanam & Samithi Services
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Support Annadanam & Samithi Services.
          </h1>
          <p className="mt-3 text-white/90 md:text-lg">
            Every contribution sustains daily poojas, annadanam, and community programs of the Samithi.
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-white/90">
            <Badge icon={<ShieldCheck size={16} />} label="Nonprofit Verified" />
            <Badge icon={<BadgeCheck size={16} />} label="Contact Verified" />
            <Badge icon={<FileText size={16} />} label="GST Receipts Available" />
          </div>
        </div>
      </section>

      {/* Donation options */}
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold">Choose an amount</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {preset.map((v) => (
              <button
                key={v}
                onClick={() => {
                  setAmount(v);
                  setCustom("");
                }}
                aria-pressed={amount === v && custom === ""}
                className={`min-w-[110px] rounded-xl px-5 py-3 text-base font-medium ring-1 transition-all focus:outline-none focus:ring-2 ${
                  amount === v && custom === ""
                    ? "bg-amber-600 text-white ring-amber-600"
                    : "bg-white/5 ring-border hover:bg-white/10"
                }`}
              >
                ₹{v}
              </button>
            ))}

            <div className="relative">
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Custom"
                value={custom}
                onChange={(e) => {
                  setCustom(e.target.value.replace(/[^0-9]/g, ""));
                  setAmount(null);
                }}
                onBlur={() => {
                  if (!custom) return;
                  const n = parseInt(custom, 10);
                  if (!Number.isFinite(n)) return;
                  const fixed = n < 99 ? 99 : Math.floor(n / 100) * 100 + 99;
                  setCustom(String(fixed));
                }}
                className="w-[160px] rounded-xl bg-white/5 pl-8 pr-4 py-3 text-base ring-1 ring-border placeholder:text-muted-foreground focus:ring-2 focus:outline-none"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">₹</span>
            </div>
          </div>

          {/* Purpose selection removed as requested */}

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <GradientButton onClick={proceed} className="min-w-[220px] text-[17px]">
              Proceed to Donate
            </GradientButton>
          </div>

          {/* Volunteer alternative */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Prefer contributing your time? <a href="/volunteer" className="underline underline-offset-2">Volunteer for Seva</a>
          </div>
        </div>
      </section>

      {/* Donor details */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-10">
        <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Donor details</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Full Name" value={name} onChange={setName} required />
            <Input label="Email" type="email" value={email} onChange={setEmail} required />
            <FileInput
              label={requirePan ? "Upload PAN Card (₹1999+)" : "Upload PAN Card (optional)"}
              file={panFile}
              onChange={setPanFile}
              required={requirePan}
              accept="image/*,application/pdf"
            />
            <div className="md:col-span-2">
              <Input label="Address" value={address} onChange={setAddress} />
            </div>
          </div>
          <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            <p>Receipts will be GST-compliant and emailed within 3–7 working days.</p>
            <p>PAN card (image or PDF) is required for donations of ₹1999 and above. Max file size 5MB.</p>
          </div>
          <div className="mt-6 flex justify-center">
            <GradientButton onClick={proceed}>
              Proceed to Donate
            </GradientButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-16">
        <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">FAQs</h3>
          <FAQ q="Can I get a refund?" a="Donations are generally non-refundable. If you made a mistake, please contact the Samithi office within 24 hours and we will assist you." />
          <FAQ q="Is my data secure?" a="Your details are used only for receipts and donor communication. We do not share personal data with third parties." />
          <FAQ q="When will I receive the receipt?" a="GST-compliant receipts are emailed within 3–7 working days." />
        </div>
      </section>

      {/* Footer */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-20">
        <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
          <div className="grid gap-4 text-sm md:grid-cols-3">
            <div className="flex items-center gap-2"><Phone size={16} /> <span>Samithi Office: <a href="tel:+919999999999" className="underline underline-offset-2">+91 99999 99999</a></span></div>
            <div className="flex items-center gap-2"><Mail size={16} /> <span>Email: <a href="mailto:info@ayyappatemple.org" className="underline underline-offset-2">info@ayyappatemple.org</a></span></div>
            <div className="flex items-center gap-2"><MapPin size={16} /> <a href="https://maps.app.goo.gl/GZNWGfypJUWTbh6L7" target="_blank" rel="noreferrer" className="underline underline-offset-2">View on Maps</a></div>
          </div>
        </div>
      </section>
    </div>
    </RequireAuth>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-xs ring-1 ring-white/20 backdrop-blur">
      {icon} {label}
    </span>
  );
}

function Input({ label, value, onChange, type = "text", required = false }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-left">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}{required ? " *" : ""}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        required={required}
        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm ring-1 ring-border placeholder:text-muted-foreground focus:ring-2 focus:outline-none"
      />
    </label>
  );
}

function FileInput({ label, file, onChange, required = false, accept = "*/*" }: {
  label: string;
  file: File | null;
  onChange: (f: File | null) => void;
  required?: boolean;
  accept?: string;
}) {
  const id = `file-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="text-left">
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-muted-foreground">
        {label}{required ? " *" : ""}
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        required={required}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        className="w-full cursor-pointer rounded-xl bg-white/5 px-4 py-2.5 text-sm ring-1 ring-border file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:text-foreground hover:file:bg-white/20 focus:ring-2 focus:outline-none"
      />
      {file && (
        <p className="mt-1 text-xs text-muted-foreground truncate">Selected: {file.name}</p>
      )}
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-t border-border py-4 first:border-t-0">
      <summary className="cursor-pointer list-none text-left text-sm font-medium">
        <span className="inline-block transition-colors group-open:text-foreground">{q}</span>
      </summary>
      <p className="mt-2 text-sm text-muted-foreground">{a}</p>
    </details>
  );
}
