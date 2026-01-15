"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

interface GalleryImage {
  id: string
  img: string
  url?: string
}

export function PhotoGallerySlider() {
  const t = useTranslations('photoGallery')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const response = await fetch('/api/gallery')
        const data = await response.json()
        setGalleryImages(data)
      } catch (error) {
        console.error("Error loading gallery images:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryImages()
  }, [])

  // Calculate items per view based on screen size
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setItemsPerView(3)
        } else {
          setItemsPerView(5)
        }
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + itemsPerView) % galleryImages.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - itemsPerView + galleryImages.length) % galleryImages.length)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    )
  }

  if (galleryImages.length === 0) {
    return null
  }

  // Get images to display based on itemsPerView
  const getVisibleImages = () => {
    const visible = []
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % galleryImages.length
      visible.push(galleryImages[index])
    }
    return visible
  }

  const visibleImages = getVisibleImages()

  return (
    <div ref={ref} className="relative py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Image Grid */}
        <div className="relative">
          {/* Left Arrow */}
          {galleryImages.length > itemsPerView && (
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 -ml-2 sm:-ml-6"
              aria-label="Previous images"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow */}
          {galleryImages.length > itemsPerView && (
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 -mr-2 sm:-mr-6"
              aria-label="Next images"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Images Grid Container */}
          <div className="px-8 sm:px-12">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-3 md:grid-cols-5 gap-4"
            >
              {visibleImages.map((image, idx) => (
                <motion.div
                  key={`${image.id}-${idx}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="relative h-48 md:h-64 rounded-xl overflow-hidden border-2 border-purple-500/20 hover:border-purple-500/50 shadow-lg shadow-purple-500/10 group transition-all duration-300"
                >
                  <img
                    src={image.img}
                    alt={`Gallery image ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA to view full gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <a
            href="/galerija"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
          >
            {t('viewAllButton')}
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
