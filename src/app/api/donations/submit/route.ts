import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MailAttachment = { filename: string; content: Buffer; contentType?: string };

async function sendSMTP({ to, subject, html, attachments }: { to: string; subject: string; html: string; attachments?: MailAttachment[] }) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpSecure = (process.env.SMTP_SECURE ?? "true").toLowerCase() !== "false";
  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error("SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS");
  }
  const from = process.env.SMTP_FROM || smtpUser;

  const nodemailer = (await import("nodemailer")).default as any;
  const primary = {
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  } as const;
  try {
    const transporter = nodemailer.createTransport(primary);
    return await transporter.sendMail({ from, to, subject, html, bcc: process.env.SMTP_BCC, attachments });
  } catch (err) {
    if (String(smtpHost).includes("smtp.gmail.com")) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: 587,
        secure: false,
        requireTLS: true,
        auth: { user: smtpUser, pass: smtpPass },
        tls: { minVersion: "TLSv1.2" },
      });
      return await transporter.sendMail({ from, to, subject, html, bcc: process.env.SMTP_BCC, attachments });
    }
    throw err;
  }
}

function htmlEscape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]!));
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const address = String(form.get("address") || "").trim();
    const amountStr = String(form.get("amount") || "").trim();
    const screenshot = form.get("screenshot");

    const amount = parseInt(amountStr, 10);
    if (!name || !email || !phone || !Number.isFinite(amount) || amount <= 0 || !(screenshot instanceof File)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const shotArrayBuf = await (screenshot as File).arrayBuffer();
    const shotBuf = Buffer.from(shotArrayBuf);
    const stamp = new Date();
    const whenIST = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(stamp);

    // Build emails
    const orgName = process.env.ORG_NAME || "Sabari Sastha Samithi";
    const adminEmail = process.env.DONATION_ADMIN_EMAIL || "info@sabarisastha.org";

    const userSubject = `${orgName} — Donation Received`;
    const userHtml = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #111;">
        <h2 style="margin: 0 0 12px;">Thank you for your donation!</h2>
        <p>Dear ${htmlEscape(name)},</p>
        <p>We have received your donation details.</p>
        <ul>
          <li><strong>Amount:</strong> ₹${amount.toLocaleString("en-IN")}</li>
          <li><strong>Date:</strong> ${whenIST} (IST)</li>
          <li><strong>Email:</strong> ${htmlEscape(email)}</li>
          <li><strong>Phone:</strong> ${htmlEscape(phone)}</li>
          ${address ? `<li><strong>Address:</strong> ${htmlEscape(address)}</li>` : ""}
        </ul>
        <p>We will verify the payment and share a GST-compliant invoice to your email within 3–5 working days.</p>
        <p>Warm regards,<br/>${orgName}</p>
      </div>
    `;

    const adminSubject = `${orgName} — New Donation: ₹${amount.toLocaleString("en-IN")} from ${name}`;
    const adminHtml = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #111;">
        <h2 style="margin: 0 0 12px;">New Donation Submission</h2>
        <ul>
          <li><strong>Name:</strong> ${htmlEscape(name)}</li>
          <li><strong>Email:</strong> ${htmlEscape(email)}</li>
          <li><strong>Phone:</strong> ${htmlEscape(phone)}</li>
          <li><strong>Amount:</strong> ₹${amount.toLocaleString("en-IN")}</li>
          <li><strong>Date:</strong> ${whenIST} (IST)</li>
          ${address ? `<li><strong>Address:</strong> ${htmlEscape(address)}</li>` : ""}
        </ul>
        <p>Payment screenshot attached.</p>
      </div>
    `;

    const attachments: MailAttachment[] = [
      { filename: `payment_screenshot_${Date.now()}.png`, content: shotBuf, contentType: (screenshot as File).type || "image/png" },
    ];

    await sendSMTP({ to: email, subject: userSubject, html: userHtml });
    await sendSMTP({ to: adminEmail, subject: adminSubject, html: adminHtml, attachments });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/donations/submit error", err);
    return new NextResponse(err?.message || "Internal error", { status: 500 });
  }
}

