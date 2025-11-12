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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export interface TopNavigationProps {
  scrollThreshold?: number // Pixel value for when color should change. If undefined, uses 80% of viewport height
}

export function TopNavigation({ scrollThreshold }: TopNavigationProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolledPastHero, setScrolledPastHero] = React.useState(false)
  const pathname = usePathname()

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
      <header className="fixed top-0 left-0 right-0 z-[10000] w-full" style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <nav
          className={cn(
            "w-full py-3 sm:py-4 transition-all duration-300 relative",
            scrolledPastHero 
              ? "backdrop-blur-lg bg-white/90" 
              : "backdrop-blur-lg bg-balance-500/10"
          )}
          style={{ minHeight: '56px' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 flex items-center justify-between relative z-10">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-0 relative flex-shrink-0">
              <div className="relative h-8 sm:h-10 md:h-12 w-auto transition-all duration-300">
                <Image
                  src="/assets/img/logo-balance.png"
                  alt="Balance Conference 2026"
                  width={180}
                  height={64}
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
                    <NavigationMenuLink asChild>
                      <Link href="/conferences" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        scrolledPastHero
                          ? "text-gray-900 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100"
                          : "text-white hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                      )}>
                        Conferences
                      </Link>
                    </NavigationMenuLink>
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

              <Button
                asChild
                className="bg-balance-300 hover:bg-balance-400 text-white rounded-lg px-6"
              >
                <Link href="/tickets">Get Tickets</Link>
              </Button>
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
        <div className="lg:hidden fixed inset-0 z-[9999] backdrop-blur-xl bg-[#0A031B]/85">
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
