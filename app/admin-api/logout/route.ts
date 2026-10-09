import { NextResponse } from 'next/server'
import { ADMIN_COOKIE } from '@/lib/adminSession'

export async function POST() {
  const out = NextResponse.json({ ok: true })
  out.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 })
  return out
}
