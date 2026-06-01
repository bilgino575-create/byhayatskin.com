# Project Structure — By Hayat Skin

```
byskin/
├── public/
│   └── models/
│       └── mascara.glb              # 3D mascara model (Maybelline Sky High)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout (minimal, redirects to /en)
│   │   ├── page.tsx                 # Root redirect → /en
│   │   ├── globals.css              # Global styles, design tokens, utilities
│   │   ├── robots.ts                # Dynamic robots.txt
│   │   ├── sitemap.ts               # Dynamic XML sitemap
│   │   │
│   │   └── [lang]/                  # Locale-prefixed routes
│   │       ├── layout.tsx           # Lang layout: Navbar, Footer, WhatsApp, fonts
│   │       ├── page.tsx             # Home page (all sections)
│   │       ├── not-found.tsx        # 404 page
│   │       │
│   │       ├── about/page.tsx       # About Us
│   │       ├── blog/page.tsx        # Journal / Blog
│   │       ├── consultation/
│   │       │   ├── page.tsx         # Consultation landing
│   │       │   └── ConsultationEngine.tsx
│   │       ├── contact/page.tsx     # Contact
│   │       ├── journal/page.tsx     # Redirect → /blog
│   │       ├── privacy/page.tsx     # Privacy Policy
│   │       ├── terms/page.tsx       # Terms of Service
│   │       │
│   │       ├── products/
│   │       │   ├── page.tsx         # All products
│   │       │   ├── ProductsPageClient.tsx
│   │       │   ├── serums/page.tsx
│   │       │   ├── moisturizers/page.tsx
│   │       │   ├── spf/page.tsx
│   │       │   ├── anti-aging/page.tsx
│   │       │   └── kits/page.tsx
│   │       │
│   │       ├── skincare-dubai/page.tsx
│   │       ├── skincare-abu-dhabi/page.tsx
│   │       ├── skincare-sharjah/page.tsx
│   │       ├── skincare-ajman/page.tsx
│   │       ├── skincare-alain/page.tsx
│   │       ├── skincare-fujairah/page.tsx
│   │       ├── skincare-ras-al-khaimah/page.tsx
│   │       ├── skincare-consultation-dubai/page.tsx
│   │       ├── luxury-skincare-dubai/page.tsx
│   │       ├── best-skincare-dubai/page.tsx
│   │       ├── acne-treatment-dubai/page.tsx
│   │       ├── anti-aging-skincare-dubai/page.tsx
│   │       ├── pigmentation-treatment-dubai/page.tsx
│   │       ├── sensitive-skin-dubai/page.tsx
│   │       ├── dry-skin-treatment-dubai/page.tsx
│   │       └── oily-skin-care-dubai/page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Fixed top navbar with mobile menu
│   │   │   ├── Footer.tsx           # Full footer with links
│   │   │   └── PageTransition.tsx   # Framer Motion page transitions
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Full-screen hero with 3D + text
│   │   │   ├── HeroScene3D.tsx      # Three.js Canvas (GLB model + particles)
│   │   │   ├── BrandStorySection.tsx
│   │   │   ├── SkinDiagnosisSection.tsx  # Dark theme, animated SVG icons
│   │   │   ├── ProductCategoriesSection.tsx
│   │   │   ├── ConsultationSection.tsx
│   │   │   ├── WhyUsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── InstagramSection.tsx
│   │   │   └── FinalCTASection.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── ProductCategoryPage.tsx  # Reusable product category template
│   │   │   ├── GeoSEOPage.tsx           # Reusable geo SEO page template
│   │   │   └── HighValueSEOPage.tsx     # Reusable high-value SEO template
│   │   │
│   │   └── ui/
│   │       ├── LanguageSwitcher.tsx
│   │       └── WhatsAppButton.tsx
│   │
│   └── lib/
│       └── i18n/
│           ├── config.ts            # Locale list, RTL check, hasLocale
│           ├── dictionaries.ts      # getDictionary(), DictionaryType
│           └── dictionaries/
│               ├── en.json
│               ├── ar.json
│               ├── tr.json
│               ├── ru.json
│               ├── de.json
│               ├── fr.json
│               ├── es.json
│               ├── it.json
│               └── zh.json
│
├── gorew.md                         # Master project specification
├── AGENTS.md                        # AI agent rules
├── README.md
├── PROJECT_STRUCTURE.md             # This file
├── DESIGN_SYSTEM.md
├── SEO_CHECKLIST.md
├── MOBILE_AUDIT.md
├── ROUTES.md
├── next.config.ts
├── tailwind.config.ts               # (via @theme in globals.css)
├── tsconfig.json
└── package.json
```

## Key Patterns

### Page Template Pattern
All product category pages use [`ProductCategoryPage`](src/components/pages/ProductCategoryPage.tsx) component with props:
- `locale`, `title`, `headline`, `subheadline`, `description`
- `products[]`, `benefits[]`, `faqItems[]`, `keyword`

### i18n Pattern
- All user-facing text comes from `dict` (DictionaryType)
- Locale detected from `[lang]` URL segment
- RTL automatically applied for `ar` locale
- `generateStaticParams()` generates all 9 locales at build time

### SEO Pattern
Every page exports `generateMetadata()` with:
- `title`, `description`, `keywords`
- `alternates.canonical`
- `openGraph` tags
- JSON-LD schema (page-specific type)