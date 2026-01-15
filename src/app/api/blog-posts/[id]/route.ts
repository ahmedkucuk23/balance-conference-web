import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await db.blogPost.findUnique({
      where: { id },
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existingPost = await db.blogPost.findUnique({ where: { id } })

    const post = await db.blogPost.update({
      where: { id },
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
        publishedAt: body.isPublished && !existingPost?.publishedAt ? new Date() : existingPost?.publishedAt,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.blogPost.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    )
  }
}
