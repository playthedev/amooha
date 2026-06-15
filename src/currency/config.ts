export const CURRENCIES = [
  "INR",
  "USD",
  "EUR",
  "GBP",
  "AED",
  "AUD",
  "CAD",
  "SGD",
  "JPY",
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number];

/** Prices in the codebase are authored in this currency. */
export const BASE_CURRENCY: CurrencyCode = "INR";

export const DEFAULT_CURRENCY: CurrencyCode = "INR";

type CurrencyMeta = {
  symbol: string;
  name: string;
  /** BCP-47 locale used for Intl number formatting. */
  locale: string;
  /** Minor-unit digits (e.g. 0 for JPY/INR-display, 2 for USD). */
  fractionDigits: number;
};

export const CURRENCY_META: Record<CurrencyCode, CurrencyMeta> = {
  INR: { symbol: "₹",  name: "Indian Rupee",     locale: "en-IN", fractionDigits: 0 },
  USD: { symbol: "$",  name: "US Dollar",        locale: "en-US", fractionDigits: 2 },
  EUR: { symbol: "€",  name: "Euro",             locale: "de-DE", fractionDigits: 2 },
  GBP: { symbol: "£",  name: "Pound Sterling",   locale: "en-GB", fractionDigits: 2 },
  AED: { symbol: "د.إ", name: "UAE Dirham",       locale: "ar-AE", fractionDigits: 2 },
  AUD: { symbol: "A$", name: "Australian Dollar", locale: "en-AU", fractionDigits: 2 },
  CAD: { symbol: "C$", name: "Canadian Dollar",  locale: "en-CA", fractionDigits: 2 },
  SGD: { symbol: "S$", name: "Singapore Dollar", locale: "en-SG", fractionDigits: 2 },
  JPY: { symbol: "¥",  name: "Japanese Yen",     locale: "ja-JP", fractionDigits: 0 },
};

/**
 * Offline fallback rates, expressed as units of the currency per 1 USD.
 * Live rates from open.er-api.com override these at runtime when reachable.
 */
export const FALLBACK_RATES_PER_USD: Record<CurrencyCode, number> = {
  USD: 1,
  INR: 83.3,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  AUD: 1.51,
  CAD: 1.36,
  SGD: 1.34,
  JPY: 157,
};

export function isCurrency(value: string): value is CurrencyCode {
  return (CURRENCIES as readonly string[]).includes(value);
}
