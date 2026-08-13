---
title: Woodward Automotive — Website Specification
status: Draft for owner review
version: 0.2
last_updated: 2026-08-12
---

# Woodward Automotive — Website Specification

Woodward Automotive should have a conversion-focused, local-first site built around one promise: **honest, dependable repair for cars and light trucks in Fort Wayne.** The site should prioritize mobile callers and appointment requests, while making location, hours, core services, and proof of trust impossible to miss.

## How to read this document

| Marker | Meaning |
|---|---|
| **[VERIFIED]** | Corroborated by the current site or a public listing. Safe to build against. |
| **[CONFIRM]** | Plausible but unverified. **Must be owner-confirmed before it ships.** Build the slot; leave it unpublished until confirmed. |
| **[PROPOSED]** | A design/engineering recommendation from this document, not a business fact. Changeable without owner sign-off. |

Anything marked **[CONFIRM]** that is still unresolved at launch gets cut, not guessed. See [Open questions for the owner](#open-questions-for-the-owner) for the consolidated list.

---

## 1. Goals and success criteria

### Primary objective

Increase qualified service contacts — phone calls and appointment requests — from Fort Wayne drivers searching for repair, while establishing a credible, indexable local presence the shop controls.

### Success criteria

The site is successful if, ninety days after launch, all of the following are true.

| Metric | Target | How it is measured |
|---|---|---|
| Call-link clicks | Trending up month over month | Analytics event on `tel:` clicks |
| Service-request submissions | ≥ 8 per month | Form provider delivery log + analytics goal |
| Form completion rate | ≥ 50% of starts | Form-start vs. form-success events |
| Mobile Lighthouse Performance | ≥ 90 | Lab test, throttled mobile, home + one service page |
| Mobile Lighthouse Accessibility | 100 | Same |
| Largest Contentful Paint (field) | ≤ 2.5s at p75 | Search Console Core Web Vitals |
| Indexed pages | 100% of intended URLs | Search Console coverage report |
| NAP consistency | Identical across all listings | Manual audit checklist |
| Structured data | Zero errors | Search Console + Rich Results Test |

### Explicit non-goals

These are out of scope and should be declined if requested mid-build without a scope conversation.

- A customer portal, login, payment processing, or real-time repair-status application.
- Real-time online booking against a live calendar (see [Appointment workflow](#appointment-workflow) for the staged path to this).
- E-commerce, parts sales, or quoting calculators.
- A blog, unless the owner commits to a realistic publishing cadence. An abandoned blog is a negative trust signal.
- Multi-location architecture. One location, one NAP.

---

## 2. Verified business profile

| Field | Best current information | Status | Notes |
|---|---|---|---|
| Business | Woodward Automotive LLC | **[VERIFIED]** | Incorporated locally in 2022. [fwbusiness](https://www.fwbusiness.com/fwbusiness/article_619783c0-f583-57cd-b115-c5347522caea.html) |
| Primary category | Auto repair for cars and light trucks | **[VERIFIED]** | Confirmed by the existing site. [woodwardautomotivellc](https://woodwardautomotivellc.com/) |
| Address | 3909 Fourier Dr, Suite E, Fort Wayne, IN 46818 | **[VERIFIED]** | Keep the suite formatting consistent everywhere. [mapquest](https://www.mapquest.com/us/indiana/woodward-automotive-431809391) |
| Phone | (260) 710-8995 | **[VERIFIED]** | Use click-to-call sitewide. [yelp](https://www.yelp.com/biz/woodward-automotive-fort-wayne) |
| Hours | Monday–Friday, 10 AM–6 PM | **[VERIFIED]** | Confirmed by its current site and Yelp listing. [woodwardautomotivellc](https://woodwardautomotivellc.com/) |
| Holiday hours | Unknown | **[CONFIRM]** | Needed for schema `specialOpeningHoursSpecification` and to avoid wasted trips. |
| Primary services stated | Engine diagnostics, brakes, oil changes, suspension and steering | **[VERIFIED]** | The current site explicitly lists these. [woodwardautomotivellc](https://woodwardautomotivellc.com/) |
| Other services in directories | A/C repair, tire services, towing | **[CONFIRM]** | Directory data is frequently auto-generated. Verify scope and towing policy before publishing. [mapquest](https://www.mapquest.com/us/indiana/woodward-automotive-431809391) |
| Social presence | Facebook: ~110 likes, four check-ins | **[CONFIRM]** | Link only after account ownership/URL is confirmed. [facebook](https://www.facebook.com/p/Woodward-Automotive-100083099090697/) |
| Public reputation cues | Yelp snippet praises adherence to quoted price and proactive communication; directory summaries describe the shop as professional, friendly, knowledgeable | **[VERIFIED]** as sentiment | Use only permissioned/verified review text on the site. [yelp](https://www.yelp.com/biz/woodward-automotive-fort-wayne) |
| Google Business Profile | URL unknown; claim status unknown | **[CONFIRM]** | This is the single highest-leverage local asset. See [GBP](#google-business-profile-highest-leverage-asset). |
| Email for form delivery | Unknown | **[CONFIRM]** | Blocks form configuration. |
| Legal/DBA name for footer | "Woodward Automotive LLC" assumed | **[CONFIRM]** | Footer copyright and privacy policy need the exact entity name. |

### Canonical NAP block

This exact formatting is the single source of truth. It appears identically in the footer, contact page, schema, and every external listing. Do not let a variant ("Ste E", "Fort Wayne, Indiana", "260-710-8995") enter circulation.

```text
Woodward Automotive
3909 Fourier Dr, Suite E
Fort Wayne, IN 46818
(260) 710-8995
Mon–Fri, 10 AM–6 PM
```

Machine formats, used in markup:

| Use | Value |
|---|---|
| `tel:` href | `tel:+12607108995` |
| Schema `telephone` | `+1-260-710-8995` |
| Schema `streetAddress` | `3909 Fourier Dr, Suite E` |
| Display phone | `(260) 710-8995` |

### Brand collision risk

There is a major local-brand collision: **Woodward Tire Sales & Service** is a different Fort Wayne shop at 3111 Covington Rd. Woodward Automotive's site must consistently use "Woodward Automotive," its Fourier Drive address, and its phone number — not "Woodward Tire" — in page titles, schema, maps, and directories. [woodwardautomotivellc](https://woodwardautomotivellc.com/)

**Practical mitigations:**

- Every `<title>` includes "Woodward Automotive" — never the bare surname "Woodward."
- The homepage `<h1>` and the schema `name` match exactly: `Woodward Automotive`.
- Never publish a tire-services page unless tires are confirmed. A `/services/tires/` page would actively deepen the collision and pull the wrong search intent. **[CONFIRM]**
- During the listings audit, check for merged or duplicate Google/Apple/Bing entries that conflate the two businesses, and file corrections.
- Include the suite number everywhere. It is a distinguishing signal for both humans and geocoders.

---

## 3. Audience and conversion model

### Who is arriving

| Segment | Mindset | What they need in the first 5 seconds | Primary action |
|---|---|---|---|
| **Urgent / drivable problem** — warning light, new noise, brake feel | Anxious, comparison-shopping two or three shops on a phone | Phone number, open/closed status, "we diagnose this" | Call |
| **Routine maintenance** — oil change, scheduled service | Low urgency, price and convenience aware | Services list, hours, easy request | Form or call |
| **Second opinion** — quoted elsewhere, suspicious of the price | Skeptical, looking for honesty signals | Estimates policy, process, reviews | Form (with symptom detail) |
| **Referral** — sent by a friend, name in hand | High intent, low friction needed | Confirmation this is the right shop, address, phone | Call |
| **Researcher** — comparing shops before a future need | Evaluative | Proof, photos, real people | Bookmark, later call |

Design implication: **the urgent caller sets the floor.** They are on a phone, possibly on the roadside, with divided attention. Every layout decision defers to that person. The researcher can scroll; the urgent caller cannot be made to.

### Conversion hierarchy

Ranked by value and by likelihood. The design should not fight this ordering.

1. **Phone call** — highest intent, immediate, no follow-up burden on the shop. Optimize hardest for this.
2. **Service request form** — captures after-hours and lower-urgency demand, and buyers who dislike phone calls.
3. **Directions click** — a strong intent signal even without contact; also a real-world conversion.
4. **Saved/bookmarked visit** — measure but do not design around.

### The after-hours problem

Hours are Mon–Fri 10 AM–6 PM. That is **50 open hours out of 168** — roughly 70% of the week is closed, including all weekend. A meaningful share of traffic arrives when nobody can answer the phone.

This is a first-class design constraint, not an edge case.

- The utility bar shows a computed **open/closed status** with the next opening time: "Open until 6 PM" / "Closed — opens Mon 10 AM."
- When closed, the form is promoted above the call button in the mobile sticky bar, and the hero's secondary CTA copy shifts from `Call Now` to `Request Service`.
- The form's confirmation message sets an honest expectation tied to business hours. **[CONFIRM]** the actual response commitment before writing it.
- Implementation: compute status client-side from a small inline script using the `America/Indiana/Indianapolis` timezone, with a server-rendered fallback that shows plain hours if JavaScript is unavailable. Never render a stale "Open now" from build time.

> **Indiana timezone note:** Fort Wayne observes Eastern Time with DST. Use the IANA identifier `America/Indiana/Indianapolis`, never a fixed UTC offset. Hardcoding `-05:00` will show wrong status for eight months of the year.

---

## 4. Strategic positioning

### Core message

**Headline:**
"Straightforward Auto Repair in Fort Wayne."

**Supporting line:**
"Dependable maintenance and repair for cars and light trucks — clear communication, fair pricing, and work you can trust."

**Primary CTA:** `Request Service`
**Secondary CTA:** `Call (260) 710-8995`

The present brand strengths are friendly service, transparent pricing, all-makes-and-models capability, and honest work. The redesigned site should convert those generic claims into proof: staff/shop photography, a simple process, verified reviews, a clear estimates policy, and practical service information. [woodwardautomotivellc](https://woodwardautomotivellc.com/)

### The claim-to-proof discipline

Every generic claim on the current site must be paired with an artifact that substantiates it, or it should be cut. This table is the editorial contract for the whole site.

| Generic claim | Proof artifact that earns it | Where it lives |
|---|---|---|
| "Honest service" | The estimates policy, stated concretely: we call before doing work beyond the approved scope | Process section, FAQ |
| "Transparent pricing" | Written explanation of how diagnostic fees and estimates work **[CONFIRM]** | Service pages, FAQ |
| "Friendly local team" | Real photographs of real people, with names | About, homepage |
| "All makes and models" | Plain statement plus any confirmed limits (e.g., no heavy-duty diesel) **[CONFIRM]** | Trust strip, FAQ |
| "Quality work" | Warranty terms, if any exist **[CONFIRM]** | FAQ, footer |
| "Experienced" | Founded 2022; state tenure honestly rather than implying decades | About |

If the proof artifact does not exist, the claim does not ship. A shop that says "honest" and shows nothing reads exactly like every competitor that says "honest."

### Voice and visual system

- **Tone:** Capable, neighborly, plainspoken, never salesy or overly technical.
- **Design direction:** Modern independent-shop confidence — not dealership gloss and not "greasy garage" cliché.
- **Palette:** Near-black/navy, warm off-white, steel gray, and a high-contrast signal orange or safety red for CTAs.
- **Typography:** A durable condensed display face for headlines paired with an extremely legible sans-serif for body copy.
- **Photography:** Commissioned photos of the actual exterior, reception area, bays, technicians at work, diagnostic equipment, and owner/team. Avoid generic mechanic stock photos.
- **Trust elements:** "Locally serving Fort Wayne," "Cars & light trucks," "Clear estimates," "All makes & models." Publish only claims the business can substantiate.

### Copy rules

Applies to every word on the site.

- **Second person, active voice.** "We'll call you before we start work," not "customers are contacted prior to commencement."
- **No hedging superlatives.** Ban: "premier," "world-class," "your #1 choice," "state-of-the-art," "we pride ourselves."
- **Symptoms over jargon.** Lead with what the driver notices ("grinding when you brake"), then name the part. The driver searches for the symptom.
- **No manufactured urgency.** No countdowns, no "limited time," no "call now before it's too late."
- **Numbers only when true.** No invented review counts, years, or vehicle totals.
- **Reading level:** aim for roughly 8th grade. Short sentences. This is a stressed reader on a phone.
- **Sentence case for headings.** Title Case reads as marketing; sentence case reads as a person talking.

---

## 5. Design system

**[PROPOSED]** — this section is engineering-facing and adjustable without owner sign-off, but it should be settled before build begins so components are not re-litigated per page.

### Color tokens

Values are starting points chosen for contrast compliance; adjust hue to taste but **re-verify every ratio** after any change.

| Token | Value | Role | Contrast check |
|---|---|---|---|
| `--ink-900` | `#0F1720` | Primary text, dark sections | 16.1:1 on `--paper` |
| `--ink-700` | `#2B3743` | Secondary text | 9.4:1 on `--paper` |
| `--ink-500` | `#5A6875` | Muted text, captions | 4.8:1 on `--paper` — body minimum |
| `--paper` | `#FAF8F5` | Page background (warm off-white) | — |
| `--paper-alt` | `#F0EDE8` | Alternating section background | — |
| `--steel-300` | `#C9D0D6` | Borders, dividers | Non-text only |
| `--signal` | `#D6480F` | Primary CTA background | 4.6:1 with white text |
| `--signal-hover` | `#B23A0A` | CTA hover/active | 6.0:1 with white text |
| `--focus` | `#1B6FD4` | Focus ring — deliberately distinct from `--signal` | 3.4:1 against both backgrounds |
| `--success` | `#1E7A48` | Form success state | 4.9:1 on `--paper` |
| `--error` | `#B3261E` | Form error state | 6.1:1 on `--paper` |

**Rules:**

- `--signal` is reserved for conversion actions. If it appears on a decorative element, its meaning is diluted and the CTA stops reading as the CTA.
- The focus ring is never the same color as the CTA. A user tabbing through must be able to tell "focused" from "primary."
- All text pairs meet WCAG AA (4.5:1 body, 3:1 large text). Large display text may use `--ink-700` on `--paper-alt`; verify per usage.
- Test the palette under a deuteranopia simulator. Orange-on-dark must remain distinguishable from the error red.

### Typography scale

Fluid scale using `clamp()`, so no breakpoint-specific font sizes are needed.

| Token | Size | Usage |
|---|---|---|
| `--fs-display` | `clamp(2.25rem, 6vw, 3.75rem)` | Hero h1 only |
| `--fs-h2` | `clamp(1.75rem, 4vw, 2.5rem)` | Section headings |
| `--fs-h3` | `clamp(1.25rem, 2.5vw, 1.5rem)` | Card titles, subsections |
| `--fs-body` | `clamp(1rem, 1.5vw, 1.125rem)` | Body copy |
| `--fs-small` | `0.875rem` | Captions, utility bar, legal |

**Rules:**

- Body copy never drops below `16px` on mobile — smaller triggers iOS input zoom and fails readability for the target demographic.
- Line height: `1.6` for body, `1.15` for display.
- Measure: `65ch` max for paragraphs.
- Load at most two font families and at most two weights each (400, 700). Every additional weight is a network request against the LCP budget.
- `font-display: swap` with a metric-matched fallback stack to avoid layout shift. Self-host the fonts — no third-party font CDN, which adds a DNS lookup and a privacy/CSP surface.

### Spacing and layout

- 4px base unit; the spacing scale is `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- Content max width `1200px`; text-heavy blocks `720px`.
- Section vertical rhythm: `clamp(3rem, 8vw, 6rem)` top and bottom.
- Breakpoints: `480px`, `768px`, `1024px`, `1280px`. Mobile-first — write the base styles for the smallest screen.

### Component inventory

Build these once; every page composes from them. No page-specific one-offs.

| Component | Variants | Notes |
|---|---|---|
| `Button` | primary, secondary, ghost, call-link | Minimum 48×48px touch target |
| `UtilityBar` | — | Hours + open status, address, phone |
| `Header` | default, scrolled | Persistent CTA; no hamburger below 3 items |
| `StickyMobileBar` | open, closed | Call / Directions / Request — reorders by open state |
| `Hero` | home, service, generic | Single `h1` per page |
| `TrustStrip` | 3-up, 4-up | Icon + short label |
| `ServiceCard` | — | Title, one-line symptom summary, link |
| `ProcessSteps` | — | Numbered, 4 steps |
| `ReviewCard` | — | Quote, first name + last initial, source, date, profile link |
| `MapBlock` | static, embed | Static thumbnail default; see [Map strategy](#map-strategy) |
| `ServiceRequestForm` | full, compact | Compact for inline CTA panels |
| `FaqAccordion` | — | Native `<details>`; no JS required |
| `Footer` | — | Full NAP, hours, links |
| `Breadcrumbs` | — | Service pages; emits `BreadcrumbList` schema |

### Motion

- Transitions ≤ 200ms, ease-out. Nothing animates on scroll except a subtle fade for below-fold images.
- Respect `prefers-reduced-motion: reduce` — disable all non-essential transitions and any hero video.
- No parallax, no counters, no auto-advancing anything.

### Iconography

Inline SVG, single stroke weight, `currentColor` fill. Never icon fonts (they fail accessibility and add a render-blocking request). Every icon that conveys meaning gets an accessible label; purely decorative icons get `aria-hidden="true"`.

---

## 6. Ideal site layout

### Homepage

1. **Utility bar**
   - Computed open/closed status: "Open until 6 PM" / "Closed — opens Mon 10 AM."
   - "3909 Fourier Dr, Suite E, Fort Wayne, IN 46818"
   - Prominent phone number.
   - On mobile: a sticky bottom bar with `Call`, `Directions`, and `Request Service`.

2. **Header**
   - Logo, Services, About, Reviews, Contact.
   - Persistent `Request Service` button.
   - No carousel, no clutter, no buried contact details.

3. **Hero**
   - Real shop image. **Prefer a still image over video** — see the [performance budget](#performance-budget); a background video is very hard to reconcile with an LCP ≤ 2.5s target on mobile data.
   - "Straightforward Auto Repair in Fort Wayne."
   - Two CTAs: `Request Service` and `Call Now`.
   - Beneath CTAs: "Cars & light trucks · Mon–Fri, 10–6 · 3909 Fourier Dr."

4. **Immediate trust strip**
   - Honest service.
   - Transparent pricing.
   - Friendly local team.
   - All makes and models.
   - These mirror the existing stated differentiators. [woodwardautomotivellc](https://woodwardautomotivellc.com/)
   - Each label links to the proof that earns it, per the [claim-to-proof table](#the-claim-to-proof-discipline).

5. **Services grid**
   - Diagnostics
   - Brake service
   - Oil changes and maintenance
   - Suspension and steering
   - Optional cards only after confirmation: A/C, tire service, towing **[CONFIRM]**
   - Each points to a unique, indexable service page.
   - Each card leads with the symptom, not the part: "Grinding, squealing, or a soft pedal" beats "Brake Service."

6. **"What to expect" process**
   - Tell us what's happening.
   - We inspect and explain.
   - You approve the work.
   - We get you back on the road.
   - This directly reinforces the quote/communication reputation signal. [yelp](https://www.yelp.com/biz/woodward-automotive-fort-wayne)
   - Step 3 is the differentiator. Make the approval commitment explicit and concrete — it is the single most persuasive element on the page for the second-opinion segment.

7. **Customer reviews**
   - Three to six verified reviews.
   - Cite platform/source visually, date them, and link to the profile.
   - Never fabricate aggregate ratings or testimonials.

8. **About / local section**
   - Short human story, team portrait, shop commitment.
   - Copy focus: serving Fort Wayne and nearby communities with honest work and fair pricing. [woodwardautomotivellc](https://woodwardautomotivellc.com/)

9. **Service-area / map section**
   - Static map thumbnail that opens directions; see [Map strategy](#map-strategy).
   - Address, hours, phone, and clear entrance/parking notes if useful.
   - Fourier Drive is in an industrial/office park north-west of the city. **[CONFIRM]** whether finding Suite E is non-obvious — if so, a single sentence of wayfinding ("Suite E faces the rear lot") prevents real frustration and is worth more than any hero polish.

10. **Final conversion panel**
    - "Need to schedule service?"
    - Appointment form plus phone option.
    - Explicit response expectation, such as "We'll confirm your request during business hours" — only if operationally true. **[CONFIRM]**

11. **Footer**
    - Full NAP: name, address, phone.
    - Hours.
    - Services links.
    - Facebook / review-profile links.
    - Privacy policy and accessibility statement.
    - Copyright.

### Section-order rationale

The order is deliberate and follows the urgent caller's decision sequence. Each section answers the question the previous one raises.

| Section | Question it answers |
|---|---|
| Utility bar | "Are they open, and where are they?" |
| Hero | "Is this the right kind of shop for my problem?" |
| Trust strip | "Why them and not the chain down the road?" |
| Services | "Do they fix *my* specific problem?" |
| Process | "What happens to my money and my car?" |
| Reviews | "Do real people vouch for this?" |
| About | "Who am I handing my keys to?" |
| Map | "Can I get there easily?" |
| Conversion panel | "Okay — how do I start?" |

Do not reorder without a reason grounded in this sequence. Moving reviews above services, for example, asks for trust before establishing relevance.

### Supporting pages

| URL | Purpose | Status |
|---|---|---|
| `/` | Homepage | Build |
| `/services/` | Complete service overview and simple routing to individual services | Build |
| `/services/engine-diagnostics/` | Search visibility and reassurance for warning lights, drivability, electrical/diagnostic problems | Build |
| `/services/brake-repair/` | Symptoms, inspection/repair process, call-to-action | Build |
| `/services/oil-changes-maintenance/` | Maintenance services, intervals framed cautiously, appointment request | Build |
| `/services/suspension-steering/` | Handling, vibration, alignment-related concerns; clarify exactly what the shop offers | Build |
| `/services/air-conditioning/` | Publish only if confirmed | **[CONFIRM]** |
| `/services/tires/` | Publish only if confirmed; note the brand-collision risk in [Brand collision](#brand-collision-risk) | **[CONFIRM]** |
| `/about/` | Ownership story, team, shop values, authentic photography | Build |
| `/reviews/` | Verified review excerpts and direct links to review profiles | Build |
| `/contact/` | Form, clickable phone, map, address, hours, directions, emergency/towing guidance if applicable | Build |
| `/faq/` | Estimate approval, drop-off, payment methods, warranty, diagnostics, appointment timing — owner-approved answers | Build |
| `/fort-wayne-auto-repair/` | A high-quality local landing page, not thin duplicate SEO content | Build (see caution below) |
| `/privacy/` | Required for form analytics, cookies, and scheduling integrations | Build |
| `/accessibility/` | Accessibility statement and contact route for barriers | Build |
| `/thank-you/` | Form-success destination; enables a clean conversion goal and a real analytics event | Build |
| `/404` | Custom not-found with search paths back to services and contact | Build |

Separate service pages are worthwhile because they answer a visitor's immediate need and create relevant local search landing pages; visible contact information, clear service specificity, reviews, scheduling, and mobile usability are repeatedly recommended for auto-repair sites. [blog.boltontechnology](https://blog.boltontechnology.com/best-practices-for-auto-shop-websites)

> **Caution on `/fort-wayne-auto-repair/`:** With a homepage already targeting "auto repair in Fort Wayne," this page risks cannibalizing the homepage for its own primary term. Ship it **only** if it carries genuinely distinct content — service-area detail, neighborhood references, local landmarks, area-specific guidance — that the homepage does not. If it would merely restate the homepage in different words, cut it. Two pages fighting for one query is worse than one strong page. Decide this at the content stage, not the build stage.

### Service page template

Every service page follows this structure. Consistency here is what makes the pages scale and what keeps them from becoming thin duplicates of each other.

1. **`h1`** — `{Service} in Fort Wayne` (e.g., "Brake Repair in Fort Wayne")
2. **Symptom list** — "Come see us if you notice…" in the driver's words, not the technician's. This is the section that matches search intent.
3. **What we do** — the actual inspection/repair process for this service, in plain language.
4. **What it costs** — how estimates work for this service. Not a price. An explanation of *how the price gets decided*, which is what the anxious visitor is actually asking. **[CONFIRM]** the diagnostic fee policy before writing this.
5. **How long it takes** — realistic ranges, or "we'll tell you when we inspect." Honest vagueness beats a promise that gets broken. **[CONFIRM]**
6. **Inline CTA** — compact form variant plus call button.
7. **Two or three relevant reviews** — filtered to this service where possible.
8. **Related services** — internal links, 2–3 max.
9. **Breadcrumbs** — `Home > Services > {Service}`, with `BreadcrumbList` schema.

**Anti-duplication rule:** each page needs at least 150 words that could not appear on any other service page. If two pages could swap paragraphs without anyone noticing, they are thin content and will be treated as such.

### Internal linking

- Every service page links to `/contact/` and to two sibling services.
- The homepage services grid links to all published service pages.
- `/services/` is the hub; every service page links back to it via breadcrumbs.
- The footer links to all primary pages — this guarantees crawl depth ≤ 2 from any entry point.
- Use descriptive anchor text ("brake repair in Fort Wayne"), never "click here" or "read more."

---

## 7. Content deck

Draft copy for the highest-leverage surfaces. **[PROPOSED]** — the owner should edit for voice and correct anything factually wrong before build. Having real copy at wireframe stage prevents the classic failure where lorem ipsum shapes the design and the actual words never fit.

### Homepage

**Hero h1:** Straightforward auto repair in Fort Wayne.

**Hero sub:** Dependable maintenance and repair for cars and light trucks. Clear communication, fair pricing, and work you can trust.

**Hero meta:** Cars & light trucks · Mon–Fri, 10–6 · 3909 Fourier Dr, Suite E

**Trust strip:**
- *Honest service* — We explain what's wrong and what it'll take to fix it.
- *Clear estimates* — You approve the work before we start. **[CONFIRM]**
- *Local team* — An independent Fort Wayne shop, not a chain.
- *All makes & models* — Cars and light trucks, whatever you drive. **[CONFIRM]** limits

**Process section h2:** What to expect

1. **Tell us what's happening.** Call or send a request. Describe what you're noticing — a sound, a light, a feeling. You don't need the right terminology.
2. **We inspect and explain.** We find the cause and tell you what we found in plain language, including what can wait and what can't.
3. **You approve the work.** We give you the cost before we start. Nothing gets done that you haven't approved. **[CONFIRM]**
4. **We get you back on the road.** We finish the work and tell you what to watch for.

**Final panel h2:** Need to schedule service?

**Final panel body:** Send a request and we'll get back to you during business hours, or call us at (260) 710-8995. **[CONFIRM]** response commitment

### Service page — brake repair (model for the rest)

**Title tag:** Brake Repair in Fort Wayne, IN | Woodward Automotive

**Meta description:** Grinding, squealing, or a soft brake pedal? Woodward Automotive diagnoses and repairs brakes for cars and light trucks in Fort Wayne. Call (260) 710-8995.

**h1:** Brake repair in Fort Wayne

**Intro:** Brakes give you warning before they fail. If something has changed about how your car stops, get it looked at — brake problems get more expensive the longer they wait.

**Symptom list h2:** Come see us if you notice

- Squealing or screeching when you brake
- A grinding sound — this usually means metal on metal, and it should be looked at right away
- The pedal feels soft, spongy, or goes closer to the floor than it used to
- The car pulls to one side when you brake
- A shudder or vibration through the pedal or the wheel
- The brake warning light is on
- You have to press harder than you used to for the same stop

**Process h2:** What we do

We inspect the pads, rotors, calipers, hoses, and fluid to find what's actually causing the problem — not just what's easiest to replace. Then we tell you what we found and what it costs before we do the work. **[CONFIRM]**

**Cost h2:** What it costs

Brake work varies a lot depending on what's worn. We'll inspect first, then give you a price. **[CONFIRM: diagnostic/inspection fee policy — is inspection free? applied to the repair? flat fee?]**

**CTA:** Get your brakes checked → `Request Service` / `Call (260) 710-8995`

### FAQ (draft questions — all answers require owner input)

Every answer here is **[CONFIRM]**. These are the questions real customers ask; the owner supplies the real answers.

1. Do I need an appointment, or can I drop in?
2. How do estimates work? Will I know the cost before you start?
3. Is there a fee for diagnosis? Does it apply toward the repair?
4. What payment methods do you accept?
5. Do you warranty your work? For how long?
6. What makes and models do you work on? Anything you don't work on?
7. How long will my car be there?
8. Can I drop my car off before you open, or pick it up after you close?
9. Do you offer towing, or can you recommend someone?
10. Do you work on diesel / hybrid / EV?
11. Can I supply my own parts?
12. Do you do state inspections or emissions testing?

**FAQ implementation:** native `<details>`/`<summary>` — no JavaScript, accessible by default, and works with in-page search. Emit `FAQPage` schema **only** for questions whose answers are genuinely on the page.

### Microcopy

Small strings, easy to get wrong, disproportionately visible.

| Context | Copy |
|---|---|
| Form submit button | `Send request` |
| Form submitting | `Sending…` |
| Form success | `Got it. We'll get back to you during business hours.` **[CONFIRM]** |
| Form error (server) | `That didn't go through. Please call us at (260) 710-8995 and we'll take care of it.` |
| Required field error | `Please enter your name` / `Please enter a phone number we can reach you at` |
| Invalid phone | `That doesn't look like a phone number — please check it` |
| Consent checkbox | `It's okay to contact me about this request.` |
| Closed-hours notice | `We're closed right now — send a request and we'll follow up when we open Monday at 10 AM.` |
| Call button (aria-label) | `Call Woodward Automotive at (260) 710-8995` |
| Directions button (aria-label) | `Get directions to 3909 Fourier Drive, Suite E` |
| Skip link | `Skip to main content` |
| 404 heading | `We couldn't find that page` |
| 404 body | `Try our services, or call us at (260) 710-8995.` |

**Error message rule:** every failure state offers the phone number as an escape hatch. A broken form must never be a dead end for someone who needs their car fixed.

---

## 8. Functionality plan

### Must-have

- **Responsive, touch-first design:** Phone callers are likely the highest-intent audience.
- **Click-to-call and directions:** In header, footer, hero, and mobile sticky controls.
- **Service-request form:** Name, phone, email optional, vehicle year/make/model optional, requested service, symptoms, preferred contact method, preferred day/time, consent checkbox.
- **Spam protection:** Cloudflare Turnstile, server-side validation through the form provider, honeypot field, and rate limits.
- **Appointment workflow:** Start with an appointment *request*, not false real-time availability. Route submissions to email and/or the shop's scheduling platform. Add live booking only when calendar capacity and confirmation workflow are reliable.
- **Map and direction link:** A low-JavaScript embed or static thumbnail for fast mobile loading.
- **Reviews workflow:** A simple CMS data file or review provider integration that makes it easy to update verified review excerpts.
- **Analytics:** Privacy-conscious Plausible or Cloudflare Web Analytics; track call clicks, direction clicks, service-form starts, successful submissions, and top service-page engagement.
- **Accessibility:** Keyboard navigation, visible focus states, semantic headings, form labels/errors, sufficient contrast, descriptive image alt text, and reduced-motion support.
- **Performance:** Compressed WebP/AVIF photos, responsive image sizes, no giant video dependency, system fallback fonts, minimal client JavaScript.

### Service-request form — detailed specification

The form is the second-most-valuable conversion and the most likely place to lose people. Every field is a chance to abandon.

**Field list:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | text | Yes | `autocomplete="name"` |
| Phone | tel | Yes | `inputmode="tel"`, `autocomplete="tel"`; accept any reasonable format, normalize server-side |
| Email | email | No | `autocomplete="email"`; required only if "email" is the chosen contact method |
| Vehicle year | text | No | `inputmode="numeric"` — plain text input, not a dropdown |
| Vehicle make | text | No | Free text with `datalist` suggestions; never a forced dropdown |
| Vehicle model | text | No | Free text |
| Service needed | select | Yes | Published services + "Not sure / something else" |
| What's happening | textarea | No | Placeholder: "A noise, a light, how it feels — whatever you've noticed." |
| Preferred contact | radio | Yes | Call / Text / Email — defaults to Call **[CONFIRM]** does the shop text? |
| Preferred day/time | text | No | Free text, not a date picker. "Weekday mornings" is more useful than a forced calendar date. |
| Consent | checkbox | Yes | See microcopy above |
| Honeypot | hidden | — | Visually hidden, `tabindex="-1"`, `autocomplete="off"` |

**Form UX rules:**

- **Single column.** Multi-column forms measurably increase errors on mobile.
- **Labels above fields, always visible.** Never placeholder-as-label — it disappears on focus and fails accessibility.
- **Validate on blur, not on keystroke.** Validating while someone types tells them they're wrong before they've finished being right.
- **Errors are inline, adjacent to the field**, tied via `aria-describedby`, and announced in an `aria-live="polite"` region.
- **Never clear the form on a server error.** Losing a filled form is the fastest way to lose the customer entirely.
- **The submit button is never disabled.** A disabled button gives no feedback about *why*. Let submission fail and explain.
- **Progressive enhancement:** the form must submit and work with JavaScript disabled, degrading to a standard POST. Turnstile is the one exception; provide a clear phone fallback if it fails to load.
- **Success goes to `/thank-you/`** — a real page load, which gives a clean, unambiguous analytics conversion.

**Spam defense, layered:**

1. Honeypot field (catches naive bots, zero user cost).
2. Cloudflare Turnstile (catches most of the rest, minimal user friction).
3. Time-to-submit check — reject submissions faster than ~3 seconds.
4. Server-side validation and rate limiting at the form provider.
5. Cloudflare rate-limiting rule on the form endpoint path.

### Appointment workflow

Staged deliberately. Do not skip to stage 3.

| Stage | What ships | Prerequisite to advance |
|---|---|---|
| **1. Request-only** (launch) | Form → email; shop replies manually | — |
| **2. Assisted scheduling** | Form → email + a scheduling link if the shop already uses one **[CONFIRM]** | Shop confirms an existing scheduler and who monitors it |
| **3. Live booking** | Real-time calendar availability | Proven capacity data, a confirmation workflow, and someone who owns no-shows |

Do not promise real-time availability the shop cannot honor. A missed "confirmed" appointment does more reputational damage than no online booking at all.

### Form delivery reliability

The form is only worth building if submissions actually arrive. This is the most common silent failure in small-business sites — the form works for months, then quietly stops, and nobody notices until a customer complains.

- Send to a **monitored address**, not a personal inbox that gets buried. **[CONFIRM]** which address.
- Configure SPF/DKIM alignment at the form provider so notifications do not land in spam.
- **Auto-reply to the customer** confirming receipt, with the phone number included.
- **CC a second address** as a backup, so one person's vacation doesn't drop leads.
- **Monthly delivery test** as a standing operational item — submit a real test entry and confirm it arrives. Put it in the [maintenance plan](#maintenance-plan).
- Log submissions at the provider so a lost email can be recovered.

### Map strategy

An embedded Google Map iframe costs roughly 500KB–1MB, adds third-party cookies, and can single-handedly break both the performance budget and a strict CSP.

**Default:** a static map image (or a simple styled SVG of the block) with a visible "Get directions" button that opens the platform's native maps app.

- Link format: use a `?q=` geocoded query with the full address so it resolves correctly on both iOS and Android.
- Include the plain-text address adjacent to the map, selectable and copyable.
- If an interactive embed is genuinely wanted, **facade-load it**: show the static image and swap in the iframe only on click. This preserves the performance budget and keeps third-party requests off the default page load.

### Reviews workflow

- Store reviews in a version-controlled data file (`src/data/reviews.json`) — each entry: quote, attribution, source platform, date, profile URL, and the service it relates to.
- **Never auto-scrape** review platforms. It violates terms of service and risks publishing text the shop has no rights to.
- Display: quote, first name + last initial, source badge, date, link to the source profile.
- **Do not display an aggregate star rating** unless it is genuinely sourced and meets Google's review-snippet requirements. Self-serving aggregate markup is a manual-action risk.
- Adding a review is a one-file edit and a commit — deliberately simple, so it actually gets done.
- Establish a review-request habit at handoff: a card or text with a direct link to the Google review form. This is the highest-return marketing activity available to the shop, and it costs nothing.

### Important non-goals

- Do not build a custom customer portal, payment system, or real-time repair-status application into a static site.
- Do not claim certifications, warranties, vehicle brands, ASE status, inspection authority, financing, towing, tire brands, or specific repair services without owner confirmation.
- Do not use fake "today-only" coupons, review counters, rotating hero slides, intrusive popups, or generic stock testimonials.
- Do not add a live chat widget. It implies staffing that a 50-hour-week shop cannot provide, and an unanswered chat is worse than no chat.
- Do not gate anything behind an email capture. There is no newsletter and no lead magnet — the conversion is the phone call.

---

## 9. Accessibility requirements

**Target: WCAG 2.2 Level AA.** This is both an ethical baseline and a real legal-exposure question for a public-accommodation business. It is also cheap when built in from the start and expensive to retrofit.

### Non-negotiables

- **Semantic HTML first.** `<button>` for actions, `<a>` for navigation, `<nav>`/`<main>`/`<footer>` landmarks, exactly one `<h1>` per page, no heading levels skipped.
- **Keyboard operable end to end.** Every interactive element reachable and usable by keyboard. Logical tab order. No traps.
- **Visible focus indicators** using `--focus` at a minimum 2px outline with 2px offset. Never `outline: none` without an equivalent replacement.
- **Skip link** to `#main-content` as the first focusable element.
- **Touch targets ≥ 48×48px** with at least 8px between adjacent targets.
- **Contrast:** 4.5:1 body text, 3:1 large text and UI components. Verified per the [color table](#color-tokens).
- **Forms:** every input has a programmatically associated `<label>`. Errors are announced. `aria-invalid` on failed fields. Never color-only error indication — pair color with an icon and text.
- **Images:** meaningful images get descriptive alt text; decorative images get `alt=""`. Alt text describes the *content*, not the filename.
- **Motion:** honor `prefers-reduced-motion`.
- **Zoom:** usable at 200% zoom and at a 320px viewport width without horizontal scrolling.
- **Language:** `<html lang="en">`.
- **Link text is meaningful out of context** — "brake repair services," not "click here."

### Testing protocol

Automated tools catch roughly a third of real issues. Manual passes are required.

| Method | Tool | When |
|---|---|---|
| Automated scan | axe DevTools / Lighthouse | Every build (CI) |
| Keyboard-only pass | Manual, no mouse | Per page, pre-launch |
| Screen reader | VoiceOver (Safari/iOS) + NVDA (Windows) | Home, contact, one service page |
| Zoom | 200% and 320px viewport | Pre-launch |
| Color-blind simulation | Browser DevTools | Design sign-off |
| Contrast verification | Per-pair, not per-palette | Design sign-off and after any color change |

### Accessibility statement

Publish at `/accessibility/`: the conformance target, known limitations if any, and a contact route (phone and email) for anyone who hits a barrier. A statement with a real contact route is meaningfully better than none.

---

## 10. Performance budget

Every target is measured on **throttled 4G, mid-tier Android**, not on a developer's laptop. The audience is on a phone, often on cellular, sometimes in a parking lot with two bars.

| Metric | Budget | Hard fail |
|---|---|---|
| LCP | ≤ 2.0s | > 2.5s |
| CLS | ≤ 0.05 | > 0.1 |
| INP | ≤ 150ms | > 200ms |
| Total page weight (home) | ≤ 800KB | > 1.2MB |
| Total page weight (service) | ≤ 500KB | > 800KB |
| JavaScript shipped | ≤ 30KB gzipped | > 60KB |
| Web fonts | ≤ 2 files, ≤ 80KB total | > 120KB |
| Third-party requests | ≤ 2 (analytics, Turnstile) | > 4 |
| Time to Interactive | ≤ 3.0s | > 4.0s |

### How the budget is met

- **Astro ships zero JS by default.** Use client directives only where genuinely needed — the open/closed status, form validation, and the mobile sticky bar. Everything else is static HTML.
- **Images:** AVIF with WebP fallback, responsive `srcset`, explicit `width`/`height` on every image to reserve space and prevent CLS. Hero image preloaded; everything below the fold `loading="lazy"`.
- **The hero image is the LCP element.** Size and compress it deliberately — it alone determines whether the LCP budget is met.
- **Fonts:** self-hosted, `woff2`, subset to Latin, `font-display: swap`, preloaded, with a metric-matched fallback so the swap doesn't shift layout.
- **No map iframe on initial load** (see [Map strategy](#map-strategy)).
- **No hero video** unless the budget can absorb it — it almost certainly cannot on mobile. If the owner insists, serve a poster image on mobile and load video only on desktop over a fast connection.
- **CSS:** inline critical CSS, defer the rest. The total stylesheet should be small enough that this is barely necessary.
- **CI enforcement:** Lighthouse CI in the build pipeline, failing the build when a budget is exceeded. A budget nobody enforces is a wish.

---

## 11. GitHub Pages + Cloudflare architecture

This is an excellent fit for a static-first stack: low maintenance, fast global delivery, version-controlled content, and straightforward recovery if something goes wrong.

| Layer | Recommendation | Why |
|---|---|---|
| Site framework | Astro + TypeScript | Static-by-default, fast, excellent image handling, simple content collections |
| Styling | Tailwind CSS or well-structured CSS layers | Consistent responsive design without a heavy runtime |
| Content | Markdown/MDX or Astro Content Collections | Services, FAQ, reviews, and local pages can be updated safely in Git |
| Hosting | GitHub Pages | Free static deployment from the production branch |
| DNS / edge | Cloudflare | DNS, HTTPS, redirects, caching, WAF/rate controls, Turnstile and analytics |
| Forms | Formspree, Basin, Netlify Forms alternative, or a small Cloudflare Worker | GitHub Pages cannot securely process/send form submissions by itself |
| Booking | Shop's existing scheduler, or request-only form initially | Avoids promising real-time availability without a real booking workflow |
| Analytics | Cloudflare Web Analytics or Plausible | Lightweight conversion insight |
| Monitoring | UptimeRobot / Better Stack plus Search Console | Detect outages and track local-search performance |

### Known constraints of this stack

Stated plainly so they are not discovered late.

- **GitHub Pages serves static files only.** No server-side logic, no custom response headers, no server-side redirects. Every dynamic need routes through a third party or a Cloudflare Worker.
- **`_headers` and `_redirects` files are not supported** by GitHub Pages — that is Netlify/Cloudflare Pages behavior. On this stack, **security headers and redirects must be implemented as Cloudflare Transform Rules and Redirect Rules.** Do not plan around a `_headers` file that will silently do nothing.
- **One custom domain per Pages site**, set via the `CNAME` file. Astro's build must be configured to emit it, or the domain resets on every deploy.
- **Cloudflare proxying (orange cloud) in front of GitHub Pages** requires care with SSL/TLS mode — see below. A mismatch produces redirect loops that are confusing to debug.
- **Repository must be public** for Pages on a free plan, or the account needs a paid plan. **[CONFIRM]** which applies. A public repo means all content history is public — no secrets, ever, in the repo.

> **Alternative worth a five-minute conversation:** Cloudflare Pages instead of GitHub Pages. Same price (free), same Git-push workflow, but it natively supports `_headers`/`_redirects`, gives Workers integration for the form endpoint without a third party, and removes the proxy-mode friction entirely. The tradeoff is a second vendor relationship where the current plan uses Cloudflare anyway. **[PROPOSED]** — GitHub Pages as specified is fine; this is only a simplification worth naming before the build starts, not after.

### Deployment flow

```text
GitHub repository
   └─ Push to main
      └─ GitHub Actions builds Astro
         └─ Deploys static /dist to GitHub Pages
            └─ Cloudflare DNS points www domain to GitHub Pages
               └─ Cloudflare redirects apex to www, enforces HTTPS
```

### Repository conventions

- **`main`** is the production branch. Every push that passes CI deploys.
- **Pull requests** for content changes, with a preview build where practical. Direct pushes to `main` only for trivial fixes.
- **Conventional commits** (`feat:`, `fix:`, `content:`, `chore:`) so history is scannable.
- **Branch protection** on `main`: require CI to pass.
- CI runs: build, Lighthouse CI against the budget, link checker, HTML validation, axe accessibility scan.
- **Rollback plan:** revert the commit and push. Static hosting makes this a genuinely 60-second recovery — one of the main reasons this stack was chosen.

### DNS and canonical setup

Use **`www.woodwardautomotivellc.com`** as the canonical website hostname, with the root domain redirecting to it. GitHub Pages supports custom domains, while Cloudflare should manage DNS, TLS, caching, redirects, and basic security at the edge.

Recommended records and rules:

- `www` → CNAME to the GitHub Pages hostname supplied by GitHub.
- Apex domain → GitHub Pages-supported A/AAAA records or a Cloudflare redirect to `www`, based on the selected configuration.
- Enforce `http` → `https`.
- Enforce apex → `www`.
- One canonical URL per page.
- Cloudflare SSL/TLS: **Full (strict)**. GitHub Pages presents a valid certificate for the custom domain, so Full (strict) is correct once the domain is verified there. **Never use Flexible** — it produces infinite redirect loops against a Pages origin that already enforces HTTPS.
- Turn on Cloudflare Web Analytics and Turnstile.
- Cache static assets aggressively with fingerprinted filenames; preserve HTML revalidation behavior.
- Add security headers via Cloudflare Transform Rules: CSP, `X-Content-Type-Options`, `Referrer-Policy`, Permissions Policy, and frame-ancestors control.

### Certificate provisioning order

Order matters, and getting it wrong produces a broken site during launch.

1. Add the custom domain in GitHub Pages settings **with Cloudflare proxying disabled (grey cloud)**.
2. Wait for GitHub to provision its Let's Encrypt certificate and for "Enforce HTTPS" to become available.
3. Enable "Enforce HTTPS" in GitHub Pages.
4. **Then** enable Cloudflare proxying (orange cloud) and set SSL/TLS to Full (strict).

Skipping to step 4 first is the standard way this launch goes wrong — GitHub cannot validate the domain through the proxy, so the certificate never issues.

### Cache rules

| Asset type | Header | Rationale |
|---|---|---|
| Fingerprinted JS/CSS/fonts | `Cache-Control: public, max-age=31536000, immutable` | Content-hashed; safe to cache forever |
| Images | `public, max-age=2592000` | 30 days; rarely change |
| HTML | `public, max-age=0, must-revalidate` | Content updates must appear immediately |
| `sitemap.xml`, `robots.txt` | `public, max-age=3600` | 1 hour |

**Purge the Cloudflare cache on every deploy**, either via an API call in the GitHub Action or by keeping HTML uncached at the edge. Stale HTML after a content fix is a confusing and avoidable class of bug.

### Security headers

Implemented as Cloudflare Transform Rules (Response Header Modification), since GitHub Pages cannot set them.

```text
Content-Security-Policy: default-src 'self';
  img-src 'self' data: https://*.tile.openstreetmap.org;
  script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com;
  frame-src https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  connect-src 'self' https://cloudflareinsights.com <form-endpoint>;
  form-action 'self' <form-endpoint>;
  frame-ancestors 'none';
  base-uri 'self';
  object-src 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), interest-cohort=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
```

Adjust `script-src`, `connect-src`, and `form-action` to the actual analytics and form providers once chosen. Test the CSP in `Content-Security-Policy-Report-Only` mode for a week before enforcing — a CSP that silently blocks the form endpoint breaks the site's primary conversion with no visible error.

`style-src 'unsafe-inline'` is present because inlined critical CSS requires it. If that is dropped in favor of an external stylesheet, tighten this directive.

---

## 12. Local SEO and launch plan

### Technical SEO

- Every page needs a unique title and meta description. Example homepage title:
  `Woodward Automotive | Auto Repair in Fort Wayne, IN`
- Add `AutoRepair` / `LocalBusiness` JSON-LD with verified name, phone, address, hours, geo/map URL, service types, logo, and sameAs links. Do **not** add ratings/review schema unless it meets Google's requirements and is genuinely sourced.
- Create XML sitemap, `robots.txt`, canonical tags, Open Graph images, favicon suite, and a custom 404 page.
- Add the business's exact NAP identically across the website, Google Business Profile, Facebook, Yelp, Apple Business Connect, Bing Places, and relevant repair directories.
- Connect Google Search Console and Bing Webmaster Tools after launch.
- Use descriptive local page copy: "brake repair in Fort Wayne," "engine diagnostics in Fort Wayne," and similar phrases only where they read naturally.

### Title and meta pattern

| Page | Title (≤ 60 char target) | Meta description (≤ 155 char) |
|---|---|---|
| Home | `Woodward Automotive \| Auto Repair in Fort Wayne, IN` | Honest auto repair for cars and light trucks in Fort Wayne. Diagnostics, brakes, oil changes, suspension. Call (260) 710-8995. |
| Services | `Auto Repair Services \| Woodward Automotive Fort Wayne` | Diagnostics, brake repair, oil changes and maintenance, suspension and steering for cars and light trucks in Fort Wayne, IN. |
| Brake repair | `Brake Repair in Fort Wayne, IN \| Woodward Automotive` | Grinding, squealing, or a soft brake pedal? We diagnose and repair brakes for cars and light trucks in Fort Wayne. Call (260) 710-8995. |
| Diagnostics | `Engine Diagnostics in Fort Wayne, IN \| Woodward Automotive` | Check engine light on? We find the actual cause and explain it in plain language. Fort Wayne auto diagnostics. Call (260) 710-8995. |
| About | `About Woodward Automotive \| Fort Wayne Auto Shop` | An independent Fort Wayne auto repair shop serving cars and light trucks since 2022. Meet the team. |
| Contact | `Contact \| Woodward Automotive, Fort Wayne IN` | 3909 Fourier Dr, Suite E, Fort Wayne. Mon–Fri 10–6. Call (260) 710-8995 or request service online. |

**Rules:** brand name last on inner pages, first on the homepage. Every description contains the phone number. No description is auto-generated or duplicated.

### Structured data

One `LocalBusiness`/`AutoRepair` block sitewide (in the layout), plus page-specific types where they apply.

```json
{
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": "https://www.woodwardautomotivellc.com/#business",
  "name": "Woodward Automotive",
  "url": "https://www.woodwardautomotivellc.com/",
  "telephone": "+1-260-710-8995",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3909 Fourier Dr, Suite E",
    "addressLocality": "Fort Wayne",
    "addressRegion": "IN",
    "postalCode": "46818",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[CONFIRM]",
    "longitude": "[CONFIRM]"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "10:00",
    "closes": "18:00"
  }],
  "priceRange": "$$",
  "image": "https://www.woodwardautomotivellc.com/img/shop-exterior.jpg",
  "logo": "https://www.woodwardautomotivellc.com/img/logo.png",
  "areaServed": [
    {"@type": "City", "name": "Fort Wayne"}
  ],
  "sameAs": ["[CONFIRM: Google Business Profile, Facebook, Yelp URLs]"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Auto Repair Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Engine Diagnostics"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Brake Repair"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Oil Changes and Maintenance"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Suspension and Steering"}}
    ]
  }
}
```

**Additional schema by page type:**

| Page | Types |
|---|---|
| Service pages | `Service` with `provider` referencing `#business`, plus `BreadcrumbList` |
| FAQ | `FAQPage` — only for Q&A genuinely visible on the page |
| About | `AboutPage` |
| Contact | `ContactPage` |

**Prohibited:** `AggregateRating` or `Review` markup unless the reviews are genuinely on the page, permissioned, and compliant with Google's self-serving-review policy. Getting this wrong risks a manual action against the whole domain — a far worse outcome than not having stars.

**Validation:** every template through the Rich Results Test and Schema.org validator before launch, and after any content-model change.

### Google Business Profile — highest-leverage asset

For a local service business, the GBP outperforms the website for discovery. It deserves more attention than any single page.

**[CONFIRM]** claim status first. Then:

- Exact NAP matching the [canonical block](#canonical-nap-block), suite number included.
- Correct primary category: **Auto Repair Shop**. Secondary categories only for confirmed services.
- Hours, including holiday hours. Keep them current — Google surfaces "Hours might differ" warnings that erode trust.
- 15+ real photos: exterior (so people can find it), reception, bays, team, equipment. Refresh quarterly.
- Services list mirroring the site's confirmed services exactly.
- Q&A section seeded with the real FAQ answers — the owner can post and answer their own questions, and this is an underused surface.
- A standing habit of requesting reviews at handoff, with a short link to the review form.
- Respond to every review, positive and negative, in the site's voice: plainspoken, no defensiveness.

### Local citation audit

Build a tracking sheet. Every listing gets checked against the canonical NAP, corrected, and re-verified.

| Priority | Listing |
|---|---|
| Critical | Google Business Profile, Apple Business Connect, Bing Places, Facebook |
| High | Yelp, MapQuest, Yellow Pages, Better Business Bureau |
| Medium | Angi, Nextdoor, Chamber of Commerce, RepairPal, Carfax Service Network |
| Watch | Any listing conflating Woodward Automotive with Woodward Tire — file corrections |

Inconsistent citations are the most common cause of weak local ranking, and the cheapest to fix.

### Keyword map

One primary intent per page. No two pages target the same primary term.

| Page | Primary intent | Secondary |
|---|---|---|
| Home | auto repair fort wayne | mechanic fort wayne, car repair fort wayne in |
| Brake repair | brake repair fort wayne | brake service, brake pads fort wayne |
| Diagnostics | engine diagnostics fort wayne | check engine light fort wayne |
| Oil / maintenance | oil change fort wayne | car maintenance fort wayne |
| Suspension | suspension repair fort wayne | steering repair, shocks and struts fort wayne |
| About | woodward automotive fort wayne | (brand defense against Woodward Tire) |

Write for the human first. Terms should appear where they read naturally — in the `h1`, once or twice in body copy, and in the title. Nowhere else deliberately.

### Content and proof collection

Before design production, obtain:

- Official logo files or permission to create a new identity.
- Owner-approved list of every offered service.
- Staff names/roles and any verifiable qualifications.
- Accepted payment methods, warranty terms, appointment/drop-off policy, and towing arrangement.
- Correct Google Business Profile, Facebook, Yelp, and scheduling URLs.
- Fifteen to twenty real photographs, ideally professionally shot.
- Six to ten approved review excerpts with their source and links.
- Any actual neighborhood/service-area language the owner wants used.

### Photography shot list

Give the photographer this list. Two hours on site covers it.

| Shot | Use | Priority |
|---|---|---|
| Exterior with signage, showing the entrance and Suite E | Hero, GBP, map section — this is the "will I find it" shot | Critical |
| Wide shop interior, bays in use | Hero alternate, about | Critical |
| Owner portrait, environmental, natural expression | About, homepage | Critical |
| Team group shot | About | High |
| Technician working on a vehicle, hands and detail | Services, process | High |
| Diagnostic equipment in use | Diagnostics page | High |
| Brake service in progress | Brake page | High |
| Oil service in progress | Oil page | High |
| Suspension/steering work | Suspension page | High |
| Reception / waiting area | About, contact | Medium |
| Customer handoff at the counter | Process section | Medium |
| Parking and entrance approach | Contact, wayfinding | Medium |
| Detail textures — tools, workbench | Section backgrounds | Low |

**Direction:** natural light where possible, no heavy filters, no stock-photo posing. Clean but not sterile — a working shop should look like a working shop. Shoot horizontal and vertical crops of the hero candidates. Deliver full-resolution originals; the build handles compression.

**Permissions:** written model release from every identifiable person. Confirm no customer vehicle license plates are legible, or blur them.

---

## 13. Analytics and measurement

### Events to track

| Event | Trigger | Why |
|---|---|---|
| `call_click` | Any `tel:` link click | Primary conversion |
| `directions_click` | Any maps link click | Secondary conversion, strong intent |
| `form_start` | First interaction with a form field | Denominator for completion rate |
| `form_submit` | Successful submit (`/thank-you/` load) | Primary conversion |
| `form_error` | Server or validation failure at submit | Detects a broken funnel |
| `service_page_view` | Service page load | Which services drive demand |
| `faq_open` | `<details>` expanded | Reveals what customers actually worry about |

Segment `call_click` by open vs. closed hours. Calls placed while closed represent demand the current hours cannot serve, which is genuinely useful business information.

### Privacy posture

- Use Plausible or Cloudflare Web Analytics — cookieless, no personal data, no consent banner required under most readings.
- **No Google Analytics, no Meta Pixel** unless the owner specifically wants remarketing. They add consent obligations, cookie banners, and CSP complexity for a business that does not run paid campaigns.
- The privacy policy must accurately describe what is actually collected: form submissions, and aggregate analytics. Nothing more.

### Reporting

A monthly one-page summary for the owner: calls, form requests, top pages, top search queries from Search Console, and any technical warnings. Plain language, no dashboard the owner must learn.

---

## 14. Legal and compliance

**[CONFIRM]** all of this with the owner; none of it is legal advice.

- **Privacy policy** (`/privacy/`) — required because the site collects form submissions. Must state what is collected, why, where it goes, how long it is kept, the form provider as a processor, analytics usage, and a contact route for deletion requests.
- **Accessibility statement** (`/accessibility/`) — see [Accessibility](#accessibility-requirements).
- **Contact consent** — the form's consent checkbox covers follow-up about the request. If the shop ever wants to text customers, telephone-consumer-protection rules apply and the consent language must be specific to SMS. **[CONFIRM]** whether the shop texts.
- **Review permissions** — get written permission before republishing review text on the site, even from a public platform.
- **Photo releases** — from every identifiable person, staff and customers alike.
- **Terms of service** — not required for a brochure site with no transactions. Skip it; an unnecessary legal page is a liability, not an asset.
- **Business entity name** — the footer copyright and privacy policy use the exact legal entity name. **[CONFIRM]**

---

## 15. Phased delivery

1. **Discovery and verification:** Resolve service scope, listings, brand assets, and conversion workflow.
2. **Content and wireframes:** Produce home, service-page, and contact-page copy before visual polish.
3. **Design system and prototype:** Mobile-first clickable prototype, then desktop refinement.
4. **Build:** Astro site, form endpoint, schema, analytics, accessibility and performance work.
5. **QA:** Test iPhone/Android/desktop, forms, call links, maps, keyboard navigation, Lighthouse, redirects, structured data, and noindex staging.
6. **Launch and optimize:** Submit sitemap, verify analytics, monitor form delivery, solicit legitimate reviews, and improve pages based on call/form conversion data.

### Phase detail and exit criteria

Each phase has a gate. Do not proceed past a gate with unresolved blockers — that is how a **[CONFIRM]** becomes a published guess.

| Phase | Key work | Exit criteria |
|---|---|---|
| **1. Discovery** | Owner interview, [open questions](#open-questions-for-the-owner) answered, listings audit, asset collection | Every **[CONFIRM]** in this document is resolved or explicitly deferred with its feature cut |
| **2. Content** | Full copy deck, photography shoot, review permissions, FAQ answers | Every page's copy approved by the owner in writing; photos delivered |
| **3. Design** | Design tokens, component library, mobile-first prototype for home + service + contact | Owner approves the prototype; contrast and touch targets verified |
| **4. Build** | Astro implementation, form endpoint, schema, analytics, CI budgets | All CI checks pass; staging site is `noindex` and behind Cloudflare Access or a password |
| **5. QA** | Full [launch checklist](#launch-checklist) | Zero critical or high-severity items open |
| **6. Launch** | DNS cutover, certificate order, listings sync, Search Console | Site live, form delivery verified end to end, analytics recording |

### Staging safety

The single most damaging launch mistake is a staging site that gets indexed, or a live site that ships with `noindex` still on.

- Staging is `noindex, nofollow` via meta tag **and** `robots.txt` **and** HTTP header, plus password or Cloudflare Access protection.
- The `noindex` removal is an explicit, checked-off launch step — not something anyone remembers.
- **Immediately after cutover:** verify the live homepage source contains no `noindex`, and that `robots.txt` permits crawling. This is the first check after DNS propagates, before anything else.

---

## 16. Launch checklist

Every item is verified, not assumed. Severity: **C**ritical blocks launch, **H**igh fixed within 24h, **M**edium within a week.

### Content and accuracy

- [ ] **C** — NAP identical on every page, matching the [canonical block](#canonical-nap-block) exactly
- [ ] **C** — Phone number correct in every `tel:` link, tested by actually calling it
- [ ] **C** — No **[CONFIRM]** content published without owner sign-off
- [ ] **C** — No claims of certifications, warranties, or services that are not confirmed
- [ ] **H** — Hours correct sitewide, including in schema
- [ ] **H** — Every review is real, permissioned, dated, and attributed
- [ ] **H** — No "Woodward Tire" text anywhere; no brand confusion in titles or schema
- [ ] **M** — Spelling and grammar pass on every page

### Technical

- [ ] **C** — `noindex` removed from production; staging still `noindex`
- [ ] **C** — `robots.txt` permits crawling and references the sitemap
- [ ] **C** — Form submits successfully and the email arrives at the monitored address
- [ ] **C** — Auto-reply reaches the customer
- [ ] **C** — HTTPS enforced; no mixed content
- [ ] **C** — Apex → `www` redirect works; no redirect chains or loops
- [ ] **H** — `sitemap.xml` present, accurate, submitted to Search Console
- [ ] **H** — Canonical tag on every page, self-referencing and absolute
- [ ] **H** — Structured data validates with zero errors
- [ ] **H** — Custom 404 works and offers a route back
- [ ] **H** — Security headers present, verified with a header-inspection tool
- [ ] **H** — CSP enforced and not blocking the form, Turnstile, or analytics
- [ ] **M** — Favicon suite complete (ICO, PNG set, Apple touch, manifest)
- [ ] **M** — Open Graph and Twitter card images render correctly in a link preview

### Performance and accessibility

- [ ] **C** — Lighthouse Accessibility 100 on home, contact, one service page
- [ ] **C** — Full keyboard pass on home, contact, form
- [ ] **H** — Lighthouse Performance ≥ 90 mobile on home and one service page
- [ ] **H** — All [performance budgets](#performance-budget) met
- [ ] **H** — Screen reader pass on home and the form
- [ ] **H** — Usable at 200% zoom and 320px width
- [ ] **M** — All images have appropriate alt text
- [ ] **M** — `prefers-reduced-motion` honored

### Device and browser matrix

- [ ] **C** — iPhone Safari, current and one prior major version
- [ ] **C** — Android Chrome, current
- [ ] **H** — Desktop Chrome, Safari, Firefox, Edge, current
- [ ] **H** — `tel:` links open the dialer on a real iOS and a real Android device
- [ ] **H** — Directions links open the native maps app on both platforms
- [ ] **M** — Landscape orientation on phone
- [ ] **M** — Small viewport (iPhone SE class) has no horizontal scroll

### Analytics and monitoring

- [ ] **H** — Analytics recording pageviews
- [ ] **H** — `call_click` and `form_submit` events firing
- [ ] **H** — Search Console and Bing Webmaster verified, sitemap submitted
- [ ] **M** — Uptime monitor configured with an alert destination
- [ ] **M** — Cloudflare Web Analytics enabled

### Listings

- [ ] **C** — Google Business Profile claimed and NAP-matched
- [ ] **H** — Website URL updated on GBP, Facebook, Yelp, MapQuest, Apple, Bing
- [ ] **M** — Full [citation audit](#local-citation-audit) complete

---

## 17. Post-launch and maintenance

### First 30 days

| When | Action |
|---|---|
| Day 1 | Verify indexing has begun; confirm form delivery again; watch analytics for errors |
| Day 3 | Check Search Console for coverage errors and manual actions |
| Week 1 | First real form submission reviewed end to end with the owner |
| Week 2 | Core Web Vitals field data check |
| Week 4 | First monthly report; review top queries; identify content gaps |

### Maintenance plan

**[CONFIRM]** who owns each of these. An unowned maintenance item does not happen.

| Cadence | Task |
|---|---|
| Monthly | Test form delivery end to end |
| Monthly | Review analytics; one-page owner report |
| Monthly | Add any new verified reviews |
| Quarterly | Dependency updates and rebuild |
| Quarterly | Refresh GBP photos |
| Quarterly | Verify NAP consistency across listings |
| Quarterly | Re-run Lighthouse and accessibility scans |
| Annually | Copy review — hours, services, team, pricing policy |
| Annually | Renew domain; verify certificate auto-renewal |
| As needed | Holiday hours updates on site and GBP |

### Growth backlog

Ordered by expected return. Not launch scope — revisit at 90 days with real conversion data.

1. **Review generation habit** — highest return, zero cost, requires only a handoff routine.
2. **Additional service pages** as scope is confirmed (A/C, tires, etc.).
3. **Service-area pages** for genuinely distinct nearby communities — only with unique content, never a template with the town name swapped.
4. **Before/after or repair-story content** — real work, real photos, with customer permission. Strong differentiator; requires a habit of capturing it.
5. **Live booking** — only after the [appointment workflow](#appointment-workflow) prerequisites are met.
6. **Extended hours signaling** — if closed-hours call data shows meaningful missed demand, that is a business conversation the site's data can inform.

---

## Open questions for the owner

Consolidated blockers. Phase 1 does not close until each is answered. Grouped by what they block.

### Blocks the build entirely

1. What is the monitored email address for form submissions? Is there a second address for backup?
2. Is the Google Business Profile claimed? What is its URL?
3. What is the exact legal entity name for the footer and privacy policy?
4. Do we have the logo files, or should a new identity be created?

### Blocks published content

5. **Confirm the complete service list.** Specifically: do you do A/C repair? Tires? Towing — or do you refer out?
6. **How do estimates work?** Is there a diagnostic fee? Is it applied to the repair if the customer proceeds? This is the single most important answer in this document — it is the proof behind "transparent pricing."
7. **Do you warranty your work?** What terms?
8. What payment methods do you accept?
9. Any vehicles you *don't* work on — heavy duty, diesel, hybrid, EV?
10. Appointment or walk-in? Can customers drop off before 10 or pick up after 6?
11. Realistically, when do you respond to an online request? (This becomes a published promise — better honest than fast.)
12. Staff names, roles, and any verifiable qualifications to publish.
13. Which reviews may we republish? Do we have permission to quote them?
14. Is finding Suite E straightforward, or should we add wayfinding directions?

### Blocks configuration

15. Do you text customers? (Determines whether the contact-method option ships, and the consent language required.)
16. Do you use a scheduling platform today? Which one?
17. What are your holiday hours?
18. Confirm the Facebook page URL and that you control it.
19. Is the GitHub repository public, or is there a paid plan? (Public means the content history is world-readable.)
20. Who owns ongoing maintenance — you, or the developer under an agreement?

---

The site can be significantly more polished than the current basic web presence while retaining a small independent-shop feel. The winning formula is not feature overload: clear contact paths, credible proof, real images, individual service pages, strong local data consistency, and a frictionless way to request service.

The discipline that makes this work is refusing to publish what cannot be substantiated. Every **[CONFIRM]** in this document is a place where a competitor would guess and a good shop's site would tell the truth. That difference is the entire brand.
