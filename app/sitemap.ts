import type { MetadataRoute } from 'next'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001').replace(/\/+$/, '')
const BACKEND_URL = (process.env.BACKEND_URL || 'http://localhost:4000').replace(/\/+$/, '')
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY || 'sos'

// Rebuilt at most hourly, so newly published adventures and events refresh the dates.
export const revalidate = 3600

/** Most recent update among this app's published adventures/events of one kind. */
async function lastChange(kind: 'adventure' | 'event'): Promise<Date | undefined> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/events?upcoming=true&kind=${kind}`, {
      headers: { 'x-app-key': APP_KEY },
      next: { revalidate },
    })
    if (!res.ok) return undefined
    const { events } = (await res.json()) as { events: { updatedAt: string }[] }
    const latest = Math.max(...events.map((e) => new Date(e.updatedAt).getTime()))
    return Number.isFinite(latest) ? new Date(latest) : undefined
  } catch {
    return undefined
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [adventures, events] = await Promise.all([lastChange('adventure'), lastChange('event')])
  const page = (path: string, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'], priority: number, lastModified?: Date) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  })
  return [
    page('/', 'weekly', 1, adventures),
    page('/adventures', 'daily', 0.9, adventures),
    page('/events', 'daily', 0.8, events),
    page('/activities', 'weekly', 0.8),
    page('/corporate', 'monthly', 0.8),
    page('/calendar', 'daily', 0.6, adventures),
    page('/gallery', 'weekly', 0.5),
    page('/about', 'monthly', 0.6),
    page('/contact', 'monthly', 0.6),
    page('/site-map', 'monthly', 0.2),
  ]
}
