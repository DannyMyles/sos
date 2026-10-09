'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ArrowLeftRight,
  CalendarCheck,
  ExternalLink,
  FileText,
  Inbox,
  LayoutDashboard,
  Layers,
  Loader2,
  LogOut,
  Mail,
  Menu,
  Mountain,
  Settings,
  X,
} from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import { Toaster, cx } from '@/components/admin-kit/ui'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
  { href: '/admin/adventures', label: 'Adventures & events', icon: Mountain },
  { href: '/admin/services', label: 'Activities & classes', icon: Layers },
  { href: '/admin/content', label: 'Website content', icon: FileText },
  { href: '/admin/emails', label: 'Email log', icon: Mail },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

// The other app sharing this backend, for admins who manage both.
const PARTNER_ADMIN_URL = process.env.NEXT_PUBLIC_PARTNER_ADMIN_URL
const PARTNER_NAME = process.env.NEXT_PUBLIC_PARTNER_NAME || 'other site'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname.startsWith('/admin/login')
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (isLogin) return
    adminApi.me().then((r) => setUser(r.user)).catch(() => {})
  }, [isLogin])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMenuOpen(false), [pathname])

  if (isLogin) return <>{children}</>
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-accent-500" />
      </div>
    )
  }

  const logout = async () => {
    await adminApi.logout()
    router.replace('/admin/login')
  }
  const isActive = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href))

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link href="/admin" className="flex items-center gap-2.5 px-5 py-5">
        <Image src="/SOA Logo-03.png" alt="" width={36} height={36} className="h-9 w-9" />
        <span className="leading-tight">
          <span className="block font-bold text-white">Source of Adventure</span>
          <span className="block text-xs text-white/50">Admin</span>
        </span>
      </Link>
      <nav className="flex-1 space-y-0.5 px-3" aria-label="Admin">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? 'page' : undefined}
            className={cx(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              isActive(href) ? 'bg-accent-500 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
            )}
          >
            <Icon className="h-4 w-4" /> {label}
          </Link>
        ))}
      </nav>
      <div className="space-y-0.5 border-t border-white/10 px-3 py-4 text-sm">
        {PARTNER_ADMIN_URL && (
          <a href={PARTNER_ADMIN_URL} className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white">
            <ArrowLeftRight className="h-4 w-4" /> Switch to {PARTNER_NAME}
          </a>
        )}
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white">
          <ExternalLink className="h-4 w-4" /> View website
        </Link>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
        <p className="truncate px-3 pt-2 text-xs text-white/40" title={user.email}>
          {user.email}
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-stone-900 lg:block">{sidebar}</aside>
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-stone-900">{sidebar}</aside>
        </div>
      )}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <button onClick={() => setMenuOpen((o) => !o)} className="rounded-lg p-2 text-gray-700 hover:bg-gray-100" aria-label="Open menu">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="font-bold">SOA Admin</span>
        <span className="w-9" />
      </header>
      <main className="px-4 py-6 md:py-8 lg:ml-64 lg:px-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  )
}
