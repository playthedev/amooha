// Server-side authoritative pricing. The browser is never trusted for amounts:
// the order route recomputes the subtotal from the catalog using only the
// (slug, variantId, qty) the client claims, then converts currency here.

import { CATALOG } from "./catalog";
import {
  BASE_CURRENCY,
  CURRENCIES,
  FALLBACK_RATES_PER_USD,
  isCurrency,
  type CurrencyCode,
} from "@/currency/config";

export type LineInput = { slug: string; variantId: string; qty: number };

export type PricedLine = {
  slug: string;
  variantId: string;
  variantLabel: string;
  qty: number;
  unitPriceInr: number;
};

/** Recompute the INR subtotal from the catalog. Unknown/invalid lines are skipped. */
export function subtotalInrFromLines(lines: LineInput[]): number {
  let total = 0;
  for (const line of lines ?? []) {
    const product = CATALOG.find((p) => p.slug === line.slug);
    const variant = product?.variants.find((v) => v.id === line.variantId);
    const qty = Math.max(0, Math.floor(Number(line.qty) || 0));
    if (variant && qty > 0) total += variant.priceInr * qty;
  }
  return total;
}

/**
 * Resolve each line against the catalog, dropping unknown products/variants
 * or non-positive quantities. Prices and labels come from the catalog only —
 * never from the client.
 */
export function pricedLinesFromInput(lines: LineInput[]): PricedLine[] {
  const out: PricedLine[] = [];
  for (const line of lines ?? []) {
    const product = CATALOG.find((p) => p.slug === line.slug);
    const variant = product?.variants.find((v) => v.id === line.variantId);
    const qty = Math.max(0, Math.floor(Number(line.qty) || 0));
    if (!product || !variant || qty <= 0) continue;
    out.push({
      slug: product.slug,
      variantId: variant.id,
      variantLabel: variant.label,
      qty,
      unitPriceInr: variant.priceInr,
    });
  }
  return out;
}

/** Razorpay treats these currencies as zero-decimal (amount = major units). */
const ZERO_DECIMAL = new Set(["JPY"]);

export function minorUnitFactor(currency: CurrencyCode): number {
  return ZERO_DECIMAL.has(currency) ? 1 : 100;
}

/** Fetch live USD-based rates, falling back to the static table on any failure. */
async function ratesPerUsd(): Promise<Record<string, number>> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      // Rates change slowly; cache for an hour.
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.rates) return { ...FALLBACK_RATES_PER_USD, ...data.rates };
    }
  } catch {
    /* ignore */
  }
  return FALLBACK_RATES_PER_USD;
}

/** Convert an INR amount into the target currency's smallest unit (e.g. paise/cents). */
export async function toMinorUnits(
  amountInr: number,
  currency: string,
): Promise<{ currency: CurrencyCode; minor: number; major: number }> {
  const target: CurrencyCode = isCurrency(currency) ? currency : BASE_CURRENCY;
  const rates = await ratesPerUsd();
  const perUsdBase = rates[BASE_CURRENCY] ?? FALLBACK_RATES_PER_USD[BASE_CURRENCY];
  const perUsdTarget = rates[target] ?? FALLBACK_RATES_PER_USD[target];
  const major = (amountInr / perUsdBase) * perUsdTarget;
  const factor = minorUnitFactor(target);
  const minor = Math.round(major * factor);
  return { currency: target, minor, major };
}

export { CURRENCIES };
