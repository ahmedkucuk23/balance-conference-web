"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Users, Ticket, FileText, MessageSquare, Loader2, ArrowRight } from "lucide-react"

interface DashboardStats {
  conferences: number
  speakers: number
  tickets: number
  blogPosts: number
  contacts: number
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [conferences, speakers, tickets, blogPosts, contacts] = await Promise.all([
          fetch("/api/conferences").then(r => r.json()),
          fetch("/api/speakers").then(r => r.json()),
          fetch("/api/tickets").then(r => r.json()),
          fetch("/api/blog-posts").then(r => r.json()),
          fetch("/api/contacts").then(r => r.json()),
        ])

        setStats({
          conferences: Array.isArray(conferences) ? conferences.length : 0,
          speakers: Array.isArray(speakers) ? speakers.length : 0,
          tickets: Array.isArray(tickets) ? tickets.length : 0,
          blogPosts: Array.isArray(blogPosts) ? blogPosts.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    )
  }

  const statCards = [
    { label: "Conferences", value: stats?.conferences || 0, icon: Calendar, href: "/dashboard/conferences", color: "purple" },
    { label: "Speakers", value: stats?.speakers || 0, icon: Users, href: "/dashboard/speakers", color: "pink" },
    { label: "Tickets", value: stats?.tickets || 0, icon: Ticket, href: "/dashboard/tickets", color: "blue" },
    { label: "Blog Posts", value: stats?.blogPosts || 0, icon: FileText, href: "/dashboard/blog", color: "green" },
    { label: "Contacts", value: stats?.contacts || 0, icon: MessageSquare, href: "/dashboard/contacts", color: "yellow" },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-white/60">Welcome to Balance Conference CMS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
            </div>
            <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-white/60">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/speakers"
            className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>Manage Speakers</span>
          </Link>
          <Link
            href="/dashboard/conferences"
            className="flex items-center gap-3 p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300 hover:bg-pink-500/20 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span>Manage Conferences</span>
          </Link>
          <Link
            href="/dashboard/tickets"
            className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition-colors"
          >
            <Ticket className="w-5 h-5" />
            <span>Manage Tickets</span>
          </Link>
          <Link
            href="/dashboard/contacts"
            className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 hover:bg-yellow-500/20 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span>View Contacts</span>
          </Link>
        </div>
      </div>
    </>
  )
}
