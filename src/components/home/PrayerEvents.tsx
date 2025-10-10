"use client";

import React from "react";

function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 96C32 88 52 68 60 40C64 26 74 14 88 8"
        stroke="#F0A34B"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M8 92C28 84 44 68 52 48" stroke="#F5C16E" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function FrameCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-amber-200 bg-white shadow-md p-6 md:p-8 overflow-hidden transition-shadow hover:shadow-lg">
      {/* corners */}
      <Corner className="pointer-events-none absolute -left-2 -top-2 h-20 w-20" />
      <Corner className="pointer-events-none absolute -right-2 -bottom-2 h-20 w-20 rotate-180" />

      {/* soft inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 300px at 50% -10%, rgba(240,163,75,0.06), transparent 70%)",
        }}
      />

      <h2 className="relative text-center text-[22px] md:text-2xl font-extrabold tracking-wide text-indigo-900">
        {title.toUpperCase()}
      </h2>
      <div className="relative mt-5">{children}</div>
    </div>
  );
}

function AyyappaPrayer() {
  const ml = [
    "അമലില ഭുവന ദീപം ഭക്ത ചിത്താന്തർസൂരം",
    "സുരഗണ പരിസേവ്യo തത്തമമധ്യാതി ലക്ഷ്യം",
    "ഹരിഹര സുതമീശം താരകബ്രഹ്മ രൂപം",
    "ശബരിഗിരി നിലയം ഭവയേത് ഭൂതനാഥo",
  ];
  const sa = [
    "अखिल भुवन दीपम भक्त चित्तांतर सूरं",
    "सुरगण परिसेव्यम् तत्त्वमस्यादि लक्ष्यं",
    "हरिहर सुतनामेशं तारक ब्रह्म रूपं",
    "शबरी गिरि निवासम् भावयेत् भूतनाथम् |",
  ];
  return (
    <FrameCard title="Ayyappa Prayer">
      <div className="space-y-4 text-center">
        {ml.map((l, i) => (
          <p key={`ml-${i}`} className="text-sm md:text-base text-neutral-700">
            {l}
          </p>
        ))}
        <div className="my-2" />
        {sa.map((l, i) => (
          <p key={`sa-${i}`} className="text-sm md:text-base text-neutral-700">
            {l}
          </p>
        ))}

        <div className="mt-6 flex items-center justify-center">
          <div className="w-full max-w-xs rounded-full bg-neutral-100 p-2 ring-1 ring-amber-200">
            {/* Prayer audio */}
            <audio aria-label="Ayyappa prayer audio" controls preload="none" controlsList="nodownload noplaybackrate" className="w-full">
              <source src="/audio/ayyappa" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </FrameCard>
  );
}

function UpcomingEvents() {
  const rows = [
    { session: "Morning", time: "12:30 to 2:30 pm" },
    { session: "Evening", time: "8:30 to 10:00 pm" },
  ];
  return (
    <FrameCard title="Annadanam Sessions">
      <div className="text-center">
        <p className="text-sm text-neutral-700">Daily seva slots during Annadanam season</p>

        <div className="mt-5 mx-auto w-full max-w-md overflow-hidden rounded-xl border border-amber-200">
          <table className="w-full text-sm">
            <thead className="bg-amber-50/70">
              <tr className="text-left text-indigo-900">
                <th className="py-2 px-4">Session</th>
                <th className="py-2 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={r.session} className={idx % 2 ? "bg-white" : "bg-amber-50/30"}>
                  <td className="py-2 px-4 font-medium text-indigo-900">{r.session}</td>
                  <td className="py-2 px-4 text-neutral-700">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="/calendar/annadanam"
            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs ring-1 ring-amber-300 text-indigo-900 hover:bg-amber-50"
          >
            Annadanam Calendar
          </a>
          <a
            href="/volunteer"
            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs ring-1 ring-amber-300 text-indigo-900 hover:bg-amber-50"
          >
            Volunteer
          </a>
        </div>
      </div>
    </FrameCard>
  );
}

export default function PrayerEventsSection() {
  return (
    <section className="relative w-full bg-black">
      {/* top saffron glow */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-6 h-16 bg-gradient-to-b from-amber-500/25 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AyyappaPrayer />
          <UpcomingEvents />
        </div>
      </div>
    </section>
  );
}
