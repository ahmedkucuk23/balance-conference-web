import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { checkAuthorization } from "@/lib/auth-helpers"

export async function GET(request: NextRequest) {
  try {
    const { isAuthorized } = await checkAuthorization()
    const { searchParams } = new URL(request.url)
    const conferenceId = searchParams.get('conferenceId')
    const conferenceSlug = searchParams.get('conferenceSlug')

    // If authorized (dashboard), return all fields including unpublished
    if (isAuthorized) {
      const speakers = await (db as any).speaker.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          conferences: {
            include: {
              conference: true
            }
          }
        }
      })

      return NextResponse.json({ speakers })
    }

    // Build where clause for filtering
    let whereClause: any = { published: true }

    if (conferenceId || conferenceSlug) {
      // If filtering by conference, add the relation filter
      whereClause.conferences = {
        some: conferenceId
          ? { conferenceId }
          : { conference: { slug: conferenceSlug } }
      }
    }

    // Public endpoint - limited fields, only published speakers
    const speakers = await (db as any).speaker.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      select: {
        name: true,
        slug: true,
        image: true,
        shortDescription: true,
        location: true,
        motto: true,
      }
    })

    return NextResponse.json(
      { speakers },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
        }
      }
    )
  } catch (error) {
    console.error("Error fetching speakers:", error)
    return NextResponse.json(
      { error: "Failed to fetch speakers" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { isAuthorized } = await checkAuthorization()
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      slug,
      email,
      location,
      image,
      shortDescription,
      bio,
      quote,
      motto,
      twitter,
      linkedin,
      instagram,
      website,
      published,
      conferenceIds = [],
    } = body

    const normalizeSlug = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    const finalSlug = slug ? normalizeSlug(slug) : normalizeSlug(name)

    // Check if slug already exists
    const existing = await (db as any).speaker.findUnique({
      where: { slug: finalSlug },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Speaker with this slug already exists" },
        { status: 400 }
      )
    }

    const speaker = await (db as any).speaker.create({
      data: {
        name,
        slug: finalSlug,
        email,
        location,
        image,
        shortDescription,
        bio,
        quote,
        motto,
        twitter,
        linkedin,
        instagram,
        website,
        published: published ?? true,
        conferences: {
          create: (conferenceIds as string[]).map((conferenceId: string) => ({
            conferenceId,
          })),
        },
      },
      include: {
        conferences: {
          include: {
            conference: true
          }
        }
      }
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

