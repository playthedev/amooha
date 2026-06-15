"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PackageX } from "lucide-react";
import { CURRENCY_META, isCurrency } from "@/currency/config";
import { minorUnitFactor } from "@/commerce/pricing";
import { useLanguage, useT } from "@/i18n/language-provider";

type OrderLine = {
  slug: string;
  variantId: string;
  name: string;
  variantLabel: string;
  qty: number;
  unitPriceInr: number;
};

type OrderSummary = {
  id: string;
  status: "created" | "paid" | "failed";
  currency: string;
  amountMinor: number;
  subtotalInr: number;
  razorpayPaymentId: string | null;
  lines: OrderLine[];
  createdAt: string;
};

function formatAmount(amountMinor: number, currency: string): string {
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

export function OrdersList() {
  const t = useT();
  const o = t.commerce.orders;
  const { lang } = useLanguage();
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [orders, setOrders] = useState<OrderSummary[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        const data: { orders?: OrderSummary[] } = await res.json();
        if (cancelled) return;
        setOrders(data.orders ?? []);
        setState("ok");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const statusLabel = (status: OrderSummary["status"]) => {
    if (status === "paid") return o.statusPaid;
    if (status === "failed") return o.statusFailed;
    return o.statusPending;
  };

  const statusClass = (status: OrderSummary["status"]) => {
    if (status === "paid") return "bg-[color:rgba(18,54,37,0.08)] text-[var(--leaf-dark)]";
    if (status === "failed") return "bg-red-50 text-red-600";
    return "bg-amber-50 text-amber-600";
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-0">
      <h1
        className="text-[1.6rem] font-normal leading-tight text-[var(--leaf-dark)]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {o.title}
      </h1>
      <p className="mt-1.5 text-[13px] text-[var(--stone)]">{o.subtitle}</p>

      {state === "loading" && (
        <p className="mt-8 text-[13px] text-[var(--stone)]">{o.loading}</p>
      )}

      {state === "error" && (
        <p className="mt-8 text-[13px] text-red-600">{o.error}</p>
      )}

      {state === "ok" && orders.length === 0 && (
        <div className="mt-8 rounded-lg bg-white p-8 text-center shadow-sm sm:p-10">
          <PackageX size={40} className="mx-auto text-[var(--stone)]" />
          <p className="mt-4 text-[14px] text-[var(--stone)]">{o.empty}</p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center justify-center bg-[var(--leaf-dark)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            {o.browseProducts}
          </Link>
        </div>
      )}

      {state === "ok" && orders.length > 0 && (
        <ul className="mt-6 flex flex-col gap-4">
          {orders.map((order) => {
            const date = new Date(order.createdAt);
            return (
              <li key={order.id} className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--stone)]">
                      {o.orderPlaced}
                    </p>
                    <p className="mt-1 text-[13px] text-[var(--ink)]">
                      {date.toLocaleDateString(lang, { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${statusClass(order.status)}`}
                  >
                    {statusLabel(order.status)}
                  </span>
                </div>

                <ul className="mt-4 flex flex-col gap-2 border-t border-[var(--line)] pt-4 text-[13px]">
                  {order.lines.map((line, idx) => (
                    <li key={`${line.slug}-${line.variantId}-${idx}`} className="flex justify-between gap-4">
                      <span className="text-[var(--ink)]">
                        {line.name}
                        <span className="text-[var(--stone)]"> · {line.variantLabel}</span>
                        <span className="text-[var(--stone)]"> × {line.qty}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-col gap-3 border-t border-[var(--line)] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 flex-col gap-1 text-[12px] text-[var(--stone)]">
                    <span className="truncate">{o.orderId}: {order.id}</span>
                    {order.razorpayPaymentId && (
                      <span className="truncate">{o.paymentId}: {order.razorpayPaymentId}</span>
                    )}
                  </div>
                  <span className="whitespace-nowrap text-[15px] font-bold text-[var(--leaf-dark)]">
                    {formatAmount(order.amountMinor, order.currency)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
