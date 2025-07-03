import DashboardLayout from "@/components/dashboard-layout"
import { PlanningJourney } from "@/components/planning-journey"

export default function PlanningPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Planning Journey
          </h1>
          <p className="text-text-secondary">
            Track your progress through the comprehensive financial planning process.
          </p>
        </div>
        
        <PlanningJourney />
      </div>
    </DashboardLayout>
  )
} 