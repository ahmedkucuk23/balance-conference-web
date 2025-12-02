'use client'

import { redirect } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Users, Calendar, LogOut, Mail, FileText } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authorization (authentication + whitelist)
    fetch('/api/auth/check-authorization')
      .then(res => res.json())
      .then(data => {
        if (data?.authorized) {
          setIsAuthenticated(true)
        } else {
          redirect('/login')
        }
      })
      .catch(() => redirect('/login'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A031B]">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    {
      title: "Speakers",
      href: "/dashboard/speakers",
      icon: Users,
    },
    {
      title: "Conferences",
      href: "/dashboard/conferences",
      icon: Calendar,
    },
    {
      title: "Blog Posts",
      href: "/dashboard/blog-posts",
      icon: FileText,
    },
    {
      title: "Form Submissions",
      href: "/dashboard/contacts",
      icon: Mail,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A031B] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A031B]/80 backdrop-blur-sm border-r border-balance-200/20 flex flex-col">
        <div className="p-6 border-b border-balance-200/20">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-balance-300/20 text-white border border-balance-300/30"
                    : "text-balance-200 hover:bg-balance-200/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-balance-200/20">
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            variant="ghost"
            className="w-full justify-start text-balance-200 hover:text-white hover:bg-balance-200/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

