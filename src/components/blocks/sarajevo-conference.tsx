'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import GradientText from '@/components/GradientText'
import { WigglyCard } from '@/components/ui/wiggly-card'

type Stat = {
  value: string | number
  label: string
}

export type SarajevoConferenceProps = {
  eyebrow?: string
  title?: string
  descriptionIntro?: string
  stats?: Stat[]
  howTitle?: string
  howDescription?: string
  ctaHref?: string
  ctaLabel?: string
  nextChapterText?: string
}

export default function SarajevoConference({
  eyebrow = 'Our latest edition',
  title = 'Sarajevo Balance Conference 2025',
  descriptionIntro = 'Balance Conference 2025 redefined what a wellbeing event can be. Every detail, from flawless production and mindful menus to immersive workshops and interactive zones, was designed to inspire balance in every sense.',
  stats = [
    { value: 300, label: 'Participants' },
    { value: 9, label: 'Speakers' },
    { value: 30, label: 'Media Outlets' },
    { value: 20, label: 'Influencers' },
  ],
  howTitle = 'The result?',
  howDescription = 'A sold-out event, record engagement, powerful partnerships, and media buzz across the region. Attendees called it unlike anything BiH had ever seen, a space where inspiration, movement, mindfulness, and connection came to life.',
  ctaHref = '#',
  ctaLabel = 'See the Full Story in Numbers',
  nextChapterText = 'The next chapter of Balance is just around the corner.',
}: SarajevoConferenceProps) {
  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* First div: Two 50% columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-12">
          {/* First column: Eyebrow, Title, Description */}
          <div className="space-y-6">
            <h6 className="text-xs font-medium uppercase tracking-[0.06em] text-primary">
              {eyebrow}
            </h6>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-balance-300">
              {title}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {descriptionIntro}
            </p>
          </div>

          {/* Second column: 2x2 Grid of cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.slice(0, 4).map((stat, index) => (
              <WigglyCard key={index}>
                <div className="rounded-2xl md:rounded-3xl border border-border shadow-xl shadow-violet-200/50 bg-card p-6 md:p-8 text-center transition-opacity hover:opacity-80 cursor-pointer">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                    {stat.value}
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              </WigglyCard>
            ))}
          </div>
        </div>

        {/* Second div: Two 50% columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* First column: How we do it */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance-300">
              {howTitle}
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {howDescription}
            </p>
            <Button asChild size="lg" className="rounded-xl bg-balance-300 hover:bg-balance-400 text-white">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>

          {/* Second column: Gradient text */}
          <div className="flex items-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              <GradientText
                className="inline-block"
                gradient="linear-gradient(90deg, var(--Accent-Secondary, #0099B5) -0.8%, var(--Accent-Accent, #D83FFF) 14.78%, #4D2AA0 47.41%, #1C0F3A 74.6%)"
                animationSpeed={10}
                showBorder={false}
              >
                {nextChapterText}
              </GradientText>
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
