"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Eye, MousePointer, BarChart3, Users, Share2, Newspaper, Check, Star, Crown, Award, Megaphone, UserCheck, Globe, Palette, BookOpen, Lightbulb } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { GlowCard } from "@/components/ui/spotlight-card"
import { GlowEffect } from "@/components/ui/glow-effect"
import DarkVeil from "@/components/ui/dark-veil"
import { useTranslations } from "next-intl"

export function SponsorshipSection() {
  const t = useTranslations('sponsorship')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState<'google' | 'pr' | 'social'>('google')

  const stats2025 = {
    googleAds: [
      { label: t('statsGoogleAds.impressions'), value: "4.09 mil" },
      { label: t('statsGoogleAds.clicks'), value: "10,061" },
      { label: t('statsGoogleAds.conversions'), value: "678" },
      { label: t('statsGoogleAds.ctr'), value: "2.02%" },
    ],
    prMedia: [
      { label: t('statsPrMedia.promoTexts'), value: "40+" },
      { label: t('statsPrMedia.domainAuthority'), value: "31/100" },
      { label: t('statsPrMedia.backlinks'), value: "365/16" },
      { label: t('statsPrMedia.spotBroadcasts'), value: "499" },
    ],
    socialMedia: [
      { label: t('statsSocialMedia.reach'), value: "1.200.080" },
      { label: t('statsSocialMedia.impressions'), value: "3.496.793" },
      { label: t('statsSocialMedia.linkClicks'), value: "14.523" },
      { label: t('statsSocialMedia.likes'), value: "5.104" },
    ],
  }

  const sponsorBenefits = [
    {
      icon: Megaphone,
      title: t('benefits.socialMediaPresence.title'),
      description: t('benefits.socialMediaPresence.description')
    },
    {
      icon: UserCheck,
      title: t('benefits.speakerCollaboration.title'),
      description: t('benefits.speakerCollaboration.description')
    },
    {
      icon: Globe,
      title: t('benefits.omniChannelVisibility.title'),
      description: t('benefits.omniChannelVisibility.description')
    },
    {
      icon: Palette,
      title: t('benefits.balanceThemeAlignment.title'),
      description: t('benefits.balanceThemeAlignment.description')
    },
    {
      icon: BookOpen,
      title: t('benefits.storytellingApproach.title'),
      description: t('benefits.storytellingApproach.description')
    },
    {
      icon: Lightbulb,
      title: t('benefits.customStrategy.title'),
      description: t('benefits.customStrategy.description')
    },
  ]

  return (
    <section id="sponzorstva" ref={ref} className="relative py-20 sm:py-32 bg-[#0A031B] overflow-hidden">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
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
            {t('title')}
          </h2>
        </motion.div>

        {/* 2025 Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            {t('stats2025Title')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('stats2025Subtitle')}
            </span>
          </h3>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full p-1 bg-white/5 border border-white/10">
              {[
                { id: 'google', label: t('tabGoogleAds'), icon: MousePointer },
                { id: 'pr', label: t('tabPrMedia'), icon: Newspaper },
                { id: 'social', label: t('tabSocialMedia'), icon: Share2 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(activeTab === 'google' ? stats2025.googleAds :
              activeTab === 'pr' ? stats2025.prMedia : stats2025.socialMedia
            ).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-5 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What sponsors get */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            {t('whatSponsorsGetTitle')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('whatSponsorsGetSubtitle')}
            </span>
          </h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {sponsorBenefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="min-h-[14rem] list-none"
              >
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-[#0A031B] p-6 shadow-sm">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                      <div className="w-fit rounded-lg border-[0.75px] border-white/20 bg-white/5 p-2">
                        <benefit.icon className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="pt-0.5 text-lg leading-[1.375rem] font-semibold tracking-[-0.02em] md:text-xl md:leading-[1.5rem] text-balance text-white">
                          {benefit.title}
                        </h3>
                        <p className="text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-white/60">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Packages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            {t('packagesTitle')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('packagesSubtitle')}
            </span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-[95%] mx-auto">
            {/* Card 1 - Partner Projekta */}
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
                className="w-full h-full p-6 relative"
                style={{
                  backgroundColor: 'rgb(10 3 27 / var(--tw-bg-opacity, 1))',
                }}
              >
                {/* Premium Badge */}
                <div className="absolute -top-3 -left-5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-500/50 z-10 -rotate-[20deg]">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">{t('premiumBadge')}</span>
                </div>

                <div className="flex flex-col gap-6 text-left items-start h-full">
                  {/* Eyebrow */}
                  <div>
                    <span className="text-purple-300 text-lg font-medium">{t('packages.projectPartner.name')}</span>
                  </div>

                  {/* Price */}
                  <div>
                    <h3 className="text-white font-bold text-4xl mb-1">
                      {t('packages.projectPartner.price')} <span className="text-xl text-white/70">{t('packages.projectPartner.plusVat')}</span>
                    </h3>
                  </div>

                  {/* Šta je uključeno */}
                  <div className="flex-grow">
                    <h4 className="text-white font-semibold text-base mb-3">{t('whatIncluded')}</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-white/80 text-sm">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{t('packages.projectPartner.features.stand')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-white/80 text-sm">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{t('packages.projectPartner.features.prAnnouncements')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-white/80 text-sm">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{t('packages.projectPartner.features.logoPromo')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-white/80 text-sm">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{t('packages.projectPartner.features.logoWebsite')} {t('packages.projectPartner.features.logoInvitation')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-white/80 text-sm">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{t('packages.projectPartner.features.logoNewsletters')} {t('packages.projectPartner.features.logoAds')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-white/80 text-sm">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{t('packages.projectPartner.features.tickets')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-white/80 text-sm">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{t('packages.projectPartner.features.cobranding')}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Button */}
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full py-6 text-base font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 mt-auto"
                  >
                    <a href={`mailto:${t('email')}`}>
                      {t('contactUs')}
                    </a>
                  </Button>
                </div>
              </GlowCard>
            </div>

            {/* Card 2 - Pokrovitelj Predavanja */}
            <GlowCard
              glowColor="purple"
              customSize={true}
              className="w-full h-full p-6"
              style={{
                backgroundColor: 'rgb(10 3 27 / var(--tw-bg-opacity, 1))',
              }}
            >
              <div className="flex flex-col gap-6 text-left items-start h-full">
                {/* Eyebrow */}
                <div>
                  <span className="text-purple-300 text-lg font-medium">{t('packages.lecturePatron.name')}</span>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-white font-bold text-4xl mb-1">
                    {t('packages.lecturePatron.price')} <span className="text-xl text-white/70">{t('packages.lecturePatron.plusVat')}</span>
                  </h3>
                </div>

                {/* Šta je uključeno */}
                <div className="flex-grow">
                  <h4 className="text-white font-semibold text-base mb-3">{t('whatIncluded')}</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.lecturePatron.features.stand')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.lecturePatron.features.nameAndLogo')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.lecturePatron.features.logoPromo')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.lecturePatron.features.logoWebsite')} {t('packages.lecturePatron.features.logoInvitation')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.lecturePatron.features.logoNewsletters')} {t('packages.lecturePatron.features.logoAds')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.lecturePatron.features.tickets')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.lecturePatron.features.cobranding')}</span>
                    </li>
                  </ul>
                </div>

                {/* Button */}
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full py-6 text-base font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 mt-auto"
                >
                  <a href={`mailto:${t('email')}`}>
                    {t('contactUs')}
                  </a>
                </Button>
              </div>
            </GlowCard>

            {/* Card 3 - Zlatni Sponzor */}
            <GlowCard
              glowColor="purple"
              customSize={true}
              className="w-full h-full p-6"
              style={{
                backgroundColor: 'rgb(10 3 27 / var(--tw-bg-opacity, 1))',
              }}
            >
              <div className="flex flex-col gap-6 text-left items-start h-full">
                {/* Eyebrow */}
                <div>
                  <span className="text-purple-300 text-lg font-medium">{t('packages.goldSponsor.name')}</span>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-white font-bold text-4xl mb-1">
                    {t('packages.goldSponsor.price')} <span className="text-xl text-white/70">{t('packages.goldSponsor.plusVat')}</span>
                  </h3>
                </div>

                {/* Šta je uključeno */}
                <div className="flex-grow">
                  <h4 className="text-white font-semibold text-base mb-3">{t('whatIncluded')}</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.goldSponsor.features.logoPromo')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.goldSponsor.features.logoWebsite')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.goldSponsor.features.logoInvitation')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.goldSponsor.features.logoNewsletters')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.goldSponsor.features.logoAds')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-white/80 text-sm">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{t('packages.goldSponsor.features.tickets')}</span>
                    </li>
                  </ul>
                </div>

                {/* Button */}
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full py-6 text-base font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 mt-auto"
                >
                  <a href={`mailto:${t('email')}`}>
                    {t('contactUs')}
                  </a>
                </Button>
              </div>
            </GlowCard>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-white/60 mb-4">
            {t('footerText')}
          </p>
          <a
            href={`mailto:${t('email')}`}
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            {t('email')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
