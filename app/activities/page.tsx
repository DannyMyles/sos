import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import { getSite, pageHeader } from '@/lib/site'
import ServiceGrid from '@/components/services/ServiceGrid'
import { api, safe } from '@/lib/api'

export const metadata = { title: 'Activities & Fitness Classes' }
export const dynamic = 'force-dynamic'

/** Outdoor activities and fitness classes (service categories "Outdoor Activity" / "Outdoor Fitness"). */
export default async function Activities() {
  const [site, activities, classes] = await Promise.all([
    getSite(),
    safe(api.services({ category: 'Outdoor Activity' }), []),
    safe(api.services({ category: 'Outdoor Fitness' }), []),
  ])
  const header = pageHeader(site, 'activities', {
    eyebrow: 'Activities & classes',
    title: 'Something for',
    highlight: 'every pace',
    subtitle: 'From easy nature walks to adrenaline-pumping climbs and open-air fitness classes.',
    imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=2000',
  })
  const benefits = site.settings.highlights ?? []

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader eyebrow={header.eyebrow} title={header.title} highlight={header.highlight} subtitle={header.subtitle} image={header.imageUrl} focus="center 55%" />

        <nav aria-label="On this page" className="container mx-auto flex justify-center gap-2 px-4 pt-8">
          <a href="#activities" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 ring-1 ring-stone-200 hover:ring-accent-300">Outdoor activities</a>
          <a href="#classes" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 ring-1 ring-stone-200 hover:ring-accent-300">Fitness classes</a>
        </nav>

        <section id="activities" className="scroll-mt-24 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight md:text-4xl">Outdoor activities</h2>
            <ServiceGrid services={activities} emptyText="New activities are coming soon. Tell us what you’d like to do and we’ll set it up." />
          </div>
        </section>

        <section id="classes" className="scroll-mt-24 bg-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-3xl font-extrabold tracking-tight md:text-4xl">Outdoor fitness classes</h2>
            <p className="mb-8 text-stone-600">Open skies, real terrain and energising group sessions.</p>
            <ServiceGrid services={classes} emptyText="The class timetable is being updated. Message us for this week’s sessions." />
          </div>
        </section>

        {benefits.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Why train outdoors</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((b) => (
                  <div key={b.title} className="reveal rounded-2xl border border-stone-100 bg-white p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-stone-900">{b.title}</h3>
                    <p className="text-stone-600">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-gradient-sunset py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Ready for Your Next Adventure?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">Pick a date, bring your crew, and confirm your spot on WhatsApp in under a minute.</p>
            <Link href="/adventures" className="inline-block rounded-full bg-white px-8 py-4 text-lg font-bold text-accent-700 shadow-lg transition-transform hover:-translate-y-0.5">
              See upcoming adventures
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
