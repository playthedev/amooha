"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Leaf,
  Recycle,
  ScanSearch,
  Sprout,
  TreePine,
  Users,
  Handshake,
  TrendingUp,
} from "lucide-react";
import { useT } from "@/i18n/language-provider";

// Icons stay constant across locales; aligned by index with the dictionary.
const commitmentIcons = [Sprout, Recycle, ScanSearch, Leaf];
const principleIcons = [TreePine, Users, Handshake, TrendingUp];

export default function SustainabilityPage() {
  const ts = useT().sustainability;
  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--leaf-dark)] py-32 text-white">
        <Image
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80"
          alt="Hands holding fresh farm harvest"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        {/* Richer directional gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,77,44,0.97)_0%,rgba(10,77,44,0.75)_50%,rgba(10,77,44,0.15)_100%)]" />
        {/* Thin top rule */}
        <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Kicker */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--wheat)]" />
            <span className="label-caps text-[var(--wheat)] tracking-[0.24em]">{ts.hero.kicker}</span>
          </div>

          <h1 className="display-serif mt-7 max-w-4xl text-5xl font-normal leading-[1.08] sm:text-6xl lg:text-7xl">
            {ts.hero.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/76">
            {ts.hero.body}
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center gap-3 bg-[var(--wheat)] px-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:brightness-105"
            >
              {ts.hero.partnerCta}
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/introduction"
              className="inline-flex h-13 items-center justify-center border border-white/28 px-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-white/8 hover:border-white/55"
            >
              {ts.hero.storyCta}
            </Link>
          </div>

          {/* Bottom scroll hint */}
          <div className="mt-20 flex items-center gap-3 text-white/35">
            <div className="h-px w-10 bg-white/20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]">{ts.hero.scroll}</span>
          </div>
        </div>

        {/* Decorative bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8" />
      </section>

      {/* ── INTRO STATEMENT ── */}
      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{ts.intro.kicker}</span>
              </div>
              <p className="display-serif mt-5 text-3xl font-normal leading-snug text-[var(--leaf-dark)] sm:text-4xl">
                {ts.intro.quote}
              </p>
            </div>
            <div className="lg:col-span-5 lg:pl-10">
              <div className="border-l-2 border-[var(--wheat)] pl-6">
                <p className="text-[14px] leading-8 text-[var(--stone)]">
                  {ts.intro.para1}
                </p>
                <p className="mt-4 text-[14px] leading-8 text-[var(--stone)]">
                  {ts.intro.para2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMITMENTS GRID ── */}
      <section className="bg-[var(--paper)] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-[var(--wheat-deep)]" />
              <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{ts.framework.kicker}</span>
            </div>
            <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">
              {ts.framework.headingLine1}<br className="hidden sm:block" />{ts.framework.headingLine2}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {ts.framework.items.map(({ number, title, body }, i) => {
              const Icon = commitmentIcons[i];
              return (
              <article
                key={title}
                className="group relative flex flex-col border border-[var(--line)] bg-[var(--cream)] p-10 transition-all duration-300 hover:border-[var(--wheat)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/6"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-[var(--wheat)] transition-all duration-500 group-hover:w-full" />

                {/* Header row */}
                <div className="flex items-start justify-between">
                  <span className="display-serif text-6xl font-normal leading-none text-[var(--wheat-deep)]/50">
                    {number}
                  </span>
                  <div className="flex h-13 w-13 items-center justify-center border border-[var(--wheat)]/40 bg-[var(--wheat)]/8 text-[var(--leaf-dark)] transition-colors group-hover:border-[var(--wheat)] group-hover:bg-[var(--wheat)]/15">
                    <Icon size={22} />
                  </div>
                </div>

                {/* Divider */}
                <div className="my-7 h-px w-full bg-[var(--line)] transition-colors group-hover:bg-[var(--wheat)]/30" />

                {/* Body */}
                <h2 className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)]">
                  {title}
                </h2>
                <p className="mt-4 flex-1 text-[14px] leading-8 text-[var(--stone)]">{body}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES STRIP ── */}
      <section className="bg-[var(--wheat)] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-6 bg-[var(--leaf-dark)]/30" />
            <span className="label-caps text-[var(--leaf-dark)]/55 tracking-[0.22em]">{ts.principles.kicker}</span>
          </div>
          <div className="grid gap-px bg-[var(--leaf-dark)]/10 sm:grid-cols-2 lg:grid-cols-4">
            {ts.principles.items.map(({ title, body }, i) => {
              const Icon = principleIcons[i];
              return (
              <div
                key={title}
                className="group flex flex-col bg-[var(--wheat)] p-8 transition-colors hover:bg-[var(--leaf-dark)]"
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center border border-[var(--leaf-dark)]/20 bg-[var(--leaf-dark)]/8 text-[var(--leaf-dark)] transition-colors group-hover:border-[var(--wheat)]/30 group-hover:bg-[var(--wheat)]/10 group-hover:text-[var(--wheat)]">
                  <Icon size={20} />
                </div>
                <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)] transition-colors group-hover:text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-7 text-[var(--leaf-dark)]/60 transition-colors group-hover:text-white/60">
                  {body}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IMPACT METRICS ── */}
      <section className="bg-[var(--leaf-dark)] px-5 py-24 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat)]" />
                <span className="label-caps text-[var(--wheat)] tracking-[0.22em]">{ts.impact.kicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">
                {ts.impact.heading}
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-10">
              <p className="text-[14px] leading-8 text-white/55">
                {ts.impact.intro}
              </p>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {ts.impact.metrics.map(({ value, label }) => (
              <div key={label} className="flex min-h-40 flex-col justify-between bg-[var(--leaf-dark)] p-6 sm:min-h-52 sm:p-8 lg:p-10">
                <p className="display-serif text-4xl font-normal leading-none text-[var(--wheat)] sm:text-5xl lg:text-6xl">
                  {value}
                </p>
                <div className="mt-6 sm:mt-8">
                  <div className="mb-3 h-px w-8 bg-[var(--wheat)]/30" />
                  <p className="label-caps max-w-[13rem] text-[10px] tracking-[0.18em] text-white/50">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary stat cards */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="flex items-center gap-6 border border-white/8 bg-white/4 p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[var(--wheat)]/25 bg-[var(--wheat)]/8">
                <BadgeCheck size={22} className="text-[var(--wheat)]" />
              </div>
              <div>
                <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-white">
                  {ts.impact.card1Title}
                </p>
                <p className="mt-1.5 text-[12px] leading-6 text-white/45">
                  {ts.impact.card1Body}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 border border-white/8 bg-white/4 p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[var(--wheat)]/25 bg-[var(--wheat)]/8">
                <Sprout size={22} className="text-[var(--wheat)]" />
              </div>
              <div>
                <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-white">
                  {ts.impact.card2Title}
                </p>
                <p className="mt-1.5 text-[12px] leading-6 text-white/45">
                  {ts.impact.card2Body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISUAL BREAK: FULL-WIDTH FARM IMAGE ── */}
      <section className="relative h-80 overflow-hidden bg-[var(--leaf-dark)] sm:h-96 lg:h-[440px]">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
          alt="Amoohaa farm fields at dusk"
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,77,44,0.55),rgba(10,77,44,0.15),rgba(10,77,44,0.55))]" />
        <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
          <div>
            <p className="display-serif text-3xl font-normal text-white sm:text-4xl lg:text-5xl">
              {ts.quoteBreak.text}
            </p>
            <div className="mx-auto mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[var(--wheat)]/60" />
              <span className="label-caps text-[11px] text-[var(--wheat)] tracking-[0.22em]">{ts.quoteBreak.attribution}</span>
              <span className="h-px w-8 bg-[var(--wheat)]/60" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 border border-[var(--line)] bg-[var(--paper)] p-10 sm:flex-row sm:items-center sm:justify-between lg:p-14">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{ts.cta.kicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-3xl font-normal sm:text-4xl">
                {ts.cta.heading}
              </h2>
              <p className="mt-4 max-w-lg text-[14px] leading-7 text-[var(--stone)]">
                {ts.cta.body}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:items-end">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center justify-center gap-3 bg-[var(--leaf-dark)] px-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--leaf)]"
              >
                {ts.cta.getInTouch}
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/introduction"
                className="inline-flex h-10 items-center justify-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)] transition hover:text-[var(--leaf)]"
              >
                {ts.cta.readStory}
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
