import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE } from '@/lib/adminSession'

export async function POST(req: NextRequest) {
  const out = NextResponse.json({ ok: true })
  out.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: (req.headers.get('x-forwarded-proto') ?? req.nextUrl.protocol.replace(':', '')) === 'https', path: '/', maxAge: 0 })
  return out
}
