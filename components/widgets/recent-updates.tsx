"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ChevronDown, 
  ChevronRight, 
  Building2, 
  Calculator, 
  TrendingUp, 
  Home,
  Clock,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Update {
  id: string
  title: string
  description: string
  timestamp: string
  advisor: {
    name: string
    initials: string
    avatar?: string
  }
  category: "Estate" | "Tax" | "Business" | "Investment"
  priority: "high" | "medium" | "low"
  requiresAction: boolean
  actionText?: string
  details: {
    nextSteps: string[]
    financialAmount?: string
    deadline?: string
    status: string
  }
}

const categoryIcons = {
  Estate: Home,
  Tax: Calculator,
  Business: Building2,
  Investment: TrendingUp
}

const categoryColors = {
  Estate: "bg-purple-100 text-purple-800",
  Tax: "bg-blue-100 text-blue-800",
  Business: "bg-green-100 text-green-800",
  Investment: "bg-orange-100 text-orange-800"
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-gray-100 text-gray-800"
}

// Sample data
const sampleUpdates: Update[] = [
  {
    id: "1",
    title: "Estate Planning Documents Ready",
    description: "Trust documents prepared by Jennifer Walsh",
    timestamp: "2 hours ago",
    advisor: {
      name: "Jennifer Walsh",
      initials: "JW",
      avatar: undefined
    },
    category: "Estate",
    priority: "high",
    requiresAction: true,
    actionText: "Review",
    details: {
      nextSteps: [
        "Review trust documents",
        "Contact Jennifer Walsh if questions",
        "Sign and return documents"
      ],
      status: "Pending Review"
    }
  },
  {
    id: "2",
    title: "Tax Strategy Analysis Complete",
    description: "Projected savings: $850K  $850K savings",
    timestamp: "Yesterday",
    advisor: {
      name: "Michael Chen",
      initials: "MC",
      avatar: undefined
    },
    category: "Tax",
    priority: "medium",
    requiresAction: true,
    actionText: "View Report",
    details: {
      nextSteps: [
        "Review tax strategy report",
        "Discuss with Michael Chen",
        "Implement recommendations"
      ],
      status: "Report Ready"
    }
  },
  {
    id: "3",
    title: "Business Valuation Updated",
    description: "Current estimated value: $52M  $52M valuation",
    timestamp: "3 days ago",
    advisor: {
      name: "Sarah Johnson",
      initials: "SJ",
      avatar: undefined
    },
    category: "Business",
    priority: "low",
    requiresAction: true,
    actionText: "Details",
    details: {
      nextSteps: [
        "Review updated valuation",
        "Schedule follow-up meeting"
      ],
      status: "Valuation Updated"
    }
  },
  {
    id: "4",
    title: "Investment Portfolio Rebalanced",
    description: "Risk allocation optimized for pre-liquidity phase",
    timestamp: "1 week ago",
    advisor: {
      name: "David Chen",
      initials: "DC",
      avatar: undefined
    },
    category: "Investment",
    priority: "medium",
    requiresAction: true,
    actionText: "View Details",
    details: {
      nextSteps: [
        "Review new allocation",
        "Confirm changes with advisor"
      ],
      status: "Rebalanced"
    }
  }
]

export function RecentUpdatesWidget() {
  const [expandedUpdate, setExpandedUpdate] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const handleUpdateClick = (updateId: string) => {
    setExpandedUpdate(expandedUpdate === updateId ? null : updateId)
  }

  const handleActionClick = (e: React.MouseEvent, update: Update) => {
    e.stopPropagation()
    // Handle action button click
    console.log(`Action clicked for update: ${update.title}`)
  }

  const CategoryIcon = ({ category }: { category: Update["category"] }) => {
    const IconComponent = categoryIcons[category]
    return <IconComponent className="h-4 w-4" />
  }

  const visibleUpdates = showAll ? sampleUpdates : sampleUpdates.slice(0, 3)

  return (
    <Card className="h-full flex flex-col border-0" style={{ backgroundColor: "#FFFFFF" }}>
      <CardHeader className="pb-3">
        <div>
          <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
            Recent Updates
          </CardTitle>
          <CardDescription style={{ color: "#444444" }}>
            Important developments and achievements
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow p-0">
        <div className="px-6 space-y-4 flex-grow">
          {visibleUpdates.map((update) => {
            const isExpanded = expandedUpdate === update.id
            const CategoryIconComponent = categoryIcons[update.category]

            return (
              <div
                key={update.id}
                className={cn(
                  "border rounded-lg transition-all cursor-pointer",
                  isExpanded ? "border-blue-200 bg-blue-50/50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                )}
                onClick={() => handleUpdateClick(update.id)}
              >
                {/* Update Header */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={cn("p-1 rounded", categoryColors[update.category])}>
                          <CategoryIconComponent className="h-3 w-3" />
                        </div>
                        <Badge 
                          variant="small" 
                          className={cn("text-xs", priorityColors[update.priority])}
                        >
                          {update.priority}
                        </Badge>
                        {update.requiresAction && (
                          <Badge variant="small" className="bg-blue-100 text-blue-800 text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      
                      <h4
                        className="font-semibold text-sm mb-1 line-clamp-1 transition-colors cursor-pointer hover:underline"
                        style={{ color: "#063852" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Replace with actual route if detail page exists
                          window.location.href = `/dashboard/updates/${update.id}`;
                        }}
                      >
                        {update.title}
                      </h4>
                      
                      <p className="text-xs mb-3 line-clamp-2" style={{ color: "#444444" }}>
                        {update.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={update.advisor.avatar} alt={update.advisor.name} />
                            <AvatarFallback className="text-xs">{update.advisor.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs" style={{ color: "#444444" }}>{update.advisor.name}</span>
                          <span className="text-xs" style={{ color: "#444444" }}>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" style={{ color: "#444444" }} />
                            <span className="text-xs" style={{ color: "#444444" }}>{update.timestamp}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {update.requiresAction && update.actionText && update.actionText !== 'Schedule Call' && (
                            <Button
                              size="small"
                              variant="outline"
                              className="text-xs h-7 px-3"
                              style={{ borderColor: "#1E9ADF", color: "#1E9ADF" }}
                              onClick={(e) => handleActionClick(e, update)}
                            >
                              {update.actionText}
                            </Button>
                          )}
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" style={{ color: "#444444" }} />
                          ) : (
                            <ChevronRight className="h-4 w-4" style={{ color: "#444444" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-white p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {update.details.financialAmount && (
                        <div>
                          <span style={{ color: "#444444" }}>Amount:</span>
                          <span className="ml-2 font-medium">{update.details.financialAmount}</span>
                        </div>
                      )}
                      {update.details.deadline && (
                        <div>
                          <span style={{ color: "#444444" }}>Deadline:</span>
                          <span className="ml-2 font-medium">{update.details.deadline}</span>
                        </div>
                      )}
                      <div className="col-span-2">
                        <span style={{ color: "#444444" }}>Status:</span>
                        <span className="ml-2 font-medium">{update.details.status}</span>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-sm mb-2" style={{ color: "#063852" }}>Next Steps:</h5>
                      <ul className="space-y-1">
                        {update.details.nextSteps.map((step, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span style={{ color: "#444444" }}>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Sticky bottom button */}
        {sampleUpdates.length > 3 && (
          <div className="px-6 pb-6 pt-4 border-t border-gray-100 bg-white">
            <button
              className="w-full py-2 text-sm font-medium text-[#1E9ADF] bg-white border border-[#1E9ADF] rounded-md hover:bg-[#F3F4F6] transition"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All"}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 