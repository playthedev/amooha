"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { type CurrencyConfig, currencies, formatPrice } from "./currency";

interface CurrencyContextValue {
  currency: CurrencyConfig;
  setCurrency: (code: string) => void;
  format: (priceInr: number) => string;
  allCurrencies: typeof currencies;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "amoohaa-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyConfig>(
    currencies["INR"]
  );

  useEffect(() => {
    // Check if user previously selected a currency
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && currencies[stored]) {
      setCurrencyState(currencies[stored]);
      return;
    }
    // Otherwise detect from geo API
    fetch("/api/currency")
      .then((r) => r.json())
      .then((data) => {
        if (data.currency) setCurrencyState(data.currency);
      })
      .catch(() => {});
  }, []);

  const setCurrency = useCallback((code: string) => {
    if (currencies[code]) {
      setCurrencyState(currencies[code]);
      localStorage.setItem(STORAGE_KEY, code);
    }
  }, []);

  const format = useCallback(
    (priceInr: number) => formatPrice(priceInr, currency),
    [currency]
  );

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, format, allCurrencies: currencies }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
