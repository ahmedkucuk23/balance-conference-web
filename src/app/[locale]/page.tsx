"use client"

import { useState, useEffect } from "react"
import { useTranslations } from 'next-intl'
import { TopNavigation } from "@/components/blocks/top-navigation";
import { HeroSection2026 } from "@/components/blocks/hero-section-2026";
import { Recap2025 } from "@/components/blocks/recap-2025";
import { NpsScore } from "@/components/blocks/nps-score";
import { AboutConference } from "@/components/blocks/about-conference";
import { MotivacijaSection } from "@/components/blocks/motivacija-section";
import { BurnoutSection } from "@/components/blocks/burnout-section";
import { BenefitsCombined } from "@/components/blocks/benefits-combined";
import { TicketIncludes } from "@/components/blocks/ticket-includes";
import { ConferenceOffering } from "@/components/blocks/conference-offering";
import { WhatsNew2026 } from "@/components/blocks/whats-new-2026";
import { SpeakersCarousel } from "@/components/ui/speakers-carousel";
import { BlogSection } from "@/components/blocks/blog-section";
import { ContactFooter } from "@/components/blocks/contact-footer";
import DarkVeil from "@/components/ui/dark-veil";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { VideoSlider } from "@/components/ui/video-slider";
import { SponsorsLogos } from "@/components/blocks/sponsors-logos";

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

  return (
    <main className="bg-[#0A031B] min-h-screen relative">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <TopNavigation glassmorphismOnly />
        <HeroSection2026 />
        <MotivacijaSection />

        {/* Unified background section for Speakers */}
        <div className="relative">
          {/* Fixed DarkVeil Background - stays on top while scrolling through speakers section */}
          <div className="sticky top-0 w-full h-screen pointer-events-none -z-10">
            <DarkVeil speed={0.3} />
          </div>

          <div className="relative -mt-[100vh]">
            <SpeakersCarousel />
          </div>
        </div>

        <BenefitsCombined />

        {/* Unified background section for Tickets, Recap, NPS, and Testimonials */}
        <div className="relative">
          {/* Fixed DarkVeil Background - stays on top while scrolling through these sections */}
          <div className="sticky top-0 w-full h-screen pointer-events-none -z-10">
            <DarkVeil speed={0.3} />
          </div>

          <div className="relative -mt-[100vh]">
            <TicketIncludes />
            <SponsorsLogos />
            <Recap2025 />

            {/* Full-width YouTube Video */}
            <section className="relative py-16 sm:py-24">
              <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/Qoy23XGN5qU?si=CqPw5HcJipq746hl"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
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
          </div>
        </div>

        {/* <ConferenceOffering /> */}
        {/* <BlogSection /> */}
        <ContactFooter />
      </div>
    </main>
  );
}
