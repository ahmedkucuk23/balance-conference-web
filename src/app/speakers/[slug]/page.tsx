import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TopNavigation } from '@/components/blocks/top-navigation'
import BlurText from '@/components/ui/BlurText'
import DarkVeil from '@/components/ui/dark-veil'
import { HoverFooter } from '@/components/ui/hover-footer'
import GradualBlur from '@/components/ui/gradual-blur'
import { SpeakersCTA } from '@/components/blocks/speakers-cta'
import { Mail, Linkedin, Instagram, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type Motto = { label: string; highlight: string; description: string }

function safeParseArray(value?: string | null): string[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    // If JSON parsing fails, treat as plain text and split by newlines or return as single paragraph
    return [String(value)]
  }
}

function safeParseMotto(value?: string | null): Motto | null {
  if (!value) return null
  try {
    const parsed = JSON.parse(value)
    if (parsed && typeof parsed === 'object') {
      return {
        label: String(parsed.label ?? ''),
        highlight: String(parsed.highlight ?? ''),
        description: String(parsed.description ?? ''),
      }
    }
    return null
  } catch {
    return null
  }
}

export default async function SpeakerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: rawSlug } = await params
  const slug = rawSlug ? decodeURIComponent(rawSlug) : ''

  if (!slug) {
    redirect('/speakers')
  }

  let record = await (db as any).speaker.findUnique({
    where: { slug: String(slug) },
  })

  // Fallback: handle URLs without dashes or with different separators
  if (!record) {
    const inputKey = String(slug).toLowerCase().replace(/[^a-z0-9]/g, '')
    const candidates = await (db as any).speaker.findMany({
      select: { slug: true },
    })
    const matched = candidates.find(
      (c: any) => String(c.slug).toLowerCase().replace(/[^a-z0-9]/g, '') === inputKey
    )
    if (matched?.slug) {
      record = await (db as any).speaker.findUnique({
        where: { slug: matched.slug },
      })
    }
  }

  if (!record) {
    redirect('/speakers')
  }

  const bio = safeParseArray(record.bio as string | undefined)
  const motto = safeParseMotto(record.motto as string | undefined)

  const emailLink = record.email ? `mailto:${record.email}` : undefined

  return (
    <>
      {/* GradualBlur effect for entire page */}
      <GradualBlur
        target="page"
        position="bottom"
        height="12rem"
        strength={.5}
        divCount={4}
        opacity={1}
        zIndex={1000}
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

      {/* Div1: Hero Section */}
      <section 
        className="relative z-10 flex items-center pt-64"
        style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}
      >
        <div className="mx-auto max-w-6xl px-8 lg:px-12 w-full pt-4 -mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
            {/* Left: Speaker Image (30%) */}
            <div className="lg:col-span-3">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-balance-300/20">
                <Image
                  src={record.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop'}
                  alt={record.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right: Speaker Info (70%) */}
            <div className="lg:col-span-7 flex flex-col justify-end space-y-3">
              {/* Back button - above the text on all screen sizes */}
              <Link
                href="/speakers"
                className="flex items-center gap-1 text-balance-200 hover:text-white transition-colors text-sm font-medium group mb-2"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                All Speakers
              </Link>

              <h6 className="text-sm font-medium uppercase tracking-wider text-balance-200 mb-2">
                Sarajevo Conference 2025 Speaker
              </h6>
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                {record.name}
              </h1>
              <p className="text-xl md:text-2xl text-white">
                {record.location ?? ''}
              </p>
              <p className="text-lg md:text-xl text-balance-200 max-w-2xl">
                {record.shortDescription ?? ''}
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-4 pt-4">
                {emailLink && (
                  <a
                    href={emailLink}
                    className="w-10 h-10 rounded-full border border-balance-300/30 flex items-center justify-center text-white hover:bg-balance-300/20 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                {record.linkedin && (
                  <a
                    href={record.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-balance-300/30 flex items-center justify-center text-white hover:bg-balance-300/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {record.instagram && (
                  <a
                    href={record.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-balance-300/30 flex items-center justify-center text-white hover:bg-balance-300/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Div2: Content Section */}
      <section 
        className="relative z-10 flex items-center"
        style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}
      >
        <div className="mx-auto max-w-6xl px-8 md:px-12 w-full py-8 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-start">
            {/* Left: Quote (30%) */}
            <div className="lg:col-span-3">
              {record.quote ? (
                <div className="sticky top-32">
                  <BlurText
                    segments={[{ text: record.quote }]}
                    delay={40}
                    animateBy="words"
                    direction="top"
                    animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 } as any}
                    animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
                    onAnimationComplete={undefined}
                    className="text-4xl md:text-5xl italic font-serif-display text-white leading-tight"
                  />
                </div>
              ) : (
                <div className="w-full" />
              )}
            </div>

            {/* Right: Description + Optional Quote (70%) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Biography */}
              <div className="space-y-4">
                {bio.length > 0 ? (
                  bio.map((paragraph, index) => (
                    <p key={index} className="text-lg text-balance-100 leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-lg text-balance-200 italic">No biography available.</p>
                )}
              </div>

              {/* Motto Section */}
              {motto && (
                <div className="pt-8 space-y-4">
                  <p className="text-lg md:text-2xl text-balance-100">
                    {motto.label}
                  </p>
                  <BlurText
                    segments={[{ text: motto.highlight }]}
                    delay={40}
                    animateBy="letters"
                    direction="top"
                    animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 } as any}
                    animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
                    onAnimationComplete={undefined}
                    className="text-5xl italic font-serif-display md:text-5xl font-bold text-accent-gold "
                  />
                  <p className="text-lg md:text-xl text-balance-100 ">
                    {motto.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Speakers CTA Banner */}
      <SpeakersCTA />

      {/* Footer */}
      <HoverFooter />
    </>
  )
}

