// app/contact/page.tsx
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import ContactForm from '@/components/contact/ContactForm'
import { EMAIL, HOURS, LOCATION, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/contact'

export const metadata = { title: 'Contact Us' }

export default function Contact() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero */}
        <PageHeader eyebrow="Contact" title="Let’s plan your" highlight="trip" subtitle="Questions, group bookings or a private adventure — we usually reply within the hour on WhatsApp." image="https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2000" focus="center 50%" />

        {/* Contact Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="adventure-card p-6 sm:p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Send us a Message</h2>
                <ContactForm />
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
                        <a href={`tel:${PHONE_TEL}`} className="text-gray-600 hover:text-accent-600">{PHONE_DISPLAY}</a>
                        <p className="text-sm text-gray-500">{HOURS}</p>
                        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-700 hover:underline">
                          Chat on WhatsApp →
                        </a>
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
                        <a href={`mailto:${EMAIL}`} className="text-gray-600 hover:text-accent-600">{EMAIL}</a>
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
                        <p className="text-gray-600">{LOCATION}</p>
                        <p className="text-sm text-gray-500">Adventures run at locations across Kenya</p>
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
                    <a href={`tel:${PHONE_TEL}`} className="text-red-800 font-bold">Emergency line: {PHONE_DISPLAY}</a>
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