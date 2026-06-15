"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import { useAuth } from "@/auth/auth-provider";
import { useT } from "@/i18n/language-provider";

export function AccountMenu({ className }: { className?: string }) {
  const t = useT();
  const a = t.auth;
  const router = useRouter();
  const { user, loading, signOut, refresh } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (loading) {
    return <span className={`inline-flex h-7 w-7 ${className ?? ""}`} aria-hidden="true" />;
  }

  if (!user) {
    return (
      <Link
        href="/signin"
        className={`inline-flex h-7 items-center justify-center px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)] ${className ?? ""}`}
        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
      >
        {a.signIn}
      </Link>
    );
  }

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    await refresh();
    router.push("/");
  };

  return (
    <div className={`relative ${className ?? ""}`} ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center text-[var(--leaf-dark)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)]"
        aria-label={a.myAccount}
        aria-expanded={open}
      >
        <CircleUserRound size={18} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 w-44 border border-[var(--line)] bg-[var(--paper)] shadow-lg"
          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
          <div className="border-b border-[var(--line)] px-4 py-3">
            <p className="truncate text-[12px] font-semibold text-[var(--ink)]">{user.name}</p>
            <p className="truncate text-[11px] text-[var(--stone)]">{user.email}</p>
          </div>
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--ink)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)]"
          >
            {a.myAccount}
          </Link>
          <Link
            href="/account/orders"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--ink)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)]"
          >
            {t.commerce.orders.title}
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--ink)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)]"
          >
            {a.signOut}
          </button>
        </div>
      )}
    </div>
  );
}
