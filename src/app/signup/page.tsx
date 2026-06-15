"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, type ActionResult } from "@/auth/actions";
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

export default function SignUpPage() {
  const t = useT();
  const a = t.auth;
  const router = useRouter();
  const { refresh } = useAuth();

  const [state, formAction, pending] = useActionState(signUp, initialState);

  useEffect(() => {
    if (state.success) {
      refresh().then(() => {
        router.push("/account");
      });
    }
  }, [state.success, refresh, router]);

  return (
    <AuthCard title={a.signUpTitle} subtitle={a.signUpSubtitle}>
      {state.error && <AuthAlert kind="error">{state.error}</AuthAlert>}

      <form action={formAction} className="flex flex-col gap-4">
        <AuthField label={a.name} error={state.fieldErrors?.name}>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            className={state.fieldErrors?.name ? authInputErrorClass : authInputClass}
          />
        </AuthField>

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
            autoComplete="new-password"
            required
            error={!!state.fieldErrors?.password}
          />
          {!state.fieldErrors?.password && (
            <span className="mt-1 block text-[11px] text-[var(--stone)]">{a.passwordHint}</span>
          )}
        </AuthField>

        <AuthField label={a.confirmPassword} error={state.fieldErrors?.confirmPassword}>
          <PasswordInput
            name="confirmPassword"
            autoComplete="new-password"
            required
            error={!!state.fieldErrors?.confirmPassword}
          />
        </AuthField>

        <AuthSubmitButton pending={pending} label={a.createAccount} pendingLabel={a.submitting} />
      </form>

      <p className="mt-5 text-center text-[12.5px] text-[var(--stone)]">
        {a.haveAccount}{" "}
        <Link href="/signin" className="font-semibold text-[var(--leaf-dark)] hover:underline">
          {a.signIn}
        </Link>
      </p>
    </AuthCard>
  );
}
