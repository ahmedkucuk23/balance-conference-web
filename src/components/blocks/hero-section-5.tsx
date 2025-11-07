'use client'
import React from 'react'
import { TopNavigation } from './top-navigation'
import { AnimatedMarqueeHero } from '@/components/ui/hero-3'
import { PastSpeakers } from './past-speakers'
import SarajevoConference from './sarajevo-conference'

// Conference speaker and event images
const CONFERENCE_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=60",
]

export function HeroSection() {
    return (
        <>
            <TopNavigation />
            <section style={{ backgroundColor: '#0A031B' }} className="w-full h-screen relative">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src="/assets/video/desktop.mp4"
                />
            </section>

            <AnimatedMarqueeHero
                tagline="Join 500+ Leaders and Innovators"
                title={
                    <>
                        Find Your Balance
                        <br />
                        Shape the Future
                    </>
                }
                description="The premier conference for visionaries seeking harmony between innovation and wellbeing. Connect with industry leaders, discover breakthrough ideas, and transform your approach to work and life."
                ctaText="Register Now"
                images={CONFERENCE_IMAGES}
            />

            <PastSpeakers />

            <SarajevoConference />
        </>
    )
}
