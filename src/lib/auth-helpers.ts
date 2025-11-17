import { auth } from "@/auth"

// Whitelist of authorized admin emails
const AUTHORIZED_EMAILS = [
  "ahmed@mita.ba",
  "amina@mita.ba",
  "haris.ovcina@gmail.com",
]

/**
 * Check if the current user is authorized (authenticated and in whitelist)
 * @returns Object with isAuthorized boolean and user session
 */
export async function checkAuthorization() {
  const session = await auth()

  if (!session?.user?.email) {
    return { isAuthorized: false, session: null }
  }

  const isAuthorized = AUTHORIZED_EMAILS.includes(session.user.email)

  return { isAuthorized, session }
}

/**
 * Check if a specific email is in the authorized whitelist
 */
export function isEmailAuthorized(email: string): boolean {
  return AUTHORIZED_EMAILS.includes(email)
}
