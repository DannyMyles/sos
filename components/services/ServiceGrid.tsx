'use client'

import { useState } from 'react'
import { BarChart3, CalendarClock, Clock, MessageCircle, Users } from 'lucide-react'
import { Service, servicePriceLabel } from '@/lib/api'
import { useSite } from '@/components/site/SiteProvider'
import { waLink } from '@/lib/site'
import ServiceEnquiryModal from './ServiceEnquiryModal'

/** Cards for database-driven services (activities, classes) with booking. */
export default function ServiceGrid({ services, emptyText }: { services: Service[]; emptyText: string }) {
  const site = useSite()
  const [selected, setSelected] = useState<Service | null>(null)

  if (services.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center">
        <p className="mb-4 text-stone-600">{emptyText}</p>
        <a href={waLink(site, `Hi ${site.name}! What activities do you have coming up?`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white">
          <MessageCircle className="h-5 w-5" /> Ask us on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const meta = [
            s.schedule && { icon: CalendarClock, text: s.schedule },
            s.duration && { icon: Clock, text: s.duration },
            s.groupSize && { icon: Users, text: s.groupSize },
            s.level && { icon: BarChart3, text: s.level },
          ].filter(Boolean) as { icon: typeof Clock; text: string }[]
          return (
            <article key={s.id} className="group flex flex-col overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm transition-shadow hover:shadow-xl">
              <div className="relative h-52 overflow-hidden bg-stone-200">
                {s.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
                {s.category && (
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-stone-800 backdrop-blur">{s.category}</span>
                )}
                {s.popular && <span className="absolute right-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white">Popular</span>}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-bold text-stone-900">{s.title}</h3>
                <p className="mb-4 text-stone-600">{s.description}</p>
                {meta.length > 0 && (
                  <ul className="mb-5 grid gap-2 text-sm text-stone-700">
                    {meta.map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-accent-500" /> {text}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
                  <span className="text-sm font-bold text-stone-900">{servicePriceLabel(s)}</span>
                  {s.available ? (
                    <button onClick={() => setSelected(s)} className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-600">
                      Book / enquire
                    </button>
                  ) : (
                    <span className="rounded-full bg-stone-100 px-4 py-2 text-xs font-semibold text-stone-500">Currently unavailable</span>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
      {selected && <ServiceEnquiryModal service={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
