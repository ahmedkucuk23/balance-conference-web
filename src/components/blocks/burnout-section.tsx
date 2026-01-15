"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { AlertTriangle, Battery, Moon, Frown, HeadsetIcon, Activity } from "lucide-react"
import { useTranslations } from "next-intl"

export function BurnoutSection() {
  const t = useTranslations('burnout')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const burnoutSigns = [
    { icon: Battery, label: t('signs.continuousFatigue') },
    { icon: Frown, label: t('signs.irritability') },
    { icon: HeadsetIcon, label: t('signs.lackOfMotivation') },
    { icon: Moon, label: t('signs.sleepProblems') },
    { icon: Activity, label: t('signs.physicalSymptoms') },
  ]

  return (
    <section ref={ref} className="relative py-20 sm:py-32 bg-[#0A031B] overflow-hidden">
      {/* Background gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Definition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {t('title').split(' ')[0]} {t('title').split(' ')[1]}{" "}
                <span className="text-red-400">{t('title').split(' ')[2]}</span>
              </h2>
            </div>

            {/* Definition */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 mb-8">
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                {t('definition')}
              </p>
            </div>

            {/* Signs heading */}
            <h3 className="text-white font-semibold mb-4">{t('signsTitle')}</h3>

            {/* Signs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {burnoutSigns.map((sign, index) => (
                <motion.div
                  key={sign.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <sign.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{sign.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Impact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
              {t('impactTitle').split(' ').slice(0, 4).join(' ')}{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('impactTitle').split(' ')[4]}
              </span>
            </h3>

            {/* Stats/Impact visualization */}
            <div className="space-y-4 mb-8">
              {[
                { label: t('stats.decreasedProductivity'), value: 67 },
                { label: t('stats.increasedFluctuation'), value: 54 },
                { label: t('stats.moreSickLeave'), value: 48 },
                { label: t('stats.poorTeamDynamics'), value: 41 },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">{stat.label}</span>
                    <span className="text-white font-medium">{stat.value}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${stat.value}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recovery note */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20">
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="text-green-400 font-semibold">{t('recoveryLabel')} </span>
                {t('recoveryText')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
