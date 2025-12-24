// app/aerobics/page.tsx
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'


const classes = [
  {
    id: 1,
    title: 'Outdoor HIIT',
    description: 'High-intensity interval training in nature',
    schedule: 'Mon, Wed, Fri | 6:00 AM',
    instructor: 'Sarah Johnson',
    level: 'All Levels',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800'
  },
  {
    id: 2,
    title: 'Trail Running',
    description: 'Cardio endurance through scenic trails',
    schedule: 'Tue, Thu, Sat | 7:00 AM',
    instructor: 'Mike Chen',
    level: 'Intermediate',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800'
  },
  {
    id: 3,
    title: 'Park Yoga Flow',
    description: 'Vinyasa yoga in natural surroundings',
    schedule: 'Daily | 8:00 AM',
    instructor: 'Elena Rodriguez',
    level: 'Beginner',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800'
  },
  {
    id: 4,
    title: 'Outdoor Bootcamp',
    description: 'Full-body strength and conditioning',
    schedule: 'Mon-Fri | 5:30 PM',
    instructor: 'David Wilson',
    level: 'Advanced',
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?auto=format&fit=crop&w=800'
  },
  {
    id: 5,
    title: 'Sunrise Stretch',
    description: 'Morning mobility and flexibility',
    schedule: 'Daily | 6:30 AM',
    instructor: 'Lisa Park',
    level: 'All Levels',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&w=800'
  },
  {
    id: 6,
    title: 'Adventure Circuits',
    description: 'Functional fitness with natural elements',
    schedule: 'Weekends | 9:00 AM',
    instructor: 'Alex Turner',
    level: 'Intermediate',
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?auto=format&fit=crop&w=800'
  },
]

export default function Aerobics() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {/* Hero */}
        <section className="py-20 bg-gradient-adventure">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
                Outdoor Aerobics <span className="text-gradient-adventure">& Fitness</span>
              </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Experience fitness in its natural habitat. Fresh air, beautiful scenery, and energizing workouts.
            </p>
          </div>
        </section>

        {/* Classes */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map((cls) => (
                <div key={cls.id} className="adventure-card overflow-hidden">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                    <img
                      src={cls.image}
                      alt={cls.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                      {cls.duration}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{cls.title}</h3>
                  <p className="text-gray-600 mb-4">{cls.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{cls.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Instructor: {cls.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Level: {cls.level}</span>
                    </div>
                  </div>
                  
                  <button className="btn-adventure w-full">
                    Join Class
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Benefits of Outdoor Fitness</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Fresh Air', desc: 'Increased oxygen intake boosts energy levels' },
                { title: 'Vitamin D', desc: 'Natural sunlight for bone health and mood' },
                { title: 'Mental Clarity', desc: 'Nature reduces stress and improves focus' },
                { title: 'Varied Terrain', desc: 'Natural surfaces challenge balance and stability' },
                { title: 'Social Connection', desc: 'Community building in beautiful settings' },
                { title: 'Sustainability', desc: 'Eco-friendly workouts without electricity' },
              ].map((benefit, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gradient-adventure">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
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