"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

import ConfirmationModal from "@/components/ui/confirmation-modal"

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
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    submission: Submission | null
  }>({ isOpen: false, submission: null })
  const [isDeleting, setIsDeleting] = useState(false)
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

  const handleDeleteClick = (e: React.MouseEvent, submission: Submission) => {
    e.stopPropagation() // Prevent card click
    setDeleteModal({ isOpen: true, submission })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal.submission) return

    setIsDeleting(true)
    try {
      const response = await fetch("/api/submissions/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recordId: deleteModal.submission.blobUrl,
          secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET,
        }),
      })

      if (response.ok) {
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        console.error("Failed to delete submission")
        alert("Failed to delete submission. Please try again.")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Failed to delete submission. Please try again.")
    } finally {
      setIsDeleting(false)
      setDeleteModal({ isOpen: false, submission: null })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, submission: null })
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
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by title, form name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:w-48">
            <label
              htmlFor="formType"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Form Type
            </label>
            <select
              id="formType"
              value={formTypeFilter}
              onChange={(e) => setFormTypeFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Sort by Date
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        <div className="py-12 text-center">
          <div className="text-lg text-gray-500">No submissions found</div>
          <div className="mt-1 text-sm text-gray-400">
            {searchTerm || formTypeFilter !== "all"
              ? "Try adjusting your filters"
              : "No form submissions yet"}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSubmissions.map((submission, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(submission)}
              className="group relative cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
            >
              {/* Delete Icon */}
              <button
                onClick={(e) => handleDeleteClick(e, submission)}
                className="absolute right-3 top-3 z-10 rounded-full bg-red-100 p-1 text-red-600 opacity-0 transition-all duration-200 hover:bg-red-200 group-hover:opacity-100"
                title="Delete submission"
              >
                <Trash2 className="size-4" />
              </button>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                    {submission.title}
                  </h3>
                  <p className="mb-1 text-sm text-gray-600">
                    <span className="font-medium">Form:</span>{" "}
                    {submission.formName}
                  </p>
                  <p className="mb-1 text-sm text-gray-600">
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
                    <div className="rounded bg-amber-50 p-2 text-sm text-amber-600">
                      <span className="font-medium">Notes:</span>{" "}
                      {submission.notes}
                    </div>
                  )}
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="text-xs font-medium text-indigo-600">
                    Click to view details →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Submission"
        message={`Are you sure you want to delete "${deleteModal.submission?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  )
}
