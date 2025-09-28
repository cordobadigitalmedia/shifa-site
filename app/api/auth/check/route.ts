import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const adminAuth = cookieStore.get("admin-auth")

    console.log("Auth check - cookie found:", !!adminAuth)
    console.log("Auth check - cookie value:", adminAuth?.value)

    if (adminAuth && adminAuth.value === "true") {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
  } catch (error) {
    console.error("Auth check error:", error)
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

    console.log("Login attempt - password provided:", !!password)
    console.log("Login attempt - admin password configured:", !!adminPassword)

    if (!adminPassword) {
      console.error("Admin password not configured in environment")
      return NextResponse.json(
        { error: "Admin password not configured" },
        { status: 500 }
      )
    }

    if (password === adminPassword) {
      // Set a secure cookie for authentication
      const cookieStore = await cookies()
      const isProduction = process.env.NODE_ENV === "production"

      console.log("Setting auth cookie - production mode:", isProduction)

      // Try a simpler cookie approach that works better in Vercel
      const cookieOptions: any = {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      }

      // Only add secure and sameSite for production
      if (isProduction) {
        cookieOptions.secure = true
        cookieOptions.sameSite = "lax" // Use "lax" instead of "strict" for better compatibility
      }

      cookieStore.set("admin-auth", "true", cookieOptions)

      console.log("Auth cookie set successfully")
      return NextResponse.json({ success: true })
    } else {
      console.log("Invalid password attempt")
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
}
