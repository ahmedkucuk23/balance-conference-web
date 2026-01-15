'use client'

import React from 'react'
import { TopNavigation } from '@/components/blocks/top-navigation'
import BlurText from '@/components/ui/BlurText'
import DarkVeil from '@/components/ui/dark-veil'
import { HoverFooter } from '@/components/ui/hover-footer'
import GradualBlur from '@/components/ui/gradual-blur'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'
import { TestimonialsColumn, type Testimonial as TestimonialColumnType } from '@/components/ui/testimonials-columns-1'
import { motion } from 'motion/react'

type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Balance Conference 2025 was a transformative experience. The thoughtful curation of speakers and workshops created a space where I could truly explore what balance means in my own life. It's rare to find an event that addresses both professional growth and personal wellbeing with such depth.",
    name: 'Marija Sinanović',
    designation: 'Entrepreneur & Leadership Coach',
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1066&fit=crop'
  },
  {
    quote: "What struck me most was the authenticity of the conversations. This wasn't just another conference—it was a genuine gathering of people committed to living more intentionally. The connections I made here continue to influence my work and personal journey.",
    name: 'Akan Abdula',
    designation: 'Brand Strategist & Author',
    src: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&h=1066&fit=crop'
  },
  {
    quote: "As someone who studies the brain and human behavior, I was impressed by how Balance Conference integrated scientific insights with practical wisdom. The sessions on neuroscience and wellbeing were particularly enlightening, bridging research and real-world application.",
    name: 'Dr. Bilgin Sait',
    designation: 'Neuroscientist & Educator',
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1066&fit=crop'
  },
  {
    quote: "The holistic approach to wellness at this conference was refreshing. From nutrition workshops to mindfulness practices, every aspect of balance was explored. I left with actionable strategies that I've integrated into both my professional practice and personal life.",
    name: 'Prof. dr. Maja Volk',
    designation: 'Nutritionist & Wellness Expert',
    src: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=800&h=1066&fit=crop'
  },
  {
    quote: "Balance Conference created a safe space for vulnerability and growth. The mindfulness sessions were beautifully designed, and the community that formed over those two days was truly special. This is the kind of event that changes how you see yourself and your potential.",
    name: 'Anya Patel',
    designation: 'Mindfulness Teacher',
    src: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&h=1066&fit=crop'
  },
  {
    quote: "The intersection of psychology, leadership, and personal development at Balance Conference was exactly what I needed. The speakers brought diverse perspectives, and the interactive format allowed for meaningful dialogue. I've recommended it to colleagues and clients alike.",
    name: 'David Chen',
    designation: 'Organizational Psychologist',
    src: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=800&h=1066&fit=crop'
  },
]

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

export default function ConferencesPage() {
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

      {/* Hero Section */}
      <section style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }} className="w-full h-[50vh] relative overflow-hidden z-10">
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
            Sarajevo Conference 2025
          </h1>
          <p className="text-2xl text-muted text-center">
            May 22, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full relative z-10">
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          {/* First paragraph - full width */}
          <div className="flex items-center py-64 px-6">
            <BlurText
              segments={[
                { text: 'Around' },
                { text: '1.75 million', color: '#ffffff' },
                { text: 'people in BiH show symptoms of post-traumatic stress disorder.' },
                { text: '400,000', color: '#ffffff' },
                { text: 'suffer from full PTSD. Mental health issues are rising and not just in frequency, but also in severity.' }
              ]}
              delay={80}
              animateBy="words"
              direction="top"
              className="text-3xl font-semibold text-balance-100 md:text-3xl leading-[1.25] break-words hyphens-auto"
            />
          </div>
        </div>

        {/* First paragraph section - left aligned */}
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          <div className="min-h-screen flex items-center px-6">
            <div className="w-full max-w-2xl">
              <BlurText
                segments={[
                  { text: 'Fast-paced lifestyles, constant change, unstable work environments, and social media pressure are taking their toll. Balance, the kind that harmonizes physical, emotional, mental, and spiritual needs, has become essential. Without it,' },
                  { text: 'people feel exhausted, directionless, and insecure.', color: '#ffffff' }
                ]}
                delay={80}
                animateBy="words"
                direction="top"
                className="text-3xl font-semibold text-balance-100 md:text-3xl leading-[1.25] break-words hyphens-auto"
              />
            </div>
          </div>
        </div>

        {/* Second paragraph section - right aligned */}
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          <div className="min-h-screen flex items-center px-6">
            <div className="w-full max-w-2xl ml-auto">
              <BlurText
                segments={[
                  { text: "Yet despite its importance, balance still doesn't get the attention it deserves." },
                  { text: "There's no public dialogue. No space dedicated to it.", color: '#ffffff', lineBreak: true }
                ]}
                delay={80}
                animateBy="words"
                direction="top"
                className="text-3xl font-semibold text-balance-100 md:text-3xl leading-[1.25] break-words hyphens-auto text-right"
              />
            </div>
          </div>
        </div>

        {/* Highlighted text */}
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          <div className="min-h-screen flex items-center px-6">
            <div className="w-full flex flex-wrap justify-center items-center gap-2">
              <BlurText
                segments={[
                  {
                    text: "That's why we created the first BiH conference dedicated to ",
                    color: undefined // Uses text-accent-second from className
                  },
                  {
                    text: "living in balance.",
                    color: 'white' // Overrides className color
                  }
                ]}
                delay={40}
                animateBy="letters"
                direction="top"
                className="text-6xl md:text-6xl tracking-tight font-thin italic text-accent-second text-center font-serif-display"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-8xl px-6 lg:px-12 flex items-center justify-center">
          <CircularTestimonials
            testimonials={testimonials}
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

      {/* Testimonials Columns Section */}
      <section className="relative z-10 py-16" style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}>
        <div className="container z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-10"
          >
            <div className="flex justify-center">
              <div className="border border-balance-200/30 py-1 px-4 rounded-lg text-balance-100 text-sm">Testimonials</div>
            </div>
            <h2 className="text-5xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-white text-center">
              What our attendees say
            </h2>
            <p className="text-center mt-5 opacity-75 text-balance-100">
              See what our participants have to say about Balance Conference.
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <HoverFooter />
    </>
  )
}
