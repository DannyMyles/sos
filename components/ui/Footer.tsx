// components/Footer.tsx
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Adventures', href: '/adventures' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Aerobics', href: '/aerobics' },
    { name: 'Activities', href: '/activities' },
    { name: 'Contact', href: '/contact' },
  ]

  const services = [
    { name: 'Guided Tours', href: '/tours' },
    { name: 'Fitness Classes', href: '/aerobics' },
    { name: 'Group Adventures', href: '/adventures' },
    { name: 'Corporate Events', href: '/corporate' },
    { name: 'Private Bookings', href: '/private' },
    { name: 'Gift Cards', href: '/gift-cards' },
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Link href="/" className="flex items-center space-x-2">
                  <Image src="/SOA Logo-03.png" alt="Source of Adventure Logo" width={88} height={88} />
                <div>
                  <div>
                    <span className="text-xl font-bold text-gradient-adventure">Source of Adventure</span>
                  </div>
                  <p className="text-xs text-gray-100">Fun & Fitness</p>
                </div>
              </Link>
              {/* <div className="h-12 w-12 rounded-full bg-gradient-adventure p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <span className="text-2xl font-bold text-gradient-adventure">SOA</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">Source of Adventure</h2>
                <p className="text-sm text-gray-400">Fun & Fitness</p>
              </div> */}
            </div>
            <p className="text-gray-400 mb-6">
              Empowering adventures that combine thrilling experiences with fitness and fun.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  {social.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for adventure tips and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="btn-adventure w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Source of Adventure. All rights reserved.</p>
          <div className="mt-4 space-x-6 text-sm">
            <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="/safety" className="hover:text-accent transition-colors">Safety Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer