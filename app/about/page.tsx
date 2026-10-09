import Image from 'next/image'
import { Compass, Eye, MessageCircle, Sparkles } from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import PageHeader from '@/components/ui/PageHeader'
import Footer from '@/components/ui/Footer'
import { getSite, pageHeader, waLink } from '@/lib/site'

export const metadata = { title: 'About Us' }
export const dynamic = 'force-dynamic'

const ACCENTS = [
  { ring: 'from-accent-900/50', chip: 'bg-accent-100 text-accent-800' },
  { ring: 'from-emerald-900/50', chip: 'bg-emerald-100 text-emerald-800' },
  { ring: 'from-sky-900/50', chip: 'bg-sky-100 text-sky-800' },
]

/** Everything on this page is edited in Admin → Settings (About, Team, Values). */
export default async function About() {
  const site = await getSite()
  const about = site.settings.about ?? {}
  const team = site.settings.team ?? []
  const values = site.settings.values ?? []
  const stats = site.settings.stats ?? []
  const header = pageHeader(site, 'about', {
    eyebrow: 'About us',
    title: 'Fitness, but make it an',
    highlight: 'adventure',
    subtitle: about.body || 'Where passion for the outdoors meets excellence in fitness training.',
    imageUrl: about.imageUrl || '/all.jpeg',
  })

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader
          eyebrow={header.eyebrow}
          title={header.title}
          highlight={header.highlight}
          subtitle={header.subtitle}
          image={header.imageUrl}
          focus="center 35%"
        />

        {(about.mission || about.vision) && (
          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2">
              {[
                { icon: Compass, title: 'Our Mission', text: about.mission },
                { icon: Eye, title: 'Our Vision', text: about.vision },
              ]
                .filter((c) => c.text)
                .map(({ icon: Icon, title, text }) => (
                  <div key={title} className="reveal rounded-3xl border border-stone-100 bg-gradient-to-b from-accent-50/60 to-white p-8">
                    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h2 className="mb-3 text-2xl font-bold text-stone-900">{title}</h2>
                    <p className="text-stone-600">{text}</p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {about.story && (
          <section className="py-16 md:py-20">
            <div className="container mx-auto max-w-3xl px-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-accent-600">Our story</p>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">{about.headline || 'How it started'}</h2>
              <div className="space-y-4 text-lg leading-relaxed text-stone-700">
                {about.story.split(/\n{2,}/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {stats.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto grid grid-cols-2 gap-4 px-4 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-stone-900 p-6 text-center text-white">
                  <p className="text-3xl font-extrabold text-accent-400">{s.value}</p>
                  <p className="text-sm text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {team.length > 0 && (
          <section className="bg-gradient-to-b from-white to-stone-50 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Meet the team</h2>
                <p className="mx-auto max-w-3xl text-lg text-stone-600">
                  Certified professionals with years of experience in fitness training, wellness coaching and adventure sports.
                </p>
              </div>
              <div className={`grid gap-8 ${team.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
                {team.map((member, i) => {
                  const accent = ACCENTS[i % ACCENTS.length]
                  const [first, ...rest] = member.name.split(' ')
                  return (
                    <article key={member.name} className="group flex flex-col overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                        {member.imageUrl && (
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            unoptimized={/^https?:/.test(member.imageUrl)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-top"
                          />
                        )}
                        <div className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t ${accent.ring} to-transparent`} />
                        <div className="absolute bottom-4 left-5 text-white drop-shadow-lg">
                          <h3 className="text-xl font-bold">{first}</h3>
                          {rest.length > 0 && <p className="font-medium text-white/90">{rest.join(' ')}</p>}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-600">{member.role}</p>
                        <p className="mb-6 leading-relaxed text-stone-600">{member.bio}</p>
                        {member.expertise && member.expertise.length > 0 && (
                          <div className="mb-6 flex flex-wrap gap-2">
                            {member.expertise.map((skill) => (
                              <span key={skill} className={`rounded-full px-3 py-1.5 text-sm font-medium ${accent.chip}`}>{skill}</span>
                            ))}
                          </div>
                        )}
                        <a
                          href={waLink(site, `Hi ${site.name}! I'd like to train with ${first}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
                        >
                          <MessageCircle className="h-4 w-4" /> Train with {first}
                        </a>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {values.length > 0 && (
          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">What we stand for</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {values.map((v) => (
                  <div key={v.title} className="reveal rounded-2xl border border-stone-100 p-6">
                    <Sparkles className="mb-3 h-6 w-6 text-accent-500" />
                    <h3 className="mb-2 text-lg font-bold text-stone-900">{v.title}</h3>
                    <p className="text-stone-600">{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
