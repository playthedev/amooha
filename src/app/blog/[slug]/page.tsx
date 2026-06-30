"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, Clock } from "lucide-react";
import { useT } from "@/i18n/language-provider";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const tb = useT().blog;
  const post = tb.posts.find((p) => p.slug === slug);
  const related = tb.posts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="display-serif text-3xl font-normal text-[var(--leaf-dark)]">404</p>
        <Link
          href="/blog"
          className="bg-[var(--wheat)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:brightness-105"
        >
          {tb.post.back}
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--leaf-dark)] py-24 text-white sm:py-28">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,77,44,0.85),rgba(10,77,44,0.92))]" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
          <nav className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            <Link href="/blog" className="transition hover:text-white">{tb.post.breadcrumb}</Link>
            <ChevronRight size={13} />
            <span className="text-[var(--wheat)]">{post.category}</span>
          </nav>
          <h1 className="display-serif mt-6 text-4xl font-normal leading-[1.12] sm:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[12px] text-white/70">
            <span>{tb.post.published} {post.date}</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} /> {post.readTime} {tb.list.minRead}
            </span>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--stone)] transition hover:text-[var(--leaf-dark)]"
        >
          <ArrowLeft size={14} />
          {tb.post.back}
        </Link>
        <p className="mt-8 display-serif text-xl font-normal leading-9 text-[var(--leaf-dark)]">{post.excerpt}</p>
        <div className="mt-8 flex flex-col gap-6">
          {post.content.map((para, i) => (
            <p key={i} className="text-[15px] leading-8 text-[var(--stone)]">{para}</p>
          ))}
        </div>
      </article>

      {/* ── CTA ── */}
      <section className="bg-[var(--cream)] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 border border-[var(--line)] bg-[var(--paper)] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="display-serif text-2xl font-normal text-[var(--leaf-dark)]">{tb.post.ctaHeading}</h2>
            <p className="mt-3 max-w-md text-[14px] leading-7 text-[var(--stone)]">{tb.post.ctaBody}</p>
          </div>
          <Link
            href="/products"
            className="inline-flex h-13 shrink-0 items-center justify-center gap-3 bg-[var(--leaf-dark)] px-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--leaf)]"
          >
            {tb.post.ctaButton}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="bg-[var(--paper)] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex items-center gap-3">
              <span className="h-px w-6 bg-[var(--wheat-deep)]" />
              <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{tb.post.related}</span>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden border border-[var(--line)] bg-[var(--cream)] transition-all duration-300 hover:border-[var(--wheat)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/6"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--wheat-deep)]">{p.category}</span>
                    <h3 className="display-serif mt-2 text-lg font-normal leading-snug text-[var(--leaf-dark)]">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
