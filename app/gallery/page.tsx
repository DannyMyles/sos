// app/gallery/page.tsx
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import { getSite, pageHeader } from '@/lib/site'
import GalleryGrid from '@/components/gallery/GalleryGrid'

export const metadata = { title: 'Gallery' }



export const dynamic = 'force-dynamic'

export default async function Gallery() {
  const header = pageHeader(await getSite(), 'gallery', { eyebrow: 'Gallery', title: 'Moments from the', highlight: 'trail', subtitle: 'The crew, the climbs, the rivers and the views — a look at life on our adventures.', imageUrl: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=2000' })
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero */}
        <PageHeader eyebrow={header.eyebrow} title={header.title} highlight={header.highlight} subtitle={header.subtitle} image={header.imageUrl} focus="center 45%" />

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