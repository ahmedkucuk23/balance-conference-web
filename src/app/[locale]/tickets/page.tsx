"use client"

import { useTranslations } from "next-intl";
import { TopNavigation } from "@/components/blocks/top-navigation";
import { TicketsSection } from "@/components/blocks/tickets-section";
import { ContactFooter } from "@/components/blocks/contact-footer";
import DarkVeil from "@/components/ui/dark-veil";
import Lanyard from "@/components/ui/Lanyard";

export default function TicketsPage() {
  const t = useTranslations("tickets");
  return (
    <main className="bg-[#0A031B] min-h-screen relative">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <TopNavigation glassmorphismOnly />
        <TicketsSection />

        {/* Lanyard Section */}
        <div className="relative pb-12 sm:pb-16">
          <div className="w-full">
            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mt-8">
              {t("pullBadge")}{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t("badge")}
              </span>{" "}
              {t("forAnimation")}
            </h2>
          </div>
        </div>

        <ContactFooter />
      </div>
    </main>
  );
}
