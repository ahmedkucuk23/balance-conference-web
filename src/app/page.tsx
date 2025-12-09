import dynamic from 'next/dynamic';
import { TopNavigation } from "@/components/blocks/top-navigation";
import { HeroSection } from "@/components/blocks/hero-section-5";
import { BannerProvider } from "@/components/blocks/announcement-banner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Lazy load below-the-fold components
const GradualBlur = dynamic(() => import("@/components/ui/gradual-blur"));
const AnimatedMarqueeHero = dynamic(() => import("@/components/ui/hero-3").then(mod => ({ default: mod.AnimatedMarqueeHero })), {
  loading: () => <div className="h-screen" />,
});
const SarajevoConference = dynamic(() => import("@/components/blocks/sarajevo-conference"));
const PastSpeakers = dynamic(() => import("@/components/blocks/past-speakers").then(mod => ({ default: mod.PastSpeakers })));
const ShareExpertise = dynamic(() => import("@/components/blocks/share-expertise"));
const CurvedLoop = dynamic(() => import("@/components/CurvedLoop"));
const BlogSection = dynamic(() => import("@/components/ui/blog-section").then(mod => ({ default: mod.BlogSection })));
const HoverFooter = dynamic(() => import("@/components/ui/hover-footer").then(mod => ({ default: mod.HoverFooter })));

const CONFERENCE_IMAGES = [
  "/assets/img/1.jpg.webp",
  "/assets/img/2.jpg",
  "/assets/img/3.jpg",
  "/assets/img/4.jpg.webp",
  "/assets/img/5.jpg",
  "/assets/img/6.jpg.webp",
  "/assets/img/7.jpg.webp",
  "/assets/img/8.jpg.webp",
  "/assets/img/9.jpg.webp",
  "/assets/img/10.jpeg.webp",
];

export default function Home() {
  return (
    <BannerProvider>
      {/* GradualBlur effect for entire page */}
      <GradualBlur
        target="page"
        position="bottom"
        height="10rem"
        strength={.3}
        divCount={4}
        opacity={1}
        zIndex={1000}
        responsive={true}
        mobileHeight="0rem"
      />

      <TopNavigation scrollThreshold={880} hasBanner={true} />
      <HeroSection />
      <AnimatedMarqueeHero
        tagline="THE ART OF BALANCE"
        title={
          <>
            Slow Down. Breathe In.
            <br />
            Begin <span className="text-accent-magenta">Again.</span>
          </>
        }
        description="Join a community redefining what it means to live well, inside and out. Reconnect with yourself, others, and what truly matters."
        ctaText="See How We Do It"
        ctaLink="/about"
        images={CONFERENCE_IMAGES}
      />
      <SarajevoConference />
      <ShareExpertise />
      <section className="w-full bg-black relative -mt-16 md:-mt-20">
        <CurvedLoop
          marqueeText="✦ SAVE THE DATE ✦ NEW CONFERENCE IS HERE"
          speed={0.7}
          curveAmount={400}
          direction="right"
          interactive={true}
          className=""
        />
        <div className="flex justify-center pt-0 pb-12">
          <Button
            size="lg"
            className="rounded-xl font-semibold text-black text-lg px-8 py-6"
            style={{ backgroundColor: '#FAB53D' }}
            asChild
          >
            <Link href="/conferences/balance2026">
              Join Us For the New Edition
            </Link>
          </Button>
        </div>
      </section>
      <PastSpeakers />
      
      {/* Latest Insights Section */}

<section className="w-full bg-balance-500 backdrop-blur-sm">
      <section className="mx-auto max-w-6xl relative z-10 py-16">
        <BlogSection
          heading="Latest Insights"
          description="Explore articles on balance, wellness, and personal growth from our community."
          desktopColumns={3}
          tabletColumns={3}
          mobileColumns={1}
        />
      </section>
    </section>

      <HoverFooter />
    </BannerProvider>
  );
}
