import type { Handler } from "@netlify/functions";

export const config = {
  // 11:31 AM IST → 06:01 UTC daily
  schedule: "1 6 * * *",
};

export const handler: Handler = async () => {
  const base = process.env.URL || process.env.NEXT_PUBLIC_SITE_URL || "";
  const key = process.env.CRON_SECRET || "";
  const to = process.env.ANNADANAM_DIGEST_TO || process.env.SMTP_ADMIN_TO || process.env.SMTP_USER || process.env.SMTP_FROM || "";
  if (!base) {
    return { statusCode: 500, body: "Missing base URL (set NEXT_PUBLIC_SITE_URL or rely on Netlify URL)" };
  }
  const url = `${base.replace(/\/$/, "")}/api/annadanam/digest?window=afternoon${key ? `&key=${encodeURIComponent(key)}` : ""}${to ? `&to=${encodeURIComponent(to)}` : ""}`;
  const res = await fetch(url, { method: "GET" });
  const text = await res.text();
  return { statusCode: res.status, body: text };
};

