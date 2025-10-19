import { unstable_cache } from "next/cache"
import Airtable from "airtable"

import AdminAuthWrapper from "@/components/auth/admin-auth-wrapper"

import BackButton from "../../back-button"
import DeleteSubmissionButton from "./delete-submission-button"

interface SubmissionDetailPageProps {
  params: Promise<{ id: string }>
}

async function getSubmission(recordId: string) {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID!
  )

  const record = await base("Form Submissions").find(recordId)
  const fields = record.fields
  const formData = JSON.parse(fields["Form Data"] as string)

  return {
    ...formData,
    recordId: record.getId(),
    uploadedAt: fields["Submitted At"],
    blobUrl: record.getId(), // Use record ID as the identifier for consistency
  }
}

const getCachedSubmission = unstable_cache(getSubmission, ["form-submission"], {
  tags: ["form-submissions", "form-submission"],
  revalidate: 3600, // 1 hour
})

export default async function SubmissionDetailPage({
  params,
}: SubmissionDetailPageProps) {
  const { id } = await params
  const recordId = decodeURIComponent(id)

  let submission: any = null
  let error: string | null = null

  try {
    submission = await getCachedSubmission(recordId)
  } catch (err) {
    error = "Failed to load submission details"
    console.error("Error loading submission:", err)
  }

  if (error || !submission) {
    return (
      <AdminAuthWrapper>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <BackButton />
                <div className="mt-6">
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-800">
                      {error || "Submission not found"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminAuthWrapper>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "in_review":
        return "bg-yellow-100 text-yellow-800"
      case "contacted":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "archived":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <BackButton />

              <div className="mt-6">
                <div className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        Submission Details
                      </h1>
                      <p className="text-gray-600 mt-1">
                        {submission.formName} • {submission.email}
                      </p>
                    </div>
                    <DeleteSubmissionButton submission={submission} />
                  </div>
                </div>

                {/* Submission Info - Compact header */}
                <div className="mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-600">
                          Title
                        </dt>
                        <dd className="text-sm text-gray-900 font-medium">
                          {submission.title}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">
                          Form
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {submission.formName}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">
                          Email
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {submission.email}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <dt className="text-sm font-medium text-gray-600">
                            Submitted
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {new Date(
                              submission.submittedAt
                            ).toLocaleDateString()}
                          </dd>
                        </div>
                        <a
                          href={`mailto:${submission.email}`}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Reply
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Data */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Form Data ({submission.submissionData.length} fields)
                  </h3>

                  {/* Desktop View - 3/4 width with horizontal scroll */}
                  <div className="hidden md:block">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Field Names
                              </th>
                              <th className="w-3/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Values
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {submission.submissionData.map(
                              (field: any, index: number) => (
                                <tr
                                  key={index}
                                  className={
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  }
                                >
                                  <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs">
                                    <div className="break-words">
                                      {field.fieldName}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-900">
                                    {field.fieldValue &&
                                    field.fieldValue.length > 50 ? (
                                      <textarea
                                        value={field.fieldValue || ""}
                                        readOnly
                                        rows={Math.max(
                                          3,
                                          Math.ceil(
                                            field.fieldValue.length / 65
                                          )
                                        )}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none ${
                                          index % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                        }`}
                                        style={{
                                          minWidth: "200px",
                                          scrollbarWidth: "thin",
                                        }}
                                      />
                                    ) : (
                                      <input
                                        type="text"
                                        value={field.fieldValue || ""}
                                        readOnly
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 overflow-x-auto whitespace-nowrap ${
                                          index % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                        }`}
                                        style={{
                                          minWidth: "200px",
                                          scrollbarWidth: "thin",
                                          overflowX: "auto",
                                        }}
                                      />
                                    )}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Mobile View - Stacked layout */}
                  <div className="md:hidden">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="space-y-0">
                        {submission.submissionData.map(
                          (field: any, index: number) => (
                            <div
                              key={index}
                              className={`px-4 py-3 border-b border-gray-100 last:border-b-0 ${
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              <div className="text-sm font-medium text-gray-500 mb-2">
                                {field.fieldName}
                              </div>
                              {field.fieldValue &&
                              field.fieldValue.length > 50 ? (
                                <textarea
                                  value={field.fieldValue || ""}
                                  readOnly
                                  rows={Math.max(
                                    3,
                                    Math.ceil(field.fieldValue.length / 65)
                                  )}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                                  style={{
                                    minWidth: "200px",
                                    scrollbarWidth: "thin",
                                  }}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={field.fieldValue || ""}
                                  readOnly
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 overflow-x-auto whitespace-nowrap"
                                  style={{
                                    minWidth: "200px",
                                    scrollbarWidth: "thin",
                                    overflowX: "auto",
                                  }}
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Admin Notes */}
                {submission.notes && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Admin Notes
                    </h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-gray-900">{submission.notes}</p>
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Technical Details
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="font-medium text-gray-600">Record ID</dt>
                      <dd className="text-gray-900 font-mono text-xs break-all">
                        {submission.recordId}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-600">
                        Airtable Record
                      </dt>
                      <dd className="text-gray-900">
                        <a
                          href={`https://airtable.com/${process.env.AIRTABLE_BASE_ID}/tblXXXXXXXXXXXXXX/viwXXXXXXXXXXXXXX/${submission.recordId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 break-all"
                        >
                          View in Airtable
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}
