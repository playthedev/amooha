"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/commerce/cart-provider";

export function CartButton({ className = "" }: { className?: string }) {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open cart"
      className={`relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[var(--leaf-dark)] transition-colors hover:border-[var(--wheat)] hover:bg-[color:rgba(18,54,37,0.04)] ${className}`}
    >
      <ShoppingBag size={15} aria-hidden />
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--wheat-deep)] px-1 text-[10px] font-bold leading-none text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
