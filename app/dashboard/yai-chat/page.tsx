import YaiChatbot from '@/components/yai-chatbot';
import DashboardLayout from '@/components/dashboard-layout';

export default function YaiChatPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Yai – Your AI Assistant
          </h1>
          <p className="text-text-secondary">
            Chat with Yai to get help, tips, and personalized suggestions. Every day, Yai can recommend new actions or give you useful advice based on your activity.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 p-6 rounded-xl">
          <div className="w-full max-w-4xl">
            <YaiChatbot />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 