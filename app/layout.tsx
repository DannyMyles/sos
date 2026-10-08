import type { Metadata, Viewport } from 'next'
import './globals.css'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import RevealObserver from '@/components/ui/RevealObserver'

export const metadata: Metadata = {
  title: {
    default: 'Source of Adventure | Fun & Fitness Adventures in Kenya',
    template: '%s | Source of Adventure',
  },
  description:
    'Hikes, rafting, cycling, climbing and outdoor fitness across Kenya. Pick an adventure and book your spot on WhatsApp in under a minute.',
  icons: { icon: '/SOA Logo-03.png' },
}

export const viewport: Viewport = {
  themeColor: '#f97316',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-sans" suppressHydrationWarning>
      <head>
        {/* Lets CSS hide .reveal content only when JS is running to reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen bg-[#fbfaf7] text-gray-900">
        {children}
        <WhatsAppButton />
        <RevealObserver />
      </body>
    </html>
  )
}
