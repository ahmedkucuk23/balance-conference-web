"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Ticket, Clock, Sparkles, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlowCard } from "@/components/ui/spotlight-card"
import DarkVeil from "@/components/ui/dark-veil"
import { GlowEffect } from "@/components/ui/glow-effect"
import { useTranslations } from "next-intl"

export function TicketsSection() {
  const t = useTranslations('tickets')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    months: 3,
    days: 21,
    hours: 9,
    minutes: 39,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { months, days, hours, minutes, seconds } = prev

        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          days--
        }
        if (days < 0) {
          days = 29
          months--
        }
        if (months < 0) {
          clearInterval(timer)
          return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        return { months, days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="karte" ref={ref} className="relative py-20 sm:py-32 bg-[#0A031B] overflow-hidden">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
            <Ticket className="w-10 h-10 text-purple-400" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
        >
          {t('title')}{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('titleHighlight')}
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8"
        >
          {t('description')}
        </motion.p>

        {/* Spotlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 w-full max-w-[95%] mx-auto"
        >
          {/* Card 1 - Early Bird Pass */}
          <div className="relative">
            {/* Glow Effect Behind Card */}
            <div className="absolute -inset-1">
              <GlowEffect
                colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
                mode='static'
                blur='medium'
              />
            </div>

            <GlowCard
              glowColor="purple"
              customSize={true}
              className="w-full h-auto aspect-auto p-6 relative"
              style={{
                backgroundImage: 'url(/assets/img/backgrCartie.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#1a0b2e',
              }}
            >
              {/* Best Deal Badge */}
              <div className="absolute -top-3 -left-5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-500/50 z-10 -rotate-[20deg]">
                <span className="text-white text-xs font-bold uppercase tracking-wider">{t('bestDeal')}</span>
              </div>

              <div className="flex flex-col gap-6 text-left items-start">
              {/* Eyebrow */}
              <div>
                <span className="text-purple-300 text-lg font-medium">{t('earlyBirdPass')}</span>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-white font-bold text-5xl mb-1">
                  {t('price')} <span className="text-2xl text-white/70">{t('vat')}</span>
                </h3>
                <p className="text-white/60 text-sm mt-2">
                  {t('total')} <span className="text-white/80 font-semibold">{t('totalAmount')}</span>
                </p>
              </div>

              {/* Šta je uključeno */}
              <div>
                <h4 className="text-white font-semibold text-base mb-3">{t('whatIncluded')}</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{t('fullAccess')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{t('welcomeKit')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{t('earlyAccess')}</span>
                  </li>
                </ul>
              </div>

              {/* Ušteda */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <h4 className="text-white font-semibold text-sm mb-1">{t('savingsTitle')}</h4>
                <p className="text-purple-300 text-sm">{t('savingsDesc')}</p>
              </div>

              {/* Countdown */}
              <div className="w-full">
                <h4 className="text-white/70 font-medium text-sm mb-3 text-left">{t('dealEndsIn')}</h4>
                <div className="flex items-center gap-1 text-center justify-center">
                  <div className="flex-1">
                    <div className="text-xl sm:text-2xl font-bold text-white">{timeLeft.months}</div>
                    <div className="text-xs text-white/60">{t('months')}</div>
                  </div>
                  <span className="text-white/40 text-sm">·</span>
                  <div className="flex-1">
                    <div className="text-xl sm:text-2xl font-bold text-white">{timeLeft.days}</div>
                    <div className="text-xs text-white/60">{t('days')}</div>
                  </div>
                  <span className="text-white/40 text-sm">·</span>
                  <div className="flex-1">
                    <div className="text-xl sm:text-2xl font-bold text-white">{timeLeft.hours}</div>
                    <div className="text-xs text-white/60">{t('hours')}</div>
                  </div>
                  <span className="text-white/40 text-sm">·</span>
                  <div className="flex-1">
                    <div className="text-xl sm:text-2xl font-bold text-white">{timeLeft.minutes}</div>
                    <div className="text-xs text-white/60">{t('minutes')}</div>
                  </div>
                </div>
              </div>

              {/* Button */}
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full py-6 text-base font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40"
              >
                <a href={`mailto:${t('contactEmail')}`}>
                  {t('secureEarlyBird')}
                </a>
              </Button>
            </div>
          </GlowCard>
          </div>

          {/* Card 2 - Regular Pass */}
          <GlowCard
            glowColor="purple"
            customSize={true}
            className="w-full h-auto aspect-auto p-6"
            style={{
              backgroundImage: 'url(/assets/img/backgrCartie.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#1a0b2e',
            }}
          >
            <div className="flex flex-col gap-6 text-left items-start">
              {/* Eyebrow */}
              <div>
                <span className="text-purple-300 text-lg font-medium">{t('regularPass')}</span>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-white font-bold text-5xl mb-1">
                  {t('regularPrice')} <span className="text-2xl text-white/70">{t('vat')}</span>
                </h3>
                <p className="text-white/60 text-sm mt-2">
                  {t('total')} <span className="text-white/80 font-semibold">{t('regularTotalAmount')}</span>
                </p>
              </div>

              {/* Šta je uključeno */}
              <div>
                <h4 className="text-white font-semibold text-base mb-3">{t('whatIncluded')}</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{t('fullAccess')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{t('welcomeKit')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{t('earlyAccess')}</span>
                  </li>
                </ul>
              </div>

              {/* Button */}
              <Button
                disabled
                className="w-full bg-white/5 border border-white/10 text-white/40 rounded-full py-6 text-base font-semibold mt-auto cursor-not-allowed opacity-50"
              >
                {t('buyRegular')}
              </Button>
            </div>
          </GlowCard>

          {/* Card 3 - Group Tickets */}
          <GlowCard
            glowColor="purple"
            customSize={true}
            className="w-full h-auto aspect-auto p-6"
            style={{
              backgroundImage: 'url(/assets/img/backgrCartie.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#1a0b2e',
            }}
          >
            <div className="flex flex-col gap-6 text-left items-start">
              {/* Eyebrow */}
              <div>
                <span className="text-purple-300 text-lg font-medium">{t('groupTickets')}</span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-white font-bold text-7xl mb-1">
                  {t('bringingTeam')}
                </h3>
              </div>

              {/* Description */}
              <div className="mt-auto">
                <p className="text-white/80 text-lg font-semibold leading-relaxed mb-4">
                  {t('contactForGroup')}{" "}
                  <a href={`mailto:${t('contactEmail')}`} className="text-purple-400 hover:text-purple-300 underline">
                    {t('contactEmail')}
                  </a>{" "}
                  {t('contactForGroupSuffix')}
                </p>
              </div>

              {/* Button */}
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full py-6 text-base font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40"
              >
                <a href={`mailto:${t('contactEmail')}`}>
                  {t('contactUs')}
                </a>
              </Button>
            </div>
          </GlowCard>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
          >
            <a href={`mailto:${t('contactEmail')}`}>
              {t('reserveSpot')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </motion.div>

        {/* Event info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>{t('eventDate')}</span>
          </div>
          <span className="hidden sm:inline">|</span>
          <span>{t('eventLocation')}</span>
          <span className="hidden sm:inline">|</span>
          <span>{t('eventName')}</span>
        </motion.div>
      </div>
    </section>
  )
}
