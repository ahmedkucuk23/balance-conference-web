'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TopNavigation } from '@/components/blocks/top-navigation'
import { ContactFooter } from '@/components/blocks/contact-footer'
import { ArrowLeft, Loader2, Calendar, User, Tag, Share2 } from 'lucide-react'
import DarkVeil from '@/components/ui/dark-veil'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt?: string | null
  content: string
  image?: string | null
  category?: string | null
  tags?: string | null
  isPublished: boolean
  isFeatured: boolean
  publishedAt?: string | null
  createdAt: string
  author?: { id: string; name: string | null; image: string | null } | null
}

interface BlogPageProps {
  params: Promise<{
    slug: string
  }> | {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPost() {
      try {
        let resolvedSlug: string

        if (params && typeof params === 'object' && 'then' in params) {
          const resolvedParams = await params
          resolvedSlug = resolvedParams.slug
        } else if (params && typeof params === 'object' && 'slug' in params) {
          resolvedSlug = params.slug
        } else {
          return
        }

        const response = await fetch(`/api/blog-posts/slug/${resolvedSlug}`)

        if (!response.ok) {
          if (response.status === 404) {
            router.push('/blog')
            return
          }
          throw new Error('Failed to fetch blog post')
        }

        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError('Greška pri učitavanju objave')
        console.error('Error fetching blog post:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [params, router])

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.title,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  if (isLoading) {
    return (
      <main className="bg-[#0A031B] min-h-screen relative">
        <div className="fixed inset-0 w-full h-full z-0">
          <DarkVeil speed={0.3} />
        </div>
        <div className="relative z-10">
          <TopNavigation glassmorphismOnly />
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        </div>
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="bg-[#0A031B] min-h-screen relative">
        <div className="fixed inset-0 w-full h-full z-0">
          <DarkVeil speed={0.3} />
        </div>
        <div className="relative z-10">
          <TopNavigation glassmorphismOnly />
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <p className="text-red-400">{error || 'Objava nije pronađena'}</p>
            <Link
              href="/blog"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Nazad na blog
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const tags = post.tags ? post.tags.split(',').map(tag => tag.trim()) : []

  return (
    <main className="bg-[#0A031B] min-h-screen relative">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <TopNavigation glassmorphismOnly />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Back button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Nazad na blog
            </Link>

            {/* Category Badge */}
            {post.category && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-bold mb-6">
                {post.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-white/70 text-lg sm:text-xl mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8">
              {post.author?.name && (
                <div className="flex items-center gap-2">
                  {post.author.image ? (
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full border-2 border-purple-500/30"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-500/30 flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-400" />
                    </div>
                  )}
                  <span className="font-medium">{post.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('bs-BA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-white/60 hover:text-purple-400 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Podijeli</span>
                </button>
              )}
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/10 mb-12">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Blog Content */}
            <article className="prose prose-invert prose-lg max-w-none">
              <div
                className="text-white/80 leading-relaxed whitespace-pre-line"
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75'
                }}
              >
                {post.content}
              </div>
            </article>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Želite saznati više?
            </h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Pridružite se našoj zajednici i budite dio nezaboravnog iskustva na Get Motivated konferenciji.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Nazad na blog
              </Link>
              <Link
                href="/tickets"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:opacity-90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
              >
                Kupi kartu
              </Link>
            </div>
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  )
}
