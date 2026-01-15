"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Loader2, Tag, Star } from "lucide-react"

interface Ticket {
  id: string
  name: string
  description?: string | null
  price: number
  currency: string
  quantity?: number | null
  soldCount: number
  isAvailable: boolean
  isFeatured: boolean
  benefits?: string | null
  validFrom?: string | null
  validUntil?: string | null
  conferenceId?: string | null
  conference?: { id: string; name: string; year: number } | null
  _count?: { orders: number }
}

interface Conference {
  id: string
  name: string
  year: number
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [conferences, setConferences] = useState<Conference[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [ticketsRes, conferencesRes] = await Promise.all([
        fetch("/api/tickets"),
        fetch("/api/conferences"),
      ])
      const ticketsData = await ticketsRes.json()
      const conferencesData = await conferencesRes.json()
      setTickets(Array.isArray(ticketsData) ? ticketsData : [])
      setConferences(Array.isArray(conferencesData) ? conferencesData : [])
    } catch (error) {
      console.error("Error fetching data:", error)
      setTickets([])
      setConferences([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return

    try {
      await fetch(`/api/tickets/${id}`, { method: "DELETE" })
      setTickets(tickets.filter((t) => t.id !== id))
    } catch (error) {
      console.error("Error deleting ticket:", error)
    }
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      description: formData.get("description") || null,
      price: parseFloat(formData.get("price") as string),
      currency: formData.get("currency") || "BAM",
      quantity: formData.get("quantity") ? parseInt(formData.get("quantity") as string) : null,
      isAvailable: formData.get("isAvailable") === "on",
      isFeatured: formData.get("isFeatured") === "on",
      benefits: formData.get("benefits") || null,
      validFrom: formData.get("validFrom") || null,
      validUntil: formData.get("validUntil") || null,
      conferenceId: formData.get("conferenceId") || null,
    }

    try {
      if (editingTicket) {
        await fetch(`/api/tickets/${editingTicket.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      } else {
        await fetch("/api/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      }
      closeModal()
      fetchData()
    } catch (error) {
      console.error("Error saving ticket:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const openModal = (ticket: Ticket | null = null) => {
    setEditingTicket(ticket)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTicket(null)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-purple-400 animate-spin" /></div>
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tickets</h1>
          <p className="text-white/60">Manage ticket types and pricing</p>
        </div>
        <Button onClick={() => openModal()} className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
          <Plus className="w-4 h-4 mr-2" /> Add Ticket
        </Button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium text-sm">Ticket</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Price</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Conference</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Sold</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Status</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <Tag className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium flex items-center gap-2">
                          {ticket.name}
                          {ticket.isFeatured && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                        </p>
                        <p className="text-white/40 text-sm truncate max-w-xs">{ticket.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-semibold">{ticket.price} {ticket.currency}</p>
                  </td>
                  <td className="p-4 text-white/70 text-sm">
                    {ticket.conference ? `${ticket.conference.name} (${ticket.conference.year})` : "-"}
                  </td>
                  <td className="p-4 text-white/70">
                    {ticket.soldCount}{ticket.quantity ? ` / ${ticket.quantity}` : ""}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.isAvailable ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {ticket.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal(ticket)} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(ticket.id)} className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
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
            <h2 className="text-2xl font-bold text-white mb-6">{editingTicket ? "Edit Ticket" : "Add New Ticket"}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-1">Name</label>
                <input name="name" defaultValue={editingTicket?.name || ""} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1">Description</label>
                <textarea name="description" defaultValue={editingTicket?.description || ""} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Price</label>
                  <input name="price" type="number" step="0.01" defaultValue={editingTicket?.price || ""} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Currency</label>
                  <select name="currency" defaultValue={editingTicket?.currency || "BAM"} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500">
                    <option value="BAM">BAM</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Quantity (optional)</label>
                  <input name="quantity" type="number" defaultValue={editingTicket?.quantity || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1">Conference</label>
                <select name="conferenceId" defaultValue={editingTicket?.conferenceId || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500">
                  <option value="">No conference</option>
                  {conferences.map((conf) => (
                    <option key={conf.id} value={conf.id}>{conf.name} ({conf.year})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1">Benefits (one per line)</label>
                <textarea name="benefits" defaultValue={editingTicket?.benefits || ""} rows={4} placeholder="Early access&#10;VIP seating&#10;Networking dinner" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Valid From</label>
                  <input name="validFrom" type="date" defaultValue={editingTicket?.validFrom?.split("T")[0] || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Valid Until</label>
                  <input name="validUntil" type="date" defaultValue={editingTicket?.validUntil?.split("T")[0] || ""} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="isAvailable" type="checkbox" defaultChecked={editingTicket?.isAvailable ?? true} className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">Available for sale</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="isFeatured" type="checkbox" defaultChecked={editingTicket?.isFeatured || false} className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">Featured</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" onClick={closeModal} className="bg-pink-600 text-white hover:bg-pink-700">Cancel</Button>
                <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-purple-600 to-pink-500">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingTicket ? "Save Changes" : "Add Ticket"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
