'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'


export function HeroSection() {
  return (
    <section className="w-full h-screen relative overflow-hidden">
      {/* Video Background - Desktop (Horizontal) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hidden lg:block absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/video/horizontal-optimised.mp4" type="video/mp4" />
      </video>

      {/* Video Background - Tablet */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block lg:hidden absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/video/01-tablet.mp4" type="video/mp4" />
      </video>

      {/* Video Background - Mobile (Vertical) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="md:hidden absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/video/vertical-optimised.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
      </div>
    </section>
  )
}
