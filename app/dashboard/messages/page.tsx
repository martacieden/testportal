"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import MessagesList from "@/components/messages-list"

export default function MessagesPage() {
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Messages
            </h1>
            <p className="text-text-secondary">
              Communicate directly with your financial advisor - your single point of contact for all financial matters.
            </p>
          </div>
          <Button 
            onClick={() => setShowNewMessageModal(true)}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>New Message</span>
          </Button>
        </div>
        
        <MessagesList 
          showNewMessageModal={showNewMessageModal}
          setShowNewMessageModal={setShowNewMessageModal}
        />
      </div>
    </DashboardLayout>
  )
}
