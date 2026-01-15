"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryVideo {
  id: string
  url: string
  thumbnail?: string
  title?: string
}

interface VideoSliderProps {
  videos: GalleryVideo[]
}

export function VideoSlider({ videos }: VideoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1
    setCurrentIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
  }

  return (
    <div className="relative max-w-5xl mx-auto mb-16">
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 -ml-4 sm:-ml-6"
        aria-label="Previous video"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 -mr-4 sm:-mr-6"
        aria-label="Next video"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Video Container */}
      <div className="overflow-hidden rounded-2xl">
        <div className="aspect-video w-full bg-black rounded-2xl flex items-center justify-center">
          {videos[currentIndex] && (
            <video
              key={`${videos[currentIndex].id}-${currentIndex}`}
              src={videos[currentIndex].url}
              poster={videos[currentIndex].thumbnail}
              controls
              className="max-w-full max-h-full object-contain"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-purple-500 w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
