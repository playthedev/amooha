"use client";

import {
  type CSSProperties, type ReactNode, type RefObject,
  useState, useEffect, useRef,
} from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, BadgeCheck, Leaf, PackageCheck, ShoppingCart, Wheat } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

const categoryKeys = ["All", "Seeds", "Nuts", "Grains", "Superfoods"];

const badgeIcons = [Wheat, PackageCheck, BadgeCheck];

function useInView(threshold = 0.12): [RefObject<HTMLDivElement | null>, boolean] {
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

function FadeIn({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(22px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function AddToCartBtn({ slug, name, price, weight, image, addLabel, addedLabel }: {
  slug: string; name: string; price: number; weight: string; image: string;
  addLabel: string; addedLabel: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ slug, name, price, weight, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button className={`pp-add-btn${added ? " added" : ""}`} onClick={handleAdd} aria-label={`Add ${name} to cart`}>
      <ShoppingCart size={13} />
      {added ? addedLabel : addLabel}
    </button>
  );
}

export default function ProductsPage() {
  const params = useParams<{ lang: string }>();
  const lang = params.lang ?? "en";
  const { format } = useCurrency();

  // We can't use getDictionary (server-only) in a client component.
  // Use simple per-lang lookup for the small set of strings we need here.
  type LangKey = "en" | "fr" | "es";
  const t: Record<LangKey, {
    title: string; subtitle: string; filters: string[];
    addToCart: string; addedToCart: string; viewDetails: string;
    badges: string[]; perPack: string; b2bCta: string;
  }> = {
    en: {
      title: "Our Products", subtitle: "Farm-origin ingredients. Honest sourcing. Consistent quality.",
      filters: ["All", "Seeds", "Nuts", "Grains", "Superfoods"],
      addToCart: "Add to Cart", addedToCart: "Added!", viewDetails: "View Details",
      badges: ["Farm Sourced", "B2B Ready", "Quality Checked"], perPack: "/ pack",
      b2bCta: "Contact our trade desk",
    },
    fr: {
      title: "Nos Produits", subtitle: "Ingrédients d'origine agricole. Approvisionnement honnête. Qualité constante.",
      filters: ["Tous", "Graines", "Noix", "Céréales", "Superaliments"],
      addToCart: "Ajouter au panier", addedToCart: "Ajouté !", viewDetails: "Voir les détails",
      badges: ["Origine agricole", "Prêt B2B", "Qualité vérifiée"], perPack: "/ unité",
      b2bCta: "Contacter notre bureau commercial",
    },
    es: {
      title: "Nuestros Productos", subtitle: "Ingredientes de origen agrícola. Abastecimiento honesto. Calidad constante.",
      filters: ["Todos", "Semillas", "Nueces", "Granos", "Superalimentos"],
      addToCart: "Añadir al carrito", addedToCart: "¡Añadido!", viewDetails: "Ver detalles",
      badges: ["Origen agrícola", "Listo B2B", "Calidad verificada"], perPack: "/ unidad",
      b2bCta: "Contactar nuestro equipo comercial",
    },
  };

  const strings = t[(lang as LangKey)] ?? t.en;
  const [active, setActive] = useState(0); // index into categoryKeys

  const visible = active === 0
    ? products
    : products.filter((p) => p.category === categoryKeys[active]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .pp-hero { position:relative;background:#faf6ef;padding:7rem 1.5rem 5rem;text-align:center;overflow:hidden;box-sizing:border-box; }
        .pp-hero::before { content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px;opacity:.028;pointer-events:none; }
        .pp-hero-eyebrow { position:relative;z-index:1;display:inline-block;font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#2d6a46;opacity:.75; }
        .pp-hero-title { position:relative;z-index:1;font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.6rem,7vw,6rem);font-weight:400;font-style:italic;line-height:1.08;color:#1a4a2e;margin:1.25rem auto 0;max-width:820px; }
        .pp-hero-title em { font-style:normal;color:#b8893a; }
        .pp-hero-sub { position:relative;z-index:1;font-family:'DM Sans',sans-serif;font-size:clamp(.95rem,1.8vw,1.1rem);font-weight:300;color:#5a5550;line-height:1.8;max-width:560px;margin:1.5rem auto 0; }
        .pp-badges { position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;max-width:680px;margin:3rem auto 0; }
        @media (max-width:540px) { .pp-badges { grid-template-columns:1fr;max-width:280px; } }
        .pp-badge { display:flex;align-items:center;justify-content:center;gap:10px;background:rgba(255,255,255,.7);border:1px solid rgba(26,74,46,.14);padding:.9rem 1rem;font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#1a4a2e;box-sizing:border-box; }
        .pp-badge svg { color:#b8893a;flex-shrink:0; }
        .pp-filter-bar { position:sticky;top:82px;z-index:30;border-top:1px solid rgba(26,74,46,.1);border-bottom:1px solid rgba(26,74,46,.1);background:rgba(250,246,239,.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);padding:1rem 1.5rem;box-sizing:border-box; }
        .pp-filter-inner { max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.6rem; }
        .pp-filter-btn { font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:.6rem 1.5rem;border:1px solid;cursor:pointer;transition:background .22s,color .22s,border-color .22s;background:transparent;line-height:1; }
        .pp-filter-btn.active { background:#1a4a2e;border-color:#1a4a2e;color:#fff; }
        .pp-filter-btn:not(.active) { border-color:rgba(26,74,46,.18);color:#5a5550; }
        .pp-filter-btn:not(.active):hover { border-color:#d4a853;color:#1a4a2e; }
        .pp-filter-count { font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5a5550;opacity:.55;margin-left:auto;padding-left:1rem;white-space:nowrap;display:none; }
        @media (min-width:640px) { .pp-filter-count { display:block; } }
        .pp-grid-section { padding:5rem 1.5rem 7rem;background:#f7f3ec;box-sizing:border-box; }
        .pp-grid { max-width:1200px;margin:0 auto;display:grid;gap:1px;background:rgba(26,74,46,.08); }
        @media (min-width:640px) { .pp-grid { grid-template-columns:repeat(2,1fr); } }
        @media (min-width:1024px) { .pp-grid { grid-template-columns:repeat(3,1fr); } }
        .pp-card { background:#faf6ef;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .28s; }
        .pp-card:hover { box-shadow:0 16px 48px rgba(26,74,46,.12);z-index:1;position:relative; }
        .pp-card-img-wrap { position:relative;aspect-ratio:4/3;overflow:hidden;flex-shrink:0; }
        .pp-card-img { width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s ease; }
        .pp-card:hover .pp-card-img { transform:scale(1.06); }
        .pp-card-cat { position:absolute;top:1.25rem;left:1.25rem;font-family:'DM Sans',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;background:#d4a853;color:#1a4a2e;padding:.35rem .85rem; }
        .pp-card-brand-badge { position:absolute;top:1.25rem;right:1.25rem;font-family:'DM Sans',sans-serif;font-size:.55rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;background:#1a4a2e;color:#d4a853;padding:.3rem .7rem;border:1px solid rgba(212,168,83,.4); }
        .pp-card-body { padding:2rem 2rem 2.25rem;display:flex;flex-direction:column;flex:1;box-sizing:border-box; }
        .pp-card-source { font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#b8893a; }
        .pp-card-name { font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.3rem,2.2vw,1.65rem);font-weight:500;color:#1a4a2e;margin-top:.4rem;line-height:1.2; }
        .pp-card-desc { font-family:'DM Sans',sans-serif;font-size:.88rem;line-height:1.75;color:#5a5550;margin-top:.75rem;flex:1; }
        .pp-card-price { font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:500;color:#1a4a2e;margin-top:1rem; }
        .pp-card-price span { font-family:'DM Sans',sans-serif;font-size:.7rem;font-weight:400;color:#5a5550;margin-left:.35rem; }
        .pp-card-actions { display:flex;gap:0;margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid rgba(26,74,46,.1); }
        .pp-card-detail { display:flex;align-items:center;justify-content:center;gap:.5rem;flex:1;padding:.75rem .85rem;font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#1a4a2e;text-decoration:none;transition:color .2s;border-right:1px solid rgba(26,74,46,.1); }
        .pp-card-detail:hover { color:#d4a853; }
        .pp-card-detail:hover svg { transform:translateX(3px); }
        .pp-card-detail svg { transition:transform .2s; }
        .pp-add-btn { display:flex;align-items:center;justify-content:center;gap:.45rem;flex:1;padding:.75rem .85rem;font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;background:none;border:none;cursor:pointer;color:#1a4a2e;transition:background .2s,color .2s; }
        .pp-add-btn:hover { background:#1a4a2e;color:#fff; }
        .pp-add-btn.added { background:#2d6a46;color:#fff; }
        .pp-empty { grid-column:1/-1;text-align:center;padding:5rem 2rem;font-family:'Playfair Display',Georgia,serif;font-size:1.5rem;font-style:italic;color:#5a5550;background:#faf6ef; }
        .pp-cta-banner { background:#1a4a2e;padding:3.5rem 1.5rem;box-sizing:border-box;position:relative;overflow:hidden; }
        .pp-cta-inner { max-width:1200px;margin:0 auto;display:flex;flex-direction:column;align-items:flex-start;gap:1.5rem; }
        @media (min-width:768px) { .pp-cta-inner { flex-direction:row;align-items:center;justify-content:space-between; } }
        .pp-cta-left { display:flex;align-items:center;gap:1.25rem; }
        .pp-cta-icon { display:flex;align-items:center;justify-content:center;width:52px;height:52px;border:1px solid rgba(255,255,255,.15);color:#d4a853;flex-shrink:0; }
        .pp-cta-text { font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.15rem,2.5vw,1.6rem);font-weight:400;font-style:italic;color:#fff;line-height:1.35;max-width:560px; }
        .pp-cta-link { display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#d4a853;text-decoration:none;white-space:nowrap;transition:opacity .2s;flex-shrink:0; }
        .pp-cta-link:hover { opacity:.75; }
        .pp-cta-link svg { transition:transform .22s; }
        .pp-cta-link:hover svg { transform:translateX(4px); }
      `}</style>

      <main>
        <section className="pp-hero">
          <FadeIn>
            <span className="pp-hero-eyebrow">Premium Harvest Series</span>
            <h1 className="pp-hero-title">Direct from <em>our farms.</em></h1>
            <p className="pp-hero-sub">{strings.subtitle}</p>
            <div className="pp-badges">
              {strings.badges.map((label, i) => {
                const Icon = badgeIcons[i];
                return (
                  <div className="pp-badge" key={label}>
                    <Icon size={16} />{label}
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </section>

        <div className="pp-filter-bar">
          <div className="pp-filter-inner">
            {strings.filters.map((f, i) => (
              <button key={f} className={`pp-filter-btn${active === i ? " active" : ""}`} onClick={() => setActive(i)}>
                {f}
              </button>
            ))}
            <span className="pp-filter-count">{visible.length} product{visible.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        <section className="pp-grid-section">
          <div className="pp-grid">
            {visible.length === 0 && <div className="pp-empty">No products in this category yet.</div>}
            {visible.map((product, i) => (
              <FadeIn key={product.slug} delay={i * 0.07}>
                <article className="pp-card">
                  <div className="pp-card-img-wrap">
                    <Link href={`/${lang}/products/${product.slug}`} tabIndex={-1} aria-hidden>
                      <img src={product.image} alt={product.name} className="pp-card-img" />
                    </Link>
                    <span className="pp-card-cat">{product.category}</span>
                    {product.brand === "powerpulz" && <span className="pp-card-brand-badge">Power Pulz</span>}
                    {product.brand === "harvestvita" && <span className="pp-card-brand-badge" style={{ background: "#2d6a46", color: "#fbf6e8" }}>HarvestVita</span>}
                  </div>
                  <div className="pp-card-body">
                    <span className="pp-card-source">{product.source}</span>
                    <h2 className="pp-card-name">{product.name}</h2>
                    <p className="pp-card-desc">{product.desc}</p>
                    <p className="pp-card-price">
                      {format(product.price)}
                      <span>{product.weight}</span>
                    </p>
                    <div className="pp-card-actions">
                      <Link href={`/${lang}/products/${product.slug}`} className="pp-card-detail">
                        {strings.viewDetails} <ArrowRight size={12} />
                      </Link>
                      <AddToCartBtn
                        slug={product.slug} name={product.name} price={product.price}
                        weight={product.weight} image={product.image}
                        addLabel={strings.addToCart} addedLabel={strings.addedToCart}
                      />
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="pp-cta-banner">
          <div className="pp-cta-inner">
            <div className="pp-cta-left">
              <span className="pp-cta-icon"><Leaf size={22} /></span>
              <p className="pp-cta-text">Looking for bulk orders or white-label sourcing?</p>
            </div>
            <Link href={`/${lang}/contact`} className="pp-cta-link">
              {strings.b2bCta} <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
