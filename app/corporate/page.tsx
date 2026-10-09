import type { Metadata } from 'next'
import { ClipboardList, Handshake, PartyPopper } from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import PromoBanners from '@/components/home/PromoBanners'
import FaqList from '@/components/faq/FaqList'
import { CorporateGrid, CorporateQuoteForm } from '@/components/services/CorporateOffers'
import { api, safe } from '@/lib/api'
import { getSite, pageHeader } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Corporate & Group Adventures',
  description: 'Team hikes, outdoor team-building, adventure days and retreats for companies, schools and groups in Kenya. Request a tailored quote.',
}
export const dynamic = 'force-dynamic'

const STEPS = [
  { icon: ClipboardList, title: 'Tell us about your group', text: 'Pick a package or describe your idea — group size, dates, location and goals.' },
  { icon: Handshake, title: 'Get a tailored plan', text: 'We reply on WhatsApp and email with an itinerary and a clear quote.' },
  { icon: PartyPopper, title: 'Confirm & go', text: 'Once you approve, we lock in the date and handle guides, gear and safety.' },
]

/** Corporate offerings are services with audience "corporate" or "both" — new ones appear without code changes. */
export default async function CorporatePage() {
  const [site, services, banners, faqs] = await Promise.all([
    getSite(),
    safe(api.services({ audience: 'corporate' }), []),
    safe(api.banners('corporate'), []),
    safe(api.faqs('Corporate'), []),
  ])
  const header = pageHeader(site, 'corporate', {
    eyebrow: 'Corporate & groups',
    title: 'Adventures for',
    highlight: 'your team',
    subtitle: site.settings.corporate?.subtitle || 'Guided hikes, team-building challenges and adventure days for companies, schools and groups.',
    imageUrl: site.settings.corporate?.imageUrl || 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=2000',
  })

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader eyebrow={header.eyebrow} title={header.title} highlight={header.highlight} subtitle={header.subtitle} image={header.imageUrl} focus="center 45%" />
        <PromoBanners banners={banners} />

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-accent-600">Packages</p>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">{site.settings.corporate?.headline || 'What we run for teams'}</h2>
            </div>
            <CorporateGrid services={services.filter((s) => s.audience === 'corporate')} />
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">How group bookings work</h2>
            <ol className="grid gap-6 md:grid-cols-3">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="reveal rounded-2xl border border-gray-100 bg-gradient-to-b from-accent-50 to-white p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-500 text-white"><Icon className="h-5 w-5" /></span>
                    <span className="text-sm font-semibold text-accent-700">Step {i + 1}</span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold">{title}</h3>
                  <p className="text-gray-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="quote" className="scroll-mt-24 py-16 md:py-20">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-accent-600">Tailored quote</p>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Planning something bigger?</h2>
              <p className="mt-4 text-stone-600">Several groups, a multi-day trip or a mix of activities? Share the basics and we’ll come back with a plan and a clear quote.</p>
            </div>
            <div className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
              <CorporateQuoteForm services={services} />
            </div>
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto max-w-3xl px-4">
              <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight">Corporate FAQs</h2>
              <FaqList faqs={faqs} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
