import { unstable_cache } from "next/cache"
import Airtable from "airtable"

import AdminAuthWrapper from "@/components/auth/admin-auth-wrapper"

import LogoutButton from "./logout-button"
import SubmissionsGrid from "./submissions-grid"

async function getSubmissions() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID!
  )

  const records = await base("Form Submissions")
    .select({
      sort: [{ field: "Submitted At", direction: "desc" }],
    })
    .all()

  return records.map((record) => {
    const fields = record.fields
    const formData = JSON.parse(fields["Form Data"] as string)

    return {
      ...formData,
      recordId: record.getId(),
      uploadedAt: fields["Submitted At"],
      blobUrl: record.getId(), // Use record ID as the identifier for consistency
    }
  })
}

const getCachedSubmissions = unstable_cache(
  getSubmissions,
  ["form-submissions"],
  {
    tags: ["form-submissions"],
    revalidate: 3600, // 1 hour
  }
)

export default async function SubmissionsPage() {
  let submissions: any[] = []
  let error: string | null = null

  try {
    submissions = await getCachedSubmissions()
  } catch (err) {
    error = "Failed to load submissions"
    console.error("Error loading submissions:", err)
  }

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  Form Submissions
                </h1>
                <LogoutButton />
              </div>

              {error && (
                <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <SubmissionsGrid submissions={submissions} />
            </div>
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}
