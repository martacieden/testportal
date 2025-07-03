import DashboardLayout from "@/components/dashboard-layout"
import DashboardOverview from "@/components/dashboard-overview"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}
