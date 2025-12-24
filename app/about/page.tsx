// app/about/page.tsx
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import { Linkedin, Twitter, Globe, Dumbbell, Heart, Activity } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  const teamMembers = [
    {
      name: 'Mark Sila',
      role: 'Certified Personal Trainer & Aerobics Master',
      description: 'With over 6 years in fitness education, Mark specializes in high-energy aerobics and personalized training programs. His dynamic approach transforms fitness routines into exhilarating experiences that build strength, endurance, and confidence.',
      expertise: ['Personal Training', 'Aerobics Instruction', 'Cardio Conditioning', 'Fitness Programming'],
      image: '/mark.jpeg',
      icon: <Dumbbell className="w-6 h-6" />,
      social: {
        twitter: 'https://twitter.com/marksila',
        linkedin: 'https://linkedin.com/in/marksila',
        website: 'https://marksilafitness.com'
      }
    },
    {
      name: 'Teddy Mist',
      role: 'Fitness & Wellness Coach',
      description: 'Certified personal trainer and yoga instructor specializing in adventure fitness. Teddy designs programs that prepare both body and mind for outdoor challenges.',
      expertise: ['Fitness Training', 'Yoga & Mobility', 'Nutrition Planning', 'Mindfulness'],
      image: '/teddy.jpeg',
      icon: <Heart className="w-6 h-6" />,
      social: {
        twitter: 'https://twitter.com/teddymist',
        linkedin: 'https://linkedin.com/in/teddymist',
        website: 'https://teddymistwellness.com'
      }
    },
    {
      name: 'Edu Shark',
      role: 'Water Sports & Survival Expert',
      description: 'Navy veteran and professional dive instructor with expertise in all things aquatic. Edu Shark ensures safety while maximizing fun on water adventures.',
      expertise: ['Scuba Diving', 'Survival Training', 'Marine Conservation', 'Water Safety'],
      image: '/edu.jpeg',
      icon: <Activity className="w-6 h-6" />,
      social: {
        twitter: 'https://twitter.com/edushark',
        linkedin: 'https://linkedin.com/in/edushark',
        website: 'https://edusharkadventures.com'
      }
    }
  ]

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-adventure opacity-5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">
                About Source<span className="text-gradient-adventure"> of Adventure</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Where passion for adventure meets excellence in fitness training
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="adventure-card adventure-card-accent">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                <p className="text-gray-600">
                  To inspire individuals to transform their fitness journey into an adventure, combining 
                  expert training with exciting physical challenges that build strength, confidence, and vitality.
                </p>
              </div>

              <div className="adventure-card adventure-card-accent">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                <p className="text-gray-600">
                  Creating a world where fitness is not a chore but an adventure, where every workout 
                  brings joy and every achievement builds a stronger, healthier community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Meet Our Expert Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our certified professionals bring years of combined experience in fitness training, 
                wellness coaching, and adventure sports to guide your journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="adventure-card group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                  {/* Team Member Header with Image - FIXED */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top" // Changed to show faces at top
                      priority={member.name === 'Mark Sila'}
                    />
                    
                    {/* LIGHT Overlay at bottom only for text readability */}
                    <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${
                      member.name === 'Mark Sila' 
                        ? 'from-accent-900/40 to-transparent' 
                        : member.name === 'Teddy Mist'
                        ? 'from-green-900/40 to-transparent'
                        : 'from-blue-900/40 to-transparent'
                    }`} />
                    
                    {/* Icon Badge - MOVED to bottom left */}
                    <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-full ${
                      member.name === 'Mark Sila' 
                        ? 'bg-accent-500 text-white' 
                        : member.name === 'Teddy Mist'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white'
                    } flex items-center justify-center shadow-lg z-20`}>
                      {member.icon}
                    </div>
                    
                    {/* Name Display - WHITE TEXT for contrast */}
                    <div className="absolute bottom-4 left-20 z-20">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{member.name.split(' ')[0]}</h3>
                      <p className="text-white/90 font-medium">{member.name.split(' ')[1]}</p>
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="p-6">
                    {/* Role Titles - Better formatting */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold uppercase tracking-wider text-accent-600 mb-1">
                        PERSONAL TRAINER
                      </p>
                      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        AEROBICS MASTER
                      </p>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{member.description}</p>

                    {/* Expertise Tags */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                              member.name === 'Mark Sila'
                                ? 'bg-accent-100 text-accent-800'
                                : member.name === 'Teddy Mist'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3">
                      <a
                        href={member.social.twitter}
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 transform hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077B5] hover:text-white transition-all duration-300 transform hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={member.social.website}
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gradient-adventure hover:text-white transition-all duration-300 transform hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Website"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Philosophy Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Our Training Philosophy</h2>
              <p className="text-xl text-gray-600 mb-12">
                Led by Mark Sila's expertise, we believe fitness should be an adventure, not a routine.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Personalized Approach',
                    description: 'Custom programs tailored to your fitness level and adventure goals',
                    icon: '🎯'
                  },
                  {
                    title: 'High-Energy Sessions',
                    description: 'Dynamic aerobics and cardio that keep workouts exciting and effective',
                    icon: '⚡'
                  },
                  {
                    title: 'Adventure Integration',
                    description: 'Training that prepares you for real-world challenges and outdoor activities',
                    icon: '🏞️'
                  }
                ].map((principle, index) => (
                  <div key={index} className="text-center p-6">
                    <div className="text-5xl mb-4">{principle.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{principle.title}</h3>
                    <p className="text-gray-600">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Expert Training', 
                  desc: 'Professional guidance from certified fitness experts', 
                  icon: '👨‍🏫',
                  color: 'from-accent-500 to-accent-600'
                },
                { 
                  title: 'Energy & Fun', 
                  desc: 'High-energy workouts that make fitness enjoyable', 
                  icon: '💃',
                  color: 'from-orange-500 to-amber-500'
                },
                { 
                  title: 'Adventure Spirit', 
                  desc: 'Every workout is a step toward your next adventure', 
                  icon: '🧗',
                  color: 'from-green-500 to-emerald-500'
                },
              ].map((value) => (
                <div key={value.title} className="text-center p-8 bg-white rounded-2xl shadow-xl">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${value.color} mb-6`}>
                    <span className="text-3xl">{value.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
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