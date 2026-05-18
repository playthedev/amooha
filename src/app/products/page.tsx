"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Leaf, PackageCheck, Wheat } from "lucide-react";

const products = [
  {
    name: "Artisanal Makhana",
    source: "Bihar — Makhana Belt",
    category: "Superfoods",
    desc: "Air-puffed lotus seeds, harvested by hand from freshwater lakes and sun-dried for peak crunch.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Heritage Almonds",
    source: "Kashmir Valley",
    category: "Nuts",
    desc: "Cold-climate almonds with a rich, buttery depth from altitude-grown orchards in the valley.",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Black Chia Gold",
    source: "Rajasthan Harvest",
    category: "Seeds",
    desc: "Dense omega-3 profile from sun-intensive Rajasthani soil. Clean, neutral flavour for any format.",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mountain Walnuts",
    source: "Kashmir Groves",
    category: "Nuts",
    desc: "Hand-cracked Kashmiri walnuts with warm, earthy notes from slow mountain maturation.",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Emerald Pepitas",
    source: "Rajasthan Estates",
    category: "Seeds",
    desc: "Premium pumpkin seeds, cold-cleaned and sorted for consistent size, colour, and oil content.",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Prime Flax Seeds",
    source: "Punjab Fields",
    category: "Grains",
    desc: "Golden and brown flax from high-yield Punjab farms. Ideal for fortified food.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
  },
];

const filters = ["All", "Seeds", "Nuts", "Grains", "Superfoods"];

const badges = [
  { Icon: Wheat, label: "Farm Sourced" },
  { Icon: PackageCheck, label: "B2B Ready" },
  { Icon: BadgeCheck, label: "Quality Checked" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function ProductsPage() {
  const [active, setActive] = useState("All");

  const visible = active === "All"
    ? products
    : products.filter((p) => p.category === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── HERO ── */
        .pp-hero {
          position: relative;
          background: #faf6ef;
          padding: 7rem 1.5rem 5rem;
          text-align: center;
          overflow: hidden;
          box-sizing: border-box;
        }
        .pp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: .028;
          pointer-events: none;
        }
        .pp-hero::after {
          content: '';
          position: absolute;
          inset-x: 0; bottom: 0;
          height: 120px;
          background: linear-gradient(to bottom, transparent, #f7f3ec);
          pointer-events: none;
        }
        .pp-hero-eyebrow {
          position: relative; z-index: 1;
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: #2d6a46;
          opacity: .75;
        }
        .pp-hero-title {
          position: relative; z-index: 1;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.6rem, 7vw, 6rem);
          font-weight: 400;
          font-style: italic;
          line-height: 1.08;
          color: #1a4a2e;
          margin: 1.25rem auto 0;
          max-width: 820px;
        }
        .pp-hero-title em {
          font-style: normal;
          color: #b8893a;
        }
        .pp-hero-sub {
          position: relative; z-index: 1;
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(.95rem, 1.8vw, 1.1rem);
          font-weight: 300;
          color: #5a5550;
          line-height: 1.8;
          max-width: 560px;
          margin: 1.5rem auto 0;
        }
        .pp-badges {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: .75rem;
          max-width: 680px;
          margin: 3rem auto 0;
        }
        @media (max-width: 540px) {
          .pp-badges { grid-template-columns: 1fr; max-width: 280px; }
        }
        .pp-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: rgba(255,255,255,.7);
          border: 1px solid rgba(26,74,46,.14);
          padding: .9rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #1a4a2e;
          box-sizing: border-box;
        }
        .pp-badge svg { color: #b8893a; flex-shrink: 0; }

        /* ── FILTER BAR ── */
        .pp-filter-bar {
          position: sticky;
          top: 82px;
          z-index: 30;
          border-top: 1px solid rgba(26,74,46,.1);
          border-bottom: 1px solid rgba(26,74,46,.1);
          background: rgba(250,246,239,.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 1rem 1.5rem;
          box-sizing: border-box;
        }
        .pp-filter-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: .6rem;
        }
        .pp-filter-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          padding: .6rem 1.5rem;
          border: 1px solid;
          cursor: pointer;
          transition: background .22s, color .22s, border-color .22s;
          background: transparent;
          line-height: 1;
        }
        .pp-filter-btn.active {
          background: #1a4a2e;
          border-color: #1a4a2e;
          color: #fff;
        }
        .pp-filter-btn:not(.active) {
          border-color: rgba(26,74,46,.18);
          color: #5a5550;
        }
        .pp-filter-btn:not(.active):hover {
          border-color: #d4a853;
          color: #1a4a2e;
        }
        .pp-filter-count {
          font-family: 'DM Sans', sans-serif;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #5a5550;
          opacity: .55;
          margin-left: auto;
          padding-left: 1rem;
          white-space: nowrap;
          display: none;
        }
        @media (min-width: 640px) { .pp-filter-count { display: block; } }

        /* ── PRODUCT GRID ── */
        .pp-grid-section {
          padding: 5rem 1.5rem 7rem;
          background: #f7f3ec;
          box-sizing: border-box;
        }
        .pp-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 1px;
          background: rgba(26,74,46,.08);
        }
        @media (min-width: 640px)  { .pp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .pp-grid { grid-template-columns: repeat(3, 1fr); } }

        .pp-card {
          background: #faf6ef;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow .28s;
        }
        .pp-card:hover { box-shadow: 0 16px 48px rgba(26,74,46,.12); z-index: 1; position: relative; }

        .pp-card-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          flex-shrink: 0;
        }
        .pp-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .7s ease;
        }
        .pp-card:hover .pp-card-img { transform: scale(1.06); }

        .pp-card-cat {
          position: absolute;
          top: 1.25rem; left: 1.25rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .58rem;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          background: #d4a853;
          color: #1a4a2e;
          padding: .35rem .85rem;
        }

        .pp-card-body {
          padding: 2rem 2rem 2.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          box-sizing: border-box;
        }
        .pp-card-source {
          font-family: 'DM Sans', sans-serif;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #b8893a;
        }
        .pp-card-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.3rem, 2.2vw, 1.65rem);
          font-weight: 500;
          color: #1a4a2e;
          margin-top: .4rem;
          line-height: 1.2;
        }
        .pp-card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem;
          line-height: 1.75;
          color: #5a5550;
          margin-top: .75rem;
          flex: 1;
        }
        .pp-card-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(26,74,46,.1);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: #1a4a2e;
          transition: color .2s;
        }
        .pp-card-cta:hover { color: #d4a853; }
        .pp-card-cta svg { transition: transform .22s; }
        .pp-card-cta:hover svg { transform: translateX(4px); }

        /* empty state */
        .pp-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem 2rem;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          font-style: italic;
          color: #5a5550;
          background: #faf6ef;
        }

        /* ── CTA BANNER ── */
        .pp-cta-banner {
          background: #1a4a2e;
          padding: 3.5rem 1.5rem;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }
        .pp-cta-banner::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 360px; height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,168,83,.1) 0%, transparent 65%);
          pointer-events: none;
        }
        .pp-cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .pp-cta-inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .pp-cta-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .pp-cta-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px; height: 52px;
          border: 1px solid rgba(255,255,255,.15);
          color: #d4a853;
          flex-shrink: 0;
        }
        .pp-cta-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.15rem, 2.5vw, 1.6rem);
          font-weight: 400;
          font-style: italic;
          color: #fff;
          line-height: 1.35;
          max-width: 560px;
        }
        .pp-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #d4a853;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity .2s;
          flex-shrink: 0;
        }
        .pp-cta-link:hover { opacity: .75; }
        .pp-cta-link svg { transition: transform .22s; }
        .pp-cta-link:hover svg { transform: translateX(4px); }
      `}</style>

      <main>

        {/* ── HERO ── */}
        <section className="pp-hero">
          <FadeIn>
            <span className="pp-hero-eyebrow">Premium Harvest Series</span>
            <h1 className="pp-hero-title">
              Direct from <em>our farms.</em>
            </h1>
            <p className="pp-hero-sub">
              Honest cultivation, sharp sourcing, and ingredient families designed
              for premium consumer and B2B product development.
            </p>
            <div className="pp-badges">
              {badges.map(({ Icon, label }) => (
                <div className="pp-badge" key={label}>
                  <Icon size={16} />
                  {label}
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ── FILTER BAR ── */}
        <div className="pp-filter-bar">
          <div className="pp-filter-inner">
            {filters.map((f) => (
              <button
                key={f}
                className={`pp-filter-btn${active === f ? " active" : ""}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
            <span className="pp-filter-count">
              {visible.length} product{visible.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* ── PRODUCT GRID ── */}
        <section className="pp-grid-section">
          <div className="pp-grid">
            {visible.length === 0 && (
              <div className="pp-empty">No products in this category yet.</div>
            )}
            {visible.map((product, i) => (
              <FadeIn key={product.name} delay={i * 0.07}>
                <article className="pp-card">
                  <div className="pp-card-img-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="pp-card-img"
                    />
                    <span className="pp-card-cat">{product.category}</span>
                  </div>
                  <div className="pp-card-body">
                    <span className="pp-card-source">{product.source}</span>
                    <h2 className="pp-card-name">{product.name}</h2>
                    <p className="pp-card-desc">{product.desc}</p>
                    <Link href="/contact" className="pp-card-cta">
                      Enquire Now
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="pp-cta-banner">
          <div className="pp-cta-inner">
            <div className="pp-cta-left">
              <span className="pp-cta-icon">
                <Leaf size={22} />
              </span>
              <p className="pp-cta-text">
                Looking for bulk orders or white-label sourcing?
              </p>
            </div>
            <Link href="/contact" className="pp-cta-link">
              Contact our trade desk
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}