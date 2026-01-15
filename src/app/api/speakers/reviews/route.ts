import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    // Fetch only speakers that have a review populated
    const speakers = await db.speaker.findMany({
      where: {
        review: {
          not: null,
        },
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        jobDescription: true,
        jobDescription_en: true,
        image: true,
        review: true,
        review_en: true,
      },
    })

    // Filter out speakers with empty review strings
    const filteredSpeakers = speakers.filter(
      (speaker) => speaker.review && speaker.review.trim() !== ""
    )

    return NextResponse.json(filteredSpeakers)
  } catch (error) {
    console.error("Error fetching speaker reviews:", error)
    return NextResponse.json(
      { error: "Failed to fetch speaker reviews" },
      { status: 500 }
    )
  }
}
