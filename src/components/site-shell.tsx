import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const navItems = [
  { href: "/introduction", label: "Our Story" },
  { href: "/products", label: "Products" },
  { href: "/brands", label: "Brands" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:rgba(18,54,37,0.12)] bg-[color:rgba(255,253,245,0.97)] backdrop-blur-xl">
      {/* Top utility bar */}
      <div className="border-b border-[var(--line)] bg-[var(--paper)]">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--stone)] sm:px-8 lg:px-10">
          <span className="hidden sm:block">Farm-led sourcing, nutrition and trade</span>
          <span className="sm:hidden">Amoohaa Farms</span>
          <div className="flex items-center gap-5">
            <Link
              href="/contact"
              className="inline-flex h-7 items-center justify-center bg-[var(--wheat)] px-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--leaf-dark)] shadow-sm shadow-green-950/10 transition-all duration-200 hover:brightness-105 hover:shadow-md"
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="mx-auto grid h-[82px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-10">
        {/* Left nav links */}
        <div className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center border border-[var(--line)] text-[var(--leaf-dark)] transition-colors hover:bg-[color:rgba(18,54,37,0.06)] lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="hidden items-center gap-7 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[var(--ink)] lg:flex">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative transition-colors duration-200 hover:text-[var(--leaf)] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[var(--leaf)] after:transition-all after:duration-200 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Center logo */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 transition-opacity duration-200 hover:opacity-85"
        >
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[color:rgba(184,121,13,0.28)] bg-[var(--paper)] shadow-sm">
            <Image
              src="/amoohaa-farms-logo.jpeg"
              alt="Amoohaa Farms"
              fill
              sizes="56px"
              className="object-cover"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-semibold leading-tight text-[var(--leaf-dark)] sm:text-xl">
              Amoohaa Farms
            </span>
            <span className="hidden text-xs font-bold uppercase tracking-[0.22em] text-[var(--wheat-deep)] sm:block">
              Agro Business
            </span>
          </span>
        </Link>

        {/* Right nav links */}
        <div className="flex items-center justify-end gap-3">
          <div className="hidden items-center gap-7 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[var(--ink)] lg:flex">
            {navItems.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative transition-colors duration-200 hover:text-[var(--leaf)] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[var(--leaf)] after:transition-all after:duration-200 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:rgba(255,255,255,0.08)] bg-[var(--ink)] px-5 py-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">

        {/* Brand column */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/15 bg-[var(--paper)]">
              <Image
                src="/amoohaa-farms-logo.jpeg"
                alt="Amoohaa Farms"
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <div>
              <p className="text-2xl font-semibold leading-tight">Amoohaa Farms</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-[var(--wheat)]">
                Rooted in goodness
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
            Farm-based food and nutrition business bringing trusted ingredients,
            thoughtful sourcing, and Power Pulz products to modern households
            and trade partners.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--wheat)]">
              Business
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-white/70">
              <Link
                href="/products"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                Products
              </Link>
              <Link
                href="/brands"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                Brands
              </Link>
              <a
                href="https://power-pulz.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                Power Pulz ↗
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--wheat)]">
              About
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-white/70">
              <Link
                href="/introduction"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                Our Story
              </Link>
              <Link
                href="/sustainability"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                Sustainability
              </Link>
              <Link
                href="/contact"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--wheat)]">
              Community
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-white/50">
              <span>Farm Partners</span>
              <span>Responsible Sourcing</span>
              <span>Environment</span>
            </div>
          </div>
        </div>

        {/* Connect column */}
        <div className="lg:col-span-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--wheat)]">
            Connect
          </p>
          <div className="mt-5 flex flex-col gap-1 text-sm leading-7 text-white/65">
            <a
              href="mailto:partnerships@amoohaa.com"
              className="w-fit transition-colors duration-200 hover:text-white/90"
            >
              partnerships@amoohaa.com
            </a>
            <span>Agra-Mathura Highway, Agra</span>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-flex border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/75 transition-all duration-200 hover:border-[var(--wheat)] hover:text-[var(--wheat)]"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Amoohaa Farms</span>
        <span>Farm-led products for modern households</span>
      </div>
    </footer>
  );
}