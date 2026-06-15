"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ExternalLink, ShoppingCart } from "lucide-react";
import { getProductBySlug, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

type LangKey = "en" | "fr" | "es";

const strings: Record<LangKey, {
  addToCart: string; addedToCart: string; back: string; buyNow: string;
  sourcedFrom: string; relatedHeading: string; viewProduct: string; visitPP: string;
  notFound: string; backToProducts: string;
}> = {
  en: { addToCart: "Add to Cart", addedToCart: "Added!", back: "Products", buyNow: "Buy Now", sourcedFrom: "Sourced from:", relatedHeading: "You might also like", viewProduct: "View Product", visitPP: "Visit Power Pulz", notFound: "Product not found.", backToProducts: "Back to Products" },
  fr: { addToCart: "Ajouter au panier", addedToCart: "Ajouté !", back: "Produits", buyNow: "Acheter", sourcedFrom: "Origine :", relatedHeading: "Vous aimerez aussi", viewProduct: "Voir le produit", visitPP: "Visiter Power Pulz", notFound: "Produit introuvable.", backToProducts: "Retour aux produits" },
  es: { addToCart: "Añadir al carrito", addedToCart: "¡Añadido!", back: "Productos", buyNow: "Comprar", sourcedFrom: "Origen:", relatedHeading: "También te puede gustar", viewProduct: "Ver producto", visitPP: "Visitar Power Pulz", notFound: "Producto no encontrado.", backToProducts: "Volver a productos" },
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = use(params);
  const t = strings[(lang as LangKey)] ?? strings.en;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { format } = useCurrency();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>
        <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#faf6ef", fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#1a4a2e", fontStyle: "italic" }}>{t.notFound}</p>
            <Link href={`/${lang}/products`} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: "1.5rem", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#1a4a2e", textDecoration: "none" }}>
              <ArrowLeft size={14} /> {t.backToProducts}
            </Link>
          </div>
        </main>
      </>
    );
  }

  const isPowerPulz = product.brand === "powerpulz";

  function handleAddToCart() {
    addItem({ slug: product!.slug, name: product!.name, price: product!.price, weight: product!.weight, image: product!.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .pd-page { background:#faf6ef;min-height:60vh;box-sizing:border-box; }
        .pd-breadcrumb { padding:1.25rem 1.5rem;max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:.5rem;font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#5a5550; }
        .pd-breadcrumb a { color:#1a4a2e;text-decoration:none;transition:color .2s; }
        .pd-breadcrumb a:hover { color:#b8893a; }
        .pd-breadcrumb-sep { opacity:.35; }
        .pd-grid { max-width:1200px;margin:0 auto;display:grid;gap:0;box-sizing:border-box; }
        @media (min-width:900px) { .pd-grid { grid-template-columns:1fr 1fr;min-height:560px; } }
        .pd-img-wrap { position:relative;overflow:hidden;aspect-ratio:1/1;background:#e8e0d0; }
        @media (min-width:900px) { .pd-img-wrap { aspect-ratio:auto; } }
        .pd-img { width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s ease; }
        .pd-img-wrap:hover .pd-img { transform:scale(1.04); }
        .pd-brand-badge { position:absolute;top:1.5rem;left:1.5rem;font-family:'DM Sans',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:.4rem .9rem;z-index:2; }
        .pd-brand-badge.amoohaa { background:#d4a853;color:#1a4a2e; }
        .pd-brand-badge.powerpulz { background:#1a4a2e;color:#d4a853;border:1px solid #d4a853; }
        .pd-detail { padding:3rem 2rem 4rem;display:flex;flex-direction:column;justify-content:center;background:#faf6ef;box-sizing:border-box; }
        @media (min-width:640px) { .pd-detail { padding:3.5rem 3rem 4.5rem; } }
        @media (min-width:1024px) { .pd-detail { padding:4rem 4.5rem 5rem; } }
        .pd-category { font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#b8893a; }
        .pd-name { font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.9rem,4vw,3rem);font-weight:400;line-height:1.12;color:#1a4a2e;margin-top:.5rem; }
        .pd-source { font-family:'DM Sans',sans-serif;font-size:.7rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#5a5550;margin-top:.6rem; }
        .pd-rule { width:48px;height:2px;background:#d4a853;margin:1.5rem 0; }
        .pd-desc { font-family:'DM Sans',sans-serif;font-size:.97rem;font-weight:300;line-height:1.85;color:#3d3d36; }
        .pd-benefits { display:flex;flex-direction:column;gap:.55rem;margin-top:1.75rem; }
        .pd-benefit { display:flex;align-items:center;gap:.65rem;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:400;color:#3d3d36; }
        .pd-benefit svg { color:#2d6a46;flex-shrink:0; }
        .pd-nutrition { display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:rgba(26,74,46,.1);margin-top:2rem;border:1px solid rgba(26,74,46,.1); }
        @media (min-width:480px) { .pd-nutrition { grid-template-columns:repeat(4,1fr); } }
        .pd-nut-cell { background:#faf6ef;padding:1rem .85rem;text-align:center;font-family:'DM Sans',sans-serif; }
        .pd-nut-val { font-size:.82rem;font-weight:700;color:#1a4a2e; }
        .pd-nut-label { font-size:.55rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#5a5550;margin-top:.3rem; }
        .pd-pricing-row { display:flex;align-items:center;gap:1.25rem;margin-top:2.5rem;flex-wrap:wrap; }
        .pd-price { font-family:'Playfair Display',serif;font-size:2rem;font-weight:500;color:#1a4a2e; }
        .pd-price-weight { font-family:'DM Sans',sans-serif;font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#5a5550;background:rgba(26,74,46,.07);padding:.35rem .75rem; }
        .pd-cta-row { display:flex;gap:.85rem;margin-top:1.5rem;flex-wrap:wrap; }
        .pd-btn-cart { display:inline-flex;align-items:center;gap:.6rem;background:#1a4a2e;color:#fff;font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:1rem 2rem;border:none;cursor:pointer;transition:background .22s;flex:1;justify-content:center; }
        .pd-btn-cart:hover { background:#0c3320; }
        .pd-btn-cart.added { background:#2d6a46; }
        .pd-btn-checkout { display:inline-flex;align-items:center;justify-content:center;gap:.6rem;background:#d4a853;color:#1a4a2e;font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:1rem 2rem;border:none;cursor:pointer;transition:background .22s;text-decoration:none;flex:1; }
        .pd-btn-checkout:hover { background:#c49540; }
        .pd-pp-banner { margin-top:1.5rem;padding:1.25rem 1.5rem;background:#f0ede6;border:1px solid rgba(26,74,46,.12);display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap; }
        .pd-pp-text { font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:400;color:#3d3d36;line-height:1.6; }
        .pd-pp-text strong { color:#1a4a2e;font-weight:700; }
        .pd-pp-link { display:inline-flex;align-items:center;gap:.5rem;white-space:nowrap;font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#1a4a2e;text-decoration:none;transition:color .2s; }
        .pd-pp-link:hover { color:#b8893a; }
        .pd-related-section { background:#f2ede4;padding:5rem 1.5rem;box-sizing:border-box; }
        .pd-related-inner { max-width:1200px;margin:0 auto; }
        .pd-related-heading { font-family:'Playfair Display',serif;font-size:clamp(1.5rem,3vw,2.2rem);font-weight:400;font-style:italic;color:#1a4a2e;margin-bottom:2.5rem; }
        .pd-related-grid { display:grid;gap:1px;background:rgba(26,74,46,.1); }
        @media (min-width:640px) { .pd-related-grid { grid-template-columns:repeat(2,1fr); } }
        @media (min-width:900px) { .pd-related-grid { grid-template-columns:repeat(3,1fr); } }
        .pd-rel-card { background:#faf6ef;display:flex;flex-direction:column;text-decoration:none;overflow:hidden;transition:box-shadow .28s; }
        .pd-rel-card:hover { box-shadow:0 12px 40px rgba(26,74,46,.12);z-index:1;position:relative; }
        .pd-rel-img-wrap { aspect-ratio:4/3;overflow:hidden;flex-shrink:0; }
        .pd-rel-img { width:100%;height:100%;object-fit:cover;transition:transform .7s; }
        .pd-rel-card:hover .pd-rel-img { transform:scale(1.06); }
        .pd-rel-body { padding:1.5rem 1.5rem 2rem; }
        .pd-rel-cat { font-family:'DM Sans',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#b8893a; }
        .pd-rel-name { font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:500;color:#1a4a2e;margin-top:.35rem;line-height:1.2; }
        .pd-rel-price { font-family:'DM Sans',sans-serif;font-size:.75rem;font-weight:700;color:#1a4a2e;margin-top:.5rem; }
        .pd-rel-cta { display:flex;align-items:center;gap:6px;margin-top:1rem;font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#1a4a2e;transition:color .2s; }
        .pd-rel-card:hover .pd-rel-cta { color:#b8893a; }
        .pd-rel-cta svg { transition:transform .2s; }
        .pd-rel-card:hover .pd-rel-cta svg { transform:translateX(4px); }
      `}</style>

      <main className="pd-page">
        <nav className="pd-breadcrumb">
          <Link href={`/${lang}/products`}>{t.back}</Link>
          <span className="pd-breadcrumb-sep">/</span>
          <span>{product.category}</span>
          <span className="pd-breadcrumb-sep">/</span>
          <span style={{ color: "#1a4a2e" }}>{product.name}</span>
        </nav>

        <div className="pd-grid">
          <div className="pd-img-wrap">
            <img src={product.image} alt={product.name} className="pd-img" />
            <span className={`pd-brand-badge ${product.brand}`}>
              {product.brand === "powerpulz" ? "Power Pulz" : "Amoohaa Farms"}
            </span>
          </div>

          <div className="pd-detail">
            <span className="pd-category">{product.category}</span>
            <h1 className="pd-name">{product.name}</h1>
            <p className="pd-source">{t.sourcedFrom} {product.source}</p>
            <div className="pd-rule" />
            <p className="pd-desc">{product.longDesc}</p>

            <div className="pd-benefits">
              {product.benefits.map((b) => (
                <div className="pd-benefit" key={b}><Check size={14} />{b}</div>
              ))}
            </div>

            <div className="pd-nutrition">
              {product.nutritionHighlights.map((n) => (
                <div className="pd-nut-cell" key={n.label}>
                  <div className="pd-nut-val">{n.value.split(" /")[0]}</div>
                  <div className="pd-nut-label">{n.label}</div>
                </div>
              ))}
            </div>

            <div className="pd-pricing-row">
              <span className="pd-price">{format(product.price)}</span>
              <span className="pd-price-weight">{product.weight}</span>
            </div>

            <div className="pd-cta-row">
              <button className={`pd-btn-cart${added ? " added" : ""}`} onClick={handleAddToCart}>
                {added ? <Check size={15} /> : <ShoppingCart size={15} />}
                {added ? t.addedToCart : t.addToCart}
              </button>
              <Link href={`/${lang}/checkout`} className="pd-btn-checkout">
                {t.buyNow} <ArrowRight size={14} />
              </Link>
            </div>

            {isPowerPulz && (
              <div className="pd-pp-banner">
                <p className="pd-pp-text">This product is part of the <strong>Power Pulz</strong> performance nutrition range by Amoohaa Farms.</p>
                <a href={product.powerpulzUrl} target="_blank" rel="noreferrer" className="pd-pp-link">
                  {t.visitPP} <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="pd-related-section">
            <div className="pd-related-inner">
              <h2 className="pd-related-heading">{t.relatedHeading}</h2>
              <div className="pd-related-grid">
                {related.map((p) => (
                  <Link href={`/${lang}/products/${p.slug}`} className="pd-rel-card" key={p.slug}>
                    <div className="pd-rel-img-wrap">
                      <img src={p.image} alt={p.name} className="pd-rel-img" />
                    </div>
                    <div className="pd-rel-body">
                      <span className="pd-rel-cat">{p.category}</span>
                      <p className="pd-rel-name">{p.name}</p>
                      <p className="pd-rel-price">{format(p.price)} · {p.weight}</p>
                      <span className="pd-rel-cta">{t.viewProduct} <ArrowRight size={12} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
