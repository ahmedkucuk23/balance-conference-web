'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

type Speaker = {
  name: string
  image: string
  slug: string
  description: string
}

export function PastSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/api/speakers')
      .then(res => res.json())
      .then(data => {
        if (data.speakers) {
          const formattedSpeakers: Speaker[] = data.speakers
            .filter((speaker: any) => speaker.published)
            .map((speaker: any) => ({
              name: speaker.name,
              slug: speaker.slug,
              description: speaker.shortDescription || speaker.location || '',
              image: speaker.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1066&fit=crop',
            }))
          setSpeakers(formattedSpeakers)
          console.log('Loaded past speakers:', formattedSpeakers)
        }
      })
      .catch(err => console.error('Error fetching speakers:', err))
      .finally(() => setLoading(false))
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : speakers.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < speakers.length - 1 ? prev + 1 : 0))
  }

  const SpeakerCard = ({ speaker }: { speaker: Speaker }) => (
    <Link
      href={`/speakers/${speaker.slug}`}
      aria-label={`Open profile for ${speaker.name}`}
      className="group block"
    >
      <figure className="relative aspect-3/4 w-full overflow-hidden rounded-3xl">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/0" />
        <figcaption className="absolute bottom-6 left-6 right-6">
          <div className="transition-all duration-300 ease-out translate-y-2 md:group-hover:-translate-y-1">
            <div className="text-white text-2xl md:text-3xl font-extrabold leading-tight md:text-4xl">
              {speaker.name}
            </div>
            <div className="text-white/90 mt-2 text-sm md:opacity-0 md:translate-y-2 md:max-h-0 md:overflow-hidden md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:max-h-12 transition-all duration-300 ease-out">
              {speaker.description}
            </div>
          </div>
        </figcaption>
      </figure>
    </Link>
  )

  return (
    <section className="bg-background py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Past Speakers</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">
              Our Sarajevo edition featured leading experts and global voices in wellbeing, leadership,
              and lifestyle innovation, offering perspectives that continue to shape our understanding
              of a balanced life.
            </p>
          </div>
          <Button asChild variant="link" className="hidden md:inline-flex">
            <Link href="/speakers" className="flex items-center gap-2">
              <span>See All Speakers</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading speakers...</div>
        ) : speakers.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No speakers available yet</div>
        ) : (
          <>
            {/* Desktop: Infinite Slider with Prev/Next Buttons */}
            <div className="hidden md:block">
              <div className="relative -mx-6 lg:-mx-12">
                <div className="overflow-hidden rounded-4xl p-2 md:p-3">
                  <InfiniteSlider gap={24} duration={60} durationOnHover={100000}>
                    {speakers.map((speaker, idx) => (
                      <div key={idx} className="w-[260px] md:w-[320px] lg:w-[360px]">
                        <SpeakerCard speaker={speaker} />
                      </div>
                    ))}
                  </InfiniteSlider>
                </div>

                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-24 md:w-32 z-10"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-24 md:w-32 z-10"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>

            {/* Mobile: Swipeable Carousel */}
            <div className="md:hidden relative">
              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{
                    x: `-${currentIndex * 100}%`
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x
                    const swipeThreshold = 50

                    if (swipe > swipeThreshold && currentIndex > 0) {
                      handlePrev()
                    } else if (swipe < -swipeThreshold && currentIndex < speakers.length - 1) {
                      handleNext()
                    }
                  }}
                >
                  {speakers.map((speaker, idx) => (
                    <div
                      key={idx}
                      className="min-w-full px-4"
                    >
                      <SpeakerCard speaker={speaker} />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Mobile Pagination Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {speakers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex ? 'w-8 bg-foreground' : 'w-2 bg-foreground/30'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Mobile Navigation Arrows */}
              <div className="flex justify-between items-center mt-6 px-4">
                <Button
                  onClick={handlePrev}
                  size="icon"
                  variant="outline"
                  className="h-10 w-10 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} / {speakers.length}
                </span>
                <Button
                  onClick={handleNext}
                  size="icon"
                  variant="outline"
                  className="h-10 w-10 rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="mt-6 flex justify-center md:hidden">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/speakers">See All Speakers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PastSpeakers
