# Mobile Audit — By Hayat Skin

Last updated: June 2025

## Status Legend
- ✅ Fixed / Working
- ⚠️ Partial / Needs monitoring
- ❌ Known issue

---

## Hero Section

| Issue | Status | Fix Applied |
|-------|--------|-------------|
| 3D model off-screen on mobile | ✅ Fixed | Responsive scale/position via `useIsMobile()` hook |
| 3D model not rendering on mobile (hydration mismatch) | ✅ Fixed | `isMobile === null` guard — Canvas deferred until client detection complete; `key` prop forces Canvas remount |
| Camera angle wrong on mobile | ✅ Fixed | Mobile: `position [0, 0.5, 8]`, `fov 52`; Desktop: `[-2, 0.3, 5.5]`, `fov 38` |
| Content text overflow on small screens | ✅ Fixed | `clamp(2.2rem, 7vw, 6rem)` headline, responsive padding |
| CTA buttons stacking/overflow | ✅ Fixed | `flex-row` + `flex-1` on mobile, full-width |
| Subheadline hidden on very small screens | ✅ Fixed | `hidden sm:block` — saves vertical space |
| Stats row overflow (3 stats + scroll hint) | ✅ Fixed | 3rd stat `hidden sm:block`, scroll hint `hidden md:flex` |
| Left vignette covers model on mobile | ✅ Fixed | Separate mobile vignette (bottom-to-top gradient) |
| Magnetic cursor on touch devices | ⚠️ Acceptable | Only renders when `mounted`, no touch events triggered |
| Particle count on mobile | ✅ Optimized | 40 particles (mobile) vs 80 (desktop) |
| DPR on mobile | ✅ Optimized | `[1, 1.5]` mobile vs `[1, 2]` desktop |

---

## Skin Diagnosis Section

| Issue | Status | Fix Applied |
|-------|--------|-------------|
| Light theme clashing with hero dark | ✅ Fixed | Full dark theme redesign (`#0F0E0C` background) |
| Emoji icons not premium | ✅ Fixed | Custom animated SVG icons (DryIcon, OilyIcon, etc.) |
| Card grid overflow on mobile | ✅ Fixed | `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` |
| Results panel overflow on mobile | ✅ Fixed | `grid-cols-1 md:grid-cols-3` with dividers |
| Icon glow on mobile | ✅ Fixed | `drop-shadow` filter applied |

---

## Navbar

| Issue | Status | Notes |
|-------|--------|-------|
| Mobile menu | ✅ Working | Full-screen slide-in menu |
| Language switcher on mobile | ✅ Working | Included in mobile menu |
| Logo overflow | ✅ Working | Responsive sizing |

---

## Footer

| Issue | Status | Notes |
|-------|--------|-------|
| Multi-column layout on mobile | ⚠️ Check | Should stack to single column |
| Link tap targets | ⚠️ Check | Minimum 44px recommended |

---

## Product Category Pages

| Issue | Status | Notes |
|-------|--------|-------|
| Product grid | ✅ Working | `grid-cols-1 md:grid-cols-3` |
| Benefits grid | ✅ Working | `grid-cols-1 md:grid-cols-3` |
| FAQ items | ✅ Working | Full width on mobile |
| CTA buttons | ✅ Working | `flex-col sm:flex-row` |

---

## General

| Issue | Status | Notes |
|-------|--------|-------|
| `overflow-x: hidden` on body | ✅ Set | Prevents horizontal scroll |
| Viewport meta tag | ✅ Set | Next.js default |
| Touch scroll performance | ✅ | `passive: true` on scroll listeners |
| Font loading on mobile | ✅ | `display: swap` on all fonts |
| RTL on mobile (Arabic) | ✅ | `dir="rtl"` applied at html level |

---

## Tested Viewports

| Device | Width | Status |
|--------|-------|--------|
| iPhone SE | 375px | ⚠️ Needs physical test |
| iPhone 14 | 390px | ⚠️ Needs physical test |
| iPhone 14 Pro Max | 430px | ⚠️ Needs physical test |
| Samsung Galaxy S23 | 360px | ⚠️ Needs physical test |
| iPad Mini | 768px | ⚠️ Needs physical test |
| iPad Pro | 1024px | ⚠️ Needs physical test |

---

## Known Remaining Issues

1. **3D model performance on low-end Android** — WebGL may be slow on budget devices. Consider adding a `prefers-reduced-motion` fallback that shows a static image instead of the 3D scene.

2. **Footer column stacking** — Needs visual verification on 375px viewport.

3. **Consultation page form** — Multi-step form needs mobile UX review.

4. **Blog page** — Currently placeholder; when real content is added, ensure article cards are touch-friendly.

5. **Language switcher dropdown** — Verify tap target size on mobile.

---

## Recommended Next Steps

1. Test on real iOS and Android devices (not just browser DevTools)
2. Run Lighthouse mobile audit (`npx lighthouse https://byhayatskin.com --preset=mobile`)
3. Add `prefers-reduced-motion` check to disable 3D animations for accessibility
4. Verify all tap targets are ≥ 44×44px
5. Test Arabic RTL layout on mobile specifically