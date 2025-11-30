import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

interface SpeakersCTAProps {
  heading?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export function SpeakersCTA({
  heading = "See what other speakers have to say",
  description = "Explore insights and perspectives from our diverse community of thought leaders and innovators.",
  buttonText = "View All Speakers",
  buttonLink = "/speakers"
}: SpeakersCTAProps) {
  return (
    <section className="relative z-10 py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-balance-500/90 to-transparent border border-balance-300/50 backdrop-blur-sm p-12 md:p-16">
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {heading}
            </h2>
            <p className="text-lg md:text-xl text-balance-100 max-w-2xl">
              {description}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-balance-300 hover:bg-balance-400 text-white rounded-full px-8 py-6 text-lg font-semibold mt-4"
            >
              <Link href={buttonLink} className="flex items-center gap-2">
                {buttonText}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Decorative gradient orbs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-balance-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-balance-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
      </div>
    </section>
  )
}
