// components/Hero.tsx
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=2000')] opacity-5 bg-cover bg-center" />
      
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="badge-accent animate-pulse">
              Discover Your Next Journey
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Source of </span>
            <span className="text-gradient-adventure">Adventure</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Experience the thrill of adventure while embracing fitness and fun. 
            Join us on unforgettable journeys that challenge your body and spirit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-adventure text-lg px-8 py-4">
              Explore Adventures
            </button>
            <button className="btn-adventure-outline text-lg px-8 py-4">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero