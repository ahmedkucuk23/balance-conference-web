"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Award, Mic2, Heart, MessageCircle, Stethoscope, Users, Video, Dumbbell, Laugh, UtensilsCrossed, Sparkles, Gift } from "lucide-react"
import { useTranslations } from "next-intl"

export function WhatsNew2026() {
  const t = useTranslations('whatsNew')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    { icon: Award, text: t('feature1') },
    { icon: Mic2, text: t('feature2') },
    { icon: Heart, text: t('feature3') },
    { icon: MessageCircle, text: t('feature4') },
    { icon: Stethoscope, text: t('feature5') },
    { icon: Users, text: t('feature6') },
    { icon: Video, text: t('feature7') },
    { icon: Dumbbell, text: t('feature8') },
    { icon: Laugh, text: t('feature9') },
    { icon: UtensilsCrossed, text: t('feature10') },
    { icon: Sparkles, text: t('feature11') },
    { icon: Gift, text: t('feature12') },
  ]

  return (
    <section ref={ref} className="relative py-20 sm:py-32 bg-[#0A031B] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white text-sm font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title').split(' ').slice(0, -2).join(' ')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('title').split(' ').slice(-2).join(' ')}
            </span>
          </h2>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300">
                {/* Check icon */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 text-purple-300" />
                </div>
                {/* Text */}
                <p className="text-white/80 font-medium">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Excitement badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">{t('moreSurprises')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
