'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Export a default component as well
export { AnimatedSection as AboutPageClient }

