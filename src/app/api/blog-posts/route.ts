import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")
    const category = searchParams.get("category")

    const posts = await db.blogPost.findMany({
      where: {
        ...(published === "true" ? { isPublished: true } : {}),
        ...(category ? { category } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: { id: true, name: true, image: true }
        }
      }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const post = await db.blogPost.create({
      data: {
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt || null,
        content: body.content,
        image: body.image || null,
        authorId: body.authorId || null,
        category: body.category || null,
        tags: body.tags || null,
        isPublished: body.isPublished || false,
        isFeatured: body.isFeatured || false,
        publishedAt: body.isPublished ? new Date() : null,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    )
  }
}
