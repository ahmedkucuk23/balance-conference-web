"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { TopNavigation } from "@/components/blocks/top-navigation"
import { ContactFooter } from "@/components/blocks/contact-footer"
import DarkVeil from "@/components/ui/dark-veil"
import { Loader2, Calendar, User, ArrowRight, Tag } from "lucide-react"

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

export default function BlogPage() {
  const t = useTranslations("blog");
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog-posts?published=true")
      const data = await response.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching posts:", error)
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  const categories = Array.from(new Set(posts.map(post => post.category).filter(Boolean))) as string[]
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts

  const featuredPost = posts.find(post => post.isFeatured)
  const regularPosts = filteredPosts.filter(post => !selectedCategory && post.isFeatured ? false : true)

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
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        </section>

        {/* Category Filter */}
        {categories.length > 0 && (
          <section className="relative py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    selectedCategory === null
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {t("allCategories")}
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full transition-all ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Post */}
        {!selectedCategory && featuredPost && (
          <section className="relative py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <div className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto">
                      {featuredPost.image ? (
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                          <Tag className="w-16 h-16 text-white/30" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold">
                        {t("featured")}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      {featuredPost.category && (
                        <span className="inline-block w-fit px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold mb-4">
                          {featuredPost.category}
                        </span>
                      )}

                      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                        {featuredPost.title}
                      </h2>

                      {featuredPost.excerpt && (
                        <p className="text-white/60 text-lg mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-6 text-white/40 text-sm">
                        {featuredPost.author?.name && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{featuredPost.author.name}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString('bs-BA')}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-2 text-purple-400 font-medium group-hover:gap-4 transition-all">
                        {t("readMore")} <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="relative py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              </div>
            ) : regularPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/60 text-lg">
                  {selectedCategory ? t("noPostsCategory") : t("noPosts")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                            <Tag className="w-12 h-12 text-white/30" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {post.category && (
                          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold mb-3">
                            {post.category}
                          </span>
                        )}

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="text-white/60 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-white/40 text-xs">
                          {post.author?.name && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{post.author.name}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('bs-BA')}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  )
}
