'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { TopNavigation } from '@/components/blocks/top-navigation'
import { HoverFooter } from '@/components/ui/hover-footer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Phone, Mail as MailIcon } from 'lucide-react'
import DarkVeil from '@/components/ui/dark-veil'
import GradualBlur from '@/components/ui/gradual-blur'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {/* GradualBlur effect */}
      <GradualBlur
        target="page"
        position="bottom"
        height="12rem"
        strength={0.5}
        divCount={4}
        opacity={1}
        zIndex={1000}
      />

      <TopNavigation scrollThreshold={9999999999} />

      {/* DarkVeil background */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{ width: '100vw', height: '100vh' }}
      >
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.0}
          scanlineIntensity={0.5}
          speed={1.75}
          scanlineFrequency={1.25}
          warpAmount={0.5}
          resolutionScale={1}
        />
      </div>

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'rgba(10, 3, 27, 0.5)',
          backdropFilter: 'blur(12px)',
        }}
        className="w-full relative z-10 pt-40 pb-24"
      >
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            We'd Love to Hear From You
          </h1>
          <p className="text-xl md:text-2xl text-balance-100 max-w-3xl mx-auto">
            Get in touch with us for any inquiries about Balance Conference
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        className="relative z-10 py-16 md:py-24"
        style={{
          backgroundColor: 'rgba(10, 3, 27, 0.5)',
          backdropFilter: 'blur(24px)',
        }}
      >

        <div className="mx-auto max-w-6xl px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
            {/* Left Column - Company Info */}
            <div className="space-y-8">
              {/* Logo */}
              <div className="relative w-full max-w-sm">
                <Image
                  src="/assets/img/mita-logo.png"
                  alt="Mita Group"
                  width={400}
                  height={340}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div>
                  <p className="text-lg text-white font-medium">Maršala Tita 22,</p>
                  <p className="text-lg text-white font-medium">71000 Sarajevo, BiH</p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-balance-200" />
                  <a
                    href="tel:+38733278500"
                    className="text-lg text-balance-100 hover:text-white transition-colors"
                  >
                    +387 33 278 500
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MailIcon className="w-5 h-5 text-balance-200" />
                  <a
                    href="mailto:balance@mita.ba"
                    className="text-lg text-balance-100 hover:text-white transition-colors underline"
                  >
                    balance@mita.ba
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-balance-400/20 border border-balance-200/20 rounded-2xl shadow-2xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-semibold text-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Start typing..."
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 text-lg bg-balance-500/40 border-balance-200/30 text-white placeholder:text-balance-100/50 focus:bg-balance-500/60 focus:border-balance-300/50"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 text-lg bg-balance-500/40 border-balance-200/30 text-white placeholder:text-balance-100/50 focus:bg-balance-500/60 focus:border-balance-300/50"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base font-semibold text-white">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Say hello..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="text-lg bg-balance-500/40 border-balance-200/30 text-white placeholder:text-balance-100/50 focus:bg-balance-500/60 focus:border-balance-300/50 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg font-medium bg-balance-300 hover:bg-balance-400 text-white rounded-lg transition-all"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <HoverFooter />
    </>
  )
}

