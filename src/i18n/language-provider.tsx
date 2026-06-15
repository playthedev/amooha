"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

const STORAGE_KEY = "amoohaa.lang";

type LanguageContextValue = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from saved preference (or browser language) after mount.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isLocale(stored)) {
      setLangState(stored);
      return;
    }
    const browser = window.navigator.language.slice(0, 2);
    if (isLocale(browser)) setLangState(browser);
  }, []);

  const setLang = (next: Locale) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/** Shorthand: returns the active dictionary. */
export function useT(): Dictionary {
  return useLanguage().t;
}
