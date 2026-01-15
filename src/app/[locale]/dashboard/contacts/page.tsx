"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2, Mail, Phone, Building, Eye, Archive, CheckCircle, Clock } from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  subject?: string | null
  message: string
  type?: string | null
  status: string
  notes?: string | null
  createdAt: string
}

const statusOptions = [
  { value: "new", label: "New", icon: Clock, color: "blue" },
  { value: "read", label: "Read", icon: Eye, color: "yellow" },
  { value: "responded", label: "Responded", icon: CheckCircle, color: "green" },
  { value: "archived", label: "Archived", icon: Archive, color: "gray" },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("")

  useEffect(() => {
    fetchContacts()
  }, [filterStatus])

  const fetchContacts = async () => {
    try {
      const url = filterStatus ? `/api/contacts?status=${filterStatus}` : "/api/contacts"
      const response = await fetch(url)
      const data = await response.json()
      setContacts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching contacts:", error)
      setContacts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return

    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" })
      setContacts(contacts.filter((c) => c.id !== id))
      if (selectedContact?.id === id) closeModal()
    } catch (error) {
      console.error("Error deleting contact:", error)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    setIsSaving(true)
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      setContacts(contacts.map(c => c.id === id ? { ...c, status } : c))
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status })
      }
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const openModal = (contact: Contact) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
    if (contact.status === "new") {
      handleUpdateStatus(contact.id, "read")
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContact(null)
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500/20 text-blue-400"
      case "read": return "bg-yellow-500/20 text-yellow-400"
      case "responded": return "bg-green-500/20 text-green-400"
      case "archived": return "bg-gray-500/20 text-gray-400"
      default: return "bg-white/20 text-white"
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-purple-400 animate-spin" /></div>
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contact Submissions</h1>
          <p className="text-white/60">View and manage contact form submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium text-sm">Contact</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Subject</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Type</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Status</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Date</th>
                <th className="text-left p-4 text-white/60 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-white/5 hover:bg-white/5 cursor-pointer" onClick={() => openModal(contact)}>
                  <td className="p-4">
                    <p className="text-white font-medium">{contact.name}</p>
                    <p className="text-white/40 text-sm flex items-center gap-1"><Mail className="w-3 h-3" /> {contact.email}</p>
                  </td>
                  <td className="p-4 text-white/70 text-sm max-w-xs truncate">{contact.subject || "-"}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 capitalize">
                      {contact.type || "general"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(contact.status)}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/70 text-sm">{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(contact.id); }} className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-[#0A031B] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedContact.name}</h2>
                <p className="text-white/60">{selectedContact.subject || "No subject"}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyle(selectedContact.status)}`}>
                {selectedContact.status}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4 text-white/70">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {selectedContact.email}</div>
                {selectedContact.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {selectedContact.phone}</div>}
                {selectedContact.company && <div className="flex items-center gap-2"><Building className="w-4 h-4" /> {selectedContact.company}</div>}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-2">Message</p>
                <p className="text-white whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              <div className="text-white/40 text-sm">
                Received on {new Date(selectedContact.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-white/60 text-sm mb-3">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => handleUpdateStatus(selectedContact.id, option.value)}
                    disabled={isSaving || selectedContact.status === option.value}
                    className={`${selectedContact.status === option.value ? "bg-purple-600" : "bg-white/10 hover:bg-white/20"} text-white`}
                  >
                    <option.icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <Button onClick={closeModal} className="bg-pink-600 text-white hover:bg-pink-700">Close</Button>
              <Button onClick={() => handleDelete(selectedContact.id)} className="bg-red-600 text-white hover:bg-red-700">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
