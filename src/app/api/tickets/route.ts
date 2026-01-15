import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const available = searchParams.get("available")
    const conferenceId = searchParams.get("conferenceId")

    const tickets = await db.ticket.findMany({
      where: {
        ...(available === "true" ? { isAvailable: true } : {}),
        ...(conferenceId ? { conferenceId } : {}),
      },
      orderBy: {
        price: "asc",
      },
      include: {
        conference: {
          select: { id: true, name: true, year: true }
        },
        _count: {
          select: { orders: true }
        }
      }
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error("Error fetching tickets:", error)
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const ticket = await db.ticket.create({
      data: {
        name: body.name,
        description: body.description || null,
        price: body.price,
        currency: body.currency || "BAM",
        quantity: body.quantity || null,
        isAvailable: body.isAvailable ?? true,
        isFeatured: body.isFeatured || false,
        benefits: body.benefits || null,
        validFrom: body.validFrom ? new Date(body.validFrom) : null,
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
        conferenceId: body.conferenceId || null,
      },
    })

    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    console.error("Error creating ticket:", error)
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    )
  }
}
