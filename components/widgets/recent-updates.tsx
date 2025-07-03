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
  high: "error",
  medium: "warning",
  low: "secondary"
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>
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
                  isExpanded ? "border-brand-primary/20 bg-brand-primary/5" : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50"
                )}
                onClick={() => handleUpdateClick(update.id)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="mt-1">
                        <CategoryIconComponent />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-text-primary mb-1">
                          {update.title}
                        </h4>
                        <p className="text-xs text-text-secondary mb-1">
                          {update.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={update.advisor.avatar} alt={update.advisor.name} />
                            <AvatarFallback className="text-xs">
                              {update.advisor.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-text-secondary">
                            {update.advisor.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={categoryColors[update.category] as any}>
                            {update.category}
                          </Badge>
                          <Badge variant={priorityColors[update.priority] as any}>
                            {update.priority.charAt(0).toUpperCase() + update.priority.slice(1)}
                          </Badge>
                          <span className="text-xs text-text-tertiary">
                            {update.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {update.requiresAction && (
                        <Button
                          size="sm"
                          variant="brandOutline"
                          onClick={(e) => handleActionClick(e, update)}
                        >
                          {update.actionText}
                        </Button>
                      )}
                      <ChevronRight 
                        className={cn(
                          "h-4 w-4 text-text-tertiary transition-transform",
                          isExpanded && "rotate-90"
                        )} 
                      />
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-text-primary mb-2">
                            Next Steps
                          </h5>
                          <ul className="space-y-1">
                            {update.details.nextSteps.map((step, index) => (
                              <li key={index} className="text-xs text-text-secondary flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0"></span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">
                            {update.details.status}
                          </Badge>
                          {update.details.financialAmount && (
                            <span className="text-sm font-medium text-text-primary">
                              {update.details.financialAmount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        {sampleUpdates.length > 3 && (
          <div className="px-6 pb-6 pt-4 border-t border-neutral-100 bg-white">
            <Button
              variant="brandOutline"
              className="w-full"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View More"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 