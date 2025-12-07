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
import { BannerProvider } from '@/components/blocks/announcement-banner'
import { Button } from '@/components/ui/button'
import { Mail, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Attendee testimonials for the columns section
const attendeeTestimonials: TestimonialColumnType[] = [
  {
    text: "Balance Conference 2025 was a transformative experience. The thoughtful curation of speakers and workshops created a space where I could truly explore what balance means in my own life.",
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    name: 'Marija Sinanović',
    role: 'Entrepreneur & Leadership Coach',
  },
  {
    text: "What struck me most was the authenticity of the conversations. This wasn't just another conference—it was a genuine gathering of people committed to living more intentionally.",
    image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop',
    name: 'Akan Abdula',
    role: 'Brand Strategist & Author',
  },
  {
    text: "As someone who studies the brain and human behavior, I was impressed by how Balance Conference integrated scientific insights with practical wisdom.",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    name: 'Dr. Bilgin Sait',
    role: 'Neuroscientist & Educator',
  },
  {
    text: "The holistic approach to wellness at this conference was refreshing. From nutrition workshops to mindfulness practices, every aspect of balance was explored.",
    image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=400&h=400&fit=crop',
    name: 'Prof. dr. Maja Volk',
    role: 'Nutritionist & Wellness Expert',
  },
  {
    text: "Balance Conference created a safe space for vulnerability and growth. The mindfulness sessions were beautifully designed, and the community that formed was truly special.",
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop',
    name: 'Anya Patel',
    role: 'Mindfulness Teacher',
  },
  {
    text: "The intersection of psychology, leadership, and personal development at Balance Conference was exactly what I needed. The speakers brought diverse perspectives.",
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop',
    name: 'David Chen',
    role: 'Organizational Psychologist',
  },
  {
    text: "I left with actionable strategies that I've integrated into both my professional practice and personal life. This conference changed how I approach work-life balance.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    name: 'Sarah Johnson',
    role: 'Business Consultant',
  },
  {
    text: "The connections I made here continue to influence my work and personal journey. It's rare to find an event that addresses both professional growth and personal wellbeing.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    name: 'Michael Torres',
    role: 'Life Coach',
  },
  {
    text: "The sessions on neuroscience and wellbeing were particularly enlightening, bridging research and real-world application. Highly recommend for anyone seeking balance.",
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    name: 'Emma Wilson',
    role: 'Wellness Advocate',
  },
]

const firstColumn = attendeeTestimonials.slice(0, 3)
const secondColumn = attendeeTestimonials.slice(3, 6)
const thirdColumn = attendeeTestimonials.slice(6, 9)

export default function ConferencesPage() {
  const [speakers, setSpeakers] = useState<Testimonial[]>([])
  const [loadingSpeakers, setLoadingSpeakers] = useState(true)

  useEffect(() => {
    fetch('/api/speakers', {
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
  }, [])
  return (
    <BannerProvider>
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

      <TopNavigation scrollThreshold={9999999999} hasBanner={true} />

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
      <section style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }} className="w-full h-[50vh] relative overflow-hidden z-10 pt-[161px] md:pt-[103px]">
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
            Conferences
          </h1>
          <p className="text-2xl text-balance-200 text-center max-w-3xl">
            Join a community redefining what it means to live well, inside and out. Reconnect with yourself, others, and what truly matters.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full relative z-10">
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          <div className="flex items-center justify-center py-64 px-6">
            <BlurText
              segments={[
                { text: 'A yearly gathering focused on depth, honest conversations and ideas worth practicing.' }
              ]}
              delay={80}
              animateBy="words"
              direction="top"
              animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 } as any}
              animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
              className="text-3xl font-semibold text-balance-100 md:text-3xl leading-[1.25] break-words hyphens-auto text-center"
            />
          </div>

          {/* Conference Banners */}
          <div className="w-full flex flex-col md:flex-row h-[60vh] md:h-[40vh] group/container px-6 gap-5">
          {/* Balance 2026 Banner */}
          <Link
            href="/conferences/balance2026"
            className="relative flex-1 overflow-hidden transition-all duration-700 ease-in-out group/banner md:hover:flex-[1.4] flex items-center justify-center rounded-2xl"
            style={{
              backgroundImage: 'url(/assets/img/5e0f9bffbd38062c95cf5a66c5683acececf2c58.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover/banner:from-black/60" />
            <ArrowUpRight className="absolute top-6 right-6 w-8 h-8 text-white opacity-80" />
            <div className="relative z-10 text-center px-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-3"
              >
                Balance Conference 2026
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm md:text-base text-balance-100 max-w-md mx-auto"
              >
                Ready to renew your energy, find clarity, and build habits that last? Join us on March 26th and take part in an experience made for lasting change!
              </motion.p>
            </div>
          </Link>

          {/* Sarajevo 2025 Banner */}
          <Link
            href="/conferences/sarajevo2025"
            className="relative flex-1 overflow-hidden transition-all duration-700 ease-in-out group/banner md:hover:flex-[1.4] flex items-center justify-center rounded-2xl"
            style={{
              backgroundImage: 'url(/assets/img/895e62d470d46265b740217dcb5ba8eaa9f2bbe7.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover/banner:from-black/60" />
            <ArrowUpRight className="absolute top-6 right-6 w-8 h-8 text-white opacity-80" />
            <div className="relative z-10 text-center px-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-3"
              >
                Sarajevo Balance Conference 2025
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm md:text-base text-balance-100 max-w-md mx-auto"
              >
                See the recap of our previous edition
              </motion.p>
            </div>
          </Link>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="w-full relative z-10">
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          <div className="min-h-screen flex items-center py-64 px-6">
            <div className="w-full mx-auto max-w-xl lg:max-w-2xl mx-0 xl:max-w-6xl">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">
                {/* Left Side - Content */}
                <div className="space-y-8">
                  <h2 className="text-5xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                    Why It Matters?
                  </h2>

                  <div className="space-y-6 text-balance-100 text-lg leading-relaxed">
                    <p>
                      Traditional systems don't always give us space to talk about mental health, stress, or personal growth. Hospitals treat symptoms. Workplaces demand performance. But who's teaching us how to actually manage the pressure?
                    </p>
                    <p>
                      That's where we come in. We gather experts, share proven methods, and create a space where transformation happens, not through quick fixes, but through <span className="text-white font-semibold">real, lasting change.</span>
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className="bg-balance-300 hover:bg-balance-400 text-white rounded-xl w-full sm:w-auto"
                    asChild
                  >
                    <a href="/contact">
                      <Mail className="w-5 h-5 mr-2" />
                      <span className="hidden sm:inline">Join as an Expert! Drop Us an Email</span>
                      <span className="sm:hidden">Join as Expert</span>
                    </a>
                  </Button>
                </div>

                {/* Right Side - Image Grid */}
                <div className="grid grid-cols-2 gap-4 mt-12 xl:mt-0">
                  {/* Top Left Image */}
                  <div className="col-span-1">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop"
                        alt="Community gathering"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  {/* Top Right Image */}
                  <div className="col-span-1">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
                        alt="Conference networking"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Bottom Left Image */}
                  <div className="col-span-1">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop"
                        alt="Conference bags"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Bottom Right Image */}
                  <div className="col-span-1">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop"
                        alt="Conference attendees"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Testimonials Section */}
      <section className="relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-center max-w-6xl mx-auto mb-10 px-12 lg:px-16 xl:px-0"
        >
          <Eyebrow>Testimonials</Eyebrow>
          <h2 className="text-5xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-white text-left">
            What our Speakers say
          </h2>
          <p className="text-left mt-5 opacity-75 text-balance-100">
            See what our speakers have to say about Balance Conference.
          </p>
        </motion.div>
        <div className="mx-auto max-w-8xl px-6 lg:px-12 flex items-center justify-center">
          {loadingSpeakers ? (
            <div className="text-white text-center py-20">Loading speakers...</div>
          ) : speakers.length > 0 ? (
            <CircularTestimonials
              testimonials={speakers}
              autoplay={true}
              colors={{
                name: "#f7f7ff",
                designation: "#e1e1e1",
                testimony: "#f1f1f7",
                arrowBackground: "#141414",
                arrowForeground: "#f1f1f7",
                arrowHoverBackground: "#4D2AA0",
              }}
              fontSizes={{
                name: "3rem",
                designation: "1rem",
                quote: "1.125rem",
              }}
            />
          ) : (
            <div className="text-white border border-dotted border-balance-200/30 rounded-lg text-center py-20">No speakers available yet</div>
          )}
        </div>
      </section>

      {/* Attendees Testimonials Columns Section */}
      <section className="relative z-10 py-16" style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}>
        <div className="container z-10 mx-auto max-w-7xl px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-start justify-center mx-auto mb-10"
          >
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="text-5xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-white text-left">
              What our attendees say
            </h2>
            <p className="text-left mt-5 opacity-75 text-balance-100">
              See what our participants have to say about Balance Conference.
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[720px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={30} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={38} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={34} />
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="relative max-w-6xl mx-auto z-10 py-16">
        <BlogSection
          heading="Conference Insights"
          description="Learn from past experiences and prepare for upcoming Balance Conference events."
          desktopColumns={3}
          tabletColumns={3}
          mobileColumns={1}
        />
      </section>

      {/* Footer */}
      <HoverFooter />
    </BannerProvider>
  )
}
