"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  LayoutDashboard, Calendar, Users, Ticket, FileText, MessageSquare,
  LogOut, ExternalLink, ChevronDown, Loader2
} from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Calendar, label: "Conferences", href: "/dashboard/conferences" },
  { icon: Users, label: "Speakers", href: "/dashboard/speakers" },
  { icon: Ticket, label: "Tickets", href: "/dashboard/tickets" },
  { icon: FileText, label: "Blog Posts", href: "/dashboard/blog" },
  { icon: MessageSquare, label: "Contacts", href: "/dashboard/contacts" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (status === "loading") {
    return (
      <main className="bg-[#0A031B] min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </main>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-[#0A031B] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D0620] border-r border-white/10 flex flex-col fixed h-full">
        {/* Logo */}
        <Link href="/dashboard" className="p-6 border-b border-white/10">
          <Image
            src="/assets/img/logo-balance.png"
            alt="Balance Conference"
            width={160}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-purple-500/20 text-purple-400"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-white/10" ref={profileMenuRef}>
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/5 transition-colors"
            >
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-sm text-purple-400">
                    {session.user?.name?.[0] || "U"}
                  </span>
                </div>
              )}
              <div className="flex-1 text-left">
                <p className="text-sm font-medium truncate">{session.user?.name}</p>
                <p className="text-xs text-white/40 truncate">{session.user?.email}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {profileMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0D0620] border border-white/10 rounded-lg shadow-xl overflow-hidden">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Visit Landing Page</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
