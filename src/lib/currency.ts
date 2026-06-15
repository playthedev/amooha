export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number; // conversion rate from INR
  locale: string;
}

export const currencies: Record<string, CurrencyConfig> = {
  INR: { code: "INR", symbol: "₹", rate: 1,        locale: "en-IN" },
  USD: { code: "USD", symbol: "$", rate: 0.012,     locale: "en-US" },
  EUR: { code: "EUR", symbol: "€", rate: 0.011,     locale: "fr-FR" },
  GBP: { code: "GBP", symbol: "£", rate: 0.0094,   locale: "en-GB" },
  CAD: { code: "CAD", symbol: "CA$", rate: 0.016,  locale: "en-CA" },
  AUD: { code: "AUD", symbol: "A$", rate: 0.018,   locale: "en-AU" },
  AED: { code: "AED", symbol: "د.إ", rate: 0.044,  locale: "ar-AE" },
  SGD: { code: "SGD", symbol: "S$", rate: 0.016,   locale: "en-SG" },
};

// Map country codes (from IP geolocation) to currency codes
export const countryCurrencyMap: Record<string, string> = {
  IN: "INR",
  US: "USD",
  CA: "CAD",
  GB: "GBP",
  AU: "AUD",
  NZ: "AUD",
  FR: "EUR",
  DE: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  BE: "EUR",
  PT: "EUR",
  AT: "EUR",
  IE: "EUR",
  FI: "EUR",
  GR: "EUR",
  AE: "AED",
  SA: "AED",
  SG: "SGD",
  MY: "SGD",
};

export function formatPrice(
  priceInr: number,
  currency: CurrencyConfig
): string {
  const converted = priceInr * currency.rate;
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: currency.code === "INR" ? 0 : 2,
    maximumFractionDigits: currency.code === "INR" ? 0 : 2,
  }).format(converted);
}

export function getCurrencyForCountry(countryCode: string): CurrencyConfig {
  const code = countryCurrencyMap[countryCode] ?? "INR";
  return currencies[code] ?? currencies["INR"];
}
