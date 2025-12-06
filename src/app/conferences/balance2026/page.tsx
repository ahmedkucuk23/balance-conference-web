'use client'

import React, { useEffect, useState } from 'react'
import { TopNavigation } from '@/components/blocks/top-navigation'
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
import { Target, Brain, Heart, Users, Lightbulb, TrendingUp, Shield, Smile } from 'lucide-react'

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

  useEffect(() => {
    fetch('/api/speakers')
      .then(res => res.json())
      .then(data => {
        if (data.speakers) {
          const speakerTestimonials: Testimonial[] = data.speakers
            .filter((speaker: any) => speaker.published && speaker.motto)
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
                <Target className="w-8 h-8 md:w-10 md:h-10 text-white" />
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
                <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
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
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" />
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
                <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
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
                <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-white" />
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
                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />
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
                <Shield className="w-8 h-8 md:w-10 md:h-10 text-white" />
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
                <Smile className="w-8 h-8 md:w-10 md:h-10 text-white" />
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
