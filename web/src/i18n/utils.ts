import {ui, type Lang, type UiKey} from './ui'

// const t = useTranslations(lang); t('skipLink')
export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key]
}

// "/sr/nesto/" -> "/en/nesto/": ista stranica, drugi jezik.
// Menja se samo prvi segment putanje, ostatak ostaje netaknut.
export function getLocalizedPath(pathname: string, lang: Lang) {
  const [, , ...rest] = pathname.split('/')
  return `/${[lang, ...rest].join('/')}`
}
