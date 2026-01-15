"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Loader2, GripVertical, Upload, ImageIcon, Facebook, Instagram, Linkedin, Globe } from "lucide-react"

interface Speaker {
  id: string
  slug: string
  name: string
  topic: string
  topic_en?: string | null
  bio: string
  bio_en?: string | null
  details?: string | null
  details_en?: string | null
  image: string
  link?: string | null
  location?: string | null
  location_en?: string | null
  jobDescription?: string | null
  jobDescription_en?: string | null
  facebook?: string | null
  instagram?: string | null
  linkedin?: string | null
  webpage?: string | null
  review?: string | null
  review_en?: string | null
  isTbd: boolean
  year: number
  order: number
  isActive: boolean
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchSpeakers()
  }, [])

  useEffect(() => {
    if (editingSpeaker) {
      setImageUrl(editingSpeaker.image || "")
    } else {
      setImageUrl("")
    }
  }, [editingSpeaker])

  const fetchSpeakers = async () => {
    try {
      const response = await fetch("/api/speakers?all=true")
      const data = await response.json()
      // Handle error responses - ensure we always set an array
      if (Array.isArray(data)) {
        setSpeakers(data)
      } else {
        console.error("API returned non-array:", data)
        setSpeakers([])
      }
    } catch (error) {
      console.error("Error fetching speakers:", error)
      setSpeakers([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Da li ste sigurni da želite obrisati ovog predavača?")) return

    try {
      await fetch(`/api/speakers/${id}`, { method: "DELETE" })
      setSpeakers(speakers.filter((s) => s.id !== id))
    } catch (error) {
      console.error("Error deleting speaker:", error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error || "Upload failed")
        return
      }

      const data = await response.json()
      setImageUrl(data.url)
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Greska pri uploadu slike")
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
      name: formData.get("name"),
      topic: formData.get("topic"),
      topic_en: formData.get("topic_en") || null,
      bio: formData.get("bio"),
      bio_en: formData.get("bio_en") || null,
      details: formData.get("details") || null,
      details_en: formData.get("details_en") || null,
      image: imageUrl,
      link: formData.get("link") || null,
      location: formData.get("location") || null,
      location_en: formData.get("location_en") || null,
      jobDescription: formData.get("jobDescription") || null,
      jobDescription_en: formData.get("jobDescription_en") || null,
      facebook: formData.get("facebook") || null,
      instagram: formData.get("instagram") || null,
      linkedin: formData.get("linkedin") || null,
      webpage: formData.get("webpage") || null,
      review: formData.get("review") || null,
      review_en: formData.get("review_en") || null,
      isTbd: formData.get("isTbd") === "on",
      year: parseInt(formData.get("year") as string) || 2026,
      order: parseInt(formData.get("order") as string) || 0,
      isActive: formData.get("isActive") === "on",
    }

    try {
      if (editingSpeaker) {
        await fetch(`/api/speakers/${editingSpeaker.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      } else {
        await fetch("/api/speakers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      }
      setIsModalOpen(false)
      setEditingSpeaker(null)
      setImageUrl("")
      fetchSpeakers()
    } catch (error) {
      console.error("Error saving speaker:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const openModal = (speaker: Speaker | null = null) => {
    setEditingSpeaker(speaker)
    setImageUrl(speaker?.image || "")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingSpeaker(null)
    setImageUrl("")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Speakers</h1>
          <p className="text-white/60">Manage conference speakers</p>
        </div>
        <Button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Speaker
        </Button>
      </div>

      {/* Speakers Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium text-sm">Order</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Image</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Name</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Topic</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Year</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Status</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {speakers.map((speaker) => (
                <tr key={speaker.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white/40">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4" />
                      {speaker.order}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10">
                      {speaker.image ? (
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-white/30" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-medium">{speaker.name}</p>
                    <p className="text-white/40 text-sm">{speaker.location}</p>
                  </td>
                  <td className="p-4 text-white/70 text-sm max-w-xs truncate">
                    {speaker.topic}
                  </td>
                  <td className="p-4 text-white/70">{speaker.year}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        speaker.isTbd
                          ? "bg-yellow-500/20 text-yellow-400"
                          : speaker.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {speaker.isTbd ? "TBD" : speaker.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal(speaker)}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(speaker.id)}
                        className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-[#0A031B] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingSpeaker ? "Edit Speaker" : "Add New Speaker"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Slug</label>
                  <input
                    name="slug"
                    defaultValue={editingSpeaker?.slug || ""}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Name</label>
                  <input
                    name="name"
                    defaultValue={editingSpeaker?.name || ""}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Topic (BS)</label>
                  <input
                    name="topic"
                    defaultValue={editingSpeaker?.topic || ""}
                    required
                    placeholder="Bosnian topic"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Topic (EN)</label>
                  <input
                    name="topic_en"
                    defaultValue={editingSpeaker?.topic_en || ""}
                    placeholder="English topic"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Bio (BS)</label>
                  <textarea
                    name="bio"
                    defaultValue={editingSpeaker?.bio || ""}
                    required
                    rows={3}
                    placeholder="Bosnian bio"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Bio (EN)</label>
                  <textarea
                    name="bio_en"
                    defaultValue={editingSpeaker?.bio_en || ""}
                    rows={3}
                    placeholder="English bio"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Details (BS, optional)</label>
                  <textarea
                    name="details"
                    defaultValue={editingSpeaker?.details || ""}
                    rows={3}
                    placeholder="Bosnian details"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Details (EN, optional)</label>
                  <textarea
                    name="details_en"
                    defaultValue={editingSpeaker?.details_en || ""}
                    rows={3}
                    placeholder="English details"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-white/60 text-sm mb-2">Image</label>
                <div className="flex gap-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                    {imageUrl ? (
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-white/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      placeholder="Enter image URL..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 text-sm">or</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="bg-purple-600 text-white hover:bg-purple-700"
                      >
                        {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        {isUploading ? "Uploading..." : "Upload Image"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Location (BS)</label>
                  <input
                    name="location"
                    defaultValue={editingSpeaker?.location || ""}
                    placeholder="e.g. Sarajevo, BiH"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Location (EN)</label>
                  <input
                    name="location_en"
                    defaultValue={editingSpeaker?.location_en || ""}
                    placeholder="e.g. Sarajevo, BiH"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Job Description (BS)</label>
                  <input
                    name="jobDescription"
                    defaultValue={editingSpeaker?.jobDescription || ""}
                    placeholder="e.g. CEO u kompaniji"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Job Description (EN)</label>
                  <input
                    name="jobDescription_en"
                    defaultValue={editingSpeaker?.jobDescription_en || ""}
                    placeholder="e.g. CEO at Company"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Social Media Links Section */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                  Social Media Links
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm mb-1 flex items-center gap-2">
                      <Facebook className="w-4 h-4 text-blue-400" />
                      Facebook
                    </label>
                    <input
                      name="facebook"
                      defaultValue={editingSpeaker?.facebook || ""}
                      placeholder="https://facebook.com/..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1 flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-400" />
                      Instagram
                    </label>
                    <input
                      name="instagram"
                      defaultValue={editingSpeaker?.instagram || ""}
                      placeholder="https://instagram.com/..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1 flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-sky-400" />
                      LinkedIn
                    </label>
                    <input
                      name="linkedin"
                      defaultValue={editingSpeaker?.linkedin || ""}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-400" />
                      Website
                    </label>
                    <input
                      name="webpage"
                      defaultValue={editingSpeaker?.webpage || ""}
                      placeholder="https://..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Review Section */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                  Review (optional) - Will appear on reviews page if filled
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Review (BS)</label>
                    <textarea
                      name="review"
                      defaultValue={editingSpeaker?.review || ""}
                      rows={4}
                      placeholder="Unesite recenziju predavača o iskustvu na konferenciji..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Review (EN)</label>
                    <textarea
                      name="review_en"
                      defaultValue={editingSpeaker?.review_en || ""}
                      rows={4}
                      placeholder="Enter speaker's review about the conference experience..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Year</label>
                  <input
                    name="year"
                    type="number"
                    defaultValue={editingSpeaker?.year || 2026}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Order</label>
                  <input
                    name="order"
                    type="number"
                    defaultValue={editingSpeaker?.order || 0}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="isTbd" type="checkbox" defaultChecked={editingSpeaker?.isTbd || false} className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">TBD (Coming Soon)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="isActive" type="checkbox" defaultChecked={editingSpeaker?.isActive ?? true} className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">Active</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" onClick={closeModal} className="bg-pink-600 text-white hover:bg-pink-700">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving || !imageUrl} className="bg-gradient-to-r from-purple-600 to-pink-500">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingSpeaker ? "Save Changes" : "Add Speaker"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
