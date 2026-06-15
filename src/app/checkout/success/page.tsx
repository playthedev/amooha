"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { CURRENCY_META, isCurrency } from "@/currency/config";
import { minorUnitFactor } from "@/commerce/pricing";
import { useT } from "@/i18n/language-provider";

type OrderResponse = {
  order?: {
    id: string;
    status: "created" | "paid" | "failed";
    currency: string;
    amountMinor: number;
    razorpayPaymentId: string | null;
  };
  error?: string;
};

function formatPaid(amountMinor: number, currency: string): string {
  if (!isCurrency(currency)) return String(amountMinor);
  const meta = CURRENCY_META[currency];
  const major = amountMinor / minorUnitFactor(currency);
  try {
    return new Intl.NumberFormat(meta.locale, {
      style: "currency",
      currency,
      maximumFractionDigits: meta.fractionDigits,
      minimumFractionDigits: meta.fractionDigits,
    }).format(major);
  } catch {
    return `${meta.symbol}${major.toFixed(meta.fractionDigits)}`;
  }
}

function SuccessInner() {
  const params = useSearchParams();
  const s = useT().commerce.success;

  const orderId = params.get("order") ?? "";
  const [state, setState] = useState<"loading" | "ok" | "error">(orderId ? "loading" : "error");
  const [order, setOrder] = useState<OrderResponse["order"] | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;

    // The order may still show "created" if we land here without the
    // client-side verify handler having run (e.g. back/forward navigation).
    // Each fetch asks the server to reconcile against Razorpay, so retry a
    // few times with backoff before settling on "pending".
    const attempt = async (n: number) => {
      try {
        const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, { cache: "no-store" });
        const data: OrderResponse = await res.json();
        if (cancelled) return;
        if (!data.order) {
          setState("error");
          return;
        }
        setOrder(data.order);
        setState("ok");
        if (data.order.status === "created" && n < 3) {
          setTimeout(() => attempt(n + 1), 1500 * (n + 1));
        }
      } catch {
        if (!cancelled) setState("error");
      }
    };

    attempt(0);
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (state === "loading") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f3ec] px-4 py-16">
        <p className="text-[14px] text-[var(--stone)]">…</p>
      </main>
    );
  }

  if (state === "error" || !order) {
    return (
      <main
        className="flex min-h-[70vh] items-center justify-center bg-[#f7f3ec] px-4 py-16"
        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
      >
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-sm sm:p-10">
          <XCircle size={56} className="mx-auto text-red-500" />
          <h1 className="mt-5 font-serif text-3xl font-medium text-[var(--leaf-dark)]">
            {s.notFoundTitle}
          </h1>
          <p className="mt-2 text-[14px] text-[var(--stone)]">{s.notFoundBody}</p>
          <Link
            href="/products"
            className="mt-7 flex w-full items-center justify-center bg-[var(--leaf-dark)] py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
          >
            {s.continue}
          </Link>
        </div>
      </main>
    );
  }

  const isPaid = order.status === "paid";

  return (
    <main
      className="flex min-h-[70vh] items-center justify-center bg-[#f7f3ec] px-4 py-16"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-sm sm:p-10">
        {isPaid ? (
          <CheckCircle2 size={56} className="mx-auto text-[var(--leaf)]" />
        ) : (
          <XCircle size={56} className="mx-auto text-amber-500" />
        )}
        <h1 className="mt-5 font-serif text-3xl font-medium text-[var(--leaf-dark)]">
          {isPaid ? s.title : s.pendingTitle}
        </h1>
        <p className="mt-2 text-[14px] text-[var(--stone)]">
          {isPaid ? s.subtitle : s.pendingSubtitle}
        </p>

        <dl className="mt-6 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-left text-[13px]">
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--stone)]">{s.orderId}</dt>
            <dd className="truncate font-semibold text-[var(--ink)]">{order.id}</dd>
          </div>
          {order.razorpayPaymentId && (
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--stone)]">{s.paymentId}</dt>
              <dd className="truncate font-semibold text-[var(--ink)]">{order.razorpayPaymentId}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--stone)]">{s.amountPaid}</dt>
            <dd className="font-bold text-[var(--leaf-dark)]">
              {formatPaid(order.amountMinor, order.currency)}
            </dd>
          </div>
        </dl>

        <Link
          href="/products"
          className="mt-7 flex w-full items-center justify-center bg-[var(--leaf-dark)] py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
        >
          {s.continue}
        </Link>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessInner />
    </Suspense>
  );
}
