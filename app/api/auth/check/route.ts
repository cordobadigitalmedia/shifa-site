import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const adminAuth = cookieStore.get("admin-auth")

    if (adminAuth && adminAuth.value === "true") {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication check failed" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin password not configured" },
        { status: 500 }
      )
    }

    if (password === adminPassword) {
      // Set a secure cookie for authentication
      const cookieStore = await cookies()
      cookieStore.set("admin-auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/", // Ensure cookie is available across the entire site
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
}
