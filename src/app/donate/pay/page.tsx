"use client";

import { useState } from "react";
import RequireAuth from "@/components/auth/require-auth";
import { GradientButton } from "@/components/ui/gradient-button";
import Link from "next/link";

export default function DonatePayPage() {
  const [paidAmount, setPaidAmount] = useState<string>("");
  const [paymentShot, setPaymentShot] = useState<File | null>(null);

  async function submitDonation() {
    const amt = parseInt(paidAmount, 10);
    if (!Number.isFinite(amt) || amt <= 0) {
      alert("Please enter the amount you paid.");
      return;
    }
    if (!paymentShot) {
      alert("Please upload the payment screenshot.");
      return;
    }
    if (paymentShot.size > 5 * 1024 * 1024) {
      alert("Screenshot is too large. Maximum allowed size is 5MB.");
      return;
    }
    alert(`Thank you! We received your details for ₹${amt}. We will verify and send the receipt by email.`);
    setPaidAmount("");
    setPaymentShot(null);
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-background text-foreground">
        <section className="mx-auto w-full max-w-4xl px-6 pt-10 pb-10">
          <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h1 className="text-xl md:text-2xl font-semibold">Pay via QR</h1>
              <Link href="/donate" className="text-sm underline underline-offset-2">Back to Donor Details</Link>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Scan the QR with your UPI app to complete the payment. After paying, enter the paid amount and upload the payment screenshot.</p>

            <div className="mt-5 flex flex-col items-center gap-3">
              <img src="/payment.png" alt="Payment QR" className="w-[260px] h-[260px] rounded-lg ring-1 ring-border bg-white object-contain" />
              <span className="text-xs text-muted-foreground">Accepted on major UPI apps</span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block text-left">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">Donation Amount *</span>
                <input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter amount paid"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm ring-1 ring-border placeholder:text-muted-foreground focus:ring-2 focus:outline-none"
                />
              </label>

              <FileInput
                label="Payment Screenshot (required)"
                file={paymentShot}
                onChange={setPaymentShot}
                required
                accept="image/*"
              />
            </div>

            <div className="mt-6 flex justify-center">
              <GradientButton onClick={submitDonation}>
                Submit Donation Details
              </GradientButton>
            </div>
          </div>
        </section>
      </div>
    </RequireAuth>
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

