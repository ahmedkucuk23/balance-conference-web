'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export function HeroSection() {
  const [videoSrc, setVideoSrc] = useState<string>('')

  useEffect(() => {
    // Determine which video to load based on screen size
    const updateVideoSrc = () => {
      if (window.innerWidth >= 1024) {
        setVideoSrc('/assets/video/horizontal-optimised.mp4')
      } else if (window.innerWidth >= 768) {
        setVideoSrc('/assets/video/01-tablet.mp4')
      } else {
        setVideoSrc('/assets/video/vertical-optimised.mp4')
      }
    }

    updateVideoSrc()
    window.addEventListener('resize', updateVideoSrc)
    return () => window.removeEventListener('resize', updateVideoSrc)
  }, [])

  return (
    <section className="w-full h-screen relative overflow-hidden">
      {/* Single Video Background */}
      {videoSrc && (
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 flex items-end justify-center h-full pb-12 md:pb-16">
        <Button
          size="lg"
          className="rounded-xl font-semibold text-black"
          style={{ backgroundColor: '#FAB53D' }}
          asChild
        >
          <Link href="/conferences/balance2026">
            See What is Coming Next...
          </Link>
        </Button>
      </div>
    </section>
  )
}
