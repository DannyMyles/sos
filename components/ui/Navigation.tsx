// components/Navigation.tsx
import Image from 'next/image'
import Link from 'next/link'

const Navigation = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Adventures', path: '/adventures' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Aerobics', path: '/aerobics' },
    { name: 'Activities', path: '/activities' },
    { name: 'Calender', path: '/calender' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="glass-adventure sticky top-0 z-50 w-full border-b border-accent/20 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
          <Image src="/SOA Logo-03.png" alt="Source of Adventure Logo" width={88} height={88} />
            <div>
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <span className="text-2xl font-bold text-gradient-adventure">Source of Adventure</span>
              </div>
              <p className="text-xs text-gray-600">Fun & Fitness</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="nav-link-accent font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button className="btn-adventure hidden md:block">
            Book Now
          </button>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation