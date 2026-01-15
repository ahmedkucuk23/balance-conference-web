"use client"

import { TopNavigation } from "@/components/blocks/top-navigation";
import { Speakers2026 } from "@/components/blocks/speakers-2026";
import { Speakers2025 } from "@/components/blocks/speakers-2025";
import { HowWeDoItSection } from "@/components/blocks/how-we-do-it-section";
import { ContactFooter } from "@/components/blocks/contact-footer";
import DarkVeil from "@/components/ui/dark-veil";

export default function SpeakersPage() {
  return (
    <main className="bg-[#0A031B] min-h-screen relative">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <TopNavigation glassmorphismOnly />
        <Speakers2026 />
        <Speakers2025 />
        <HowWeDoItSection />
        <ContactFooter />
      </div>
    </main>
  );
}
