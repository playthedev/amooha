"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Coins } from "lucide-react";
import { useCurrency } from "@/currency/currency-provider";
import { CURRENCIES, CURRENCY_META, type CurrencyCode } from "@/currency/config";

export function CurrencyToggle({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: CurrencyCode) => {
    setCurrency(code);
    setOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select currency"
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--leaf-dark)] transition-colors hover:border-[var(--wheat)] hover:bg-[color:rgba(18,54,37,0.04)]"
      >
        <Coins size={13} className="text-[var(--stone)]" aria-hidden />
        {currency}
        <ChevronDown
          size={13}
          className={`text-[var(--stone)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-[80] mt-2 max-h-[60vh] min-w-[210px] overflow-auto rounded-md border border-[var(--line)] bg-[var(--paper)] py-1 shadow-xl shadow-green-950/15"
        >
          {CURRENCIES.map((code) => {
            const active = code === currency;
            const meta = CURRENCY_META[code];
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => choose(code)}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-[color:rgba(18,54,37,0.06)] ${
                    active
                      ? "font-bold text-[var(--wheat-deep)]"
                      : "font-medium text-[var(--ink)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-9 shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--stone)]">
                      {code}
                    </span>
                    <span>{meta.name}</span>
                  </span>
                  {active && <Check size={15} className="text-[var(--wheat-deep)]" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
