"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, type ActionResult } from "@/auth/actions";
import { useAuth } from "@/auth/auth-provider";
import { useT } from "@/i18n/language-provider";
import {
  AuthAlert,
  AuthCard,
  AuthField,
  AuthSubmitButton,
  authInputClass,
  authInputErrorClass,
  PasswordInput,
} from "@/components/auth-card";

const initialState: ActionResult = {};

export function SignInForm() {
  const t = useT();
  const a = t.auth;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuth();

  const [state, formAction, pending] = useActionState(signIn, initialState);

  useEffect(() => {
    if (state.success) {
      refresh().then(() => {
        const next = searchParams.get("next");
        router.push(next && next.startsWith("/") ? next : "/account");
      });
    }
  }, [state.success, refresh, router, searchParams]);

  return (
    <AuthCard title={a.signInTitle} subtitle={a.signInSubtitle}>
      {state.error && <AuthAlert kind="error">{state.error}</AuthAlert>}

      <form action={formAction} className="flex flex-col gap-4">
        <AuthField label={a.email} error={state.fieldErrors?.email}>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className={state.fieldErrors?.email ? authInputErrorClass : authInputClass}
          />
        </AuthField>

        <AuthField label={a.password} error={state.fieldErrors?.password}>
          <PasswordInput
            name="password"
            autoComplete="current-password"
            required
            error={!!state.fieldErrors?.password}
          />
        </AuthField>

        <div className="flex justify-end text-[12px]">
          <Link href="/forgot-password" className="text-[var(--leaf-dark)] hover:underline">
            {a.forgotPassword}
          </Link>
        </div>

        <AuthSubmitButton pending={pending} label={a.submitSignIn} pendingLabel={a.submitting} />
      </form>

      <p className="mt-5 text-center text-[12.5px] text-[var(--stone)]">
        {a.noAccount}{" "}
        <Link href="/signup" className="font-semibold text-[var(--leaf-dark)] hover:underline">
          {a.signUp}
        </Link>
      </p>
    </AuthCard>
  );
}
