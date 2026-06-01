# Routes — By Hayat Skin

All routes are prefixed with `/{lang}` where lang ∈ `en | ar | tr | ru | de | fr | es | it | zh`

## Status Legend
- ✅ Page exists, fully built
- ⚠️ Page exists, placeholder/incomplete content
- ❌ 404 — page missing
- ↪️ Redirect

---

## Core Navigation Routes

| Route | Status | Page File | Notes |
|-------|--------|-----------|-------|
| `/{lang}` | ✅ | `[lang]/page.tsx` | Home — all sections |
| `/{lang}/products` | ✅ | `[lang]/products/page.tsx` | All products listing |
| `/{lang}/consultation` | ✅ | `[lang]/consultation/page.tsx` | Consultation engine |
| `/{lang}/blog` | ⚠️ | `[lang]/blog/page.tsx` | Placeholder content |
| `/{lang}/about` | ✅ | `[lang]/about/page.tsx` | About Us |
| `/{lang}/contact` | ✅ | `[lang]/contact/page.tsx` | Contact page |
| `/{lang}/journal` | ↪️ | `[lang]/journal/page.tsx` | Redirects → `/blog` |

---

## Product Category Routes

| Route | Status | Page File |
|-------|--------|-----------|
| `/{lang}/products/serums` | ✅ | `[lang]/products/serums/page.tsx` |
| `/{lang}/products/moisturizers` | ✅ | `[lang]/products/moisturizers/page.tsx` |
| `/{lang}/products/spf` | ✅ | `[lang]/products/spf/page.tsx` |
| `/{lang}/products/anti-aging` | ✅ | `[lang]/products/anti-aging/page.tsx` |
| `/{lang}/products/kits` | ✅ | `[lang]/products/kits/page.tsx` |

---

## Legal Routes

| Route | Status | Page File |
|-------|--------|-----------|
| `/{lang}/privacy` | ✅ | `[lang]/privacy/page.tsx` |
| `/{lang}/terms` | ✅ | `[lang]/terms/page.tsx` |

---

## Geo SEO Landing Pages

| Route | Status | Page File |
|-------|--------|-----------|
| `/{lang}/skincare-dubai` | ✅ | `[lang]/skincare-dubai/page.tsx` |
| `/{lang}/skincare-abu-dhabi` | ✅ | `[lang]/skincare-abu-dhabi/page.tsx` |
| `/{lang}/skincare-sharjah` | ✅ | `[lang]/skincare-sharjah/page.tsx` |
| `/{lang}/skincare-ajman` | ✅ | `[lang]/skincare-ajman/page.tsx` |
| `/{lang}/skincare-alain` | ✅ | `[lang]/skincare-alain/page.tsx` |
| `/{lang}/skincare-fujairah` | ✅ | `[lang]/skincare-fujairah/page.tsx` |
| `/{lang}/skincare-ras-al-khaimah` | ✅ | `[lang]/skincare-ras-al-khaimah/page.tsx` |
| `/{lang}/skincare-consultation-dubai` | ✅ | `[lang]/skincare-consultation-dubai/page.tsx` |

---

## High-Value SEO Landing Pages

| Route | Status | Page File |
|-------|--------|-----------|
| `/{lang}/luxury-skincare-dubai` | ✅ | `[lang]/luxury-skincare-dubai/page.tsx` |
| `/{lang}/best-skincare-dubai` | ✅ | `[lang]/best-skincare-dubai/page.tsx` |
| `/{lang}/acne-treatment-dubai` | ✅ | `[lang]/acne-treatment-dubai/page.tsx` |
| `/{lang}/anti-aging-skincare-dubai` | ✅ | `[lang]/anti-aging-skincare-dubai/page.tsx` |
| `/{lang}/pigmentation-treatment-dubai` | ✅ | `[lang]/pigmentation-treatment-dubai/page.tsx` |
| `/{lang}/sensitive-skin-dubai` | ✅ | `[lang]/sensitive-skin-dubai/page.tsx` |
| `/{lang}/dry-skin-treatment-dubai` | ✅ | `[lang]/dry-skin-treatment-dubai/page.tsx` |
| `/{lang}/oily-skin-care-dubai` | ✅ | `[lang]/oily-skin-care-dubai/page.tsx` |

---

## System Routes

| Route | Status | Notes |
|-------|--------|-------|
| `/sitemap.xml` | ✅ | Dynamic, `src/app/sitemap.ts` |
| `/robots.txt` | ✅ | Dynamic, `src/app/robots.ts` |
| `/{lang}/not-found` | ✅ | Custom 404 page |

---

## Root Redirect

| Route | Behavior |
|-------|----------|
| `/` | Redirects → `/en` |

---

## Planned / Not Yet Built

| Route | Priority | Notes |
|-------|----------|-------|
| `/{lang}/products/[slug]` | High | Individual product detail pages |
| `/{lang}/blog/[slug]` | High | Individual blog post pages |
| `/{lang}/ingredients` | Medium | Ingredient encyclopedia |
| `/{lang}/glossary` | Medium | Skincare glossary |
| `/{lang}/account` | Low | User account (requires auth) |
| `/{lang}/cart` | Low | Shopping cart (requires e-commerce) |
| `/{lang}/checkout` | Low | Checkout (requires e-commerce) |

---

## Footer Links Audit

| Link | Route | Status |
|------|-------|--------|
| Serums | `/{lang}/products/serums` | ✅ |
| Moisturizers | `/{lang}/products/moisturizers` | ✅ |
| SPF Protection | `/{lang}/products/spf` | ✅ |
| Anti-Aging | `/{lang}/products/anti-aging` | ✅ |
| Luxury Ritual Kits | `/{lang}/products/kits` | ✅ |
| About Us | `/{lang}/about` | ✅ |
| Consultation | `/{lang}/consultation` | ✅ |
| Journal/Blog | `/{lang}/blog` | ⚠️ Placeholder |
| Contact | `/{lang}/contact` | ✅ |
| Privacy Policy | `/{lang}/privacy` | ✅ |
| Terms of Service | `/{lang}/terms` | ✅ |

---

## Navbar Links Audit

| Link | Route | Status |
|------|-------|--------|
| Products | `/{lang}/products` | ✅ |
| Consultation | `/{lang}/consultation` | ✅ |
| Blog | `/{lang}/blog` | ⚠️ Placeholder |
| About | `/{lang}/about` | ✅ |
| Contact | `/{lang}/contact` | ✅ |