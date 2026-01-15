"use client"

import { useTranslations, useLocale } from "next-intl"
import { TopNavigation } from "@/components/blocks/top-navigation"
import { ContactFooter } from "@/components/blocks/contact-footer"
import DarkVeil from "@/components/ui/dark-veil"
import { CircularTestimonials } from "@/components/ui/circular-testimonials"
import { GuestReviews } from "@/components/ui/guest-reviews"
import { VideoSlider } from "@/components/ui/video-slider"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface SpeakerReview {
  id: string
  name: string
  jobDescription: string | null
  jobDescription_en: string | null
  image: string
  review: string | null
  review_en: string | null
}

interface GalleryVideo {
  id: string
  url: string
  thumbnail?: string
  title?: string
}

export default function RecenzijePage() {
  const t = useTranslations("reviews");
  const locale = useLocale()
  const [speakerReviews, setSpeakerReviews] = useState<SpeakerReview[]>([])
  const [videoReviews, setVideoReviews] = useState<GalleryVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Helper function to get localized content
  const getLocalizedContent = (bsContent: string | null, enContent: string | null) => {
    if (locale === 'en' && enContent) return enContent
    return bsContent || enContent || ''
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch speaker reviews
        const speakersResponse = await fetch("/api/speakers/reviews")
        const speakersData = await speakersResponse.json()

        // Ensure data is an array before setting state
        if (Array.isArray(speakersData)) {
          setSpeakerReviews(speakersData)
        } else {
          console.error("API did not return an array:", speakersData)
          setSpeakerReviews([])
        }

        // Fetch video reviews
        const videosResponse = await fetch('/api/video-gallery')
        const videosData = await videosResponse.json()
        setVideoReviews(videosData)
      } catch (error) {
        console.error("Error fetching data:", error)
        setSpeakerReviews([])
        setVideoReviews([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Convert speaker reviews to testimonial format
  const speakerTestimonials = Array.isArray(speakerReviews)
    ? speakerReviews.map((speaker) => ({
        quote: getLocalizedContent(speaker.review, speaker.review_en),
        name: speaker.name,
        designation: getLocalizedContent(speaker.jobDescription, speaker.jobDescription_en) || t("speaker"),
        src: speaker.image,
      }))
    : []

  // Guest reviews - samo komentari, bez avatara i imena
  const guestReviews = [
    {
      text: t("review1"),
    },
    {
      text: t("review2"),
    },
    {
      text: t("review3"),
    },
    {
      text: t("review4"),
    },
    {
      text: t("review5"),
    },
    {
      text: t("review6"),
    },
    {
      text: t("review7"),
    },
  ]

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

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            {/* Badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
              {t("badge")}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("title")}
            </h1>

            {/* Description */}
            <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>
        </section>

        {/* Video Reviews Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
                {t("communityVoices")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t("participantImpressions1")}{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t("participantImpressions2")}
                </span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                {t("participantDescription")}
              </p>
            </div>

            {/* Video Reviews Slider */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              </div>
            ) : videoReviews.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/60 text-lg">
                  {t("noReviews")}
                </p>
              </div>
            ) : (
              <VideoSlider videos={videoReviews} />
            )}
          </div>
        </section>

        {/* Guest Reviews Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
                {t("communityVoices")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t("participantImpressions1")}{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t("participantImpressions2")}
                </span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                {t("participantDescription")}
              </p>
            </div>

            {/* Guest reviews grid */}
            <GuestReviews reviews={guestReviews} />
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  )
}
