"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/commerce/cart-provider";
import { useCurrency } from "@/currency/currency-provider";
import { useT } from "@/i18n/language-provider";

export function CartDrawer() {
  const { items, count, subtotalInr, setQty, remove, open, setOpen } = useCart();
  const { format } = useCurrency();
  const t = useT().commerce;

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, setOpen]);

  if (!open) return null;

  const itemsLabel = count === 1 ? t.cart.itemsOne : t.cart.itemsOther;

  return (
    <div
      className="fixed inset-0 z-[90]"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      <div
        className="absolute inset-0 bg-[var(--ink)]/45 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <aside className="absolute right-0 top-0 flex h-full w-[88vw] max-w-[420px] flex-col bg-[var(--paper)] shadow-2xl">
        {/* Header */}
        <div className="flex h-[72px] items-center justify-between border-b border-[var(--line)] px-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-[var(--leaf-dark)]" />
            <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)]">
              {t.cart.title}
            </span>
            {count > 0 && (
              <span className="text-[11px] font-medium text-[var(--stone)]">
                {count} {itemsLabel}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--leaf-dark)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <ShoppingBag size={40} className="text-[var(--line)]" />
            <p className="text-[14px] text-[var(--stone)]">{t.cart.empty}</p>
            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="bg-[var(--wheat)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition-all hover:brightness-105"
            >
              {t.cart.emptyCta}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li
                    key={item.key}
                    className="flex gap-3 border-b border-[var(--line)] pb-4 last:border-0"
                  >
                    <span className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-[color:rgba(18,54,37,0.05)]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <span className="truncate text-[13px] font-semibold text-[var(--ink)]">
                          {item.name}
                        </span>
                        <button
                          onClick={() => remove(item.key)}
                          aria-label={t.cart.remove}
                          className="shrink-0 text-[var(--stone)] transition-colors hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--stone)]">
                        {item.variantLabel}
                      </span>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[var(--line)]">
                          <button
                            onClick={() => setQty(item.key, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center text-[var(--leaf-dark)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)]"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-[12px] font-semibold text-[var(--ink)]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setQty(item.key, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center text-[var(--leaf-dark)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)]"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="text-[13px] font-bold text-[var(--leaf-dark)]">
                          {format(item.priceInr * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-[var(--line)] px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--stone)]">
                  {t.cart.subtotal}
                </span>
                <span className="text-[18px] font-bold text-[var(--leaf-dark)]">
                  {format(subtotalInr)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[var(--stone)]">
                {t.cart.shippingNote}
              </p>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="mt-4 flex w-full items-center justify-center bg-[var(--leaf-dark)] py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:brightness-110"
              >
                {t.cart.checkout}
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="mt-2 w-full py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--stone)] transition-colors hover:text-[var(--leaf-dark)]"
              >
                {t.cart.continue}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
