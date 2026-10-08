import { NextResponse, type NextRequest } from 'next/server'

/**
 * Forwards this site's backend paths to the shared mark254-commerce-api and
 * stamps them with this app's key (`sos`). The backend keeps every app's
 * data apart by that key, and any X-App-Key a browser sends is overwritten,
 * so requests through this origin can only ever see Source of Adventure data.
 */
const BACKEND_URL = (process.env.BACKEND_URL || 'http://localhost:4000').replace(/\/+$/, '')
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY || 'sos'

export function proxy(req: NextRequest) {
  const target = new URL(`${req.nextUrl.pathname}${req.nextUrl.search}`, BACKEND_URL)
  const headers = new Headers(req.headers)
  headers.set('x-app-key', APP_KEY)
  headers.delete('x-admin-key')
  return NextResponse.rewrite(target, { request: { headers } })
}

export const config = {
  matcher: ['/api/:path*', '/uploads/:path*'],
}
