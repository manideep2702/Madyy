import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_COOKIE = "ayya_admin_auth";

function getEnvAdminCreds() {
  const email = process.env.ADMIN_EMAIL || "Adminssss@ayyappa.com";
  const password = process.env.ADMIN_PASSWORD || "Ayyappa@123";
  return { email, password };
}

function getSecret() {
  // Prefer a dedicated secret; safe fallback to Supabase service key
  return (
    process.env.ADMIN_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "dev-secret"
  );
}

export function makeSessionToken(email: string, password: string) {
  const secret = getSecret();
  const h = crypto.createHmac("sha256", secret);
  h.update(`${email}:${password}`);
  return h.digest("hex");
}

export function validateAdminLogin(email: string, password: string) {
  const { email: e, password: p } = getEnvAdminCreds();
  return email === e && password === p;
}

export function setAdminCookie() {
  const { email, password } = getEnvAdminCreds();
  const token = makeSessionToken(email, password);
  const oneDay = 60 * 60 * 24;
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: oneDay,
  });
}

export function clearAdminCookie() {
  cookies().set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function isAdminAuthed() {
  const val = cookies().get(ADMIN_COOKIE)?.value;
  if (!val) return false;
  const { email, password } = getEnvAdminCreds();
  const expected = makeSessionToken(email, password);
  return crypto.timingSafeEqual(Buffer.from(val), Buffer.from(expected));
}

