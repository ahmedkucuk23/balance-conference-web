'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { TopNavigation } from '@/components/blocks/top-navigation'

const CurvedLoop = dynamic(() => import("@/components/CurvedLoop"))
import BlurText from '@/components/ui/BlurText'
import DarkVeil from '@/components/ui/dark-veil'
import { HoverFooter } from '@/components/ui/hover-footer'
import GradualBlur from '@/components/ui/gradual-blur'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'
import { TestimonialsColumn, type Testimonial as TestimonialColumnType } from '@/components/ui/testimonials-columns-1'
import { ByTheNumbers } from '@/components/blocks/by-the-numbers'
import { BlogSection } from '@/components/ui/blog-section'
import { motion } from 'motion/react'
import type { Testimonial } from '@/components/ui/testimonials'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Target, Brain, Heart, Users, Lightbulb, TrendingUp, Shield, Smile, Hourglass, Hammer, HeartHandshake, Laugh, CloudSun, Briefcase } from 'lucide-react'
import { TeamSection, type TeamMember } from '@/components/ui/team'
import { LinesPatternCard, LinesPatternCardBody } from '@/components/ui/card-with-lines-patter'

// Attendee testimonials for the columns section - We'll update these together
const attendeeTestimonials: TestimonialColumnType[] = [
  {
    text: "Balance Conference 2026 will be transformative.",
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    name: 'Coming Soon',
    role: 'Attendee',
  },
]

const firstColumn = attendeeTestimonials.slice(0, 3)
const secondColumn = attendeeTestimonials.slice(3, 6)
const thirdColumn = attendeeTestimonials.slice(6, 9)

export default function Balance2026Page() {
  const [speakers, setSpeakers] = useState<Testimonial[]>([])
  const [loadingSpeakers, setLoadingSpeakers] = useState(true)
  const [speakersList, setSpeakersList] = useState<TeamMember[]>([])
  const [loadingSpeakersList, setLoadingSpeakersList] = useState(true)

  useEffect(() => {
    // Fetch speakers for testimonials (with motto)
    fetch('/api/speakers?conferenceSlug=BalanceConference2026', {
      cache: 'no-store'
    })
      .then(res => res.json())
      .then(data => {
        if (data.speakers) {
          const speakerTestimonials: Testimonial[] = data.speakers
            .filter((speaker: any) => speaker.motto)
            .map((speaker: any) => ({
              name: speaker.name,
              designation: speaker.shortDescription || speaker.location || 'Speaker',
              quote: speaker.motto || '',
              src: speaker.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1066&fit=crop',
              slug: speaker.slug,
            }))
          setSpeakers(speakerTestimonials)
        }
      })
      .catch(err => console.error('Error fetching speakers:', err))
      .finally(() => setLoadingSpeakers(false))

    // Fetch all speakers for the grid list
    fetch('/api/speakers?conferenceSlug=BalanceConference2026', {
      cache: 'no-store'
    })
      .then(res => res.json())
      .then(data => {
        if (data.speakers) {
          const teamMembers: TeamMember[] = data.speakers.map((speaker: any) => ({
            name: speaker.name,
            role: speaker.shortDescription || speaker.location || '',
            avatar: speaker.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1066&fit=crop',
            slug: speaker.slug,
          }))
          setSpeakersList(teamMembers)
        }
      })
      .catch(err => console.error('Error fetching speakers list:', err))
      .finally(() => setLoadingSpeakersList(false))
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
      <section style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }} className="w-full h-[50vh] relative overflow-hidden z-10 pt-20 md:pt-0">
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
            Balance Conference 2026: Get Motivated
          </h1>
          <p className="text-2xl text-balance-200 text-center">
            March 26, 2026
          </p>
        </div>
      </section>

      {/* Content Section - We'll fill this together */}
      <section className="w-full relative z-10">
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          <div className="flex items-center py-64 px-6">
            <BlurText
              segments={[
                { text: 'In a world full of pressure, uncertainty, and constant speed, it\'s easy to lose balance. That\'s why motivation matters more than ever. Changing habits and staying motivated daily isn\'t about perfection - it\'s about small, consistent steps toward a calmer, balanced, and successful life.' }
              ]}
              delay={80}
              animateBy="words"
              direction="top"
              animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 } as any}
              animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
              className="text-3xl font-semibold text-balance-100 md:text-3xl leading-[1.25] break-words hyphens-auto"
            />
          </div>
        </div>
      </section>

      {/* Conference Goals Section */}
      <section className="w-full relative z-10 py-16">
        <div className="mx-auto px-6" style={{ maxWidth: '1120px' }}>
          <div className="mb-16">
            <BlurText
              segments={[
                { text: 'Conference Goals' }
              ]}
              delay={80}
              animateBy="words"
              direction="top"
              animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 } as any}
              animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            />
            <BlurText
              segments={[
                { text: 'At the conference, we\'ll bring together inspiring speakers, practical workshops, and a supportive community, all designed to help people.' }
              ]}
              delay={80}
              animateBy="words"
              direction="top"
              animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 } as any}
              animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
              className="text-lg text-balance-100 max-w-3xl"
            />
          </div>

          {/* Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Hourglass className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <p className="font-semibold text-base md:text-lg" style={{ color: '#EFEAFD' }}>Better Time Management</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Hammer className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <p className="font-semibold text-base md:text-lg" style={{ color: '#EFEAFD' }}>Breaking Old Patterns</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <HeartHandshake className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <p className="font-semibold text-base md:text-lg" style={{ color: '#EFEAFD' }}>Building Healthier Habits</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Laugh className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <p className="font-semibold text-base md:text-lg" style={{ color: '#EFEAFD' }}>Managing Stress</p>
            </motion.div>

            {/* Row 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CloudSun className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <p className="font-semibold text-base md:text-lg" style={{ color: '#EFEAFD' }}>Improving Clarity</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <p className="font-semibold text-base md:text-lg" style={{ color: '#EFEAFD' }}>Boosting Mental Well-being</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <p className="font-semibold text-base md:text-lg" style={{ color: '#EFEAFD' }}>Increasing Productivity</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <p className="font-semibold text-base md:text-lg" style={{ color: '#EFEAFD' }}>Connect with Others</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Tools and Experiences Section */}
      <section className="w-full relative z-10 py-16">
        <div className="mx-auto px-6" style={{ maxWidth: '1120px' }}>
          <div className="mb-8">
            <BlurText
              segments={[
                { text: 'New Tools and Experiences' }
              ]}
              delay={80}
              animateBy="words"
              direction="top"
              animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 } as any}
              animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            />
            <div className="space-y-6">
              <BlurText
                segments={[
                  { text: 'Whether you\'re struggling with career pressure, daily stress, creative block, or want to live with more intention, Balance Conference 2026 gives you concrete tools and renewed motivation to move forward.' }
                ]}
                delay={80}
                animateBy="words"
                direction="top"
                animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 } as any}
                animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
                className="text-lg text-balance-100 leading-relaxed"
              />
              <BlurText
                segments={[
                  { text: 'Real balance doesn\'t come from doing everything at once. Real balance comes from showing up every day, staying motivated, and giving yourself the space to breathe, reflect, and grow.' }
                ]}
                delay={80}
                animateBy="words"
                direction="top"
                animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 } as any}
                animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
                className="text-lg text-balance-100 leading-relaxed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Curved Loop Section */}
      <section className="w-full relative z-10">
        <CurvedLoop
          marqueeText="✦ BALANCE CONFERENCE 2026 ✦ GET MOTIVATED"
          speed={0.7}
          curveAmount={400}
          direction="right"
          interactive={true}
          className=""
        />
      </section>

      {/* Speakers 2026 Section */}
      <section className="relative z-10 py-16" style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}>
        <div className="mx-auto px-6" style={{ maxWidth: '1120px' }}>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-start justify-center mb-8"
          >
            <Eyebrow>Speakers</Eyebrow>
            <h2 className="text-5xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-white text-left">
              Speakers 2026
            </h2>
            <p className="text-left mt-5 opacity-75 text-balance-100">
              Meet the inspiring voices joining us at Balance Conference 2026.
            </p>
          </motion.div>
          {loadingSpeakersList ? (
            <div className="text-white text-center py-20">Loading speakers...</div>
          ) : (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {speakersList.map((member, index) => {
                const CardContent = (
                  <>
                    <img
                      className="h-[22.5rem] w-full rounded-xl object-cover object-top grayscale-0 transition-all duration-500 md:h-96 md:grayscale md:rounded-md md:hover:grayscale-0 md:group-hover:h-[22.5rem] md:group-hover:rounded-xl"
                      src={member.avatar}
                      alt={member.name}
                      loading="lazy"
                    />
                    <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                      <div className="flex justify-between">
                        <h3 className="text-3xl font-semibold transition-all duration-500 tracking-wider md:text-2xl md:tracking-normal md:group-hover:tracking-wider text-white">
                          {member.name}
                        </h3>
                        <span className="text-xs text-balance-200">
                          _0{index + 1}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-balance-200 inline-block translate-y-0 text-lg font-light opacity-100 transition duration-300 md:text-sm md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </>
                );

                return (
                  <Link
                    key={index}
                    href={`/speakers/${member.slug}`}
                    className="group overflow-hidden block"
                  >
                    {CardContent}
                  </Link>
                );
              })}

              {/* Coming Soon Cards - Always show 3 */}
              {[1, 2, 3].map((num) => (
                <div key={`coming-soon-${num}`} className="group overflow-hidden">
                  <LinesPatternCard
                    className="h-full border-balance-300/20 bg-[#0A031B]"
                    gradientClassName="bg-transparent"
                  >
                    <LinesPatternCardBody className="flex flex-col items-center justify-center h-[22.5rem] md:h-96">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-balance-300/50 flex items-center justify-center">
                          <Users className="w-10 h-10 text-balance-300/70" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">
                          Coming Soon
                        </h3>
                        <p className="text-balance-200 text-sm">
                          More speakers to be announced
                        </p>
                      </div>
                    </LinesPatternCardBody>
                  </LinesPatternCard>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="relative max-w-6xl mx-auto z-10 py-16">
        <BlogSection
          heading="Conference Insights"
          description="Learn about what to expect from Balance Conference 2026."
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
