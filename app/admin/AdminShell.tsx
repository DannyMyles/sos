'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CalendarCheck, ExternalLink, Loader2, LogOut, Mountain } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'

const NAV = [
  { href: '/admin', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/adventures', label: 'Adventures', icon: Mountain },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname.startsWith('/admin/login')
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    if (isLogin) return
    adminApi.me().then((r) => setUser(r.user)).catch(() => {})
  }, [isLogin])

  if (isLogin) return <>{children}</>
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent-500" />
      </div>
    )
  }

  const logout = async () => {
    await adminApi.logout()
    router.replace('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4">
          <Link href="/admin" className="flex shrink-0 items-center gap-2">
            <Image src="/SOA Logo-03.png" alt="SOA Admin" width={36} height={36} className="h-9 w-9 shrink-0" />
            <span className="hidden font-bold sm:inline">SOA Admin</span>
          </Link>
          <nav className="flex gap-1 rounded-full bg-gray-100 p-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
                    active ? 'bg-white text-accent-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="flex shrink-0 items-center">
            <Link href="/" target="_blank" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="View site">
              <ExternalLink className="h-5 w-5" />
            </Link>
            <button onClick={logout} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="Sign out" title={`Signed in as ${user.name}`}>
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">{children}</main>
    </div>
  )
}
