"use server";

import { headers } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword, verifyPassword } from "./password";
import { clearSession, createSession, getSession } from "./session";
import { generateToken, RESET_TOKEN_TTL_MS, VERIFICATION_TOKEN_TTL_MS } from "./tokens";
import {
  resetPasswordSchema,
  requestPasswordResetSchema,
  signInSchema,
  signUpSchema,
} from "./validation";
import { sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail } from "./emails";
import { rateLimit } from "./rate-limit";

export type ActionResult = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
};

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "unknown";
}

function flattenFieldErrors(
  fieldErrors: Record<string, string[] | undefined>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, messages] of Object.entries(fieldErrors)) {
    if (messages?.[0]) result[key] = messages[0];
  }
  return result;
}

export async function signUp(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };

  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error.flatten().fieldErrors) };
  }

  const key = `signup:${await clientKey()}`;
  if (!rateLimit(key, 5, 15 * 60 * 1000)) {
    return { error: "Too many attempts. Please try again later." };
  }

  await connectToDatabase();

  const existing = await User.findOne({ email: parsed.data.email });
  if (existing) {
    return { fieldErrors: { email: "An account with this email already exists." } };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const verificationToken = generateToken();

  const user = await User.create({
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash,
    emailVerified: false,
    verificationToken,
    verificationTokenExpires: new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS),
  });

  try {
    await sendVerificationEmail(user.email, user.name, verificationToken);
  } catch (err) {
    console.error("Failed to send verification email:", err);
  }

  try {
    await sendWelcomeEmail(user.email, user.name);
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }

  await createSession({ userId: user._id.toString() });

  return { success: true };
}

export async function signIn(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  const parsed = signInSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error.flatten().fieldErrors) };
  }

  const key = `signin:${await clientKey()}`;
  if (!rateLimit(key, 10, 15 * 60 * 1000)) {
    return { error: "Too many attempts. Please try again later." };
  }

  await connectToDatabase();

  const user = await User.findOne({ email: parsed.data.email }).select("+passwordHash");
  if (!user) {
    return { error: "Invalid email or password." };
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await createSession({ userId: user._id.toString() });

  return { success: true };
}

export async function signOutAction(): Promise<void> {
  await clearSession();
}

export async function requestPasswordReset(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = { email: String(formData.get("email") ?? "") };

  const parsed = requestPasswordResetSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error.flatten().fieldErrors) };
  }

  const key = `reset-request:${await clientKey()}`;
  if (!rateLimit(key, 5, 15 * 60 * 1000)) {
    return { error: "Too many attempts. Please try again later." };
  }

  await connectToDatabase();

  const user = await User.findOne({ email: parsed.data.email });
  if (user) {
    const resetToken = generateToken();
    user.resetToken = resetToken;
    user.resetTokenExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    await user.save();

    try {
      await sendPasswordResetEmail(user.email, user.name, resetToken);
    } catch (err) {
      console.error("Failed to send password reset email:", err);
    }
  }

  // Always return success — don't reveal whether the email exists.
  return { success: true };
}

export async function resetPassword(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    token: String(formData.get("token") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };

  const parsed = resetPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error.flatten().fieldErrors) };
  }

  await connectToDatabase();

  const user = await User.findOne({
    resetToken: parsed.data.token,
    resetTokenExpires: { $gt: new Date() },
  }).select("+resetToken +resetTokenExpires");

  if (!user) {
    return { error: "This reset link is invalid or has expired." };
  }

  user.passwordHash = await hashPassword(parsed.data.password);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  return { success: true };
}

export async function resendVerificationEmail(): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { error: "Not signed in." };

  const key = `resend-verify:${session.userId}`;
  if (!rateLimit(key, 3, 15 * 60 * 1000)) {
    return { error: "Too many attempts. Please try again later." };
  }

  await connectToDatabase();

  const user = await User.findById(session.userId);
  if (!user || user.emailVerified) return { error: "Unable to resend verification email." };

  const verificationToken = generateToken();
  user.verificationToken = verificationToken;
  user.verificationTokenExpires = new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS);
  await user.save();

  try {
    await sendVerificationEmail(user.email, user.name, verificationToken);
  } catch (err) {
    console.error("Failed to send verification email:", err);
    return { error: "Failed to send verification email." };
  }

  return { success: true };
}

export async function verifyEmail(token: string): Promise<ActionResult> {
  await connectToDatabase();

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: new Date() },
  }).select("+verificationToken +verificationTokenExpires");

  if (!user) {
    return { error: "This verification link is invalid or has expired." };
  }

  user.emailVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  return { success: true };
}
