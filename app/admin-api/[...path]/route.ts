import { NextRequest, NextResponse } from 'next/server'
import { adminToken, backend } from '@/lib/adminSession'

/**
 * Signed-in admin calls to the shared API, as the `sos` app, with the
 * session's backend token attached server-side. Only the endpoints the admin
 * screens need are forwarded.
 */
const ALLOWED = /^events(\/[A-Za-z0-9_-]+)*$/

async function forward(req: NextRequest, path: string[]) {
  const token = await adminToken()
  if (!token) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  const joined = path.join('/')
  if (!ALLOWED.test(joined)) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const hasBody = !['GET', 'HEAD', 'DELETE'].includes(req.method)
  const isMultipart = (req.headers.get('content-type') || '').startsWith('multipart/form-data')
  const res = await backend(`/api/v1/${joined}${req.nextUrl.search}`, {
    method: req.method,
    token,
    headers: hasBody && !isMultipart ? { 'content-type': 'application/json' } : undefined,
    body: !hasBody ? undefined : isMultipart ? await req.formData() : await req.text(),
  })
  if (res.status === 204) return new NextResponse(null, { status: 204 })
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}

type Ctx = { params: Promise<{ path: string[] }> }
export async function GET(req: NextRequest, { params }: Ctx) { return forward(req, (await params).path) }
export async function POST(req: NextRequest, { params }: Ctx) { return forward(req, (await params).path) }
export async function PUT(req: NextRequest, { params }: Ctx) { return forward(req, (await params).path) }
export async function PATCH(req: NextRequest, { params }: Ctx) { return forward(req, (await params).path) }
export async function DELETE(req: NextRequest, { params }: Ctx) { return forward(req, (await params).path) }
