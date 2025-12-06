'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit, FileText } from "lucide-react"

type BlogPost = {
  id: string
  slug: string
  title: string
  description: string
  content: string
  image: string
  author: string
  readTime: string
  published: boolean
  createdAt: Date
}

export default function BlogPostsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    author: '',
    readTime: '',
    published: true,
  })

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const res = await fetch('/api/blog-posts?published=false')
      if (res.ok) {
        const data = await res.json()
        setBlogPosts(data.blogPosts || [])
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = editingPost
      ? `/api/blog-posts/${editingPost.id}`
      : '/api/blog-posts'

    const method = editingPost ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        await fetchBlogPosts()
        setIsFormOpen(false)
        setEditingPost(null)
        setFormData({
          title: '',
          slug: '',
          description: '',
          content: '',
          image: '',
          author: '',
          readTime: '',
          published: true,
        })
      }
    } catch (error) {
      console.error('Error saving blog post:', error)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData(post)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const res = await fetch(`/api/blog-posts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchBlogPosts()
      }
    } catch (error) {
      console.error('Error deleting blog post:', error)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  if (isLoading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
        <Button
          onClick={() => {
            setIsFormOpen(!isFormOpen)
            setEditingPost(null)
            setFormData({
              title: '',
              slug: '',
              description: '',
              content: '',
              image: '',
              author: '',
              readTime: '',
              published: true,
            })
          }}
          className="bg-balance-300 hover:bg-balance-400 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      {isFormOpen && (
        <div className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-white">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setFormData({
                      ...formData,
                      title,
                      slug: formData.slug || generateSlug(title),
                    })
                  }}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug" className="text-white">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="author" className="text-white">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="readTime" className="text-white">Read Time *</Label>
                <Input
                  id="readTime"
                  placeholder="e.g. 5 min read"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="image" className="text-white">Image URL *</Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-white">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white min-h-[80px]"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="content" className="text-white">Content (HTML) *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white min-h-[300px] font-mono text-sm"
                  placeholder="Enter HTML content here..."
                  required
                />
                <p className="text-balance-200 text-sm mt-1">
                  You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, etc.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="published" className="text-white cursor-pointer">
                  Published
                </Label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-balance-300 hover:bg-balance-400 text-white">
                {editingPost ? 'Update' : 'Create'} Blog Post
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsFormOpen(false)
                  setEditingPost(null)
                }}
                className="border-balance-200/20 text-balance-200 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Posts List */}
      <div className="grid gap-4">
        {blogPosts.length === 0 ? (
          <div className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl p-8 text-center">
            <FileText className="w-12 h-12 text-balance-300 mx-auto mb-4" />
            <p className="text-balance-200">No blog posts yet. Create your first one!</p>
          </div>
        ) : (
          blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl p-6 flex items-start justify-between hover:border-balance-300/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                  {!post.published && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-balance-200 text-sm mb-2">{post.description}</p>
                <div className="flex items-center gap-4 text-xs text-balance-300">
                  <span>by {post.author}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>/{post.slug}</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(post)}
                  className="text-balance-200 hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(post.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
