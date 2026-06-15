"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Leaf,
  Newspaper,
  RefreshCcw,
  Sprout,
  Users,
  Wheat,
  MapPin,
  FlaskConical,
  Truck,
  ShieldCheck,
  ChevronRight,
  Star,
  Quote,
  TrendingUp,
  Package,
  Globe,
} from "lucide-react";
import { useT } from "@/i18n/language-provider";

/* ── Static (non-text) section data — images, icons, gradients, links ── */

const heroImages = {
  lead: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
};

const impactIcons = [Globe, Users, TrendingUp, ShieldCheck];

const journeyIcons = [MapPin, FlaskConical, Package, Truck];
const journeySteps_ = ["01", "02", "03", "04"];

const testimonialInitials = ["RM", "PS", "AG"];

const productImages = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=800&q=80",
];
const productGradients = [
  "linear-gradient(to bottom, rgba(10,77,44,0.15), rgba(10,77,44,0.94))",
  "linear-gradient(to bottom, rgba(74,48,0,0.15), rgba(100,65,0,0.94))",
  "linear-gradient(to bottom, rgba(26,26,46,0.15), rgba(22,33,62,0.94))",
];

const communityIcons = [Sprout, Users, Leaf];

const brandCards = [
  {
    title: "Power Pulz",
    href: "https://www.powerpulz.com/",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80",
    accentColor: "var(--wheat)",
  },
  {
    title: "HarvestVita",
    label: "Natural Wellness Range",
    href: "https://www.harvestvita.com/",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80",
    accentColor: "#a8d5a2",
  },
];

const commitmentIcons = [BadgeCheck, BriefcaseBusiness, Wheat, Leaf];

export default function Home() {
  const t = useT();
  const h = t.home;

  return (
    <main className="bg-[var(--cream)] text-[var(--ink)]">

      {/* ── HERO ── */}
      <section className="relative min-h-[calc(100vh-127px)] overflow-hidden bg-[var(--leaf-dark)] text-white">
        <Image
          src={heroImages.lead}
          alt="Amoohaa Farms field"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,77,44,0.96)_0%,rgba(10,77,44,0.70)_50%,rgba(10,77,44,0.08)_100%)]" />
        <div className="absolute left-0 right-0 top-24 h-px bg-white/10" />

        <div className="section-shell relative z-10 mx-auto flex min-h-[calc(100vh-127px)] max-w-7xl flex-col justify-end pb-24 pt-28 px-5 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--wheat)]" />
              <span className="label-caps text-[var(--wheat)] tracking-[0.24em]">{h.hero.kicker}</span>
            </div>
            <h1 className="display-serif mt-6 text-6xl font-normal leading-[1.05] sm:text-7xl lg:text-[5.5rem]">
              {h.hero.title}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80">{h.hero.body}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/introduction"
                className="inline-flex h-14 items-center justify-center gap-3 bg-[var(--wheat)] px-9 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:brightness-105"
              >
                {h.hero.readStory}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/brands"
                className="inline-flex h-14 items-center justify-center border border-white/30 px-9 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-white/10 hover:border-white/60"
              >
                {h.hero.ourBrands}
              </Link>
            </div>
          </div>
          <div className="mt-16 flex items-center gap-3 text-white/40">
            <div className="h-px w-10 bg-white/25" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]">{h.hero.scroll}</span>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden w-72 border border-white/15 bg-white/5 p-5 backdrop-blur-sm md:block">
          <p className="label-caps text-[var(--wheat)] tracking-[0.2em]">{h.hero.nextLabel}</p>
          <p className="mt-3 text-[15px] font-semibold leading-snug">{h.hero.nextTitle}</p>
          <p className="mt-2 text-[12px] text-white/55 leading-relaxed">{h.hero.nextBody}</p>
        </div>
      </section>

      {/* ── TRUST BAND ── */}
      <div className="bg-[var(--leaf-dark)] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl flex items-center gap-10 overflow-x-auto py-4">
          {h.trustBand.map((item, i) => (
            <span key={item} className="flex shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
              {i !== 0 && <span className="h-1 w-1 rounded-full bg-[var(--wheat)]/50" />}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          NEW — IMPACT STATS BAND (wheat background)
      ══════════════════════════════════════════════ */}
      <section className="bg-[var(--wheat)] py-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {h.impactStats.map(({ value, label }, i) => {
              const Icon = impactIcons[i];
              return (
              <div key={label} className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center border border-[var(--leaf-dark)]/20 bg-[var(--leaf-dark)]/8">
                  <Icon size={22} className="text-[var(--leaf-dark)]" />
                </div>
                <p className="display-serif text-5xl font-normal text-[var(--leaf-dark)]">{value}</p>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)]/60">{label}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IN THE NEWS ── */}
      <section className="bg-[var(--paper)] py-24 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{h.news.kicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">{h.news.heading}</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {h.news.cards.map((card, idx) => (
              <article
                key={card.title}
                className="group relative flex flex-col border border-[var(--line)] bg-[var(--cream)] p-8 transition-all duration-300 hover:border-[var(--wheat)] hover:shadow-lg hover:shadow-green-900/6 hover:-translate-y-0.5"
              >
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-[var(--wheat)] transition-all duration-500 group-hover:w-full" />
                <span className="mb-6 text-[11px] font-bold text-[var(--stone)]/40 tracking-[0.16em]">0{idx + 1}</span>
                <div className="flex items-center gap-2 text-[var(--wheat-deep)]">
                  <Newspaper size={15} />
                  <span className="label-caps text-[10px] tracking-[0.2em]">{card.label}</span>
                </div>
                <h3 className="mt-5 flex-1 text-xl font-extrabold leading-snug text-[var(--leaf-dark)]">{card.title}</h3>
                <p className="mt-4 text-[14px] leading-7 text-[var(--stone)]">{card.body}</p>
                <div className="mt-7 h-px w-full bg-[var(--line)] transition-colors group-hover:bg-[var(--wheat)]/30" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEW — FARM-TO-MARKET JOURNEY (dark section)
      ══════════════════════════════════════════════ */}
      <section className="bg-[var(--leaf-dark)] py-24 px-5 sm:px-8 lg:px-10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat)]" />
                <span className="label-caps text-[var(--wheat)] tracking-[0.22em]">{h.journey.kicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">
                {h.journey.heading}
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-7 text-white/55">
              {h.journey.intro}
            </p>
          </div>

          <div className="grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {h.journey.steps.map(({ title, body }, i) => {
              const Icon = journeyIcons[i];
              const step = journeySteps_[i];
              return (
              <div key={step} className="group relative bg-[var(--leaf-dark)] p-8 pb-10 transition-colors hover:bg-white/5">
                <div className="mb-8 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-[var(--wheat)]/25 bg-[var(--wheat)]/8">
                    <Icon size={20} className="text-[var(--wheat)]" />
                  </div>
                  <span className="text-[11px] font-bold text-white/18 tracking-[0.16em]">{step}</span>
                </div>
                <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-white">{title}</h3>
                <p className="mt-3 text-[13px] leading-7 text-white/55">{body}</p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--wheat)] transition-all duration-500 group-hover:w-full" />
              </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/8 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] text-white/45 max-w-md">
              {h.journey.ctaText}
            </p>
            <Link
              href="/contact"
              className="inline-flex shrink-0 h-12 items-center gap-3 border border-[var(--wheat)]/35 px-7 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--wheat)] transition hover:bg-[var(--wheat)]/10"
            >
              {h.journey.ctaButton} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FACTS ── */}
      <section className="bg-[var(--cream)] py-24 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden border border-[var(--line)] bg-[var(--leaf-dark)] p-10 text-white">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/5" />
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full border border-white/5" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat)]" />
                <span className="label-caps text-[var(--wheat)] tracking-[0.22em]">{h.facts.kicker}</span>
              </div>
              <RefreshCcw size={18} className="text-[var(--wheat)]/60" />
            </div>
            <h2 className="display-serif relative mt-14 text-4xl font-normal sm:text-5xl">{h.facts.heading}</h2>
            <p className="relative mt-6 text-[15px] leading-8 text-white/72">
              {h.facts.body}
            </p>
          </div>
          <div className="grid grid-cols-1 border border-[var(--line)] bg-[var(--paper)] sm:grid-cols-3">
            {h.numbers.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex min-h-36 flex-col justify-between gap-8 p-6 sm:min-h-52 sm:p-8 ${
                  i < 2
                    ? "border-b border-[var(--line)] sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <p className="display-serif text-4xl font-normal leading-none text-[var(--leaf-dark)] sm:text-5xl lg:text-6xl">{value}</p>
                <div>
                  <div className="mb-3 h-px w-8 bg-[var(--wheat)]/60" />
                  <p className="label-caps max-w-[14rem] text-[10px] tracking-[0.18em] text-[var(--stone)]">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEW — PRODUCT CATEGORIES SHOWCASE
      ══════════════════════════════════════════════ */}
      <section className="bg-[var(--paper)] py-24 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{h.categories.kicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">{h.categories.heading}</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:text-[var(--leaf)]">
              {h.categories.allProducts} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {h.categories.cards.map((cat, i) => (
              <div key={cat.title} className="group relative overflow-hidden" style={{ minHeight: 380 }}>
                <Image
                  src={productImages[i]}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-95"
                  style={{ background: productGradients[i] }}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <span className="self-start border border-[var(--wheat)]/40 bg-black/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--wheat)] backdrop-blur-sm">
                    {cat.tag}
                  </span>
                  <div>
                    <h3 className="display-serif text-3xl font-normal text-white leading-tight">{cat.title}</h3>
                    <p className="mt-3 text-[13px] leading-6 text-white/65">{cat.body}</p>
                    <div className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--wheat)] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                     <Link href="/products"> <span>{h.categories.learnMore}</span></Link>
                   
                      <ChevronRight size={13} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section className="bg-[var(--cream)] py-24 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:pr-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{h.community.kicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal leading-tight sm:text-5xl">{h.community.heading}</h2>
              <p className="mt-6 text-[15px] leading-8 text-[var(--stone)]">
                {h.community.body}
              </p>
              <div className="mt-10 hidden flex-col gap-1.5 lg:flex">
                <div className="h-px w-16 bg-[var(--leaf-dark)]/20" />
                <div className="h-px w-10 bg-[var(--leaf-dark)]/12" />
                <div className="h-px w-6 bg-[var(--leaf-dark)]/8" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
              {h.community.cards.map(({ title, body }, i) => {
                const Icon = communityIcons[i];
                return (
                <article key={title} className="group relative flex flex-col border border-[var(--line)] bg-[var(--paper)] p-8 transition-all duration-300 hover:border-[var(--leaf)]/40 hover:bg-white hover:shadow-md hover:shadow-green-900/5">
                  <div className="mb-auto flex h-11 w-11 items-center justify-center border border-[var(--wheat)]/30 bg-[var(--wheat)]/8 text-[var(--wheat-deep)] transition-colors group-hover:bg-[var(--wheat)]/14">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-10 text-[13px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)]">{title}</h3>
                  <p className="mt-3 text-[13px] leading-7 text-[var(--stone)]">{body}</p>
                </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEW — PARTNER TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="bg-[var(--paper)] py-24 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{h.testimonials.kicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">
                {h.testimonials.heading}
              </h2>
            </div>
            {/* Rating badge */}
            <div className="flex items-center gap-3 self-start border border-[var(--line)] bg-[var(--cream)] px-5 py-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[var(--wheat)] text-[var(--wheat)]" />
                ))}
              </div>
              <div>
                <p className="text-[13px] font-extrabold text-[var(--leaf-dark)]">{h.testimonials.ratingScore}</p>
                <p className="text-[10px] text-[var(--stone)] tracking-wide">{h.testimonials.ratingLabel}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {h.testimonials.items.map((item, idx) => (
              <div
                key={item.name}
                className={`flex flex-col border p-8 transition-all duration-300 ${
                  idx === 1
                    ? "border-[var(--wheat)] bg-[var(--leaf-dark)] text-white"
                    : "border-[var(--line)] bg-[var(--cream)] hover:border-[var(--wheat)]/50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-green-900/5"
                }`}
              >
                <Quote size={26} className={`mb-6 ${idx === 1 ? "text-[var(--wheat)]/50" : "text-[var(--wheat-deep)]/35"}`} />
                <p className={`flex-1 text-[14px] leading-8 ${idx === 1 ? "text-white/80" : "text-[var(--stone)]"}`}>
                  "{item.quote}"
                </p>
                <div className={`mt-8 flex items-center gap-4 border-t pt-6 ${idx === 1 ? "border-white/10" : "border-[var(--line)]"}`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center text-[11px] font-extrabold ${idx === 1 ? "bg-[var(--wheat)]/18 text-[var(--wheat)]" : "bg-[var(--wheat)]/14 text-[var(--wheat-deep)]"}`}>
                    {testimonialInitials[idx]}
                  </div>
                  <div>
                    <p className={`text-[13px] font-extrabold ${idx === 1 ? "text-white" : "text-[var(--leaf-dark)]"}`}>{item.name}</p>
                    <p className={`text-[11px] mt-0.5 ${idx === 1 ? "text-white/48" : "text-[var(--stone)]"}`}>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR BRANDS ── */}
      <section className="bg-[var(--cream)] py-24 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{h.brands.kicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">{h.brands.heading}</h2>
            </div>
            <Link href="/brands" className="hidden items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:text-[var(--leaf)] sm:inline-flex">
              {h.brands.viewAll} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {brandCards.map((brand) => (
              <a
                key={brand.title}
                href={brand.href}
                target={brand.href.startsWith("http") ? "_blank" : undefined}
                rel={brand.href.startsWith("http") ? "noreferrer" : undefined}
                className="group relative min-h-[480px] w-full overflow-hidden bg-[var(--leaf-dark)] text-white"
              >
                <Image
                  src={brand.image}
                  alt={brand.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,77,44,0.04)_0%,rgba(10,77,44,0.55)_55%,rgba(10,77,44,0.95)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-10">
                  <div className="flex items-center gap-2" style={{ color: brand.accentColor }}>
                    <span className="h-px w-5" style={{ background: brand.accentColor }} />
                    <p className="label-caps text-[10px] tracking-[0.22em]">{brand.label}</p>
                  </div>
                  <h3 className="display-serif mt-3 text-4xl font-normal">{brand.title}</h3>
                  <div
                    className="mt-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition"
                    style={{ color: undefined }}
                  >
                    <span className="group-hover:opacity-100" style={{ transition: "color .3s" }}>Explore</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" size={15} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM TRUST BAR ── */}
      <section className="bg-[var(--leaf-dark)] py-14 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10" />
            <span className="label-caps text-[11px] tracking-[0.24em] text-white/35">{h.commitments.heading}</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {h.commitments.items.map((label, i) => {
              const Icon = commitmentIcons[i];
              return (
              <div key={label} className="group flex flex-col items-center justify-center gap-4 border border-white/10 bg-white/[0.03] py-8 px-6 text-center transition-colors hover:border-[var(--wheat)]/30 hover:bg-white/[0.06]">
                <Icon size={22} className="text-[var(--wheat)] transition group-hover:scale-110" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/60 group-hover:text-[var(--wheat)]">
                  {label}
                </span>
              </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
