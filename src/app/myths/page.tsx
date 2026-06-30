"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { useT } from "@/i18n/language-provider";

export default function MythsPage() {
  const tm = useT().myths;

  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--leaf-dark)] py-28 text-white sm:py-32">
        <Image
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,77,44,0.97)_0%,rgba(10,77,44,0.75)_50%,rgba(10,77,44,0.15)_100%)]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--wheat)]" />
            <span className="label-caps text-[var(--wheat)] tracking-[0.24em]">{tm.hero.kicker}</span>
          </div>
          <h1 className="display-serif mt-7 max-w-4xl text-5xl font-normal leading-[1.08] sm:text-6xl lg:text-7xl">
            {tm.hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/76">{tm.hero.body}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8" />
      </section>

      {/* ── INTRO ── */}
      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{tm.intro.kicker}</span>
              </div>
              <p className="display-serif mt-5 text-3xl font-normal leading-snug text-[var(--leaf-dark)] sm:text-4xl">
                {tm.intro.heading}
              </p>
            </div>
            <div className="lg:col-span-5 lg:pl-10">
              <div className="border-l-2 border-[var(--wheat)] pl-6">
                <p className="text-[14px] leading-8 text-[var(--stone)]">{tm.intro.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MYTH / FACT LIST ── */}
      <section className="bg-[var(--paper)] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          {tm.items.map((item, i) => (
            <article
              key={i}
              className="overflow-hidden border border-[var(--line)] bg-[var(--cream)] transition-colors hover:border-[var(--wheat)]"
            >
              <div className="grid md:grid-cols-2">
                {/* Myth */}
                <div className="flex flex-col gap-3 border-b border-[var(--line)] p-8 md:border-b-0 md:border-r">
                  <span className="inline-flex w-fit items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--stone)]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--stone)]/15 text-[var(--stone)]">
                      <X size={13} />
                    </span>
                    {tm.mythLabel}
                  </span>
                  <p className="text-[15px] italic leading-7 text-[var(--ink)]/70">{item.myth}</p>
                </div>
                {/* Fact */}
                <div className="flex flex-col gap-3 bg-[var(--paper)] p-8">
                  <span className="inline-flex w-fit items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf)]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--leaf)]/15 text-[var(--leaf)]">
                      <Check size={13} />
                    </span>
                    {tm.factLabel}
                  </span>
                  <p className="text-[15px] leading-7 text-[var(--leaf-dark)]">{item.fact}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 border border-[var(--line)] bg-[var(--paper)] p-10 sm:flex-row sm:items-center sm:justify-between lg:p-14">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{tm.cta.kicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-3xl font-normal sm:text-4xl">{tm.cta.heading}</h2>
              <p className="mt-4 max-w-lg text-[14px] leading-7 text-[var(--stone)]">{tm.cta.body}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-13 shrink-0 items-center justify-center gap-3 bg-[var(--leaf-dark)] px-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--leaf)]"
            >
              {tm.cta.button}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
