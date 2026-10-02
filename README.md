# astro-sanity-demo

A small bilingual (Serbian / English) landing page for a fictional study-planning app called Fokusiraj. I built it to practise a headless CMS setup end to end: content is modelled and edited in Sanity Studio, and the public site is generated as static HTML by Astro.

The public site ships no React and no CSS or JS framework. The only client-side JavaScript is a few lines that progressively enhance the FAQ.

## Stack

- **Sanity Studio** (v6) for content modelling and editing. Studio itself is a React app, but it is only the editing tool and never reaches site visitors.
- **Astro** (v7) in static output mode for the public site.
- **GROQ** with `@sanity/client` for fetching content at build time.
- **Vanilla CSS** with custom properties as design tokens and scoped `<style>` blocks per component.
- **TypeScript** in both projects.

## Folder structure

```
astro-sanity-demo/
├── studio/                     Sanity Studio
│   ├── schemaTypes/
│   │   ├── locale.ts           localeString / localeText + list of languages
│   │   ├── sections.ts         hero, features, faq, cta (page builder blocks)
│   │   ├── page.ts             page document with an array of sections
│   │   └── index.ts
│   └── sanity.config.ts
└── web/                        Astro site
    ├── astro.config.mjs        redirect from / to the default language
    └── src/
        ├── pages/[lang]/       one dynamic route, built once per language
        ├── components/         Demo* components, one per section type
        ├── i18n/               UI strings that do not come from Sanity
        ├── lib/                Sanity client, GROQ query, TypeScript types
        └── styles/             tokens.css (design tokens), global.css (reset and basics)
```

## Setup

Requirements: Node.js 22.12 or newer, and a Sanity project (free tier is enough).

1. Install dependencies in both folders:

   ```bash
   cd studio && npm install
   cd ../web && npm install
   ```

2. Point Studio at your project. The project ID and dataset are set in `studio/sanity.config.ts` and `studio/sanity.cli.ts`.

3. Create `web/.env` from the example file and fill it in:

   ```bash
   cp web/.env.example web/.env
   ```

   | Variable             | Example      | Notes                                                           |
   | -------------------- | ------------ | --------------------------------------------------------------- |
   | `SANITY_PROJECT_ID`  | `abc123xy`   | From sanity.io/manage. Not a secret.                            |
   | `SANITY_DATASET`     | `production` |                                                                 |
   | `SANITY_API_VERSION` | `2026-10-01` | A date. Pins API behaviour so it does not change underneath me. |

   No API token is needed: the site reads only published documents from a public dataset.

4. In Studio, create a `page` document with the slug `home` and add sections to it.

## Running

Studio (http://localhost:3333):

```bash
cd studio && npm run dev
```

Web (http://localhost:4321, which redirects to `/sr/`):

```bash
cd web && npm run dev
```

Production build of the site into `web/dist/`:

```bash
cd web && npm run build
```

Because the site is static, content changes in Studio appear on the site only after a new build.

## Decisions

### Field-level i18n

Every translatable field is an object with one key per language (`heading: {sr: "...", en: "..."}`), and the GROQ query picks one with `heading[$lang]`. The alternative is document-level i18n, where each language is a separate document linked to the others.

I chose field-level because both languages share the same page structure. The order of sections, images and links is set once, and a translation sits right next to the original, so an editor can see what is missing. The query is the same for every language, and only `$lang` changes.

The trade-offs I accept: every language must have the same layout, languages cannot be published separately, and documents grow with each added language. For two languages and one layout, that is fine. If the languages ever needed different pages or separate review workflows, I would switch to document-level.

### `<details>` instead of a custom accordion

The FAQ uses native `<details>`/`<summary>`, and the `name` attribute makes it exclusive (opening one closes the others). The browser provides keyboard support, focus handling, the expanded/collapsed state for screen readers, and in Chromium, expanding a closed answer when find-in-page matches its text. It also works with JavaScript disabled.

A custom accordion would need me to rebuild all of that with buttons, `aria-expanded`, `aria-controls` and key handlers. More code also means more ways to get it wrong. The small script in `DemoFaq.astro` only adds an "Open all / Close all" button, and the script creates that button itself, so it never appears when JavaScript is not running.

The cost is limited control over animation. For an FAQ, I think that is a good trade.

### Design tokens instead of a CSS framework

Colours, type scale, spacing, radii and timing live as CSS custom properties in `tokens.css`. Components use them in scoped `<style>` blocks with BEM class names prefixed with `demo-`.

For a site this size, a framework would add a dependency and a build step to solve problems I do not have. Custom properties are native and resolve at runtime, so a theme or a dark mode is a matter of redefining variables. The prefix keeps my classes from colliding with anything else on the page.

The cost is that I write layout CSS myself instead of composing utility classes.

### `useCdn: true`

The Sanity client reads from the API CDN instead of the live API. The site fetches content only at build time and never needs drafts, so the cached, globally distributed endpoint is the right fit: it is faster and keeps load off the uncached API.

The catch is that the CDN can lag briefly behind a fresh publish. If I later trigger builds from a Sanity publish webhook, I will either switch this to `false` for builds or add a short delay, so a build does not pick up the previous version of the content.

### UI strings live in code

Text that is not content, such as "Skip to content", navigation labels and the FAQ button, lives in `web/src/i18n/ui.ts`. These strings are part of how the interface works, not editorial copy, and the TypeScript types make a missing translation a build error instead of an empty label. Marketing copy that editors should be able to change belongs in Sanity.
