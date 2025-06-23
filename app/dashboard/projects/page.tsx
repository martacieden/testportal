"use client"

import DashboardLayout from "@/components/dashboard-layout"
import ProjectsList from "@/components/projects-list"
import { useRouter } from "next/navigation"

export default function ProjectsPage() {
  const router = useRouter();

  // Pass a handler to ProjectsList for navigation
  return (
    <DashboardLayout>
      <ProjectsList onProjectClick={(id) => router.push(`/dashboard/projects/${id}`)} />
    </DashboardLayout>
  )
}
