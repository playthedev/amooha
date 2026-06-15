"use client";

import { type CSSProperties, type ReactNode, type RefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Hourglass, Leaf, Wheat } from "lucide-react";

type LangKey = "en" | "fr" | "es";

const strings: Record<LangKey, {
  eyebrow: string; title: string; active: string; of: string;
  pp: { desc: string; cta: string; cat: string };
  hv: { desc: string; cta: string; cat: string };
  pipeline: { title: string; body: string };
  statPills: string[];
}> = {
  en: {
    eyebrow: "Portfolio", title: "Brands rooted in real agriculture.",
    active: "Active brand", of: "of",
    pp: { desc: "Performance nutrition for modern households and active lifestyles. Seeds, makhana, and plant protein, positioned with the Amoohaa Farms harvest-to-market standard.", cta: "Visit Power Pulz", cat: "Performance\nNutrition" },
    hv: { desc: "A wellness-first range that brings the full nutritional potential of our farm harvests to everyday life. Think cold-pressed oils, dried superfoods, and vitamin-dense seed blends — all traceable to a single source farm.", cta: "Explore Products", cat: "Natural\nWellness" },
    pipeline: { title: "More brands in the pipeline.", body: "Amoohaa Farms is built to expand its agricultural product ecosystem — more categories, more formats, same uncompromising farm standard." },
    statPills: ["Harvest-led portfolio", "Farm-origin products"],
  },
  fr: {
    eyebrow: "Portefeuille", title: "Marques enracinées dans la vraie agriculture.",
    active: "Marque active", of: "sur",
    pp: { desc: "Nutrition performante pour les foyers modernes et les modes de vie actifs. Graines, makhana et protéines végétales.", cta: "Visiter Power Pulz", cat: "Nutrition\nPerformance" },
    hv: { desc: "Une gamme axée sur le bien-être qui apporte tout le potentiel nutritionnel de nos récoltes à la vie quotidienne.", cta: "Explorer les produits", cat: "Bien-être\nNaturel" },
    pipeline: { title: "D'autres marques en préparation.", body: "Amoohaa Farms est conçu pour développer son écosystème — plus de catégories, de formats, toujours le même standard agricole." },
    statPills: ["Portefeuille agricole", "Produits d'origine agricole"],
  },
  es: {
    eyebrow: "Portafolio", title: "Marcas arraigadas en la agricultura real.",
    active: "Marca activa", of: "de",
    pp: { desc: "Nutrición de alto rendimiento para hogares modernos y estilos de vida activos. Semillas, makhana y proteína vegetal.", cta: "Visitar Power Pulz", cat: "Nutrición\nDeportiva" },
    hv: { desc: "Una gama orientada al bienestar que trae todo el potencial nutricional de nuestras cosechas a la vida cotidiana.", cta: "Explorar productos", cat: "Bienestar\nNatural" },
    pipeline: { title: "Más marcas en camino.", body: "Amoohaa Farms está construido para expandir su ecosistema de productos agrícolas — más categorías, más formatos, mismo estándar." },
    statPills: ["Portafolio agrícola", "Productos de origen agrícola"],
  },
};

const ppImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80";
const hvImage = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1400&q=80";

function useInView(threshold = 0.12): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(22px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

export default function BrandsPage() {
  const params = useParams<{ lang: string }>();
  const lang = params.lang ?? "en";
  const t = strings[(lang as LangKey)] ?? strings.en;
  const [ppLoaded, setPpLoaded] = useState(false);
  const [hvLoaded, setHvLoaded] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .bp-page{background:#faf6ef;box-sizing:border-box}
        .bp-section{padding:6rem 1.5rem 8rem;box-sizing:border-box}
        @media(min-width:640px){.bp-section{padding:8rem 2rem 10rem}}
        .bp-inner{max-width:1200px;margin:0 auto}
        .bp-header{display:grid;gap:2.5rem;margin-bottom:5rem;align-items:end}
        @media(min-width:1024px){.bp-header{grid-template-columns:8fr 4fr}}
        .bp-eyebrow{font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#b8893a;display:block}
        .bp-page-title{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.6rem,6.5vw,5.5rem);font-weight:400;font-style:italic;line-height:1.08;color:#1a4a2e;margin-top:1.25rem;max-width:780px}
        .bp-page-title em{font-style:normal;color:#b8893a}
        .bp-title-rule{width:64px;height:2px;background:#d4a853;margin-top:2rem}
        .bp-stat-pills{display:flex;flex-direction:column;gap:.75rem;justify-content:flex-end}
        .bp-stat-pill{display:flex;align-items:center;gap:1rem;border:1px solid rgba(26,74,46,.13);background:#f7f3ec;padding:1.1rem 1.4rem;font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#1a4a2e;box-sizing:border-box}
        .bp-stat-pill svg{color:#b8893a;flex-shrink:0}
        .bp-brand-card{position:relative;display:flex;min-height:580px;align-items:flex-end;overflow:hidden;background:#1a4a2e;text-decoration:none;color:#fff;box-shadow:0 32px 80px rgba(10,40,22,.22)}
        @media(min-width:640px){.bp-brand-card{min-height:640px}}
        .bp-brand-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.04);transition:opacity .8s ease,transform 9s ease}
        .bp-brand-img.loaded{opacity:1;transform:scale(1)}
        .bp-brand-card:hover .bp-brand-img{transform:scale(1.06)}
        .bp-brand-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,42,22,.1)0%,rgba(10,42,22,.6)45%,rgba(8,33,17,.96)100%);transition:opacity .4s}
        .bp-brand-card:hover .bp-brand-overlay{opacity:.85}
        .bp-brand-badge{position:absolute;top:2rem;left:2rem;font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#1a4a2e;background:#d4a853;padding:.45rem 1rem;z-index:2}
        .bp-brand-badge.hv{background:#fbf6e8;color:#2d6a46}
        .bp-brand-content{position:relative;z-index:2;width:100%;padding:2rem 2rem 2.5rem;display:flex;flex-direction:column;gap:2.5rem;box-sizing:border-box}
        @media(min-width:768px){.bp-brand-content{flex-direction:row;align-items:flex-end;padding:3rem 3.5rem 3.5rem}}
        @media(min-width:1024px){.bp-brand-content{padding:4rem 5rem 5rem}}
        .bp-brand-left{flex:1;max-width:660px}
        .bp-brand-name{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.2rem,5vw,3.8rem);font-weight:500;line-height:1.1;color:#fff;display:block;margin-bottom:1.25rem}
        .bp-brand-desc{font-family:'DM Sans',sans-serif;font-size:clamp(.9rem,1.6vw,1.05rem);font-weight:300;line-height:1.85;color:rgba(255,255,255,.72)}
        .bp-brand-tags{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:2rem}
        .bp-brand-tag{font-family:'DM Sans',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#d4a853;border:1px solid rgba(212,168,83,.28);padding:.4rem .9rem}
        .bp-brand-tag.hv{color:#a8d5a2;border-color:rgba(168,213,162,.28)}
        .bp-brand-cta{display:inline-flex;align-items:center;gap:.75rem;margin-top:2.25rem;background:#d4a853;color:#1a4a2e;font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:1rem 2rem;transition:background .22s,color .22s;text-decoration:none}
        .bp-brand-cta:hover{background:#fff;color:#1a4a2e}
        .bp-brand-cta.hv{background:#a8d5a2;color:#1a4a2e}
        .bp-brand-cta.hv:hover{background:#fff}
        .bp-brand-cta svg{transition:transform .2s}
        .bp-brand-cta:hover svg{transform:translateX(4px)}
        .bp-brand-right{display:none;flex-direction:column;align-items:flex-end;gap:.5rem;padding-left:3rem;border-left:1px solid rgba(212,168,83,.28);flex-shrink:0}
        @media(min-width:768px){.bp-brand-right{display:flex}}
        .bp-brand-cat-label{font-family:'DM Sans',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#d4a853;opacity:.8}
        .bp-brand-cat{font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#fff;text-align:right;white-space:pre-line}
        .bp-brand-cat.hv{color:#a8d5a2}
        .bp-brand-cat-label.hv{color:#a8d5a2}
        .bp-card-gap{height:1px;background:rgba(26,74,46,.12);margin:.25rem 0}
        .bp-meta-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:.75rem}
        .bp-meta-label{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#5a5550;opacity:.6}
        .bp-meta-tag{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#2d6a46;border:1px solid rgba(45,106,70,.2);padding:.3rem .8rem}
        .bp-pipeline{margin-top:1px;display:flex;align-items:center;justify-content:center;gap:2rem;border:1.5px dashed rgba(26,74,46,.22);background:#f7f3ec;padding:4rem 2rem;text-align:center;flex-direction:column;box-sizing:border-box}
        @media(min-width:640px){.bp-pipeline{flex-direction:row;text-align:left;padding:4rem 3rem}}
        .bp-pipeline-icon{display:flex;align-items:center;justify-content:center;width:64px;height:64px;border:1px solid rgba(26,74,46,.15);background:#fff;flex-shrink:0;color:#b8893a}
        .bp-pipeline-title{font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.2rem,2.5vw,1.65rem);font-weight:500;color:#1a4a2e;line-height:1.2}
        .bp-pipeline-sub{font-family:'DM Sans',sans-serif;font-size:.92rem;color:#5a5550;margin-top:.6rem;line-height:1.7;max-width:460px}
      `}</style>

      <main className="bp-page">
        <section className="bp-section">
          <div className="bp-inner">
            <FadeIn>
              <div className="bp-header">
                <div>
                  <span className="bp-eyebrow">{t.eyebrow}</span>
                  <h1 className="bp-page-title">{t.title}</h1>
                  <div className="bp-title-rule" />
                </div>
                <div className="bp-stat-pills">
                  {t.statPills.map((pill, i) => (
                    <div key={pill} className="bp-stat-pill">
                      {i === 0 ? <Wheat size={20} /> : <Leaf size={20} />} {pill}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bp-meta-row">
                <span className="bp-meta-label">{t.active} · 01 {t.of} 02</span>
                <span className="bp-meta-tag">Live</span>
              </div>
              <a href="https://power-pulz.vercel.app/" target="_blank" rel="noreferrer" className="bp-brand-card">
                <img src={ppImage} alt="Power Pulz" className={`bp-brand-img${ppLoaded ? " loaded" : ""}`} onLoad={() => setPpLoaded(true)} />
                <div className="bp-brand-overlay" />
                <span className="bp-brand-badge">Power Pulz</span>
                <div className="bp-brand-content">
                  <div className="bp-brand-left">
                    <span className="bp-brand-name">Power Pulz</span>
                    <p className="bp-brand-desc">{t.pp.desc}</p>
                    <div className="bp-brand-tags">
                      {["NutritionFirst", "AgroSourced", "PlantProtein"].map((tag) => (
                        <span key={tag} className="bp-brand-tag">#{tag}</span>
                      ))}
                    </div>
                    <span className="bp-brand-cta">{t.pp.cta} <ArrowRight size={15} /></span>
                  </div>
                  <div className="bp-brand-right">
                    <span className="bp-brand-cat-label">Category</span>
                    <span className="bp-brand-cat">{t.pp.cat}</span>
                  </div>
                </div>
              </a>
            </FadeIn>

            <div className="bp-card-gap" style={{ margin: "2.5rem 0" }} />

            <FadeIn delay={0.15}>
              <div className="bp-meta-row">
                <span className="bp-meta-label">{t.active} · 02 {t.of} 02</span>
                <span className="bp-meta-tag">New</span>
              </div>
              <Link href={`/${lang}/products`} className="bp-brand-card">
                <img src={hvImage} alt="HarvestVita" className={`bp-brand-img${hvLoaded ? " loaded" : ""}`} onLoad={() => setHvLoaded(true)} />
                <div className="bp-brand-overlay" />
                <span className="bp-brand-badge hv">HarvestVita</span>
                <div className="bp-brand-content">
                  <div className="bp-brand-left">
                    <span className="bp-brand-name">HarvestVita</span>
                    <p className="bp-brand-desc">{t.hv.desc}</p>
                    <div className="bp-brand-tags">
                      {["HarvestFresh", "VitaminRich", "NaturalWellness"].map((tag) => (
                        <span key={tag} className="bp-brand-tag hv">#{tag}</span>
                      ))}
                    </div>
                    <span className="bp-brand-cta hv">{t.hv.cta} <ArrowRight size={15} /></span>
                  </div>
                  <div className="bp-brand-right">
                    <span className="bp-brand-cat-label hv">Category</span>
                    <span className="bp-brand-cat hv">{t.hv.cat}</span>
                  </div>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bp-pipeline" style={{ marginTop: "2.5rem" }}>
                <div className="bp-pipeline-icon"><Hourglass size={28} /></div>
                <div>
                  <p className="bp-pipeline-title">{t.pipeline.title}</p>
                  <p className="bp-pipeline-sub">{t.pipeline.body}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
