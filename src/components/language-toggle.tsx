"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { LOCALES, LOCALE_LABELS, LOCALE_NAMES, type Locale } from "@/i18n/config";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
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

  const choose = (code: Locale) => {
    setLang(code);
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
        aria-label="Select language"
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--leaf-dark)] transition-colors hover:border-[var(--wheat)] hover:bg-[color:rgba(18,54,37,0.04)]"
      >
        <Globe size={13} className="text-[var(--stone)]" aria-hidden />
        {LOCALE_LABELS[lang]}
        <ChevronDown
          size={13}
          className={`text-[var(--stone)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-[80] mt-2 min-w-[170px] overflow-hidden rounded-md border border-[var(--line)] bg-[var(--paper)] py-1 shadow-xl shadow-green-950/15"
        >
          {LOCALES.map((code) => {
            const active = code === lang;
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
                  {LOCALE_NAMES[code]}
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
