import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import ContactForm from '@/components/contact/ContactForm'
import FaqList from '@/components/faq/FaqList'
import { api, safe } from '@/lib/api'
import { getSite, telHref, waLink, pageHeader } from '@/lib/site'

export const metadata = { title: 'Contact Us' }
export const dynamic = 'force-dynamic'

export default async function Contact() {
  const header = pageHeader(await getSite(), 'contact', { eyebrow: 'Contact', title: 'Let’s plan your', highlight: 'trip', subtitle: 'Questions, group bookings or a private adventure — we usually reply within the hour on WhatsApp.', imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2000' })
  const [site, faqs] = await Promise.all([getSite(), safe(api.faqs(), [])])
  const rows = [
    site.contactPhone && {
      icon: Phone,
      title: 'Phone',
      body: (
        <>
          <a href={telHref(site.contactPhone)} className="text-stone-700 hover:text-accent-600">{site.contactPhone}</a>
          <a href={waLink(site)} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline">
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </>
      ),
    },
    site.contactEmail && {
      icon: Mail,
      title: 'Email',
      body: (
        <a href={`mailto:${site.contactEmail}`} className="break-all text-stone-700 hover:text-accent-600">{site.contactEmail}</a>
      ),
    },
    site.location && {
      icon: MapPin,
      title: 'Location',
      body: (
        <>
          <p className="text-stone-700">{site.location}</p>
          <p className="text-sm text-stone-500">Adventures run at locations across Kenya</p>
        </>
      ),
    },
    site.settings.hours && { icon: Clock, title: 'Hours', body: <p className="text-stone-700">{site.settings.hours}</p> },
  ].filter(Boolean) as { icon: typeof Phone; title: string; body: React.ReactNode }[]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader eyebrow={header.eyebrow} title={header.title} highlight={header.highlight} subtitle={header.subtitle} image={header.imageUrl} focus="center 50%" />

        <section className="py-12 md:py-20">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-5">
            <div className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
              <h2 className="mb-1 text-2xl font-bold text-stone-900 md:text-3xl">Send us a message</h2>
              <p className="mb-6 text-stone-500">We’ll reply by phone, WhatsApp or email.</p>
              <ContactForm />
            </div>

            <aside className="space-y-6 lg:col-span-2">
              <div className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="mb-6 text-xl font-bold text-stone-900">Contact information</h3>
                <ul className="space-y-5">
                  {rows.map(({ icon: Icon, title, body }) => (
                    <li key={title} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="font-bold text-stone-900">{title}</h4>
                        {body}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto max-w-3xl px-4">
              <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-accent-600">FAQ</p>
              <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight md:text-4xl">Questions, answered</h2>
              <FaqList faqs={faqs} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
