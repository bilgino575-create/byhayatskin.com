import 'server-only'
import type { Locale } from './config'

// Re-export config for convenience (server-side only consumers)
export type { Locale }
export { locales, defaultLocale, localeNames, rtlLocales, isRTL, hasLocale } from './config'

const dictionaries: Record<Locale, () => Promise<unknown>> = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ar: () => import('./dictionaries/ar.json').then((m) => m.default),
  tr: () => import('./dictionaries/tr.json').then((m) => m.default),
  ru: () => import('./dictionaries/ru.json').then((m) => m.default),
  de: () => import('./dictionaries/de.json').then((m) => m.default),
  fr: () => import('./dictionaries/fr.json').then((m) => m.default),
  es: () => import('./dictionaries/es.json').then((m) => m.default),
  it: () => import('./dictionaries/it.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh.json').then((m) => m.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]() as Promise<DictionaryType>
}

// Type derived from English dictionary (source of truth)
import type enDict from './dictionaries/en.json'
export type DictionaryType = typeof enDict