"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Target, Shield, Smile, CheckCircle, Flame, TrendingDown, TrendingUp, Users, Award, Heart, User } from "lucide-react"
import { useTranslations } from "next-intl"

export function BenefitsCombined() {
  const t = useTranslations('benefits')
  const tHome = useTranslations('homepage')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState<'participants' | 'companies'>('participants')

  const participantsBenefits = [
    { icon: Target, label: t('focused'), description: t('focusedDesc') },
    { icon: Shield, label: t('resilient'), description: t('resilientDesc') },
    { icon: Smile, label: t('calmer'), description: t('calmerDesc') },
    { icon: CheckCircle, label: t('responsible'), description: t('responsibleDesc') },
    { icon: Flame, label: t('motivated'), description: t('motivatedDesc') },
    { icon: User, label: t('connected'), description: t('connectedDesc') },
  ]

  const companiesBenefits = [
    { icon: Heart, label: t('employerBranding'), description: t('employerBrandingDesc') },
    { icon: Award, label: t('leadership'), description: t('leadershipDesc') },
    { icon: Users, label: t('teamCohesion'), description: t('teamCohesionDesc') },
    { icon: TrendingUp, label: t('productivity'), description: t('productivityDesc') },
  ]

  return (
    <section ref={ref} className="relative py-20 sm:py-32 bg-[#0A031B] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
            {tHome('benefitsTitle')}
          </h2>

          {/* Tab Switcher */}
          <div className="inline-flex items-center gap-2 p-2 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => setActiveTab('participants')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'participants'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              {tHome('benefitsForParticipants')}
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'companies'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              {tHome('benefitsForCompanies')}
            </button>
          </div>
        </motion.div>

        {/* Participants Content */}
        {activeTab === 'participants' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            key="participants"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                {tHome('participantsBenefitsTitle')}
              </h3>
              <p className="max-w-4xl mx-auto text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                {tHome('participantsBenefitsDesc')}
              </p>
            </div>

            <div className="text-center mb-10">
              <h4 className="text-xl sm:text-2xl font-semibold text-white mb-8">
                {tHome('participantsWillBe')}
              </h4>
            </div>

            {/* Benefits cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {participantsBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
          </motion.div>
        )}

        {/* Companies Content */}
        {activeTab === 'companies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            key="companies"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                {tHome('companiesBenefitsTitle')}
              </h3>
              <p className="max-w-4xl mx-auto text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                {t('companiesSendingTeams')}
              </p>

              {/* Investment benefits */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20"
                >
                  <TrendingDown className="w-5 h-5 text-green-400" />
                  <span className="text-white/90 font-medium">{t('lessSickLeave')}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20"
                >
                  <TrendingDown className="w-5 h-5 text-green-400" />
                  <span className="text-white/90 font-medium">{t('lessPassiveDemotivation')}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20"
                >
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span className="text-white/90 font-medium">{t('moreStablePerformance')}</span>
                </motion.div>
              </div>
            </div>

            {/* Benefits cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companiesBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
          </motion.div>
        )}
      </div>
    </section>
  )
}
