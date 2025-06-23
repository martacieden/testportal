"use client"

import React, { useState } from "react"
import { 
  TrendingUp, 
  Shield, 
  Building2, 
  Heart, 
  Calculator, 
  FileText,
  ChevronDown,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Filter
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// Data structure interfaces
interface Task {
  id: number
  task: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  assignee: string
  dueDate: string
  description: string
}

interface ServiceArea {
  title: string
  icon: React.ReactNode
  progress: number
  status: 'excellent' | 'on-track' | 'needs-attention' | 'behind' | 'not-started'
  priority: 'high' | 'medium' | 'low'
  advisor: string
  nextAction: string
  dueDate: string
  estimatedCompletion: string
  completedTasks: number
  totalTasks: number
  recentUpdates: string[]
  tasks: Task[]
}

interface ServiceAreasData {
  [key: string]: ServiceArea
}

// Status and priority configurations
const statusConfig = {
  excellent: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
  'on-track': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle },
  'needs-attention': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: AlertCircle },
  behind: { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle },
  'not-started': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Clock }
}

const priorityConfig = {
  high: { color: 'bg-red-100 text-red-800 border-red-200' },
  medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  low: { color: 'bg-green-100 text-green-800 border-green-200' }
}

// Service areas data
const serviceAreas: ServiceAreasData = {
  'financial-planning': {
    title: 'Financial Planning & Investment Strategy',
    icon: <TrendingUp className="h-5 w-5" />,
    progress: 85,
    status: 'on-track',
    priority: 'high',
    advisor: 'David Chen',
    nextAction: 'Review Q3 portfolio rebalancing',
    dueDate: 'June 30, 2025',
    estimatedCompletion: 'July 15, 2025',
    completedTasks: 3,
    totalTasks: 4,
    recentUpdates: [
      'Emergency fund increased to 8 months of expenses',
      'Reduced tech concentration from 42% to 28%',
      'Implemented tax-loss harvesting strategy'
    ],
    tasks: [
      {
        id: 1,
        task: 'Cash flow modeling for exit scenarios',
        completed: true,
        priority: 'high',
        assignee: 'David Chen',
        dueDate: '2025-06-15',
        description: 'Complete financial projections for various exit valuations'
      },
      {
        id: 2,
        task: 'Portfolio diversification analysis',
        completed: true,
        priority: 'high',
        assignee: 'David Chen',
        dueDate: '2025-06-20',
        description: 'Analyze current concentration risk and recommend rebalancing'
      },
      {
        id: 3,
        task: 'Post-liquidity investment strategy',
        completed: false,
        priority: 'high',
        assignee: 'David Chen',
        dueDate: '2025-07-01',
        description: 'Develop comprehensive investment plan for post-exit wealth'
      },
      {
        id: 4,
        task: 'Alternative investment evaluation',
        completed: false,
        priority: 'medium',
        assignee: 'Sarah Johnson',
        dueDate: '2025-07-15',
        description: 'Research private equity, real estate, and hedge fund opportunities'
      }
    ]
  },
  'estate-planning': {
    title: 'Estate Planning & Wealth Transfer',
    icon: <Shield className="h-5 w-5" />,
    progress: 45,
    status: 'needs-attention',
    priority: 'high',
    advisor: 'Michael Torres',
    nextAction: 'Execute updated trust documents',
    dueDate: 'June 28, 2025',
    estimatedCompletion: 'August 1, 2025',
    completedTasks: 1,
    totalTasks: 4,
    recentUpdates: [
      'Trust documents drafted and under legal review',
      'Beneficiary designations analysis completed',
      'Tax implications assessment finalized'
    ],
    tasks: [
      {
        id: 5,
        task: 'Update will and testament',
        completed: false,
        priority: 'high',
        assignee: 'Michael Torres',
        dueDate: '2025-06-28',
        description: 'Execute updated will reflecting current family and business situation'
      },
      {
        id: 6,
        task: 'Establish revocable living trust',
        completed: false,
        priority: 'high',
        assignee: 'Michael Torres',
        dueDate: '2025-07-10',
        description: 'Create and fund revocable trust for probate avoidance'
      },
      {
        id: 7,
        task: 'Review beneficiary designations',
        completed: true,
        priority: 'high',
        assignee: 'Michael Torres',
        dueDate: '2025-06-15',
        description: 'Update all account beneficiaries to align with estate plan'
      },
      {
        id: 8,
        task: 'Charitable giving strategy',
        completed: false,
        priority: 'medium',
        assignee: 'Michael Torres',
        dueDate: '2025-08-01',
        description: 'Develop tax-efficient charitable giving framework'
      }
    ]
  },
  'business-succession': {
    title: 'Business Succession Planning',
    icon: <Building2 className="h-5 w-5" />,
    progress: 30,
    status: 'behind',
    priority: 'high',
    advisor: 'Jennifer Lee',
    nextAction: 'Complete management team assessment',
    dueDate: 'July 15, 2025',
    estimatedCompletion: 'September 1, 2025',
    completedTasks: 1,
    totalTasks: 5,
    recentUpdates: [
      'Initial succession timeline developed',
      'Key employee retention plan drafted',
      'Business valuation process initiated'
    ],
    tasks: [
      {
        id: 9,
        task: 'Management team assessment',
        completed: false,
        priority: 'high',
        assignee: 'Jennifer Lee',
        dueDate: '2025-07-15',
        description: 'Evaluate internal candidates and external options for leadership transition'
      },
      {
        id: 10,
        task: 'Succession timeline development',
        completed: true,
        priority: 'high',
        assignee: 'Jennifer Lee',
        dueDate: '2025-06-30',
        description: 'Create detailed timeline for leadership transition and knowledge transfer'
      },
      {
        id: 11,
        task: 'Key employee retention strategy',
        completed: false,
        priority: 'medium',
        assignee: 'Jennifer Lee',
        dueDate: '2025-08-01',
        description: 'Develop compensation and incentive plans to retain critical team members'
      },
      {
        id: 12,
        task: 'Business valuation update',
        completed: false,
        priority: 'medium',
        assignee: 'Jennifer Lee',
        dueDate: '2025-08-15',
        description: 'Obtain current business valuation for succession planning purposes'
      },
      {
        id: 13,
        task: 'Transition agreement drafting',
        completed: false,
        priority: 'high',
        assignee: 'Jennifer Lee',
        dueDate: '2025-09-01',
        description: 'Draft comprehensive transition agreement with legal counsel'
      }
    ]
  },
  'insurance-planning': {
    title: 'Insurance & Risk Management',
    icon: <Heart className="h-5 w-5" />,
    progress: 60,
    status: 'on-track',
    priority: 'medium',
    advisor: 'Robert Kim',
    nextAction: 'Review life insurance policy updates',
    dueDate: 'July 10, 2025',
    estimatedCompletion: 'July 25, 2025',
    completedTasks: 2,
    totalTasks: 4,
    recentUpdates: [
      'Disability insurance coverage increased',
      'Umbrella liability policy reviewed',
      'Key person insurance analysis completed'
    ],
    tasks: [
      {
        id: 14,
        task: 'Life insurance policy review',
        completed: false,
        priority: 'medium',
        assignee: 'Robert Kim',
        dueDate: '2025-07-10',
        description: 'Review and update life insurance coverage for current needs'
      },
      {
        id: 15,
        task: 'Disability insurance assessment',
        completed: true,
        priority: 'medium',
        assignee: 'Robert Kim',
        dueDate: '2025-06-20',
        description: 'Evaluate disability coverage adequacy and update as needed'
      },
      {
        id: 16,
        task: 'Key person insurance',
        completed: true,
        priority: 'medium',
        assignee: 'Robert Kim',
        dueDate: '2025-06-25',
        description: 'Analyze need for key person insurance on critical employees'
      },
      {
        id: 17,
        task: 'Umbrella liability review',
        completed: false,
        priority: 'low',
        assignee: 'Robert Kim',
        dueDate: '2025-07-25',
        description: 'Review umbrella liability coverage for personal and business protection'
      }
    ]
  },
  'tax-planning': {
    title: 'Tax Planning & Optimization',
    icon: <Calculator className="h-5 w-5" />,
    progress: 75,
    status: 'excellent',
    priority: 'medium',
    advisor: 'Amanda Rodriguez',
    nextAction: 'Implement Q3 tax strategies',
    dueDate: 'June 25, 2025',
    estimatedCompletion: 'July 5, 2025',
    completedTasks: 3,
    totalTasks: 4,
    recentUpdates: [
      'Tax-loss harvesting implemented successfully',
      'Retirement account optimization completed',
      'Charitable giving strategy finalized'
    ],
    tasks: [
      {
        id: 18,
        task: 'Q3 tax strategy implementation',
        completed: false,
        priority: 'medium',
        assignee: 'Amanda Rodriguez',
        dueDate: '2025-06-25',
        description: 'Execute planned tax strategies for Q3 including loss harvesting'
      },
      {
        id: 19,
        task: 'Retirement account optimization',
        completed: true,
        priority: 'medium',
        assignee: 'Amanda Rodriguez',
        dueDate: '2025-06-15',
        description: 'Maximize retirement account contributions and optimize allocation'
      },
      {
        id: 20,
        task: 'Charitable giving optimization',
        completed: true,
        priority: 'low',
        assignee: 'Amanda Rodriguez',
        dueDate: '2025-06-10',
        description: 'Implement tax-efficient charitable giving strategies'
      },
      {
        id: 21,
        task: 'Tax projection update',
        completed: true,
        priority: 'medium',
        assignee: 'Amanda Rodriguez',
        dueDate: '2025-06-20',
        description: 'Update tax projections for current year and next year planning'
      }
    ]
  },
  'documentation': {
    title: 'Documentation & Compliance',
    icon: <FileText className="h-5 w-5" />,
    progress: 90,
    status: 'excellent',
    priority: 'low',
    advisor: 'Lisa Thompson',
    nextAction: 'Annual compliance review',
    dueDate: 'July 31, 2025',
    estimatedCompletion: 'August 10, 2025',
    completedTasks: 4,
    totalTasks: 5,
    recentUpdates: [
      'All account documentation updated',
      'Compliance monitoring system implemented',
      'Annual review process streamlined'
    ],
    tasks: [
      {
        id: 22,
        task: 'Annual compliance review',
        completed: false,
        priority: 'low',
        assignee: 'Lisa Thompson',
        dueDate: '2025-07-31',
        description: 'Complete annual compliance review and documentation update'
      },
      {
        id: 23,
        task: 'Account documentation update',
        completed: true,
        priority: 'medium',
        assignee: 'Lisa Thompson',
        dueDate: '2025-06-15',
        description: 'Update all account documentation and beneficiary information'
      },
      {
        id: 24,
        task: 'Compliance monitoring setup',
        completed: true,
        priority: 'medium',
        assignee: 'Lisa Thompson',
        dueDate: '2025-06-20',
        description: 'Implement ongoing compliance monitoring and reporting system'
      },
      {
        id: 25,
        task: 'Policy and procedure review',
        completed: true,
        priority: 'low',
        assignee: 'Lisa Thompson',
        dueDate: '2025-06-25',
        description: 'Review and update internal policies and procedures'
      },
      {
        id: 26,
        task: 'Regulatory filing preparation',
        completed: true,
        priority: 'low',
        assignee: 'Lisa Thompson',
        dueDate: '2025-07-01',
        description: 'Prepare and submit required regulatory filings and reports'
      }
    ]
  }
}

interface PlanningJourneyProps {
  isAdvisorView?: boolean
}

export function PlanningJourney({ isAdvisorView = false }: PlanningJourneyProps) {
  const [expandedArea, setExpandedArea] = useState<string | null>('financial-planning')
  const [timeFilter, setTimeFilter] = useState<'current-quarter' | 'next-quarter' | 'all'>('all')

  // Calculate overall progress
  const overallProgress = Math.round(
    Object.values(serviceAreas).reduce((sum, area) => sum + area.progress, 0) / Object.keys(serviceAreas).length
  )

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 60) return 'text-blue-600'
    if (progress >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-100'
    if (progress >= 60) return 'bg-blue-100'
    if (progress >= 40) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleExportReport = () => {
    // Implementation for exporting progress report
    console.log('Exporting progress report...')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isAdvisorView ? 'Service Delivery Management' : 'Your Planning Journey'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your progress across all wealth planning areas
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Filter Controls */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as any)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background"
            >
              <option value="current-quarter">Current Quarter</option>
              <option value="next-quarter">Next Quarter</option>
              <option value="all">All Items</option>
            </select>
          </div>
          
          {/* Export Button */}
          <Button onClick={handleExportReport} variant="outline" style={{ borderColor: "#1E9ADF", color: "#1E9ADF" }}>
            <Download className="h-4 w-4" />
            Export Progress Report
          </Button>
        </div>
      </div>

      {/* Overall Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center text-lg font-semibold",
                  getProgressBgColor(overallProgress),
                  getProgressColor(overallProgress)
                )}>
                  {overallProgress}%
                </div>
                <svg className="absolute inset-0 w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - overallProgress / 100)}`}
                    className={getProgressColor(overallProgress)}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Overall Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {overallProgress}% complete across all service areas
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Next milestone</div>
              <div className="font-medium">Portfolio Rebalancing</div>
              <div className="text-sm text-muted-foreground">Due June 30, 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Areas Grid */}
      <div className="space-y-4">
        {Object.entries(serviceAreas).map(([key, area]) => {
          const isExpanded = expandedArea === key
          const StatusIcon = statusConfig[area.status].icon
          
          return (
            <Card key={key} className="overflow-hidden">
              <div
                className="cursor-pointer"
                onClick={() => setExpandedArea(isExpanded ? null : key)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        {area.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{area.title}</CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <Progress value={area.progress} className="w-24 h-2" />
                            <span className="text-sm font-medium">{area.progress}%</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs", statusConfig[area.status].color)}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {area.status.replace('-', ' ')}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs", priorityConfig[area.priority].color)}
                          >
                            {area.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{area.advisor}</div>
                        <div className="text-xs text-muted-foreground">Advisor</div>
                      </div>
                      <ChevronDown 
                        className={cn(
                          "h-5 w-5 text-muted-foreground transition-transform",
                          isExpanded && "rotate-180"
                        )} 
                      />
                    </div>
                  </div>
                </CardHeader>
              </div>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column - Overview */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Next Action</h4>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="font-medium text-blue-900">{area.nextAction}</div>
                          <div className="text-sm text-blue-700 mt-1">
                            Due: {area.dueDate} • Est. completion: {area.estimatedCompletion}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Recent Updates</h4>
                        <div className="space-y-2">
                          {area.recentUpdates.map((update, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{update}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Tasks */}
                    <div>
                      <h4 className="font-semibold mb-3">
                        Tasks ({area.completedTasks}/{area.totalTasks} completed)
                      </h4>
                      <div className="space-y-2">
                        {area.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={cn(
                              "p-3 rounded-lg border",
                              task.completed 
                                ? "bg-green-50 border-green-200" 
                                : "bg-white border-gray-200"
                            )}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {task.completed ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Clock className="h-4 w-4 text-gray-400" />
                                  )}
                                  <span className={cn(
                                    "text-sm font-medium",
                                    task.completed && "line-through text-gray-500"
                                  )}>
                                    {task.task}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {task.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs">
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {task.assignee}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(task.dueDate)}
                                  </div>
                                  <Badge 
                                    variant="outline" 
                                    className={cn("text-xs", priorityConfig[task.priority].color)}
                                  >
                                    {task.priority}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
} 