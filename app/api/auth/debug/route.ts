import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
    const adminAuth = cookieStore.get("shifa-admin-session")

    return NextResponse.json({
      allCookies: allCookies.map((c) => ({ name: c.name, value: c.value })),
      adminAuth: adminAuth
        ? { name: adminAuth.name, value: adminAuth.value }
        : null,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to read cookies",
        details: error instanceof Error ? error.message : "Unknown error",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
