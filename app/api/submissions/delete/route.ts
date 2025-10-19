import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import Airtable from "airtable"

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { recordId, secret } = body

    // Verify the secret to prevent unauthorized deletion
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
    }

    if (!recordId) {
      return NextResponse.json(
        { message: "Record ID is required" },
        { status: 400 }
      )
    }

    // Delete from Airtable
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID!
    )

    await base("Form Submissions").destroy(recordId)

    // Revalidate the cache
    revalidateTag("form-submissions")

    return NextResponse.json({
      message: "Submission deleted successfully",
      deleted: true,
      recordId,
      now: Date.now(),
    })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { message: "Error deleting submission" },
      { status: 500 }
    )
  }
}
