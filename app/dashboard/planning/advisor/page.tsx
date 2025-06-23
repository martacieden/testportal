import { PlanningJourney } from "@/components/planning-journey"
import DashboardLayout from "@/components/dashboard-layout"

export default function PlanningAdvisorPage() {
  return (
    <DashboardLayout>
      <PlanningJourney isAdvisorView={true} />
    </DashboardLayout>
  )
} 