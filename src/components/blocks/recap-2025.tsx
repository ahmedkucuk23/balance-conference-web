"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Users, Mic2, Star, Newspaper } from "lucide-react"
import { useTranslations } from "next-intl"

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
  delay: number
}

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, inView])

  return <>{count}</>
}

function StatCard({ icon, value, label, delay }: StatCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const numericValue = parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/[0-9]/g, "")

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="relative p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
          <div className="text-purple-400">{icon}</div>
        </div>

        {/* Value */}
        <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
          <AnimatedNumber value={numericValue} inView={isInView} />
          <span className="text-purple-400">{suffix}</span>
        </div>

        {/* Label */}
        <p className="text-white/60 text-sm sm:text-base">{label}</p>
      </div>
    </motion.div>
  )
}

export function Recap2025() {
  const t = useTranslations('recap')
  const tHome = useTranslations('homepage')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "350+", label: t('participants') },
    { icon: <Mic2 className="w-6 h-6" />, value: "9", label: t('speakers') },
    { icon: <Star className="w-6 h-6" />, value: "20+", label: t('influencers') },
    { icon: <Newspaper className="w-6 h-6" />, value: "30+", label: t('media') },
  ]

  return (
    <section ref={ref} className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left side - Text content */}
          <div className="text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
              {t('retrospective')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {tHome('recap2025Title')}
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Right side - Stats grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
