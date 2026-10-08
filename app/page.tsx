import Link from 'next/link'
import { CalendarCheck, MessageCircle, Mountain } from 'lucide-react'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/ui/Hero'
import Navigation from '@/components/ui/Navigation'
import AdventureBrowser from '@/components/adventures/AdventureBrowser'

const steps = [
  { icon: Mountain, title: 'Pick an adventure', text: 'Browse upcoming hikes, rides, climbs and water trips.' },
  { icon: CalendarCheck, title: 'Add your details', text: 'Name, phone and how many people — that’s it. No account.' },
  { icon: MessageCircle, title: 'Confirm on WhatsApp', text: 'Your booking opens in WhatsApp. Tap Send and we confirm your spot.' },
]

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-accent-600">Coming up</p>
                <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Upcoming adventures</h2>
              </div>
              <Link href="/adventures" className="font-semibold text-accent-600 hover:text-accent-700">
                See all adventures →
              </Link>
            </div>
            <AdventureBrowser limit={3} />
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              Booked in <span className="text-gradient-adventure">three taps</span>
            </h2>
            <ol className="grid gap-6 md:grid-cols-3">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className={`reveal reveal-delay-${i + 1} rounded-2xl border border-gray-100 bg-gradient-to-b from-accent-50 to-white p-6`}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-500 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-accent-700">Step {i + 1}</span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold">{title}</h3>
                  <p className="text-gray-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
