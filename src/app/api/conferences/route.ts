import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const conferences = await db.conference.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ conferences })
  } catch (error) {
    console.error("Error fetching conferences:", error)
    return NextResponse.json(
      { error: "Failed to fetch conferences" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      slug,
      location,
      date,
      description,
      eyebrow,
      howTitle,
      howDescription,
      nextChapterText,
      participants,
      speakersCount,
      mediaOutlets,
      influencers,
      featured,
      published,
    } = body

    // Check if slug already exists
    const existing = await db.conference.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Conference with this slug already exists" },
        { status: 400 }
      )
    }

    const conference = await db.conference.create({
      data: {
        title,
        slug,
        location,
        date: date ? new Date(date) : null,
        description,
        eyebrow,
        howTitle,
        howDescription,
        nextChapterText,
        participants: participants ?? 0,
        speakersCount: speakersCount ?? 0,
        mediaOutlets: mediaOutlets ?? 0,
        influencers: influencers ?? 0,
        featured: featured ?? false,
        published: published ?? true,
      },
    })

    return NextResponse.json(conference, { status: 201 })
  } catch (error) {
    console.error("Error creating conference:", error)
    return NextResponse.json(
      { error: "Failed to create conference" },
      { status: 500 }
    )
  }
}

