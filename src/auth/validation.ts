import { z } from "zod";

const email = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .max(254)
  .email("Enter a valid email address.")
  .transform((v) => v.toLowerCase());

const password = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128)
  .regex(/[a-z]/, "Password must include a lowercase letter.")
  .regex(/[A-Z]/, "Password must include an uppercase letter.")
  .regex(/[0-9]/, "Password must include a number.");

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required.").max(120),
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Password is required."),
});

export const requestPasswordResetSchema = z.object({
  email,
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
