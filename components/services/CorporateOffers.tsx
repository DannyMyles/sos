'use client'

import { useRef, useState } from 'react'
import { AlertCircle, Building2, CheckCircle, Clock, Loader2, MapPin, MessageCircle, Users } from 'lucide-react'
import { EnquiryResult, Service, api, newRequestId, servicePriceLabel } from '@/lib/api'
import { PHONE_REGEX, cancelWhatsAppTab, reserveWhatsAppTab, sendToWhatsApp } from '@/lib/whatsappHandoff'
import { useSite } from '@/components/site/SiteProvider'
import ServiceEnquiryModal from './ServiceEnquiryModal'

/** Corporate packages (Admin → Activities & classes, audience "corporate") with booking. */
export function CorporateGrid({ services }: { services: Service[] }) {
  const [category, setCategory] = useState('All')
  const [booking, setBooking] = useState<{ service: Service; packageId?: number } | null>(null)
  const categories = ['All', ...Array.from(new Set(services.map((s) => s.category).filter(Boolean) as string[]))]
  const visible = category === 'All' ? services : services.filter((s) => s.category === category)

  if (services.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center text-stone-600">
        Corporate packages are being finalised — use the form below and we’ll tailor a programme for your team.
      </div>
    )
  }

  return (
    <>
      {categories.length > 2 && (
        <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${category === c ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 ring-1 ring-stone-200 hover:ring-accent-300'}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((s) => {
          const meta = [
            s.duration && { icon: Clock, text: s.duration },
            s.groupSize && { icon: Users, text: s.groupSize },
            s.location && { icon: MapPin, text: s.location },
          ].filter(Boolean) as { icon: typeof Clock; text: string }[]
          return (
            <article key={s.id} className="group flex flex-col overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm transition-shadow hover:shadow-xl">
              <div className="relative h-48 overflow-hidden bg-stone-200">
                {s.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
                {s.category && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-stone-800">{s.category}</span>}
                {s.popular && <span className="absolute right-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white">Popular</span>}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-bold text-stone-900">{s.title}</h3>
                <p className="mb-4 text-stone-600">{s.description}</p>
                {meta.length > 0 && (
                  <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
                    {meta.map(({ icon: Icon, text }) => (
                      <li key={text} className="inline-flex items-center gap-1.5"><Icon className="h-4 w-4 text-accent-500" /> {text}</li>
                    ))}
                  </ul>
                )}
                <ul className="mb-5 space-y-1.5 text-sm text-stone-700">
                  {s.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {f}</li>
                  ))}
                </ul>
                {s.packages.length > 0 && (
                  <div className="mb-5 space-y-2">
                    {s.packages.map((p) => (
                      <button key={p.id} type="button" disabled={!s.available} onClick={() => setBooking({ service: s, packageId: p.id })}
                        className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm ring-1 transition-colors disabled:cursor-not-allowed ${p.popular ? 'bg-accent-50 ring-accent-300' : 'ring-stone-200 hover:ring-accent-300'}`}>
                        <span>
                          <span className="block font-semibold text-stone-900">{p.name}</span>
                          {p.description && <span className="block text-xs text-stone-500">{p.description}</span>}
                        </span>
                        <span className="shrink-0 text-xs font-bold text-accent-700">{servicePriceLabel(p)}</span>
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
                  <span className="text-sm font-bold text-stone-900">{servicePriceLabel(s)}</span>
                  {s.available ? (
                    <button type="button" onClick={() => setBooking({ service: s })} className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-4 py-2 text-sm font-bold text-white hover:bg-accent-600">
                      <Building2 className="h-4 w-4" /> Get a quote
                    </button>
                  ) : (
                    <span className="rounded-full bg-stone-100 px-4 py-2 text-xs font-semibold text-stone-500">Currently unavailable</span>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
      {booking && <ServiceEnquiryModal service={booking.service} initialPackageId={booking.packageId} mode="corporate" onClose={() => setBooking(null)} />}
    </>
  )
}

/** Open-ended quote for anything not covered by one package. */
export function CorporateQuoteForm({ services }: { services: Service[] }) {
  const site = useSite()
  const [form, setForm] = useState({ company: '', name: '', phone: '', email: '', participants: '', preferredDate: '', serviceId: '', location: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState<EnquiryResult | null>(null)
  const requestId = useRef(newRequestId())
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const today = new Date().toISOString().slice(0, 10)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (form.company.trim().length < 2) next.company = 'Please enter your company, school or group'
    if (form.name.trim().length < 2) next.name = 'Please enter a contact name'
    if (!PHONE_REGEX.test(form.phone.trim())) next.phone = 'Enter a valid phone number'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Enter a valid email for your quote'
    if (form.participants && (!Number.isInteger(Number(form.participants)) || Number(form.participants) < 1)) next.participants = 'Enter a number of people'
    if (form.preferredDate && form.preferredDate < today) next.preferredDate = 'Choose a future date'
    if (!form.serviceId && !form.message.trim()) next.message = 'Tell us briefly what you have in mind'
    setErrors(next)
    if (Object.keys(next).length) return
    setError('')
    setSending(true)
    const tab = reserveWhatsAppTab()
    try {
      const result = await api.enquire({
        type: form.serviceId ? 'corporate' : 'quote',
        serviceId: form.serviceId ? Number(form.serviceId) : undefined,
        company: form.company.trim(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        participants: form.participants ? Number(form.participants) : undefined,
        preferredDate: form.preferredDate || undefined,
        location: form.location.trim() || undefined,
        message: form.message.trim() || undefined,
        requestId: requestId.current,
      })
      if (result.whatsapp) sendToWhatsApp(tab, result.whatsapp.url)
      else cancelWhatsAppTab(tab)
      setDone(result)
    } catch (err) {
      cancelWhatsAppTab(tab)
      setError(err instanceof Error ? err.message : 'Could not send your request.')
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="py-6 text-center" role="status">
        <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
        <h3 className="text-2xl font-bold text-stone-900">Quote request received</h3>
        <p className="mt-2 text-stone-600">
          Reference <span className="font-mono font-semibold text-stone-900">{done.enquiry.reference}</span>. We’ve emailed you a copy and will be in touch shortly.
        </p>
        {done.whatsapp && (
          <a href={done.whatsapp.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white hover:bg-[#1ebe5b]">
            <MessageCircle className="h-5 w-5" /> Continue on WhatsApp
          </a>
        )}
      </div>
    )
  }

  const err = (k: string) => errors[k] && <span className="mt-1 block text-xs font-medium text-red-600">{errors[k]}</span>
  const label = (text: string, hint?: string) => (
    <span className="mb-1.5 block text-sm font-medium text-stone-700">
      {text} {hint && <span className="font-normal text-stone-400">({hint})</span>}
    </span>
  )
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <label className="block sm:col-span-2">{label('Company, school or group')}<input value={form.company} onChange={set('company')} maxLength={160} autoComplete="organization" className="field" aria-invalid={!!errors.company} />{err('company')}</label>
      <label className="block">{label('Contact person')}<input value={form.name} onChange={set('name')} maxLength={100} autoComplete="name" className="field" aria-invalid={!!errors.name} />{err('name')}</label>
      <label className="block">{label('Phone (WhatsApp)')}<input type="tel" inputMode="tel" value={form.phone} onChange={set('phone')} maxLength={20} autoComplete="tel" placeholder="0712 345 678" className="field" aria-invalid={!!errors.phone} />{err('phone')}</label>
      <label className="block">{label('Email')}<input type="email" value={form.email} onChange={set('email')} maxLength={255} autoComplete="email" className="field" aria-invalid={!!errors.email} />{err('email')}</label>
      <label className="block">{label('Number of people', 'approx.')}<input type="number" min={1} value={form.participants} onChange={set('participants')} className="field" aria-invalid={!!errors.participants} />{err('participants')}</label>
      <label className="block">{label('Interested in')}
        <select value={form.serviceId} onChange={set('serviceId')} className="field">
          <option value="">Not sure / custom trip</option>
          {services.filter((s) => s.available).map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </label>
      <label className="block">{label('Preferred date', 'optional')}<input type="date" min={today} value={form.preferredDate} onChange={set('preferredDate')} className="field" aria-invalid={!!errors.preferredDate} />{err('preferredDate')}</label>
      <label className="block sm:col-span-2">{label('Preferred location', 'optional')}<input value={form.location} onChange={set('location')} maxLength={200} className="field" placeholder="Ngong Hills, Karura, Hell’s Gate, out of town…" /></label>
      <label className="block sm:col-span-2">{label('Goals & special requirements')}<textarea rows={4} value={form.message} onChange={set('message')} maxLength={2000} className="field" placeholder="What would a great day look like? Fitness levels, transport, catering, budget…" aria-invalid={!!errors.message} />{err('message')}</label>
      {error && (
        <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}
      <button type="submit" disabled={sending} className="btn-adventure inline-flex items-center justify-center gap-2 sm:col-span-2 disabled:opacity-60">
        {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Building2 className="h-5 w-5" />}
        {sending ? 'Sending…' : 'Request my quote'}
      </button>
      <p className="text-center text-xs text-stone-500 sm:col-span-2">{site.settings.booking?.whatsappNotice}</p>
    </form>
  )
}
