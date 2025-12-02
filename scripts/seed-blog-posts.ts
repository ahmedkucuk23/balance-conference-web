import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const blogPosts = [
  {
    slug: 'finding-balance-in-a-fast-paced-world',
    title: 'Finding Balance in a Fast-Paced World',
    description:
      'Learn how to maintain mental and physical wellbeing while navigating the demands of modern life. Discover practical strategies for sustainable success.',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    author: 'Ava Mitchell',
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
    `,
    published: true,
  },
  {
    slug: 'the-psychology-of-mindfulness',
    title: 'The Psychology of Mindfulness',
    description:
      'Explore how mindfulness practices influence mental health, emotional regulation, and overall wellbeing in our daily lives.',
    image:
      'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
    author: 'Liam Carter',
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
    `,
    published: true,
  },
]

async function main() {
  console.log('Seeding blog posts...')

  for (const post of blogPosts) {
    const result = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
    console.log(`✅ Upserted blog post: ${result.title}`)
  }

  console.log('✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error('Error seeding blog posts:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
