import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { checkAuthorization } from "@/lib/auth-helpers"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publishedOnly = searchParams.get('published') !== 'false'

    // Fetch blog posts with optimized query
    const blogPosts = await (db as any).blogPost.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        image: true,
        author: true,
        readTime: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    const headers = publishedOnly ? {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
    } : {}

    return NextResponse.json({ blogPosts }, { headers })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
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
      title,
      slug,
      description,
      content,
      image,
      author,
      readTime,
      published,
    } = body

    const normalizeSlug = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    const finalSlug = slug ? normalizeSlug(slug) : normalizeSlug(title)

    // Check if slug already exists
    const existing = await (db as any).blogPost.findUnique({
      where: { slug: finalSlug },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Blog post with this slug already exists" },
        { status: 400 }
      )
    }

    const blogPost = await (db as any).blogPost.create({
      data: {
        title,
        slug: finalSlug,
        description,
        content,
        image,
        author,
        readTime,
        published: published ?? true,
      },
    })

    return NextResponse.json(blogPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    )
  }
}
