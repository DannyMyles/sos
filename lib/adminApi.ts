'use client'

import type { Adventure } from './api'

/** Browser-side calls for the admin screens (through /admin-api — see app/admin-api). */
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface AdminBooking {
  id: number
  ticketNumber: string
  attendeeName: string
  attendeePhone: string
  attendeeEmail: string | null
  participants: number
  total: number
  notes: string | null
  status: BookingStatus
  checkedInAt: string | null
  createdAt: string
  event: { id: number; title: string; slug: string; date: string; time: string; location: string }
}

export interface AdminAdventure extends Adventure {
  published: boolean
}

export class NotSignedIn extends Error {}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  if (init.body && !(init.body instanceof FormData)) headers.set('content-type', 'application/json')
  const res = await fetch(`/admin-api/${path}`, { cache: 'no-store', ...init, headers })
  if (res.status === 401) {
    window.location.href = `/admin/login?next=${encodeURIComponent(window.location.pathname)}`
    throw new NotSignedIn('Please sign in')
  }
  if (res.status === 204) return undefined as T
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data as T
}

export const adminApi = {
  me: () => call<{ user: { name: string; email: string } }>('me'),
  login: (email: string, password: string) =>
    fetch('/admin-api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(async (r) => {
      const data = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(data.error || 'Sign-in failed')
      return data
    }),
  logout: () => fetch('/admin-api/logout', { method: 'POST' }),

  bookings: (status?: BookingStatus) =>
    call<{ registrations: AdminBooking[] }>(`events/registrations/all${status ? `?status=${status}` : ''}`).then((r) => r.registrations),
  setBookingStatus: (id: number, status: BookingStatus) =>
    call(`events/registrations/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  adventures: () => call<{ events: AdminAdventure[] }>('events?all=true').then((r) => r.events),
  saveAdventure: (id: number | null, form: FormData) =>
    call<{ event: AdminAdventure }>(id ? `events/${id}` : 'events', { method: id ? 'PUT' : 'POST', body: form }).then((r) => r.event),
  deleteAdventure: (id: number) => call(`events/${id}`, { method: 'DELETE' }),
}

/** Customer phone as a wa.me number (Kenyan 07…/01… → 2547…/2541…). */
export function waNumber(phone: string) {
  const d = phone.replace(/\D/g, '')
  return d.startsWith('0') && d.length === 10 ? `254${d.slice(1)}` : d
}
