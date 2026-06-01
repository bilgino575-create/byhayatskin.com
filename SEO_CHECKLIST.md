# SEO Checklist — By Hayat Skin

## Status Legend
- ✅ Implemented
- ⚠️ Partial / Needs improvement
- ❌ Not implemented

---

## Technical SEO

| Item | Status | Notes |
|------|--------|-------|
| SSR (Server-Side Rendering) | ✅ | Next.js App Router, all pages SSR |
| Dynamic sitemap.xml | ✅ | `src/app/sitemap.ts` |
| robots.txt | ✅ | `src/app/robots.ts` |
| Canonical URLs | ✅ | All pages have `alternates.canonical` |
| hreflang tags | ✅ | 9 languages in layout metadata |
| Open Graph tags | ✅ | All pages |
| Twitter Cards | ✅ | Layout level |
| JSON-LD Schema | ✅ | Multiple types (see below) |
| HTTPS | ✅ | Enforced via Vercel/Cloudflare |
| Mobile-friendly | ✅ | Responsive design |
| Core Web Vitals | ⚠️ | LCP needs monitoring (3D hero) |
| Image optimization | ⚠️ | Next/Image used where applicable |
| Lazy loading | ✅ | Dynamic imports for 3D scene |

---

## Schema Markup Implemented

| Schema Type | Pages |
|-------------|-------|
| `LocalBusiness` | All pages (layout level) |
| `FAQPage` | All product category pages |
| `CollectionPage` | Product category pages |
| `BreadcrumbList` | Product category pages |
| `AboutPage` | /about |
| `WebPage` | /privacy, /terms |
| `Organization` | /about |

### Missing Schemas
- ❌ `Product` schema (individual product pages not yet built)
- ❌ `Article` schema (blog posts not yet built)
- ❌ `Review` / `AggregateRating` schema
- ❌ `BreadcrumbList` on geo/SEO landing pages

---

## On-Page SEO

| Item | Status | Notes |
|------|--------|-------|
| Unique title tags | ✅ | All pages have unique titles |
| Meta descriptions | ✅ | All pages |
| H1 on every page | ✅ | |
| Heading hierarchy (H1→H2→H3) | ✅ | |
| Keyword-rich content | ✅ | Dubai/UAE focused |
| Internal linking | ⚠️ | Basic links present, needs expansion |
| Alt text on images | ⚠️ | No product images yet |
| URL structure | ✅ | Clean, keyword-rich slugs |

---

## Target Keywords

### Primary (UAE Market)
- luxury skincare dubai
- best skincare dubai
- skincare consultation dubai
- personalized skincare uae
- face serum dubai
- moisturizer dubai
- spf sunscreen dubai
- anti aging skincare dubai

### Long-tail
- best skincare routine for dry skin in dubai
- skincare for dubai summer heat
- skincare for expats in uae
- anti aging skincare routine uae
- acne treatment routine dubai
- skin barrier repair dubai climate

### Geo-targeted
- skincare dubai / abu dhabi / sharjah / ajman / al ain / fujairah / ras al khaimah

---

## Content SEO

| Item | Status |
|------|--------|
| Blog/Journal section | ⚠️ Placeholder (no real posts) |
| Ingredient encyclopedia | ❌ Not built |
| Skincare glossary | ❌ Not built |
| FAQ sections | ✅ On all product pages |
| Expert author profiles | ❌ Not built |
| Before/after content | ❌ Not built |

---

## Local SEO

| Item | Status | Notes |
|------|--------|-------|
| Dubai address in schema | ✅ | LocalBusiness schema |
| Phone number | ✅ | +971 52 450 2886 |
| WhatsApp integration | ✅ | Floating button + CTAs |
| Geo landing pages | ✅ | 7 UAE cities |
| Google Business Profile | ❌ Not set up |
| Local citations | ❌ Not built |

---

## Performance (SEO Impact)

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse SEO | 100 | ⚠️ Not measured |
| Lighthouse Performance | 95+ | ⚠️ 3D hero may impact |
| LCP | < 2s | ⚠️ Monitor |
| CLS | ~0 | ✅ No layout shifts |
| FID/INP | < 100ms | ⚠️ Monitor |

---

## Priority Actions

1. **Add Product schema** when individual product pages are built
2. **Add Article schema** when blog posts are created
3. **Expand internal linking** between related pages
4. **Create real blog content** (1500–3000 words per post)
5. **Set up Google Business Profile** for local SEO
6. **Monitor Core Web Vitals** — 3D hero may impact LCP on mobile
7. **Add alt text** to all images when product photography is added