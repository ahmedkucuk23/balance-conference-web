'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { Banner } from '@/components/ui/banner'
import { Button } from '@/components/ui/button'

const BannerContext = createContext({ isBannerVisible: true })

export function useBannerVisibility() {
  return useContext(BannerContext)
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ months: 0, days: 0, hours: 0, seconds: 0 });

  useEffect(() => {
    const conferenceDate = new Date('2026-03-26T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = conferenceDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      const months = Math.floor(totalDays / 30);
      const days = totalDays % 30;
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ months, days, hours, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-black font-mono text-xs rounded-md px-3 py-1.5 inline-block" style={{ backgroundColor: '#FFFFFF80' }}>
      {timeLeft.months}mo {timeLeft.days}d {timeLeft.hours}h {timeLeft.seconds}s
    </span>
  );
}

export function BannerProvider({ children }: { children: React.ReactNode }) {
  const [isBannerVisible, setIsBannerVisible] = useState(true)

  return (
    <BannerContext.Provider value={{ isBannerVisible }}>
      <AnnouncementBannerContent isVisible={isBannerVisible} setIsVisible={setIsBannerVisible} />
      {children}
    </BannerContext.Provider>
  )
}

function AnnouncementBannerContent({
  isVisible,
  setIsVisible
}: {
  isVisible: boolean
  setIsVisible: (value: boolean) => void
}) {
  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[10001] w-full shadow-sm">
      <Banner
        variant="default"
        size="lg"
        layout="center"
        className="border-0 border-b-0"
        style={{ backgroundColor: '#00D8FF' }}
        isClosable={true}
        onClose={() => setIsVisible(false)}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full">
          <p className="text-sm text-black font-medium text-center">
            ✦ Save the date! Balance Conference 2026: Get Motivated is here, your next life-changing experience! ✦
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <CountdownTimer />
            <Button size="sm" className="rounded-md bg-accent-gold hover:bg-accent-gold/90 text-black text-sm px-3 py-1.5 h-auto" asChild>
              <a href="/conferences">Learn more</a>
            </Button>
          </div>
        </div>
      </Banner>
    </div>
  )
}
