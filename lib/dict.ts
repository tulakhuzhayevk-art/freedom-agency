import { ru } from "@/content/ru";
import { en } from "@/content/en";
import { uz } from "@/content/uz";
import type { Dict } from "@/content/ru";

export const LANGS = ["ru", "en", "uz"] as const;
export type Lang = (typeof LANGS)[number];

export function getDict(lang: string): Dict {
  if (lang === "en") return en;
  if (lang === "uz") return uz;
  return ru;
}
