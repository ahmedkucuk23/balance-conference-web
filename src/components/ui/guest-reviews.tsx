"use client"

import React from "react"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export type GuestReview = {
  text: string
}

interface GuestReviewsProps {
  reviews: GuestReview[]
}

export const GuestReviews = ({ reviews }: GuestReviewsProps) => {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {reviews.map((review, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 break-inside-avoid mb-6"
        >
          {/* Quote icon */}
          <div className="absolute top-4 left-4 opacity-20">
            <Quote className="w-8 h-8 text-purple-400" />
          </div>

          {/* Review text */}
          <p className="text-white/80 leading-relaxed italic pt-4">
            "{review.text}"
          </p>
        </motion.div>
      ))}
    </div>
  )
}
