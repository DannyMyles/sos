import { NextResponse } from 'next/server'
import { adminToken, backend } from '@/lib/adminSession'

export async function GET() {
  const token = await adminToken()
  if (!token) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  const res = await backend('/api/v1/auth/me', { token })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.user?.role !== 'admin') return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  return NextResponse.json({ user: data.user })
}
