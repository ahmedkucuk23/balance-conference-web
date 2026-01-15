"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Presentation, Users, MessageSquare, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import {Link} from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function TicketIncludes() {
  const t = useTranslations('ticketIncludes')
  const tHome = useTranslations('homepage')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const includes = [
    {
      icon: Presentation,
      title: t('lectures'),
      description: t('lecturesDesc')
    },
    {
      icon: Users,
      title: t('oneOnOne'),
      description: t('oneOnOneDesc')
    },
    {
      icon: MessageSquare,
      title: t('wrapUp'),
      description: t('wrapUpDesc')
    },
    {
      icon: Utensils,
      title: t('foodNetworking'),
      description: t('foodNetworkingDesc')
    },
  ]

  return (
    <section ref={ref} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Price and CTA Section - Moved to top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          {/* Price Card */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-8">
            {/* Background glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-pink-500/5" />

            <div className="relative text-center">
              {/* Price */}
              <div className="mb-6">
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-white/60 text-lg line-through">{tHome('ticketsOriginalPrice')}</span>
                  <span className="text-5xl sm:text-6xl font-bold text-white">{tHome('ticketsPrice')}</span>
                  <span className="text-white/60 text-xl">{tHome('ticketsPlusTax')}</span>
                </div>
                <p className="text-purple-300 text-lg mt-2 font-medium">
                  {tHome('ticketsEarlyBird')}
                </p>
              </div>

              {/* What's included */}
              <div className="flex items-center justify-center gap-2 text-white/80 mb-6">
                <Check className="w-5 h-5 text-purple-400" />
                <p className="text-base sm:text-lg">
                  {tHome('ticketsIncludesAll')}
                </p>
              </div>

              {/* Early bird notice */}
              <p className="text-white/60 text-sm sm:text-base mb-8">
                {tHome('ticketsEarlyBirdUntil')} <span className="text-purple-300 font-semibold">{tHome('ticketsEarlyBirdDate')}</span>
              </p>

              {/* CTA Button */}
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full px-12 py-7 text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
              >
                <Link href="/tickets">
                  {tHome('ticketsSecureYours')}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Section header - After pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {tHome('ticketsIncludesTitle')}
          </h2>
          <p className="max-w-3xl mx-auto text-white/70 text-base sm:text-lg leading-relaxed">
            {t('completeExperience')}
          </p>
        </motion.div>

        {/* Features Grid - Below header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {includes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />

              <div className="relative flex items-start gap-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-purple-400" />
                </div>

                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
