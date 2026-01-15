import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get("year")
    const active = searchParams.get("active")

    const conferences = await db.conference.findMany({
      where: {
        ...(active === "true" ? { isActive: true } : {}),
        ...(year ? { year: parseInt(year) } : {}),
      },
      orderBy: {
        year: "desc",
      },
      include: {
        _count: {
          select: { speakers: true, tickets: true }
        }
      }
    })

    return NextResponse.json(conferences)
  } catch (error) {
    console.error("Error fetching conferences:", error)
    return NextResponse.json(
      { error: "Failed to fetch conferences" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const conference = await db.conference.create({
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

    return NextResponse.json(conference, { status: 201 })
  } catch (error) {
    console.error("Error creating conference:", error)
    return NextResponse.json(
      { error: "Failed to create conference" },
      { status: 500 }
    )
  }
}
