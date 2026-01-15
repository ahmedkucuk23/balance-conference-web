"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Loader2, Upload, ImageIcon } from "lucide-react"

interface Conference {
  id: string
  slug: string
  name: string
  description?: string | null
  year: number
  date?: string | null
  endDate?: string | null
  venue?: string | null
  address?: string | null
  city?: string | null
  country?: string | null
  image?: string | null
  isActive: boolean
  isFeatured: boolean
  _count?: { speakers: number; tickets: number }
}

export default function ConferencesPage() {
  const [conferences, setConferences] = useState<Conference[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingConference, setEditingConference] = useState<Conference | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchConferences()
  }, [])

  useEffect(() => {
    if (editingConference) {
      setImageUrl(editingConference.image || "")
    } else {
      setImageUrl("")
    }
  }, [editingConference])

  const fetchConferences = async () => {
    try {
      const response = await fetch("/api/conferences")
      const data = await response.json()
      setConferences(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching conferences:", error)
      setConferences([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this conference?")) return

    try {
      await fetch(`/api/conferences/${id}`, { method: "DELETE" })
      setConferences(conferences.filter((c) => c.id !== id))
    } catch (error) {
      console.error("Error deleting conference:", error)
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
      alert("Error uploading image")
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
      description: formData.get("description") || null,
      year: parseInt(formData.get("year") as string),
      date: formData.get("date") || null,
      endDate: formData.get("endDate") || null,
      venue: formData.get("venue") || null,
      address: formData.get("address") || null,
      city: formData.get("city") || null,
      country: formData.get("country") || null,
      image: imageUrl || null,
      isActive: formData.get("isActive") === "on",
      isFeatured: formData.get("isFeatured") === "on",
    }

    try {
      if (editingConference) {
        await fetch(`/api/conferences/${editingConference.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      } else {
        await fetch("/api/conferences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      }
      closeModal()
      fetchConferences()
    } catch (error) {
      console.error("Error saving conference:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const openModal = (conference: Conference | null = null) => {
    setEditingConference(conference)
    setImageUrl(conference?.image || "")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingConference(null)
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Conferences</h1>
          <p className="text-white/60">Manage your conferences</p>
        </div>
        <Button onClick={() => openModal()} className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
          <Plus className="w-4 h-4 mr-2" /> Add Conference
        </Button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium text-sm">Image</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Name</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Year</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Location</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Speakers</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Status</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {conferences.map((conference) => (
                <tr key={conference.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-white/10">
                      {conference.image ? (
                        <img src={conference.image} alt={conference.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-white/30" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-medium">{conference.name}</p>
                    <p className="text-white/40 text-sm">{conference.slug}</p>
                  </td>
                  <td className="p-4 text-white/70">{conference.year}</td>
                  <td className="p-4 text-white/70 text-sm">
                    {conference.city && conference.country ? `${conference.city}, ${conference.country}` : "-"}
                  </td>
                  <td className="p-4 text-white/70">{conference._count?.speakers || 0}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${conference.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {conference.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal(conference)} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(conference.id)} className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
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

      {isModalOpen && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-[#0A031B] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">{editingConference ? "Edit Conference" : "Add New Conference"}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Slug</label>
                  <input name="slug" defaultValue={editingConference?.slug || ""} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Name</label>
                  <input name="name" defaultValue={editingConference?.name || ""} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1">Description</label>
                <textarea name="description" defaultValue={editingConference?.description || ""} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Year</label>
                  <input name="year" type="number" defaultValue={editingConference?.year || new Date().getFullYear()} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Start Date</label>
                  <input name="date" type="date" defaultValue={editingConference?.date?.split("T")[0] || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">End Date</label>
                  <input name="endDate" type="date" defaultValue={editingConference?.endDate?.split("T")[0] || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Venue</label>
                  <input name="venue" defaultValue={editingConference?.venue || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Address</label>
                  <input name="address" defaultValue={editingConference?.address || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">City</label>
                  <input name="city" defaultValue={editingConference?.city || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Country</label>
                  <input name="country" defaultValue={editingConference?.country || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Image</label>
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
                  <input name="isActive" type="checkbox" defaultChecked={editingConference?.isActive ?? true} className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="isFeatured" type="checkbox" defaultChecked={editingConference?.isFeatured || false} className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">Featured</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" onClick={closeModal} className="bg-pink-600 text-white hover:bg-pink-700">Cancel</Button>
                <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-purple-600 to-pink-500">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingConference ? "Save Changes" : "Add Conference"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
