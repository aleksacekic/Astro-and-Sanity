import {localeString, localeText} from './locale'
import {hero, features, faq, cta} from './sections'
import {page} from './page'

export const schemaTypes = [
  localeString, localeText,   // gradivni blokovi
  hero, features, faq, cta,   // sekcije
  page,                       // dokument
]