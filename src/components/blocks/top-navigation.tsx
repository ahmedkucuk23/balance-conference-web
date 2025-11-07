"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const scheduleItems = [
  {
    title: "Day 1",
    href: "/schedule/day-1",
    description: "Opening keynote and morning sessions on sustainable business practices.",
  },
  {
    title: "Day 2",
    href: "/schedule/day-2",
    description: "Afternoon workshops and panel discussions on work-life integration.",
  },
  {
    title: "Day 3",
    href: "/schedule/day-3",
    description: "Closing sessions and networking opportunities with industry leaders.",
  },
]

export function TopNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav
        className={cn(
          "mx-auto max-w-7xl px-6 py-4 transition-all duration-300 lg:px-12",
          scrolled && "bg-[#0A031B]/80 backdrop-blur-xl"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <div className="text-xl font-bold text-white">
              Balance Conference
              <span className="ml-2 text-sm font-normal text-purple-400">2026</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10">
                    Schedule
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                      {scheduleItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/speakers" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-white/10")}>
                      Speakers
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/venue" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-white/10")}>
                      Venue
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
            >
              <Link href="/tickets">Get Tickets</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden z-50 p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0A031B]/95 backdrop-blur-xl border-t border-white/10 mt-4">
            <div className="px-6 py-6 space-y-4">
              <Link
                href="/schedule"
                className="block text-white hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Schedule
              </Link>
              <Link
                href="/speakers"
                className="block text-white hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Speakers
              </Link>
              <Link
                href="/venue"
                className="block text-white hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Venue
              </Link>
              <Button
                asChild
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full"
              >
                <Link href="/tickets" onClick={() => setMobileMenuOpen(false)}>
                  Get Tickets
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
