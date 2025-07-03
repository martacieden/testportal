"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Shield, CheckCircle, Paperclip, Clock } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import MessagesList from "@/components/messages-list"

const initialMessageCategories = [
  {
    id: "general",
    name: "General Inquiries",
    count: 12,
    avgResponseTime: "2 hours",
  },
  {
    id: "planning",
    name: "Financial Planning",
    count: 8,
    avgResponseTime: "4 hours",
  },
  {
    id: "investments",
    name: "Investment Updates",
    count: 5,
    avgResponseTime: "1 hour",
  },
  {
    id: "documents",
    name: "Document Requests",
    count: 3,
    avgResponseTime: "24 hours",
  },
  {
    id: "urgent",
    name: "Urgent Matters",
    count: 1,
    avgResponseTime: "30 minutes",
  },
]

const initialMessagesData = [
  {
    id: 1,
    sender: "advisor",
    content: "Hi Sarah! I wanted to check in and see how you're doing with the retirement planning we discussed last week. Do you have any questions about the portfolio adjustments?",
    timestamp: "10:30 AM",
    category: "planning",
    isOwn: false,
    responseStatus: "sent",
    readReceipt: true,
    attachments: [],
  },
  {
    id: 2,
    sender: "client",
    content: "Hi Michael! Thanks for checking in. I've been reviewing the materials you sent, and I do have a few questions about the Roth IRA conversion strategy.",
    timestamp: "10:32 AM",
    category: "planning",
    isOwn: true,
    responseStatus: "delivered",
    readReceipt: true,
    attachments: [],
  },
  {
    id: 3,
    sender: "advisor",
    content: "Great question! The Roth conversion can be a smart move for your situation. Let me send you a detailed breakdown of the tax implications and timeline. Would you like to schedule a call to discuss this in more detail?",
    timestamp: "10:35 AM",
    category: "planning",
    isOwn: false,
    responseStatus: "sent",
    readReceipt: false,
    attachments: [
      { name: "Roth_Conversion_Analysis.pdf", type: "pdf", size: "2.3 MB" }
    ],
  },
  {
    id: 4,
    sender: "advisor",
    content: "I've also noticed some positive movement in your investment portfolio. Your tech sector allocation has performed well this quarter. Would you like me to prepare a quarterly review report?",
    timestamp: "10:36 AM",
    category: "investments",
    isOwn: false,
    responseStatus: "sent",
    readReceipt: false,
    attachments: [],
  },
  {
    id: 5,
    sender: "client",
    content: "That would be very helpful! And yes, I'd love to schedule a call. How about next Tuesday afternoon?",
    timestamp: "2:15 PM",
    category: "planning",
    isOwn: true,
    responseStatus: "delivered",
    readReceipt: true,
    attachments: [],
  },
  {
    id: 6,
    sender: "advisor",
    content: "Perfect! I have a 2 PM slot available on Tuesday. I'll send you a calendar invite. Also, I wanted to remind you that we need to update your beneficiary designations on your life insurance policy. I can help you with the paperwork.",
    timestamp: "2:20 PM",
    category: "documents",
    isOwn: false,
    responseStatus: "sent",
    readReceipt: false,
    attachments: [
      { name: "Beneficiary_Update_Form.pdf", type: "pdf", size: "1.1 MB" }
    ],
  },
]

export default function MessagesPage() {
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)
  const [messageCategories, setMessageCategories] = useState(initialMessageCategories)
  const [messages, setMessages] = useState(initialMessagesData)

  // Handler to remove a chat/category
  const handleDeleteChatCategory = (categoryId: string) => {
    setMessageCategories(prev => prev.filter(cat => cat.id !== categoryId))
    setMessages(prev => prev.filter(msg => msg.category !== categoryId))
  }

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
          messageCategories={messageCategories}
          messages={messages}
          setMessages={setMessages}
          onDeleteChatCategory={handleDeleteChatCategory}
        />
      </div>
    </DashboardLayout>
  )
}
