import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    // Fetch all published conferences ordered by date descending
    const conferences = await (db as any).conference.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
      include: {
        speakers: {
          include: {
            speaker: true
          }
        }
      }
    })

    const conferenceGroups = conferences.map((conf: any) => ({
      conferenceTitle: conf.title,
      speakers: conf.speakers
        .filter((cs: any) => cs.speaker.published)
        .map((cs: any) => ({
          name: cs.speaker.name,
          role: cs.speaker.shortDescription ?? '',
          avatar: cs.speaker.image ?? '',
          slug: cs.speaker.slug,
        }))
    })).filter((group: any) => group.speakers.length > 0)

    return NextResponse.json(
      { conferenceGroups },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
        }
      }
    )
  } catch (error) {
    console.error("Error fetching conferences with speakers:", error)
    return NextResponse.json(
      { error: "Failed to fetch conferences with speakers" },
      { status: 500 }
    )
  }
}
