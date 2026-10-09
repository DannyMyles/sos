/**
 * Business details and editable page content for this site, managed in
 * Admin → Settings and served by the shared API (GET /api/v1/app).
 * Fallbacks keep the site usable if the API is briefly unreachable.
 */
import { BRAND_NAME, EMAIL, HOURS, LOCATION, PHONE_DISPLAY, WHATSAPP_NUMBER } from './contact'

export interface TitledText {
  title: string
  text: string
}

export interface PageHeaderContent {
  eyebrow?: string
  title?: string
  highlight?: string
  subtitle?: string
  imageUrl?: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  imageUrl?: string
  expertise?: string[]
}

export interface SiteSettings {
  brand?: { primaryColor?: string; secondaryColor?: string; logoUrl?: string }
  hero?: {
    eyebrow?: string
    title?: string
    highlight?: string
    subtitle?: string
    imageUrl?: string
    primaryCtaLabel?: string
    primaryCtaUrl?: string
    secondaryCtaLabel?: string
    secondaryCtaUrl?: string
    perks?: string[]
  }
  social?: Partial<Record<'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'x' | 'linkedin', string>>
  hours?: string
  secondaryEmail?: string
  mapUrl?: string
  about?: { headline?: string; body?: string; mission?: string; vision?: string; story?: string; imageUrl?: string }
  pages?: Record<string, PageHeaderContent>
  team?: TeamMember[]
  stats?: { value: string; label: string }[]
  steps?: TitledText[]
  highlights?: TitledText[]
  values?: TitledText[]
  corporate?: { headline?: string; subtitle?: string; imageUrl?: string; minGroupForQuote?: number }
  booking?: { whatsappNotice?: string; successMessage?: string }
  email?: { footerNote?: string; signature?: string }
  seo?: { description?: string }
}

export interface SiteInfo {
  key: string
  name: string
  tagline: string | null
  whatsappNumber: string | null
  contactEmail: string | null
  contactPhone: string | null
  location: string | null
  settings: SiteSettings
}

export const FALLBACK_SITE: SiteInfo = {
  key: 'sos',
  name: BRAND_NAME,
  tagline: 'Fun & Fitness',
  whatsappNumber: WHATSAPP_NUMBER,
  contactEmail: EMAIL,
  contactPhone: PHONE_DISPLAY,
  location: LOCATION,
  settings: { hours: HOURS },
}

const BACKEND_URL = (process.env.BACKEND_URL || 'http://localhost:4000').replace(/\/+$/, '')
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY || 'sos'

/** Server-side: cached for a minute, so edits in the admin show up quickly. */
export async function getSite(): Promise<SiteInfo> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/app`, {
      headers: { 'x-app-key': APP_KEY },
      next: { revalidate: 60, tags: ['site'] },
    })
    if (!res.ok) throw new Error(String(res.status))
    const data = (await res.json()) as SiteInfo
    return { ...FALLBACK_SITE, ...data, settings: data.settings ?? {} }
  } catch {
    return FALLBACK_SITE
  }
}

/** Banner copy for an inner page: Admin → Settings → Page headers, else the given defaults. */
export function pageHeader<T extends PageHeaderContent>(site: Pick<SiteInfo, 'settings'>, key: string, defaults: T): T {
  const saved = site.settings.pages?.[key] ?? {}
  const merged = { ...defaults } as T
  for (const [k, v] of Object.entries(saved)) if (v) (merged as Record<string, unknown>)[k] = v
  return merged
}

export function waLink(site: Pick<SiteInfo, 'whatsappNumber'>, message?: string) {
  const number = (site.whatsappNumber || WHATSAPP_NUMBER).replace(/\D/g, '')
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

export function telHref(phone: string | null | undefined) {
  return phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined
}
