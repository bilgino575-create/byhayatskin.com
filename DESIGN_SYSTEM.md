# Design System — By Hayat Skin

## Brand Identity

**Positioning:** Ultra-premium luxury skincare house. Dubai-based. Dermatology-inspired.  
**Tone:** Medical-luxury hybrid. Expert authority. Warm exclusivity.  
**Feel:** "This is not a store. This is a luxury skincare clinic + consultancy + brand house."

---

## Color Palette

### Light Theme (Primary — Hero, Product Pages, Legal)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-ivory` | `#FDFAF5` | Page background |
| `--color-pearl` | `#FAF8F5` | Section backgrounds, cards |
| `--color-beige` | `#F5EFE6` | Subtle section backgrounds |
| `--color-champagne` | `#C9A96E` | Primary gold accent, borders |
| `--color-champagne-dark` | `#A07840` | Darker gold, text accents |
| `--color-champagne-light` | `#E8D5B0` | Light gold, hover states |
| `--color-matte-black` | `#1A1A1A` | Primary text |
| `--color-warm-gray` | `#8C8279` | Secondary text, descriptions |
| `--color-soft-gray` | `#E8E4DF` | Borders, dividers |
| `--color-rose-gold` | `#B76E79` | Minimal accent (avoid overuse) |

### Dark Theme (Skin Diagnosis, CTA sections)

| Value | Usage |
|-------|-------|
| `#0F0E0C` | Darkest background |
| `#141210` | Mid dark background |
| `#1A1714` | Lighter dark background |
| `#F5EFE6` | Light text on dark |
| `rgba(245,239,230,0.65)` | Secondary text on dark |
| `rgba(245,239,230,0.35)` | Muted text on dark |
| `rgba(201,169,110,0.15)` | Dark card background |
| `rgba(201,169,110,0.12)` | Dark card border |

---

## Typography

### Fonts

| Font | Variable | Usage |
|------|----------|-------|
| Cormorant Garamond | `--font-cormorant` | Headings, display text, luxury numbers |
| Jost | `--font-jost` | Body text, UI labels, buttons |
| Noto Sans Arabic | (inline) | Arabic RTL content only |

### Scale

| Class | Size | Usage |
|-------|------|-------|
| Hero H1 | `clamp(2.2rem, 7vw, 6rem)` | Hero headline |
| Section H2 | `text-4xl md:text-5xl lg:text-6xl` | Section headings |
| Card H3 | `text-xl md:text-2xl` | Card/panel headings |
| Body | `text-sm` / `text-base` | Descriptions |
| Label | `text-[0.62rem]–text-[0.7rem]` | Eyebrows, tags, tracking labels |

### Heading Style

```css
.heading-luxury {
  font-family: var(--font-cormorant), Georgia, serif;
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.15;
}
```

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-section` | `7rem` | `.section-padding` top/bottom |
| Container max-width | `1320px` | `.container-luxury` |
| Container padding | `1.5rem` (mobile) / `2.5rem` (md+) | `.container-luxury` |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-luxury` | `0 4px 40px rgba(201,169,110,0.12)` | Cards, selected states |
| `--shadow-card` | `0 2px 24px rgba(26,26,26,0.06)` | Default card shadow |
| `--shadow-hover` | `0 8px 48px rgba(201,169,110,0.2)` | Hover state |

---

## CSS Utility Classes

### Layout
- `.container-luxury` — max-width 1320px, auto margins, responsive padding
- `.section-padding` — 7rem top/bottom padding

### Typography
- `.heading-luxury` — Cormorant Garamond, weight 300
- `.text-gold-gradient` — Champagne gradient text
- `.font-serif` / `.font-sans`

### Components
- `.btn-luxury` — Base button (inline-flex, uppercase, tracking)
- `.btn-primary` — Gold gradient button
- `.btn-outline` — Transparent with gold border
- `.card-luxury` — Pearl background card with hover lift
- `.card-dark` — Dark theme card (rgba white bg, gold border)
- `.glass` — Light glassmorphism (ivory bg, blur)
- `.glass-dark` — Dark glassmorphism (dark bg, blur)
- `.divider-gold` — 60px gold gradient divider

### Dark Theme Sections
- `.section-dark` — `#0F0E0C` background
- `.section-dark-2` — `#141210` background
- `.section-dark-3` — `#1A1714` background
- `.section-transition-dark` — Gradient between dark sections

### Effects
- `.glow-gold` — Gold box shadow glow
- `.glow-gold-sm` — Subtle gold glow
- `.icon-3d` — 3D icon container with hover transform
- `.noise-overlay` — Subtle noise texture overlay
- `.animate-float` — Floating animation (6s)
- `.animate-shimmer` — Shimmer animation (3s)
- `.animate-fade-in-up` — Fade in from below

---

## Motion Design

### Principles
- Slow, elegant transitions (400–800ms)
- Ease: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (`--ease-luxury`)
- No aggressive or jarring animations
- Framer Motion for all interactive animations

### Common Patterns

```tsx
// Fade in on scroll
initial={{ opacity: 0, y: 30 }}
animate={inView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.8 }}

// Staggered children
transition={{ duration: 0.6, delay: i * 0.1 }}

// Hover lift
whileHover={{ y: -4 }}
whileTap={{ scale: 0.98 }}

// Page transition
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.4 }}
```

---

## Component Patterns

### Section Header
```tsx
<div className="flex items-center justify-center gap-3 mb-5">
  <div className="h-px w-10 bg-[var(--color-champagne)]" />
  <span className="text-[0.7rem] tracking-[0.3em] uppercase text-[var(--color-champagne)]">
    Label
  </span>
  <div className="h-px w-10 bg-[var(--color-champagne)]" />
</div>
<h2 className="heading-luxury text-4xl md:text-5xl text-[var(--color-matte-black)]">
  Headline
</h2>
```

### Dark Section Header (same but with light text)
```tsx
<h2 style={{ color: '#F5EFE6', fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
```

### Product Card
Uses `card-luxury` class with hover lift. Gold price in Cormorant font.

### CTA Section
Dark background (`--color-matte-black`), white heading, gold primary button + WhatsApp button.

---

## RTL Support

Arabic (`ar`) locale automatically applies:
- `dir="rtl"` on `<html>`
- Noto Sans Arabic font loaded via Google Fonts
- All flex/grid layouts reverse naturally with RTL

---

## Responsive Breakpoints (Tailwind defaults)

| Breakpoint | Width |
|-----------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |