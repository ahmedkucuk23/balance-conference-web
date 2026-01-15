"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Users, User } from "lucide-react"
import Link from "next/link"

export function TargetAudience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-20 sm:py-32 bg-[#0A031B] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
            ZA KOGA JE{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              OVA KONFERENCIJA?
            </span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-4 text-white/80 text-base sm:text-lg leading-relaxed">
            <p>
              Balance Conference je za sve koji žele graditi motivaciju i balans u svakodnevnom životu i radu,
              bez osjećaja iscrpljenosti i burnouta.
            </p>
            <p>
              Namijenjena je profesionalcima, liderima i timovima koji žele konkretne alate, nova znanja i
              inspiraciju koju mogu primijeniti odmah.
            </p>
            <p className="font-semibold text-white">
              Dođite sami ili kao tim i investirajte u održiv performans i dobrobit.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          {/* Individual Ticket Button */}
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
          >
            <Link href="/tickets" className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Kupi pojedinačnu kartu
            </Link>
          </Button>

          {/* Group Ticket Button */}
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white rounded-full px-10 py-7 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <Link href="/tickets" className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Kupi grupne karte
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
