"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useT } from "@/i18n/language-provider";

export default function BlogPage() {
  const t = useT();
  const tb = t.blog;
  const posts = tb.posts;
  const [featured, ...rest] = posts;

  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--leaf-dark)] py-28 text-white sm:py-32">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
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
            <span className="label-caps text-[var(--wheat)] tracking-[0.24em]">{tb.hero.kicker}</span>
          </div>
          <h1 className="display-serif mt-7 max-w-4xl text-5xl font-normal leading-[1.08] sm:text-6xl lg:text-7xl">
            {tb.hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/76">{tb.hero.body}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8" />
      </section>

      {/* ── FEATURED ── */}
      {featured && (
        <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-center gap-3">
              <span className="h-px w-6 bg-[var(--wheat-deep)]" />
              <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{tb.list.featured}</span>
            </div>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-0 overflow-hidden border border-[var(--line)] bg-[var(--paper)] transition-all duration-300 hover:border-[var(--wheat)] hover:shadow-lg hover:shadow-green-900/6 lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--wheat-deep)]">
                  <span>{featured.category}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--wheat-deep)]/50" />
                  <span className="text-[var(--stone)]">{featured.date}</span>
                </div>
                <h2 className="display-serif mt-4 text-3xl font-normal leading-snug text-[var(--leaf-dark)] sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[14px] leading-8 text-[var(--stone)]">{featured.excerpt}</p>
                <div className="mt-7 flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition group-hover:text-[var(--leaf)]">
                    {tb.list.readMore}
                    <ArrowRight size={14} />
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--stone)]">
                    <Clock size={13} /> {featured.readTime} {tb.list.minRead}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── LATEST GRID ── */}
      <section className="bg-[var(--paper)] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex items-center gap-3">
            <span className="h-px w-6 bg-[var(--wheat-deep)]" />
            <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{tb.list.latest}</span>
          </div>
          {rest.length === 0 ? (
            <p className="text-[14px] text-[var(--stone)]">{tb.list.empty}</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden border border-[var(--line)] bg-[var(--cream)] transition-all duration-300 hover:border-[var(--wheat)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/6"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--wheat-deep)]">
                      <span>{post.category}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--wheat-deep)]/50" />
                      <span className="text-[var(--stone)]">{post.date}</span>
                    </div>
                    <h3 className="display-serif mt-3 text-xl font-normal leading-snug text-[var(--leaf-dark)]">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[13px] leading-7 text-[var(--stone)]">{post.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)] transition group-hover:text-[var(--leaf)]">
                        {tb.list.readMore}
                        <ArrowRight size={13} />
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-[var(--stone)]">
                        <Clock size={12} /> {post.readTime} {tb.list.minRead}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
