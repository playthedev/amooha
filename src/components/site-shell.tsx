"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CartButton } from "@/components/cart-button";
import { CartDrawer } from "@/components/cart-drawer";
import { LanguageToggle } from "@/components/language-toggle";
import { CurrencyToggle } from "@/components/currency-toggle";
import { AccountMenu } from "@/components/account-menu";
import { useAuth } from "@/auth/auth-provider";
import { useT } from "@/i18n/language-provider";

/* ─────────────────────────────────────────────────────────────
   HEADER
───────────────────────────────────────────────────────────── */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { href: `/introduction`, label: t.shell.nav.ourStory },
    { href: `/products`,     label: t.shell.nav.products },
    { href: `/brands`,       label: t.shell.nav.brands },
    { href: `/sustainability`, label: t.shell.nav.sustainability },
    { href: `/contact`,      label: t.shell.nav.contact },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[color:rgba(18,54,37,0.12)] bg-[color:rgba(255,253,245,0.97)] backdrop-blur-xl">

        {/* Top utility bar */}
        <div className="border-b border-[var(--line)] bg-[var(--paper)]">
          <div
            className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-2 px-4 sm:px-8 lg:px-10"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="hidden truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--stone)] sm:block">
                {t.shell.utilityTagline}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <CurrencyToggle />
              <LanguageToggle />
              <AccountMenu />
              <Link
                href="/contact"
                className="hidden h-7 items-center justify-center bg-[var(--wheat)] px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)] shadow-sm transition-all duration-200 hover:brightness-105 sm:inline-flex"
                style={{ fontFamily: "'Josefin Sans', sans-serif", marginLeft: 8 }}
              >
                {t.shell.enquire}
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
              aria-label={open ? t.shell.closeMenu : t.shell.openMenu}
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
            href="/"
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
            <CartButton className="h-10 w-10 rounded-none" />
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
                {t.shell.menu}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--leaf-dark)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)]"
                aria-label={t.shell.closeMenu}
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
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)] hover:text-[var(--leaf-dark)]"
              >
                <span>{t.commerce.cart.title}</span>
              </Link>
              <Link
                href={user ? "/account" : "/signin"}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)] hover:text-[var(--leaf-dark)]"
              >
                <span>{user ? t.auth.myAccount : t.auth.signIn}</span>
              </Link>

              {/* Mobile language + currency switcher */}
              <div style={{ display: "flex", gap: 8, padding: "12px 16px", borderTop: "1px solid var(--line)", marginTop: 4 }}>
                <LanguageToggle />
                <CurrencyToggle />
              </div>
            </div>

            <div className="border-t border-[var(--line)] p-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center bg-[var(--wheat)] py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition-all hover:brightness-105"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                {t.shell.enquire}
              </Link>
            </div>
          </div>
        </div>
      )}

      <CartDrawer />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
export function SiteFooter() {
  const t = useT();
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
                  {t.shell.footer.tagline}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[12px] font-light leading-7 tracking-normal text-white/60">
              {t.shell.footer.blurb}
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
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 sm:grid-cols-4 lg:col-span-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
                {t.shell.footer.colBusiness}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-[12px] font-light tracking-[0.04em] text-white/60">
                <Link href="/products" className="w-fit transition-colors hover:text-white">{t.shell.footer.linkProducts}</Link>
                <Link href="/brands" className="w-fit transition-colors hover:text-white">{t.shell.footer.linkBrands}</Link>
                <a href="https://www.powerpulz.com/" target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-white">Power Pulz ↗</a>
                <a href="https://www.harvestvita.com/" target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-white">HarvestVita ↗</a>
                <Link href="/cart" className="w-fit transition-colors hover:text-white">{t.commerce.cart.title}</Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
                {t.shell.footer.colAbout}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-[12px] font-light tracking-[0.04em] text-white/60">
                <Link href="/introduction" className="w-fit transition-colors hover:text-white">{t.shell.footer.linkOurStory}</Link>
                <Link href="/sustainability" className="w-fit transition-colors hover:text-white">{t.shell.footer.linkSustainability}</Link>
                <Link href="/contact" className="w-fit transition-colors hover:text-white">{t.shell.footer.linkContact}</Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
                {t.shell.footer.colCommunity}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-[12px] font-light tracking-[0.04em] text-white/60">
                <span>{t.shell.footer.community1}</span>
                <span>{t.shell.footer.community2}</span>
                <span>{t.shell.footer.community3}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
                {t.shell.footer.colLegal}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-[12px] font-light tracking-[0.04em] text-white/60">
                <Link href="/terms" className="w-fit transition-colors hover:text-white">{t.shell.footer.linkTerms}</Link>
                <Link href="/privacy" className="w-fit transition-colors hover:text-white">{t.shell.footer.linkPrivacy}</Link>
                <Link href="/returns" className="w-fit transition-colors hover:text-white">{t.shell.footer.linkReturns}</Link>
              </div>
            </div>
          </div>

          {/* Connect column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
              {t.shell.footer.colConnect}
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-[12px] font-light leading-7 text-white/55">
              <a href="mailto:letsconnect@amoohaafarms.com" className="w-fit transition-colors hover:text-white/90">letsconnect@amoohaafarms.com</a>
              <span>{t.shell.footer.address}</span>
              <span>Uttar Pradesh, India</span>
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex border border-white/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65 transition-all hover:border-[var(--wheat)] hover:text-[var(--wheat)]"
            >
              {t.shell.footer.contactUs}
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto px-4 py-5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30 sm:px-8 lg:px-10">
          <span>{t.shell.footer.copyright} · {t.shell.footer.bottomTagline}</span>
        </div>
      </div>
    </footer>
  );
}
