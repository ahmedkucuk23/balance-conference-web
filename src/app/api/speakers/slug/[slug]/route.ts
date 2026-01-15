import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const speaker = await db.speaker.findUnique({
      where: { slug },
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
