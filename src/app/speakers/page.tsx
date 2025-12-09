'use client'

import React, { useEffect, useState } from 'react'
import dynamicImport from 'next/dynamic'
import { TopNavigation } from '@/components/blocks/top-navigation'
import DarkVeil from '@/components/ui/dark-veil'
import GradualBlur from '@/components/ui/gradual-blur'
import { TeamSection, type TeamMember } from '@/components/ui/team'
import { motion } from 'motion/react'

// Lazy load below-the-fold components
const BlogSection = dynamicImport(() => import('@/components/ui/blog-section').then(mod => ({ default: mod.BlogSection })))
const HoverFooter = dynamicImport(() => import('@/components/ui/hover-footer').then(mod => ({ default: mod.HoverFooter })))

interface ConferenceGroup {
  conferenceTitle: string
  speakers: TeamMember[]
}

export default function SpeakersPage() {
  const [conferenceGroups, setConferenceGroups] = useState<ConferenceGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/conferences-with-speakers')
      .then(res => {
        console.log('API response status:', res.status)
        return res.json()
      })
      .then(data => {
        console.log('API data:', data)
        setConferenceGroups(data.conferenceGroups || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching conferences:', err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      {/* GradualBlur effect for entire page */}
      <GradualBlur
        target="page"
        position="bottom"
        height="12rem"
        strength={.3}
        divCount={4}
        opacity={1}
        zIndex={1000}
        responsive={true}
        mobileHeight="0rem"
      />

      <TopNavigation scrollThreshold={9999999999} />

      {/* DarkVeil background effect for entire page */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ width: '100vw', height: '100vh' }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.0}
          scanlineIntensity={.5}
          speed={1.75}
          scanlineFrequency={1.25}
          warpAmount={0.5}
          resolutionScale={1}
        />
      </div>

      {/* Hero Section */}
      <section style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }} className="w-full h-[50vh] relative overflow-hidden z-10">
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
            Our Speakers
          </h1>
          <p className="text-2xl text-balance-200 text-center">
            Leading voices in wellbeing, leadership, and lifestyle innovation
          </p>
        </div>
      </section>

      {/* Speakers Sections Grouped by Conference */}
      <section className="relative z-10" style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}>
        {loading ? (
          <div className="text-white text-center py-20">Loading speakers...</div>
        ) : conferenceGroups.length === 0 ? (
          <div className="text-white text-center py-20">No conferences found</div>
        ) : (
          conferenceGroups.map((group, index) => (
          <div key={index} className={index > 0 ? 'pt-16' : ''}>
            <div className="mx-auto px-6 mb-6" style={{ maxWidth: '1120px' }}>
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex flex-col items-start justify-center"
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-left">
                  {group.conferenceTitle}
                </h2>
              </motion.div>
            </div>
            <div className="mx-auto px-6" style={{ maxWidth: '1120px' }}>
              <TeamSection
                members={group.speakers}
                variant="detailed"
                className="bg-transparent !py-0 !max-w-none [&>div]:!px-0 [&>div]:!max-w-none"
              />
            </div>
          </div>
        )))}
      </section>

      {/* Latest Insights Section */}
      <section className="relative z-10 max-w-6xl mx-auto py-16">
        <BlogSection
          heading="Speaker Insights"
          description="Discover wisdom and perspectives from our community of thought leaders and experts."
          desktopColumns={3}
          tabletColumns={3}
          mobileColumns={1}
        />
      </section>

      {/* Footer */}
      <HoverFooter />
    </>
  )
}

