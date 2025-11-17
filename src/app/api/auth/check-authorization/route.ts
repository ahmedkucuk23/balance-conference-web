import { NextResponse } from "next/server"
import { checkAuthorization } from "@/lib/auth-helpers"

export async function GET() {
  try {
    const { isAuthorized, session } = await checkAuthorization()

    if (!isAuthorized) {
      return NextResponse.json(
        { authorized: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authorized: true,
      user: session?.user,
    })
  } catch (error) {
    console.error("Error checking authorization:", error)
    return NextResponse.json(
      { authorized: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
