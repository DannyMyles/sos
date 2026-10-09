'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertCircle, CheckCircle, Info, Loader2, MessageCircle, X } from 'lucide-react'
import { EnquiryResult, Service, api, newRequestId, servicePriceLabel } from '@/lib/api'
import { useSite } from '@/components/site/SiteProvider'
import {
  PHONE_REGEX,
  cancelWhatsAppTab,
  loadContactDetails,
  reserveWhatsAppTab,
  saveContactDetails,
  sendToWhatsApp,
} from '@/lib/whatsappHandoff'

interface Props {
  service: Service
  onClose: () => void
  /** Corporate collects company details and is priced by quotation. */
  mode?: 'individual' | 'corporate'
  initialPackageId?: number
}

/**
 * Book or ask about a service (activity, class or corporate package). The
 * request is saved first — so the team sees it in the admin even if WhatsApp
 * never opens — then WhatsApp opens with every detail prefilled.
 */
export default function ServiceEnquiryModal({ service, onClose, mode = 'individual', initialPackageId }: Props) {
  const site = useSite()
  const corporate = mode === 'corporate'
  const packages = service.packages ?? []
  const [packageId, setPackageId] = useState<number | ''>(initialPackageId ?? (packages.length === 1 ? packages[0].id : ''))
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    participants: String(service.minParticipants ?? 1),
    preferredDate: '',
    location: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<EnquiryResult | null>(null)
  const [opened, setOpened] = useState(false)
  const requestId = useRef(newRequestId())
  const firstField = useRef<HTMLInputElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const saved = loadContactDetails()
    setForm((f) => ({ ...f, name: saved.name ?? '', phone: saved.phone ?? '', email: saved.email ?? '' }))
    firstField.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current()
    window.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [])

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const today = new Date().toISOString().slice(0, 10)
  const pkg = packages.find((p) => p.id === packageId)
  const min = pkg?.minParticipants ?? service.minParticipants
  const max = pkg?.maxParticipants ?? service.maxParticipants

  const validate = () => {
    const next: Record<string, string> = {}
    if (corporate && form.company.trim().length < 2) next.company = 'Please enter your company or organisation'
    if (form.name.trim().length < 2) next.name = 'Please enter your name'
    if (!PHONE_REGEX.test(form.phone.trim())) next.phone = 'Enter a valid phone number, e.g. 0712 345 678'
    if (corporate && !form.email.trim()) next.email = 'We need an email to send your quote'
    else if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Enter a valid email or leave it blank'
    const n = Number(form.participants)
    if (!Number.isInteger(n) || n < 1) next.participants = 'At least 1 person'
    else if (min && n < min) next.participants = `This needs at least ${min} people`
    else if (!corporate && max && n > max) next.participants = `Up to ${max} people — message us for bigger groups`
    if (form.preferredDate && form.preferredDate < today) next.preferredDate = 'Choose a future date'
    if (packages.length > 1 && packageId === '') next.packageId = 'Choose a package'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setError('')
    setSubmitting(true)
    const tab = reserveWhatsAppTab()
    try {
      const result = await api.enquire({
        type: corporate ? 'corporate' : 'booking',
        serviceId: Number(service.id),
        packageId: packageId === '' ? undefined : packageId,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        company: corporate ? form.company.trim() : undefined,
        participants: Number(form.participants),
        preferredDate: form.preferredDate || undefined,
        location: form.location.trim() || undefined,
        message: form.message.trim() || undefined,
        requestId: requestId.current,
      })
      saveContactDetails({ name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() || undefined })
      if (result.whatsapp) setOpened(sendToWhatsApp(tab, result.whatsapp.url))
      else cancelWhatsAppTab(tab)
      setDone(result)
    } catch (err) {
      cancelWhatsAppTab(tab)
      setError(err instanceof Error ? err.message : 'Could not send your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const notice = site.settings.booking?.whatsappNotice || 'Opening WhatsApp does not confirm your booking — we reply to confirm.'

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="svc-title">
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-28 overflow-hidden rounded-t-3xl bg-stone-800">
          {service.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={service.image} alt="" className="h-full w-full object-cover opacity-80" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
          <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-5 right-5 text-white">
            {!done && <p className="text-xs font-semibold uppercase tracking-wider text-white/75">{corporate ? 'Corporate booking / quote' : 'Book or enquire'}</p>}
            <h2 id="svc-title" className="text-xl font-bold leading-tight">{done ? 'Request sent!' : service.title}</h2>
            {!done && !corporate && <p className="text-xs text-white/85">{servicePriceLabel(service)}{service.schedule ? ` · ${service.schedule}` : ''}</p>}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {done ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
              <p className="text-gray-700">
                Reference <span className="font-mono font-semibold">{done.enquiry.reference}</span>
              </p>
              <p className="mb-6 mt-1 text-sm text-gray-500">
                {opened ? 'WhatsApp has opened with your request — tap Send and we’ll confirm.' : 'Send your request on WhatsApp and we’ll confirm.'}
                {form.email && ' A copy is on its way to your inbox.'}
              </p>
              {done.whatsapp && (
                <a href={done.whatsapp.url} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-semibold text-white hover:bg-[#1ebe5b]">
                  <MessageCircle className="h-5 w-5" /> {opened ? 'Open WhatsApp again' : 'Send on WhatsApp'}
                </a>
              )}
              <p className="mt-3 text-xs text-gray-500">{notice}</p>
              <button onClick={onClose} className="mt-3 w-full py-2 text-gray-600 hover:text-accent-600">Done</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              {packages.length > 0 && (
                <fieldset>
                  <legend className="mb-1.5 text-sm font-medium text-gray-700">Package</legend>
                  <div className="grid gap-2">
                    {packages.map((p) => (
                      <label key={p.id} className={`flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-3 text-sm ${packageId === p.id ? 'border-accent-500 bg-accent-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <span className="flex items-start gap-2">
                          <input type="radio" name="package" checked={packageId === p.id} onChange={() => setPackageId(p.id)} className="mt-0.5 accent-orange-600" />
                          <span>
                            <span className="block font-semibold text-gray-900">{p.name}</span>
                            {p.description && <span className="block text-gray-500">{p.description}</span>}
                          </span>
                        </span>
                        <span className="shrink-0 font-semibold text-gray-900">{servicePriceLabel(p)}</span>
                      </label>
                    ))}
                  </div>
                  {errors.packageId && <p className="mt-1 text-xs font-medium text-red-600">{errors.packageId}</p>}
                </fieldset>
              )}
              {corporate && (
                <Field id="sv-company" label="Company / organisation" error={errors.company}>
                  <input id="sv-company" maxLength={160} autoComplete="organization" value={form.company} onChange={set('company')} className="field" aria-invalid={!!errors.company} />
                </Field>
              )}
              <Field id="sv-name" label={corporate ? 'Contact person' : 'Full name'} error={errors.name}>
                <input ref={firstField} id="sv-name" maxLength={100} autoComplete="name" value={form.name} onChange={set('name')} className="field" aria-invalid={!!errors.name} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="sv-phone" label="Phone (WhatsApp)" error={errors.phone}>
                  <input id="sv-phone" type="tel" inputMode="tel" maxLength={20} autoComplete="tel" value={form.phone} onChange={set('phone')} className="field" placeholder="0712 345 678" aria-invalid={!!errors.phone} />
                </Field>
                <Field id="sv-email" label="Email" hint={corporate ? 'for your quote' : 'optional'} error={errors.email}>
                  <input id="sv-email" type="email" maxLength={255} autoComplete="email" value={form.email} onChange={set('email')} className="field" aria-invalid={!!errors.email} />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="sv-people" label={corporate ? 'Number of people' : 'People'} hint={min || max ? [min && `min ${min}`, max && `max ${max}`].filter(Boolean).join(', ') : undefined} error={errors.participants}>
                  <input id="sv-people" type="number" min={1} value={form.participants} onChange={set('participants')} className="field" aria-invalid={!!errors.participants} />
                </Field>
                <Field id="sv-date" label="Preferred date" hint="optional" error={errors.preferredDate}>
                  <input id="sv-date" type="date" min={today} value={form.preferredDate} onChange={set('preferredDate')} className="field" aria-invalid={!!errors.preferredDate} />
                </Field>
              </div>
              {corporate && (
                <Field id="sv-location" label="Preferred location" hint="optional">
                  <input id="sv-location" maxLength={200} value={form.location} onChange={set('location')} className="field" placeholder="Ngong Hills, Karura, out of town…" />
                </Field>
              )}
              <Field id="sv-msg" label={corporate ? 'Goals & special requirements' : 'Anything we should know?'} hint="optional">
                <textarea id="sv-msg" rows={2} maxLength={2000} value={form.message} onChange={set('message')} className="field" placeholder={corporate ? 'Fitness levels, transport, catering, budget…' : 'Experience level, pickup point, questions…'} />
              </Field>
              {service.bookingRequirements && (
                <p className="flex items-start gap-2 rounded-xl bg-stone-50 p-3 text-xs text-stone-600">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" /> {service.bookingRequirements}
                </p>
              )}
              {error && (
                <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
                </div>
              )}
              <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-semibold text-white hover:bg-[#1ebe5b] disabled:opacity-60">
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />}
                {submitting ? 'Sending…' : corporate ? 'Request quote on WhatsApp' : 'Continue on WhatsApp'}
              </button>
              <p className="text-center text-xs text-gray-500">{notice}</p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label} {hint && <span className="font-normal text-gray-400">({hint})</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}
