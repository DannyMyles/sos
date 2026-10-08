'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Compass, MessageCircle, RefreshCw } from 'lucide-react'
import { Adventure, api } from '@/lib/api'
import { whatsappLink } from '@/lib/contact'
import AdventureCard from './AdventureCard'
import BookingModal from '@/components/booking/BookingModal'

/** Loads upcoming adventures from the shared API (this app's data only). */
export function useAdventures() {
  const [adventures, setAdventures] = useState<Adventure[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    api
      .adventures({ upcoming: true })
      .then(setAdventures)
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load adventures.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])
  return { adventures, loading, error, reload: load }
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="h-52 animate-pulse bg-gray-200" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
        <div className="h-11 animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  )
}

interface AdventureBrowserProps {
  /** Show category/difficulty filters (the full Adventures page). */
  filters?: boolean
  /** Cap the number of cards (e.g. on the home page). */
  limit?: number
}

export default function AdventureBrowser({ filters = false, limit }: AdventureBrowserProps) {
  const { adventures, loading, error, reload } = useAdventures()
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('Any level')
  const [booking, setBooking] = useState<Adventure | null>(null)

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(adventures.map((a) => a.category).filter(Boolean) as string[])).sort()],
    [adventures]
  )
  const difficulties = useMemo(
    () => ['Any level', ...Array.from(new Set(adventures.map((a) => a.difficulty).filter(Boolean) as string[]))],
    [adventures]
  )

  const visible = adventures
    .filter((a) => category === 'All' || a.category === category)
    .filter((a) => difficulty === 'Any level' || a.difficulty === difficulty)
    .slice(0, limit)

  const chip = (active: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'border-accent-500 bg-accent-500 text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-accent-400 hover:text-accent-600'
    }`

  return (
    <>
      {filters && adventures.length > 0 && (
        <div className="mb-8 space-y-3">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:justify-center">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={chip(category === c)} aria-pressed={category === c}>
                {c}
              </button>
            ))}
          </div>
          {difficulties.length > 2 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:justify-center">
              {difficulties.map((d) => (
                <button key={d} onClick={() => setDifficulty(d)} className={chip(difficulty === d)} aria-pressed={difficulty === d}>
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit ?? 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="mx-auto max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <p className="mb-4 text-gray-700">{error}</p>
          <button onClick={reload} className="btn-adventure-outline inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        </div>
      ) : visible.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <Compass className="mx-auto mb-3 h-10 w-10 text-accent-400" />
          <p className="mb-1 font-semibold text-gray-900">
            {adventures.length === 0 ? 'New adventures are coming soon' : 'Nothing matches these filters'}
          </p>
          <p className="mb-5 text-sm text-gray-600">
            {adventures.length === 0
              ? 'Message us and we’ll tell you what’s next — or plan a private trip for your group.'
              : 'Try another category or level.'}
          </p>
          {adventures.length === 0 ? (
            <a href={whatsappLink('Hi Source of Adventure! What adventures do you have coming up?')} target="_blank"
              rel="noopener noreferrer" className="btn-adventure inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </a>
          ) : (
            <button onClick={() => { setCategory('All'); setDifficulty('Any level') }} className="btn-adventure-outline">
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <AdventureCard key={a.id} adventure={a} onBook={setBooking} />
          ))}
        </div>
      )}

      {booking && <BookingModal adventure={booking} onClose={() => setBooking(null)} onBooked={reload} />}
    </>
  )
}
