# Spicy Automations — spicyautomations.com

Marketing site for Spicy Automations. Static HTML/CSS/JS, no framework and no build
step: what is in the repo is what gets served.

**Live:** https://spicyautomations.com
**Hosting:** Netlify (deploys automatically on push to `main`)

---

## Running it locally

There is nothing to install. Because pages fetch shared components over HTTP, you
need a real server — opening `index.html` straight from Finder will render the page
without its navbar and footer.

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

---

## Structure

```
├── index.html                     Home
├── products.html                  Product catalog (loads data/products.json)
├── contact.html                   Contact form
├── ai-voice-cost-calculator/
│   └── index.html                 Meta Ads landing page → /ai-voice-cost-calculator/
├── components/
│   ├── navbar.html                Injected at runtime by assets/js/navbar.js
│   └── footer.html                Injected at runtime by assets/js/navbar.js
├── data/
│   ├── products.json              Product catalog content
│   └── PRODUCT_DESCRIPTION_GUIDE.md
├── assets/
│   ├── css/
│   │   ├── style.css              Global — design tokens, layout, home page
│   │   ├── contact.css            Contact page
│   │   ├── products.css           Products page
│   │   └── landing-calculator.css AI voice cost calculator landing
│   ├── js/
│   │   ├── navbar.js              Loads navbar + footer components
│   │   ├── main.js                Shared behavior (smooth scroll, flames, reveals)
│   │   └── products-page.js       Products page tabs + detail panel
│   ├── fonts/                     Satoshi (self-hosted)
│   └── images/
├── robots.txt · sitemap.xml · llms.txt · humans.txt
```

### Shared components

`components/navbar.html` and `components/footer.html` are plain HTML fragments
pulled in at runtime by `assets/js/navbar.js`, which injects them into
`#navbar-container` and `#footer-container`. Any page wanting the standard chrome
needs those two elements plus a `<script src="assets/js/navbar.js">`.

The calculator landing deliberately skips both — see below.

---

## Design system

Tokens live in `:root` at the top of `assets/css/style.css`.

| Token | Value | Use |
|---|---|---|
| `--color-dark` / `--color-brown` | `#2c160d` | Espresso — page backgrounds |
| `--color-beige` / `--color-primary` | `#F5E6D3` | Cream — text on dark |
| `--font-primary` | Satoshi | Self-hosted in `assets/fonts/` |

Two accents are used directly rather than via tokens: `#b01800` (terracotta — the
eyebrow dots) and `#f28c45` (orange — hover states, active tabs, the landing page
CTA). A secondary beige `#ded0c2` backs the light sections.

**Recurring patterns**

- **Eyebrow label** — `.tag-wrapper` > `.elipse` + `.tag` + `.elipse`. Uppercase,
  13px, 2px letter-spacing, flanked by two terracotta dots.
- **Pill buttons** — `border-radius: 30px`.
- **Breakpoint** — a single `@media (max-width: 768px)` for mobile, except
  `landing-calculator.css`, which is written mobile-first and uses `min-width: 768px`.

For documents and decks (proposals, one-pagers, case studies) there is a
`spicy-automations-brand` skill that carries the same identity into Word/PowerPoint.

---

## Forms

Both forms post to **Formspree** over `fetch()` so the page never navigates away.
The destination email address is configured per-form in the Formspree dashboard,
**not** in this repo.

| Page | Formspree form | On success |
|---|---|---|
| `contact.html` | `xykzrpvv` | Redirects to Calendly |
| `ai-voice-cost-calculator/` | `mnjewryy` | Shows inline confirmation |

> **Watch the quota.** Formspree's free tier caps at 50 submissions/month and
> **silently drops** anything past that. Check the plan before running paid traffic.

---

## AI voice cost calculator landing

Campaign landing page for Meta Ads, aimed at US debt collection / ARM agencies.
Served at `/ai-voice-cost-calculator/` (the folder-with-`index.html` layout gives a
clean URL on Netlify with no redirect rules).

**It is intentionally different from the rest of the site:**

- No navbar, no footer, no nav links. The logo is a plain `<img>`, not a link —
  a conversion page should have no exit routes.
- Mobile-first CSS. Most traffic arrives on a phone from Meta.
- Inputs are `16px` with a `52px` min-height: below 16px, iOS Safari zooms the
  viewport when a field is focused, which wrecks the mobile experience.

**Conditional "Other" fields.** A `<select>` carrying `data-reveals="<group-id>"`
shows the matching `.conditional-group` text field when "Other" is picked, makes it
required while visible, and clears it when the user switches away. A hidden field
must never stay `required` — the browser refuses to submit and reports an error on
a control nobody can see. Wiring up another question is just the attribute plus a
matching `.conditional-group`.

**The offer is a concierge MVP.** No calculator actually runs — the cost breakdown
is worked out by hand and emailed back. The copy therefore promises delivery
*within 24 hours* and must never imply an instant result.

### Campaign attribution

On load, inline JS copies `utm_source`, `utm_medium`, `utm_campaign`,
`utm_content`, `utm_term` and `fbclid` off the query string into hidden fields,
alongside the referrer and full landing URL. Formspree includes every field in the
notification email, so each lead arrives tagged with the ad that produced it.

The email subject is built at submit time as
`AI Voice Cost Calculator — {company} [{utm_campaign}]`, which keeps the inbox
scannable without opening anything.

### Tracking

Meta Pixel `440639400009462` fires `PageView` on load and `Lead` only after
Formspree returns a success — never on click, so the conversion count stays honest.
Leads post to Formspree form `mnjewryy`.

---

## Deploying

Netlify builds from `main`. Push and it ships:

```bash
git push origin main
```

> **GitHub account.** This repo belongs to the `Cle0patr4` account. If a push fails
> with a 403, the active `gh` account has drifted — fix it with
> `gh auth switch --hostname github.com --user Cle0patr4`.

### When adding a page

1. Add it to `sitemap.xml`.
2. If it ships its own stylesheet, add an `Allow:` line for it in `robots.txt` —
   that file blocks `/assets/css/` wholesale and re-allows individual files, so a
   new stylesheet is invisible to crawlers until it is listed.
