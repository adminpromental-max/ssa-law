import { cookies } from "next/headers";
import crypto from "crypto";
import { readDb, updateDb } from "@/lib/db";
import { hashPassword, verifyPasswordHash } from "@/lib/password";

const SESSION_COOKIE = "ssa_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24;

function getSecret(): string {
  return process.env.ADMIN_SECRET || "ssa-law-change-me-in-production";
}

function getEnvPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export async function verifyPassword(password: string): Promise<boolean> {
  try {
    const db = await readDb();
    if (db.adminPasswordHash) {
      return verifyPasswordHash(password, db.adminPasswordHash);
    }
  } catch {
    // fallback to env
  }

  const expected = getEnvPassword();
  try {
    if (password.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  if (newPassword.length < 8) {
    return { success: false, error: "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل" };
  }

  if (!(await verifyPassword(currentPassword))) {
    return { success: false, error: "كلمة المرور الحالية غير صحيحة" };
  }

  await updateDb((db) => {
    db.adminPasswordHash = hashPassword(newPassword);
  });

  return { success: true };
}

export function createSessionToken(): string {
  const token = crypto.randomBytes(32).toString("hex");
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(token)
    .digest("hex");
  return `${token}.${sig}`;
}

export function verifySessionToken(value: string): boolean {
  const parts = value.split(".");
  if (parts.length !== 2) return false;
  const [token, sig] = parts;
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(token)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function setSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session?.value) return false;
  return verifySessionToken(session.value);
}
