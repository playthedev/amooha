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

const heroStories = [
  {
    kicker: "Amoohaa Stories",
    title: "Rooted In The Earth. Built For The Future.",
    body: "A farm-based business connecting honest cultivation with modern food and nutrition products.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
  },
  {
    kicker: "The Ecosystem",
    title: "Brands Born From The Farm",
    body: "Power Pulz brings the first high-energy nutrition line from Amoohaa Farms.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
  },
];

const newsCards = [
  {
    label: "Company Update",
    title: "Amoohaa Farms strengthens its harvest-to-market platform",
    body: "A unified digital home for sourcing, farm products, Power Pulz, and partnerships.",
  },
  {
    label: "Brand Story",
    title: "Power Pulz becomes the flagship nutrition label",
    body: "A focused product experience connected to farm-origin ingredient standards.",
  },
  {
    label: "Sourcing",
    title: "Building a clearer farm-to-brand journey",
    body: "Traceable thinking across ingredients, supplier relationships, and product quality.",
  },
];

const numbers = [
  ["01", "Flagship nutrition label"],
  ["04", "Strategic focus areas"],
  ["100%", "Ingredient-led brand standard"],
];

const brandCards = [
  {
    title: "Power Pulz",
    label: "Power Pulz Nutrition",
    href: "https://power-pulz.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80",
  },
];

/* ── NEW SECTION DATA ── */

const journeySteps = [
  {
    icon: MapPin,
    step: "01",
    title: "Farm Sourcing",
    body: "We work directly with farmers across fertile belts, building long-term relationships that prioritise quality and fairness.",
  },
  {
    icon: FlaskConical,
    step: "02",
    title: "Quality Testing",
    body: "Every batch is tested against strict ingredient standards before it enters our processing or packaging pipeline.",
  },
  {
    icon: Package,
    step: "03",
    title: "Product Creation",
    body: "Raw ingredients are transformed into labelled, ready-to-market products under FSSAI-aligned processes.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Market Delivery",
    body: "From our farm belt to households and B2B partners — traceable, reliable, on time.",
  },
];

const testimonials = [
  {
    quote:
      "Amoohaa's sourcing model is unlike anything else we've worked with. Direct farm relationships mean we always know what's in the product.",
    name: "Rajiv Mehta",
    role: "Procurement Head, FoodCo Distribution",
    initials: "RM",
  },
  {
    quote:
      "Power Pulz is our customers' go-to. The farm-origin story resonates strongly in Tier 2 markets where trust in ingredients matters most.",
    name: "Priya Sharma",
    role: "Regional Buyer, NutriRetail Chain",
    initials: "PS",
  },
  {
    quote:
      "The transparency around ingredient traceability is what set Amoohaa apart during our partner evaluation process.",
    name: "Anand Gupta",
    role: "Operations Director, AgriLink Partners",
    initials: "AG",
  },
];

const impactStats = [
  { icon: Globe, value: "3+", label: "States sourced from" },
  { icon: Users, value: "500+", label: "Farm families connected" },
  { icon: TrendingUp, value: "2x", label: "YoY growth trajectory" },
  { icon: ShieldCheck, value: "100%", label: "FSSAI compliant batches" },
];

const productCategories = [
  {
    title: "Energy & Nutrition",
    tag: "Power Pulz",
    body: "High-performance nutrition products built on farm-origin ingredients. No fillers, no compromises.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(to bottom, rgba(10,77,44,0.15), rgba(10,77,44,0.94))",
  },
  {
    title: "Raw Farm Produce",
    tag: "Power Pulz",
    body: "Grains, pulses, and primary produce sourced directly from farms and available for B2B trade.",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(to bottom, rgba(74,48,0,0.15), rgba(100,65,0,0.94))",
  },
  {
    title: "Future Products",
    tag: "Power Pulz",
    body: "New categories in development — rooted in the same farm-first standard that defines Amoohaa.",
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(to bottom, rgba(26,26,46,0.15), rgba(22,33,62,0.94))",
  },
];

export default function Home() {
  const leadStory = heroStories[0];

  return (
    <main className="bg-[var(--cream)] text-[var(--ink)]">

      {/* ── HERO ── */}
      <section className="relative min-h-[calc(100vh-127px)] overflow-hidden bg-[var(--leaf-dark)] text-white">
        <Image
          src={leadStory.image}
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
              <span className="label-caps text-[var(--wheat)] tracking-[0.24em]">{leadStory.kicker}</span>
            </div>
            <h1 className="display-serif mt-6 text-6xl font-normal leading-[1.05] sm:text-7xl lg:text-[5.5rem]">
              {leadStory.title}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80">{leadStory.body}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/introduction"
                className="inline-flex h-14 items-center justify-center gap-3 bg-[var(--wheat)] px-9 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:brightness-105"
              >
                Read Story
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/brands"
                className="inline-flex h-14 items-center justify-center border border-white/30 px-9 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-white/10 hover:border-white/60"
              >
                Our Brands
              </Link>
            </div>
          </div>
          <div className="mt-16 flex items-center gap-3 text-white/40">
            <div className="h-px w-10 bg-white/25" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]">Scroll to explore</span>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden w-72 border border-white/15 bg-white/5 p-5 backdrop-blur-sm md:block">
          <p className="label-caps text-[var(--wheat)] tracking-[0.2em]">Next story</p>
          <p className="mt-3 text-[15px] font-semibold leading-snug">{heroStories[1].title}</p>
          <p className="mt-2 text-[12px] text-white/55 leading-relaxed">{heroStories[1].body}</p>
        </div>
      </section>

      {/* ── TRUST BAND ── */}
      <div className="bg-[var(--leaf-dark)] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl flex items-center gap-10 overflow-x-auto py-4">
          {["Farm-to-table sourcing", "FSSAI aligned", "B2B ready", "Harvest-to-market"].map((item, i) => (
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
            {impactStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center border border-[var(--leaf-dark)]/20 bg-[var(--leaf-dark)]/8">
                  <Icon size={22} className="text-[var(--leaf-dark)]" />
                </div>
                <p className="display-serif text-5xl font-normal text-[var(--leaf-dark)]">{value}</p>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)]/60">{label}</p>
              </div>
            ))}
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
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">In the News</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">Latest from Amoohaa</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {newsCards.map((card, idx) => (
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
                <span className="label-caps text-[var(--wheat)] tracking-[0.22em]">How It Works</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">
                The farm-to-market journey
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-7 text-white/55">
              Every ingredient follows a traceable path from soil to shelf — built on trust, tested at every stage.
            </p>
          </div>

          <div className="grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map(({ icon: Icon, step, title, body }) => (
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
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/8 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] text-white/45 max-w-md">
              Want to become a farm partner or trade distributor? Let's start a conversation.
            </p>
            <Link
              href="/contact"
              className="inline-flex shrink-0 h-12 items-center gap-3 border border-[var(--wheat)]/35 px-7 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--wheat)] transition hover:bg-[var(--wheat)]/10"
            >
              Get in touch <ArrowRight size={14} />
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
                <span className="label-caps text-[var(--wheat)] tracking-[0.22em]">Facts</span>
              </div>
              <RefreshCcw size={18} className="text-[var(--wheat)]/60" />
            </div>
            <h2 className="display-serif relative mt-14 text-4xl font-normal sm:text-5xl">Did you know?</h2>
            <p className="relative mt-6 text-[15px] leading-8 text-white/72">
              Amoohaa Farms is built as a harvest-to-market business, so each product line can serve its own customer while staying connected to a trusted farm-led standard.
            </p>
          </div>
          <div className="grid grid-cols-3 border border-[var(--line)] bg-[var(--paper)]">
            {numbers.map(([value, label], i) => (
              <div key={label} className={`flex flex-col justify-between p-8 ${i < 2 ? "border-r border-[var(--line)]" : ""}`}>
                <p className="display-serif text-5xl font-normal text-[var(--leaf-dark)] leading-none sm:text-6xl">{value}</p>
                <div>
                  <div className="mb-3 h-px w-8 bg-[var(--wheat)]/60" />
                  <p className="label-caps text-[10px] tracking-[0.18em] text-[var(--stone)]">{label}</p>
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
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">What We Make</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">Products from the ground up</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:text-[var(--leaf)]">
              All products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {productCategories.map((cat) => (
              <div key={cat.title} className="group relative overflow-hidden" style={{ minHeight: 380 }}>
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-95"
                  style={{ background: cat.gradient }}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <span className="self-start border border-[var(--wheat)]/40 bg-black/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--wheat)] backdrop-blur-sm">
                    {cat.tag}
                  </span>
                  <div>
                    <h3 className="display-serif text-3xl font-normal text-white leading-tight">{cat.title}</h3>
                    <p className="mt-3 text-[13px] leading-6 text-white/65">{cat.body}</p>
                    <div className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--wheat)] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                     <Link href="/products"> <span>Learn more</span></Link>
                   
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
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">Community</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal leading-tight sm:text-5xl">Purpose beyond product.</h2>
              <p className="mt-6 text-[15px] leading-8 text-[var(--stone)]">
                The Amoohaa model keeps farm partnerships, consumer trust, and responsible sourcing at the center of company growth.
              </p>
              <div className="mt-10 hidden flex-col gap-1.5 lg:flex">
                <div className="h-px w-16 bg-[var(--leaf-dark)]/20" />
                <div className="h-px w-10 bg-[var(--leaf-dark)]/12" />
                <div className="h-px w-6 bg-[var(--leaf-dark)]/8" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
              {[
                [Sprout, "Sourcing", "Direct relationships and ingredient discipline built into every product decision."],
                [Users, "Partners", "Fair, long-term growth with farm communities and supply networks."],
                [Leaf, "Environment", "Sustainability choices built into every stage of expansion."],
              ].map(([Icon, title, body]) => (
                <article key={title as string} className="group relative flex flex-col border border-[var(--line)] bg-[var(--paper)] p-8 transition-all duration-300 hover:border-[var(--leaf)]/40 hover:bg-white hover:shadow-md hover:shadow-green-900/5">
                  <div className="mb-auto flex h-11 w-11 items-center justify-center border border-[var(--wheat)]/30 bg-[var(--wheat)]/8 text-[var(--wheat-deep)] transition-colors group-hover:bg-[var(--wheat)]/14">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-10 text-[13px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)]">{title as string}</h3>
                  <p className="mt-3 text-[13px] leading-7 text-[var(--stone)]">{body as string}</p>
                </article>
              ))}
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
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">Partner Voices</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">
                Trusted by those who source with care
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
                <p className="text-[13px] font-extrabold text-[var(--leaf-dark)]">4.9 / 5</p>
                <p className="text-[10px] text-[var(--stone)] tracking-wide">Partner satisfaction</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className={`flex flex-col border p-8 transition-all duration-300 ${
                  idx === 1
                    ? "border-[var(--wheat)] bg-[var(--leaf-dark)] text-white"
                    : "border-[var(--line)] bg-[var(--cream)] hover:border-[var(--wheat)]/50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-green-900/5"
                }`}
              >
                <Quote size={26} className={`mb-6 ${idx === 1 ? "text-[var(--wheat)]/50" : "text-[var(--wheat-deep)]/35"}`} />
                <p className={`flex-1 text-[14px] leading-8 ${idx === 1 ? "text-white/80" : "text-[var(--stone)]"}`}>
                  "{t.quote}"
                </p>
                <div className={`mt-8 flex items-center gap-4 border-t pt-6 ${idx === 1 ? "border-white/10" : "border-[var(--line)]"}`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center text-[11px] font-extrabold ${idx === 1 ? "bg-[var(--wheat)]/18 text-[var(--wheat)]" : "bg-[var(--wheat)]/14 text-[var(--wheat-deep)]"}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className={`text-[13px] font-extrabold ${idx === 1 ? "text-white" : "text-[var(--leaf-dark)]"}`}>{t.name}</p>
                    <p className={`text-[11px] mt-0.5 ${idx === 1 ? "text-white/48" : "text-[var(--stone)]"}`}>{t.role}</p>
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
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">Our Brands</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">A growing farm-led portfolio</h2>
            </div>
            <Link href="/brands" className="hidden items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:text-[var(--leaf)] sm:inline-flex">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,77,44,0.04)_0%,rgba(10,77,44,0.55)_55%,rgba(10,77,44,0.95)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-10">
                  <div className="flex items-center gap-2 text-[var(--wheat)]">
                    <span className="h-px w-5 bg-[var(--wheat)]" />
                    <p className="label-caps text-[10px] tracking-[0.22em]">{brand.label}</p>
                  </div>
                  <h3 className="display-serif mt-3 text-4xl font-normal">{brand.title}</h3>
                  <div className="mt-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition group-hover:text-[var(--wheat)]">
                    <span>Explore</span>
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
            <span className="label-caps text-[11px] tracking-[0.24em] text-white/35">Our Commitments</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              [BadgeCheck, "FSSAI aligned"],
              [BriefcaseBusiness, "B2B ready"],
              [Wheat, "Farm origin"],
              [Leaf, "Sustainable growth"],
            ].map(([Icon, label]) => (
              <div key={label as string} className="group flex flex-col items-center justify-center gap-4 border border-white/10 bg-white/[0.03] py-8 px-6 text-center transition-colors hover:border-[var(--wheat)]/30 hover:bg-white/[0.06]">
                <Icon size={22} className="text-[var(--wheat)] transition group-hover:scale-110" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/60 group-hover:text-[var(--wheat)]">
                  {label as string}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}