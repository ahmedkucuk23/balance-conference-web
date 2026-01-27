"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"

interface Sponsor {
  name: string
  logo: string
  url?: string
}

// Add your sponsor logos here
const sponsors: Sponsor[] = [
  {
    name: "OAZA",
    logo: "/sponsors/OAZA_logo_i_slogan-pdf-removebg-preview.png",
    url: "https://oaza.ba"
  },
  {
    name: "Partner 2",
    logo: "/sponsors/Logo_U-boji-_U-boji--d0ac34fbaeea.png",
    url: "https://example.com"
  },
  // Add more sponsors here:
  // {
  //   name: "Sponsor Name",
  //   logo: "/sponsors/logo.png",
  //   url: "https://sponsor-website.com"
  // },
]

export function SponsorsLogos() {
  const t = useTranslations('sponsorsLogos')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  if (sponsors.length === 0) {
    return null
  }

  return (
    <section ref={ref} className="relative py-16 sm:py-24 bg-[#0A031B]/50 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Conference Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">
            {t('title')}
          </h3>

          {/* Partners grid */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.1 + 0.1 * index }}
                className="relative group"
              >
                {sponsor.url ? (
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={150}
                      height={80}
                      className="object-contain h-16 w-auto max-w-[150px] brightness-0 invert transition-all duration-300"
                    />
                  </a>
                ) : (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={150}
                      height={80}
                      className="object-contain h-16 w-auto max-w-[150px] brightness-0 invert transition-all duration-300"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

