'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Calendar, Check, Loader2, MapPin, MessageCircle, RefreshCw, Search, Users, X } from 'lucide-react'
import { AdminBooking, BookingStatus, adminApi, waNumber } from '@/lib/adminApi'
import { formatDate, formatKES } from '@/lib/api'

const FILTERS: { value: BookingStatus | 'all'; label: string }[] = [
  { value: 'pending', label: 'To confirm' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'all', label: 'All' },
]

const STATUS_STYLE: Record<BookingStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-200 text-gray-600',
}

export default function BookingsDashboard() {
  const [bookings, setBookings] = useState<AdminBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<BookingStatus | 'all'>('pending')
  const [query, setQuery] = useState('')
  const [busyId, setBusyId] = useState<number | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    adminApi
      .bookings()
      .then(setBookings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])
  useEffect(load, [load])

  const counts = useMemo(() => {
    const c = { pending: 0, confirmed: 0, cancelled: 0, people: 0 }
    for (const b of bookings) {
      c[b.status]++
      if (b.status === 'confirmed') c.people += b.participants
    }
    return c
  }, [bookings])

  const q = query.trim().toLowerCase()
  const visible = bookings
    .filter((b) => filter === 'all' || b.status === filter)
    .filter(
      (b) =>
        !q ||
        [b.attendeeName, b.attendeePhone, b.ticketNumber, b.event.title].some((v) => v.toLowerCase().includes(q))
    )

  const setStatus = async (b: AdminBooking, status: BookingStatus) => {
    setBusyId(b.id)
    try {
      await adminApi.setBookingStatus(b.id, status)
      setBookings((list) => list.map((x) => (x.id === b.id ? { ...x, status } : x)))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Could not update the booking')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Bookings</h1>
          <p className="text-gray-500">Confirm bookings once you’ve agreed details on WhatsApp.</p>
        </div>
        <button onClick={load} className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 hover:bg-gray-50" aria-label="Refresh">
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: 'To confirm', value: counts.pending, tone: 'text-amber-600' },
          { label: 'Confirmed', value: counts.confirmed, tone: 'text-green-600' },
          { label: 'People confirmed', value: counts.people, tone: 'text-accent-600' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-4">
            <p className={`text-2xl font-bold md:text-3xl ${s.tone}`}>{s.value}</p>
            <p className="text-xs text-gray-500 md:text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.value ? 'bg-accent-500 text-white' : 'border border-gray-200 bg-white text-gray-700 hover:border-accent-300'
              }`}
            >
              {f.label}
              {f.value !== 'all' && <span className="ml-1.5 opacity-75">{counts[f.value]}</span>}
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name, phone, reference…" className="field pl-9" aria-label="Search bookings" />
        </div>
      </div>

      {loading && bookings.length === 0 ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-accent-500" /></div>
      ) : error ? (
        <p className="rounded-2xl bg-red-50 p-6 text-red-700">{error}</p>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          {bookings.length === 0 ? 'No bookings yet — they’ll appear here as soon as someone books.' : 'Nothing here.'}
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((b) => (
            <li key={b.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-bold">{b.attendeeName}</p>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[b.status]}`}>
                      {b.status === 'pending' ? 'To confirm' : b.status}
                    </span>
                    <span className="font-mono text-xs text-gray-400">{b.ticketNumber}</span>
                  </div>
                  <p className="font-medium text-gray-800">{b.event.title}</p>
                  <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(b.event.date)}, {b.event.time}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{b.event.location}</span>
                    <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{b.participants} {b.participants === 1 ? 'person' : 'people'}{b.total > 0 && ` · ${formatKES(b.total)}`}</span>
                  </p>
                  {b.notes && <p className="text-sm italic text-gray-500">“{b.notes}”</p>}
                  <p className="text-xs text-gray-400">Booked {new Date(b.createdAt).toLocaleString('en-KE')}</p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <a
                    href={`https://wa.me/${waNumber(b.attendeePhone)}?text=${encodeURIComponent(`Hi ${b.attendeeName}, about your booking ${b.ticketNumber} for ${b.event.title}: `)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[#1ebe5b]"
                  >
                    <MessageCircle className="h-4 w-4" /> {b.attendeePhone}
                  </a>
                  {b.status !== 'confirmed' && (
                    <button
                      onClick={() => setStatus(b, 'confirmed')}
                      disabled={busyId === b.id}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-3.5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                      <Check className="h-4 w-4" /> Confirm
                    </button>
                  )}
                  {b.status !== 'cancelled' && (
                    <button
                      onClick={() => confirm(`Cancel ${b.attendeeName}'s booking? Their spots are released.`) && setStatus(b, 'cancelled')}
                      disabled={busyId === b.id}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <X className="h-4 w-4" /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
