"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

export function LecturePatron() {
  const t = useTranslations('sponsorsLogos')

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-purple-400 mb-6">
          {t('lecturePatron')}
        </h3>
        <div className="flex justify-center">
          <Image
            src="/sponsors/lukavac-cement.png"
            alt="Lukavac Cement"
            width={200}
            height={100}
            className="object-contain h-20 w-auto max-w-[200px] brightness-0 invert"
          />
        </div>
      </div>
    </section>
  )
}
