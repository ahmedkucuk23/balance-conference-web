"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Mic2, Wrench, Lightbulb } from "lucide-react"
import { useTranslations } from "next-intl"

export function ConferenceOffering() {
  const t = useTranslations('conferenceOffering')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const offerings = [
    {
      icon: Mic2,
      number: "01",
      title: t('offering1Title'),
      description: t('offering1Desc')
    },
    {
      icon: Wrench,
      number: "02",
      title: t('offering2Title'),
      description: t('offering2Desc')
    },
    {
      icon: Lightbulb,
      number: "03",
      title: t('offering3Title'),
      description: t('offering3Desc')
    },
  ]

  return (
    <section ref={ref} className="relative py-20 sm:py-32 bg-[#0A031B] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title').split(' ').slice(0, -2).join(' ')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('title').split(' ').slice(-2).join(' ')}
            </span>
          </h2>
        </motion.div>

        {/* Offerings grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden">
                {/* Large number background */}
                <div className="absolute -top-4 -right-4 text-[120px] font-bold text-white/[0.02] leading-none select-none">
                  {offering.number}
                </div>

                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <offering.icon className="w-7 h-7 text-purple-400" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                    {offering.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed">
                    {offering.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-block p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <p className="text-white/80 text-lg sm:text-xl font-medium">
              {t('focusStatement').split(', ')[0]}{" "}
              <span className="text-purple-400">{t('focusStatement').match(/na (.+?),/)?.[1]}</span>
              {t('focusStatement').split(', ')[1]}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
