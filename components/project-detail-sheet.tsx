"use client"

import React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  X, 
  ChevronUp, 
  Flag, 
  Sparkles, 
  Paperclip, 
  MoreHorizontal,
  ArrowUpRight,
  Share2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TeamMember {
  initials: string
  name: string
  avatar?: string
}

interface Task {
  id: string
  title: string
  status: string
  assignees: TeamMember[]
  subTasksCompleted: number
  totalSubTasks: number
  dueDate: string
}

interface Decision {
  id: string
  title: string
  amount: string
  status: string
  assignee: TeamMember
  stepsCompleted: number
  totalSteps: number
  dueDate: string
}

interface Document {
  id: string
  title: string
  size: string
}

interface ProjectDetailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    id: string
    title: string
    status: string
    description: string
    progress: number
    currentPhase: string
    teamMembers: TeamMember[]
    lastEdited: string
    lastEditedBy: string
    tasks: Task[]
    decisions: Decision[]
    documents: Document[]
    aiInsights?: {
      requiredFromYou: string[]
      recentUpdates: string[]
      currentStatus: string[]
      nextSteps: string[]
    }
  }
}

export function ProjectDetailSheet({ open, onOpenChange, project }: ProjectDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[600px] p-0 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <Button variant="ghost" size="icon" className="p-1 h-6 w-6">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <span>Project Details</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <h2 className="text-lg font-semibold">{project.title}</h2>
                  <Badge variant="secondary" className="px-2 py-0.5 text-xs font-medium">
                    {project.status}
                  </Badge>
                  <div className="flex items-center">
                    <div className="relative flex flex-col items-center justify-center w-6 h-6">
                      <div className="absolute top-0">
                        <ChevronUp className="h-4 w-4 text-blue-600 stroke-[3]" />
                      </div>
                      <div className="absolute top-[6px]">
                        <ChevronUp className="h-4 w-4 text-blue-600 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => onOpenChange(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              {/* Description */}
              <div className="text-sm text-muted-foreground">
                {project.description}
              </div>

              {/* Progress */}
              <div>
                <h3 className="text-lg font-medium">Progress</h3>
                <div className="mt-2">
                  <Progress value={project.progress} className="h-3" />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-black font-medium flex items-center">
                    <Flag className="w-4 h-4 mr-1 text-gray-500" />
                    {project.currentPhase}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">{project.progress}%</span>
                </div>
              </div>

              {/* Recent Update */}
              <div>
                <h3 className="text-lg font-medium">Recent update</h3>
                <p className="mt-1 text-sm text-muted-foreground">No changes yet</p>
              </div>

              {/* Team */}
              <div>
                <h3 className="text-lg font-medium">Team</h3>
                <div className="mt-2 flex -space-x-2">
                  {project.teamMembers.map((member, index) => (
                    <Avatar key={index} className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-muted text-gray-600">{member.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              {/* Last Edited */}
              <div>
                <h3 className="text-lg font-medium">Last edited</h3>
                <p className="mt-1 text-sm text-muted-foreground">1d ago by {project.lastEditedBy}</p>
              </div>

              {/* AI Insights */}
              {project.aiInsights && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-blue-600" />
                    AI Insights
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Identify project bottlenecks, get actionable recommendations, and learn real-time insights on team performance and milestone tracking.
                  </p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-blue-700">Required from you</h4>
                      <ul className="mt-2 space-y-2">
                        {project.aiInsights.requiredFromYou.map((item, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-blue-700">Recent updates</h4>
                      <ul className="mt-2 space-y-2">
                        {project.aiInsights.recentUpdates.map((item, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-blue-700">Current status</h4>
                      <ul className="mt-2 space-y-2">
                        {project.aiInsights.currentStatus.map((item, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-blue-700">Next steps</h4>
                      <ul className="mt-2 space-y-2">
                        {project.aiInsights.nextSteps.map((item, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Ask AI for more details
                  </Button>
                </div>
              )}

              {/* Tasks */}
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  Tasks
                  <Badge variant="secondary" className="ml-1 px-2 py-1 text-xs">
                    {project.tasks.length}
                  </Badge>
                </h3>
                <div className="mt-2 space-y-2">
                  {project.tasks.map((task) => (
                    <div key={task.id} className="p-4 rounded-lg border hover:shadow-md transition-all">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-lg truncate">{task.title}</span>
                        <Button variant="ghost" size="icon" className="h-10 w-10">
                          <MoreHorizontal className="w-5 h-5 text-gray-500" />
                        </Button>
                      </div>
                      <div className="flex items-center mt-1">
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "px-2 py-1 text-sm",
                            task.status === "In progress" && "bg-blue-100 text-blue-800"
                          )}
                        >
                          {task.status}
                        </Badge>
                        <div className="flex -space-x-2 ml-2">
                          {task.assignees.map((assignee, index) => (
                            <Avatar key={index} className="relative flex shrink-0 overflow-hidden rounded-full border-2 border-background w-8 h-8">
                              <AvatarImage src={assignee.avatar} alt={assignee.name} />
                              <AvatarFallback className="bg-muted text-gray-600">{assignee.initials}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                      <div className="h-[1px] w-full bg-border my-3" />
                      <div className="flex items-center justify-start text-sm text-muted-foreground">
                        <span className="inline-block">Sub-tasks: {task.subTasksCompleted}/{task.totalSubTasks}</span>
                        <span className="mx-1">•</span>
                        <span className="inline-block">Due date: {task.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decisions */}
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  Decisions
                  <Badge variant="secondary" className="ml-1 px-2 py-1 text-xs">
                    {project.decisions.length}
                  </Badge>
                </h3>
                <div className="mt-2 space-y-2">
                  {project.decisions.map((decision) => (
                    <div key={decision.id} className="p-4 rounded-lg border hover:shadow-md transition-all">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-lg truncate">{decision.title}</span>
                        <Button variant="ghost" size="icon" className="h-10 w-10">
                          <MoreHorizontal className="w-5 h-5 text-gray-500" />
                        </Button>
                      </div>
                      <div className="text-lg font-normal mt-[-0.5] mb-2 text-[#60646C]">{decision.amount}</div>
                      <div className="flex items-center mt-1">
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "px-2 py-1 text-sm",
                            decision.status === "In progress" && "bg-blue-100 text-blue-800",
                            decision.status === "Needs work" && "bg-yellow-100 text-yellow-800"
                          )}
                        >
                          {decision.status}
                        </Badge>
                        <div className="flex -space-x-2 ml-2">
                          <Avatar className="relative flex shrink-0 overflow-hidden rounded-full border-2 border-background w-8 h-8">
                            <AvatarImage src={decision.assignee.avatar} alt={decision.assignee.name} />
                            <AvatarFallback className="bg-muted text-gray-600">{decision.assignee.initials}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      <div className="h-[1px] w-full bg-border my-3" />
                      <div className="flex items-center justify-start text-sm text-muted-foreground">
                        <span className="inline-block">Steps: {decision.stepsCompleted}/{decision.totalSteps}</span>
                        <span className="mx-1">•</span>
                        <span className="inline-block">Due date: {decision.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  Documents
                  <Badge variant="secondary" className="ml-1 px-2 py-1 text-xs">
                    {project.documents.length}
                  </Badge>
                </h3>
                <div className="mt-2 space-y-2">
                  {project.documents.map((document) => (
                    <div key={document.id} className="flex items-center p-4 rounded-lg border hover:shadow-md transition-all">
                      <div className="flex-shrink-0">
                        <Paperclip className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <span className="font-medium text-md truncate">{document.title}</span>
                        <div className="text-sm text-muted-foreground">{document.size}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 