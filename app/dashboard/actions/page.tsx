"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Clock, AlertCircle, CheckSquare, Square, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

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
    assignedByAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    completed: false,
    type: "review",
    estimatedTime: "2 hours",
    attachments: ["Q2_Report.pdf", "Performance_Analysis.xlsx"]
  },
  {
    id: 2,
    title: "Sign Updated Trust Agreement",
    description: "Digital signature required for the updated trust agreement reflecting recent legislative changes.",
    priority: "high",
    dueDate: "2024-06-28",
    category: "Legal Documents",
    assignedBy: "John Doe",
    assignedByAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    completed: false,
    type: "signature",
    estimatedTime: "15 minutes",
    attachments: ["Trust_Agreement_v2.pdf"]
  },
  {
    id: 3,
    title: "Provide Additional Tax Documentation",
    description: "Additional documentation needed for tax optimization strategies discussed in our last meeting.",
    priority: "medium",
    dueDate: "2024-07-05",
    category: "Tax Planning",
    assignedBy: "John Doe",
    assignedByAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    completed: false,
    type: "documentation",
    estimatedTime: "1 hour",
    attachments: ["Tax_Requirements_List.pdf"]
  },
  {
    id: 4,
    title: "Approve Estate Planning Strategy",
    description: "Review and approve the proposed estate planning strategy for wealth transfer optimization.",
    priority: "high",
    dueDate: "2024-06-30",
    category: "Estate Planning",
    assignedBy: "Sarah Lee",
    assignedByAvatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=32&h=32&fit=crop&crop=face",
    completed: false,
    type: "approval",
    estimatedTime: "45 minutes",
    attachments: ["Estate_Strategy_Proposal.pdf", "Wealth_Transfer_Analysis.pdf"]
  },
  {
    id: 5,
    title: "Complete Risk Assessment Questionnaire",
    description: "Complete the updated risk assessment questionnaire to ensure investment alignment.",
    priority: "medium",
    dueDate: "2024-07-10",
    category: "Risk Assessment",
    assignedBy: "Michael Johnson",
    assignedByAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=32&h=32&fit=crop&crop=face",
    completed: true,
    type: "questionnaire",
    estimatedTime: "30 minutes",
    attachments: ["Risk_Assessment_Form.pdf"]
  }
]

export default function ActionsPage() {
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set([5]))
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")

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
      case "review":
        return <AlertCircle className="h-4 w-4" />
      case "signature":
        return <CheckCircle className="h-4 w-4" />
      case "documentation":
        return <Clock className="h-4 w-4" />
      case "approval":
        return <CheckCircle className="h-4 w-4" />
      case "questionnaire":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
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

  const filteredItems = actionItems.filter(item => {
    // Filter by completion status
    if (filter === "completed" && !completedItems.has(item.id)) return false
    if (filter === "pending" && completedItems.has(item.id)) return false
    
    // Filter by priority
    if (priorityFilter !== "all" && item.priority !== priorityFilter) return false
    
    // Filter by search term
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchTerm.toLowerCase())) return false
    
    return true
  })

  const pendingCount = actionItems.filter(item => !completedItems.has(item.id)).length
  const completedCount = completedItems.size

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#063852]">My Action Queue</h1>
          <p className="text-gray-600">Manage tasks and decisions requiring your attention</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-[#063852]">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-[#063852]">{actionItems.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search actions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <div className="grid gap-4">
          {filteredItems.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </CardContent>
            </Card>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleCompletion(item.id)}
                      className="mt-1 p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {completedItems.has(item.id) ? (
                        <CheckSquare className="h-5 w-5 text-green-600" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getTypeIcon(item.type)}
                            <h3 className={`font-semibold text-lg ${completedItems.has(item.id) ? 'line-through text-gray-500' : 'text-[#063852]'}`}>
                              {item.title}
                            </h3>
                          </div>
                          <p className={`text-sm ${completedItems.has(item.id) ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            style={{
                              backgroundColor: getPriorityColor(item.priority).bg,
                              color: getPriorityColor(item.priority).text,
                              borderColor: getPriorityColor(item.priority).border
                            }}
                          >
                            {item.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={item.assignedByAvatar} alt={item.assignedBy} />
                              <AvatarFallback className="text-xs">
                                {item.assignedBy.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>Assigned by {item.assignedBy}</span>
                          </div>
                          <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                          <span>Est. time: {item.estimatedTime}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {item.attachments && item.attachments.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {item.attachments.length} attachment{item.attachments.length > 1 ? 's' : ''}
                            </Badge>
                          )}
                          <Link href={`/dashboard/actions/${item.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 