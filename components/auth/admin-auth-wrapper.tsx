"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { checkAuthStatus } from "@/lib/auth-client"

interface AdminAuthWrapperProps {
  children: React.ReactNode
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("AdminAuthWrapper: Checking authentication...")
        const authStatus = await checkAuthStatus()

        if (authStatus) {
          console.log("AdminAuthWrapper: User is authenticated")
          setIsAuthenticated(true)
        } else {
          console.log(
            "AdminAuthWrapper: User not authenticated, redirecting to login"
          )
          router.push("/forms/admin/login")
        }
      } catch (error) {
        console.error("AdminAuthWrapper: Auth check failed:", error)
        router.push("/forms/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-sm text-gray-600">
              Verifying authentication...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return <>{children}</>
}
