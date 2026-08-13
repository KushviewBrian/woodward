# Content still needed before launch

Nothing in this codebase invents business facts, testimonials, or policy details that
weren't in `docs/spec.md`. Everywhere the real answer was unverified, the code ships an
honest placeholder instead of a guess. This is the checklist to close those out — grep
the codebase for `CONFIRM` to find every instance in context.

## Blocks going live at all

- [ ] **Form provider.** `src/components/ServiceRequestForm.astro` has `FORM_ACTION = '#'`
      — the form does not submit anywhere yet. Pick Formspree/Basin/etc., wire the action
      URL, and add Cloudflare Turnstile per `docs/spec.md` §8.
- [ ] **Monitored inbox.** `src/data/business.ts` has a placeholder `email`. Confirm the
      real address form submissions should land in (and a backup CC).
- [ ] **Google Business Profile.** Confirm claim status and URL; add to `sameAs` in
      `src/components/Schema.astro` once known.
- [ ] **Domain cutover.** The site currently builds for
      `https://kushviewbrian.github.io/woodward/` (no custom domain yet). Once
      `www.woodwardautomotivellc.com` is pointed at GitHub Pages via Cloudflare: in
      `astro.config.mjs` set `site` back to `https://www.woodwardautomotivellc.com` and
      remove the `base: '/woodward'` line, and re-add `public/CNAME` containing
      `www.woodwardautomotivellc.com`.

## Blocks publishing specific pages

- `src/pages/about.astro` — owner's founding story, staff names/roles/photos.
- `src/pages/contact.astro` — towing policy paragraph.
- `src/pages/faq.astro` (data in `src/data/faq.ts`) — every answer: appointment vs.
  walk-in, estimate/approval process, diagnostic fee policy, payment methods, warranty
  terms, vehicle exclusions, drop-off/pickup policy, towing.
- `src/pages/privacy.astro` — form provider name once selected, data retention period.
- `src/pages/fort-wayne-auto-repair.astro` — real neighborhood/service-area language
  (don't fill with generic city-name boilerplate), wayfinding detail for Suite E.
- `src/data/reviews.ts` — intentionally empty. Add entries only with written permission
  to republish specific review text.

## Assets

- Real commissioned photography (exterior, bays, team, equipment) to replace
  `PhotoPlaceholder` usages across the homepage and `/about/`. No stock photos — see
  `docs/spec.md` §12 shot list.
- Real logo, if one exists, to replace the text wordmark in `Header.astro`.
- A proper favicon/OG image set once a logo exists (`public/favicon.svg` is a
  placeholder mark).

## Everything else

The full owner question list — hours edge cases, texting policy, scheduling platform,
legal entity name, etc. — is in `docs/spec.md` under "Open questions for the owner."
This file only tracks what's actually wired into the code as a visible placeholder.
