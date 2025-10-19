import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tag, secret } = body

    // Verify the secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
    }

    // Revalidate the specified tag
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({
        message: `Revalidated tag: ${tag}`,
        revalidated: true,
        now: Date.now(),
      })
    }

    // If no specific tag, revalidate form submissions
    revalidateTag("form-submissions")
    return NextResponse.json({
      message: "Revalidated form submissions",
      revalidated: true,
      now: Date.now(),
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
