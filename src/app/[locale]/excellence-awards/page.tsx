"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Award, Target, TrendingUp, Heart, Users, FileVideo, FileText, CheckCircle, Trophy, Shield } from "lucide-react"
import DarkVeil from "@/components/ui/dark-veil"
import { TopNavigation } from "@/components/blocks/top-navigation"
import { ContactFooter } from "@/components/blocks/contact-footer"
import { useTranslations } from 'next-intl'

export default function ExcellenceAwardsPage() {
  const t = useTranslations('excellenceAwards')
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" })

  const section2Ref = useRef(null)
  const isSection2InView = useInView(section2Ref, { once: true, margin: "-100px" })

  const section3Ref = useRef(null)
  const isSection3InView = useInView(section3Ref, { once: true, margin: "-100px" })

  const section4Ref = useRef(null)
  const isSection4InView = useInView(section4Ref, { once: true, margin: "-100px" })

  const section5Ref = useRef(null)
  const isSection5InView = useInView(section5Ref, { once: true, margin: "-100px" })

  const section6Ref = useRef(null)
  const isSection6InView = useInView(section6Ref, { once: true, margin: "-100px" })

  return (
    <>
      <TopNavigation glassmorphismOnly={true} />
      <main className="relative bg-[#0A031B] min-h-screen">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 sm:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
              <Award className="w-10 h-10 text-purple-400" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
          >
            {t('title').split(' ').slice(0, -2).join(' ')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('title').split(' ').slice(-2).join(' ')}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8">
              {t('description1')}
            </p>

            {/* Goals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-4 mx-auto">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{t('goal1Title')}</h3>
                <p className="text-white/60 text-sm">
                  {t('goal1Desc')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{t('goal2Title')}</h3>
                <p className="text-white/60 text-sm">
                  {t('goal2Desc')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-4 mx-auto">
                  <Heart className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{t('goal3Title')}</h3>
                <p className="text-white/60 text-sm">
                  {t('goal3Desc')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Ko se može prijaviti */}
      <section ref={section2Ref} className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isSection2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            {t('eligibilityTitle').split(' ').slice(0, -2).join(' ')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('eligibilityTitle').split(' ').slice(-2).join(' ')}
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Ko se može prijaviti */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isSection2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('canApplyTitle')}</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <span className="text-white/80 text-lg">{t('canApply1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <span className="text-white/80 text-lg">{t('canApply2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <span className="text-white/80 text-lg">{t('canApply3')}</span>
                </li>
              </ul>
              <p className="text-purple-300 font-semibold text-lg mt-6">
                {t('oneApplication')}
              </p>
            </motion.div>

            {/* Stručni žiri */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isSection2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('juryTitle')}</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <span className="text-white/80 text-lg">{t('jury1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <span className="text-white/80 text-lg">{t('jury2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <span className="text-white/80 text-lg">{t('jury3')}</span>
                </li>
              </ul>
              <p className="text-purple-300 font-semibold text-lg mt-6">
                {t('juryFinal')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Način prijave */}
      <section ref={section3Ref} className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isSection3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8"
          >
            {t('applicationTitle').split(' ').slice(0, -1).join(' ')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('applicationTitle').split(' ').slice(-1)[0]}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isSection3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/80 text-xl text-center mb-16"
          >
            {t('applicationSubtitle')}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video prijava */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSection3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                  <FileVideo className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                  <span className="text-purple-300 text-sm font-medium">{t('videoOption')}</span>
                  <h3 className="text-2xl font-bold text-white">{t('videoTitle')}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">{t('videoDuration')}</p>
                  <p className="text-white text-lg">{t('videoDurationValue')}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">{t('videoFormat')}</p>
                  <p className="text-white text-lg">{t('videoFormatValue')}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-2">{t('videoContent')}</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{t('videoContent1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{t('videoContent2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{t('videoContent3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{t('videoContent4')} <span className="text-purple-300">{t('videoContent4Note')}</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Prezentacija */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSection3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                  <span className="text-purple-300 text-sm font-medium">{t('presentationOption')}</span>
                  <h3 className="text-2xl font-bold text-white">{t('presentationTitle')}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">{t('presentationFormat')}</p>
                  <p className="text-white text-lg">{t('presentationFormatValue')}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">{t('presentationLength')}</p>
                  <p className="text-white text-lg">{t('presentationLengthValue')}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-2">{t('presentationContent')}</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{t('presentationContent1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{t('presentationContent2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{t('presentationContent3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{t('presentationContent4')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{t('presentationContent5')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Kriteriji ocjenjivanja */}
      <section ref={section4Ref} className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isSection4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8"
          >
            {t('criteriaTitle').split(' ').slice(0, -1).join(' ')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('criteriaTitle').split(' ').slice(-1)[0]}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isSection4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/80 text-xl text-center mb-16 max-w-4xl mx-auto"
          >
            {t('criteriaSubtitle')}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: t('criterion1Title'),
                description: t('criterion1Desc'),
                delay: 0.2
              },
              {
                title: t('criterion2Title'),
                description: t('criterion2Desc'),
                delay: 0.3
              },
              {
                title: t('criterion3Title'),
                description: t('criterion3Desc'),
                delay: 0.4
              },
              {
                title: t('criterion4Title'),
                description: t('criterion4Desc'),
                delay: 0.5
              },
              {
                title: t('criterion5Title'),
                description: t('criterion5Desc'),
                delay: 0.6
              },
              {
                title: t('criterion6Title'),
                description: t('criterion6Desc'),
                delay: 0.7
              }
            ].map((criterion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isSection4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: criterion.delay }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{criterion.title}</h3>
                <p className="text-white/70">{criterion.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Dodjela nagrada */}
      <section ref={section5Ref} className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isSection5InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {t('awardTitle').split(' ').slice(0, -1).join(' ')}{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('awardTitle').split(' ').slice(-1)[0]}
              </span>
            </h2>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              {t('awardSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isSection5InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold">1</span>
                  </div>
                  <p className="text-white/80 text-lg">
                    {t('awardStep1')}
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <p className="text-white/80 text-lg">
                    {t('awardStep2')}
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold">3</span>
                  </div>
                  <p className="text-white/80 text-lg">
                    {t('awardStep3')}
                  </p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Standard za integritet */}
      <section ref={section6Ref} className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isSection6InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
              {t('integrityTitle').split(' ').slice(0, -3).join(' ')}{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('integrityTitle').split(' ').slice(-3).join(' ')}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isSection6InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-white/80 text-xl text-center mb-12 leading-relaxed">
              {t('integrityDescription')}
            </p>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
              <p className="text-white/80 text-lg mb-6 text-center font-semibold">{t('integrityReason')}</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <p className="text-white text-lg">
                    {t('integrity1').split(t('integrity1Bold'))[0]}<span className="font-bold text-purple-300">{t('integrity1Bold')}</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <p className="text-white text-lg">
                    {t('integrity2')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <p className="text-white text-lg">
                    {t('integrity3')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    <ContactFooter />
    </>
  )
}
