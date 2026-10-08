// app/gallery/page.tsx
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import GalleryGrid from '@/components/gallery/GalleryGrid'

export const metadata = { title: 'Gallery' }



export default function Gallery() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero */}
        <PageHeader eyebrow="Gallery" title="Moments from the" highlight="trail" subtitle="The crew, the climbs, the rivers and the views — a look at life on our adventures." image="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=2000" focus="center 45%" />

        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <GalleryGrid />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}