import React from 'react'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { TopNavigation } from '@/components/blocks/top-navigation'
import DarkVeil from '@/components/ui/dark-veil'
import { HoverFooter } from '@/components/ui/hover-footer'
import GradualBlur from '@/components/ui/gradual-blur'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Legacy blog posts data (used as fallback if database is empty)
const legacyBlogPosts = [
  {
    slug: 'finding-balance-in-a-fast-paced-world',
    title: 'Finding Balance in a Fast-Paced World',
    description: 'Learn how to maintain mental and physical wellbeing while navigating the demands of modern life. Discover practical strategies for sustainable success.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    author: 'Ava Mitchell',
    createdAt: '2025-08-25',
    readTime: '7 min read',
    content: `
      <p>In today's fast-paced world, finding balance has become more crucial than ever. The constant pressure to perform, achieve, and maintain various aspects of our lives can be overwhelming. This article explores practical strategies for maintaining mental and physical wellbeing while navigating modern life's demands.</p>

      <h2>Understanding Balance</h2>
      <p>Balance isn't about perfect equilibrium—it's about understanding your priorities and allocating your energy accordingly. It's recognizing that some days will be more work-heavy, while others allow for more personal time.</p>

      <h2>Practical Strategies</h2>
      <p>Start by identifying your core values and priorities. What matters most to you? Once you've established this foundation, you can begin to align your daily activities with these values.</p>

      <p>Set boundaries around your time and energy. Learn to say no to commitments that don't serve your wellbeing or align with your goals. This isn't selfish—it's essential for maintaining sustainable success.</p>

      <h2>The Role of Mindfulness</h2>
      <p>Incorporating mindfulness practices can help you stay grounded and present. Whether it's meditation, journaling, or simply taking mindful breaks throughout your day, these practices can significantly impact your overall wellbeing.</p>

      <p>Remember, balance is a journey, not a destination. Be patient with yourself as you navigate this process.</p>
    `
  },
  {
    slug: 'the-psychology-of-mindfulness',
    title: 'The Psychology of Mindfulness',
    description: 'Explore how mindfulness practices influence mental health, emotional regulation, and overall wellbeing in our daily lives.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
    author: 'Liam Carter',
    createdAt: '2025-07-14',
    readTime: '5 min read',
    content: `
      <p>Mindfulness has gained significant attention in recent years, and for good reason. The practice of being present and fully engaged in the current moment has profound effects on our mental health and overall wellbeing.</p>

      <h2>What is Mindfulness?</h2>
      <p>At its core, mindfulness is the practice of maintaining awareness of our thoughts, feelings, bodily sensations, and surrounding environment with openness and curiosity.</p>

      <h2>The Science Behind Mindfulness</h2>
      <p>Research has shown that regular mindfulness practice can lead to structural changes in the brain, particularly in areas associated with emotional regulation, attention, and self-awareness.</p>

      <p>Studies indicate that mindfulness can reduce symptoms of anxiety and depression, improve focus and concentration, and enhance overall quality of life.</p>

      <h2>Incorporating Mindfulness</h2>
      <p>You don't need to meditate for hours to experience the benefits of mindfulness. Start with just a few minutes each day, focusing on your breath or engaging in mindful activities like walking or eating.</p>
    `
  }
]

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) {
    redirect('/blog')
  }

  // Try to fetch from database first
  let post = await (db as any).blogPost.findUnique({
    where: { slug, published: true },
  })

  // If not found in database, try legacy posts
  if (!post) {
    const legacyPost = legacyBlogPosts.find(p => p.slug === slug)
    if (legacyPost) {
      post = legacyPost
    } else {
      notFound()
    }
  }

  // Format date for display
  const formattedDate = post.createdAt instanceof Date
    ? post.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : post.createdAt

  return (
    <>
      {/* GradualBlur effect for entire page */}
      <GradualBlur
        target="page"
        position="bottom"
        height="12rem"
        strength={.5}
        divCount={4}
        opacity={1}
        zIndex={1000}
      />

      <TopNavigation scrollThreshold={9999999999} />

      {/* DarkVeil background effect for entire page */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ width: '100vw', height: '100vh' }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.0}
          scanlineIntensity={.5}
          speed={1.75}
          scanlineFrequency={1.25}
          warpAmount={0.5}
          resolutionScale={1}
        />
      </div>

      {/* Hero Section */}
      <section
        className="relative z-10 flex items-center pt-64 pb-16"
        style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}
      >
        <div className="mx-auto max-w-4xl px-8 lg:px-12 w-full">
          {/* Back button */}
          <Link
            href="/blog"
            className="flex items-center gap-1 text-balance-200 hover:text-white transition-colors text-sm font-medium group mb-8"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            All Articles
          </Link>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-balance-300/20 mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-3 text-balance-200 text-sm mb-6">
            <span>by {post.author}</span>
            <div className="w-1 h-1 rounded-full bg-balance-300" />
            <span>{formattedDate}</span>
            <div className="w-1 h-1 rounded-full bg-balance-300" />
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-balance-200 leading-relaxed">
            {post.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section
        className="relative z-10 flex items-center pb-32"
        style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}
      >
        <div className="mx-auto max-w-4xl px-8 lg:px-12 w-full">
          <article
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-8
              prose-p:text-white/90 prose-p:leading-relaxed prose-p:mb-6
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:text-white
              prose-a:text-accent-gold prose-a:no-underline hover:prose-a:underline
              [&_p]:text-white/90 [&_h2]:text-white [&_h3]:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Footer */}
      <HoverFooter />
    </>
  )
}
