import { randomBytes } from "crypto";

/** Generates a URL-safe random token for email verification / password reset links. */
export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
export const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour
