"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-0">
      <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
        <h1
          className="text-[1.4rem] font-normal leading-tight text-[var(--leaf-dark)]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-[13px] text-[var(--stone)]">{subtitle}</p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function AuthField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--stone)]">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-[11px] text-red-600">{error}</span>}
    </div>
  );
}

export const authInputClass =
  "w-full border bg-[#faf8f3] px-3 py-2.5 text-[14px] text-[var(--ink)] outline-none transition focus:border-[var(--leaf-dark)] border-[var(--line)]";

export const authInputErrorClass =
  "w-full border bg-[#faf8f3] px-3 py-2.5 text-[14px] text-[var(--ink)] outline-none transition focus:border-[var(--leaf-dark)] border-red-400";

export function PasswordInput({
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`${className ?? (error ? authInputErrorClass : authInputClass)} pr-10`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-[var(--stone)] transition hover:text-[var(--leaf-dark)]"
        tabIndex={-1}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

export function AuthSubmitButton({
  pending,
  label,
  pendingLabel,
}: {
  pending: boolean;
  label: string;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 flex h-11 w-full items-center justify-center bg-[var(--leaf-dark)] text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export function AuthAlert({ kind, children }: { kind: "error" | "success"; children: ReactNode }) {
  return (
    <div
      className={`mb-4 border px-3 py-2.5 text-[12.5px] ${
        kind === "error"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-[var(--leaf-soft)] bg-[var(--forest-wash)] text-[var(--leaf-dark)]"
      }`}
    >
      {children}
    </div>
  );
}
