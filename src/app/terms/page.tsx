import Link from "next/link";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "accounts", title: "3. Accounts & Security" },
  { id: "donations", title: "4. Donations" },
  { id: "annadanam", title: "5. Annadanam Calendar & Bookings" },
  { id: "devotional", title: "6. Devotional Materials" },
  { id: "user-content", title: "7. User Content" },
  { id: "acceptable-use", title: "8. Acceptable Use" },
  { id: "privacy", title: "9. Privacy" },
  { id: "ip", title: "10. Intellectual Property" },
  { id: "links", title: "11. Third‑Party Links" },
  { id: "disclaimers", title: "12. Disclaimers" },
  { id: "liability", title: "13. Limitation of Liability" },
  { id: "changes", title: "14. Changes to Terms" },
  { id: "law", title: "15. Governing Law" },
  { id: "contact", title: "16. Contact" },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Terms & Conditions</h1>
          <div className="mt-2 mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> Last updated: 2025-09-23
          </div>
          {/* Removed Home button as requested */}
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar TOC */}
          <aside className="lg:sticky lg:top-28 self-start rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
            <h2 className="text-sm font-semibold">On this page</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {sections.map((s) => (
                <li key={s.id}>
                  <a className="hover:text-foreground" href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <section className="space-y-6">
            <div id="acceptance" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">1. Acceptance of Terms</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                By accessing or using this website and related services (including donations, calendars,
                devotional materials, and profile features), you agree to be bound by these Terms & Conditions.
                If you do not agree, please discontinue use.
              </p>
            </div>

            <div id="eligibility" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">2. Eligibility</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                You must be capable of entering into a legally binding agreement under applicable law. Parents
                or guardians are responsible for the activities of minors using the site.
              </p>
            </div>

            <div id="accounts" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">3. Accounts & Security</h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Some features require you to sign in. You are responsible for safeguarding your account.</li>
                <li>Do not share login credentials or attempt to access another user’s account.</li>
                <li>We may suspend or terminate access for suspected abuse or security risks.</li>
              </ul>
            </div>

            <div id="donations" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">4. Donations</h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Donations are voluntary contributions to support Samithi activities and community services.</li>
                <li>Unless required by law, donations are generally non‑refundable.</li>
                <li>Receipts may be issued as per applicable regulations and Samithi policy.</li>
                <li>Any gateway or verification requirements (e.g., PAN above thresholds) will be shown during donation.</li>
              </ul>
            </div>

            <div id="annadanam" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">5. Annadanam Calendar & Bookings</h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Dates and timings are indicative and may change due to temple schedules or events.</li>
                <li>Bookings are subject to availability and confirmation by temple administration.</li>
              </ul>
            </div>

            <div id="devotional" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">6. Devotional Materials</h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Devotional texts, images, videos, and flipbooks are for personal, non‑commercial use.</li>
                <li>Do not reproduce, redistribute, or modify materials without permission.</li>
              </ul>
            </div>

            <div id="user-content" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">7. User Content</h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>You may update limited profile information (e.g., name, tagline, photo) for personal use.</li>
                <li>You must not upload unlawful, infringing, or inappropriate content.</li>
                <li>By submitting content, you license us to host and display it to operate the site.</li>
              </ul>
            </div>

            <div id="acceptable-use" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">8. Acceptable Use</h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Do not interfere with or disrupt the website or services.</li>
                <li>Do not attempt to bypass security or misuse any feature.</li>
                <li>No spam, malware, scraping, or automated abuse.</li>
              </ul>
            </div>

            <div id="privacy" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">9. Privacy</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We respect your privacy. Refer to our Privacy Policy for details on how information is collected and used.
              </p>
            </div>

            <div id="ip" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">10. Intellectual Property</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                All site content (including logos, text, media, and code) is owned by the temple/its licensors unless otherwise indicated.
              </p>
            </div>

            <div id="links" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">11. Third‑Party Links</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                External links (e.g., maps, gateways, social platforms) are provided for convenience. We are not responsible for their content or policies.
              </p>
            </div>

            <div id="disclaimers" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">12. Disclaimers</h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>The services are provided on an “as is” and “as available” basis.</li>
                <li>We do not warrant uninterrupted, error‑free operation; reasonable efforts are made to keep information current.</li>
              </ul>
            </div>

            <div id="liability" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">13. Limitation of Liability</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                To the maximum extent permitted by law, we are not liable for any indirect, incidental, consequential, or special damages arising from your use of the site.
              </p>
            </div>

            <div id="changes" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">14. Changes to Terms</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We may update these Terms periodically. Continued use after changes indicates acceptance of the revised Terms.
              </p>
            </div>

            <div id="law" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">15. Governing Law</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                These Terms are governed by the applicable laws of India. Venue for disputes shall be the courts with jurisdiction over the temple’s registered location, unless required otherwise by law.
              </p>
            </div>

            <div id="contact" className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">16. Contact</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                For questions about these Terms, please contact the Samithi office:
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="font-medium">Email:</span> info@ayyappatemple.org</p>
                <p><span className="font-medium">Phone:</span> +91 99999 99999</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="rounded-md px-3 py-1.5 text-xs ring-1 ring-border hover:bg-white/5">↑ Back to top</a>
              <Link href="/" className="rounded-md px-3 py-1.5 text-xs ring-1 ring-border hover:bg-white/5">Done</Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
