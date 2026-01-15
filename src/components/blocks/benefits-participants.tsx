"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Shield, Smile, CheckCircle, Flame } from "lucide-react"

const benefits = [
  { icon: Target, label: "Fokusiraniji" },
  { icon: Shield, label: "Otporniji" },
  { icon: Smile, label: "Smireniji" },
  { icon: CheckCircle, label: "Odgovorniji" },
  { icon: Flame, label: "Dugoročno motivisani" },
]

export function BenefitsParticipants() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-20 sm:py-32 bg-[#0A031B] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
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
            Za Učesnike
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            GET MOTIVATED -{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              KORISTI ZA SVE UČESNIKE
            </span>
          </h2>
          <p className="max-w-4xl mx-auto text-white/70 text-base sm:text-lg leading-relaxed">
            Učesnici konferencije će naučiti kako upravljati energijom, a ne samo vremenom,
            dobiti alate za građenje otpornosti na stres i pritisak, razviti zdrav odnos
            između posla i privatnog života, ojačati unutrašnju motivaciju i fokus,
            razumjeti kako izgraditi pobjednički mentalitet bez sagorijevanja.
          </p>
        </motion.div>

        {/* Results heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            Nakon konferencije učesnici će biti:
          </h3>
        </motion.div>

        {/* Benefits badges */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-5 h-5 text-purple-300" />
                </div>
                <span className="text-white font-medium text-lg">{benefit.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
