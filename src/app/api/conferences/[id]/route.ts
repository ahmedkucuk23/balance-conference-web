import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const conference = await db.conference.findUnique({
      where: { id },
      include: {
        speakers: true,
        tickets: true,
      }
    })

    if (!conference) {
      return NextResponse.json(
        { error: "Conference not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(conference)
  } catch (error) {
    console.error("Error fetching conference:", error)
    return NextResponse.json(
      { error: "Failed to fetch conference" },
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

    const conference = await db.conference.update({
      where: { id },
      data: {
        slug: body.slug,
        name: body.name,
        description: body.description || null,
        year: body.year,
        date: body.date ? new Date(body.date) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        venue: body.venue || null,
        address: body.address || null,
        city: body.city || null,
        country: body.country || null,
        image: body.image || null,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured || false,
      },
    })

    return NextResponse.json(conference)
  } catch (error) {
    console.error("Error updating conference:", error)
    return NextResponse.json(
      { error: "Failed to update conference" },
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
    await db.conference.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting conference:", error)
    return NextResponse.json(
      { error: "Failed to delete conference" },
      { status: 500 }
    )
  }
}
