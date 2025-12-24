// app/calendar/page.tsx
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Calendar from '@/components/ui/Calendar'
import BookingForm from '@/components/ui/BookingForm'

const events = [
  {
    id: 1,
    title: 'Mountain Sunrise Hike',
    date: new Date(2024, 2, 15),
    startTime: '06:00',
    endTime: '10:00',
    type: 'hiking',
    difficulty: 'Intermediate',
    spots: 12,
    booked: 8,
    guide: 'Sarah Johnson'
  },
  {
    id: 2,
    title: 'Forest Trail Running',
    date: new Date(2024, 2, 16),
    startTime: '07:00',
    endTime: '08:30',
    type: 'running',
    difficulty: 'Beginner',
    spots: 20,
    booked: 15,
    guide: 'Mike Chen'
  },
  {
    id: 3,
    title: 'Rock Climbing Workshop',
    date: new Date(2024, 2, 17),
    startTime: '09:00',
    endTime: '12:00',
    type: 'climbing',
    difficulty: 'All Levels',
    spots: 8,
    booked: 6,
    guide: 'Alex Turner'
  },
  {
    id: 4,
    title: 'Kayaking Adventure',
    date: new Date(2024, 2, 18),
    startTime: '10:00',
    endTime: '14:00',
    type: 'water',
    difficulty: 'Intermediate',
    spots: 10,
    booked: 7,
    guide: 'David Wilson'
  },
  {
    id: 5,
    title: 'Sunset Yoga Session',
    date: new Date(2024, 2, 18),
    startTime: '17:00',
    endTime: '18:00',
    type: 'yoga',
    difficulty: 'Beginner',
    spots: 25,
    booked: 18,
    guide: 'Elena Rodriguez'
  },
  {
    id: 6,
    title: 'Wilderness Survival Class',
    date: new Date(2024, 2, 19),
    startTime: '08:00',
    endTime: '16:00',
    type: 'educational',
    difficulty: 'All Levels',
    spots: 15,
    booked: 10,
    guide: 'Mark Davis'
  },
  {
    id: 7,
    title: 'Mountain Biking Trail',
    date: new Date(2024, 2, 20),
    startTime: '08:30',
    endTime: '12:30',
    type: 'cycling',
    difficulty: 'Advanced',
    spots: 12,
    booked: 9,
    guide: 'Lisa Park'
  },
  {
    id: 8,
    title: 'Nature Photography Walk',
    date: new Date(2024, 2, 21),
    startTime: '14:00',
    endTime: '17:00',
    type: 'photography',
    difficulty: 'Beginner',
    spots: 10,
    booked: 6,
    guide: 'Tom Wilson'
  },
]

export default function CalendarPage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {/* Hero */}
        <section className="py-20 bg-gradient-adventure">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
                Adventure <span className="text-gradient-adventure">Calendar</span>
              </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Book your next adventure! View schedules, check availability, and reserve your spot.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar Component */}
            <div className="lg:col-span-2">
              <div className="adventure-card mb-8">
                <Calendar events={events} />
              </div>
              
              {/* Upcoming Events */}
              <div className="adventure-card">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Upcoming Events</h2>
                <div className="space-y-4">
                  {events.slice(0, 4).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-accent/5 transition-colors">
                      <div>
                        <h3 className="font-bold text-gray-900">{event.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {event.startTime} - {event.endTime}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            event.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            event.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            event.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {event.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-2">
                          {event.booked}/{event.spots} spots filled
                        </div>
                        <button className="btn-adventure text-sm px-4 py-2">
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div>
              <div className="sticky top-24">
                <BookingForm />
                
                {/* Quick Stats */}
                <div className="adventure-card mt-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Events This Month</span>
                      <span className="font-bold text-accent">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available Spots</span>
                      <span className="font-bold text-accent">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Your Bookings</span>
                      <span className="font-bold text-accent">3</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Booking Rate</span>
                        <span className="font-bold text-accent">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Types */}
                <div className="adventure-card mt-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Activity Types</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'hiking', label: 'Hiking', count: 8, color: 'bg-green-500' },
                      { type: 'running', label: 'Trail Running', count: 6, color: 'bg-blue-500' },
                      { type: 'climbing', label: 'Rock Climbing', count: 4, color: 'bg-red-500' },
                      { type: 'water', label: 'Water Sports', count: 5, color: 'bg-cyan-500' },
                      { type: 'yoga', label: 'Outdoor Yoga', count: 7, color: 'bg-purple-500' },
                    ].map((activity) => (
                      <div key={activity.type} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${activity.color}`}></div>
                          <span className="text-gray-700">{activity.label}</span>
                        </div>
                        <span className="text-gray-600">{activity.count} events</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}