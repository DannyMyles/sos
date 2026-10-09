import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Banner } from '@/lib/api'

/** Live promotional banners (Admin → Content); nothing renders when none are active. */
export default function PromoBanners({ banners }: { banners: Banner[] }) {
  if (banners.length === 0) return null
  return (
    <section className="px-3 pt-6 sm:px-4">
      <div className={`mx-auto grid max-w-7xl gap-4 ${banners.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {banners.slice(0, 2).map((b) => {
          const external = b.ctaUrl ? /^https?:/.test(b.ctaUrl) : false
          return (
            <div key={b.id} className="relative overflow-hidden rounded-3xl bg-stone-900 text-white">
              {b.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
              )}
              <div className="relative flex flex-col gap-3 p-7 md:p-9">
                {b.badge && <span className="w-fit rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wider">{b.badge}</span>}
                <h2 className="text-2xl font-extrabold md:text-3xl">{b.title}</h2>
                {b.subtitle && <p className="max-w-xl text-white/85">{b.subtitle}</p>}
                {b.ctaUrl && b.ctaLabel && (
                  <Link href={b.ctaUrl} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 font-bold text-stone-900 hover:bg-accent-50">
                    {b.ctaLabel} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
