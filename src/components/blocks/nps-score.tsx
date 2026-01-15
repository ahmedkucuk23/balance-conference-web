"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { useTranslations } from "next-intl"

export function NpsScore() {
  const t = useTranslations('homepage')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = 73
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setScore(end)
        clearInterval(timer)
      } else {
        setScore(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView])

  return (
    <section ref={ref} className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Score display */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Score circle */}
            <div className="relative mx-auto w-72 h-72 sm:w-96 sm:h-96">
              {/* Outer ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
                {/* Background ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                {/* Progress ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 565.48} 565.48`}
                  initial={{ strokeDasharray: "0 565.48" }}
                  animate={isInView ? { strokeDasharray: `${(73 / 100) * 565.48} 565.48` } : {}}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl sm:text-8xl font-bold text-white">{score}</span>
                <span className="text-purple-400 font-semibold text-lg sm:text-xl">{t('npsScoreSubtitle')}</span>
                <div className="flex items-center gap-1.5 mt-2 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">29 {t('pointsAboveAverage')}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t('enthusiastic')}
            </h2>

            <p className="text-white/70 text-lg mb-8">
              {t('recommendQuestion')}
            </p>

            {/* Comparison bars */}
            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">{t('averageNps')}</span>
                  <span className="text-white/60">32-44</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[44%] bg-white/30 rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white font-medium">{t('recap2025Title')}</span>
                  <span className="text-purple-400 font-bold">73</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "73%" } : { width: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>
              </div>
            </div>

            <p className="text-white/50 text-sm">
              {t('averageNpsNote')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
