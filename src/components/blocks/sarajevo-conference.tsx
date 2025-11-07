'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import GradientText from '@/components/GradientText'

type Stat = { value: string | number; label: string }

export type SarajevoConferenceProps = {
  eyebrow?: string
  title?: string
  accent?: string
  descriptionIntro?: string
  descriptionBody?: string
  resultTitle?: string
  resultBody?: string
  stats?: Stat[]
  ctaHref?: string
  ctaLabel?: string
}

export default function SarajevoConference({
  eyebrow = 'Sarajevo Conference 2025',
  title = 'Balance Conference',
  accent = '2025 Results',
  descriptionIntro = 'Balance Conference 2025 redefined what a wellbeing event can be.',
  descriptionBody =
    'Every detail, from flawless production and mindful menus to immersive workshops and interactive zones, was designed to inspire balance in every sense.',
  resultTitle = 'The result?',
  resultBody =
    'A sold-out event, record engagement, powerful partnerships, and media buzz across the region. Attendees called it unlike anything BiH had ever seen, a space where inspiration, movement, mindfulness, and connection came to life.',
  stats = [
    { value: 300, label: 'Participants' },
    { value: 9, label: 'Speakers' },
    { value: 30, label: 'Media Outlets' },
    { value: 20, label: 'Influencers' },
  ],
  ctaHref = '#',
  ctaLabel = 'See the Full Story in Numbers',
}: SarajevoConferenceProps) {
  return (
    <section className="relative bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: heading and copy */}
          <div>
            <p className="text-sm font-medium tracking-widest text-primary/70">{eyebrow}</p>
            <h2 className="mt-5 font-extrabold leading-[1] text-[2.5rem] md:text-[4rem]">
              {title}
              <br />
              <span className="text-primary">{accent.split(' ')[0]}</span>{' '}
              {accent.split(' ').slice(1).join(' ')}
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              <span className="font-semibold text-foreground">{descriptionIntro}</span>
              <br />
              {descriptionBody}
            </p>

            {/* Result moved below grid to span full width */}
          </div>

          {/* Right column: stat cards */}
          <div className="w-full">
            <div className="grid grid-cols-2 gap-6">
              {stats.slice(0, 4).map((s, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-border/60 bg-background p-8 text-center shadow-[0_16px_48px_0_rgba(77,42,160,0.08)] backdrop-blur-[3px]"
                >
                  <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">{s.value}</h2>
                  <div className="mt-2 text-base text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Result + teaser as two columns on desktop */}
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-xl font-semibold text-foreground md:text-2xl">{resultTitle}</h3>
            <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">
              {resultBody}
            </p>
            <div className="mt-6">
              <Button asChild className="h-11 rounded-xl px-6">
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-start">
            <h2 className="text-xl md:text-4xl font-semibold">
              <GradientText
                className="inline-block"
                gradient={'linear-gradient(90deg, var(--Accent-Secondary, #0099B5) -0.8%, var(--Accent-Accent, #D83FFF) 14.78%, #4D2AA0 47.41%, #1C0F3A 74.6%)'}
                animationSpeed={10}
                showBorder={false}
              >
                The next chapter of Balance is just around the corner.
              </GradientText>
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}


