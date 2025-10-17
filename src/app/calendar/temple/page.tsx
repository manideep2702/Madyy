import RequireAuth from "@/components/auth/require-auth";

export default function Page() {
  const schedule = [
    {
      period: "Dec 2024",
      event: "Mandala Pooja",
      opening: "26/12/2024",
      closing: "27/12/2024",
      notes: "",
    },
    {
      period: "Jan 2025",
      event: "Makaravilakku Day",
      opening: "14/01/2025",
      closing: "14/01/2025",
      notes: "Peak crowd expected",
    },
    {
      period: "Feb 2025",
      event: "Monthly Pooja — Kumbham",
      opening: "12/02/2025",
      closing: "17/02/2025",
      notes: "",
    },
    {
      period: "Aug 2025",
      event: "Monthly Pooja — Chingam",
      opening: "16/08/2025",
      closing: "21/08/2025",
      notes: "",
    },
    {
      period: "Sep 2025",
      event: "Special Pooja (Onam Season)",
      opening: "03/09/2025",
      closing: "07/09/2025",
      notes: "",
    },
    {
      period: "Oct 2025",
      event: "Sree Chitra Atta Thirunal",
      opening: "21/10/2025",
      closing: "21/10/2025",
      notes: "",
    },
    {
      period: "Nov–Dec 2025",
      event: "Mandala Pooja Mahotsavam",
      opening: "16/11/2025",
      closing: "27/12/2025",
      notes: "Extended timings on peak days",
    },
    {
      period: "Dec 2025",
      event: "Mandala Pooja (Closing)",
      opening: "27/12/2025",
      closing: "27/12/2025",
      notes: "",
    },
    {
      period: "Jan 2026",
      event: "Makaravilakku Day",
      opening: "14/01/2026",
      closing: "14/01/2026",
      notes: "",
    },
  ];

  const TABLE_HEAD = ["Period", "Event", "Opens", "Closes", "Notes"] as const;

  return (
    <RequireAuth>
      <div className="mx-auto max-w-5xl p-6 md:p-10 pt-24 md:pt-28">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Ayyappa Temple Calander</h1>
        <p className="text-sm text-muted-foreground">
          Extracted from the official schedule image. Typical darshan hours are 5:00 AM to 10:00 PM;
          peak festival days may extend. Please verify with the Samithi.
        </p>
        <div className="mt-3">
          <a
            href="/temple.png"
            target="_blank"
            rel="noreferrer"
            className="text-xs underline text-muted-foreground hover:text-foreground"
          >
            View source image
          </a>
        </div>

        {/* Table styled similar to Material Tailwind demo */}
        <section className="mt-6 rounded-2xl border border-border bg-card/70 shadow-sm overflow-hidden">
          <div className="px-6 pt-6">
            <h2 className="text-lg font-semibold">Schedule (2024–2026)</h2>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[700px] w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-border bg-muted/60 p-4"
                    >
                      <span className="text-xs font-medium leading-none tracking-wide text-muted-foreground">
                        {head}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map(({ period, event, opening, closing, notes }, index) => {
                  const isLast = index === schedule.length - 1;
                  const cell = isLast ? "p-4" : "p-4 border-b border-border";

                  return (
                    <tr key={`${period}-${event}`} className="text-sm">
                      <td className={`${cell} font-medium text-foreground`}>{period}</td>
                      <td className={cell}>{event}</td>
                      <td className={cell}>{opening}</td>
                      <td className={cell}>{closing}</td>
                      <td className={cell}>{notes || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="h-4" />
        </section>
      </div>
    </RequireAuth>
  );
}
