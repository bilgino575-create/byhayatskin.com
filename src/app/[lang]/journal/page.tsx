import { redirect } from 'next/navigation'
import { hasLocale } from '@/lib/i18n/config'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ lang: string }> }

// Journal is an alias for Blog — redirect permanently
export default async function JournalPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  redirect(`/${lang}/blog`)
}