/**
 * Check authentication status for client-side use
 * @returns Promise<boolean> - true if authenticated
 */
export async function checkAuthStatus(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/check", {
      method: "GET",
      credentials: "include", // Ensure cookies are sent with the request
    })

    if (response.ok) {
      return true
    } else {
      console.log("Auth check failed with status:", response.status)
      return false
    }
  } catch (error) {
    console.error("Error checking auth status:", error)
    return false
  }
}
