"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Calendar, Users } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  status: string
  progress: number
  priority: number
  dueDate: string
  team: {
    name: string
    avatar: string
  }[]
  lastUpdated: string
}

interface ProjectCardProps {
  project: Project
  onProjectClick?: (projectId: string) => void
}

export default function ProjectCard({ project, onProjectClick }: ProjectCardProps) {
  const handleClick = () => {
    onProjectClick?.(project.id)
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return { bg: "#FEF2F2", text: "#DC2626" }
      case 2:
        return { bg: "#FFFBEB", text: "#D97706" }
      case 3:
        return { bg: "#EFF6FF", text: "#2563EB" }
      default:
        return { bg: "#F3F4F6", text: "#6B7280" }
    }
  }

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#F1F3F4" }}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col space-y-1.5 p-0">
          {/* Header with title, status, priority, and menu */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-grow">
              <Link 
                href={`/dashboard/projects/${project.id}`}
                className="hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-semibold tracking-tight text-lg" style={{ color: "#063852" }}>
                  {project.title}
                </h3>
              </Link>
              <Badge 
                className="ml-2 px-2 py-0.5 text-xs font-medium"
                style={{ backgroundColor: "#E6F3FF", color: "#1E9ADF" }}
              >
                {project.status}
              </Badge>
            </div>
            
            <Button 
              variant="ghost" 
              size="small" 
              className="h-10 w-10"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" style={{ color: "#444444" }} />
            </Button>
          </div>

          {/* Description */}
          <div className="text-sm mt-2" style={{ color: "#444444" }}>
            {project.description}
          </div>

          {/* Progress section */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: "#444444" }}>Progress</span>
              <span className="text-sm font-medium" style={{ color: "#063852" }}>
                {project.progress}%
              </span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          {/* Project details */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" style={{ color: "#444444" }} />
                <span className="text-sm" style={{ color: "#444444" }}>
                  {new Date(project.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" style={{ color: "#444444" }} />
                <span className="text-sm" style={{ color: "#444444" }}>
                  {project.team.length} members
                </span>
              </div>
            </div>
            <Badge
              variant="small"
              style={{
                backgroundColor: getPriorityColor(project.priority).bg,
                color: getPriorityColor(project.priority).text
              }}
            >
              P{project.priority}
            </Badge>
          </div>

          {/* Team members */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex -space-x-2">
              {project.team.map((member, index) => (
                <Avatar key={index} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs" style={{ color: "#444444" }}>
              Updated {project.lastUpdated}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 