"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resendVerificationEmail } from "@/auth/actions";
import { useAuth, type AuthUser } from "@/auth/auth-provider";
import { useT } from "@/i18n/language-provider";
import { AuthAlert } from "@/components/auth-card";

export function AccountPanel({ user }: { user: AuthUser }) {
  const t = useT();
  const a = t.auth;
  const router = useRouter();
  const { signOut, refresh } = useAuth();

  const [resending, setResending] = useState(false);
  const [resendResult, setResendResult] = useState<"sent" | "error" | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const handleResend = async () => {
    setResending(true);
    setResendResult(null);
    const res = await resendVerificationEmail();
    setResendResult(res.success ? "sent" : "error");
    setResending(false);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    await refresh();
    router.push("/");
  };

  const memberSince = new Date(user.createdAt);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-0">
      <h1
        className="text-[1.6rem] font-normal leading-tight text-[var(--leaf-dark)]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {a.accountTitle}
      </h1>
      <p className="mt-1.5 text-[13px] text-[var(--stone)]">{a.accountSubtitle}</p>

      <div className="mt-6 rounded-lg bg-white p-6 shadow-sm sm:p-8">
        <dl className="flex flex-col gap-4 text-[14px]">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--stone)]">
              {a.name}
            </dt>
            <dd className="text-[var(--ink)]">{user.name}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--stone)]">
              {a.email}
            </dt>
            <dd className="text-[var(--ink)]">{user.email}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--stone)]">
              {a.memberSince}
            </dt>
            <dd className="text-[var(--ink)]">
              {memberSince.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--stone)]">
              {user.emailVerified ? a.emailVerified : a.emailUnverified}
            </dt>
            {!user.emailVerified && (
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-[12px] font-semibold text-[var(--leaf-dark)] hover:underline disabled:opacity-60"
              >
                {a.resendVerification}
              </button>
            )}
          </div>
        </dl>

        {resendResult === "sent" && (
          <div className="mt-4">
            <AuthAlert kind="success">{a.verificationSent}</AuthAlert>
          </div>
        )}
        {resendResult === "error" && (
          <div className="mt-4">
            <AuthAlert kind="error">{a.genericError}</AuthAlert>
          </div>
        )}

        <Link
          href="/account/orders"
          className="mt-6 flex h-11 w-full items-center justify-center border border-[var(--leaf-dark)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)] transition-all hover:bg-[color:rgba(18,54,37,0.06)]"
          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
          {t.commerce.orders.title}
        </Link>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="mt-3 flex h-11 w-full items-center justify-center bg-[var(--leaf-dark)] text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
          {a.signOut}
        </button>
      </div>
    </div>
  );
}
