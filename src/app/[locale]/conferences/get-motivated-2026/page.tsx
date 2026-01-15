"use client"

import { useTranslations } from "next-intl";
import { TopNavigation } from "@/components/blocks/top-navigation";
import { Speakers2026 } from "@/components/blocks/speakers-2026";
import { ContactFooter } from "@/components/blocks/contact-footer";
import { AboutConference } from "@/components/blocks/about-conference";
import { MotivacijaSection } from "@/components/blocks/motivacija-section";
import { BurnoutSection } from "@/components/blocks/burnout-section";
import { BenefitsCombined } from "@/components/blocks/benefits-combined";
import { ConferenceOffering } from "@/components/blocks/conference-offering";
import { WhatsNew2026 } from "@/components/blocks/whats-new-2026";
import DarkVeil from "@/components/ui/dark-veil";
import {Link} from "@/i18n/routing";
import { Calendar, MapPin, Users, Sparkles, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GetMotivated2026Page() {
  const t = useTranslations("getMotivated2026");
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
            {/* Conference Badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30 text-purple-300 text-sm font-bold mb-6 animate-pulse">
              {t("badge")}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-white">{t("title")} </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Motivated
              </span>
            </h1>

            {/* Year */}
            <div className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-8">
              {t("year")}
            </div>

            {/* Description */}
            <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-12">
              {t("description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl px-8 py-6 text-lg font-bold shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
              >
                <Link href="/tickets">
                  {t("buyTicket")}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl px-8 py-6 text-lg font-bold backdrop-blur-sm"
              >
                <Link href="/#o-konferenciji">
                  {t("learnMore")}
                </Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-white/60 text-sm mb-1">{t("yearLabel")}</div>
                <div className="text-white font-bold text-lg">{t("year")}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <MapPin className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <div className="text-white/60 text-sm mb-1">{t("locationLabel")}</div>
                <div className="text-white font-bold text-lg">{t("location")}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-white/60 text-sm mb-1">{t("topicLabel")}</div>
                <div className="text-white font-bold text-lg">{t("topic")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {t("whyTitle")}
              </h2>
              <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                <p>{t("whyParagraph1")}</p>
                <p>{t("whyParagraph2")}</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Target className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-3">{t("whatYouLearnTitle")}</h3>
                <ul className="space-y-2 text-white/70">
                  <li>• {t("whatYouLearn1")}</li>
                  <li>• {t("whatYouLearn2")}</li>
                  <li>• {t("whatYouLearn3")}</li>
                  <li>• {t("whatYouLearn4")}</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Users className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-3">{t("whoIsItForTitle")}</h3>
                <ul className="space-y-2 text-white/70">
                  <li>• {t("whoIsItFor1")}</li>
                  <li>• {t("whoIsItFor2")}</li>
                  <li>• {t("whoIsItFor3")}</li>
                  <li>• {t("whoIsItFor4")}</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Award className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-3">{t("benefitsTitle")}</h3>
                <ul className="space-y-2 text-white/70">
                  <li>• {t("benefits1")}</li>
                  <li>• {t("benefits2")}</li>
                  <li>• {t("benefits3")}</li>
                  <li>• {t("benefits4")}</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Sparkles className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-3">{t("specialPerksTitle")}</h3>
                <ul className="space-y-2 text-white/70">
                  <li>• {t("specialPerks1")}</li>
                  <li>• {t("specialPerks2")}</li>
                  <li>• {t("specialPerks3")}</li>
                  <li>• {t("specialPerks4")}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* About Conference Section */}
        <AboutConference />

        {/* Motivacija Section */}
        <MotivacijaSection />

        {/* Burnout Section */}
        <BurnoutSection />

        {/* Benefits Combined */}
        <BenefitsCombined />

        {/* Conference Offering */}
        <ConferenceOffering />

        {/* What's New in 2026 */}
        <WhatsNew2026 />

        {/* Speakers Section */}
        <Speakers2026 />

        {/* Final CTA Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* CTA Box */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-sm">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t("finalCtaTitle")}
              </h3>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                {t("finalCtaDescription")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl px-10 py-6 text-lg font-bold shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
                >
                  <Link href="/tickets">
                    {t("buyTicketsNow")}
                  </Link>
                </Button>
              </div>
              <p className="text-white/50 text-sm mt-6">
                {t("earlyPricing")}
              </p>
            </div>

            {/* Previous Conference Link */}
            <div className="text-center mt-12">
              <p className="text-white/60 mb-4">
                {t("previousConferenceText")}
              </p>
              <Link
                href="/conferences/find-your-balance-2025"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {t("viewFindYourBalance")}
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  );
}
