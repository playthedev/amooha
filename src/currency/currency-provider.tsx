"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BASE_CURRENCY,
  CURRENCY_META,
  DEFAULT_CURRENCY,
  FALLBACK_RATES_PER_USD,
  isCurrency,
  type CurrencyCode,
} from "./config";

const STORAGE_KEY = "amoohaa.currency";

type Rates = Record<string, number>; // units per 1 USD

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** True until the user (or geo-detect) has resolved a currency. */
  autoDetected: boolean;
  /** Convert an amount authored in BASE_CURRENCY into the active currency. */
  convert: (amountInBase: number) => number;
  /** Convert and format with the active currency's symbol/locale. */
  format: (amountInBase: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [manual, setManual] = useState(false);
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES_PER_USD);

  // Restore a saved manual choice, else geo-detect from IP once on mount.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isCurrency(stored)) {
      setCurrencyState(stored);
      setManual(true);
      return;
    }
    let cancelled = false;
    fetch("https://ipapi.co/json/")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const code = String(data.currency ?? "").toUpperCase();
        if (isCurrency(code)) setCurrencyState(code);
      })
      .catch(() => {
        /* offline / blocked — keep DEFAULT_CURRENCY */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Refresh live exchange rates (base USD). Falls back silently on failure.
  useEffect(() => {
    let cancelled = false;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.rates) return;
        setRates({ ...FALLBACK_RATES_PER_USD, ...data.rates });
      })
      .catch(() => {
        /* keep fallback rates */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    setManual(true);
    window.localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const convert = useCallback(
    (amountInBase: number) => {
      const perUsdBase = rates[BASE_CURRENCY] ?? FALLBACK_RATES_PER_USD[BASE_CURRENCY];
      const perUsdTarget = rates[currency] ?? FALLBACK_RATES_PER_USD[currency];
      const amountInUsd = amountInBase / perUsdBase;
      return amountInUsd * perUsdTarget;
    },
    [rates, currency],
  );

  const format = useCallback(
    (amountInBase: number) => {
      const value = convert(amountInBase);
      const meta = CURRENCY_META[currency];
      try {
        return new Intl.NumberFormat(meta.locale, {
          style: "currency",
          currency,
          maximumFractionDigits: meta.fractionDigits,
          minimumFractionDigits: meta.fractionDigits,
        }).format(value);
      } catch {
        return `${meta.symbol}${value.toFixed(meta.fractionDigits)}`;
      }
    },
    [convert, currency],
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({ currency, setCurrency, autoDetected: !manual, convert, format }),
    [currency, setCurrency, manual, convert, format],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
