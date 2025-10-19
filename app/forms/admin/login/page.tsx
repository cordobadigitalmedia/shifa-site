"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { checkAuthStatus } from "@/lib/auth-client"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()

  // Check if user is already authenticated
  useEffect(() => {
    // Prevent multiple auth checks if already redirecting
    if (redirecting) return

    const checkAuth = async () => {
      try {
        console.log("Checking authentication status...")
        const isAuth = await checkAuthStatus()

        if (isAuth) {
          console.log("User is authenticated, redirecting to admin")
          setRedirecting(true)
          // User is already authenticated, redirect to admin
          // Use both router.push and window.location for better reliability
          router.push("/forms/admin")
          // Fallback redirect after a short delay
          setTimeout(() => {
            window.location.href = "/forms/admin"
          }, 1000)
          return
        } else {
          console.log("User not authenticated, showing login form")
        }
      } catch (err) {
        // Auth check failed, continue to login form
        console.log("Auth check failed, showing login form:", err)
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router, redirecting])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are sent with the request
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        // Add a small delay to ensure cookie is set before redirecting
        setTimeout(() => {
          router.push("/forms/admin")
          router.refresh()
        }, 100)
      } else {
        setError(data.error || "Invalid password")
      }
    } catch (err) {
      setError("Authentication failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Show loading state while checking authentication or redirecting
  if (checkingAuth || redirecting) {
    return (
      <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-sm text-gray-600">
              {redirecting
                ? "Redirecting to admin..."
                : "Checking authentication..."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the admin password to access form submissions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
