"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { TopNavigation } from "@/components/blocks/top-navigation"
import { ContactFooter } from "@/components/blocks/contact-footer"
import DarkVeil from "@/components/ui/dark-veil"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Send, Loader2, CheckCircle, Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || null,
      company: formData.get("company") || null,
      subject: formData.get("subject") || null,
      message: formData.get("message"),
      type: formData.get("type") || "general",
    }

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      setIsSubmitted(true)
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      setError(t("errorMessage"))
      console.error("Error submitting contact:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-[#0A031B] min-h-screen relative">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <TopNavigation glassmorphismOnly />

        <section className="pt-32 pb-20 sm:pt-40 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
                {t("badge")}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                {t("title1")}{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t("title2")}
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-white/70 text-lg">
                {t("description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/20">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{t("email")}</p>
                      <a href="mailto:balance@mita.ba" className="text-white/60 hover:text-purple-400 transition-colors">
                        balance@mita.ba
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-pink-500/20">
                      <Phone className="w-6 h-6 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{t("phone")}</p>
                      <a href="tel:+38733278500" className="text-white/60 hover:text-pink-400 transition-colors">
                        +387 33 278 500
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/20">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{t("location")}</p>
                      <p className="text-white/60">{t("locationAddress")}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{t("thankYou")}</h3>
                      <p className="text-white/60 mb-6">
                        {t("successMessage")}
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-gradient-to-r from-purple-600 to-pink-500"
                      >
                        {t("sendNew")}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/60 text-sm mb-2">{t("name")} *</label>
                          <input
                            name="name"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder={t("namePlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 text-sm mb-2">{t("email")} *</label>
                          <input
                            name="email"
                            type="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder={t("emailPlaceholder")}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/60 text-sm mb-2">{t("phone")}</label>
                          <input
                            name="phone"
                            type="tel"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder={t("phonePlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 text-sm mb-2">{t("company")}</label>
                          <input
                            name="company"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder={t("companyPlaceholder")}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/60 text-sm mb-2">{t("inquiryType")}</label>
                        <select
                          name="type"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        >
                          <option value="general">{t("typeGeneral")}</option>
                          <option value="sponsorship">{t("typeSponsorship")}</option>
                          <option value="speaker">{t("typeSpeaker")}</option>
                          <option value="media">{t("typeMedia")}</option>
                          <option value="tickets">{t("typeTickets")}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/60 text-sm mb-2">{t("subject")}</label>
                        <input
                          name="subject"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                          placeholder={t("subjectPlaceholder")}
                        />
                      </div>

                      <div>
                        <label className="block text-white/60 text-sm mb-2">{t("message")} *</label>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                          placeholder={t("messagePlaceholder")}
                        />
                      </div>

                      {error && (
                        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 py-4 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            {t("sending")}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            {t("sendMessage")}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  )
}
