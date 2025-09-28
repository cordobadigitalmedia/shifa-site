import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Check if user is authenticated by verifying the admin-auth cookie
 * @returns true if authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const adminAuth = cookieStore.get("admin-auth")
    return adminAuth?.value === "true"
  } catch (error) {
    console.error("Error checking authentication:", error)
    return false
  }
}

/**
 * Require authentication - redirects to login if not authenticated
 * Use this in server components that need authentication
 */
export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect("/forms/admin/login")
  }
}

/**
 * Check authentication status for client-side use
 * @returns Promise<boolean> - true if authenticated
 */
export async function checkAuthStatus(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/check", {
      method: "GET",
    })
    return response.ok
  } catch (error) {
    console.error("Error checking auth status:", error)
    return false
  }
}
