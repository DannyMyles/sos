import type { Metadata } from 'next'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import AdventureBrowser from '@/components/adventures/AdventureBrowser'
import { getSite, pageHeader } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Fun runs, community hikes, workshops and meet-ups. Save your spot and confirm on WhatsApp.',
}
export const dynamic = 'force-dynamic'

/** Events (kind "event" in Admin → Adventures & events), separate from multi-day trips. */
export default async function EventsPage() {
  const header = pageHeader(await getSite(), 'events', {
    eyebrow: 'Events',
    title: 'Join the',
    highlight: 'crew',
    subtitle: 'Fun runs, community hikes, workshops and meet-ups — pick a date and save your spot.',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=2000',
  })
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader eyebrow={header.eyebrow} title={header.title} highlight={header.highlight} subtitle={header.subtitle} image={header.imageUrl} focus="center 45%" />
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex justify-end">
              <Link href="/calendar" className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:border-accent-300 hover:text-accent-700">
                <CalendarDays className="h-4 w-4" /> Calendar view
              </Link>
            </div>
            <AdventureBrowser kind="event" filters />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
