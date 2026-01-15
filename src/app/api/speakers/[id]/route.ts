import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const speaker = await db.speaker.findUnique({
      where: { id },
    })

    if (!speaker) {
      return NextResponse.json(
        { error: "Speaker not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(speaker)
  } catch (error) {
    console.error("Error fetching speaker:", error)
    return NextResponse.json(
      { error: "Failed to fetch speaker" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const speaker = await db.speaker.update({
      where: { id },
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

    return NextResponse.json(speaker)
  } catch (error) {
    console.error("Error updating speaker:", error)
    return NextResponse.json(
      { error: "Failed to update speaker" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.speaker.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting speaker:", error)
    return NextResponse.json(
      { error: "Failed to delete speaker" },
      { status: 500 }
    )
  }
}
