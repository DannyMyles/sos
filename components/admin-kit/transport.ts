'use client'

/**
 * The only app-specific file of the admin kit: how admin calls reach the
 * shared API. SOS sends them to its own /admin-api route handlers, which
 * attach the signed-in admin's token from an httpOnly cookie server-side.
 * `path` is relative to /api/v1 (e.g. "enquiries?status=new").
 */
export const ADMIN_APP_KEY = 'sos'
export const ADMIN_BASE_PATH = '/admin'

export class AdminAuthError extends Error {}

export async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers)
  if (init.body && !(init.body instanceof FormData)) headers.set('content-type', 'application/json')
  const res = await fetch(`/admin-api/${path}`, { cache: 'no-store', ...init, headers })
  if (res.status === 401) {
    window.location.href = `/admin/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`
    throw new AdminAuthError('Please sign in again')
  }
  return res
}
