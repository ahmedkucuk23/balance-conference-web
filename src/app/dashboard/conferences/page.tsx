'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Edit } from "lucide-react"

type Conference = {
  id: string
  slug: string
  title: string
  location?: string
  date?: string
  description?: string
  eyebrow?: string
  howTitle?: string
  howDescription?: string
  nextChapterText?: string
  participants: number
  speakersCount: number
  mediaOutlets: number
  influencers: number
  featured: boolean
  published: boolean
}

export default function ConferencesPage() {
  const [conferences, setConferences] = useState<Conference[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingConference, setEditingConference] = useState<Conference | null>(null)
  const [formData, setFormData] = useState<Partial<Conference>>({
    title: '',
    slug: '',
    location: '',
    date: '',
    description: '',
    eyebrow: '',
    howTitle: '',
    howDescription: '',
    nextChapterText: '',
    participants: 0,
    speakersCount: 0,
    mediaOutlets: 0,
    influencers: 0,
    featured: false,
    published: true,
  })

  useEffect(() => {
    fetchConferences()
  }, [])

  const fetchConferences = async () => {
    try {
      const res = await fetch('/api/conferences')
      if (res.ok) {
        const data = await res.json()
        setConferences(data.conferences || [])
      }
    } catch (error) {
      console.error('Error fetching conferences:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = editingConference 
      ? `/api/conferences/${editingConference.id}`
      : '/api/conferences'
    
    const method = editingConference ? 'PUT' : 'POST'

    const submitData = {
      ...formData,
      date: formData.date ? new Date(formData.date).toISOString() : null,
      participants: Number(formData.participants) || 0,
      speakersCount: Number(formData.speakersCount) || 0,
      mediaOutlets: Number(formData.mediaOutlets) || 0,
      influencers: Number(formData.influencers) || 0,
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (res.ok) {
        await fetchConferences()
        setIsFormOpen(false)
        setEditingConference(null)
        setFormData({
          title: '',
          slug: '',
          location: '',
          date: '',
          description: '',
          eyebrow: '',
          howTitle: '',
          howDescription: '',
          nextChapterText: '',
          participants: 0,
          speakersCount: 0,
          mediaOutlets: 0,
          influencers: 0,
          featured: false,
          published: true,
        })
      }
    } catch (error) {
      console.error('Error saving conference:', error)
    }
  }

  const handleEdit = (conference: Conference) => {
    setEditingConference(conference)
    setFormData({
      ...conference,
      date: conference.date ? new Date(conference.date).toISOString().split('T')[0] : '',
    })
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this conference?')) return

    try {
      const res = await fetch(`/api/conferences/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchConferences()
      }
    } catch (error) {
      console.error('Error deleting conference:', error)
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Conferences</h1>
        <Button
          onClick={() => {
            setIsFormOpen(!isFormOpen)
            setEditingConference(null)
            setFormData({
              title: '',
              slug: '',
              location: '',
              date: '',
              description: '',
              eyebrow: '',
              howTitle: '',
              howDescription: '',
              nextChapterText: '',
              participants: 0,
              speakersCount: 0,
              mediaOutlets: 0,
              influencers: 0,
              featured: false,
              published: true,
            })
          }}
          className="bg-balance-300 hover:bg-balance-400 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Conference
        </Button>
      </div>

      {isFormOpen && (
        <div className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            {editingConference ? 'Edit Conference' : 'Add New Conference'}
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
                <Label htmlFor="location" className="text-white">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-white">Date</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full h-24 rounded-md border border-balance-200/20 bg-[#0A031B] px-3 py-2 text-white"
                />
              </div>
              <div>
                <Label htmlFor="eyebrow" className="text-white">Eyebrow</Label>
                <Input
                  id="eyebrow"
                  value={formData.eyebrow}
                  onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="howTitle" className="text-white">How Title</Label>
                <Input
                  id="howTitle"
                  value={formData.howTitle}
                  onChange={(e) => setFormData({ ...formData, howTitle: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="howDescription" className="text-white">How Description</Label>
                <textarea
                  id="howDescription"
                  value={formData.howDescription}
                  onChange={(e) => setFormData({ ...formData, howDescription: e.target.value })}
                  className="w-full h-24 rounded-md border border-balance-200/20 bg-[#0A031B] px-3 py-2 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="nextChapterText" className="text-white">Next Chapter Text</Label>
                <Input
                  id="nextChapterText"
                  value={formData.nextChapterText}
                  onChange={(e) => setFormData({ ...formData, nextChapterText: e.target.value })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="participants" className="text-white">Participants</Label>
                <Input
                  id="participants"
                  type="number"
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: Number(e.target.value) })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="speakersCount" className="text-white">Speakers Count</Label>
                <Input
                  id="speakersCount"
                  type="number"
                  value={formData.speakersCount}
                  onChange={(e) => setFormData({ ...formData, speakersCount: Number(e.target.value) })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="mediaOutlets" className="text-white">Media Outlets</Label>
                <Input
                  id="mediaOutlets"
                  type="number"
                  value={formData.mediaOutlets}
                  onChange={(e) => setFormData({ ...formData, mediaOutlets: Number(e.target.value) })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="influencers" className="text-white">Influencers</Label>
                <Input
                  id="influencers"
                  type="number"
                  value={formData.influencers}
                  onChange={(e) => setFormData({ ...formData, influencers: Number(e.target.value) })}
                  className="bg-[#0A031B] border-balance-200/20 text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="featured" className="text-white">Featured</Label>
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
                {editingConference ? 'Update' : 'Create'} Conference
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsFormOpen(false)
                  setEditingConference(null)
                }}
                className="border-balance-200/20 text-white hover:bg-balance-200/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {conferences.length === 0 ? (
          <div className="text-balance-200 text-center py-12">
            No conferences found. Add your first conference!
          </div>
        ) : (
          conferences.map((conference) => (
            <div
              key={conference.id}
              className="bg-[#0A031B]/80 backdrop-blur-sm border border-balance-200/20 rounded-xl p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{conference.title}</h3>
                  {conference.location && (
                    <p className="text-balance-200 mb-2">{conference.location}</p>
                  )}
                  {conference.date && (
                    <p className="text-balance-200 mb-2">
                      {new Date(conference.date).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex gap-4 mt-4">
                    <span className="text-balance-300">
                      {conference.participants} Participants
                    </span>
                    <span className="text-balance-300">
                      {conference.speakersCount} Speakers
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {conference.featured && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm">
                        Featured
                      </span>
                    )}
                    {conference.published ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">
                        Draft
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(conference)}
                    className="text-balance-200 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(conference.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

