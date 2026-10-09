import { Quote, Star } from 'lucide-react'
import type { Testimonial } from '@/lib/api'

/** Approved testimonials from the admin; the section hides itself when there are none. */
export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-accent-600">Reviews</p>
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight md:text-5xl">What our crew says</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((t) => (
            <figure key={t.id} className="reveal flex flex-col rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
              <Quote className="mb-3 h-7 w-7 text-accent-300" />
              <div className="mb-3 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} />
                ))}
              </div>
              <blockquote className="flex-1 text-stone-700">“{t.content}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {t.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.photoUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: t.avatarColor || '#ea580c' }}>
                    {(t.image || t.name).slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span>
                  <span className="block font-bold text-stone-900">{t.name}</span>
                  <span className="block text-sm text-stone-500">{[t.role, t.company].filter(Boolean).join(' · ')}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
