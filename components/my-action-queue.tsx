"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, ArrowRight, Play } from "lucide-react"

// Sample data (replace with API data)
const actionItems = [
  {
    id: 1,
    title: "Review Q2 Investment Performance Report",
    description: "Please review the detailed performance analysis and provide feedback.",
    priority: "urgent",
    dueDate: "2024-06-25",
    assignedBy: "John Doe",
    assignedByAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    completed: false,
    status: "pending",
    isBlocker: true,
    category: "Investment Review"
  },
  {
    id: 2,
    title: "Sign Updated Trust Agreement",
    description: "Digital signature required for the updated trust agreement.",
    priority: "high",
    dueDate: "2024-06-28",
    assignedBy: "John Doe",
    assignedByAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    completed: false,
    status: "pending",
    isBlocker: false,
    category: "Legal Documents"
  },
  {
    id: 3,
    title: "Provide Additional Tax Documentation",
    description: "Additional documentation needed for tax optimization strategies.",
    priority: "medium",
    dueDate: "2024-07-05",
    assignedBy: "John Doe",
    assignedByAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    completed: false,
    status: "blocked",
    isBlocker: false,
    category: "Tax Planning"
  },
  {
    id: 4,
    title: "Approve Estate Planning Changes",
    description: "Review and approve proposed changes to estate planning strategy.",
    priority: "high",
    dueDate: "2024-06-24",
    assignedBy: "John Doe",
    assignedByAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    completed: false,
    status: "pending",
    isBlocker: true,
    category: "Estate Planning"
  },
  {
    id: 5,
    title: "Complete Risk Assessment Questionnaire",
    description: "Annual risk tolerance assessment required for portfolio rebalancing.",
    priority: "medium",
    dueDate: "2024-06-30",
    assignedBy: "John Doe",
    assignedByAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    completed: false,
    status: "pending",
    isBlocker: false,
    category: "Risk Assessment"
  }
]

export default function MyActionQueue() {
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set(actionItems.filter(i => i.completed).map(i => i.id)))
  const currentUser = "John Doe"

  // Only show tasks assigned to current user
  const myItems = actionItems.filter(item => item.assignedBy === currentUser)

  const getPriorityColor = (priority: string) => {
    if (priority === "urgent") return { bg: "#FEF2F2", text: "#DC2626" }
    if (priority === "high") return { bg: "#E6F3FF", text: "#1E9ADF" }
    if (priority === "medium") return { bg: "#F3F4F6", text: "#6B7280" }
    return { bg: "#F3F4F6", text: "#6B7280" }
  }

  const getDueDateStatus = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return "overdue"
    if (diffDays === 0) return "due today"
    if (diffDays <= 3) return "due soon"
    return "upcoming"
  }

  // Sort: urgent/overdue first, then high, then medium, then low, then by due date
  const sortItems = (items: typeof myItems) => {
    return items.sort((a, b) => {
      // Overdue/urgent first
      const aOverdue = getDueDateStatus(a.dueDate) === "overdue" || a.priority === "urgent"
      const bOverdue = getDueDateStatus(b.dueDate) === "overdue" || b.priority === "urgent"
      if (aOverdue !== bOverdue) return bOverdue ? 1 : -1
      // Priority
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      const priorityDiff = priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
      if (priorityDiff !== 0) return priorityDiff
      // Due date
      const aDue = new Date(a.dueDate)
      const bDue = new Date(b.dueDate)
      return aDue.getTime() - bDue.getTime()
    })
  }

  const sortedItems = sortItems(myItems.filter(item => !completedItems.has(item.id)))
  const [showAll, setShowAll] = useState(false)
  const visibleItems = showAll ? sortedItems : sortedItems.slice(0, 3)

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-[#063852] mb-0">My Action Queue</h2>
          <p className="text-xs md:text-sm text-gray-500">Tasks and items requiring your attention</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-[#1E9ADF] text-[#1E9ADF] px-3 py-1 rounded-md flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      <div className="space-y-2 mt-2">
        {visibleItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 text-sm">
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#E6F3FF"/><path d="M16 24h16M24 16v16" stroke="#1E9ADF" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="mt-2">You're all caught up!</span>
          </div>
        )}
        {visibleItems.map(item => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-md border border-gray-100 bg-[#F8FAFC]`}
          >
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`font-medium text-sm text-[#063852] truncate`}>{item.title}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: getPriorityColor(item.priority).bg, color: getPriorityColor(item.priority).text }}>
                  {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                </span>
                {getDueDateStatus(item.dueDate) === "overdue" && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-700 ml-1">
                    Overdue
                  </span>
                )}
                {item.isBlocker && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-orange-100 text-orange-700 ml-1">
                    Blocker
                  </span>
                )}
              </div>
              <span className={`text-xs text-gray-500 truncate mb-0.5`}>{item.description}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={item.assignedByAvatar} alt={item.assignedBy} />
                  <AvatarFallback className="text-xs">{item.assignedBy.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <span className="text-xs" style={{ color: '#444444' }}>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                <Calendar className="h-3 w-3" style={{ color: '#444444' }} />
              </div>
            </div>
          </div>
        ))}
        {sortedItems.length > 3 && !showAll && (
          <button
            className="w-full mt-2 py-2 text-sm font-medium text-[#1E9ADF] bg-white border border-[#1E9ADF] rounded-md hover:bg-[#F3F4F6] transition"
            onClick={() => setShowAll(true)}
          >
            View More
          </button>
        )}
      </div>
    </div>
  )
} 