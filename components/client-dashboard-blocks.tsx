"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  FileText, 
  Calendar,
  Filter,
  MoreHorizontal,
  ArrowRight,
  Star,
  CheckSquare,
  Square,
  User
} from "lucide-react"

// Sample data for recent updates
const recentUpdates = [
  {
    id: 1,
    type: "achievement",
    title: "Portfolio Rebalancing Completed",
    description: "Your investment portfolio has been successfully rebalanced according to the latest market analysis and your risk tolerance.",
    advisor: "Michael Chen",
    advisorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    timestamp: "2 hours ago",
    priority: "high"
  },
  {
    id: 2,
    type: "alert",
    title: "Tax Filing Deadline Approaching",
    description: "Your quarterly tax filing is due in 5 days. Please review the prepared documents and provide any additional information needed.",
    advisor: "David Rodriguez",
    advisorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    timestamp: "1 day ago",
    priority: "urgent"
  },
  {
    id: 3,
    type: "update",
    title: "Estate Planning Documents Updated",
    description: "Your estate planning documents have been updated to reflect recent changes in tax laws and your family situation.",
    advisor: "Sarah Johnson",
    advisorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    timestamp: "3 days ago",
    priority: "medium"
  },
  {
    id: 4,
    type: "achievement",
    title: "Insurance Policy Renewed",
    description: "Your life insurance policy has been successfully renewed with improved terms and competitive rates.",
    advisor: "Michael Torres",
    advisorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face",
    timestamp: "1 week ago",
    priority: "low"
  }
]

// Sample data for action items
const actionItems = [
  {
    id: 1,
    title: "Review Q2 Investment Performance Report",
    description: "Please review the detailed performance analysis and provide feedback on any concerns or questions.",
    priority: "urgent",
    dueDate: "2024-06-25",
    category: "Investment Review",
    assignedBy: "Jennifer Liu",
    assignedByAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    completed: false
  },
  {
    id: 2,
    title: "Sign Updated Trust Agreement",
    description: "Digital signature required for the updated trust agreement reflecting recent legislative changes.",
    priority: "high",
    dueDate: "2024-06-28",
    category: "Legal Documents",
    assignedBy: "Sarah Johnson",
    assignedByAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    completed: false
  },
  {
    id: 3,
    title: "Provide Additional Tax Documentation",
    description: "Additional documentation needed for tax optimization strategies discussed in our last meeting.",
    priority: "medium",
    dueDate: "2024-07-05",
    category: "Tax Planning",
    assignedBy: "David Rodriguez",
    assignedByAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    completed: false
  },
  {
    id: 4,
    title: "Schedule Annual Financial Review",
    description: "Book your annual comprehensive financial review to discuss goals, progress, and strategy adjustments.",
    priority: "medium",
    dueDate: "2024-07-15",
    category: "Planning",
    assignedBy: "Michael Chen",
    assignedByAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    completed: false
  },
  {
    id: 5,
    title: "Update Beneficiary Information",
    description: "Review and update beneficiary information for all insurance policies and retirement accounts.",
    priority: "low",
    dueDate: "2024-07-30",
    category: "Administrative",
    assignedBy: "Jennifer Lee",
    assignedByAvatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=64&h=64&fit=crop&crop=face",
    completed: true
  }
]

export default function ClientDashboardBlocks() {
  const [filter, setFilter] = useState("all")
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set([5]))

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" }
      case "high":
        return { bg: "#FFFBEB", text: "#D97706", border: "#FED7AA" }
      case "medium":
        return { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" }
      case "low":
        return { bg: "#F0FDF4", text: "#059669", border: "#BBF7D0" }
      default:
        return { bg: "#F3F4F6", text: "#6B7280", border: "#D1D5DB" }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <CheckCircle className="h-4 w-4" style={{ color: "#059669" }} />
      case "alert":
        return <AlertCircle className="h-4 w-4" style={{ color: "#DC2626" }} />
      case "update":
        return <TrendingUp className="h-4 w-4" style={{ color: "#2563EB" }} />
      default:
        return <FileText className="h-4 w-4" style={{ color: "#6B7280" }} />
    }
  }

  const filteredActionItems = actionItems.filter(item => {
    if (filter === "all") return true
    if (filter === "completed") return completedItems.has(item.id)
    if (filter === "pending") return !completedItems.has(item.id)
    if (filter === "assigned-to-me") return item.assignedBy === "John Doe" // Replace with actual user check
    return true
  })

  const toggleCompletion = (itemId: number) => {
    const newCompleted = new Set(completedItems)
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId)
    } else {
      newCompleted.add(itemId)
    }
    setCompletedItems(newCompleted)
  }

  // Simulate current user
  const currentUser = "John Doe"

  // Only show actionable items: assigned to current user, not completed, and due today or earlier
  const actionableActionItems = actionItems.filter(item => {
    const dueDate = new Date(item.dueDate)
    const now = new Date()
    return (
      item.assignedBy === currentUser &&
      !completedItems.has(item.id)
    )
  })

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* My Action Queue Block */}
      <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
              My Action Queue
            </CardTitle>
            <CardDescription style={{ color: "#444444" }}>
              Tasks and items requiring your attention
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {actionableActionItems.length} pending
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {actionableActionItems.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-lg border transition-all hover:shadow-sm"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}
            >
              <button
                onClick={() => toggleCompletion(item.id)}
                className="mt-1 p-1 hover:bg-gray-100 rounded transition-colors"
              >
                {completedItems.has(item.id) ? (
                  <CheckSquare className="h-4 w-4 text-green-600" />
                ) : (
                  <Square className="h-4 w-4 text-gray-400" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm" style={{ color: "#063852" }}>
                    {item.title}
                  </h4>
                  <Badge 
                    className="text-xs"
                    style={{ 
                      backgroundColor: getPriorityColor(item.priority).bg,
                      color: getPriorityColor(item.priority).text,
                      borderColor: getPriorityColor(item.priority).border
                    }}
                  >
                    {item.priority}
                  </Badge>
                </div>
                <p className="text-xs mb-2" style={{ color: "#444444" }}>
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" style={{ color: '#444444' }} />
                      <span className="text-xs font-medium" style={{ color: '#444444' }}>
                        Requestor:
                      </span>
                    </div>
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={item.assignedByAvatar} alt={item.assignedBy} />
                      <AvatarFallback className="text-xs">
                        {item.assignedBy.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs" style={{ color: "#444444" }}>
                      {item.assignedBy}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: "#444444" }}>
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </span>
                    <Calendar className="h-3 w-3" style={{ color: "#444444" }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Updates Block */}
      <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
              Recent Updates
            </CardTitle>
            <CardDescription style={{ color: "#444444" }}>
              Important developments and achievements
            </CardDescription>
          </div>
          <Button variant="ghost" size="small">
            <MoreHorizontal className="h-4 w-4" style={{ color: "#444444" }} />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentUpdates.slice(0, 3).map((update) => (
            <div
              key={update.id}
              className="p-4 rounded-lg border transition-all duration-200 hover:shadow-sm"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#F1F3F4" }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(update.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm" style={{ color: "#063852" }}>
                      {update.title}
                    </h4>
                    <Badge 
                      className="text-xs"
                      style={{ 
                        backgroundColor: getPriorityColor(update.priority).bg,
                        color: getPriorityColor(update.priority).text,
                        borderColor: getPriorityColor(update.priority).border
                      }}
                    >
                      {update.priority}
                    </Badge>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#444444" }}>
                    {update.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={update.advisorAvatar} alt={update.advisor} />
                        <AvatarFallback className="text-xs">
                          {update.advisor.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs" style={{ color: "#444444" }}>
                        {update.advisor}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" style={{ color: "#444444" }} />
                      <span className="text-xs" style={{ color: "#444444" }}>
                        {update.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
} 