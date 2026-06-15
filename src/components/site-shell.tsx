"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Globe, Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Dictionary, Locale } from "@/lib/i18n";

interface ShellProps {
  lang: Locale;
  dict: Dictionary;
}

/* ── language switcher ── */
function LangSwitcher({ lang, dict }: ShellProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function switchLang(next: Locale) {
    // Replace /en/... with /fr/... etc.
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
    setOpen(false);
  }

  const langs: { code: Locale; label: string }[] = [
    { code: "en", label: dict.language.en },
    { code: "fr", label: dict.language.fr },
    { code: "es", label: dict.language.es },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 4,
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "var(--stone)",
          background: "none", border: "none", cursor: "pointer",
          padding: "4px 6px", transition: "color .2s",
        }}
        aria-label={dict.language.label}
      >
        <Globe size={13} />
        {lang.toUpperCase()}
        <ChevronDown size={11} />
      </button>
      {open && (
        <div style={{
          position: "absolute", right: 0, top: "calc(100% + 6px)", zIndex: 100,
          background: "var(--paper)", border: "1px solid var(--line)",
          boxShadow: "0 8px 28px rgba(18,54,37,0.12)", minWidth: 130,
        }}>
          {langs.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => switchLang(code)}
              style={{
                display: "block", width: "100%", padding: "9px 14px", textAlign: "left",
                fontFamily: "'Josefin Sans', sans-serif", fontSize: "10px",
                fontWeight: code === lang ? 800 : 600, letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: code === lang ? "var(--leaf-dark)" : "var(--stone)",
                background: code === lang ? "rgba(18,54,37,0.06)" : "transparent",
                border: "none", cursor: "pointer", transition: "background .15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HEADER
───────────────────────────────────────────────────────────── */
export function SiteHeader({ lang, dict }: ShellProps) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const pathname = usePathname();

  const navItems = [
    { href: `/${lang}/introduction`, label: dict.nav.ourStory },
    { href: `/${lang}/products`,     label: dict.nav.products },
    { href: `/${lang}/brands`,       label: dict.nav.brands },
    { href: `/${lang}/sustainability`, label: dict.nav.sustainability },
    { href: `/${lang}/contact`,      label: dict.nav.contact },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[color:rgba(18,54,37,0.12)] bg-[color:rgba(255,253,245,0.97)] backdrop-blur-xl">

        {/* Top utility bar */}
        <div className="border-b border-[var(--line)] bg-[var(--paper)]">
          <div
            className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-10"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            <div className="flex items-center gap-4">
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--stone)] sm:block">
                {dict.nav.tagline}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--stone)] sm:hidden">
                {dict.nav.taglineMobile}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <LangSwitcher lang={lang} dict={dict} />
              <Link
                href={`/${lang}/contact`}
                className="inline-flex h-7 items-center justify-center bg-[var(--wheat)] px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)] shadow-sm transition-all duration-200 hover:brightness-105"
                style={{ fontFamily: "'Josefin Sans', sans-serif", marginLeft: 8 }}
              >
                {dict.nav.enquire}
              </Link>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <nav className="mx-auto flex h-[86px] max-w-7xl items-center justify-between px-4 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">

          {/* Left — hamburger (mobile) / nav links (desktop) */}
          <div className="order-2 flex items-center justify-end gap-3 lg:order-none lg:justify-start">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center border border-[var(--line)] text-[var(--leaf-dark)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div
              className="hidden items-center gap-6 lg:flex"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              {navItems.slice(0, 3).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:transition-all after:duration-200 ${
                      isActive
                        ? "text-[var(--leaf)] after:w-full after:bg-[var(--leaf)]"
                        : "text-[var(--ink)] hover:text-[var(--leaf)] after:w-0 after:bg-[var(--leaf)] hover:after:w-full"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Centre — logo */}
          <Link
            href={`/${lang}`}
            className="order-1 flex min-w-0 items-center gap-3 transition-opacity duration-200 hover:opacity-85 lg:order-none"
          >
            <span className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full border-2 border-[color:rgba(184,121,13,0.35)] bg-[var(--paper)] shadow-md shadow-green-950/10 sm:h-[72px] sm:w-[72px]">
              <Image
                src="/amoohaa-farms-logo.jpeg"
                alt="Amoohaa Farms"
                fill
                sizes="72px"
                className="object-cover"
                priority
              />
            </span>
            <span className="min-w-0">
              <span
                className="block text-[1.05rem] font-normal leading-tight text-[var(--leaf-dark)] sm:text-[1.4rem]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "0.01em" }}
              >
                Amoohaa Farms
              </span>
              <span
                className="hidden text-[9px] font-light uppercase tracking-[0.28em] text-[var(--wheat-deep)] sm:block"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                Agro Business
              </span>
            </span>
          </Link>

          {/* Right — nav links + cart (desktop) */}
          <div className="order-3 flex items-center justify-end gap-4 lg:order-none">
            <div
              className="hidden items-center gap-6 lg:flex"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              {navItems.slice(3).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:transition-all after:duration-200 ${
                      isActive
                        ? "text-[var(--leaf)] after:w-full after:bg-[var(--leaf)]"
                        : "text-[var(--ink)] hover:text-[var(--leaf)] after:w-0 after:bg-[var(--leaf)] hover:after:w-full"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Cart icon */}
            <Link
              href={`/${lang}/cart`}
              aria-label={dict.nav.cart}
              className="relative flex h-10 w-10 items-center justify-center border border-[var(--line)] text-[var(--leaf-dark)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)]"
            >
              <ShoppingCart size={18} />
              {count > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--wheat)] text-[9px] font-bold text-[var(--leaf-dark)]"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
          </div>

        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-sm" />
          <div
            className="absolute left-0 top-0 flex h-full w-[72vw] max-w-[300px] flex-col bg-[var(--paper)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-[86px] items-center justify-between border-b border-[var(--line)] px-5">
              <span
                className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--leaf-dark)]"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--leaf-dark)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)]"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-[color:rgba(18,54,37,0.06)] ${
                      isActive
                        ? "text-[var(--leaf)] border-l-2 border-[var(--leaf)] bg-[color:rgba(18,54,37,0.05)]"
                        : "text-[var(--ink)] hover:text-[var(--leaf-dark)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href={`/${lang}/cart`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)] hover:text-[var(--leaf-dark)]"
              >
                <span>{dict.nav.cart}</span>
                {count > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--wheat)] text-[9px] font-bold text-[var(--leaf-dark)]">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </Link>

              {/* Mobile language switcher */}
              <div style={{ padding: "12px 16px", borderTop: "1px solid var(--line)", marginTop: 4 }}>
                <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", marginBottom: 8 }}>
                  {dict.language.label}
                </p>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["en", "fr", "es"] as const).map((code) => (
                    <Link
                      key={code}
                      href={pathname.replace(`/${lang}`, `/${code}`)}
                      onClick={() => setOpen(false)}
                      style={{
                        padding: "5px 10px",
                        fontFamily: "'Josefin Sans', sans-serif", fontSize: 10,
                        fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                        border: "1px solid",
                        borderColor: code === lang ? "var(--leaf)" : "var(--line)",
                        color: code === lang ? "var(--leaf-dark)" : "var(--stone)",
                        background: code === lang ? "rgba(18,54,37,0.06)" : "transparent",
                        textDecoration: "none",
                      }}
                    >
                      {code.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--line)] p-4">
              <Link
                href={`/${lang}/contact`}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center bg-[var(--wheat)] py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition-all hover:brightness-105"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                {dict.nav.enquire}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
export function SiteFooter({ lang, dict }: ShellProps) {
  return (
    <footer
      className="border-t border-[color:rgba(255,255,255,0.08)] bg-[var(--ink)] text-white"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-[var(--paper)] shadow-md sm:h-20 sm:w-20">
                <Image
                  src="/amoohaa-farms-logo.jpeg"
                  alt="Amoohaa Farms"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <div>
                <p
                  className="text-lg font-normal leading-tight sm:text-2xl"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "0.01em" }}
                >
                  Amoohaa Farms
                </p>
                <p className="mt-1 text-[9px] font-light uppercase tracking-[0.28em] text-[var(--wheat)]">
                  Rooted in goodness
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[12px] font-light leading-7 tracking-normal text-white/60">
              {dict.footer.description}
            </p>

            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)] mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/amoohaa.farms" target="_blank" rel="noreferrer" aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/50 transition-all hover:border-[var(--wheat)] hover:text-[var(--wheat)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/amoohaafarms" target="_blank" rel="noreferrer" aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/50 transition-all hover:border-[var(--wheat)] hover:text-[var(--wheat)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@amoohaafarms" target="_blank" rel="noreferrer" aria-label="YouTube"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/50 transition-all hover:border-[var(--wheat)] hover:text-[var(--wheat)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/amoohaa-farms" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/50 transition-all hover:border-[var(--wheat)] hover:text-[var(--wheat)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 sm:grid-cols-3 lg:col-span-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
                {dict.footer.business}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-[12px] font-light tracking-[0.04em] text-white/60">
                <Link href={`/${lang}/products`} className="w-fit transition-colors hover:text-white">{dict.footer.links.products}</Link>
                <Link href={`/${lang}/brands`} className="w-fit transition-colors hover:text-white">{dict.footer.links.brands}</Link>
                <a href="https://power-pulz.vercel.app/" target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-white">Power Pulz ↗</a>
                <Link href={`/${lang}/cart`} className="w-fit transition-colors hover:text-white">{dict.nav.cart}</Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
                {dict.footer.about}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-[12px] font-light tracking-[0.04em] text-white/60">
                <Link href={`/${lang}/introduction`} className="w-fit transition-colors hover:text-white">{dict.footer.links.introduction}</Link>
                <Link href={`/${lang}/sustainability`} className="w-fit transition-colors hover:text-white">{dict.footer.links.sustainability}</Link>
                <Link href={`/${lang}/contact`} className="w-fit transition-colors hover:text-white">{dict.footer.links.contact}</Link>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
                {dict.footer.policies}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-[12px] font-light tracking-[0.04em] text-white/60">
                <Link href={`/${lang}/terms`} className="w-fit transition-colors hover:text-white">{dict.footer.links.terms}</Link>
                <Link href={`/${lang}/privacy`} className="w-fit transition-colors hover:text-white">{dict.footer.links.privacy}</Link>
                <Link href={`/${lang}/returns`} className="w-fit transition-colors hover:text-white">{dict.footer.links.returns}</Link>
              </div>
            </div>
          </div>

          {/* Connect column */}
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
              {dict.footer.connect}
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-[12px] font-light leading-7 text-white/55">
              <a href="mailto:partnerships@amoohaa.com" className="w-fit transition-colors hover:text-white/90">partnerships@amoohaa.com</a>
              <span>Agra-Mathura Highway, Agra</span>
              <span>Uttar Pradesh, India</span>
            </div>
            <Link
              href={`/${lang}/contact`}
              className="mt-5 inline-flex border border-white/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65 transition-all hover:border-[var(--wheat)] hover:text-[var(--wheat)]"
            >
              {dict.footer.links.contact}
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span>© 2026 Amoohaa Farms · {dict.footer.rights}</span>
          <div className="flex flex-wrap gap-4">
            <Link href={`/${lang}/terms`} className="transition-colors hover:text-white/60">Terms</Link>
            <Link href={`/${lang}/privacy`} className="transition-colors hover:text-white/60">Privacy</Link>
            <Link href={`/${lang}/returns`} className="transition-colors hover:text-white/60">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
