'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import Orb from '@/components/ui/Orb'
import BlurText from '@/components/ui/BlurText'
import Image from 'next/image'

const contentSequence = [
  { type: 'text', content: 'Save the date!' },
  { type: 'logo', content: '/assets/img/logo-balance.png' },
  { type: 'text', content: 'Sarajevo 16.04.2026' },
  { type: 'text', content: 'Redesign your future' },
  { type: 'text', content: 'findyourbalance.net' }
]

function LoopingTextAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [key, setKey] = useState(0)

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % contentSequence.length)
      setKey((prev) => prev + 1)
    }, 1600)
  }

  const currentItem = contentSequence[currentIndex]

  if (currentItem.type === 'logo') {
    return (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: -50, filter: 'blur(32px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        onAnimationComplete={handleAnimationComplete}
        className="flex items-center justify-center"
      >
        <Image
          src={currentItem.content}
          alt="Balance Conference Logo"
          width={640}
          height={640}
          className="h-auto md:h-[720px] w-full object-contain"
          priority
        />
      </motion.div>
    )
  }

  return (
    <BlurText
      key={key}
      text={currentItem.content}
      delay={40}
      animateBy="letters"
      direction="top"
      onAnimationComplete={handleAnimationComplete}
      className="text-4xl md:text-6xl font-bold text-white text-center"
    />
  )
}

export function HeroSection() {
    return (
        <section style={{ backgroundColor: '#0A031B' }} className="w-full h-screen relative p-8">
            {/* Orb Background */}
            <div className="absolute inset-0 p-8 scale-[2] md:scale-100">
                <Orb
                    hoverIntensity={0.1}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
                />
            </div>

            {/* Centered Text Animation */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <LoopingTextAnimation />
            </div>
        </section>
    )
}
