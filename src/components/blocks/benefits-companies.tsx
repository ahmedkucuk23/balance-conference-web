"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingDown, TrendingUp, Users, Award, Heart } from "lucide-react"

const benefits = [
  { icon: Heart, label: "Employer Branding", description: "Izgradnja employer branding-a i kulture brige o ljudima" },
  { icon: Award, label: "Liderstvo", description: "Razvoj liderstva i podsticanje lične odgovornosti kod zaposlenih" },
  { icon: Users, label: "Timska Kohezija", description: "Jačanje timske kohezije i unapređenje interne komunikacije" },
  { icon: TrendingUp, label: "Produktivnost", description: "Povećanje produktivnosti bez dodatnog pritiska na zaposlenike" },
]

export function BenefitsCompanies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-20 sm:py-32 bg-[#0A031B] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            Za Kompanije
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            GET MOTIVATED -{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              KORISTI ZA KOMPANIJE
            </span>
          </h2>
          <p className="max-w-4xl mx-auto text-white/70 text-base sm:text-lg leading-relaxed mb-8">
            Slanjem timova na konferenciju, kompanije direktno ulažu u:
          </p>

          {/* Investment benefits */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20"
            >
              <TrendingDown className="w-5 h-5 text-green-400" />
              <span className="text-white/90 font-medium">Manje bolovanja</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20"
            >
              <TrendingDown className="w-5 h-5 text-green-400" />
              <span className="text-white/90 font-medium">Manje pasivne demotivacije</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20"
            >
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-white/90 font-medium">Više stabilnih performansi</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7 text-purple-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.label}
                </h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
