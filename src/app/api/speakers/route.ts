import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get("year")
    const all = searchParams.get("all") // For dashboard - show all speakers

    const speakers = await db.speaker.findMany({
      where: {
        ...(all !== "true" ? { isActive: true } : {}),
        ...(year ? { year: parseInt(year) } : {}),
      },
      orderBy: {
        order: "asc",
      },
    })

    return NextResponse.json(speakers)
  } catch (error) {
    console.error("Error fetching speakers:", error)
    return NextResponse.json(
      { error: "Failed to fetch speakers" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const speaker = await db.speaker.create({
      data: {
        slug: body.slug,
        name: body.name,
        topic: body.topic,
        topic_en: body.topic_en || null,
        bio: body.bio,
        bio_en: body.bio_en || null,
        details: body.details || null,
        details_en: body.details_en || null,
        image: body.image,
        link: body.link || null,
        location: body.location || null,
        location_en: body.location_en || null,
        jobDescription: body.jobDescription || null,
        jobDescription_en: body.jobDescription_en || null,
        facebook: body.facebook || null,
        instagram: body.instagram || null,
        linkedin: body.linkedin || null,
        webpage: body.webpage || null,
        review: body.review || null,
        review_en: body.review_en || null,
        isTbd: body.isTbd || false,
        year: body.year || 2026,
        order: body.order || 0,
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(speaker, { status: 201 })
  } catch (error) {
    console.error("Error creating speaker:", error)
    return NextResponse.json(
      { error: "Failed to create speaker" },
      { status: 500 }
    )
  }
}
