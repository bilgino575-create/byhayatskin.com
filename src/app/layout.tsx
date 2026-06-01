import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://byhayatskin.com'),
  title: {
    default: 'By Hayat Skin — Luxury Skincare Dubai',
    template: '%s | By Hayat Skin',
  },
  description: 'Dubai\'s premier luxury skincare house. Personalized skincare consultations and premium products designed for your skin.',
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
