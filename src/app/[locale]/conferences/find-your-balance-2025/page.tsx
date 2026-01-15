"use client"

import { useTranslations } from "next-intl";
import { TopNavigation } from "@/components/blocks/top-navigation";
import { Speakers2025 } from "@/components/blocks/speakers-2025";
import { ContactFooter } from "@/components/blocks/contact-footer";
import { NpsScore } from "@/components/blocks/nps-score";
import DarkVeil from "@/components/ui/dark-veil";
import {Link} from "@/i18n/routing";
import { Calendar, MapPin, Users, Award, ArrowRight, Mic2, Star, Newspaper } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
  delay: number
}

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, inView])

  return <>{count}</>
}

function StatCard({ icon, value, label, delay }: StatCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const numericValue = parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/[0-9]/g, "")

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="relative p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
          <div className="text-purple-400">{icon}</div>
        </div>

        {/* Value */}
        <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
          <AnimatedNumber value={numericValue} inView={isInView} />
          <span className="text-purple-400">{suffix}</span>
        </div>

        {/* Label */}
        <p className="text-white/60 text-sm sm:text-base">{label}</p>
      </div>
    </motion.div>
  )
}

export default function FindYourBalance2025Page() {
  const t = useTranslations("findYourBalance2025");
  const [galleryImages, setGalleryImages] = useState<Array<{ id: string; img: string; url: string }>>([])

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const response = await fetch("/api/gallery")
        const data = await response.json()
        // Get first 6 images for preview
        setGalleryImages(data.slice(0, 6))
      } catch (error) {
        console.error("Error fetching gallery images:", error)
      }
    }

    fetchGalleryImages()
  }, [])

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
            {/* Conference Badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-bold mb-6">
              {t("badge")}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-white">{t("title")} </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Balance
              </span>
            </h1>

            {/* Year */}
            <div className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-8">
              {t("year")}
            </div>

            {/* Description */}
            <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-12">
              {t("description")}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-white/60 text-sm mb-1">{t("dateLabel")}</div>
                <div className="text-white font-bold text-lg">{t("date")}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <MapPin className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <div className="text-white/60 text-sm mb-1">{t("locationLabel")}</div>
                <div className="text-white font-bold text-lg">{t("location")}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-white/60 text-sm mb-1">{t("topicLabel")}</div>
                <div className="text-white font-bold text-lg">{t("topic")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="text-left">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  {t("aboutTitle")}
                </h2>
                <div className="space-y-4 text-white/70 text-xl leading-relaxed">
                  <p>{t("aboutParagraph1")}</p>
                  <p>{t("aboutParagraph2")}</p>
                  <p>{t("aboutParagraph3")}</p>
                  <p className="text-white text-2xl font-bold">
                    {t("aboutParagraph4")}
                  </p>
                </div>
              </div>

              {/* Right side - Key Highlights Cards */}
              <div className="space-y-6">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
                  <Award className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-white font-bold text-xl mb-3">{t("keyTopicsTitle")}</h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• {t("keyTopic1")}</li>
                    <li>• {t("keyTopic2")}</li>
                    <li>• {t("keyTopic3")}</li>
                    <li>• {t("keyTopic4")}</li>
                  </ul>
                </div>
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
                  <Users className="w-8 h-8 text-pink-400 mb-4" />
                  <h3 className="text-white font-bold text-xl mb-3">{t("targetAudienceTitle")}</h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• {t("targetAudience1")}</li>
                    <li>• {t("targetAudience2")}</li>
                    <li>• {t("targetAudience3")}</li>
                    <li>• {t("targetAudience4")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t("galleryTitle")}
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                {t("galleryDescription")}
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer bg-white/5 border border-white/10"
                >
                  <Image
                    src={image.img}
                    alt={`Gallery image ${image.id}`}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link
                href="/galerija"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:opacity-90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
              >
                {t("viewGallery")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Left side - Text content */}
              <div className="text-left">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
                  {t("resultsTitle")}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                  {t("resultsConferenceTitle").split(" ").slice(0, 2).join(" ")}{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{t("year")}</span>
                </h2>
                <div className="space-y-4 text-white/70 text-base sm:text-lg leading-relaxed">
                  <p>{t("resultsParagraph1")}</p>
                  <p>{t("resultsParagraph2")}</p>
                  <p>{t("resultsParagraph3")}</p>
                </div>
              </div>

              {/* Right side - Stats grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <StatCard
                  icon={<Users className="w-6 h-6" />}
                  value="300"
                  label={t("statsParticipants")}
                  delay={0}
                />
                <StatCard
                  icon={<Mic2 className="w-6 h-6" />}
                  value="9"
                  label={t("statsSpeakers")}
                  delay={0.1}
                />
                <StatCard
                  icon={<Star className="w-6 h-6" />}
                  value="20"
                  label={t("statsInfluencers")}
                  delay={0.2}
                />
                <StatCard
                  icon={<Newspaper className="w-6 h-6" />}
                  value="30"
                  label={t("statsMedia")}
                  delay={0.3}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* NPS Score Section */}
        <NpsScore />

        {/* Marketing & Media Stats Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {t("numbersTitle")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Social Media Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t("socialMediaTitle")}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/60 text-base mb-1">{t("socialMediaReach")}</p>
                    <p className="text-3xl font-bold text-white">1.200.080</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-base mb-1">{t("socialMediaImpressions")}</p>
                    <p className="text-3xl font-bold text-white">3.496.793</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-white/60 text-base mb-1">{t("socialMediaClicks")}</p>
                      <p className="text-2xl font-bold text-white">14.523</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-base mb-1">{t("socialMediaLikes")}</p>
                      <p className="text-2xl font-bold text-white">5.104</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Google Ads Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t("googleAdsTitle")}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/60 text-base mb-1">{t("googleAdsImpressions")}</p>
                    <p className="text-3xl font-bold text-white">4.09 mil</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-base mb-1">{t("googleAdsClicks")}</p>
                    <p className="text-3xl font-bold text-white">10,061</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-white/60 text-base mb-1">{t("googleAdsConversions")}</p>
                      <p className="text-2xl font-bold text-white">678</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-base mb-1">{t("googleAdsCtr")}</p>
                      <p className="text-2xl font-bold text-white">2.02%</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* PR & Media Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Newspaper className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t("prMediaTitle")}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/60 text-base mb-1">{t("prMediaTexts")}</p>
                    <p className="text-3xl font-bold text-white">40+</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-base mb-1">{t("prMediaDomainAuthority")}</p>
                    <p className="text-3xl font-bold text-white">31/100</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-white/60 text-base mb-1">{t("prMediaBacklinks")}</p>
                      <p className="text-2xl font-bold text-white">365/16</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-base mb-1">{t("prMediaSpots")}</p>
                      <p className="text-2xl font-bold text-white">499</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <Speakers2025 />

        {/* CTA Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t("ctaTitle")}
            </h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              {t("ctaDescription")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/conferences/get-motivated-2026"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
              >
                {t("ctaButton1")}
              </Link>
              <Link
                href="/tickets"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:opacity-90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
              >
                {t("ctaButton2")}
              </Link>
            </div>
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  );
}
