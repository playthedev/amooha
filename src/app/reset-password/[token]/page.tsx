"use client";

import { useActionState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { resetPassword, type ActionResult } from "@/auth/actions";
import { useT } from "@/i18n/language-provider";
import {
  AuthAlert,
  AuthCard,
  AuthField,
  AuthSubmitButton,
  PasswordInput,
} from "@/components/auth-card";

const initialState: ActionResult = {};

export default function ResetPasswordPage() {
  const t = useT();
  const a = t.auth;
  const params = useParams<{ token: string }>();

  const [state, formAction, pending] = useActionState(resetPassword, initialState);

  return (
    <AuthCard title={a.resetTitle} subtitle={a.resetSubtitle}>
      {state.success ? (
        <>
          <AuthAlert kind="success">{a.resetSuccess}</AuthAlert>
          <p className="text-center text-[12.5px] text-[var(--stone)]">
            <Link href="/signin" className="font-semibold text-[var(--leaf-dark)] hover:underline">
              {a.signIn}
            </Link>
          </p>
        </>
      ) : (
        <>
          {state.error && (
            <>
              <AuthAlert kind="error">{state.error}</AuthAlert>
              <p className="mb-4 text-center text-[12.5px] text-[var(--stone)]">
                <Link href="/forgot-password" className="font-semibold text-[var(--leaf-dark)] hover:underline">
                  {a.requestNewLink}
                </Link>
              </p>
            </>
          )}

          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="token" value={params.token} />

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

            <AuthSubmitButton pending={pending} label={a.resetSubmit} pendingLabel={a.submitting} />
          </form>
        </>
      )}
    </AuthCard>
  );
}
