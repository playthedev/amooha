"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/introduction",   label: "Our Story"      },
  { href: "/products",       label: "Products"       },
  { href: "/brands",         label: "Brands"         },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/contact",        label: "Contact"        },
];

/* ─────────────────────────────────────────────────────────────
   HEADER
───────────────────────────────────────────────────────────── */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[color:rgba(18,54,37,0.12)] bg-[color:rgba(255,253,245,0.97)] backdrop-blur-xl">

        {/* Top utility bar */}
        <div className="border-b border-[var(--line)] bg-[var(--paper)]">
          <div
            className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-10"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--stone)] sm:block">
              Farm-led sourcing, nutrition and trade
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--stone)] sm:hidden">
              Agro Business
            </span>
            <Link
              href="/contact"
              className="inline-flex h-7 items-center justify-center bg-[var(--wheat)] px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)] shadow-sm transition-all duration-200 hover:brightness-105"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              Enquire
            </Link>
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
              {navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition-colors duration-200 hover:text-[var(--leaf)] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[var(--leaf)] after:transition-all after:duration-200 hover:after:w-full"
                >
                  {item.label}
                </Link>
              ))}
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
            <span className="min-w-0" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              <span className="block text-[1rem] font-semibold leading-tight tracking-[0.06em] text-[var(--leaf-dark)] sm:text-[1.3rem]">
                Amoohaa Farms
              </span>
              <span className="hidden text-[9px] font-light uppercase tracking-[0.28em] text-[var(--wheat-deep)] sm:block">
                Agro Business
              </span>
            </span>
          </Link>

          {/* Right — nav links (desktop only) */}
          <div className="order-3 hidden items-center justify-end lg:order-none lg:flex">
            <div
              className="hidden items-center gap-6 lg:flex"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              {navItems.slice(3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition-colors duration-200 hover:text-[var(--leaf)] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[var(--leaf)] after:transition-all after:duration-200 hover:after:w-full"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

        </nav>
      </header>

      {/* ── Mobile drawer ── */}
      {open && (
        <div
          className="fixed inset-0 z-[70] lg:hidden"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-sm" />

          {/* Slide-in panel */}
          <div
            className="absolute left-0 top-0 flex h-full w-[72vw] max-w-[300px] flex-col bg-[var(--paper)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
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

            {/* Nav links */}
            <div
              className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)] hover:text-[var(--leaf-dark)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Drawer CTA */}
            <div className="border-t border-[var(--line)] p-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center bg-[var(--wheat)] py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition-all hover:brightness-105"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                Enquire Now
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
export function SiteFooter() {
  return (
    <footer
      className="border-t border-[color:rgba(255,255,255,0.08)] bg-[var(--ink)] text-white"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">

          {/* Brand column — full width on mobile, half on tablet, 4/12 on desktop */}
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
                <p className="text-lg font-semibold leading-tight tracking-[0.06em] sm:text-2xl">
                  Amoohaa Farms
                </p>
                <p className="mt-1 text-[9px] font-light uppercase tracking-[0.28em] text-[var(--wheat)]">
                  Rooted in goodness
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[12px] font-light leading-7 tracking-normal text-white/60">
              Farm-based food and nutrition business bringing trusted ingredients,
              thoughtful sourcing, and Power Pulz products to modern households
              and trade partners.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 sm:grid-cols-3 lg:col-span-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
                Business
              </p>
              <div className="mt-4 flex flex-col gap-3 text-[12px] font-light tracking-[0.04em] text-white/60">
                <Link href="/products" className="w-fit transition-colors hover:text-white">Products</Link>
                <Link href="/brands"   className="w-fit transition-colors hover:text-white">Brands</Link>
                <a
                  href="https://power-pulz.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit transition-colors hover:text-white"
                >
                  Power Pulz ↗
                </a>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
                About
              </p>
              <div className="mt-4 flex flex-col gap-3 text-[12px] font-light tracking-[0.04em] text-white/60">
                <Link href="/introduction"   className="w-fit transition-colors hover:text-white">Our Story</Link>
                <Link href="/sustainability" className="w-fit transition-colors hover:text-white">Sustainability</Link>
                <Link href="/contact"        className="w-fit transition-colors hover:text-white">Contact Us</Link>
              </div>
            </div>

            {/* Community — spans 2 cols on mobile, 1 on tablet+ */}
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
                Community
              </p>
              <div className="mt-4 flex flex-col gap-3 text-[12px] font-light tracking-[0.04em] text-white/35">
                <span>Farm Partners</span>
                <span>Responsible Sourcing</span>
                <span>Environment</span>
              </div>
            </div>
          </div>

          {/* Connect column */}
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--wheat)]">
              Connect
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-[12px] font-light leading-7 text-white/55">
              <a
                href="mailto:partnerships@amoohaa.com"
                className="w-fit transition-colors hover:text-white/90"
              >
                partnerships@amoohaa.com
              </a>
              <span>Agra-Mathura Highway, Agra</span>
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex border border-white/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65 transition-all hover:border-[var(--wheat)] hover:text-[var(--wheat)]"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span>© 2026 Amoohaa Farms</span>
          <span>Farm-led products for modern households</span>
        </div>
      </div>
    </footer>
  );
}
