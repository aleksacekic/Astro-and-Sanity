// @ts-check
import { defineConfig } from 'astro/config';
import { defaultLang } from './src/i18n/ui';

// https://astro.build/config
export default defineConfig({
  // Sajt postoji samo pod /sr/ i /en/. Na statičkom hostingu Astro za ovo
  // generiše HTML sa <meta http-equiv="refresh">; sa adapterom za hosting
  // (Netlify, Vercel...) postaje pravi 301 na nivou servera.
  redirects: {
    '/': `/${defaultLang}/`,
  },
});
