'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react'
import { Adventure, formatDate, priceLabel } from '@/lib/api'
import { difficultyClass } from '@/components/adventures/AdventureCard'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Calendar day key in Nairobi time, e.g. "2026-11-02" (event dates are stored as calendar dates). */
const dayKey = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' })

interface CalendarProps {
  adventures: Adventure[]
  onBook: (adventure: Adventure) => void
}

/**
 * Month grid with a dot per adventure day, plus the selected day's
 * adventures underneath (works the same on phones and desktops — no
 * horizontally-scrolling tables).
 */
export default function Calendar({ adventures, onBook }: CalendarProps) {
  const firstUpcoming = adventures[0] ? new Date(adventures[0].date) : new Date()
  const [month, setMonth] = useState(() => new Date(firstUpcoming.getFullYear(), firstUpcoming.getMonth(), 1))
  const [selected, setSelected] = useState(() => dayKey(firstUpcoming))

  const byDay = useMemo(() => {
    const map = new Map<string, Adventure[]>()
    for (const a of adventures) {
      const key = dayKey(new Date(a.date))
      map.set(key, [...(map.get(key) ?? []), a])
    }
    return map
  }, [adventures])

  const cells = useMemo(() => {
    const start = new Date(month.getFullYear(), month.getMonth(), 1 - month.getDay())
    return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
  }, [month])

  const today = dayKey(new Date())
  const selectedAdventures = byDay.get(selected) ?? []
  const shift = (delta: number) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1))

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <button onClick={() => shift(-1)} className="rounded-lg p-2 hover:bg-gray-100" aria-label="Previous month">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold sm:text-xl">
          {month.toLocaleDateString('en-KE', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => shift(1)} className="rounded-lg p-2 hover:bg-gray-100" aria-label="Next month">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date) => {
          const key = dayKey(date)
          const inMonth = date.getMonth() === month.getMonth()
          const count = byDay.get(key)?.length ?? 0
          const isSelected = key === selected
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              aria-pressed={isSelected}
              aria-label={`${date.toDateString()}${count ? `, ${count} adventure${count > 1 ? 's' : ''}` : ''}`}
              className={`flex h-11 sm:h-14 flex-col items-center justify-center rounded-xl text-sm transition-colors ${
                isSelected
                  ? 'bg-accent-500 font-bold text-white'
                  : count
                    ? 'bg-accent-50 font-semibold text-accent-800 hover:bg-accent-100'
                    : 'hover:bg-gray-50'
              } ${inMonth ? '' : 'opacity-40'} ${key === today && !isSelected ? 'ring-2 ring-accent-300' : ''}`}
            >
              {date.getDate()}
              {count > 0 && (
                <span className={`mt-0.5 h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-accent-500'}`} />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-bold text-gray-900">
          {formatDate(`${selected}T12:00:00Z`, { weekday: 'long', day: 'numeric', month: 'long' })}
        </h3>
        {selectedAdventures.length === 0 ? (
          <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">No adventures on this day — pick a highlighted date.</p>
        ) : (
          <ul className="space-y-3">
            {selectedAdventures.map((a) => (
              <li key={a.id} className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold">{a.title}</p>
                    {a.difficulty && (
                      <span className={`rounded-full px-2 py-0.5 text-xs ${difficultyClass(a.difficulty)}`}>{a.difficulty}</span>
                    )}
                  </div>
                  <p className="mt-1 flex flex-wrap gap-x-3 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {a.time}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {a.location}</span>
                    <span>{priceLabel(a.price)}</span>
                  </p>
                </div>
                <button
                  onClick={() => onBook(a)}
                  disabled={a.spotsRemaining <= 0}
                  className="btn-adventure shrink-0 px-5 py-2 text-sm disabled:opacity-50"
                >
                  {a.spotsRemaining <= 0 ? 'Full' : `Book · ${a.spotsRemaining} left`}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
