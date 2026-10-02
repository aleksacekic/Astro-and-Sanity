// UI tekstovi koji NE dolaze iz Sanity-ja: pristupačnost, navigacija,
// tekstovi koje generiše kod. Sadržaj (naslovi, pitanja, CTA) ostaje u CMS-u.

// Mora da se poklapa sa LANGUAGES u studio/schemaTypes/locale.ts.
// Nazivi su na samom jeziku ("English", ne "Engleski") jer ih tako
// traži neko ko ne razume trenutni jezik stranice.
export const languages = {
  sr: 'Srpski',
  en: 'English',
} as const

export type Lang = keyof typeof languages

// Na njega preusmerava "/" (astro.config.mjs ga uvozi odavde).
export const defaultLang: Lang = 'sr'

// Srpski je izvor istine za spisak ključeva...
const sr = {
  'skipLink': 'Preskoči na sadržaj',
  'nav.label': 'Glavna navigacija',
  'footer.note': 'Demo projekat.',
  'faq.fallbackHeading': 'Česta pitanja',
  'faq.openAll': 'Otvori sve',
  'faq.closeAll': 'Zatvori sve',
  'features.fallbackHeading': 'Prednosti',
}

export type UiKey = keyof typeof sr

// ...a ovaj tip tera svaki drugi jezik da ima tačno iste ključeve:
// zaboravljen prevod je greška pri build-u, ne prazan string na sajtu.
export const ui: Record<Lang, Record<UiKey, string>> = {
  sr,
  en: {
    'skipLink': 'Skip to content',
    'nav.label': 'Main navigation',
    'footer.note': 'Demo project.',
    'faq.fallbackHeading': 'Frequently asked questions',
    'faq.openAll': 'Open all',
    'faq.closeAll': 'Close all',
    'features.fallbackHeading': 'Features',
  },
}
