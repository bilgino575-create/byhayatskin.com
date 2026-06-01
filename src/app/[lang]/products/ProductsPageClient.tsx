'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Heart, ShoppingBag, SlidersHorizontal, X } from 'lucide-react'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface ProductsPageClientProps {
  dict: DictionaryType
  lang: Locale
}

// Mock product data
const products = [
  { id: 1, name: 'Hydra-Boost Serum', category: 'serums', skinType: 'dry', price: 285, badge: 'bestseller', color: '#C9A96E', concern: 'hydration' },
  { id: 2, name: 'Barrier Repair Moisturizer', category: 'moisturizers', skinType: 'sensitive', price: 195, badge: 'new', color: '#B76E79', concern: 'barrier' },
  { id: 3, name: 'Clarifying Cleanser', category: 'cleansers', skinType: 'oily', price: 125, badge: null, color: '#7BA7BC', concern: 'acne' },
  { id: 4, name: 'Vitamin C Brightening Serum', category: 'serums', skinType: 'combination', price: 320, badge: 'bestseller', color: '#A8C5A0', concern: 'pigmentation' },
  { id: 5, name: 'SPF 50+ Luxury Shield', category: 'spf', skinType: 'all', price: 165, badge: 'new', color: '#9B8EA8', concern: 'protection' },
  { id: 6, name: 'Retinol Night Serum', category: 'serums', skinType: 'combination', price: 380, badge: null, color: '#C9A96E', concern: 'anti-aging' },
  { id: 7, name: 'Calming Eye Cream', category: 'eye_care', skinType: 'sensitive', price: 245, badge: 'bestseller', color: '#B76E79', concern: 'anti-aging' },
  { id: 8, name: 'Acne-Clear Treatment', category: 'acne', skinType: 'oily', price: 155, badge: null, color: '#7BA7BC', concern: 'acne' },
  { id: 9, name: 'Luxury Ritual Kit', category: 'kits', skinType: 'all', price: 650, badge: 'new', color: '#A8C5A0', concern: 'all' },
  { id: 10, name: 'Pigmentation Corrector', category: 'serums', skinType: 'all', price: 295, badge: null, color: '#9B8EA8', concern: 'pigmentation' },
  { id: 11, name: 'Deep Hydration Mask', category: 'masks', skinType: 'dry', price: 185, badge: 'bestseller', color: '#C9A96E', concern: 'hydration' },
  { id: 12, name: 'Niacinamide Pore Serum', category: 'serums', skinType: 'oily', price: 210, badge: null, color: '#B76E79', concern: 'pores' },
]

const skinTypeFilters = ['all', 'dry', 'oily', 'combination', 'sensitive']
const categoryFilters = ['all', 'serums', 'moisturizers', 'cleansers', 'masks', 'spf', 'eye_care', 'acne', 'kits']

export function ProductsPageClient({ dict, lang }: ProductsPageClientProps) {
  const [activeSkinType, setActiveSkinType] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')
  const [wishlist, setWishlist] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const filtered = products.filter((p) => {
    const skinMatch = activeSkinType === 'all' || p.skinType === activeSkinType || p.skinType === 'all'
    const catMatch = activeCategory === 'all' || p.category === activeCategory
    return skinMatch && catMatch
  })

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }

  const getCategoryLabel = (key: string) => {
    if (key === 'all') return 'All'
    const labels: Record<string, string> = {
      serums: dict.categories.items.serums,
      moisturizers: dict.categories.items.moisturizers,
      cleansers: dict.categories.items.cleansers,
      masks: dict.categories.items.masks,
      spf: dict.categories.items.spf,
      eye_care: dict.categories.items.eye_care,
      acne: dict.categories.items.acne,
      kits: dict.categories.items.kits,
    }
    return labels[key] || key
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28">
      {/* Page Header */}
      <div className="bg-[var(--color-pearl)] border-b border-[var(--color-soft-gray)]">
        <div className="container-luxury py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)]">
              By Hayat Skin
            </span>
          </div>
          <h1 className="heading-luxury text-4xl md:text-5xl text-[var(--color-matte-black)]">
            {dict.products.headline}
          </h1>
          <p className="text-[var(--color-warm-gray)] mt-2">
            {filtered.length} products
          </p>
        </div>
      </div>

      <div className="container-luxury py-10">
        {/* Filter Bar */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-[var(--color-matte-black)] border border-[var(--color-soft-gray)] px-4 py-2 rounded-sm"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            <span className="text-sm text-[var(--color-warm-gray)]">{filtered.length} results</span>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-6`}>
            {/* Skin Type */}
            <div>
              <div className="text-[0.65rem] tracking-[0.15em] uppercase text-[var(--color-warm-gray)] mb-2">
                {dict.products.filter_skin_type}
              </div>
              <div className="flex flex-wrap gap-2">
                {skinTypeFilters.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveSkinType(type)}
                    className={`px-3 py-1.5 text-[0.7rem] tracking-[0.08em] uppercase rounded-full border transition-all duration-300 ${
                      activeSkinType === type
                        ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/10 text-[var(--color-champagne-dark)]'
                        : 'border-[var(--color-soft-gray)] text-[var(--color-warm-gray)] hover:border-[var(--color-champagne-light)]'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <div className="text-[0.65rem] tracking-[0.15em] uppercase text-[var(--color-warm-gray)] mb-2">
                Category
              </div>
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-[0.7rem] tracking-[0.08em] uppercase rounded-full border transition-all duration-300 ${
                      activeCategory === cat
                        ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/10 text-[var(--color-champagne-dark)]'
                        : 'border-[var(--color-soft-gray)] text-[var(--color-warm-gray)] hover:border-[var(--color-champagne-light)]'
                    }`}
                  >
                    {getCategoryLabel(cat)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group"
            >
              <div className="card-luxury rounded-sm overflow-hidden">
                {/* Product Image */}
                <div
                  className="relative aspect-square overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${product.color}15, ${product.color}08)` }}
                >
                  {/* Placeholder visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="text-4xl opacity-20"
                      style={{ color: product.color, fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      ✦
                    </div>
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[0.55rem] tracking-[0.12em] uppercase px-2 py-1 rounded-full font-medium"
                        style={{ background: product.color + '20', color: product.color }}
                      >
                        {product.badge === 'bestseller' ? dict.products.bestseller : dict.products.new}
                      </span>
                    </div>
                  )}

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                    aria-label={dict.products.add_to_wishlist}
                  >
                    <Heart
                      size={14}
                      className={wishlist.includes(product.id) ? 'fill-[var(--color-rose-gold)] text-[var(--color-rose-gold)]' : 'text-[var(--color-warm-gray)]'}
                    />
                  </button>

                  {/* Quick add overlay */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full py-2.5 bg-[var(--color-matte-black)] text-white text-[0.65rem] tracking-[0.12em] uppercase flex items-center justify-center gap-2 hover:bg-[var(--color-champagne-dark)] transition-colors duration-300">
                      <ShoppingBag size={12} />
                      {dict.products.add_to_cart}
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-warm-gray)] mb-1">
                    {getCategoryLabel(product.category)}
                  </div>
                  <Link
                    href={`/${lang}/products/${product.id}`}
                    className="text-sm font-medium text-[var(--color-matte-black)] hover:text-[var(--color-champagne-dark)] transition-colors duration-300 block mb-2 leading-snug"
                  >
                    {product.name}
                  </Link>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-base"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: 'var(--color-champagne-dark)' }}
                    >
                      {dict.common.aed} {product.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--color-warm-gray)]">
            No products found for the selected filters.
          </div>
        )}
      </div>
    </div>
  )
}