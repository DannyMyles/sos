// app/adventures/page.tsx
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'

const adventures = [
  {
    id: 1,
    title: 'Mountain Trekking',
    description: 'Challenging hikes through breathtaking mountain ranges',
    duration: '3 Days',
    difficulty: 'Advanced',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800',
    category: 'trekking'
  },
  {
    id: 2,
    title: 'Forest Exploration',
    description: 'Discover hidden trails and wildlife in ancient forests',
    duration: '2 Days',
    difficulty: 'Intermediate',
    price: '$199',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800',
    category: 'exploration'
  },
  {
    id: 3,
    title: 'River Rafting',
    description: 'White water adventures for thrill seekers',
    duration: '1 Day',
    difficulty: 'Beginner',
    price: '$149',
    image: 'https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&w=800',
    category: 'water'
  },
  {
    id: 4,
    title: 'Desert Safari',
    description: 'Experience the magic of desert landscapes',
    duration: '2 Days',
    difficulty: 'Intermediate',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800',
    category: 'safari'
  },
  {
    id: 5,
    title: 'Coastal Cycling',
    description: 'Scenic bike rides along stunning coastlines',
    duration: '1 Day',
    difficulty: 'Beginner',
    price: '$99',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800',
    category: 'cycling'
  },
  {
    id: 6,
    title: 'Rock Climbing',
    description: 'Vertical adventures with professional guides',
    duration: '2 Days',
    difficulty: 'Advanced',
    price: '$349',
    image: 'https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&w=800',
    category: 'climbing'
  },
]

export default function Adventures() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {/* Hero */}
        <section className="py-20 bg-gradient-adventure ">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
                Adventures <span className="text-gradient-adventure">& Tours</span>
              </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Choose from our curated collection of unforgettable adventures designed 
              to challenge your body and inspire your soul.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white sticky top-20 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {['All', 'Trekking', 'Water Sports', 'Cycling', 'Climbing', 'Safari', 'Beginner', 'Intermediate', 'Advanced'].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Adventures Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {adventures.map((adventure) => (
                <div key={adventure.id} className="adventure-card group overflow-hidden">
                  <div className="relative h-64 mb-4 overflow-hidden rounded-xl">
                    <img
                      src={adventure.image}
                      alt={adventure.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                      {adventure.price}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{adventure.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {adventure.duration}
                        </span>
                        <span className={`px-3 py-1 rounded-full ${
                          adventure.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          adventure.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {adventure.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{adventure.description}</p>
                  
                  <button className="btn-adventure-outline w-full">
                    Book This Adventure
                  </button>
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