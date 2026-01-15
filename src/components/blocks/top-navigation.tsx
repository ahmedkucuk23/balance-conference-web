"use client"

import * as React from "react"
import {Link} from "@/i18n/routing"
import Image from "next/image"
import { usePathname } from "@/i18n/routing"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from "@/components/ui/language-switcher"

export interface TopNavigationProps {
  scrollThreshold?: number // Pixel value for when color should change. If undefined, uses 80% of viewport height
  glassmorphismOnly?: boolean // If true, keeps dark glassmorphism style always (no white bar transition)
}

export function TopNavigation({ scrollThreshold, glassmorphismOnly = false }: TopNavigationProps = {}) {
  const t = useTranslations('nav')
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolledPastHero, setScrolledPastHero] = React.useState(false)

  // When glassmorphismOnly is true, we never change to white bar
  const showWhiteBar = !glassmorphismOnly && scrolledPastHero
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      // Use custom threshold if provided, otherwise default to 80% of viewport height
      const threshold = scrollThreshold ?? window.innerHeight * 0.8
      setScrolledPastHero(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollThreshold])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[10000] w-full" style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <nav
          className={cn(
            "w-full transition-all duration-300 relative",
            showWhiteBar
              ? "backdrop-blur-md bg-white/80"
              : "backdrop-blur-md bg-[#0A031B]/60"
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 flex items-center justify-between relative z-10">
            {/* Logo */}
            <Link href="/" className="flex items-center relative flex-shrink-0">
              <Image
                src="/assets/img/logo-balance.png"
                alt="Balance Conference"
                width={320}
                height={80}
                className={cn(
                  "h-16 sm:h-20 w-auto transition-all duration-300",
                  showWhiteBar ? "invert" : ""
                )}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                      "bg-transparent transition-colors duration-300",
                      showWhiteBar
                        ? "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                        : "text-white hover:bg-white/20 hover:text-white"
                    )}>
                      {t('conferences')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className={cn(
                        "flex flex-col w-[200px] gap-2 p-3",
                        showWhiteBar
                          ? "bg-white/95 backdrop-blur-md"
                          : "bg-[#0A031B]/95 backdrop-blur-md"
                      )}>
                        <li>
                          <Link
                            href="/conferences/get-motivated-2026"
                            className={cn(
                              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
                              showWhiteBar
                                ? "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                                : "text-white/80 hover:bg-white/20 hover:text-white"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">Get Motivated 2026</div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/conferences/find-your-balance-2025"
                            className={cn(
                              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
                              showWhiteBar
                                ? "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                                : "text-white/80 hover:bg-white/20 hover:text-white"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">Find Your Balance 2025</div>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/speakers" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        showWhiteBar
                          ? "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                          : "text-white hover:bg-white/20 hover:text-white"
                      )}>
                        {t('speakers')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/sponsorship" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        showWhiteBar
                          ? "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                          : "text-white hover:bg-white/20 hover:text-white"
                      )}>
                        {t('sponsorships')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/about-us" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        showWhiteBar
                          ? "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                          : "text-white hover:bg-white/20 hover:text-white"
                      )}>
                        {t('about')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/recenzije" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        showWhiteBar
                          ? "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                          : "text-white hover:bg-white/20 hover:text-white"
                      )}>
                        {t('reviews')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/contact" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        showWhiteBar
                          ? "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                          : "text-white hover:bg-white/20 hover:text-white"
                      )}>
                        {t('contact')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/excellence-awards" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        showWhiteBar
                          ? "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                          : "text-white hover:bg-white/20 hover:text-white"
                      )}>
                        {t('excellenceAwards')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg px-6 shadow-lg shadow-purple-500/25"
              >
                <Link href="/tickets">{t('buyTicket')}</Link>
              </Button>

              {/* Language Switcher */}
              <div className="ml-3">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-md transition-colors relative flex-shrink-0 ml-2 z-20",
                showWhiteBar
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              )}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Outside header to avoid z-index stacking context issues */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999] backdrop-blur-xl bg-[#0A031B]/85">
          <div className="flex flex-col h-full w-full px-16 py-24">
            <div className="flex flex-col space-y-8 flex-1">
              <div className="space-y-4">
                <div className="text-2xl font-semibold text-white/60">{t('conferences')}</div>
                <div className="pl-4 space-y-4">
                  <Link
                    href="/conferences/get-motivated-2026"
                    className="block text-lg font-medium transition-all duration-300 relative text-white/60 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Motivated 2026
                  </Link>
                  <Link
                    href="/conferences/find-your-balance-2025"
                    className="block text-lg font-medium transition-all duration-300 relative text-white/60 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Find Your Balance 2025
                  </Link>
                </div>
              </div>
              <Link
                href="/speakers"
                className="text-2xl font-semibold transition-all duration-300 relative text-white/60 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('speakers')}
              </Link>
              <Link
                href="/sponsorship"
                className="text-2xl font-semibold transition-all duration-300 relative text-white/60 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('sponsorships')}
              </Link>
              <Link
                href="/about-us"
                className="text-2xl font-semibold transition-all duration-300 relative text-white/60 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('about')}
              </Link>
              <Link
                href="/recenzije"
                className="text-2xl font-semibold transition-all duration-300 relative text-white/60 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('reviews')}
              </Link>
              <Link
                href="/contact"
                className="text-2xl font-semibold transition-all duration-300 relative text-white/60 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              <Link
                href="/excellence-awards"
                className="text-2xl font-semibold transition-all duration-300 relative text-white/60 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('excellenceAwards')}
              </Link>
            </div>
            <div className="pt-8 space-y-4">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg shadow-lg shadow-purple-500/25"
              >
                <Link href="/tickets" onClick={() => setMobileMenuOpen(false)}>
                  {t('buyTicket')}
                </Link>
              </Button>

              {/* Mobile Language Switcher */}
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
