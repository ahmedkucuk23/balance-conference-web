import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    let slug: string

    // Handle both Promise and direct params
    if (params && typeof params === 'object' && 'then' in params) {
      const resolvedParams = await params
      slug = resolvedParams.slug
    } else {
      slug = params.slug
    }

    const post = await db.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, image: true }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    )
  }
}
