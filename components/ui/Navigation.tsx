// components/ui/Navigation.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Calendar, Phone } from 'lucide-react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Adventures', path: '/adventures' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Aerobics', path: '/aerobics' },
    { name: 'Activities', path: '/activities' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Contact', path: '/contact' },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled || isMenuOpen
          ? 'bg-white/95 backdrop-blur-md border-b border-accent/20 shadow-lg'
          : 'bg-white/80 backdrop-blur-md border-b border-accent/10'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 z-50">
              <div className="relative w-16 h-16">
                <Image 
                  src="/SOA Logo-03.png" 
                  alt="Source of Adventure Logo" 
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="hidden md:block">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gradient-adventure leading-tight">
                    Source of Adventure
                  </span>
                  <span className="text-sm text-gray-600 font-medium">Fun & Fitness</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`nav-link-accent font-medium text-gray-700 hover:text-accent-600 px-2 py-1 ${
                    pathname === item.path ? 'nav-link-active' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/contact" 
                className="btn-adventure flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-50 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}>
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Mobile Logo */}
            <div className="px-4 py-6 border-b border-gray-50">
              <div className="flex items-center space-x-3">
                <div>
                  <span className="text-xl font-bold text-gradient-adventure">
                    Source of Adventure
                  </span>
                  <p className="text-xs text-gray-600">Fun & Fitness</p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <div className="px-2 py-4 bg-gray-50">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      pathname === item.path
                        ? 'bg-accent-50 text-accent-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="mt-6 space-y-2 px-4">
                <Link 
                  href="/contact" 
                  className="btn-adventure w-full flex items-center justify-center gap-2 py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="w-5 h-5" />
                  Book Now
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-gray-100 px-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-3">CONTACT US</h4>
                <div className="space-y-2">
                  <p className="text-gray-600">Email: info@sourceofadventure.com</p>
                  <p className="text-gray-600">Phone: (254) 701437959</p>
                  <p className="text-gray-600">Hours: Mon-Fri 6AM-8PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to prevent content from being hidden under fixed nav */}
      <div className="h-20 md:h-24" />
    </>
  )
}

export default Navigation