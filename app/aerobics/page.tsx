// app/aerobics/page.tsx
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import { whatsappLink } from '@/lib/contact'


const classes = [
  {
    id: 1,
    title: 'Outdoor HIIT',
    description: 'High-intensity interval training in nature',
    schedule: 'Mon, Wed, Fri | 6:00 AM',
    level: 'All Levels',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800'
  },
  {
    id: 2,
    title: 'Trail Running',
    description: 'Cardio endurance through scenic trails',
    schedule: 'Tue, Thu, Sat | 7:00 AM',
    level: 'Intermediate',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800'
  },
  {
    id: 3,
    title: 'Park Yoga Flow',
    description: 'Vinyasa yoga in natural surroundings',
    schedule: 'Daily | 8:00 AM',
    level: 'Beginner',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800'
  },
  {
    id: 4,
    title: 'Outdoor Bootcamp',
    description: 'Full-body strength and conditioning',
    schedule: 'Mon-Fri | 5:30 PM',
    level: 'Advanced',
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800'
  },
  {
    id: 5,
    title: 'Sunrise Stretch',
    description: 'Morning mobility and flexibility',
    schedule: 'Daily | 6:30 AM',
    level: 'All Levels',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&w=800'
  },
  {
    id: 6,
    title: 'Adventure Circuits',
    description: 'Functional fitness with natural elements',
    schedule: 'Weekends | 9:00 AM',
    level: 'Intermediate',
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=800'
  },
]

export default function Aerobics() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero */}
        <PageHeader eyebrow="Outdoor Aerobics" title="Train in the" highlight="fresh air" subtitle="Fitness in its natural habitat — open skies, real terrain and energising group sessions." image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000" focus="center 40%" />

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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Level: {cls.level}</span>
                    </div>
                  </div>
                  
                  <a
                    href={whatsappLink(`Hi Source of Adventure! I'd like to join the ${cls.title} class (${cls.schedule}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-adventure block w-full text-center"
                  >
                    Join on WhatsApp
                  </a>
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