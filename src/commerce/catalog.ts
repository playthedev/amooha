// Static commerce metadata for each product, aligned BY INDEX with the
// translated `products.items` array in the i18n dictionaries. Names and
// descriptions are translated there; prices/images/slugs are language-neutral
// and live here. Prices are authored in BASE_CURRENCY (INR) — see
// src/currency/config.ts — and converted at render time.

export type CategoryKey = "seeds" | "nuts" | "grains" | "superfoods";

export type Variant = {
  /** Stable id, unique within a product. */
  id: string;
  /** Display label, e.g. "250 g". Language-neutral (units, not words). */
  label: string;
  /** Price for this variant in BASE_CURRENCY (INR). */
  priceInr: number;
};

export type ProductMeta = {
  slug: string;
  categoryKey: CategoryKey;
  image: string;
  /** Extra gallery images (detail page). */
  gallery: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  variants: Variant[];
};

export const CATALOG: ProductMeta[] = [
  {
    slug: "artisanal-makhana",
    categoryKey: "superfoods",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    variants: [
      { id: "100g", label: "100 g", priceInr: 249 },
      { id: "250g", label: "250 g", priceInr: 549 },
      { id: "500g", label: "500 g", priceInr: 999 },
    ],
  },
  {
    slug: "heritage-almonds",
    categoryKey: "nuts",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.9,
    reviews: 208,
    inStock: true,
    variants: [
      { id: "250g", label: "250 g", priceInr: 449 },
      { id: "500g", label: "500 g", priceInr: 849 },
      { id: "1kg", label: "1 kg", priceInr: 1599 },
    ],
  },
  {
    slug: "black-chia-gold",
    categoryKey: "seeds",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.7,
    reviews: 96,
    inStock: true,
    variants: [
      { id: "250g", label: "250 g", priceInr: 299 },
      { id: "500g", label: "500 g", priceInr: 549 },
      { id: "1kg", label: "1 kg", priceInr: 999 },
    ],
  },
  {
    slug: "mountain-walnuts",
    categoryKey: "nuts",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.8,
    reviews: 73,
    inStock: true,
    variants: [
      { id: "250g", label: "250 g", priceInr: 499 },
      { id: "500g", label: "500 g", priceInr: 949 },
      { id: "1kg", label: "1 kg", priceInr: 1799 },
    ],
  },
  {
    slug: "emerald-pepitas",
    categoryKey: "seeds",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.6,
    reviews: 51,
    inStock: true,
    variants: [
      { id: "250g", label: "250 g", priceInr: 329 },
      { id: "500g", label: "500 g", priceInr: 599 },
    ],
  },
  {
    slug: "prime-flax-seeds",
    categoryKey: "grains",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.5,
    reviews: 38,
    inStock: true,
    variants: [
      { id: "500g", label: "500 g", priceInr: 199 },
      { id: "1kg", label: "1 kg", priceInr: 349 },
    ],
  },
];

export function metaBySlug(slug: string): ProductMeta | undefined {
  return CATALOG.find((p) => p.slug === slug);
}

export function indexBySlug(slug: string): number {
  return CATALOG.findIndex((p) => p.slug === slug);
}

/** Lowest variant price (for "from ₹X" display on cards). */
export function fromPriceInr(meta: ProductMeta): number {
  return Math.min(...meta.variants.map((v) => v.priceInr));
}
