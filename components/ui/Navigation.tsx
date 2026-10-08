'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Mail, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/contact'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Adventures', path: '/adventures' },
  { name: 'Calendar', path: '/calendar' },
  { name: 'Activities', path: '/activities' },
  { name: 'Aerobics', path: '/aerobics' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path))

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border px-3 py-2 transition-all duration-300 sm:px-4 lg:rounded-full ${
          scrolled || open
            ? 'border-stone-200/80 bg-white/85 shadow-[0_8px_30px_-12px_rgba(41,37,36,0.25)] backdrop-blur-xl'
            : 'border-transparent bg-white/60 backdrop-blur-md'
        }`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Source of Adventure home">
          <Image src="/SOA Logo-03.png" alt="" width={44} height={44} priority className="h-10 w-10 shrink-0" />
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight text-stone-900">Source of Adventure</span>
            <span className="block text-[11px] font-medium text-stone-500">Fun &amp; Fitness</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <Link
              key={l.path}
              href={l.path}
              aria-current={isActive(l.path) ? 'page' : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                isActive(l.path) ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/adventures"
            className="hidden items-center gap-1.5 rounded-full bg-accent-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-600 sm:inline-flex"
          >
            Book now <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full p-2.5 text-stone-900 transition-colors hover:bg-stone-100 xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu sheet (phones & tablets) */}
      <div
        className={`fixed inset-x-3 top-[5rem] bottom-3 z-40 overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl transition-all duration-300 xl:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((l) => (
            <Link
              key={l.path}
              href={l.path}
              className={`flex items-center justify-between border-b border-stone-100 py-3.5 text-2xl font-extrabold tracking-tight ${
                isActive(l.path) ? 'text-accent-600' : 'text-stone-900'
              }`}
            >
              {l.name}
              <ArrowUpRight className="h-5 w-5 text-stone-300" />
            </Link>
          ))}
        </nav>
        <div className="mt-6 grid gap-3">
          <Link href="/adventures" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-500 py-3.5 font-bold text-white">
            Book an adventure
          </Link>
          <a
            href={whatsappLink('Hi Source of Adventure! I have a question.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 font-bold text-white"
          >
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </a>
        </div>
        <div className="mt-6 space-y-2 text-sm text-stone-500">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2"><Phone className="h-4 w-4" /> {PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-2"><Mail className="h-4 w-4" /> {EMAIL}</a>
        </div>
      </div>
    </header>
  )
}
