/** Source of Adventure contact details — single source of truth for the site. */
export const BRAND_NAME = 'Source of Adventure'
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP || '254701437959').replace(/\D/g, '')
export const PHONE_DISPLAY = '+254 701 437 959'
export const PHONE_TEL = '+254701437959'
export const EMAIL = 'info@sourceofadventure.com'
export const LOCATION = 'Nairobi, Kenya'
export const HOURS = 'Mon–Sat, 6am – 8pm'

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
