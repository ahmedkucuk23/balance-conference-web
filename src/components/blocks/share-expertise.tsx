'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import DarkVeil from '@/components/ui/dark-veil'

export type ShareExpertiseProps = {
  eyebrow?: string
  title?: string
  highlightWord?: string
  intro?: string
  description?: string
  commitment?: string
  ctaHref?: string
  ctaLabel?: string
  videoId?: string
}

export default function ShareExpertise({
  eyebrow = 'HOW WE DO IT?',
  title = 'Share Your Expertise. Inspire',
  highlightWord = 'Balance.',
  intro = 'Find Your Balance is a multidisciplinary platform built to address the real challenges people face at work, at home, and within themselves.',
  description = 'We identify the issues that matter: stress, burnout, lack of purpose, the pressure to perform. Then, through expert-led lectures and hands-on workshops, we provide practical tools that actually work.',
  commitment = "This isn't your typical conference. We create experiences that inspire, educate, and genuinely engage people. Every speaker has earned their place. They've walked the path, tested their methods, and have the results to back it up. When they share their knowledge, it's not just information. It's insight, delivered with passion and generosity. You don't just listen. You experience it.",
  ctaHref = 'mailto:info@findyourbalance.ba',
  ctaLabel = 'Join as an Expert! Drop Us an Email',
  videoId = 'V-bhHokihzc',
}: ShareExpertiseProps) {
  return (
    <section className="relative bg-balance-500 py-16 md:py-20 lg:pt-40 lg:pb-0 pb-0 overflow-hidden">
      {/* DarkVeil background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Content */}
          <div className="space-y-6">
            <h6 className="text-xs font-medium uppercase tracking-[0.06em] text-balance-200">
              {eyebrow}
            </h6>
            
            <h2 className="text-5xl leading-tighter md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-balance-100">{title} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-magenta">
                {highlightWord}
              </span>
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-balance-100">
              {intro}
            </p>

            <p className="text-base md:text-lg leading-relaxed text-balance-100">
              {description}
            </p>

            <div className="space-y-4">
              <p className="text-base md:text-lg leading-relaxed text-balance-100">
                <strong className="font-semibold text-white">{commitment.split('.')[0]}.</strong>
                {commitment.substring(commitment.indexOf('.') + 1)}
              </p>
              <p className="text-base md:text-lg leading-relaxed text-white font-semibold">
                You experience it.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                asChild 
                size="lg" 
                className="rounded-xl bg-balance-300 hover:bg-balance-400 text-white"
              >
                <Link href={ctaHref} className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  {ctaLabel}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Video */}
          <div className="relative">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '9/16' }}>
              <iframe
                className="absolute inset-0 w-full h-[90%] rounded-3xl"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

