import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { checkAuthorization } from "@/lib/auth-helpers"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { isAuthorized } = await checkAuthorization()
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params
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

    // Check if slug is taken by another blog post
    const existing = await (db as any).blogPost.findFirst({
      where: {
        slug: finalSlug,
        NOT: { id },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Blog post with this slug already exists" },
        { status: 400 }
      )
    }

    const blogPost = await (db as any).blogPost.update({
      where: { id },
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

    return NextResponse.json(blogPost)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { isAuthorized } = await checkAuthorization()
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params

    await (db as any).blogPost.delete({
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
