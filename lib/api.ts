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
  kind: 'adventure' | 'event'
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
  /** Same id on a retry = the server returns the original booking. */
  requestId?: string
}

export type PricingType = 'fixed' | 'per_person' | 'quote'

export interface ServicePackage {
  id: number
  name: string
  description: string | null
  priceAmount: number | null
  pricingType: PricingType
  priceLabel: string | null
  minParticipants: number | null
  maxParticipants: number | null
  features: string[]
  popular: boolean
}

export interface Service {
  id: string
  title: string
  slug?: string
  description: string
  features: string[]
  price: string
  priceAmount: number | null
  pricingType: PricingType
  category: string | null
  audience: 'individual' | 'corporate' | 'both'
  duration: string | null
  groupSize: string | null
  schedule: string | null
  level: string | null
  location: string | null
  minParticipants: number | null
  maxParticipants: number | null
  bookingRequirements: string | null
  image: string
  popular: boolean
  available: boolean
  published: boolean
  order: number
  packages: ServicePackage[]
}

export interface Faq {
  id: number
  question: string
  answer: string
  category: string | null
  order: number
  published: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  rating: number
  image?: string
  photoUrl?: string
  avatarColor?: string
  achievement?: string
}

export interface Banner {
  id: number
  placement: string
  title: string
  subtitle: string | null
  badge: string | null
  image: string | null
  ctaLabel: string | null
  ctaUrl: string | null
}

export type EnquiryType = 'contact' | 'booking' | 'corporate' | 'quote'

export interface EnquiryInput {
  type: EnquiryType
  serviceId?: number
  packageId?: number
  name: string
  phone: string
  email?: string
  company?: string
  participants?: number
  preferredDate?: string
  location?: string
  message?: string
  requestId?: string
}

export interface EnquiryResult {
  enquiry: { reference: string; type: EnquiryType; status: string; serviceName: string | null; estimate: number | null }
  whatsapp: WhatsAppHandoff | null
  message: string
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
  /** Dated trips and events; `kind` narrows to adventures or events (default: both). */
  adventures: (opts: { upcoming?: boolean; kind?: 'adventure' | 'event' } = {}) => {
    const qs = new URLSearchParams({ ...(opts.upcoming ? { upcoming: 'true' } : {}), ...(opts.kind ? { kind: opts.kind } : {}) }).toString()
    return request<{ events: Adventure[] }>(`/api/v1/events${qs ? `?${qs}` : ''}`).then((r) => r.events)
  },

  adventure: (slug: string) =>
    request<{ event: Adventure }>(`/api/v1/events/${encodeURIComponent(slug)}`).then((r) => r.event),

  book: (slug: string, input: BookingInput) =>
    request<BookingResult>(`/api/v1/events/${encodeURIComponent(slug)}/register`, {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  contact: (input: { name: string; phone: string; email?: string; service?: string; message: string; requestId?: string }) =>
    request<{ message: string; reference: string; whatsapp: WhatsAppHandoff | null }>('/api/v1/contact', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  services: (opts: { category?: string; audience?: string } = {}) => {
    const qs = new URLSearchParams(Object.entries(opts).filter(([, v]) => v) as [string, string][]).toString()
    return request<{ trainings: Service[] }>(`/api/v1/trainings${qs ? `?${qs}` : ''}`).then((r) => r.trainings)
  },

  enquire: (input: EnquiryInput) =>
    request<EnquiryResult>('/api/v1/enquiries', { method: 'POST', body: JSON.stringify(input) }),

  faqs: (category?: string) =>
    request<{ faqs: Faq[] }>(`/api/v1/faqs${category ? `?category=${encodeURIComponent(category)}` : ''}`).then((r) => r.faqs),

  testimonials: () =>
    request<{ testimonials: Testimonial[] }>('/api/v1/testimonials').then((r) => r.testimonials ?? []),

  banners: (placement = 'home') =>
    request<{ banners: Banner[] }>(`/api/v1/banners?placement=${encodeURIComponent(placement)}`).then((r) => r.banners),

  galleryImages: () =>
    request<{ images: { id: string; title?: string; url: string }[] }>('/api/v1/gallery/images').then((r) => r.images),

  subscribe: (email: string) =>
    request<{ message: string }>('/api/v1/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) }),
}

/** Never throws: a failed optional section just renders nothing. */
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise
  } catch {
    return fallback
  }
}

/** Client-generated id that makes a submit safe to retry. */
export function newRequestId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().replace(/-/g, '')
    : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`
}

export function servicePriceLabel(s: { price?: string; priceAmount: number | null; pricingType: PricingType; priceLabel?: string | null }) {
  if (s.priceLabel) return s.priceLabel
  if (s.pricingType === 'quote' || !s.priceAmount) return s.price || 'Price on request'
  return s.pricingType === 'per_person' ? `${formatKES(s.priceAmount)} / person` : formatKES(s.priceAmount)
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
