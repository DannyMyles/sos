'use client'

import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/contact'

/** Floating "chat with us" shortcut on every public page (not the admin area). */
export default function WhatsAppButton() {
  if (usePathname().startsWith('/admin')) return null
  return (
    <a
      href={whatsappLink('Hi Source of Adventure! I have a question about your adventures.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/20 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
