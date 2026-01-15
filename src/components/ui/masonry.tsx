"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface MasonryItem {
  id: string
  img: string
  url?: string
  height?: number
}

interface MasonryProps {
  items: MasonryItem[]
  ease?: string
  duration?: number
  stagger?: number
  animateFrom?: "bottom" | "top"
  scaleOnHover?: boolean
  hoverScale?: number
  blurToFocus?: boolean
  colorShiftOnHover?: boolean
  onImageClick?: (index: number) => void
}

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onImageClick,
}: MasonryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            y: animateFrom === "bottom" ? 50 : -50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: duration,
            delay: index * stagger,
            ease: ease === "power3.out" ? [0.23, 1, 0.32, 1] : undefined,
          }}
          className="break-inside-avoid mb-4"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className="block relative overflow-hidden rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
            onClick={() => onImageClick?.(index)}
          >
            <motion.img
              src={item.img}
              alt={`Gallery item ${item.id}`}
              className={cn(
                "w-full h-auto object-cover transition-all duration-300",
                blurToFocus && hoveredId && hoveredId !== item.id && "blur-sm",
                colorShiftOnHover && "group-hover:brightness-110"
              )}
              style={{
                height: item.height ? `${item.height}px` : "auto",
              }}
              whileHover={
                scaleOnHover
                  ? {
                      scale: hoverScale,
                      transition: { duration: 0.3 },
                    }
                  : undefined
              }
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
