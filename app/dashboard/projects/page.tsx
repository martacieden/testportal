"use client"

import DashboardLayout from "@/components/dashboard-layout"
import ProjectsList from "@/components/projects-list"
import { useRouter } from "next/navigation"

export default function ProjectsPage() {
  const router = useRouter();

  // Pass a handler to ProjectsList for navigation
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Projects
          </h1>
          <p className="text-text-secondary">
            Manage and track your financial planning projects and initiatives.
          </p>
        </div>
        
        <ProjectsList onProjectClick={(id) => router.push(`/dashboard/projects/${id}`)} />
      </div>
    </DashboardLayout>
  )
}
