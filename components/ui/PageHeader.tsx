import Image from 'next/image'

interface PageHeaderProps {
  eyebrow: string
  title: string
  highlight: string
  subtitle: string
  image: string
  /** CSS object-position for the photo, e.g. "center 30%". */
  focus?: string
}

/**
 * Shared page banner: a full-bleed outdoor photo under a warm, dark
 * gradient with a large title. Gives every inner page the same opening.
 */
export default function PageHeader({ eyebrow, title, highlight, subtitle, image, focus = 'center' }: PageHeaderProps) {
  return (
    <section className="px-3 pt-3 sm:px-4">
      <div className="relative mx-auto flex min-h-[320px] max-w-7xl items-end overflow-hidden rounded-4xl bg-stone-900 md:min-h-[420px]">
        <Image
          src={image}
          alt=""
          fill
          priority
          // Admin-supplied URLs may come from any host; only Unsplash is optimised.
          unoptimized={/^https?:/.test(image) && !image.startsWith('https://images.unsplash.com/')}
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/45 to-stone-900/10" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 to-transparent" aria-hidden />

        <div className="enter-up relative w-full px-6 pb-10 pt-24 text-white md:px-14 md:pb-14">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-black/25 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-300 ring-1 ring-white/20">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">
            {title} <span className="text-accent-400">{highlight}</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">{subtitle}</p>
        </div>
      </div>
    </section>
  )
}
