import AIChatbot from '@/components/ai-chatbot';
import DashboardLayout from '@/components/dashboard-layout';

export default function AIChatPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            AI Assistant
          </h1>
          <p className="text-text-secondary">
            Have longer conversations with our AI assistant to get detailed answers about your financial planning, portfolio, and more.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 p-6 rounded-xl">
          <div className="w-full max-w-4xl">
            <AIChatbot />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 