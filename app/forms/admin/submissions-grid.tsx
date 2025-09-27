"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Submission {
  title: string
  formName: string
  submittedAt: string
  status: string
  submissionData: Array<{ fieldName: string; fieldValue: string }>
  notes: string
  email: string
  blobUrl: string
  uploadedAt: string
}

interface SubmissionsGridProps {
  submissions: Submission[]
}

export default function SubmissionsGrid({ submissions }: SubmissionsGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [formTypeFilter, setFormTypeFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const router = useRouter()

  // Get unique form types for filter
  const formTypes = Array.from(new Set(submissions.map((s) => s.formName)))

  // Filter and sort submissions
  let filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.formName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFormType =
      formTypeFilter === "all" || submission.formName === formTypeFilter

    return matchesSearch && matchesFormType
  })

  // Sort submissions
  filteredSubmissions.sort((a, b) => {
    const dateA = new Date(a.submittedAt).getTime()
    const dateB = new Date(b.submittedAt).getTime()

    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  const handleCardClick = (submission: Submission) => {
    // Create a URL-safe ID from the blob URL
    const submissionId = encodeURIComponent(submission.blobUrl)
    router.push(`/forms/admin/submission/${submissionId}`)
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
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by title, form name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="sm:w-48">
            <label
              htmlFor="formType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Form Type
            </label>
            <select
              id="formType"
              value={formTypeFilter}
              onChange={(e) => setFormTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Forms</option>
              {formTypes.map((formType) => (
                <option key={formType} value={formType}>
                  {formType}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:w-48">
            <label
              htmlFor="sortOrder"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort by Date
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          Showing {filteredSubmissions.length} of {submissions.length}{" "}
          submissions
        </div>
      </div>

      {/* Grid */}
      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No submissions found</div>
          <div className="text-gray-400 text-sm mt-1">
            {searchTerm || formTypeFilter !== "all"
              ? "Try adjusting your filters"
              : "No form submissions yet"}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubmissions.map((submission, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(submission)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all duration-200 cursor-pointer"
            >
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                    {submission.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Form:</span>{" "}
                    {submission.formName}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Email:</span>{" "}
                    {submission.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(submission.submittedAt).toLocaleDateString()} at{" "}
                    {new Date(submission.submittedAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Fields:</span>{" "}
                    {submission.submissionData.length}
                  </div>
                  {submission.notes && (
                    <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
                      <span className="font-medium">Notes:</span>{" "}
                      {submission.notes}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-indigo-600 font-medium">
                    Click to view details →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
