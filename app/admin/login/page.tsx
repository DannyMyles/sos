'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertCircle, Loader2, Lock } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const rawNext = params.get('next') || '/admin'
  const next = rawNext.startsWith('/admin') ? rawNext : '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await adminApi.login(email.trim(), password)
      router.replace(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-3xl bg-white p-7 shadow-xl">
      <div className="mb-2 text-center">
        <Image src="/SOA Logo-03.png" alt="Source of Adventure" width={64} height={64} className="mx-auto mb-3" />
        <h1 className="text-2xl font-bold">Admin sign in</h1>
        <p className="text-sm text-gray-500">Manage adventures and bookings</p>
      </div>
      <div>
        <label htmlFor="a-email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
        <input id="a-email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
      </div>
      <div>
        <label htmlFor="a-pass" className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
        <input id="a-pass" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="field" />
      </div>
      {error && (
        <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}
      <button type="submit" disabled={busy} className="btn-adventure inline-flex w-full items-center justify-center gap-2 disabled:opacity-60">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
        Sign in
      </button>
    </form>
  )
}

export default function AdminLogin() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-accent-50 to-green-50 p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  )
}
