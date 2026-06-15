"use client";

import { useMemo } from "react";
import { useT } from "@/i18n/language-provider";
import { CATALOG, type ProductMeta } from "./catalog";

/** A product with its translated text merged onto its static metadata. */
export type Product = ProductMeta & {
  name: string;
  source: string;
  desc: string;
};

/** Merge the active-language item text with the language-neutral catalog. */
export function useCatalog(): Product[] {
  const items = useT().products.items;
  return useMemo(
    () =>
      CATALOG.map((meta, i) => ({
        ...meta,
        name: items[i]?.name ?? meta.slug,
        source: items[i]?.source ?? "",
        desc: items[i]?.desc ?? "",
      })),
    [items],
  );
}

/** Single product by slug, with translated text merged in. */
export function useProduct(slug: string): Product | undefined {
  const catalog = useCatalog();
  return useMemo(() => catalog.find((p) => p.slug === slug), [catalog, slug]);
}
