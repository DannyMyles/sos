import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, backend, secondsUntilExpiry } from '@/lib/adminSession'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json().catch(() => ({}))
  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }
  // Pass the visitor's address on so the API rate-limits per person, not per server.
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const res = await backend('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(clientIp ? { 'x-forwarded-for': clientIp } : {}) },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) return NextResponse.json({ error: data.error || 'Sign-in failed' }, { status: res.status })
  if (data.user?.role !== 'admin') {
    return NextResponse.json({ error: 'This account doesn’t have admin access.' }, { status: 403 })
  }

  const token: string = data.user.token
  const out = NextResponse.json({ user: { name: data.user.name, email: data.user.email } })
  out.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: secondsUntilExpiry(token),
  })
  return out
}
