import DashboardLayout from "@/components/dashboard-layout"
import BillingOverview from "@/components/billing-overview"

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Billing
          </h1>
          <p className="text-text-secondary">
            View and manage your billing information and payment history.
          </p>
        </div>
        
        <BillingOverview />
      </div>
    </DashboardLayout>
  )
}
