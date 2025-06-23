import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CheckSquare, Square, User, Calendar } from "lucide-react"
import { useState } from "react"

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
    completed: false,
    status: "pending",
    isBlocker: true
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
    completed: false,
    status: "pending",
    isBlocker: false
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
    completed: false,
    status: "blocked",
    isBlocker: false
  },
  {
    id: 4,
    title: "Approve Estate Planning Changes",
    description: "Review and approve proposed changes to estate planning strategy.",
    priority: "high",
    dueDate: "2024-06-24",
    category: "Estate Planning",
    assignedBy: "Jennifer Liu",
    assignedByAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    completed: false,
    status: "pending",
    isBlocker: true
  },
  {
    id: 5,
    title: "Complete Risk Assessment Questionnaire",
    description: "Annual risk tolerance assessment required for portfolio rebalancing.",
    priority: "medium",
    dueDate: "2024-06-30",
    category: "Risk Assessment",
    assignedBy: "Sarah Johnson",
    assignedByAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    completed: false,
    status: "pending",
    isBlocker: false
  }
]

export function ActionQueueWidget() {
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set())
  const [showAll, setShowAll] = useState(false)

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

  const toggleCompletion = (itemId: number) => {
    const newCompleted = new Set(completedItems)
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId)
    } else {
      newCompleted.add(itemId)
    }
    setCompletedItems(newCompleted)
  }

  // Sort: urgent/overdue first, then high, then medium, then low, then by due date
  const sortItems = (items: typeof actionItems) => {
    return items.sort((a, b) => {
      const aOverdue = getDueDateStatus(a.dueDate) === "overdue" || a.priority === "urgent"
      const bOverdue = getDueDateStatus(b.dueDate) === "overdue" || b.priority === "urgent"
      if (aOverdue !== bOverdue) return bOverdue ? 1 : -1
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      const priorityDiff = priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
      if (priorityDiff !== 0) return priorityDiff
      const aDue = new Date(a.dueDate)
      const bDue = new Date(b.dueDate)
      return aDue.getTime() - bDue.getTime()
    })
  }

  const sortedItems = sortItems(actionItems.filter(item => !completedItems.has(item.id)))
  const visibleItems = showAll ? sortedItems : sortedItems.slice(0, 3)

  return (
    <Card className="shadow-sm border-0 h-full flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
            My Action Queue
          </CardTitle>
          <CardDescription style={{ color: "#444444" }}>
            Tasks and items requiring your attention
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow p-0">
        <div className="px-6 space-y-4 flex-grow">
          {visibleItems.length > 0 ? (
            visibleItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-white"
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
                  <div className="flex items-start gap-2 mb-1">
                    <h4
                      className="font-semibold text-sm cursor-pointer hover:underline transition-colors"
                      style={{ color: '#063852', display: 'inline' }}
                    >
                      {item.title}
                    </h4>
                    <Badge
                      variant="small"
                      style={{
                        backgroundColor: getPriorityColor(item.priority).bg,
                        color: getPriorityColor(item.priority).text
                      }}
                    >
                      {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                    </Badge>
                    {getDueDateStatus(item.dueDate) === "overdue" && (
                      <Badge variant="small" className="bg-red-100 text-red-700 ml-1">
                        Overdue
                      </Badge>
                    )}
                    {item.isBlocker && (
                      <Badge variant="small" className="bg-orange-100 text-orange-700 ml-1">
                        Blocker
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: '#444444' }}>
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" style={{ color: '#444444' }} />
                      <span className="text-xs font-medium" style={{ color: '#444444' }}>
                        Requestor:
                      </span>
                    </div>
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={item.assignedByAvatar} alt={item.assignedBy} />
                      <AvatarFallback className="text-xs">
                        {item.assignedBy.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs" style={{ color: '#444444' }}>
                      {item.assignedBy}
                    </span>
                    <span className="text-xs" style={{ color: '#444444' }}>
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </span>
                    <Calendar className="h-3 w-3" style={{ color: '#444444' }} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <span className="text-gray-400 text-sm">All caught up! No pending actions.</span>
            </div>
          )}
        </div>
        
        {/* Sticky bottom button */}
        {sortedItems.length > 3 && (
          <div className="px-6 pb-6 pt-4 border-t border-gray-100 bg-white">
            <button
              className="w-full py-2 text-sm font-medium text-[#1E9ADF] bg-white border border-[#1E9ADF] rounded-md hover:bg-[#F3F4F6] transition"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View More"}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 