"use client";

import { useEffect, useRef, useState } from "react";

const values = [
  {
    title: "Purity",
    icon: "✦",
    body: "Zero-compromise standards for ingredient integrity, crop quality, and consumer confidence.",
  },
  {
    title: "Traceability",
    icon: "◈",
    body: "A clear farm-to-brand story that makes sourcing easier to explain and easier to trust.",
  },
  {
    title: "Farmer Welfare",
    icon: "❋",
    body: "Partnerships designed around fairness, continuity, and sustainable agricultural progress.",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Founding Roots",
    body: "The first farm partnerships shaped the blueprint for Amoohaa Farms.",
  },
  {
    year: "2022",
    title: "Power Pulz Launch",
    body: "The flagship nutrition label created a dedicated product experience.",
  },
  {
    year: "2024",
    title: "Farm Business Growth",
    body: "The company began expanding its harvest, sourcing, and food lines.",
  },
  {
    year: "2026",
    title: "Future Growth",
    body: "Amoohaa Farms continues building a connected farm-to-brand ecosystem.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function IntroductionPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          ALL styles are scoped under .intro-page
          No resets, no body/html/*, no :root overrides
          Uses hard-coded colour values so existing CSS vars are safe
      ───────────────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* HERO */
        .intro-page .ip-hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #1a4a2e;
        }
        .intro-page .ip-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
          transform: scale(1.04);
          transition: transform 8s ease-out;
        }
        .intro-page .ip-hero-img.loaded { transform: scale(1); }
        .intro-page .ip-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg,rgba(10,42,22,.50) 0%,rgba(10,42,22,.80) 55%,rgba(8,33,17,.96) 100%);
        }
        .intro-page .ip-hero-grain {
          position: absolute;
          inset: 0;
          opacity: .04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
          pointer-events: none;
        }
        .intro-page .ip-hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 2rem;
          max-width: 900px;
          box-sizing: border-box;
        }
        .intro-page .ip-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: #d4a853;
          border: 1px solid rgba(212,168,83,.3);
          border-radius: 100px;
          padding: 8px 18px;
          opacity: 0;
          animation: ip-fadeUp .8s ease .3s forwards;
        }
        .intro-page .ip-eyebrow::before,
        .intro-page .ip-eyebrow::after { content: '—'; opacity: .4; }
        .intro-page .ip-hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.8rem,8vw,7rem);
          font-weight: 400;
          font-style: italic;
          line-height: 1.06;
          color: #fff;
          margin-top: 2rem;
          opacity: 0;
          animation: ip-fadeUp .9s ease .55s forwards;
        }
        .intro-page .ip-hero-title em { font-style: normal; color: #d4a853; }
        .intro-page .ip-hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(.95rem,2vw,1.15rem);
          font-weight: 300;
          color: rgba(255,255,255,.62);
          margin-top: 1.5rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.78;
          opacity: 0;
          animation: ip-fadeUp .9s ease .8s forwards;
        }
        .intro-page .ip-scroll-hint {
          margin-top: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: ip-fadeUp 1s ease 1.1s forwards;
        }
        .intro-page .ip-scroll-hint span {
          font-family: 'DM Sans', sans-serif;
          font-size: .62rem;
          letter-spacing: .24em;
          text-transform: uppercase;
          color: rgba(255,255,255,.3);
        }
        .intro-page .ip-scroll-line {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom,#d4a853,transparent);
          animation: ip-scrollPulse 2.2s ease-in-out 1.5s infinite;
        }
        @keyframes ip-scrollPulse {
          0%,100% { opacity:.45; transform:scaleY(1); }
          50%      { opacity:1;   transform:scaleY(1.15); }
        }
        @keyframes ip-fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* STAT BAR */
        .intro-page .ip-stat-bar {
          background: #d4a853;
          padding: 2.75rem 1.5rem;
          box-sizing: border-box;
        }
        .intro-page .ip-stat-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 1.5rem;
          text-align: center;
        }
        @media (min-width:640px) {
          .intro-page .ip-stat-grid { grid-template-columns: repeat(4,1fr); }
        }
        .intro-page .ip-stat-num {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem,5vw,3.2rem);
          font-weight: 500;
          color: #1a4a2e;
          line-height: 1;
          display: block;
        }
        .intro-page .ip-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #1a4a2e;
          opacity: .62;
          margin-top: .4rem;
          display: block;
        }

        /* SHARED SECTION */
        .intro-page .ip-section {
          padding: 6rem 1.5rem;
          box-sizing: border-box;
        }
        @media (min-width:640px) {
          .intro-page .ip-section { padding: 8rem 2rem; }
        }
        .intro-page .ip-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: #2d6a46;
          opacity: .7;
          display: block;
        }
        .intro-page .ip-section-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 500;
          color: #1a4a2e;
          margin-top: .75rem;
          font-size: clamp(1.9rem,4vw,3.2rem);
          line-height: 1.15;
        }

        /* VALUES */
        .intro-page .ip-values-bg { background: #f7f3ec; }
        .intro-page .ip-values-header { text-align: center; margin-bottom: 4rem; }
        .intro-page .ip-values-grid {
          display: grid;
          gap: 2px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (min-width:640px) {
          .intro-page .ip-values-grid { grid-template-columns: repeat(3,1fr); }
        }
        .intro-page .ip-value-card {
          position: relative;
          padding: 2.75rem 2.25rem;
          background: #faf6ef;
          overflow: hidden;
          cursor: default;
          transition: background .32s ease;
          box-sizing: border-box;
        }
        .intro-page .ip-value-card:hover { background: #1a4a2e; }
        .intro-page .ip-value-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 3px;
          background: linear-gradient(to right,#d4a853,#4a9163);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .4s ease;
        }
        .intro-page .ip-value-card:hover::before { transform: scaleX(1); }
        .intro-page .ip-value-icon {
          font-size: 1.5rem;
          color: #d4a853;
          line-height: 1;
          transition: transform .3s ease;
          display: block;
        }
        .intro-page .ip-value-card:hover .ip-value-icon { transform: rotate(90deg); }
        .intro-page .ip-value-num {
          position: absolute;
          top: 1.75rem; right: 2rem;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 3.2rem;
          font-weight: 400;
          color: #e8e2d8;
          line-height: 1;
          transition: color .32s;
          pointer-events: none;
        }
        .intro-page .ip-value-card:hover .ip-value-num { color: rgba(255,255,255,.07); }
        .intro-page .ip-value-title {
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #1a4a2e;
          margin-top: 1.4rem;
          display: block;
          transition: color .32s;
        }
        .intro-page .ip-value-card:hover .ip-value-title { color: #d4a853; }
        .intro-page .ip-value-body {
          font-family: 'DM Sans', sans-serif;
          font-size: .95rem;
          line-height: 1.82;
          color: #5a5550;
          margin-top: .85rem;
          transition: color .32s;
        }
        .intro-page .ip-value-card:hover .ip-value-body { color: rgba(255,255,255,.62); }

        /* TIMELINE */
        .intro-page .ip-timeline-bg { background: #faf6ef; }
        .intro-page .ip-timeline-header { text-align: center; margin-bottom: 4.5rem; }
        .intro-page .ip-timeline-track {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
        .intro-page .ip-timeline-spine {
          position: absolute;
          left: 26px; top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom,transparent,#2d6a46 12%,#d4a853 50%,#2d6a46 88%,transparent);
        }
        @media (min-width:640px) {
          .intro-page .ip-timeline-spine { left: 50%; transform: translateX(-.5px); }
        }
        .intro-page .ip-tl-item {
          position: relative;
          padding-left: 68px;
          padding-bottom: 3.5rem;
          box-sizing: border-box;
        }
        @media (min-width:640px) {
          .intro-page .ip-tl-item {
            padding-left: 0;
            display: grid;
            grid-template-columns: 1fr 56px 1fr;
            align-items: start;
          }
          .intro-page .ip-tl-item:nth-child(odd)  .ip-tl-content { grid-column:1; text-align:right; padding-right:2.25rem; }
          .intro-page .ip-tl-item:nth-child(odd)  .ip-tl-dot     { grid-column:2; }
          .intro-page .ip-tl-item:nth-child(odd)  .ip-tl-space   { grid-column:3; }
          .intro-page .ip-tl-item:nth-child(even) .ip-tl-space   { grid-column:1; }
          .intro-page .ip-tl-item:nth-child(even) .ip-tl-dot     { grid-column:2; }
          .intro-page .ip-tl-item:nth-child(even) .ip-tl-content { grid-column:3; text-align:left; padding-left:2.25rem; }
        }
        .intro-page .ip-tl-content { position: relative; }
        .intro-page .ip-tl-content::before {
          content: '';
          position: absolute;
          left: -44px; top: 6px;
          width: 13px; height: 13px;
          border-radius: 50%;
          border: 2px solid #d4a853;
          background: #faf6ef;
        }
        @media (min-width:640px) {
          .intro-page .ip-tl-content::before { display: none; }
        }
        .intro-page .ip-tl-dot { display: none; }
        @media (min-width:640px) {
          .intro-page .ip-tl-dot { display:flex; justify-content:center; padding-top:.55rem; }
        }
        .intro-page .ip-tl-dot-inner {
          width: 13px; height: 13px;
          border-radius: 50%;
          border: 2px solid #d4a853;
          background: #faf6ef;
          flex-shrink: 0;
          transition: background .3s, transform .3s;
        }
        .intro-page .ip-tl-item:hover .ip-tl-dot-inner { background:#d4a853; transform:scale(1.35); }
        .intro-page .ip-tl-year {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.6rem,5vw,3.8rem);
          font-weight: 400;
          color: #b8893a;
          opacity: .55;
          line-height: 1;
          display: block;
        }
        .intro-page .ip-tl-title {
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: #1a4a2e;
          margin-top: .5rem;
          display: block;
        }
        .intro-page .ip-tl-body {
          font-family: 'DM Sans', sans-serif;
          font-size: .93rem;
          line-height: 1.78;
          color: #5a5550;
          margin-top: .4rem;
          max-width: 270px;
        }
        @media (min-width:640px) {
          .intro-page .ip-tl-item:nth-child(odd) .ip-tl-body { margin-left:auto; margin-right:0; }
        }

        /* QUOTE */
        .intro-page .ip-quote-bg {
          background: #1a4a2e;
          position: relative;
          overflow: hidden;
        }
        .intro-page .ip-quote-bg::before {
          content:'';
          position:absolute;
          top:-140px; right:-140px;
          width:520px; height:520px;
          border-radius:50%;
          background:radial-gradient(circle,rgba(212,168,83,.09) 0%,transparent 65%);
          pointer-events:none;
        }
        .intro-page .ip-quote-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          gap: 4rem;
          align-items: center;
        }
        @media (min-width:900px) {
          .intro-page .ip-quote-inner { grid-template-columns:5fr 7fr; }
        }
        .intro-page .ip-quote-img-wrap {
          position: relative;
          aspect-ratio: 4/5;
          overflow: hidden;
          border-radius: 2px;
          box-shadow: 0 40px 80px rgba(0,0,0,.35);
        }
        .intro-page .ip-quote-img {
          width:100%; height:100%;
          object-fit:cover;
          display:block;
          transition:transform .7s ease;
        }
        .intro-page .ip-quote-img-wrap:hover .ip-quote-img { transform:scale(1.05); }
        .intro-page .ip-quote-img-border {
          position:absolute; inset:0;
          border:1px solid rgba(255,255,255,.1);
          pointer-events:none;
        }
        .intro-page .ip-quote-label {
          font-family:'DM Sans',sans-serif;
          font-size:.62rem;
          font-weight:700;
          letter-spacing:.26em;
          text-transform:uppercase;
          color:#d4a853;
          padding-bottom:10px;
          border-bottom:1px solid rgba(212,168,83,.28);
          display:inline-block;
        }
        .intro-page .ip-quote-deco {
          font-family:'Playfair Display',Georgia,serif;
          font-size:7rem;
          line-height:.65;
          color:rgba(212,168,83,.13);
          display:block;
          margin-top:1.75rem;
          user-select:none;
          pointer-events:none;
        }
        .intro-page .ip-blockquote { margin-top:-.5rem; }
        .intro-page .ip-blockquote p {
          font-family:'Playfair Display',Georgia,serif;
          font-size:clamp(1.5rem,2.8vw,2.4rem);
          font-weight:400;
          font-style:italic;
          line-height:1.48;
          color:#fff;
        }
        .intro-page .ip-quote-divider {
          width:48px; height:1px;
          background:rgba(212,168,83,.38);
          margin-top:2.25rem;
        }
        .intro-page .ip-quote-body {
          font-family:'DM Sans',sans-serif;
          font-size:.975rem;
          line-height:1.88;
          color:rgba(255,255,255,.58);
          margin-top:1.6rem;
          max-width:540px;
          font-weight:300;
        }
        .intro-page .ip-quote-attr {
          display:flex;
          align-items:center;
          gap:12px;
          margin-top:2.25rem;
        }
        .intro-page .ip-attr-line {
          width:26px; height:2px;
          background:#d4a853;
          flex-shrink:0;
        }
        .intro-page .ip-attr-name {
          font-family:'DM Sans',sans-serif;
          font-size:.72rem;
          font-weight:700;
          letter-spacing:.12em;
          text-transform:uppercase;
          color:rgba(255,255,255,.42);
        }
      `}</style>

      <main className="intro-page">

        {/* HERO */}
        <section className="ip-hero">
          <img
            src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1600&q=80"
            alt="Fresh vegetables harvested from a farm"
            className={`ip-hero-img${heroLoaded ? " loaded" : ""}`}
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="ip-hero-overlay" />
          <div className="ip-hero-grain" />
          <div className="ip-hero-content">
            <span className="ip-eyebrow">Heritage &amp; Precision</span>
            <h1 className="ip-hero-title">
              From the soil,<br /><em>with purpose.</em>
            </h1>
            <p className="ip-hero-sub">
              Building trust between the farm and the table through transparency and care.
            </p>
            <div className="ip-scroll-hint">
              <span>Scroll</span>
              <div className="ip-scroll-line" />
            </div>
          </div>
        </section>

        {/* STAT BAR */}
        <FadeIn>
          <div className="ip-stat-bar">
            <div className="ip-stat-grid">
              {[["2018","Est. Year"],["50+","Farm Partners"],["3","Product Lines"],["100%","Traceable"]].map(([n,l]) => (
                <div key={l}>
                  <span className="ip-stat-num">{n}</span>
                  <span className="ip-stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* VALUES */}
        <section className="ip-section ip-values-bg">
          <FadeIn>
            <div className="ip-values-header">
              <span className="ip-section-label">What we stand for</span>
              <h2 className="ip-section-heading">Our Core Values</h2>
            </div>
          </FadeIn>
          <div className="ip-values-grid">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.12}>
                <article className="ip-value-card">
                  <span className="ip-value-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ip-value-icon">{v.icon}</span>
                  <span className="ip-value-title">{v.title}</span>
                  <p className="ip-value-body">{v.body}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="ip-section ip-timeline-bg">
          <FadeIn>
            <div className="ip-timeline-header">
              <span className="ip-section-label">Our journey</span>
              <h2 className="ip-section-heading">Our Evolution</h2>
            </div>
          </FadeIn>
          <div className="ip-timeline-track">
            <div className="ip-timeline-spine" />
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1}>
                <article className="ip-tl-item">
                  <div className="ip-tl-content">
                    <span className="ip-tl-year">{item.year}</span>
                    <span className="ip-tl-title">{item.title}</span>
                    <p className="ip-tl-body">{item.body}</p>
                  </div>
                  <div className="ip-tl-dot">
                    <div className="ip-tl-dot-inner" />
                  </div>
                  <div className="ip-tl-space" />
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* FOUNDER QUOTE */}
        <section className="ip-section ip-quote-bg">
          <div className="ip-quote-inner">
            <FadeIn>
              <div className="ip-quote-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80"
                  alt="Farm landscape"
                  className="ip-quote-img"
                />
                <div className="ip-quote-img-border" />
              </div>
            </FadeIn>
            <FadeIn delay={0.18}>
              <div>
                <span className="ip-quote-label">A word from the founder</span>
                <span className="ip-quote-deco">"</span>
                <blockquote className="ip-blockquote">
                  <p>
                    We don't just grow food; we nurture a legacy of health and
                    trust. Every seed planted is a promise kept to the next generation.
                  </p>
                </blockquote>
                <div className="ip-quote-divider" />
                <p className="ip-quote-body">
                  Amoohaa Farms was born from a simple realization: the gap between
                  the soil and the plate had grown too wide. The business exists to
                  close that gap through clarity, care, and disciplined product
                  development.
                </p>
                <div className="ip-quote-attr">
                  <div className="ip-attr-line" />
                  <span className="ip-attr-name">Founder, Amoohaa Farms</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
    </>
  );
}