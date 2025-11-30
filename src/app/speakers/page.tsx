import React from 'react'
import dynamicImport from 'next/dynamic'
import { TopNavigation } from '@/components/blocks/top-navigation'
import DarkVeil from '@/components/ui/dark-veil'
import GradualBlur from '@/components/ui/gradual-blur'
import { TeamSection, type TeamMember } from '@/components/ui/team'
import { SpeakersCTA } from '@/components/blocks/speakers-cta'
import { db } from '@/lib/db'

// Lazy load below-the-fold components
const BlogSection = dynamicImport(() => import('@/components/ui/blog-section').then(mod => ({ default: mod.BlogSection })))
const HoverFooter = dynamicImport(() => import('@/components/ui/hover-footer').then(mod => ({ default: mod.HoverFooter })))

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

async function getSpeakers(): Promise<TeamMember[]> {
  const records = await (db as any).speaker.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })
  return (records as any[]).map((s: any) => ({
    name: s.name,
    role: s.shortDescription ?? '',
    avatar: s.image ?? '',
    slug: s.slug,
  }))
}

export default async function SpeakersPage() {
  const speakers = await getSpeakers()
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
            Our Past Speakers
          </h1>
          <p className="text-2xl text-balance-200 text-center">
            Leading voices in wellbeing, leadership, and lifestyle innovation
          </p>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="relative z-10" style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}>
        <TeamSection
          title="Our Past Speakers"
          members={speakers}
          variant="detailed"
          className="bg-transparent"
          description="Leading voices in wellbeing, leadership, and lifestyle innovation who have shaped our understanding of balance."
        />
      </section>

      {/* Speakers CTA Banner */}
      <SpeakersCTA />

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

