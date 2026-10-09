import type { Metadata } from 'next'
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import { getSite, pageHeader } from '@/lib/site'
import CalendarView from '@/components/calendar/CalendarView'

export const metadata: Metadata = {
  title: 'Adventure Calendar',
  description: 'See every upcoming adventure by date, check open spots and book on WhatsApp.',
}

export const dynamic = 'force-dynamic'

export default async function CalendarPage() {
  const header = pageHeader(await getSite(), 'calendar', { eyebrow: 'Adventure Calendar', title: 'Plan it by', highlight: 'date', subtitle: 'See every upcoming adventure, check open spots and reserve yours.', imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000' })
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader eyebrow={header.eyebrow} title={header.title} highlight={header.highlight} subtitle={header.subtitle} image={header.imageUrl} focus="center 50%" />
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <CalendarView />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
