'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Edit, Users } from "lucide-react"

type Speaker = {
  id: string
  slug: string
  name: string
  email?: string
  location?: string
  image?: string
  shortDescription?: string
  bio?: string
  quote?: string
  motto?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  website?: string
  published: boolean
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null)
  const [formData, setFormData] = useState<Partial<Speaker>>({
    name: '',
    slug: '',
    email: '',
    location: '',
    image: '',
    shortDescription: '',
    bio: '',
    quote: '',
    motto: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    website: '',
    published: true,
  })

  useEffect(() => {
    fetchSpeakers()
  }, [])

  const fetchSpeakers = async () => {
    try {
      const res = await fetch('/api/speakers')
      if (res.ok) {
        const data = await res.json()
        setSpeakers(data)
      }
    } catch (error) {
      console.error('Error fetching speakers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = editingSpeaker 
      ? `/api/speakers/${editingSpeaker.id}`
      : '/api/speakers'
    
    const method = editingSpeaker ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        await fetchSpeakers()
        setIsFormOpen(false)
        setEditingSpeaker(null)
        setFormData({
          name: '',
          slug: '',
          email: '',
          location: '',
          image: '',
          shortDescription: '',
          bio: '',
          quote: '',
          motto: '',
          twitter: '',
          linkedin: '',
          instagram: '',
          website: '',
          published: true,
        })
      }
    } catch (error) {
      console.error('Error saving speaker:', error)
    }
  }

  const handleEdit = (speaker: Speaker) => {
    setEditingSpeaker(speaker)
    setFormData(speaker)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this speaker?')) return

    try {
      const res = await fetch(`/api/speakers/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchSpeakers()
      }
    } catch (error) {
      console.error('Error deleting speaker:', error)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleImageUpload = async (file: File) => {
    const data = new FormData()
    data.append('file', file)
    data.append('filename', (formData.slug || formData.name || 'speaker') as string)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })
      if (!res.ok) throw new Error('Upload failed')
      const json = await res.json()
      setFormData(prev => ({ ...prev, image: json.url as string }))
    } catch (e) {
      console.error('Upload error:', e)
      alert('Failed to upload image. Please try again.')
    }
  }

  if (isLoading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Speakers</h1>
        <Button
          onClick={() => {
            setIsFormOpen(!isFormOpen)
            setEditingSpeaker(null)
            setFormData({
              name: '',
              slug: '',
              email: '',
              location: '',
              image: '',
              shortDescription: '',
              bio: '',
              quote: '',
              motto: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              website: '',
              published: true,
            })
          }}
          className="bg-balance-300 hover:bg-balance-400 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Speaker
        </Button>
      </div>

      {isFormOpen && (
        <div className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            {editingSpeaker ? 'Edit Speaker' : 'Add New Speaker'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value
                    setFormData({
                      ...formData,
                      name,
                      slug: formData.slug || generateSlug(name),
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
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-white">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="image" className="text-white">Image</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    id="image"
                    placeholder="Or paste an image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="bg-[#0A031B] border-balance-200/20 text-white"
                  />
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file)
                    }}
                    className="text-balance-2 00"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-40 w-32 object-cover rounded-md border border-balance-200/20"
                      />
                      <p className="text-xs text-balance-200 mt-1 break-all">{formData.image}</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="shortDescription" className="text-white">Short Description</Label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="bio" className="text-white">Bio (JSON array or plain text)</Label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full h-32 rounded-md border border-balance-200/20 bg-[#0A031B] px-3 py-2 text-white font-mono text-sm"
                  placeholder='["First paragraph about the speaker.", "Second paragraph with more details."]'
                />
                <p className="text-xs text-balance-200 mt-1">Format as JSON array for multiple paragraphs, or enter plain text for a single paragraph.</p>
              </div>
              <div>
                <Label htmlFor="quote" className="text-white">Quote</Label>
                <Input
                  id="quote"
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="motto" className="text-white">Motto (JSON object)</Label>
                <textarea
                  id="motto"
                  value={formData.motto}
                  onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                  className="w-full h-24 rounded-md border border-balance-200/20 bg-[#0A031B] px-3 py-2 text-white"
                  placeholder='{"label": "...", "highlight": "...", "description": "..."}'
                />
              </div>
              <div>
                <Label htmlFor="twitter" className="text-white">Twitter URL</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="linkedin" className="text-white">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="instagram" className="text-white">Instagram URL</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="website" className="text-white">Website URL</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="published" className="text-white">Published</Label>
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="bg-balance-300 hover:bg-balance-400 text-white">
                {editingSpeaker ? 'Update' : 'Create'} Speaker
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsFormOpen(false)
                  setEditingSpeaker(null)
                }}
                className="border-balance-200/20 bg-white text-gray-900 hover:bg-gray-400"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {speakers.length === 0 ? (
          <div className="text-balance-200 text-center py-12 col-span-full">
            No speakers found. Add your first speaker!
          </div>
        ) : (
          speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl overflow-hidden hover:border-balance-300/40 transition-colors"
            >
              {/* Image Preview */}
              {speaker.image ? (
                <div className="relative w-full aspect-[3/4] bg-balance-900">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-[3/4] bg-balance-900 flex items-center justify-center">
                  <Users className="w-16 h-16 text-balance-400" />
                </div>
              )}
              
              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{speaker.name}</h3>
                    {speaker.location && (
                      <p className="text-sm text-balance-200 mb-2">{speaker.location}</p>
                    )}
                  </div>
                </div>
                
                {speaker.shortDescription && (
                  <p className="text-sm text-balance-100 mb-3 line-clamp-2">{speaker.shortDescription}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {speaker.published ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(speaker)}
                      className="h-8 w-8 text-balance-200 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(speaker.id)}
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

