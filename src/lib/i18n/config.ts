// Shared i18n config — safe to import from both Server and Client Components

export const locales = ['en', 'ar', 'tr', 'ru', 'de', 'fr', 'es', 'it', 'zh'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  tr: 'Türkçe',
  ru: 'Русский',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  zh: '中文',
}

export const rtlLocales: Locale[] = ['ar']

export const isRTL = (locale: Locale) => rtlLocales.includes(locale)

export const hasLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale)