import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { de } from "./de";
import { pt } from "./pt";
import type { Locale } from "../config";

/** The English dictionary is the source of truth for the shape. */
export type Dictionary = typeof en;

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
  fr,
  de,
  pt,
};
