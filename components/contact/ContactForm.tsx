'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle, Loader2, MessageCircle } from 'lucide-react'
import { api } from '@/lib/api'
import { whatsappLink } from '@/lib/contact'
import { PHONE_REGEX } from '@/lib/whatsappHandoff'

const TOPICS = ['Adventures & Tours', 'Fitness Classes', 'Group Activities', 'Corporate / Private Trip', 'Partnership', 'Other']

/**
 * Sends the message to the team's inbox through the shared API (as the
 * `sos` app). If email delivery is down, the same message can go out on
 * WhatsApp in one tap, so nothing the visitor typed is lost.
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const asWhatsApp = () =>
    whatsappLink(
      [`Hi Source of Adventure, I'm ${form.name || 'interested'}.`, form.service && `Topic: ${form.service}`, form.message]
        .filter(Boolean)
        .join('\n')
    )

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!PHONE_REGEX.test(form.phone.trim())) {
      setError('Please enter a valid phone number, e.g. 0712 345 678')
      return
    }
    setError('')
    setState('sending')
    try {
      await api.contact({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        service: form.service || undefined,
        message: form.message.trim(),
      })
      setState('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your message.')
      setState('idle')
    }
  }

  if (state === 'sent') {
    return (
      <div className="py-10 text-center">
        <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
        <h3 className="mb-2 text-2xl font-bold">Message sent!</h3>
        <p className="text-gray-600">Thanks, {form.name.split(' ')[0]} — we’ll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-gray-700">Full name</label>
          <input id="c-name" required maxLength={100} autoComplete="name" value={form.name} onChange={set('name')} className="field" />
        </div>
        <div>
          <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
          <input id="c-phone" type="tel" inputMode="tel" required maxLength={20} autoComplete="tel" value={form.phone}
            onChange={set('phone')} className="field" placeholder="0712 345 678" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-gray-700">
            Email <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input id="c-email" type="email" maxLength={255} autoComplete="email" value={form.email} onChange={set('email')} className="field" />
        </div>
        <div>
          <label htmlFor="c-topic" className="mb-1.5 block text-sm font-medium text-gray-700">Interested in</label>
          <select id="c-topic" value={form.service} onChange={set('service')} className="field">
            <option value="">Select an option</option>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
        <textarea id="c-message" required maxLength={5000} rows={4} value={form.message} onChange={set('message')}
          className="field" placeholder="Tell us about your group, dates or questions…" />
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </p>
          <a href={asWhatsApp()} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 font-semibold text-green-700 hover:underline">
            <MessageCircle className="h-4 w-4" /> Send this on WhatsApp instead
          </a>
        </div>
      )}

      <button type="submit" disabled={state === 'sending'} className="btn-adventure inline-flex w-full items-center justify-center gap-2 py-4 text-lg disabled:opacity-60">
        {state === 'sending' && <Loader2 className="h-5 w-5 animate-spin" />}
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
