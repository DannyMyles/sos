'use client'

import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'

/** Footer newsletter sign-up — saved to Source of Adventure's own subscriber list. */
export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    try {
      await api.subscribe(email.trim())
      setState('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not subscribe right now.')
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <p className="flex items-center gap-2 text-green-400">
        <CheckCircle className="h-5 w-5" /> You’re subscribed — see you out there!
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoComplete="email"
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-500 focus:border-accent focus:outline-none"
      />
      <button type="submit" disabled={state === 'sending'} className="btn-adventure inline-flex w-full items-center justify-center gap-2 disabled:opacity-60">
        {state === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
        Subscribe
      </button>
      {state === 'error' && <p role="alert" className="text-sm text-red-400">{error}</p>}
    </form>
  )
}
