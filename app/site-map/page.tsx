import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import { api, formatDate, safe } from '@/lib/api'

export const metadata: Metadata = { title: 'Sitemap', description: 'Every page on Source of Adventure in one place.' }
export const revalidate = 300

type LinkItem = { href: string; label: string; note?: string }

function Group({ title, items }: { title: string; items: LinkItem[] }) {
  if (items.length === 0) return null
  return (
    <section className="min-w-0">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-accent-600">{title}</h2>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={`${i.href}-${i.label}`}>
            <Link href={i.href} className="font-medium text-stone-800 hover:text-accent-700 hover:underline">{i.label}</Link>
            {i.note && <span className="ml-2 text-sm text-stone-500">{i.note}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Human-readable sitemap; the machine version is /sitemap.xml. */
export default async function SiteMapPage() {
  const [adventures, events, services] = await Promise.all([
    safe(api.adventures({ upcoming: true, kind: 'adventure' }), []),
    safe(api.adventures({ upcoming: true, kind: 'event' }), []),
    safe(api.services(), []),
  ])
  const byCategory = (c: string) => services.filter((s) => s.category === c)
  const dated = (list: typeof adventures, href: string) =>
    list.map((a) => ({ href, label: a.title, note: formatDate(a.date, { day: 'numeric', month: 'short' }) }))

  return (
    <>
      <Navigation />
      <main className="container mx-auto min-h-screen px-4 py-12 md:py-16">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight md:text-5xl">Sitemap</h1>
        <p className="mb-10 text-stone-600">Every page on the site, plus what’s coming up.</p>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <Group
            title="Book"
            items={[
              { href: '/adventures', label: 'Adventures' },
              { href: '/events', label: 'Events' },
              { href: '/calendar', label: 'Calendar' },
              { href: '/activities', label: 'Outdoor activities' },
              { href: '/activities#classes', label: 'Fitness classes' },
              { href: '/corporate', label: 'Corporate & groups' },
            ]}
          />
          <Group
            title="About us"
            items={[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About & team' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/contact', label: 'Contact & FAQs' },
            ]}
          />
          <Group title="Upcoming adventures" items={dated(adventures, '/adventures')} />
          <Group title="Upcoming events" items={dated(events, '/events')} />
          <Group title="Activities" items={byCategory('Outdoor Activity').map((s) => ({ href: '/activities#activities', label: s.title }))} />
          <Group title="Fitness classes" items={byCategory('Outdoor Fitness').map((s) => ({ href: '/activities#classes', label: s.title, note: s.schedule ?? undefined }))} />
          <Group title="Corporate packages" items={services.filter((s) => s.audience === 'corporate').map((s) => ({ href: '/corporate', label: s.title }))} />
        </div>
      </main>
      <Footer />
    </>
  )
}
