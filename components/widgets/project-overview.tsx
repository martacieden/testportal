"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowUp, MoreHorizontal, Clock, Flag, ChevronDown, User, Calendar, CheckCircle, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Data structure interfaces
interface TeamMember {
  initials: string;
  name: string;
}

interface RecentUpdate {
  text: string;
  newCount?: number;
}

interface Task {
  id: number;
  task: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: string;
  description: string;
}

type ProjectStatus = "Active" | "Draft" | "Paused";
type ProjectPriority = "high" | "medium" | "low";

interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  priority: ProjectPriority;
  progress: number;
  currentPhase: string;
  lastUpdated: string;
  tasksCompleted: number;
  totalTasks: number;
  decisionsCompleted: number;
  totalDecisions: number;
  teamMembers: TeamMember[];
  recentUpdate: RecentUpdate;
  // New detailed information
  advisor: string;
  nextAction: string;
  dueDate: string;
  estimatedCompletion: string;
  recentUpdates: string[];
  tasks: Task[];
}

// Sample project data
const projects: Project[] = [
  {
    id: "1",
    title: "Financial Planning & Investing",
    status: "Active",
    description: "Develop deep understanding of cash inflows/outflows and build a budget. Time in the market is more important than timing the market - get in early and...",
    priority: "high",
    progress: 75,
    currentPhase: "Strategy Review",
    lastUpdated: "13h ago",
    tasksCompleted: 9,
    totalTasks: 12,
    decisionsCompleted: 1,
    totalDecisions: 3,
    teamMembers: [
      { initials: "PS", name: "Paul Smith" },
      { initials: "RA", name: "Rachel Adams" },
      { initials: "JD", name: "John Doe" },
      { initials: "AK", name: "Anna Karenina" }
    ],
    recentUpdate: {
      text: "Q1 Investment Strategy Review Completed",
      newCount: 7
    },
    advisor: "David Chen",
    nextAction: "Review Q3 portfolio rebalancing strategy",
    dueDate: "June 30, 2025",
    estimatedCompletion: "July 15, 2025",
    recentUpdates: [
      "Emergency fund increased to 8 months of expenses",
      "Reduced tech concentration from 42% to 28%",
      "Implemented tax-loss harvesting strategy"
    ],
    tasks: [
      {
        id: 1,
        task: "Cash flow modeling for exit scenarios",
        completed: true,
        priority: "high",
        assignee: "David Chen",
        dueDate: "2025-06-15",
        description: "Complete financial projections for various exit valuations"
      },
      {
        id: 2,
        task: "Portfolio diversification analysis",
        completed: true,
        priority: "high",
        assignee: "David Chen",
        dueDate: "2025-06-20",
        description: "Analyze current concentration risk and recommend rebalancing"
      },
      {
        id: 3,
        task: "Post-liquidity investment strategy",
        completed: false,
        priority: "high",
        assignee: "David Chen",
        dueDate: "2025-07-01",
        description: "Develop comprehensive investment plan for post-exit wealth"
      },
      {
        id: 4,
        task: "Alternative investment evaluation",
        completed: false,
        priority: "medium",
        assignee: "Sarah Johnson",
        dueDate: "2025-07-15",
        description: "Research private equity, real estate, and hedge fund opportunities"
      }
    ]
  },
  {
    id: "2",
    title: "Taxes",
    status: "Draft",
    description: "Develop a relationship with a CPA to help begin tax planning - the earlier you start, the better the results. Learn about ways to reduce taxes through payro...",
    priority: "medium",
    progress: 0,
    currentPhase: "Tax Planning Phase",
    lastUpdated: "1d ago",
    tasksCompleted: 0,
    totalTasks: 8,
    decisionsCompleted: 0,
    totalDecisions: 2,
    teamMembers: [
      { initials: "JF", name: "Jane Foster" },
      { initials: "MK", name: "Mary Kay" },
      { initials: "SL", name: "Sarah Lee" }
    ],
    recentUpdate: {
      text: "No changes yet"
    },
    advisor: "Amanda Rodriguez",
    nextAction: "Schedule initial tax planning consultation",
    dueDate: "July 10, 2025",
    estimatedCompletion: "July 25, 2025",
    recentUpdates: [
      "Tax planning questionnaire completed",
      "Initial consultation scheduled",
      "Documentation requirements identified"
    ],
    tasks: [
      {
        id: 5,
        task: "Schedule initial consultation",
        completed: false,
        priority: "high",
        assignee: "Amanda Rodriguez",
        dueDate: "2025-07-10",
        description: "Book initial tax planning consultation with CPA"
      },
      {
        id: 6,
        task: "Gather tax documents",
        completed: false,
        priority: "high",
        assignee: "Client",
        dueDate: "2025-07-15",
        description: "Collect all relevant tax documents for review"
      },
      {
        id: 7,
        task: "Tax strategy development",
        completed: false,
        priority: "medium",
        assignee: "Amanda Rodriguez",
        dueDate: "2025-07-20",
        description: "Develop comprehensive tax planning strategy"
      }
    ]
  },
];

const statusColors: Record<ProjectStatus, string> = {
  Active: "bg-blue-100 text-blue-800",
  Draft: "bg-gray-200 text-gray-800",
  Paused: "bg-yellow-100 text-yellow-800",
};

const priorityIcons: Record<ProjectPriority, React.ReactNode> = {
  high: <ArrowUp className="h-4 w-4 text-red-500" />,
  medium: <ArrowUp className="h-4 w-4 text-yellow-500" />,
  low: <ArrowUp className="h-4 w-4 text-green-500" />,
};

const priorityConfig: Record<string, { color: string }> = {
  high: { color: 'bg-red-100 text-red-800 border-red-200' },
  medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  low: { color: 'bg-green-100 text-green-800 border-green-200' }
};

export function ProjectOverviewWidget() {
  const router = useRouter()
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const handleProjectClick = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>My Projects</CardTitle>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium ml-2 md:ml-4">
              {projects.filter(p => p.status === "Active").length} Active
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.slice(0, 2).map((project) => {
            const isExpanded = expandedProject === project.id
            
            return (
              <div 
                key={project.id} 
                className="rounded-lg border border-gray-200 overflow-hidden"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                {/* Main Project Card */}
                <div 
                  className="p-6 cursor-pointer space-y-4"
                  onClick={() => handleProjectClick(project.id)}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-md" style={{ color: "#063852" }}>{project.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <Badge variant="secondary" className={`${statusColors[project.status]} font-medium`}>{project.status}</Badge>
                      {priorityIcons[project.priority]}
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          isExpanded && "rotate-180"
                        )} 
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 line-clamp-2" style={{ color: "#636466" }}>{project.description}</p>

                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 text-sm" style={{ color: "#636466" }}>
                        <Flag className="h-4 w-4" />
                        <span>{project.currentPhase}</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: "#063852" }}>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 [&>div]:bg-green-500" />
                  </div>

                  {/* Team & Stats */}
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-1">
                      {project.teamMembers.map((member) => (
                        <Avatar key={member.initials} className="w-6 h-6 border-2 border-white">
                          <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs" style={{ color: "#636466" }}>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{project.lastUpdated}</span>
                      </div>
                      <span>Tasks: {project.tasksCompleted}/{project.totalTasks}</span>
                      <span>Decisions: {project.decisionsCompleted}/{project.totalDecisions}</span>
                    </div>
                  </div>

                  {/* Recent Update */}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <p className="text-sm" style={{ color: "#636466" }}>
                        Recent update: <span className="font-medium text-gray-700">{project.recentUpdate.text}</span>
                      </p>
                      {project.recentUpdate.newCount && project.recentUpdate.newCount > 0 && (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{project.recentUpdate.newCount} new</Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Left Column - Overview */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: "#063852" }}>Next Action</h4>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="font-medium text-blue-900">{project.nextAction}</div>
                            <div className="text-sm text-blue-700 mt-1">
                              Due: {project.dueDate} • Est. completion: {project.estimatedCompletion}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: "#063852" }}>Recent Updates</h4>
                          <div className="space-y-2">
                            {project.recentUpdates.map((update, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span style={{ color: "#636466" }}>{update}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: "#063852" }}>Project Advisor</h4>
                          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs" style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>
                                {project.advisor.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium" style={{ color: "#063852" }}>{project.advisor}</div>
                              <div className="text-xs" style={{ color: "#636466" }}>Lead Advisor</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Tasks */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: "#063852" }}>
                          Tasks ({project.tasksCompleted}/{project.totalTasks} completed)
                          <span className="ml-2 md:ml-4"></span>
                        </h4>
                        <div className="space-y-2">
                          {project.tasks.map((task) => (
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

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/dashboard/projects/${project.id}`)
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          View Full Project
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 