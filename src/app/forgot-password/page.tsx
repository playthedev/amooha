"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordReset, type ActionResult } from "@/auth/actions";
import { useT } from "@/i18n/language-provider";
import {
  AuthAlert,
  AuthCard,
  AuthField,
  AuthSubmitButton,
  authInputClass,
  authInputErrorClass,
} from "@/components/auth-card";

const initialState: ActionResult = {};

export default function ForgotPasswordPage() {
  const t = useT();
  const a = t.auth;

  const [state, formAction, pending] = useActionState(requestPasswordReset, initialState);

  return (
    <AuthCard title={a.forgotTitle} subtitle={a.forgotSubtitle}>
      {state.success ? (
        <AuthAlert kind="success">{a.resetRequestSent}</AuthAlert>
      ) : (
        <>
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

            <AuthSubmitButton pending={pending} label={a.sendResetLink} pendingLabel={a.submitting} />
          </form>
        </>
      )}

      <p className="mt-5 text-center text-[12.5px] text-[var(--stone)]">
        <Link href="/signin" className="font-semibold text-[var(--leaf-dark)] hover:underline">
          {a.backToSignIn}
        </Link>
      </p>
    </AuthCard>
  );
}
