'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { api } from '@/lib/api'

interface Photo {
  src: string
  alt: string
}

// The crew's own photos lead; scenic shots fill out the grid. Anything
// uploaded to SOS's gallery on the backend is added automatically.
const BASE_PHOTOS: Photo[] = [
  { src: '/all.jpeg', alt: 'The Source of Adventure crew before a trip' },
  { src: '/mark.jpeg', alt: 'Mark Sila' },
  { src: '/teddy.jpeg', alt: 'Teddy Mist' },
  { src: '/edu.jpeg', alt: 'Edu Shark on an adventure' },
  { src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200', alt: 'Mountain trek' },
  { src: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1200', alt: 'White-water rafting' },
  { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200', alt: 'Forest trail' },
  { src: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200', alt: 'Coastal cycling' },
  { src: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200', alt: 'Rock climbing' },
  { src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200', alt: 'Desert landscape' },
  { src: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=1200', alt: 'Camping under the sky' },
]

export default function GalleryGrid() {
  const [photos, setPhotos] = useState<Photo[]>(BASE_PHOTOS)
  const [open, setOpen] = useState<number | null>(null)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    api
      .galleryImages()
      .then((images) => {
        if (images.length) setPhotos([...images.map((i) => ({ src: i.url, alt: i.title || 'Adventure photo' })), ...BASE_PHOTOS])
      })
      .catch(() => {
        /* the built-in photos are enough if the gallery can't load */
      })
  }, [])

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [open, close, step])

  return (
    <>
      <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setOpen(i)}
            className="group mb-3 block w-full overflow-hidden rounded-2xl bg-gray-100 sm:mb-4 break-inside-avoid focus-visible:ring-4 focus-visible:ring-accent-300"
            aria-label={`View photo: ${photo.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading={i < 4 ? 'eager' : 'lazy'}
              className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-[sheet-in_200ms_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt}
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[open].src}
            alt={photos[open].alt}
            className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-5 left-0 right-0 text-center text-sm text-white/80">
            {photos[open].alt} · {open + 1} / {photos.length}
          </p>
          <button onClick={close} className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20" aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(-1) }}
            className="absolute left-3 hidden rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:block"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(1) }}
            className="absolute right-3 hidden rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:block"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  )
}
