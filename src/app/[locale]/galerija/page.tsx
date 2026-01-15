"use client"

import { TopNavigation } from "@/components/blocks/top-navigation"
import { ContactFooter } from "@/components/blocks/contact-footer"
import DarkVeil from "@/components/ui/dark-veil"
import Masonry from "@/components/ui/masonry"
import Lightbox from "@/components/ui/lightbox"
import { useState, useEffect } from "react"
import { Loader2, ImageIcon } from "lucide-react"

interface GalleryImage {
  id: string
  img: string
  url?: string
  height?: number
}

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const handleNext = () => {
    if (currentImageIndex < galleryImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  return (
    <main className="bg-[#0A031B] min-h-screen relative">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <TopNavigation glassmorphismOnly />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            {/* Badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
              Balance Conference
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              GALERIJA
            </h1>

            {/* Description */}
            <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto">
              Pogledajte nezaboravne trenutke sa naših konferencija. Svaka fotografija priča priču o inspiraciji, učenju i povezivanju.
            </p>
          </div>
        </section>

        {/* Gallery Masonry Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            {isLoading ? (
              /* Loading state */
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              </div>
            ) : galleryImages.length === 0 ? (
              /* Empty state */
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                  <ImageIcon className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Galerija se uskoro puni</h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Stavite slike u <code className="px-2 py-1 rounded bg-white/10">/public/gallery/</code> folder i osvježite stranicu.
                </p>
              </div>
            ) : (
              /* Gallery with images */
              <Masonry
                items={galleryImages}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
                onImageClick={handleImageClick}
              />
            )}
          </div>
        </section>

        <ContactFooter />
      </div>

      {/* Lightbox */}
      <Lightbox
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </main>
  )
}
