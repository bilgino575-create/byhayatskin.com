import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center pt-20">
      <div className="text-center px-6">
        <div
          className="text-8xl text-[var(--color-champagne)]/20 mb-4"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
        >
          404
        </div>
        <h1 className="heading-luxury text-3xl text-[var(--color-matte-black)] mb-3">
          Page Not Found
        </h1>
        <div className="divider-gold mb-4" />
        <p className="text-[var(--color-warm-gray)] mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/en" className="btn-luxury btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  )
}