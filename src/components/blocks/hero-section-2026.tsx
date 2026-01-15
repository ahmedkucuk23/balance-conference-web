"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {Link} from "@/i18n/routing"
import { useTranslations } from 'next-intl'

export function HeroSection2026() {
  const t = useTranslations('hero')
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A031B]">
      {/* Video background - Desktop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden lg:block"
      >
        <source src="/assets/video/01 horisontal - za web.mp4" type="video/mp4" />
      </video>

      {/* Video background - Tablet/iPad */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block lg:hidden"
      >
        <source src="/assets/video/01 tablet - za web.mp4" type="video/mp4" />
      </video>

      {/* Video background - Mobile */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      >
        <source src="/assets/video/01 vertical - za web.mp4" type="video/mp4" />
      </video>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute bottom-6 sm:bottom-12 left-0 right-0 z-10 flex justify-center px-4"
      >
        <div className="flex flex-row gap-3 sm:gap-4 items-center justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full px-6 py-4 sm:px-10 sm:py-7 text-base sm:text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
          >
            <Link href="/tickets">{t('buyTicket')}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white rounded-full px-6 py-4 sm:px-10 sm:py-7 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <Link href="/speakers">{t('speakers')}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
