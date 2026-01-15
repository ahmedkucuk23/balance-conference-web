"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Loader2, Upload, ImageIcon, Eye, EyeOff } from "lucide-react"

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

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (editingPost) {
      setImageUrl(editingPost.image || "")
    } else {
      setImageUrl("")
    }
  }, [editingPost])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog-posts")
      const data = await response.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching posts:", error)
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      await fetch(`/api/blog-posts/${id}`, { method: "DELETE" })
      setPosts(posts.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData })
      if (!response.ok) throw new Error("Upload failed")
      const data = await response.json()
      setImageUrl(data.url)
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      excerpt: formData.get("excerpt") || null,
      content: formData.get("content"),
      image: imageUrl || null,
      category: formData.get("category") || null,
      tags: formData.get("tags") || null,
      isPublished: formData.get("isPublished") === "on",
      isFeatured: formData.get("isFeatured") === "on",
    }

    try {
      if (editingPost) {
        await fetch(`/api/blog-posts/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      } else {
        await fetch("/api/blog-posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      }
      closeModal()
      fetchPosts()
    } catch (error) {
      console.error("Error saving post:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const openModal = (post: BlogPost | null = null) => {
    setEditingPost(post)
    setImageUrl(post?.image || "")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingPost(null)
    setImageUrl("")
  }

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-purple-400 animate-spin" /></div>
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-white/60">Manage your blog content</p>
        </div>
        <Button onClick={() => openModal()} className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
          <Plus className="w-4 h-4 mr-2" /> Add Post
        </Button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium text-sm">Image</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Title</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Category</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Status</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Date</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-white/10">
                      {post.image ? <img src={post.image} alt={post.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-5 h-5 text-white/30" /></div>}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-medium">{post.title}</p>
                    <p className="text-white/40 text-sm truncate max-w-xs">{post.excerpt}</p>
                  </td>
                  <td className="p-4 text-white/70">{post.category || "-"}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${post.isPublished ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {post.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {post.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-white/70 text-sm">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal(post)} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-[#0A031B] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">{editingPost ? "Edit Post" : "Add New Post"}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Slug</label>
                  <input name="slug" defaultValue={editingPost?.slug || ""} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Category</label>
                  <input name="category" defaultValue={editingPost?.category || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1">Title</label>
                <input name="title" defaultValue={editingPost?.title || ""} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1">Excerpt</label>
                <textarea name="excerpt" defaultValue={editingPost?.excerpt || ""} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1">Content</label>
                <textarea name="content" defaultValue={editingPost?.content || ""} required rows={8} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1">Tags (comma separated)</label>
                <input name="tags" defaultValue={editingPost?.tags || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Featured Image</label>
                <div className="flex gap-4">
                  <div className="w-32 h-20 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                    {imageUrl ? <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-white/30" /></div>}
                  </div>
                  <div className="flex-1 space-y-3">
                    <input type="text" placeholder="Enter image URL..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                    <div className="flex items-center gap-2">
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="bg-purple-600 text-white hover:bg-purple-700">
                        {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        {isUploading ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="isPublished" type="checkbox" defaultChecked={editingPost?.isPublished || false} className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="isFeatured" type="checkbox" defaultChecked={editingPost?.isFeatured || false} className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">Featured</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" onClick={closeModal} className="bg-pink-600 text-white hover:bg-pink-700">Cancel</Button>
                <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-purple-600 to-pink-500">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingPost ? "Save Changes" : "Add Post"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
