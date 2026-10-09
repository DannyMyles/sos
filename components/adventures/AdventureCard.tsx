import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { Adventure, formatDate, priceLabel } from '@/lib/api'

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
}

export function difficultyClass(difficulty: string | null) {
  return DIFFICULTY_STYLES[(difficulty ?? '').toLowerCase()] ?? 'bg-blue-100 text-blue-800'
}

export default function AdventureCard({ adventure, onBook }: { adventure: Adventure; onBook: (a: Adventure) => void }) {
  const full = adventure.spotsRemaining <= 0
  const fewLeft = !full && adventure.spotsRemaining <= 5

  return (
    <article className="reveal group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        {adventure.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={adventure.image}
            alt={adventure.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-adventure" />
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {adventure.category && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm">
              {adventure.category}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white shadow">
          {priceLabel(adventure.price)}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug text-gray-900">{adventure.title}</h3>
          {adventure.difficulty && (
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyClass(adventure.difficulty)}`}>
              {adventure.difficulty}
            </span>
          )}
        </div>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{adventure.description}</p>

        <ul className="mb-5 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-accent-500" />
            {formatDate(adventure.date)}
          </li>
          <li className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent-500" />
            {adventure.duration || adventure.time}
          </li>
          <li className="col-span-2 flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-accent-500" />
            <span className="truncate">{adventure.location}</span>
          </li>
          <li className={`col-span-2 flex items-center gap-1.5 ${full ? 'text-red-600' : fewLeft ? 'text-amber-600 font-medium' : ''}`}>
            <Users className="h-4 w-4 text-accent-500" />
            {full ? 'Fully booked' : fewLeft ? `Only ${adventure.spotsRemaining} spots left` : `${adventure.spotsRemaining} spots available`}
          </li>
        </ul>

        <button
          onClick={() => onBook(adventure)}
          disabled={full}
          className="btn-adventure mt-auto w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {full ? 'Fully booked' : adventure.kind === 'event' ? 'Save my spot' : 'Book this adventure'}
        </button>
      </div>
    </article>
  )
}
