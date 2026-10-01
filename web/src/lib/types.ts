export type SanityImage = {
  alt?: string
  url?: string
  width?: number
  height?: number
  lqip?: string
}

export type HeroSection = {
  _type: 'hero'
  _key: string
  heading: string
  subheading?: string
  ctaLabel?: string
  ctaHref?: string
  image?: SanityImage
}

export type FeaturesSection = {
  _type: 'features'
  _key: string
  heading?: string
  items?: {_key: string; title: string; text?: string}[]
}

export type FaqSection = {
  _type: 'faq'
  _key: string
  heading?: string
  questions?: {_key: string; question: string; answer: string}[]
}

export type CtaSection = {
  _type: 'cta'
  _key: string
  heading: string
  text?: string
  buttonLabel: string
  buttonHref: string
}

// Discriminated union — ovo je ono o čemu smo pričali u mentalnom modelu
export type Section = HeroSection | FeaturesSection | FaqSection | CtaSection

export type PageData = {
  metaDescription?: string
  sections?: Section[]
}