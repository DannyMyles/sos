import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/contact'

const perks = ['No account needed', 'Pay once confirmed', 'Groups welcome']

const Hero = () => {
  return (
    <section className="px-3 pt-3 sm:px-4">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-gradient-to-br from-accent-100 via-[#fbf3ea] to-emerald-100/70">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent-300/40 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" aria-hidden />

        <div className="relative grid items-center gap-10 px-6 py-12 md:grid-cols-2 md:px-14 md:py-20">
          <div className="enter-up text-center md:text-left">
            <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-700 ring-1 ring-accent-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Fun &amp; Fitness Adventures · Kenya
            </p>
            <h1 className="text-5xl font-extrabold leading-[0.98] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
              Get outside.
              <br />
              <span className="text-accent-500">Get stronger.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-stone-600 md:mx-0">
              Hikes, rafting, rides and climbs with a crew that keeps it fun. Pick a date, add your name and phone,
              and confirm your spot on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <Link
                href="/adventures"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-7 py-4 font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Find an adventure <ArrowUpRight className="h-5 w-5" />
              </Link>
              <a
                href={whatsappLink('Hi Source of Adventure! I’d like to plan a trip.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-stone-900 ring-1 ring-stone-200 transition-colors hover:bg-stone-50"
              >
                <MessageCircle className="h-5 w-5 text-[#25D366]" /> Chat with us
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium text-stone-600 md:justify-start">
              {perks.map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" /> {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="enter-up relative mx-auto w-full max-w-sm md:max-w-md">
            <Image
              src="/all.jpeg"
              alt="The Source of Adventure crew ready to head out"
              width={1202}
              height={1600}
              priority
              sizes="(min-width: 768px) 28rem, 90vw"
              className="aspect-4/5 w-full rotate-2 rounded-[1.75rem] object-cover shadow-2xl ring-8 ring-white/70"
            />
            <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Every trip</p>
              <p className="font-extrabold text-stone-900">Guided · Safe · Fun</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
