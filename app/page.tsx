import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect directly to the client portal dashboard
  redirect("/dashboard")
}
