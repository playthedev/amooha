"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { useCart } from "@/commerce/cart-provider";
import { useCurrency } from "@/currency/currency-provider";
import { CURRENCY_META } from "@/currency/config";
import { useT } from "@/i18n/language-provider";
import { useAuth } from "@/auth/auth-provider";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const FIELDS = [
  { key: "fullName", type: "text", autoComplete: "name", half: true },
  { key: "email", type: "email", autoComplete: "email", half: true },
  { key: "phone", type: "tel", autoComplete: "tel", half: true },
  { key: "postalCode", type: "text", autoComplete: "postal-code", half: true },
  { key: "address", type: "text", autoComplete: "street-address", half: false },
  { key: "city", type: "text", autoComplete: "address-level2", half: true },
  { key: "stateRegion", type: "text", autoComplete: "address-level1", half: true },
  { key: "country", type: "text", autoComplete: "country-name", half: false },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalInr, clear } = useCart();
  const { format, currency } = useCurrency();
  const { user, loading: authLoading } = useAuth();
  const t = useT();
  const c = t.commerce;
  const ck = c.checkout;

  const [form, setForm] = useState<Record<FieldKey, string>>({
    fullName: "", email: "", phone: "", postalCode: "",
    address: "", city: "", stateRegion: "", country: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [busy, setBusy] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  // Require sign-in before checking out — return here afterwards.
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/signin?next=/checkout");
    }
  }, [authLoading, user, router]);

  const set = (key: FieldKey, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {};
    for (const f of FIELDS) {
      if (!form[f.key].trim()) next[f.key] = ck.required;
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = ck.invalidEmail;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const lineInput = useMemo(
    () => items.map((i) => ({ slug: i.slug, variantId: i.variantId, qty: i.qty })),
    [items],
  );

  const finish = (orderId: string) => {
    clear();
    router.push(`/checkout/success?order=${encodeURIComponent(orderId)}`);
  };

  const pay = async () => {
    if (!user || !validate() || items.length === 0) return;
    setPayError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lineInput, currency, shipping: form }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Order failed");

      const ok = await loadRazorpay();
      if (!ok || !window.Razorpay) throw new Error("Could not load Razorpay");

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Amoohaa Farms",
        description: c.cart.title,
        image: "https://res.cloudinary.com/dxt8zvs77/image/upload/v1781540186/logoCreator_imagetologo_2_oovqek.jpg",
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        notes: { address: `${form.address}, ${form.city}` },
        theme: { color: "#123625" },
        handler: async (resp: RazorpayResponse) => {
          const v = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resp),
          }).then((r) => r.json());
          if (v.valid) {
            finish(v.orderId);
          } else {
            setPayError("Payment verification failed.");
            setBusy(false);
          }
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rzp.open();
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Payment failed");
      setBusy(false);
    }
  };

  if (!authLoading && !user) {
    return null;
  }

  if (items.length === 0) {
    return (
      <main
        className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center"
        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
      >
        <p className="text-2xl font-semibold text-[var(--leaf-dark)]">{ck.emptyTitle}</p>
        <Link
          href="/products"
          className="bg-[var(--wheat)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:brightness-105"
        >
          {ck.emptyCta}
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f3ec]" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-14">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--stone)] transition hover:text-[var(--leaf-dark)]"
        >
          <ArrowLeft size={14} />
          {ck.backToCart}
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-medium text-[var(--leaf-dark)] sm:text-4xl">
          {ck.title}
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)]">
              {ck.contact} · {ck.shipping}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.key} className={f.half ? "" : "sm:col-span-2"}>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--stone)]">
                    {ck[f.key]}
                  </label>
                  <input
                    type={f.type}
                    autoComplete={f.autoComplete}
                    value={form[f.key]}
                    onChange={(e) => set(f.key, e.target.value)}
                    className={`mt-1.5 w-full border bg-[#faf8f3] px-3 py-2.5 text-[14px] text-[var(--ink)] outline-none transition focus:border-[var(--leaf-dark)] ${
                      errors[f.key] ? "border-red-400" : "border-[var(--line)]"
                    }`}
                  />
                  {errors[f.key] && (
                    <span className="mt-1 block text-[11px] text-red-600">{errors[f.key]}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-lg bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)]">
              {ck.orderSummary}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.key} className="flex items-center gap-3">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-[color:rgba(18,54,37,0.05)]">
                    <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--leaf-dark)] px-1 text-[10px] font-bold text-white">
                      {item.qty}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-[var(--ink)]">
                      {item.name}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.08em] text-[var(--stone)]">
                      {item.variantLabel}
                    </span>
                  </span>
                  <span className="text-[13px] font-bold text-[var(--leaf-dark)]">
                    {format(item.priceInr * item.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-2 border-t border-[var(--line)] pt-4 text-[13px]">
              <div className="flex justify-between text-[var(--stone)]">
                <span>{ck.subtotal}</span>
                <span className="font-semibold text-[var(--ink)]">{format(subtotalInr)}</span>
              </div>
              <div className="flex justify-between text-[var(--stone)]">
                <span>{ck.shippingLabel}</span>
                <span className="font-semibold text-[var(--leaf)]">{ck.shippingFree}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between border-t border-[var(--line)] pt-3">
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--leaf-dark)]">
                  {ck.total}
                </span>
                <span className="text-[20px] font-bold text-[var(--leaf-dark)]">
                  {format(subtotalInr)}
                </span>
              </div>
              <span className="text-[11px] text-[var(--stone)]">
                {ck.currencyNote} {currency} ({CURRENCY_META[currency].name})
              </span>
            </div>

            {payError && (
              <p className="mt-3 text-[12px] text-red-600">{payError}</p>
            )}

            <button
              onClick={pay}
              disabled={busy}
              className="mt-5 flex w-full items-center justify-center gap-2 bg-[var(--leaf-dark)] py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Lock size={14} />
              {busy ? ck.processing : `${ck.payNow} · ${format(subtotalInr)}`}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[var(--stone)]">
              <ShieldCheck size={13} className="text-[var(--leaf)]" />
              {ck.payWith}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
