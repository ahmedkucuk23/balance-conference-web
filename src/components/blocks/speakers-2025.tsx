"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { TeamSection, type TeamMember } from "@/components/ui/team"
import { useTranslations, useLocale } from "next-intl"

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
  jobDescription?: string | null
  jobDescription_en?: string | null
  isTbd: boolean
  year: number
  order: number
}

export function Speakers2025() {
  const t = useTranslations('speakers2025')
  const locale = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Helper function to get localized content
  const getLocalizedContent = (bsContent: string | null | undefined, enContent: string | null | undefined) => {
    if (locale === 'en' && enContent) return enContent
    return bsContent || enContent || ''
  }

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        const response = await fetch('/api/speakers?year=2025')
        if (!response.ok) {
          throw new Error('Failed to fetch speakers')
        }
        const data = await response.json()
        // Handle error responses - ensure we always set an array
        if (Array.isArray(data)) {
          setSpeakers(data)
        } else {
          console.error('API returned non-array:', data)
          setSpeakers([])
        }
      } catch (err) {
        setError(t('errorLoading'))
        console.error('Error fetching speakers:', err)
        setSpeakers([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSpeakers()
  }, [])

  // Don't render section if there are no speakers
  if (!isLoading && !error && speakers.length === 0) {
    return null
  }

  return (
    <section id="predavaci-2025" ref={ref} className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              2025
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/70 text-base sm:text-lg">
            {t('description')}
          </p>
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Speakers grid */}
        {!isLoading && !error && speakers.length > 0 && (
          <TeamSection
            members={speakers.map((speaker): TeamMember => {
              const localizedLocation = getLocalizedContent(speaker.location, speaker.location_en)
              const localizedBio = getLocalizedContent(speaker.bio, speaker.bio_en)
              const localizedTopic = getLocalizedContent(speaker.topic, speaker.topic_en)

              return {
                name: speaker.name,
                role: localizedLocation || (localizedBio.substring(0, 50) + (localizedBio.length > 50 ? '...' : '')),
                avatar: speaker.image,
                topic: localizedTopic,
                link: speaker.link || undefined,
                slug: speaker.slug,
                isTbd: speaker.isTbd,
              }
            })}
            variant="detailed"
            className="py-0"
            learnMoreText={t('learnMore')}
          />
        )}
      </div>
    </section>
  )
}
