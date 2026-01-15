"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, HelpCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export function AboutConference() {
  const t = useTranslations('aboutConference')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const questions = [
    t('question1'),
    t('question2'),
    t('question3'),
    t('question4'),
    t('question5'),
    t('question6')
  ]

  return (
    <section id="o-konferenciji" ref={ref} className="relative py-24 sm:py-36 bg-[#0A031B] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-600/5 rounded-full blur-[200px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          {/* Date and location badges */}
          <div className="inline-flex flex-wrap justify-center items-center gap-3 mb-8">
            <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a0a2e] border-2 border-purple-500/30 text-purple-300 text-sm font-bold shadow-lg shadow-purple-500/10">
              <Calendar className="w-4 h-4" />
              {t('date')}
            </span>
            <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a0a2e] border-2 border-pink-500/30 text-pink-300 text-sm font-bold shadow-lg shadow-pink-500/10">
              <MapPin className="w-4 h-4" />
              {t('location')}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            {t('mainTitle').split(' ').slice(0, 2).join(' ')}<br />{t('mainTitle').split(' ').slice(2).join(' ')}
          </h2>
          <p className="text-xl sm:text-2xl text-white/80 leading-relaxed max-w-4xl mx-auto mb-8">
            {t('tagline')}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            {t('motivationLabel')}
          </h3>
        </motion.div>

        {/* Main content - Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Quote and intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Pull quote card */}
            <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1a0a2e] to-[#0d0518] border-2 border-purple-500/20 shadow-2xl">
              {/* Decorative quote mark */}
              <div className="absolute -top-6 -left-2 text-8xl text-purple-500/20 font-serif select-none">"</div>

              {/* Accent line */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full" />

              <p className="relative text-xl sm:text-2xl text-white/90 leading-relaxed font-light italic mt-4">
                {t('quote')}
              </p>

              {/* Decorative closing quote */}
              <div className="absolute -bottom-4 -right-2 text-8xl text-purple-500/20 font-serif select-none rotate-180">"</div>
            </div>

            {/* Intro text */}
            <div className="mt-10">
              <p className="text-white/60 text-lg leading-relaxed">
                {t('intro').split(t('introHighlight1'))[0]}
                <span className="text-purple-400 font-semibold">{t('introHighlight1')}</span>
                {t('intro').split(t('introHighlight1'))[1].split(t('introHighlight2'))[0]}
                <span className="text-pink-400 font-semibold">{t('introHighlight2')}</span>
                {t('intro').split(t('introHighlight2'))[1]}
              </p>
            </div>
          </motion.div>

          {/* Right - Questions grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('questionsTitle')}</h3>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                  className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all duration-300"
                >
                  {/* Number indicator */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-purple-500/30">
                    {index + 1}
                  </div>

                  <p className="text-white/80 pl-4 text-base leading-relaxed group-hover:text-white transition-colors">
                    {question}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20">
            <p className="text-white/70 text-lg">
              {t('closingStatement').split('Balance Conference')[0]}
              <span className="text-purple-400 font-bold">Balance Conference</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
