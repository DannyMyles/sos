// app/gallery/page.tsx
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'


const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800', category: 'mountains' },
  { id: 2, src: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800', category: 'forest' },
  { id: 3, src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800', category: 'forest' },
  { id: 4, src: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800', category: 'desert' },
  { id: 5, src: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800', category: 'cycling' },
  { id: 6, src: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800', category: 'climbing' },
  { id: 7, src: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800', category: 'camping' },
  { id: 8, src: 'https://images.unsplash.com/photo-1520095972714-909e91b038e5?auto=format&fit=crop&w=800', category: 'fitness' },
  { id: 9, src: 'https://images.unsplash.com/photo-1518644730709-0835105d9daa?auto=format&fit=crop&w=800', category: 'group' },
]

export default function Gallery() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {/* Hero */}
        <section className="py-20 bg-gradient-adventure">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
                Adventure <span className="text-gradient-adventure">Gallery</span>
              </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Witness the breathtaking moments and unforgettable experiences from our adventures
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                  <img
                    src={image.src}
                    alt={`Gallery ${image.id}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <span className="inline-block px-3 py-1 bg-accent rounded-full text-sm mb-2">
                        {image.category}
                      </span>
                      <h3 className="text-xl font-bold">Adventure Moment #{image.id}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}