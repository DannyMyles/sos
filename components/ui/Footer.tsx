import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { getSite, telHref, waLink } from '@/lib/site'
import NewsletterForm from './NewsletterForm'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Adventures', href: '/adventures' },
  { name: 'Events', href: '/events' },
  { name: 'Calendar', href: '/calendar' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
]

const services = [
  { name: 'Group Adventures', href: '/adventures' },
  { name: 'Outdoor Activities', href: '/activities' },
  { name: 'Fitness Classes', href: '/activities#classes' },
  { name: 'Corporate & Team Building', href: '/corporate' },
]

const SOCIAL_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  x: 'X',
  linkedin: 'LinkedIn',
}

const Footer = async () => {
  const site = await getSite()
  const socials = Object.entries(site.settings.social ?? {}).filter(([, url]) => url)
  return (
    <footer className="relative overflow-hidden bg-stone-950 pb-24 text-white sm:pb-0">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-accent-500/20 blur-3xl" aria-hidden />
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-14 md:flex-row md:items-end md:py-20">
          <div className="reveal max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-300">Your next trip is waiting</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Pack light. <span className="text-accent-400">We’ll handle the rest.</span>
            </h2>
          </div>
          <div className="reveal flex flex-wrap gap-3">
            <Link href="/adventures" className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 font-bold text-white transition-colors hover:bg-accent-600">
              See adventures <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a href={waLink(site, `Hi ${site.name}! I’d like to plan a trip.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-bold text-white transition-colors hover:bg-white/10">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-5 flex items-center gap-3">
              <Image src="/SOA Logo-03.png" alt={`${site.name} logo`} width={72} height={72} />
              <div>
                <span className="text-xl font-bold text-gradient-adventure">{site.name}</span>
                <p className="text-xs text-gray-300">Fun &amp; Fitness</p>
              </div>
            </Link>
            <p className="mb-5 text-gray-400">
              {site.tagline || 'Adventures that combine thrilling experiences with fitness and fun.'}
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href={waLink(site)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent">
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              </li>
              {site.contactPhone && (
                <li>
                  <a href={telHref(site.contactPhone)} className="flex items-center gap-2 hover:text-accent">
                    <Phone className="h-4 w-4" /> {site.contactPhone}
                  </a>
                </li>
              )}
              {site.contactEmail && (
                <li>
                  <a href={`mailto:${site.contactEmail}`} className="flex items-center gap-2 break-all hover:text-accent">
                    <Mail className="h-4 w-4 shrink-0" /> {site.contactEmail}
                  </a>
                </li>
              )}
              {site.location && (
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {site.location}
                </li>
              )}
              {site.settings.hours && (
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {site.settings.hours}
                </li>
              )}
            </ul>
          </div>

          <nav aria-label="Quick links">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="What we do">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">What We Do</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-white/70 transition-colors hover:text-white">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Stay Updated</h3>
            <p className="mb-4 text-gray-400">New adventures and offers, straight to your inbox.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-sm text-white/45">
          {socials.length > 0 && (
            <p className="mb-3 flex flex-wrap justify-center gap-4">
              {socials.map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  {SOCIAL_LABELS[key] ?? key}
                </a>
              ))}
            </p>
          )}
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
