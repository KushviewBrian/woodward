# Woodward Automotive

Marketing site for Woodward Automotive, an auto repair shop in Fort Wayne, IN.

Static site built with [Astro](https://astro.build) and Tailwind CSS, deployed to GitHub Pages
behind Cloudflare.

## Stack

- **Astro** + TypeScript — static output, no client framework
- **Tailwind CSS v4** — utility styling, design tokens in `src/styles/global.css`
- **GitHub Pages** — hosting, deployed via GitHub Actions on push to `main`
- **Cloudflare** — DNS, TLS, caching, and edge security headers (see `docs/spec.md`)

## Structure

```
src/
  data/        business info, services, reviews, FAQ — single source of truth
  components/  shared UI (header, footer, forms, cards, etc.)
  layouts/     page shell (Layout.astro) with SEO meta + schema
  pages/       one file per route
  scripts/     hours/open-status logic, shared between components
docs/
  spec.md      full site specification
```

Business info (name, address, phone, hours) lives in `src/data/business.ts`. Every
page and component reads from there — don't hardcode it elsewhere.

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
npm run preview
```

## Content still needed before launch

See [`CONTENT-TODO.md`](./CONTENT-TODO.md) for everything marked `[CONFIRM]` — estimate
policy, warranty terms, staff bios, real photography, verified reviews, and the form
provider endpoint. None of it is guessed in the code; placeholders are flagged inline.
