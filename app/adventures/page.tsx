import type { Metadata } from 'next'
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import AdventureBrowser from '@/components/adventures/AdventureBrowser'

export const metadata: Metadata = {
  title: 'Adventures & Tours',
  description: 'Upcoming hikes, rafting, cycling, climbing and safari trips. Book your spot on WhatsApp.',
}

export default function Adventures() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader eyebrow="Adventures & Tours" title="Find your next" highlight="adventure" subtitle="Pick a trip, tell us how many are coming, and confirm on WhatsApp — no account, no online payment." image="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=2000" focus="center 40%" />
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <AdventureBrowser filters />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
