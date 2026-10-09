'use client'

import type { Adventure } from './api'

/** Browser-side calls for the sign-in and adventure screens (through /admin-api — see app/admin-api). */
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

  adventures: () => call<{ events: AdminAdventure[] }>('events?all=true').then((r) => r.events),
  saveAdventure: (id: number | null, form: FormData) =>
    call<{ event: AdminAdventure }>(id ? `events/${id}` : 'events', { method: id ? 'PUT' : 'POST', body: form }).then((r) => r.event),
  deleteAdventure: (id: number) => call(`events/${id}`, { method: 'DELETE' }),
}
