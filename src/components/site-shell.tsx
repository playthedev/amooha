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
    <header className="sticky top-0 z-50 border-b border-[color:rgba(18,54,37,0.12)] bg-[color:rgba(255,253,245,0.95)] backdrop-blur-xl">
      <div className="border-b border-[var(--line)] bg-[var(--paper)]">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--stone)] sm:px-8 lg:px-10">
          <span>Farm-led sourcing, nutrition and trade</span>
          <div className="hidden items-center gap-5 sm:flex">
            <Link
              href="/contact"
              className="inline-flex h-7 items-center justify-center bg-[var(--wheat)] px-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--leaf-dark)] shadow-sm shadow-green-950/10 transition hover:brightness-105"
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>

      <nav className="mx-auto grid h-[82px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center border border-[var(--line)] text-[var(--leaf-dark)] lg:hidden"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
          <div className="hidden items-center gap-7 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[var(--ink)] lg:flex">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[var(--leaf)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/" className="flex min-w-0 items-center gap-3">
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

        <div className="flex items-center justify-end gap-3">
          <div className="hidden items-center gap-7 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[var(--ink)] lg:flex">
            {navItems.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[var(--leaf)]"
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
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="relative h-16 w-16 overflow-hidden rounded-full border border-white/15 bg-[var(--paper)]">
              <Image
                src="/amoohaa-farms-logo.jpeg"
                alt="Amoohaa Farms"
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <div>
              <p className="text-2xl font-semibold">Amoohaa Farms</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-[var(--wheat)]">
                Rooted in goodness
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70">
            Farm-based food and nutrition business bringing trusted ingredients,
            thoughtful sourcing, and Power Pulz products to modern households
            and trade partners.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--wheat)]">
              Business
            </p>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/76">
              <Link href="/products">Products</Link>
              <Link href="/brands">Brands</Link>
              <a href="https://power-pulz.vercel.app/" target="_blank" rel="noreferrer">
                <span className="inline-flex items-center gap-2">
                  {/* <Image
                    src="/power-pulz-logo.svg"
                    alt=""
                    width={26}
                    height={9}
                    className="h-3 w-auto bg-white"
                  /> */}
                  Power Pulz
                </span>
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--wheat)]">
              About
            </p>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/76">
              <Link href="/introduction">Our Story</Link>
              <Link href="/sustainability">Sustainability</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--wheat)]">
              Community
            </p>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/76">
              <span>Farm Partners</span>
              <span>Responsible Sourcing</span>
              <span>Environment</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--wheat)]">
            Connect
          </p>
          <p className="mt-5 text-sm leading-7 text-white/68">
            partnerships@amoohaa.com
            <br />
            Agra-Mathura Highway, Agra
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex border border-white/16 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/80 transition hover:border-[var(--wheat)] hover:text-[var(--wheat)]"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Amoohaa Farms</span>
        <span>Farm-led products for modern households</span>
      </div>
    </footer>
  );
}
