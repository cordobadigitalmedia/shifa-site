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
    </AdminAuthWrapper>
  )
}
