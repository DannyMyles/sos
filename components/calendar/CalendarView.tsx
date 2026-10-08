'use client'

import { useState } from 'react'
import { Loader2, RefreshCw } from 'lucide-react'
import { Adventure, formatDate, priceLabel } from '@/lib/api'
import Calendar from '@/components/ui/Calendar'
import BookingModal from '@/components/booking/BookingModal'
import { useAdventures } from '@/components/adventures/AdventureBrowser'

export default function CalendarView() {
  const { adventures, loading, error, reload } = useAdventures()
  const [booking, setBooking] = useState<Adventure | null>(null)
  const [quickPick, setQuickPick] = useState('')

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-accent-500" />
      </div>
    )
  }
  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center">
        <p className="mb-4 text-gray-700">{error}</p>
        <button onClick={reload} className="btn-adventure-outline inline-flex items-center gap-2">
          <RefreshCw className="h-4 w-4" /> Try again
        </button>
      </div>
    )
  }

  const available = adventures.filter((a) => a.spotsRemaining > 0)
  const totalSpots = available.reduce((sum, a) => sum + a.spotsRemaining, 0)

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 lg:col-span-2">
        <Calendar adventures={adventures} onBook={setBooking} />
      </div>

      <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-xl font-bold">Quick booking</h2>
          <p className="mb-4 text-sm text-gray-600">Pick an adventure, then add your name and phone.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const a = adventures.find((x) => String(x.id) === quickPick)
              if (a) setBooking(a)
            }}
            className="space-y-3"
          >
            <label htmlFor="quick-pick" className="sr-only">Adventure</label>
            <select id="quick-pick" required value={quickPick} onChange={(e) => setQuickPick(e.target.value)} className="field">
              <option value="">Choose an adventure</option>
              {available.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title} — {formatDate(a.date)} ({priceLabel(a.price)})
                </option>
              ))}
            </select>
            <button type="submit" disabled={!quickPick} className="btn-adventure w-full disabled:opacity-50">
              Continue
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">At a glance</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Upcoming adventures</dt>
              <dd className="font-bold text-accent-600">{adventures.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Spots still open</dt>
              <dd className="font-bold text-accent-600">{totalSpots}</dd>
            </div>
          </dl>
        </div>
      </aside>

      {booking && <BookingModal adventure={booking} onClose={() => setBooking(null)} onBooked={reload} />}
    </div>
  )
}
