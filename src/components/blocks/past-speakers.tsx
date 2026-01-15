'use client'
import React from 'react'
import Link from 'next/link'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Speaker = {
  name: string
  image: string
  slug: string
  description: string
}

const speakers: Speaker[] = [
  { name: 'Marija Sinanović', slug: 'marija-sinanovic', description: 'Entrepreneur & Leadership Coach', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1066&fit=crop' },
  { name: 'Akan Abdula', slug: 'akan-abdula', description: 'Brand Strategist & Author', image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&h=1066&fit=crop' },
  { name: 'Dr. Bilgin Sait', slug: 'dr-bilgin-sait', description: 'Neuroscientist & Educator', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1066&fit=crop' },
  { name: 'Prof. dr. Maja Volk', slug: 'prof-dr-maja-volk', description: 'Nutritionist & Wellness Expert', image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=800&h=1066&fit=crop' },
  { name: 'Anya Patel', slug: 'anya-patel', description: 'Mindfulness Teacher', image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&h=1066&fit=crop' },
  { name: 'David Chen', slug: 'david-chen', description: 'Organizational Psychologist', image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=800&h=1066&fit=crop' },
]

export function PastSpeakers() {
  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Past Speakers</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">
              Our Sarajevo edition featured leading experts and global voices in wellbeing, leadership,
              and lifestyle innovation, offering perspectives that continue to shape our understanding
              of a balanced life.
            </p>
          </div>
          <Link href="#" className="group hidden items-center gap-2 text-sm font-medium md:inline-flex">
            <span>See All Speakers</span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative -mr-12 lg:-mr-96">
          <div className="overflow-hidden rounded-4xl p-2 md:p-3">
            <InfiniteSlider gap={24} duration={60} durationOnHover={100000}>
              {speakers.map((speaker, idx) => (
                <Link
                  key={idx}
                  href={`/speakers/${speaker.slug}`}
                  aria-label={`Open profile for ${speaker.name}`}
                  className="group block"
                >
                  <figure className="relative aspect-3/4 w-[260px] overflow-hidden rounded-3xl md:w-[320px] lg:w-[360px]">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="absolute inset-0 size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/0" />
                    <figcaption className="absolute bottom-6 left-6 right-6">
                      <div className="transition-all duration-300 ease-out translate-y-2 md:group-hover:-translate-y-1">
                        <div className="text-white text-3xl font-extrabold leading-tight md:text-4xl">
                          {speaker.name}
                        </div>
                        <div className="sm-body-semibold text-white/90 mt-1 opacity-0 translate-y-2 max-h-0 overflow-hidden md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:max-h-12 transition-all duration-300 ease-out">
                          {speaker.description}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </InfiniteSlider>
          </div>

          <ProgressiveBlur
            className="pointer-events-none absolute left-0 top-0 h-full w-24 md:w-32"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute right-0 top-0 h-full w-48 md:w-64 lg:w-80"
            direction="right"
            blurIntensity={1}
          />
        </div>
        <div className="mt-6 flex justify-center md:hidden">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="#">See All Speakers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PastSpeakers


