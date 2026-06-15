"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Leaf,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { useCart } from "@/commerce/cart-provider";
import { useCatalog, useProduct } from "@/commerce/use-catalog";
import { useCurrency } from "@/currency/currency-provider";
import { useT } from "@/i18n/language-provider";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const product = useProduct(slug);
  const catalog = useCatalog();
  const { add, setOpen } = useCart();
  const { format } = useCurrency();
  const t = useT();
  const c = t.commerce;

  const [variantId, setVariantId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const variant = useMemo(() => {
    if (!product) return undefined;
    return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  }, [product, variantId]);

  const related = useMemo(
    () =>
      catalog
        .filter((p) => p.slug !== slug && p.categoryKey === product?.categoryKey)
        .slice(0, 3),
    [catalog, slug, product],
  );

  if (!product) {
    return (
      <main
        className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center"
        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
      >
        <p className="text-2xl font-semibold text-[var(--leaf-dark)]">
          {c.product.notFound}
        </p>
        <Link
          href="/products"
          className="bg-[var(--wheat)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:brightness-105"
        >
          {c.product.notFoundCta}
        </Link>
      </main>
    );
  }

  const gallery = product.gallery.length ? product.gallery : [product.image];

  const addToCart = () => {
    if (!variant) return;
    add({
      slug: product.slug,
      variantId: variant.id,
      name: product.name,
      variantLabel: variant.label,
      image: product.image,
      priceInr: variant.priceInr,
      qty,
    });
  };

  const buyNow = () => {
    if (!variant) return;
    add({
      slug: product.slug,
      variantId: variant.id,
      name: product.name,
      variantLabel: variant.label,
      image: product.image,
      priceInr: variant.priceInr,
      qty,
    });
    setOpen(false);
    router.push("/checkout");
  };

  return (
    <main
      className="bg-[#f7f3ec]"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--stone)]">
          <Link href="/products" className="transition hover:text-[var(--leaf-dark)]">
            {c.product.breadcrumbProducts}
          </Link>
          <ChevronRight size={13} />
          <span className="text-[var(--leaf-dark)]">{product.name}</span>
        </nav>

        <Link
          href="/products"
          className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--stone)] transition hover:text-[var(--leaf-dark)]"
        >
          <ArrowLeft size={14} />
          {c.product.back}
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
              <Image
                src={gallery[activeImg]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                priority
              />
              <span className="absolute left-4 top-4 bg-[var(--wheat)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)]">
                {t.products.categories[product.categoryKey]}
              </span>
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImg(i)}
                    className={`relative h-20 w-20 overflow-hidden rounded-md border-2 transition ${
                      i === activeImg
                        ? "border-[var(--wheat-deep)]"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--wheat-deep)]">
              {product.source}
            </span>
            <h1 className="mt-2 font-serif text-3xl font-medium leading-tight text-[var(--leaf-dark)] sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <span className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={15}
                    className={
                      n <= Math.round(product.rating)
                        ? "fill-[var(--wheat-deep)] text-[var(--wheat-deep)]"
                        : "text-[var(--line)]"
                    }
                  />
                ))}
              </span>
              <span className="text-[12px] font-semibold text-[var(--ink)]">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[12px] text-[var(--stone)]">
                ({product.reviews} {c.product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[var(--leaf-dark)]">
                {format(variant!.priceInr)}
              </span>
              <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--stone)]">
                / {variant!.label}
              </span>
            </div>

            <p className="mt-2 inline-flex w-fit items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--leaf)]">
              <Check size={14} /> {product.inStock ? c.inStock : c.outOfStock}
            </p>

            <p className="mt-5 text-[14px] leading-7 text-[var(--stone)]">
              {product.desc}
            </p>

            {/* Variant selector */}
            <div className="mt-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--ink)]">
                {c.selectSize}
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const active = v.id === variant!.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setVariantId(v.id)}
                      className={`flex flex-col items-start border px-4 py-2 transition ${
                        active
                          ? "border-[var(--leaf-dark)] bg-[var(--leaf-dark)] text-white"
                          : "border-[var(--line)] text-[var(--ink)] hover:border-[var(--wheat-deep)]"
                      }`}
                    >
                      <span className="text-[13px] font-semibold">{v.label}</span>
                      <span
                        className={`text-[11px] ${active ? "text-white/80" : "text-[var(--stone)]"}`}
                      >
                        {format(v.priceInr)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity + actions */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-[var(--line)]">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-11 items-center justify-center text-[var(--leaf-dark)] transition hover:bg-[color:rgba(18,54,37,0.06)]"
                >
                  <Minus size={15} />
                </button>
                <span className="w-12 text-center text-[15px] font-bold text-[var(--ink)]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-11 w-11 items-center justify-center text-[var(--leaf-dark)] transition hover:bg-[color:rgba(18,54,37,0.06)]"
                >
                  <Plus size={15} />
                </button>
              </div>
              <button
                onClick={addToCart}
                className="flex h-11 flex-1 items-center justify-center bg-[var(--wheat)] text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)] transition hover:brightness-105"
              >
                {c.addToCart}
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={buyNow}
                className="flex h-11 flex-1 items-center justify-center bg-[var(--leaf-dark)] text-[12px] font-bold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
              >
                {c.buyNow}
              </button>
              <Link
                href="/contact"
                className="flex h-11 flex-1 items-center justify-center border border-[var(--line)] text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--leaf-dark)] transition hover:border-[var(--wheat-deep)]"
              >
                {c.enquire}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-7 grid grid-cols-3 gap-2 border-t border-[var(--line)] pt-6">
              {[
                { Icon: Truck, label: c.badges.freeShip },
                { Icon: ShieldCheck, label: c.badges.secure },
                { Icon: Leaf, label: c.badges.farm },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon size={18} className="text-[var(--wheat-deep)]" />
                  <span className="text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-[var(--stone)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--ink)]">
                {c.product.highlights}
              </span>
              <ul className="mt-2 flex flex-col gap-1.5">
                {c.product.highlightItems.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-[13px] text-[var(--stone)]">
                    <Check size={14} className="text-[var(--leaf)]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-medium text-[var(--leaf-dark)]">
              {c.product.related}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-lg"
                >
                  <span className="relative block aspect-square overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 280px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="block p-4">
                    <span className="block text-[14px] font-semibold text-[var(--leaf-dark)]">
                      {p.name}
                    </span>
                    <span className="mt-1 block text-[13px] font-bold text-[var(--wheat-deep)]">
                      {c.from} {format(Math.min(...p.variants.map((v) => v.priceInr)))}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
