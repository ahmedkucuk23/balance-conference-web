"use client"

import {Link} from "@/i18n/routing"
import Image from "next/image"
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"

export function ContactFooter() {
  const t = useTranslations('contactFooter')
  return (
    <footer id="kontakt" className="relative bg-[#0A031B] border-t border-white/10">
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/assets/img/logo-balance.png"
                alt="Balance Conference"
                width={320}
                height={80}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/balanceconferencesarajevo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-white/60 hover:text-purple-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/balanceconference"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-white/60 hover:text-purple-400 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/balanceconference"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-white/60 hover:text-purple-400 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@BalanceConferenceSarajevo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-white/60 hover:text-purple-400 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#o-konferenciji" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  {t('aboutConference')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/galerija" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  {t('gallery')}
                </Link>
              </li>
              <li>
                <Link href="/video-galerija" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  {t('videoGallery')}
                </Link>
              </li>
              <li>
                <Link href="/recenzije" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  {t('reviews')}
                </Link>
              </li>
              <li>
                <Link href="/tickets" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  {t('tickets')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  {t('addressLine1')}<br />
                  {t('addressLine2')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <a href="tel:+38733278500" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  +387 33 27 85 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <a href="mailto:balance@mita.ba" className="text-white/60 hover:text-purple-400 transition-colors text-sm">
                  BALANCE@MITA.BA
                </a>
              </li>
            </ul>
          </div>

          {/* Company info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('organizer')}</h4>
            <div className="space-y-3">
              <p className="text-white/60 text-sm">
                <span className="text-white font-medium">{t('mitagroup')}</span>
              </p>
              <p className="text-white/60 text-sm">
                {t('addressLine1')}<br />
                {t('addressLine2')}
              </p>
              <a
                href="https://www.balanceconference.ba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
              >
                {t('website')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs text-center sm:text-left">
              {t('copyright')}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/40 hover:text-white/60 transition-colors text-xs">
                {t('privacy')}
              </Link>
              <Link href="/terms" className="text-white/40 hover:text-white/60 transition-colors text-xs">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
