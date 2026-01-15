"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Target, Heart } from "lucide-react"
import { useTranslations } from "next-intl"

export function AboutUs() {
  const t = useTranslations('aboutUs')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="o-nama" ref={ref} className="relative py-20 sm:py-32 bg-[#0A031B] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {t('title')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>
        </motion.div>

        {/* About content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left - Main text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('findYourBalance.title')}</h3>
            </div>

            <p className="text-white/70 text-lg leading-relaxed mb-6">
              {t('findYourBalance.paragraph1')}
            </p>

            <p className="text-white/70 text-lg leading-relaxed">
              {t('findYourBalance.paragraph2')}
            </p>
          </motion.div>

          {/* Right - How we create experiences */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('howWeCreate.title')}</h3>
              </div>

              <p className="text-white/70 leading-relaxed mb-4">
                {t('howWeCreate.paragraph1')}
              </p>

              <p className="text-white/70 leading-relaxed">
                {t('howWeCreate.paragraph2')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Our goal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-purple-500/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-pink-500/30 rounded-br-3xl" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                <Heart className="w-7 h-7 text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('ourGoal.title')}</h3>
            </div>

            <p className="text-white/80 text-lg leading-relaxed">
              {t('ourGoal.description')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
