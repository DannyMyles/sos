import { cookies } from 'next/headers'

/**
 * Server-only helpers for the SOS admin area.
 *
 * The backend JWT for an SOS admin lives in an httpOnly cookie that only
 * this site's /admin-api route handlers read — it never reaches browser JS.
 * Every backend call is made as the `sos` app, and the backend itself
 * rejects tokens issued to any other app.
 */
export const ADMIN_COOKIE = 'soa_admin'
export const BACKEND_URL = (process.env.BACKEND_URL || 'http://localhost:4000').replace(/\/+$/, '')
export const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY || 'sos'

export async function adminToken(): Promise<string | null> {
  return (await cookies()).get(ADMIN_COOKIE)?.value ?? null
}

/** Seconds until a JWT expires (0 if unreadable/expired). Not a verification — the backend verifies. */
export function secondsUntilExpiry(token: string): number {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf8'))
    return Math.max(0, Math.floor(payload.exp - Date.now() / 1000))
  } catch {
    return 0
  }
}

export function backend(path: string, init: RequestInit & { token?: string | null } = {}) {
  const { token, ...rest } = init
  const headers = new Headers(rest.headers)
  headers.set('x-app-key', APP_KEY)
  if (token) headers.set('authorization', `Bearer ${token}`)
  return fetch(`${BACKEND_URL}${path}`, { cache: 'no-store', ...rest, headers })
}
