"use client"

import { useTranslations } from "next-intl"
import { TopNavigation } from "@/components/blocks/top-navigation"
import { ContactFooter } from "@/components/blocks/contact-footer"
import DarkVeil from "@/components/ui/dark-veil"
import { useState, useEffect } from "react"
import { Loader2, Video } from "lucide-react"
import { motion } from "framer-motion"

interface GalleryVideo {
  id: string
  url: string
  thumbnail?: string
  title?: string
}

export default function VideoGalleryPage() {
  const t = useTranslations("videoGallery");
  const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchGalleryVideos() {
      try {
        const response = await fetch('/api/video-gallery')
        const data = await response.json()
        setGalleryVideos(data)
      } catch (error) {
        console.error("Error loading gallery videos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryVideos()
  }, [])

  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (video.requestFullscreen) {
      video.requestFullscreen()
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
              {t("badge")}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("title")}
            </h1>

            {/* Description */}
            <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>
        </section>

        {/* Video Gallery Section */}
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
            ) : galleryVideos.length === 0 ? (
              /* Empty state */
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                  <Video className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t("emptyTitle")}</h3>
                <p className="text-white/60 max-w-md mx-auto">
                  {t("emptyDescription")} <code className="px-2 py-1 rounded bg-white/10">/api/video-gallery</code>.
                </p>
              </div>
            ) : (
              /* Video Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                      <video
                        src={video.url}
                        poster={video.thumbnail}
                        controls
                        onClick={handleVideoClick}
                        className="w-full h-full object-contain cursor-pointer"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    {video.title && (
                      <p className="text-white/80 text-sm font-medium px-1">{video.title}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  )
}
