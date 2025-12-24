// app/contact/page.tsx
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'

export default function Contact() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {/* Hero */}
        <section className="py-20 bg-gradient-adventure">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
                Contact <span className="text-gradient-adventure">Us</span>
              </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Have questions? Ready to book your adventure? Get in touch with our team!
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="adventure-card p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Send us a Message</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interested In
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent">
                      <option>Select an option</option>
                      <option>Adventures & Tours</option>
                      <option>Fitness Classes</option>
                      <option>Group Activities</option>
                      <option>Corporate Events</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="Tell us about your adventure needs..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-adventure w-full py-4 text-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="adventure-card p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Phone</h4>
                        <p className="text-gray-600">+254 (07) 01437959</p>
                        <p className="text-sm text-gray-500">Mon-Fri 9am-6pm, Sat 10am-4pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Email</h4>
                        <p className="text-gray-600">info@sourceofadventure.com</p>
                        <p className="text-gray-600">bookings@sourceofadventure.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Location</h4>
                        <p className="text-gray-600">123 Adventure Lane</p>
                        <p className="text-gray-600">Mountain View, CA 94040</p>
                        <p className="text-sm text-gray-500">Multiple locations across the country</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="adventure-card p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Emergency Contact</h3>
                  <p className="text-gray-600 mb-4">
                    For emergencies during adventures, contact our 24/7 safety team:
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-bold">Emergency Line: +254 (07) 01437959-ADVN</p>
                    <p className="text-red-600 text-sm">Available 24/7 for participants on active adventures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}