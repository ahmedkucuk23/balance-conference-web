"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
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
import { useBannerVisibility } from "@/components/blocks/announcement-banner"

export interface TopNavigationProps {
  scrollThreshold?: number // Pixel value for when color should change. If undefined, uses 80% of viewport height
  hasBanner?: boolean // Whether the page has a banner above the navigation
}

export function TopNavigation({ scrollThreshold, hasBanner = false }: TopNavigationProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolledPastHero, setScrolledPastHero] = React.useState(false)
  const pathname = usePathname()
  const { isBannerVisible } = useBannerVisibility()

  React.useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Use custom threshold if provided, otherwise default to 80% of viewport height
          const threshold = scrollThreshold ?? window.innerHeight * 0.8
          setScrolledPastHero(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollThreshold])

  return (
    <>
      <header className={cn("fixed left-0 right-0 z-[10000] w-full", hasBanner && isBannerVisible && "top-[105px] md:top-[47px]")} style={{ position: 'fixed', top: (hasBanner && isBannerVisible) ? undefined : 0, left: 0, right: 0 }}>
        <nav
          className={cn(
            "w-full py-1 sm:py-1.5 transition-all duration-300 relative",
            scrolledPastHero
              ? "backdrop-blur-lg bg-white/90"
              : "backdrop-blur-lg bg-balance-500/10"
          )}
          style={{ minHeight: '56px' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 flex items-center justify-between relative z-10">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-0 relative flex-shrink-0">
              <div className="relative h-20 sm:h-20 md:h-20 w-auto transition-all duration-300">
                <Image
                  src="/assets/img/logo-balance.png"
                  alt="Balance Conference 2026"
                  width={300}
                  height={96}
                  className={cn(
                    "h-full w-auto object-contain transition-all duration-300",
                    scrolledPastHero ? "brightness-0" : "brightness-100"
                  )}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/about" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        scrolledPastHero
                          ? "text-gray-900 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100"
                          : "text-white hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                      )}>
                        About
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                      "bg-transparent transition-colors duration-300",
                      scrolledPastHero
                        ? "text-gray-900 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 data-[state=open]:bg-gray-100"
                        : "text-white hover:bg-white/10 focus:bg-white/10 active:bg-white/10 data-[state=open]:bg-white/10"
                    )}>
                      Conferences
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4 bg-white">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/conferences"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-accent-magenta focus:bg-gray-100 focus:text-accent-gold"
                            >
                              <div className="text-sm font-medium leading-none text-gray-900">All Conferences</div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                View all events
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/conferences/sarajevo2025"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-accent-magenta focus:bg-gray-100 focus:text-accent-gold"
                            >
                              <div className="text-sm font-medium leading-none text-gray-900">Sarajevo 2025</div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                May 22, 2025
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/conferences/balance2026"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-accent-magenta focus:bg-gray-100 focus:text-accent-gold"
                            >
                              <div className="text-sm font-medium leading-none text-gray-900">Balance 2026</div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                March 26, 2026
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/speakers" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        scrolledPastHero
                          ? "text-gray-900 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100"
                          : "text-white hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                      )}>
                        Speakers
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/blog" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        scrolledPastHero
                          ? "text-gray-900 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100"
                          : "text-white hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                      )}>
                        Blog
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/contact" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        scrolledPastHero
                          ? "text-gray-900 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100"
                          : "text-white hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                      )}>
                        Contact
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-md transition-colors relative flex-shrink-0 ml-2 z-20",
                scrolledPastHero
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
        <div
          className="lg:hidden fixed z-[9999] backdrop-blur-xl bg-[#0A031B]/85"
          style={hasBanner && isBannerVisible ? {
            top: '161px',
            bottom: 0,
            left: 0,
            right: 0
          } : {
            top: '56px',
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
            <div className="flex flex-col h-full w-full px-16 py-24">
              <div className="flex flex-col space-y-8 flex-1">
                <Link
                  href="/"
                  className={cn(
                    "text-2xl font-semibold transition-all duration-300 relative",
                    pathname === "/"
                      ? "text-white"
                      : "text-balance-200"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {pathname === "/" && (
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-balance-300" />
                  )}
                  Home
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    "text-2xl font-semibold transition-all duration-300 relative",
                    pathname === "/about"
                      ? "text-white"
                      : "text-balance-200"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {pathname === "/about" && (
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-balance-300" />
                  )}
                  About
                </Link>
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/conferences"
                    className={cn(
                      "text-2xl font-semibold transition-all duration-300 relative",
                      pathname === "/conferences" || pathname?.startsWith("/conferences/")
                        ? "text-white"
                        : "text-balance-200"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {(pathname === "/conferences" || pathname?.startsWith("/conferences/")) && (
                      <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-balance-300" />
                    )}
                    Conferences
                  </Link>
                  <div className="flex flex-col space-y-3 ml-6">
                    <Link
                      href="/conferences/sarajevo2025"
                      className={cn(
                        "text-lg font-medium transition-all duration-300 relative",
                        pathname === "/conferences/sarajevo2025"
                          ? "text-white"
                          : "text-balance-200"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {pathname === "/conferences/sarajevo2025" && (
                        <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-balance-300" />
                      )}
                      Sarajevo 2025
                    </Link>
                    <Link
                      href="/conferences/balance2026"
                      className={cn(
                        "text-lg font-medium transition-all duration-300 relative",
                        pathname === "/conferences/balance2026"
                          ? "text-white"
                          : "text-balance-200"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {pathname === "/conferences/balance2026" && (
                        <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-balance-300" />
                      )}
                      Balance 2026
                    </Link>
                  </div>
                </div>
                <Link
                  href="/speakers"
                  className={cn(
                    "text-2xl font-semibold transition-all duration-300 relative",
                    pathname === "/speakers" || pathname?.startsWith("/speakers/")
                      ? "text-white"
                      : "text-balance-200"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {(pathname === "/speakers" || pathname?.startsWith("/speakers/")) && (
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-balance-300" />
                  )}
                  Speakers
                </Link>
                <Link
                  href="/blog"
                  className={cn(
                    "text-2xl font-semibold transition-all duration-300 relative",
                    pathname === "/blog" || pathname?.startsWith("/blog/")
                      ? "text-white"
                      : "text-balance-200"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {(pathname === "/blog" || pathname?.startsWith("/blog/")) && (
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-balance-300" />
                  )}
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "text-2xl font-semibold transition-all duration-300 relative",
                    pathname === "/contact"
                      ? "text-white"
                      : "text-balance-200"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {pathname === "/contact" && (
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-balance-300" />
                  )}
                  Contact
                </Link>
              </div>
              
              {/* <div className="pt-8">
                <Button
                  asChild
                  className="w-full bg-balance-300 hover:bg-balance-400 text-white rounded-lg"
                >
                  <Link href="/tickets" onClick={() => setMobileMenuOpen(false)}>
                    Get Tickets
                  </Link>
                </Button>
              </div> */}
            </div>
          </div>
        )}
    </>
  )
}
