import React from 'react'
import dynamicImport from 'next/dynamic'
import { TopNavigation } from '@/components/blocks/top-navigation'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import { db } from '@/lib/db'
import { Eyebrow } from '@/components/ui/eyebrow'

// Lazy load heavy animation and WebGL components
const DarkVeil = dynamicImport(() => import('@/components/ui/dark-veil'))
const GradualBlur = dynamicImport(() => import('@/components/ui/gradual-blur'))
const BlurText = dynamicImport(() => import('@/components/ui/BlurText'))
const TracingBeam = dynamicImport(() => import('@/components/ui/tracing-beam').then(mod => ({ default: mod.TracingBeam })))
const CircularTestimonials = dynamicImport(() => import('@/components/ui/circular-testimonials').then(mod => ({ default: mod.CircularTestimonials })))
const TestimonialsColumn = dynamicImport(() => import('@/components/ui/testimonials-columns-1').then(mod => ({ default: mod.TestimonialsColumn })))
const BlogSection = dynamicImport(() => import('@/components/ui/blog-section').then(mod => ({ default: mod.BlogSection })))
const AnimatedSection = dynamicImport(() => import('@/components/blocks/about-page-client').then(mod => ({ default: mod.AnimatedSection })))
const HoverFooter = dynamicImport(() => import('@/components/ui/hover-footer').then(mod => ({ default: mod.HoverFooter })))

import type { Testimonial as TestimonialColumnType } from '@/components/ui/testimonials-columns-1'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
}

async function getSpeakerTestimonials(): Promise<Testimonial[]> {
  const speakers = await (db as any).speaker.findMany({
    where: {
      published: true,
      quote: { not: null }
    },
    orderBy: { createdAt: 'desc' },
    take: 10
  })

  const testimonials = (speakers as any[]).map((s: any) => ({
    quote: s.quote || '',
    name: s.name,
    designation: s.shortDescription || s.location || 'Speaker',
    src: s.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1066&fit=crop',
    slug: s.slug
  }))

  // Return fallback testimonials if no speakers found
  if (testimonials.length === 0) {
    return [
      {
        quote: "Balance Conference has been a transformative experience for our community.",
        name: "Featured Speaker",
        designation: "Balance Conference",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1066&fit=crop"
      }
    ]
  }

  return testimonials
}

const testimonialsColumns: TestimonialColumnType[] = [
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

const firstColumn = testimonialsColumns.slice(0, 3)
const secondColumn = testimonialsColumns.slice(3, 6)
const thirdColumn = testimonialsColumns.slice(6, 9)

export default async function AboutPage() {
  const speakerTestimonials = await getSpeakerTestimonials()
  
  return (
    <>
      {/* GradualBlur effect for entire page */}
      <GradualBlur
        target="page"
        position="bottom"
        height="8rem"
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
            Journey so Far
          </h1>
          <p className="text-2xl text-balance-200 text-center">
            Our Story of Balance
          </p>
        </div>
      </section>

      {/* Content Section with Tracing Beam */}
      <section className="w-full relative z-10">
        <TracingBeam className="px-4 sm:px-6 -ml-4 md:ml-24 xl:ml-48" beamStartOffset="top-72">
          <div className="mx-auto xl:ml-48 lg:mr-auto max-w-4xl antialiased pt-4 relative pl-8 sm:pl-12 lg:pl-0">
            {/* First paragraph - full width */}
            <div className="flex items-center py-64 px-6">
              <div className="w-full max-w-4xl">
                <BlurText
                  segments={[
                    { text: "The world is moving faster than ever. Uncertainty, pressure, anxiety. These aren't occasional struggles anymore." },
                    { text: "They're the default setting.", color: '#ffffff' }
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

            {/* Quote Section */}
            <div className="min-h-screen flex items-center py-64 px-6">
              <div className="w-full max-w-4xl lg:max-w-3xl xl:max-w-5sxl space-y-6 sm:space-y-8">
                <BlurText
                  segments={[
                    {
                      text: "In this environment, managing stress, understanding our bodies and minds, and finding balance aren't luxuries. They're "
                    },
                    {
                      text: "survival skills.",
                      color: '#ffffff'
                    },
                    {
                      text: "And that's why"
                    },
                    {
                      text: "Find Your Balance",
                      color: '#D4AF37'
                    },
                    {
                      text: "exists."
                    }
                  ]}
                  delay={80}
                  animateBy="words"
                  direction="top"
                  animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 } as any}
                  animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
                  className="text-4xl md:text-5xl tracking-tight font-thin italic text-balance-100 text-left font-serif-display"
                />
                <div className="space-y-2">
                  <BlurText
                    segments={[{ text: "Ejub Kučuk" }]}
                    delay={40}
                    animateBy="letters"
                    direction="top"
                    animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -20 } as any}
                    animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
                    className="text-2xl font-semibold text-white"
                  />
                  <BlurText
                    segments={[{ text: "'Find Your Balance' Founder & CEO" }]}
                    delay={40}
                    animateBy="letters"
                    direction="top"
                    animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -20 } as any}
                    animationTo={[{ filter: 'blur(5px)', opacity: 0.5, y: 5 }, { filter: 'blur(0px)', opacity: 1, y: 0 }] as any}
                    className="text-lg text-balance-200"
                  />
                </div>
              </div>
            </div>

            {/* Why It Matters Section */}
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
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      <span className="hidden sm:inline">Join as an Expert! Drop Us an Email</span>
                      <span className="sm:hidden">Join as Expert</span>
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
        </TracingBeam>
      </section>

      <section className="relative z-10 py-16">
      <AnimatedSection className="flex flex-col items-start justify-center max-w-6xl mx-auto mb-10 px-12 lg:px-16 xl:px-0">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="text-5xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-white text-left">
              What our Speakers say
            </h2>
            <p className="text-left mt-5 opacity-75 text-balance-100">
              See what our speakers have to say about Balance Conference.
            </p>
          </AnimatedSection>
        <div className="mx-auto max-w-8xl px-6 lg:px-12 flex items-center justify-center">
          <CircularTestimonials
            testimonials={speakerTestimonials}
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
        </div>
      </section>

 {/* Attendees Testimonials Columns Section */}
 <section className="relative z-10 py-16" style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}>
        <div className="container z-10 mx-auto max-w-7xl px-12 lg:px-16">
          <AnimatedSection className="flex flex-col items-start justify-center mx-auto mb-10">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="text-5xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-white text-left">
              What our attendees say
            </h2>
            <p className="text-left mt-5 opacity-75 text-balance-100">
              See what our participants have to say about Balance Conference.
            </p>
          </AnimatedSection>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[720px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={30} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={38} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={34} />
          </div>
        </div>
      </section>
      
      {/* Latest Insights Section */}
      <section className="relative max-w-6xl mx-auto z-10 py-16 px-6 md:px-4 lg:px-12 xl:px-0">
        <BlogSection
          heading="Related Reading"
          description="Deepen your understanding with articles on balance, mindfulness, and personal development."
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

