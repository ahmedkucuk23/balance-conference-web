import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { checkAuthorization } from "@/lib/auth-helpers"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { isAuthorized } = await checkAuthorization()
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const speaker = await (db as any).speaker.findUnique({
      where: { id },
    })

    if (!speaker) {
      return NextResponse.json({ error: "Speaker not found" }, { status: 404 })
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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { isAuthorized } = await checkAuthorization()
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
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
    } = body

    const normalizeSlug = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    const finalSlug = slug ? normalizeSlug(slug) : undefined

    // Check if slug already exists for another speaker
    if (finalSlug) {
      const existing = await (db as any).speaker.findUnique({
        where: { slug: finalSlug },
      })

      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "Speaker with this slug already exists" },
          { status: 400 }
        )
      }
    }

    const speaker = await (db as any).speaker.update({
      where: { id },
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
        published,
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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { isAuthorized } = await checkAuthorization()
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

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

