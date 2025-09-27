import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { head, list } from "@vercel/blob"

import LogoutButton from "./logout-button"
import SubmissionsGrid from "./submissions-grid"

export default async function SubmissionsPage() {
  // Check for admin authentication
  const cookieStore = await cookies()
  const adminAuth = cookieStore.get("admin-auth")

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/forms/admin/login")
  }
  let submissions: any[] = []
  let error: string | null = null

  try {
    const { blobs } = await list({
      prefix: "form-submissions/",
    })

    // Fetch each submission using Vercel Blob API for private access
    const submissionPromises = blobs.map(async (blob) => {
      try {
        const blobData = await head(blob.url)
        const response = await fetch(blobData.url)
        const data = await response.json()
        return {
          ...data,
          blobUrl: blob.url,
          uploadedAt: blob.uploadedAt,
        }
      } catch (err) {
        console.error(`Error fetching blob ${blob.url}:`, err)
        return null
      }
    })

    const allSubmissions = await Promise.all(submissionPromises)
    submissions = allSubmissions.filter((submission) => submission !== null)
  } catch (err) {
    error = "Failed to load submissions"
    console.error("Error loading submissions:", err)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Form Submissions
              </h1>
              <LogoutButton />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <SubmissionsGrid submissions={submissions} />
          </div>
        </div>
      </div>
    </div>
  )
}
