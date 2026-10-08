'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, Calendar, CheckCircle, Loader2, MapPin, MessageCircle, Minus, Plus, X } from 'lucide-react'
import { Adventure, BookingResult, api, formatDate, formatKES, priceLabel } from '@/lib/api'
import {
  PHONE_REGEX,
  cancelWhatsAppTab,
  loadContactDetails,
  reserveWhatsAppTab,
  saveContactDetails,
  sendToWhatsApp,
} from '@/lib/whatsappHandoff'

interface BookingModalProps {
  adventure: Adventure
  onClose: () => void
  onBooked?: () => void
}

/**
 * Book an adventure in one short form: name, phone, how many people.
 * The booking is saved first (so the spot is held), then WhatsApp opens
 * with the full booking summary — the customer just taps Send and the
 * team confirms the spot and payment in that chat.
 */
export default function BookingModal({ adventure, onClose, onBooked }: BookingModalProps) {
  const maxPeople = Math.max(1, Math.min(20, adventure.spotsRemaining))
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [people, setPeople] = useState(1)
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [booked, setBooked] = useState<BookingResult | null>(null)
  const [opened, setOpened] = useState(false)
  const firstField = useRef<HTMLInputElement>(null)

  // Callers pass onClose inline; keep the latest without re-running setup.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const saved = loadContactDetails()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(saved.name ?? '')
    setPhone(saved.phone ?? '')
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!PHONE_REGEX.test(phone.trim())) {
      setError('Please enter a valid phone number, e.g. 0712 345 678')
      return
    }
    setError('')
    setSubmitting(true)
    const tab = reserveWhatsAppTab()
    try {
      const result = await api.book(adventure.slug, {
        attendeeName: name.trim(),
        attendeePhone: phone.trim(),
        participants: people,
        notes: notes.trim() || undefined,
      })
      saveContactDetails({ name: name.trim(), phone: phone.trim() })
      if (result.whatsapp) setOpened(sendToWhatsApp(tab, result.whatsapp.url))
      else cancelWhatsAppTab(tab)
      setBooked(result)
      onBooked?.()
    } catch (err) {
      cancelWhatsAppTab(tab)
      setError(err instanceof Error ? err.message : 'Could not complete your booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div
        className="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl animate-[sheet-in_200ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-32 sm:h-36 overflow-hidden rounded-t-3xl">
          {adventure.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={adventure.image} alt="" className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-5 right-5 text-white">
            <h2 id="booking-title" className="text-xl font-bold leading-tight">
              {booked ? 'Spot reserved!' : adventure.title}
            </h2>
            {!booked && (
              <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-white/90">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(adventure.date, { weekday: 'short', day: 'numeric', month: 'short' })}, {adventure.time}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {adventure.location}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {booked ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
              <p className="text-gray-700">
                Booking reference <span className="font-mono font-semibold">{booked.registration.ticketNumber}</span>
              </p>
              <p className="mt-1 mb-6 text-sm text-gray-500">
                {opened
                  ? 'WhatsApp has opened with your booking — tap Send and we’ll confirm your spot.'
                  : 'Send your booking to us on WhatsApp and we’ll confirm your spot.'}
              </p>
              {booked.whatsapp && (
                <a
                  href={booked.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
                >
                  <MessageCircle className="h-5 w-5" />
                  {opened ? 'Open WhatsApp again' : 'Send booking on WhatsApp'}
                </a>
              )}
              <button onClick={onClose} className="mt-3 w-full py-2 text-gray-600 hover:text-accent-600">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label htmlFor="bk-name" className="mb-1.5 block text-sm font-medium text-gray-700">Full name</label>
                <input ref={firstField} id="bk-name" required maxLength={100} autoComplete="name" value={name}
                  onChange={(e) => setName(e.target.value)} className="field" placeholder="Jane Wanjiku" />
              </div>
              <div>
                <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-medium text-gray-700">Phone (WhatsApp)</label>
                <input id="bk-phone" type="tel" inputMode="tel" required maxLength={20} autoComplete="tel" value={phone}
                  onChange={(e) => setPhone(e.target.value)} className="field" placeholder="0712 345 678" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  People <span className="font-normal text-gray-400">({adventure.spotsRemaining} spots left)</span>
                </span>
                <div className="flex items-center rounded-xl border border-gray-200">
                  <button type="button" onClick={() => setPeople((n) => Math.max(1, n - 1))} disabled={people <= 1}
                    className="rounded-l-xl p-2.5 hover:bg-gray-50 disabled:opacity-40" aria-label="Fewer people">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-semibold" aria-live="polite">{people}</span>
                  <button type="button" onClick={() => setPeople((n) => Math.min(maxPeople, n + 1))} disabled={people >= maxPeople}
                    className="rounded-r-xl p-2.5 hover:bg-gray-50 disabled:opacity-40" aria-label="More people">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <details>
                <summary className="cursor-pointer select-none text-sm font-medium text-accent-600">Add a note (optional)</summary>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} rows={2}
                  className="field mt-2" placeholder="Pickup point, dietary needs, questions…" aria-label="Note" />
              </details>

              <div className="flex justify-between rounded-xl bg-accent-50 px-4 py-3 text-sm">
                <span className="text-gray-600">
                  {adventure.price > 0 ? `${formatKES(adventure.price)} × ${people}` : priceLabel(0)}
                </span>
                {adventure.price > 0 && <span className="font-bold text-gray-900">{formatKES(adventure.price * people)}</span>}
              </div>

              {error && (
                <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-semibold text-white transition-colors hover:bg-[#1ebe5b] disabled:opacity-60">
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />}
                {submitting ? 'Booking…' : 'Book on WhatsApp'}
              </button>
              <p className="text-center text-xs text-gray-500">No payment now — we confirm your spot and payment on WhatsApp.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
