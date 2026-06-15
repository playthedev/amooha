"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { verifyEmail, type ActionResult } from "@/auth/actions";
import { useAuth } from "@/auth/auth-provider";
import { useT } from "@/i18n/language-provider";
import { AuthAlert, AuthCard } from "@/components/auth-card";

export default function VerifyEmailPage() {
  const t = useT();
  const a = t.auth;
  const params = useParams<{ token: string }>();
  const { refresh } = useAuth();

  const [result, setResult] = useState<ActionResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    verifyEmail(params.token).then((res) => {
      if (cancelled) return;
      setResult(res);
      if (res.success) refresh();
    });
    return () => {
      cancelled = true;
    };
  }, [params.token, refresh]);

  return (
    <AuthCard title={a.verifyTitle}>
      {!result && <p className="text-[13px] text-[var(--stone)]">{a.verifyPending}</p>}

      {result?.success && (
        <>
          <AuthAlert kind="success">{a.verifySuccess}</AuthAlert>
          <p className="text-center text-[12.5px] text-[var(--stone)]">
            <Link href="/account" className="font-semibold text-[var(--leaf-dark)] hover:underline">
              {a.goToAccount}
            </Link>
          </p>
        </>
      )}

      {result?.error && (
        <>
          <AuthAlert kind="error">{a.verifyInvalid}</AuthAlert>
          <p className="text-center text-[12.5px] text-[var(--stone)]">
            <Link href="/account" className="font-semibold text-[var(--leaf-dark)] hover:underline">
              {a.goToAccount}
            </Link>
          </p>
        </>
      )}
    </AuthCard>
  );
}
