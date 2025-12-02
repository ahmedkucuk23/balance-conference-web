'use client'

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Users, Calendar, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data?.user) {
          setIsAuthenticated(true)
        } else {
          redirect('/login')
        }
      })
      .catch(() => redirect('/login'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <div className="text-white">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Welcome to Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/speakers">
          <div className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl p-6 hover:border-balance-300/40 transition-colors cursor-pointer">
            <Users className="w-8 h-8 text-balance-300 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Speakers</h2>
            <p className="text-balance-200">Manage conference speakers</p>
          </div>
        </Link>

        <Link href="/dashboard/conferences">
          <div className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl p-6 hover:border-balance-300/40 transition-colors cursor-pointer">
            <Calendar className="w-8 h-8 text-balance-300 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Conferences</h2>
            <p className="text-balance-200">Manage conferences and events</p>
          </div>
        </Link>

        <Link href="/dashboard/blog-posts">
          <div className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl p-6 hover:border-balance-300/40 transition-colors cursor-pointer">
            <FileText className="w-8 h-8 text-balance-300 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Blog Posts</h2>
            <p className="text-balance-200">Create and manage blog articles</p>
          </div>
        </Link>

        <Link href="/dashboard/contacts">
          <div className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl p-6 hover:border-balance-300/40 transition-colors cursor-pointer">
            <Mail className="w-8 h-8 text-balance-300 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Contact Submissions</h2>
            <p className="text-balance-200">View messages from visitors</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

