"use client"

import { TopNavigation } from "@/components/blocks/top-navigation";
import { SponsorshipSection } from "@/components/blocks/sponsorship-section";
import { ContactFooter } from "@/components/blocks/contact-footer";
import DarkVeil from "@/components/ui/dark-veil";

export default function SponsorshipPage() {
  return (
    <main className="bg-[#0A031B] min-h-screen relative">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <TopNavigation glassmorphismOnly />
        <SponsorshipSection />
        <ContactFooter />
      </div>
    </main>
  );
}
