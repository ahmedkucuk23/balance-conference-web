'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {Link} from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { TopNavigation } from '@/components/blocks/top-navigation'
import { ContactFooter } from '@/components/blocks/contact-footer'
import { ArrowLeft, MapPin, Loader2, Briefcase, Facebook, Instagram, Linkedin, Globe } from 'lucide-react'
import DarkVeil from '@/components/ui/dark-veil'

interface Speaker {
  id: string
  slug: string
  name: string
  topic: string
  topic_en: string | null
  bio: string
  bio_en: string | null
  details: string | null
  details_en: string | null
  image: string
  link: string | null
  location: string | null
  location_en: string | null
  jobDescription: string | null
  jobDescription_en: string | null
  facebook: string | null
  instagram: string | null
  linkedin: string | null
  webpage: string | null
  isTbd: boolean
  year: number
  order: number
  isActive: boolean
}

interface SpeakerPageProps {
  params: Promise<{
    slug: string
  }> | {
    slug: string
  }
}

export default function SpeakerPage({ params }: SpeakerPageProps) {
  const t = useTranslations("speakerPage")
  const locale = useLocale()
  const router = useRouter()
  const [speaker, setSpeaker] = useState<Speaker | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Helper function to get localized content
  const getLocalizedContent = (bsContent: string | null, enContent: string | null) => {
    if (locale === 'en' && enContent) return enContent
    return bsContent || enContent || ''
  }

  useEffect(() => {
    async function loadSpeaker() {
      try {
        let resolvedSlug: string

        if (params && typeof params === 'object' && 'then' in params) {
          const resolvedParams = await params
          resolvedSlug = resolvedParams.slug
        } else if (params && typeof params === 'object' && 'slug' in params) {
          resolvedSlug = params.slug
        } else {
          return
        }

        const response = await fetch(`/api/speakers/slug/${resolvedSlug}`)

        if (!response.ok) {
          if (response.status === 404) {
            router.push('/speakers')
            return
          }
          throw new Error('Failed to fetch speaker')
        }

        const data = await response.json()
        setSpeaker(data)
      } catch (err) {
        setError(t('errorLoading'))
        console.error('Error fetching speaker:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadSpeaker()
  }, [params, router])

  if (isLoading) {
    return (
      <main className="bg-[#0A031B] min-h-screen relative">
        <div className="fixed inset-0 w-full h-full z-0">
          <DarkVeil speed={0.3} />
        </div>
        <div className="relative z-10">
          <TopNavigation glassmorphismOnly />
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        </div>
      </main>
    )
  }

  if (error || !speaker) {
    return (
      <main className="bg-[#0A031B] min-h-screen relative">
        <div className="fixed inset-0 w-full h-full z-0">
          <DarkVeil speed={0.3} />
        </div>
        <div className="relative z-10">
          <TopNavigation glassmorphismOnly />
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <p className="text-red-400">{error || t('speakerNotFound')}</p>
            <Link
              href="/speakers"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToSpeakers')}
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const hasSocialLinks = speaker.facebook || speaker.instagram || speaker.linkedin || speaker.webpage

  return (
    <main className="bg-[#0A031B] min-h-screen relative">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <TopNavigation glassmorphismOnly />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Back button */}
            <Link
              href="/speakers"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToSpeakers')}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left: Speaker Image */}
              <div className="lg:col-span-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/10">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                  {speaker.isTbd && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/80 text-white text-xs font-medium">
                      {t('comingSoon')}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Speaker Info */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                {/* Year badge */}
                <span className="inline-block w-fit px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 text-sm font-bold mb-4">
                  Get Motivated {speaker.year}
                </span>

                {/* Name */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {speaker.name}
                </h1>

                {/* Location */}
                {(speaker.location || speaker.location_en) && (
                  <div className="flex items-center gap-3 text-white/70 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-lg font-medium">{getLocalizedContent(speaker.location, speaker.location_en)}</span>
                  </div>
                )}

                {/* Job Description */}
                {(speaker.jobDescription || speaker.jobDescription_en) && (
                  <div className="flex items-center gap-3 text-white/70 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-pink-400" />
                    </div>
                    <span className="text-lg font-medium">{getLocalizedContent(speaker.jobDescription, speaker.jobDescription_en)}</span>
                  </div>
                )}

                {/* Social Media Icons */}
                {hasSocialLinks && (
                  <div className="flex items-center gap-3 mt-2">
                    {speaker.facebook && (
                      <a
                        href={speaker.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-14 h-14 rounded-2xl bg-[#1a0a2e] border-2 border-purple-500/30 flex items-center justify-center hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/20"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-6 h-6 text-white/60 group-hover:text-blue-400 transition-colors" />
                      </a>
                    )}
                    {speaker.instagram && (
                      <a
                        href={speaker.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-14 h-14 rounded-2xl bg-[#1a0a2e] border-2 border-purple-500/30 flex items-center justify-center hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-pink-500/20"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-6 h-6 text-white/60 group-hover:text-pink-400 transition-colors" />
                      </a>
                    )}
                    {speaker.linkedin && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-14 h-14 rounded-2xl bg-[#1a0a2e] border-2 border-purple-500/30 flex items-center justify-center hover:border-sky-500 hover:bg-sky-500/10 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-sky-500/20"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-6 h-6 text-white/60 group-hover:text-sky-400 transition-colors" />
                      </a>
                    )}
                    {speaker.webpage && (
                      <a
                        href={speaker.webpage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-14 h-14 rounded-2xl bg-[#1a0a2e] border-2 border-purple-500/30 flex items-center justify-center hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/20"
                        aria-label="Website"
                      >
                        <Globe className="w-6 h-6 text-white/60 group-hover:text-purple-400 transition-colors" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Topic & Bio Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Topic - Large and Bold */}
            <div className="mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-bold uppercase tracking-wider mb-6">
                {t('topicLabel')}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                {getLocalizedContent(speaker.topic, speaker.topic_en)}
              </h2>
            </div>

            {/* Bio */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                {t('aboutSpeaker')}
              </h3>
              <p className="text-white/70 text-lg leading-relaxed whitespace-pre-line">
                {getLocalizedContent(speaker.bio, speaker.bio_en)}
              </p>
            </div>

            {/* Details */}
            {(speaker.details || speaker.details_en) && (
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></div>
                  {t('additionalInfo')}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed whitespace-pre-line">
                  {getLocalizedContent(speaker.details, speaker.details_en)}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t('ctaTitle', { name: speaker.name.split(' ')[0] })}
            </h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              {t('ctaDescription', { year: speaker.year, topic: getLocalizedContent(speaker.topic, speaker.topic_en) })}
            </p>
            <Link
              href="/tickets"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:opacity-90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              {t('buyTicket')}
            </Link>
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  )
}
