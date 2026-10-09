import type { Metadata } from 'next'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import { getSite, pageHeader } from '@/lib/site'
import AdventureBrowser from '@/components/adventures/AdventureBrowser'

export const metadata: Metadata = {
  title: 'Adventures & Tours',
  description: 'Upcoming hikes, rafting, cycling, climbing and safari trips. Book your spot on WhatsApp.',
}

export const dynamic = 'force-dynamic'

export default async function Adventures() {
  const header = pageHeader(await getSite(), 'adventures', { eyebrow: 'Adventures & Tours', title: 'Find your next', highlight: 'adventure', subtitle: 'Pick a trip, tell us how many are coming, and confirm on WhatsApp — no account, no online payment.', imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=2000' })
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader eyebrow={header.eyebrow} title={header.title} highlight={header.highlight} subtitle={header.subtitle} image={header.imageUrl} focus="center 40%" />
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex justify-end">
              <Link href="/calendar" className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:border-accent-300 hover:text-accent-700">
                <CalendarDays className="h-4 w-4" /> Calendar view
              </Link>
            </div>
            <AdventureBrowser filters />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
