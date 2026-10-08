/**
 * Client for the shared mark254-commerce-api backend.
 *
 * Browser calls go to same-origin `/api/...` (proxy.ts adds `X-App-Key: sos`);
 * server calls (metadata, sitemap) go straight to BACKEND_URL with the header.
 */
export const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY || 'sos'
const BACKEND_URL = (process.env.BACKEND_URL || 'http://localhost:4000').replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const isServer = typeof window === 'undefined'
  const headers = new Headers(init.headers)
  headers.set('x-app-key', APP_KEY)
  if (init.body && !headers.has('content-type')) headers.set('content-type', 'application/json')

  let res: Response
  try {
    res = await fetch(isServer ? `${BACKEND_URL}${path}` : path, { cache: 'no-store', ...init, headers })
  } catch {
    throw new ApiError(0, "We couldn't reach the server. Check your connection and try again.")
  }
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message =
      res.status === 429
        ? 'Too many attempts — please wait a few minutes and try again.'
        : res.status >= 500
          ? 'Something went wrong on our side. Please try again, or reach us on WhatsApp.'
          : body.error || `Request failed (${res.status})`
    throw new ApiError(res.status, message)
  }
  return body as T
}

export interface Adventure {
  id: number
  title: string
  slug: string
  description: string
  date: string
  time: string
  location: string
  trainers: string[]
  category: string | null
  difficulty: string | null
  duration: string | null
  image: string
  price: number // KES per person, 0 = price on request
  maxSpots: number
  spotsRemaining: number
  popular: boolean
}

export interface WhatsAppHandoff {
  number: string
  message: string
  url: string
}

export interface BookingInput {
  attendeeName: string
  attendeePhone: string
  attendeeEmail?: string
  participants: number
  notes?: string
}

export interface BookingResult {
  registration: {
    id: number
    ticketNumber: string
    attendeeName: string
    participants: number
    total: number
    status: 'pending' | 'confirmed' | 'cancelled'
  }
  whatsapp: WhatsAppHandoff | null
}

export const api = {
  adventures: (opts: { upcoming?: boolean } = {}) =>
    request<{ events: Adventure[] }>(`/api/v1/events${opts.upcoming ? '?upcoming=true' : ''}`).then((r) => r.events),

  adventure: (slug: string) =>
    request<{ event: Adventure }>(`/api/v1/events/${encodeURIComponent(slug)}`).then((r) => r.event),

  book: (slug: string, input: BookingInput) =>
    request<BookingResult>(`/api/v1/events/${encodeURIComponent(slug)}/register`, {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  contact: (input: { name: string; phone: string; email?: string; service?: string; message: string }) =>
    request<{ message: string }>('/api/v1/contact', { method: 'POST', body: JSON.stringify(input) }),

  galleryImages: () =>
    request<{ images: { id: string; title?: string; url: string }[] }>('/api/v1/gallery/images').then((r) => r.images),

  subscribe: (email: string) =>
    request<{ message: string }>('/api/v1/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) }),
}

export function formatKES(amount: number) {
  return `KES ${amount.toLocaleString('en-KE')}`
}

export function priceLabel(price: number) {
  return price > 0 ? `${formatKES(price)} / person` : 'Price on request'
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }) {
  return new Date(iso).toLocaleDateString('en-KE', { timeZone: 'Africa/Nairobi', ...opts })
}
