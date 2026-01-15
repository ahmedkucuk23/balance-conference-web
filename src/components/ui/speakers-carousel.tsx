"use client"

import { motion, useAnimationControls } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl'

interface Speaker {
  id: string
  slug: string
  name: string
  topic: string
  topic_en?: string | null
  bio: string
  bio_en?: string | null
  details?: string | null
  details_en?: string | null
  image: string
  link?: string | null
  location?: string | null
  location_en?: string | null
  isTbd: boolean
  year: number
  order: number
}

interface SpeakersCarouselProps {
  title?: string
  subtitle?: string
  year?: number
}

export const SpeakersCarousel = ({
  title,
  subtitle,
  year = 2026,
}: SpeakersCarouselProps) => {
  const t = useTranslations('speakers')
  const locale = useLocale()
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Helper function to get localized content
  const getLocalizedContent = (bsContent: string | null | undefined, enContent: string | null | undefined) => {
    if (locale === 'en' && enContent) return enContent
    return bsContent || enContent || ''
  }

  // Fetch speakers from API
  useEffect(() => {
    async function fetchSpeakers() {
      try {
        const response = await fetch(`/api/speakers?year=${year}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error("API Error:", response.status, errorData)
          throw new Error(`Failed to fetch speakers: ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          console.error("Invalid data format:", data)
          throw new Error("Invalid data format received")
        }

        setSpeakers(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        console.error("Error fetching speakers:", errorMessage, err)
        setError(t('errorLoading'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchSpeakers()
  }, [year])

  // Calculate items per view based on screen size (3 on desktop, 1 on mobile)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const [startIndex, setStartIndex] = useState(0)

  // Navigation functions - move one speaker at a time with infinite loop
  const goToNext = () => {
    setStartIndex((prev) => (prev + 1) % speakers.length)
  }

  const goToPrevious = () => {
    setStartIndex((prev) => (prev - 1 + speakers.length) % speakers.length)
  }

  const goToSlide = (index: number) => {
    setStartIndex(index)
  }

  // Get visible speakers with wrapping for infinite scroll
  const getVisibleSpeakers = () => {
    const visible = []
    for (let i = 0; i < itemsPerView; i++) {
      const index = (startIndex + i) % speakers.length
      visible.push(speakers[index])
    }
    return visible
  }

  const visibleSpeakers = getVisibleSpeakers()

  if (isLoading) {
    return (
      <section className="w-full py-16 sm:py-24">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full py-16 sm:py-24">
        <div className="text-center py-20">
          <p className="text-red-400">{error}</p>
        </div>
      </section>
    )
  }

  if (speakers.length === 0) {
    return null
  }

  return (
    <section id="predavaci" className="w-full py-16 sm:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            Get Motivated {year}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title || t('title')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {year}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {subtitle || t('subtitle')}
          </p>
        </motion.div>

        {/* Speakers Grid with Side Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          {speakers.length > itemsPerView && (
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 -ml-2 sm:-ml-6"
              aria-label="Previous speaker"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow */}
          {speakers.length > itemsPerView && (
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 -mr-2 sm:-mr-6"
              aria-label="Next speaker"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Speakers Grid */}
          <div className="px-8 sm:px-12">
            <motion.div
              key={`carousel-${startIndex}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {visibleSpeakers.map((speaker, idx) => (
                <Link
                  key={speaker.id}
                  href={`/speakers/${speaker.slug}`}
                  className="block w-full"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group cursor-pointer h-full">
                    <div className="relative">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      {/* TBD Badge */}
                      {speaker.isTbd && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/80 text-white text-xs font-medium">
                          {t('comingSoon')}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                      <Quote
                        className="mb-3 h-6 w-6 text-purple-400/60"
                        aria-hidden="true"
                      />
                      <p className="text-xl font-semibold leading-tight text-white/90 line-clamp-2 mb-4">
                        {getLocalizedContent(speaker.topic, speaker.topic_en)}
                      </p>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="font-semibold text-base text-white">
                            {speaker.name}
                          </p>
                          <p className="text-sm text-white/60 line-clamp-1">
                            {getLocalizedContent(speaker.location, speaker.location_en) ||
                             (getLocalizedContent(speaker.bio, speaker.bio_en).substring(0, 30) +
                             (getLocalizedContent(speaker.bio, speaker.bio_en).length > 30 ? "..." : ""))}
                          </p>
                        </div>
                        <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Pagination Dots */}
        {speakers.length > itemsPerView && (
          <div className="flex justify-center gap-2 mt-8">
            {speakers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === startIndex
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to speaker ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            {t('viewAll')}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default SpeakersCarousel
