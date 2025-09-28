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
