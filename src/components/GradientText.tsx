'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string
  animationSpeed?: number
  showBorder?: boolean
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  gradient = 'linear-gradient(90deg, #0099B5, #D83FFF, #4D2AA0, #1C0F3A)',
  animationSpeed = 10,
  showBorder = false,
}) => {
  return (
    <span className={cn('relative', className)}>
      <motion.span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: gradient,
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: animationSpeed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
      </motion.span>
      {showBorder && (
        <span
          className="absolute inset-0 bg-clip-text text-transparent blur-sm"
          style={{
            backgroundImage: gradient,
          }}
        >
          {children}
        </span>
      )}
    </span>
  )
}

export default GradientText
