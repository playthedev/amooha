"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/commerce/cart-provider";
import { useCurrency } from "@/currency/currency-provider";
import { useT } from "@/i18n/language-provider";

export default function CartPage() {
  const { items, count, subtotalInr, setQty, remove, clear } = useCart();
  const { format } = useCurrency();
  const c = useT().commerce;

  const itemsLabel = count === 1 ? c.cart.itemsOne : c.cart.itemsOther;

  return (
    <main
      className="min-h-[70vh] bg-[#f7f3ec]"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-14">
        <h1 className="font-serif text-3xl font-medium text-[var(--leaf-dark)] sm:text-4xl">
          {c.cart.title}
        </h1>

        {items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-5 rounded-lg bg-white py-20 text-center shadow-sm">
            <ShoppingBag size={44} className="text-[var(--line)]" />
            <p className="text-[15px] text-[var(--stone)]">{c.cart.empty}</p>
            <Link
              href="/products"
              className="bg-[var(--wheat)] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:brightness-105"
            >
              {c.cart.emptyCta}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Lines */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[var(--stone)]">
                  {count} {itemsLabel}
                </span>
                <button
                  onClick={clear}
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--stone)] transition hover:text-red-600"
                >
                  {c.cart.clear}
                </button>
              </div>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li
                    key={item.key}
                    className="flex gap-4 rounded-lg bg-white p-4 shadow-sm"
                  >
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-[color:rgba(18,54,37,0.05)]"
                    >
                      <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={`/products/${item.slug}`}
                          className="text-[15px] font-semibold text-[var(--leaf-dark)] hover:underline"
                        >
                          {item.name}
                        </Link>
                        <span className="text-[15px] font-bold text-[var(--leaf-dark)]">
                          {format(item.priceInr * item.qty)}
                        </span>
                      </div>
                      <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--stone)]">
                        {item.variantLabel} · {format(item.priceInr)} {c.each}
                      </span>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center border border-[var(--line)]">
                          <button
                            onClick={() => setQty(item.key, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-9 w-9 items-center justify-center text-[var(--leaf-dark)] transition hover:bg-[color:rgba(18,54,37,0.06)]"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-[14px] font-semibold text-[var(--ink)]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setQty(item.key, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="flex h-9 w-9 items-center justify-center text-[var(--leaf-dark)] transition hover:bg-[color:rgba(18,54,37,0.06)]"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(item.key)}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--stone)] transition hover:text-red-600"
                        >
                          <Trash2 size={14} />
                          {c.cart.remove}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary */}
            <aside className="h-fit rounded-lg bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)]">
                {c.checkout.orderSummary}
              </h2>
              <div className="mt-4 flex items-center justify-between border-b border-[var(--line)] pb-4">
                <span className="text-[13px] text-[var(--stone)]">{c.cart.subtotal}</span>
                <span className="text-[15px] font-bold text-[var(--leaf-dark)]">
                  {format(subtotalInr)}
                </span>
              </div>
              <p className="mt-3 text-[12px] text-[var(--stone)]">{c.cart.shippingNote}</p>
              <Link
                href="/checkout"
                className="mt-5 flex w-full items-center justify-center gap-2 bg-[var(--leaf-dark)] py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
              >
                {c.cart.checkout}
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/products"
                className="mt-2 flex w-full items-center justify-center py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--stone)] transition hover:text-[var(--leaf-dark)]"
              >
                {c.cart.continue}
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
