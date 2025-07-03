import { ResourcesModule } from '@/components/resources-module';
import DashboardLayout from '@/components/dashboard-layout';

export default function ResourcesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Resources & Education
          </h1>
          <p className="text-text-secondary">
            Access educational materials and resources to support your financial planning journey.
          </p>
        </div>
        
        <ResourcesModule />
      </div>
    </DashboardLayout>
  );
} 