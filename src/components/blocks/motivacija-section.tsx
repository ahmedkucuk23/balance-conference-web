"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Heart, Repeat, Brain, Scale, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { PhotoGallerySlider } from "./photo-gallery-slider"
import Image from "next/image"

export function MotivacijaSection() {
  const t = useTranslations('motivation')
  const tHome = useTranslations('homepage')
  const tSponsors = useTranslations('sponsorsLogos')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const motivationPoints = [
    {
      icon: Shield,
      title: t('preventsBurnout'),
      description: t('preventsBurnoutDesc')
    },
    {
      icon: Heart,
      title: t('healthyBoundaries'),
      description: t('healthyBoundariesDesc')
    },
    {
      icon: Repeat,
      title: t('supportsContinuity'),
      description: t('supportsContinuityDesc')
    },
    {
      icon: Brain,
      title: t('mentalHealth'),
      description: t('mentalHealthDesc')
    },
    {
      icon: Scale,
      title: t('bridgeSuccessPeace'),
      description: t('bridgeSuccessPeaceDesc')
    },
    {
      icon: Sparkles,
      title: t('strengthensConfidence'),
      description: t('strengthensConfidenceDesc')
    }
  ]

  return (
    <section ref={ref} className="relative py-20 sm:py-24 bg-[#0A031B] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {tHome('motivationTitle')}
          </h2>
          <p className="max-w-4xl mx-auto text-white/70 text-base sm:text-lg leading-relaxed mb-0">
            {tHome('motivationDescription')}
          </p>
        </motion.div>
      </div>

      {/* Photo Gallery Slider - Outside the container for full width effect */}
      <PhotoGallerySlider />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Motivation subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-white">
            {tHome('motivationSubtitle')}
          </h3>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motivationPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <point.icon className="w-7 h-7 text-purple-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {point.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gold Sponsor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-6">
            {tSponsors('goldSponsor')}
          </h3>
          <div className="flex justify-center">
            <Image
              src="/sponsors/balans-plus.png"
              alt="Balans+"
              width={280}
              height={140}
              className="object-contain h-28 w-auto max-w-[280px] brightness-0 invert"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
