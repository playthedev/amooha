"use client";

import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Send,
  Sprout,
} from "lucide-react";

const estateImage =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80";
const produceImage =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";

const details = [
  { label: "Email Us",         value: "partnerships@amoohaa.com",    Icon: Mail    },
  { label: "Call Us",          value: "+91 (562) 285-0044",          Icon: Phone   },
  { label: "Visit The Estate", value: "Agra-Mathura Highway, Agra",  Icon: MapPin  },
];

const enquiryTypes = [
  { label: "Raw Products",      Icon: Sprout           },
  { label: "Brand Partnership", Icon: BriefcaseBusiness },
  { label: "B2B Sourcing",      Icon: Building2        },
];

const formItems = ["Premium produce", "White-label sourcing", "Retail distribution"];

function useInView(threshold = 0.1): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
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

function FadeIn({
  children,
  delay = 0,
  style = {},
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <label className="cp-field">
      <span className="cp-field-label">{label}</span>
      <input
        className={`cp-field-input${focused ? " focused" : ""}`}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </label>
  );
}

export default function ContactPage() {
  const [heroImg, setHeroImg]     = useState(false);
  const [produceImg, setProduceImg] = useState(false);
  const [formImg, setFormImg]     = useState(false);
  const [footerImg, setFooterImg] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ─────────────────────────────────────────
           All rules prefixed .cp-* — zero global bleed
        ───────────────────────────────────────── */

        /* ── HERO ── */
        .cp-hero {
          position: relative;
          overflow: hidden;
          padding: 6rem 1.5rem 7rem;
          background: #fbf6e8;
          box-sizing: border-box;
        }
        @media (min-width: 640px) { .cp-hero { padding: 8rem 2rem 9rem; } }

        .cp-hero-bg {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease;
        }
        .cp-hero-bg.loaded { opacity: .14; }

        .cp-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            100deg,
            rgba(251,246,232,.97) 0%,
            rgba(251,246,232,.88) 52%,
            rgba(219,233,196,.72) 100%
          );
        }

        .cp-hero-grain {
          position: absolute; inset: 0;
          opacity: .025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
        }

        .cp-hero-inner {
          position: relative; z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 4rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .cp-hero-inner { grid-template-columns: 1fr 1fr; }
        }

        /* left col */
        .cp-hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: #b8893a;
          display: block;
        }
        .cp-hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 6vw, 5rem);
          font-weight: 400;
          font-style: italic;
          line-height: 1.1;
          color: #1a4a2e;
          margin-top: 1.25rem;
          max-width: 640px;
        }
        .cp-hero-title em { font-style: normal; color: #b8893a; }
        .cp-hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(.9rem, 1.6vw, 1.05rem);
          font-weight: 300;
          color: #5a5550;
          line-height: 1.85;
          margin-top: 1.5rem;
          max-width: 540px;
        }

        .cp-enq-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: .75rem;
          margin-top: 2.5rem;
          max-width: 520px;
        }
        @media (max-width: 480px) {
          .cp-enq-grid { grid-template-columns: 1fr; max-width: 260px; }
        }
        .cp-enq-card {
          border: 1px solid rgba(26,74,46,.13);
          background: rgba(255,255,255,.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 1.25rem 1rem;
          box-sizing: border-box;
        }
        .cp-enq-card svg { color: #b8893a; }
        .cp-enq-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: #1a4a2e;
          display: block;
          margin-top: 1rem;
        }

        /* right col — produce image card */
        .cp-produce-wrap {
          position: relative;
          min-height: 520px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(10,40,22,.18);
        }
        @media (min-width: 640px) { .cp-produce-wrap { min-height: 580px; } }

        .cp-produce-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity .9s ease;
        }
        .cp-produce-img.loaded { opacity: 1; }

        .cp-produce-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,42,22,.04) 0%, rgba(10,42,22,.86) 100%);
        }

        .cp-produce-text {
          position: absolute; inset-x: 0; bottom: 0;
          padding: 2.5rem;
          color: #fff;
          box-sizing: border-box;
        }
        @media (min-width: 640px) { .cp-produce-text { padding: 3rem; } }

        .cp-produce-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .26em;
          text-transform: uppercase;
          color: #d4a853;
          display: block;
        }
        .cp-produce-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 400;
          font-style: italic;
          line-height: 1.15;
          margin-top: .75rem;
        }
        .cp-produce-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .95rem;
          font-weight: 300;
          color: rgba(255,255,255,.72);
          line-height: 1.75;
          margin-top: .75rem;
          max-width: 420px;
        }

        /* floating badge */
        .cp-float-badge {
          position: absolute;
          bottom: -2rem; left: -2rem;
          display: none;
          background: #f7f3ec;
          border: 1px solid rgba(26,74,46,.12);
          padding: 1.25rem 1.5rem;
          box-shadow: 0 16px 40px rgba(10,40,22,.1);
          z-index: 4;
        }
        @media (min-width: 1024px) { .cp-float-badge { display: flex; align-items: center; gap: 1rem; } }

        .cp-float-icon {
          display: flex; align-items: center; justify-content: center;
          width: 46px; height: 46px;
          background: rgba(45,106,70,.1);
          color: #1a4a2e;
          flex-shrink: 0;
        }
        .cp-float-open {
          font-family: 'DM Sans', sans-serif;
          font-size: .58rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #b8893a;
          display: block;
        }
        .cp-float-title {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #1a4a2e;
          display: block;
          margin-top: .2rem;
        }

        /* ── CONTACT DETAILS ── */
        .cp-details-section {
          background: #f7f3ec;
          padding: 5rem 1.5rem;
          box-sizing: border-box;
        }
        @media (min-width: 640px) { .cp-details-section { padding: 6rem 2rem; } }

        .cp-details-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 1px;
          background: rgba(26,74,46,.08);
        }
        @media (min-width: 768px) {
          .cp-details-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .cp-detail-card {
          background: #faf6ef;
          padding: 2.5rem 2.25rem;
          box-sizing: border-box;
          transition: background .28s;
          cursor: default;
        }
        .cp-detail-card:hover { background: #fff; }
        .cp-detail-card::before {
          content: '';
          display: block;
          width: 100%; height: 3px;
          background: linear-gradient(to right, #d4a853, #4a9163);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .4s ease;
          margin-bottom: 2rem;
        }
        .cp-detail-card:hover::before { transform: scaleX(1); }

        .cp-detail-icon {
          display: flex; align-items: center; justify-content: center;
          width: 52px; height: 52px;
          border: 1px solid rgba(212,168,83,.5);
          color: #b8893a;
        }
        .cp-detail-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .26em;
          text-transform: uppercase;
          color: #5a5550;
          opacity: .7;
          display: block;
          margin-top: 1.75rem;
        }
        .cp-detail-value {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(.95rem, 1.5vw, 1.1rem);
          font-weight: 600;
          color: #1a4a2e;
          display: block;
          margin-top: .6rem;
          line-height: 1.45;
          letter-spacing: .02em;
        }

        /* ── CONTACT FORM ── */
        .cp-form-section {
          background: #faf6ef;
          padding: 0 1.5rem 6rem;
          box-sizing: border-box;
        }
        @media (min-width: 640px) { .cp-form-section { padding: 0 2rem 8rem; } }

        .cp-form-wrap {
          max-width: 1200px;
          margin: 0 auto;
          overflow: hidden;
          display: grid;
          box-shadow: 0 24px 80px rgba(10,40,22,.1);
          border: 1px solid rgba(26,74,46,.1);
        }
        @media (min-width: 1024px) {
          .cp-form-wrap { grid-template-columns: 0.82fr 1.18fr; }
        }

        /* form left panel */
        .cp-form-left {
          position: relative;
          min-height: 420px;
          background: #1a4a2e;
          padding: 3rem 2.5rem;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        .cp-form-estate-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease;
        }
        .cp-form-estate-img.loaded { opacity: .38; }

        .cp-form-left-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,42,22,.18) 0%, rgba(8,33,17,.92) 100%);
        }

        .cp-form-left-top { position: relative; z-index: 2; }
        .cp-form-left-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .26em;
          text-transform: uppercase;
          color: #d4a853;
          display: block;
        }
        .cp-form-left-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 400;
          font-style: italic;
          line-height: 1.2;
          margin-top: 1rem;
        }

        .cp-form-left-items {
          position: relative; z-index: 2;
          display: grid;
          gap: .6rem;
        }
        .cp-form-left-item {
          display: flex;
          align-items: center;
          gap: .75rem;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.06);
          padding: .85rem 1.1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.82);
        }
        .cp-form-left-item svg { color: #d4a853; flex-shrink: 0; }

        /* form right panel */
        .cp-form-right {
          position: relative;
          background: #fff;
          padding: 3rem 2.5rem;
          box-sizing: border-box;
          overflow: hidden;
        }
        @media (min-width: 640px) { .cp-form-right { padding: 4rem 3.5rem; } }

        .cp-form-deco {
          position: absolute;
          top: 2rem; right: 2rem;
          color: rgba(26,74,46,.06);
          pointer-events: none;
        }
        .cp-form-corner {
          position: absolute;
          top: 0; right: 0;
          width: 120px; height: 120px;
          background: rgba(45,106,70,.05);
        }

        .cp-form-grid {
          position: relative; z-index: 2;
          display: grid;
          gap: 2.5rem;
        }
        .cp-form-row {
          display: grid;
          gap: 2.5rem;
        }
        @media (min-width: 640px) {
          .cp-form-row { grid-template-columns: 1fr 1fr; }
        }

        /* field */
        .cp-field { display: block; }
        .cp-field-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .24em;
          text-transform: uppercase;
          color: #5a5550;
          opacity: .75;
          display: block;
        }
        .cp-field-input,
        .cp-select,
        .cp-textarea {
          display: block;
          width: 100%;
          margin-top: .75rem;
          border: none;
          border-bottom: 1.5px solid rgba(26,74,46,.15);
          background: transparent;
          padding: .65rem 0;
          font-family: 'DM Sans', sans-serif;
          font-size: .97rem;
          font-weight: 400;
          color: #1c1a17;
          outline: none;
          transition: border-color .22s;
          box-sizing: border-box;
          -webkit-appearance: none;
          appearance: none;
        }
        .cp-field-input:focus,
        .cp-select:focus,
        .cp-textarea:focus {
          border-color: #d4a853;
        }
        .cp-field-input::placeholder,
        .cp-textarea::placeholder {
          color: rgba(90,85,80,.35);
          font-weight: 300;
        }
        .cp-textarea {
          min-height: 120px;
          resize: none;
        }
        .cp-select-wrap { position: relative; }
        .cp-select-wrap::after {
          content: '▾';
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          font-size: .7rem;
          color: #b8893a;
          pointer-events: none;
        }

        .cp-select-label,
        .cp-textarea-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .24em;
          text-transform: uppercase;
          color: #5a5550;
          opacity: .75;
          display: block;
        }

        .cp-submit {
          display: inline-flex;
          align-items: center;
          gap: .75rem;
          background: #1a4a2e;
          color: #fff;
          border: none;
          cursor: pointer;
          padding: 1.1rem 2.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          transition: background .22s;
        }
        .cp-submit:hover { background: #d4a853; color: #1a4a2e; }
        .cp-submit svg { transition: transform .2s; }
        .cp-submit:hover svg { transform: translateX(4px); }

        /* ── ESTATE FOOTER ── */
        .cp-estate {
          position: relative;
          min-height: 480px;
          background: #1a4a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }

        .cp-estate-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease;
        }
        .cp-estate-img.loaded { opacity: .5; }

        .cp-estate-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,42,22,.25) 0%, rgba(8,33,17,.88) 100%);
        }

        .cp-estate-content {
          position: relative; z-index: 2;
          padding: 5rem 1.5rem;
          box-sizing: border-box;
        }
        .cp-estate-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: #d4a853;
          display: block;
        }
        .cp-estate-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 400;
          font-style: italic;
          color: #fff;
          margin-top: 1.25rem;
          line-height: 1.1;
        }
        .cp-estate-pill {
          display: inline-flex;
          align-items: center;
          gap: .75rem;
          border: 1px solid rgba(255,255,255,.15);
          background: rgba(255,255,255,.07);
          padding: .9rem 1.6rem;
          margin-top: 2.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #fff;
        }
        .cp-estate-pill svg { color: #d4a853; }
      `}</style>

      <main>

        {/* ── HERO ── */}
        <section className="cp-hero">
          <img
            src={estateImage}
            alt="Golden agricultural fields"
            className={`cp-hero-bg${heroImg ? " loaded" : ""}`}
            onLoad={() => setHeroImg(true)}
          />
          <div className="cp-hero-overlay" />
          <div className="cp-hero-grain" />

          <div className="cp-hero-inner">
            {/* left */}
            <FadeIn>
              <div>
                <span className="cp-hero-eyebrow">Established Excellence</span>
                <h1 className="cp-hero-title">
                  Start a refined<br /><em>farm-to-brand</em><br />conversation.
                </h1>
                <p className="cp-hero-sub">
                  For premium sourcing, product partnerships, B2B trade, and
                  agriculture collaborations — Amoohaa Farms keeps every enquiry
                  close to the people who understand the land.
                </p>
                <div className="cp-enq-grid">
                  {enquiryTypes.map(({ label, Icon }) => (
                    <div key={label} className="cp-enq-card">
                      <Icon size={22} />
                      <span className="cp-enq-label">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* right — produce image */}
            <FadeIn delay={0.15}>
              <div style={{ position: "relative" }}>
                <div className="cp-produce-wrap">
                  <img
                    src={produceImage}
                    alt="Premium farm produce"
                    className={`cp-produce-img${produceImg ? " loaded" : ""}`}
                    onLoad={() => setProduceImg(true)}
                  />
                  <div className="cp-produce-overlay" />
                  <div className="cp-produce-text">
                    <span className="cp-produce-eyebrow">Partnership desk</span>
                    <h2 className="cp-produce-title">Sourcing, trade &amp; brand growth.</h2>
                    <p className="cp-produce-sub">
                      A premium enquiry path for buyers, distributors, partners,
                      and collaborators.
                    </p>
                  </div>
                </div>
                {/* floating badge */}
                <div className="cp-float-badge">
                  <div className="cp-float-icon">
                    <BadgeCheck size={22} />
                  </div>
                  <div>
                    <span className="cp-float-open">Open</span>
                    <span className="cp-float-title">Trade enquiries</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CONTACT DETAILS ── */}
        <FadeIn>
          <section className="cp-details-section">
            <div className="cp-details-grid">
              {details.map(({ label, value, Icon }) => (
                <article key={label} className="cp-detail-card">
                  <div className="cp-detail-icon">
                    <Icon size={22} />
                  </div>
                  <span className="cp-detail-label">{label}</span>
                  <span className="cp-detail-value">{value}</span>
                </article>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ── CONTACT FORM ── */}
        <FadeIn>
          <section className="cp-form-section">
            <div className="cp-form-wrap">

              {/* left panel */}
              <div className="cp-form-left">
                <img
                  src={estateImage}
                  alt="Agricultural estate"
                  className={`cp-form-estate-img${formImg ? " loaded" : ""}`}
                  onLoad={() => setFormImg(true)}
                />
                <div className="cp-form-left-overlay" />

                <div className="cp-form-left-top">
                  <span className="cp-form-left-eyebrow">Contact form</span>
                  <h2 className="cp-form-left-title">Tell us what you want to build.</h2>
                </div>

                <div className="cp-form-left-items">
                  {formItems.map((item) => (
                    <div key={item} className="cp-form-left-item">
                      <Leaf size={15} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* right panel — form */}
              <div className="cp-form-right">
                <div className="cp-form-corner" />
                <div className="cp-form-deco"><Send size={88} /></div>

                <div className="cp-form-grid">
                  <div className="cp-form-row">
                    <Field label="Full Name"   placeholder="e.g. Raghav Sharma"       />
                    <Field label="Company"     placeholder="e.g. Heritage Foods Ltd." />
                  </div>
                  <div className="cp-form-row">
                    <Field label="Email Address" placeholder="name@company.com" />
                    <div>
                      <span className="cp-select-label">Enquiry Type</span>
                      <div className="cp-select-wrap">
                        <select className="cp-select">
                          <option>Raw Products</option>
                          <option>Brand Partnership</option>
                          <option>B2B Sourcing</option>
                          <option>Media</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="cp-textarea-label">Your Message</span>
                    <textarea
                      className="cp-textarea"
                      placeholder="Tell us about your requirements…"
                    />
                  </div>
                  <div>
                    <button className="cp-submit" type="submit">
                      Submit Enquiry
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </FadeIn>

        {/* ── ESTATE CLOSER ── */}
        <FadeIn>
          <section className="cp-estate">
            <img
              src={estateImage}
              alt="Amoohaa Farms estate"
              className={`cp-estate-img${footerImg ? " loaded" : ""}`}
              onLoad={() => setFooterImg(true)}
            />
            <div className="cp-estate-overlay" />
            <div className="cp-estate-content">
              <span className="cp-estate-eyebrow">Located in the heart of Uttar Pradesh</span>
              <h2 className="cp-estate-title">The Amoohaa Estate</h2>
              <div>
                <span className="cp-estate-pill">
                  <BadgeCheck size={17} />
                  Partnership enquiries open
                </span>
              </div>
            </div>
          </section>
        </FadeIn>

      </main>
    </>
  );
}
