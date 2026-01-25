"use client"

import { useState, useEffect } from "react"
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { TopNavigation } from "@/components/blocks/top-navigation";
import { HeroSection2026 } from "@/components/blocks/hero-section-2026";
import { MotivacijaSection } from "@/components/blocks/motivacija-section";
import { SpeakersCarousel } from "@/components/ui/speakers-carousel";
import { BenefitsCombined } from "@/components/blocks/benefits-combined";
import { TicketIncludes } from "@/components/blocks/ticket-includes";
import { ContactFooter } from "@/components/blocks/contact-footer";
import { SponsorsLogos } from "@/components/blocks/sponsors-logos";

// Lazy load heavy components
const DarkVeil = dynamic(() => import("@/components/ui/dark-veil"), { ssr: false });
const Recap2025 = dynamic(() => import("@/components/blocks/recap-2025").then(mod => ({ default: mod.Recap2025 })));
const NpsScore = dynamic(() => import("@/components/blocks/nps-score").then(mod => ({ default: mod.NpsScore })));
const TestimonialsColumn = dynamic(() => import("@/components/ui/testimonials-columns-1").then(mod => ({ default: mod.TestimonialsColumn })));
const VideoSlider = dynamic(() => import("@/components/ui/video-slider").then(mod => ({ default: mod.VideoSlider })));

interface GalleryVideo {
  id: string
  url: string
  thumbnail?: string
  title?: string
}

export default function Home() {
  const t = useTranslations('homepage')
  const tTestimonials = useTranslations('testimonials')
  const [videoReviews, setVideoReviews] = useState<GalleryVideo[]>([])

  useEffect(() => {
    async function fetchGalleryVideos() {
      try {
        const response = await fetch('/api/video-gallery')
        const data = await response.json()
        setVideoReviews(data)
      } catch (error) {
        console.error("Error loading gallery videos:", error)
      }
    }

    fetchGalleryVideos()
  }, [])

  // Guest reviews - formatted for TestimonialsColumn
  const guestReviewsColumns = [
    {
      text: tTestimonials('review1.text'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      name: tTestimonials('review1.name'),
      role: tTestimonials('review1.role'),
    },
    {
      text: tTestimonials('review2.text'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      name: tTestimonials('review2.name'),
      role: tTestimonials('review2.role'),
    },
    {
      text: tTestimonials('review3.text'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      name: tTestimonials('review3.name'),
      role: tTestimonials('review3.role'),
    },
    {
      text: tTestimonials('review4.text'),
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      name: tTestimonials('review4.name'),
      role: tTestimonials('review4.role'),
    },
    {
      text: tTestimonials('review5.text'),
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      name: tTestimonials('review5.name'),
      role: tTestimonials('review5.role'),
    },
    {
      text: tTestimonials('review6.text'),
      image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=400&h=400&fit=crop',
      name: tTestimonials('review6.name'),
      role: tTestimonials('review6.role'),
    },
    {
      text: tTestimonials('review7.text'),
      image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop',
      name: tTestimonials('review7.name'),
      role: tTestimonials('review7.role'),
    },
  ]

  // Split into three columns
  const firstColumn = guestReviewsColumns.slice(0, 3)
  const secondColumn = guestReviewsColumns.slice(3, 5)
  const thirdColumn = guestReviewsColumns.slice(5, 7)

  const [showYouTube, setShowYouTube] = useState(false)

  return (
    <main className="bg-[#0A031B] min-h-screen relative">
      {/* Single DarkVeil Background - fixed position covers everything */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <TopNavigation glassmorphismOnly />
        <HeroSection2026 />
        <MotivacijaSection />
        <SpeakersCarousel />
        <BenefitsCombined />
        <TicketIncludes />
        <SponsorsLogos />
        <Recap2025 />

        {/* Lazy-loaded YouTube Video */}
        <section className="relative py-16 sm:py-24">
          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {showYouTube ? (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/Qoy23XGN5qU?si=CqPw5HcJipq746hl&autoplay=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    onClick={() => setShowYouTube(true)}
                    className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/50 flex items-center justify-center group cursor-pointer border border-white/10 hover:border-purple-500/50 transition-all"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <NpsScore />

        {/* Guest Reviews Section */}
        <section className="relative py-16 sm:py-24">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
                {t('testimonialsTitle')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t('testimonialsSubtitle').split(' ')[0]}{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t('testimonialsSubtitle').split(' ').slice(1).join(' ')}
                </span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                {t('testimonialsDescription')}
              </p>
            </div>

            {/* Video Reviews Slider */}
            {videoReviews.length > 0 && <VideoSlider videos={videoReviews} />}

            {/* Testimonials columns with infinite scroll */}
            <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
              <TestimonialsColumn testimonials={firstColumn} duration={15} />
              <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
              <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
            </div>
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  );
}
