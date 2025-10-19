"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

import ConfirmationModal from "@/components/ui/confirmation-modal"

interface DeleteSubmissionButtonProps {
  submission: {
    title: string
    recordId: string
  }
}

export default function DeleteSubmissionButton({
  submission,
}: DeleteSubmissionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch("/api/submissions/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recordId: submission.recordId,
          secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET,
        }),
      })

      if (response.ok) {
        // Redirect to admin page after successful deletion
        router.push("/forms/admin")
      } else {
        console.error("Failed to delete submission")
        alert("Failed to delete submission. Please try again.")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Failed to delete submission. Please try again.")
    } finally {
      setIsDeleting(false)
      setIsModalOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <Trash2 className="mr-2 size-4" />
        Delete Submission
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Submission"
        message={`Are you sure you want to delete "${submission.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </>
  )
}
