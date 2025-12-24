// app/activities/page.tsx
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'


const activities = [
  {
    id: 1,
    title: 'Guided Nature Walks',
    category: 'Leisure',
    description: 'Gentle walks with naturalist guides exploring local flora and fauna',
    duration: '2-3 hours',
    groupSize: 'Small groups',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800'
  },
  {
    id: 2,
    title: 'Rock Climbing',
    category: 'Adventure',
    description: 'Beginner to advanced climbing on natural rock formations',
    duration: 'Half/Full day',
    groupSize: '4-8 people',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800'
  },
  {
    id: 3,
    title: 'Kayaking',
    category: 'Water Sports',
    description: 'Explore lakes, rivers, and coastal waters',
    duration: '3-4 hours',
    groupSize: '2-12 people',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800'
  },
  {
    id: 4,
    title: 'Mountain Biking',
    category: 'Cycling',
    description: 'Trail riding through forests and mountains',
    duration: '2-6 hours',
    groupSize: '2-10 people',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800'
  },
  {
    id: 5,
    title: 'Wildlife Photography',
    category: 'Educational',
    description: 'Learn photography while observing wildlife in natural habitats',
    duration: '3-4 hours',
    groupSize: '4-8 people',
    image: 'https://images.unsplash.com/photo-1520095972714-909e91b038e5?auto=format&fit=crop&w=800'
  },
  {
    id: 6,
    title: 'Survival Skills',
    category: 'Educational',
    description: 'Learn essential wilderness survival techniques',
    duration: 'Full day',
    groupSize: '6-12 people',
    image: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800'
  },
]

export default function Activities() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {/* Hero */}

        <section className="py-20 bg-gradient-adventure">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
                Outdoor <span className="text-gradient-adventure">Activities</span>
              </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              From leisurely nature walks to adrenaline-pumping adventures - find your perfect outdoor experience
            </p>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <div key={activity.id} className="adventure-card group overflow-hidden">
                  <div className="relative h-56 mb-6 overflow-hidden rounded-xl">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-900">{activity.category}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                  <p className="text-gray-600 mb-6">{activity.description}</p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{activity.groupSize}</span>
                    </div>
                  </div>
                  
                  <button className="btn-adventure-outline w-full">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-sunset">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of adventurers who have discovered the joy of outdoor activities with us
            </p>
            <button className=" btn-adventure-outline text-accent hover:bg-accent hover:text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg">
              Book Your Activity Now
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}