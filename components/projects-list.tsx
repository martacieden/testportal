"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter, Search, MoreHorizontal, MessageSquare, X, ArrowUpRight, Users, Share2 } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"

// Add prop type
type ProjectsListProps = {
  onProjectClick?: (id: string) => void;
};

export default function ProjectsList({ onProjectClick }: ProjectsListProps) {
  const [showPanel, setShowPanel] = useState(false)

  // Example project data for Estate Planning
  const project = {
    name: "Spousal Lifetime Access Trust",
    workspace: "Smith Family",
    priority: "Emergency",
    status: "In progress",
    createdBy: "John Smith",
    createdByAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    createdOn: "Sep 19, 2024",
    description:
      "This project aims to establish a Spousal Lifetime Access Trust (SLAT) as a strategic estate planning vehicle that balances tax efficiency with family access to assets. The SLAT will be designed to leverage current gift tax exemptions while providing continued financial security.",
    progress: {
      notStarted: 1,
      inProgress: 7,
      completed: 9,
    },
    recentUpdate: {
      text: "We've completed a comprehensive review of the SLAT trust agreement draft with outside counsel",
      count: 2,
    },
    lastModified: "2 hours ago",
    avatars: [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/men/32.jpg",
      "/placeholder-user.jpg",
    ],
    moreUsers: 6,
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header with Info Banner */}
        <div>
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                + New update
              </Button>
              <Button size="sm" variant="brand">
                + New project
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Estate Planning Card */}
          <div
            className="p-6 rounded-lg shadow-sm border border-neutral-200 cursor-pointer bg-white"
            onClick={() => onProjectClick?.("1")}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {project.name}
              </h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4 text-text-tertiary" />
              </Button>
            </div>
            <p className="text-sm mb-4 text-text-secondary">
              {project.description}
            </p>
            <div className="w-full bg-neutral-200 rounded-full h-2 mb-2">
              <div className="h-2 rounded-full flex">
                <div className="h-2 rounded-l-full" style={{ width: "53%", backgroundColor: "#10B981" }}></div>
                <div className="h-2" style={{ width: "41%", backgroundColor: "#1E9ADF" }}></div>
                <div className="h-2 rounded-r-full" style={{ width: "6%", backgroundColor: "#E5E7EB" }}></div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs text-text-tertiary">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10B981" }}></div>
                <span>Completed: 9</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1E9ADF" }}></div>
                <span>In progress: 7</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E5E7EB" }}></div>
                <span>Not started: 1</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="text-sm whitespace-nowrap text-text-tertiary">
                  Recent update:
                </span>
                <Avatar className="w-6 h-6">
                  <AvatarImage src={project.avatars[2]} alt="JF" />
                  <AvatarFallback>JF</AvatarFallback>
                </Avatar>
                <span className="text-sm truncate text-text-tertiary">
                  We've completed a comprehensive review of the SLAT tru...
                </span>
              </div>
              <div
                className="flex items-center space-x-1 px-2 py-1 rounded border flex-shrink-0 ml-2 bg-neutral-50 border-neutral-200"
              >
                <MessageSquare className="h-4 w-4 text-text-tertiary" />
                <span className="text-sm whitespace-nowrap text-text-tertiary">
                  2 new
                </span>
              </div>
            </div>
          </div>

          {/* Spousal Lifetime Access Trust Card */}
          <div className="p-6 rounded-lg shadow-sm border border-neutral-200 bg-white">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Spousal Lifetime Access Trust
              </h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4 text-text-tertiary" />
              </Button>
            </div>

            <p className="text-sm mb-4 text-text-secondary">
              This project aims to establish a Spousal Lifetime Access Trust (SLAT) as a strategic estate planning vehicle
              that balances tax efficiency with family access to assets. The SLAT will b...
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-neutral-200 rounded-full h-2 mb-2">
                <div className="h-2 rounded-full flex">
                  <div className="h-2 rounded-l-full" style={{ width: "53%", backgroundColor: "#10B981" }}></div>
                  <div className="h-2" style={{ width: "41%", backgroundColor: "#1E9ADF" }}></div>
                  <div className="h-2 rounded-r-full" style={{ width: "6%", backgroundColor: "#E5E7EB" }}></div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs text-text-tertiary">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10B981" }}></div>
                  <span>Completed: 9</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1E9ADF" }}></div>
                  <span>In progress: 7</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E5E7EB" }}></div>
                  <span>Not started: 1</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="text-sm whitespace-nowrap text-text-tertiary">
                  Recent update:
                </span>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="SC" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span className="text-sm truncate text-text-tertiary">
                  SLAT Trust Document Review Completed
                </span>
              </div>
              <div
                className="flex items-center space-x-1 px-2 py-1 rounded border flex-shrink-0 ml-2 bg-neutral-50 border-neutral-200"
              >
                <MessageSquare className="h-4 w-4 text-text-tertiary" />
                <span className="text-sm whitespace-nowrap text-text-tertiary">
                  1 new
                </span>
              </div>
            </div>
          </div>

          {/* Credit & Lending Card */}
          <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: "#FFFFFF", borderColor: "#F1F3F4" }}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: "#063852" }}>
                Credit & Lending
              </h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" style={{ color: "#636466" }} />
              </Button>
            </div>

            <p className="text-sm mb-4" style={{ color: "#636466" }}>
              Monitor credit score to ensure future lendability. Shop around different banks and credit unions for the
              best mortgage rates / lending products. Avoid non-productive debt (e.g., cr...
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="h-2 rounded-full w-full" style={{ backgroundColor: "#10B981" }}></div>
              </div>
              <div className="flex items-center space-x-4 text-xs" style={{ color: "#636466" }}>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10B981" }}></div>
                  <span>Completed: 36</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="text-sm whitespace-nowrap" style={{ color: "#636466" }}>
                  Recent update:
                </span>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="AR" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <span className="text-sm truncate" style={{ color: "#636466" }}>
                  Analysis Report Finalized
                </span>
              </div>
              <div
                className="flex items-center space-x-1 px-2 py-1 rounded border flex-shrink-0 ml-2"
                style={{ backgroundColor: "#F8F9FA", borderColor: "#E5E7EB" }}
              >
                <MessageSquare className="h-4 w-4" style={{ color: "#636466" }} />
                <span className="text-sm whitespace-nowrap" style={{ color: "#636466" }}>
                  1 new
                </span>
              </div>
            </div>
          </div>

          {/* Taxes Card */}
          <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: "#FFFFFF", borderColor: "#F1F3F4" }}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: "#063852" }}>
                Taxes
              </h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" style={{ color: "#636466" }} />
              </Button>
            </div>

            <p className="text-sm mb-4" style={{ color: "#636466" }}>
              Develop a relationship with a CPA to help begin tax planning - the earlier you start, the better the
              results. Learn about ways to reduce taxes through payroll withholdings, credits...
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="h-2 rounded-full" style={{ width: "5%", backgroundColor: "#E5E7EB" }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm" style={{ color: "#636466" }}>
                  Recent update:
                </span>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/65.jpg" alt="Taxes" />
                  <AvatarFallback>TX</AvatarFallback>
                </Avatar>
                <span className="text-sm" style={{ color: "#636466" }}>
                  No changes yet
                </span>
              </div>
            </div>
          </div>

          {/* Cyber Security Card */}
          <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: "#FFFFFF", borderColor: "#F1F3F4" }}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: "#063852" }}>
                Cyber Security
              </h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" style={{ color: "#636466" }} />
              </Button>
            </div>

            <p className="text-sm mb-4" style={{ color: "#636466" }}>
              Review cyber security best practices (use a password manager, understand who knows your WiFi password).
              Connect with a cyber security partner for penetration assessment.
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="h-2 rounded-full flex">
                  <div className="h-2 rounded-l-full" style={{ width: "31%", backgroundColor: "#10B981" }}></div>
                  <div className="h-2" style={{ width: "31%", backgroundColor: "#1E9ADF" }}></div>
                  <div className="h-2 rounded-r-full" style={{ width: "38%", backgroundColor: "#E5E7EB" }}></div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs" style={{ color: "#636466" }}>
                <span>Not started: 6</span>
                <span>In progress: 5</span>
                <span>Completed: 5</span>
                <span>Blocked: 0</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm" style={{ color: "#636466" }}>
                  Recent update:
                </span>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/12.jpg" alt="Cyber Security" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <span className="text-sm" style={{ color: "#636466" }}>
                  No changes yet
                </span>
              </div>
            </div>
          </div>

          {/* Risk Management Card */}
          <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: "#FFFFFF", borderColor: "#F1F3F4" }}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: "#063852" }}>
                Risk Management
              </h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" style={{ color: "#636466" }} />
              </Button>
            </div>

            <p className="text-sm mb-4" style={{ color: "#636466" }}>
              Use an insurance broker to do comprehensive review of policies and gaps (P&C, umbrella, life insurance).
              Keep policies bundled with one carrier for additional discounts. Join profes...
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="h-2 rounded-full flex">
                  <div className="h-2 rounded-l-full" style={{ width: "18%", backgroundColor: "#1E9ADF" }}></div>
                  <div className="h-2 rounded-r-full" style={{ width: "82%", backgroundColor: "#E5E7EB" }}></div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs" style={{ color: "#636466" }}>
                <span>Not started: 2</span>
                <span>In progress: 9</span>
                <span>Completed: 0</span>
                <span>Blocked: 0</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm" style={{ color: "#636466" }}>
                  Recent update:
                </span>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/68.jpg" alt="Risk Management" />
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
                <span className="text-sm" style={{ color: "#636466" }}>
                  No changes yet
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPanel && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-lg border-l z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Button variant="ghost" size="icon" className="p-1 h-6 w-6">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <span>1 of 6 in Projects</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <div className="flex -space-x-2">
                  {project.avatars.map((src, i) => (
                    <Avatar key={i} className="w-6 h-6 border-2 border-white">
                      <AvatarImage src={src} alt="user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">+{project.moreUsers}</div>
                </div>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                Last modified by
                <Avatar className="w-5 h-5">
                  <AvatarImage src={project.createdByAvatar} alt={project.createdBy} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                2 hours ago
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowPanel(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b px-4 gap-2 bg-white">
            <button className="px-3 py-2 text-sm font-medium border-b-2 border-blue-600 text-blue-600">Overview</button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500">Comments</button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500">History</button>
          </div>

          {/* Details Section */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <div className="font-semibold mb-2 text-gray-900">Details</div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div><span className="font-semibold">Workspace:</span> {project.workspace}</div>
                <div><span className="font-semibold">Priority:</span> <span className="text-red-500">{project.priority}</span></div>
                <div><span className="font-semibold">Status:</span> <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-xs text-blue-800 font-medium">{project.status}</span></div>
                <div><span className="font-semibold">Created by:</span> {project.createdBy}</div>
                <div><span className="font-semibold">Created on:</span> {project.createdOn}</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Description</div>
                <div className="text-gray-700 text-sm">{project.description}</div>
              </div>
            </div>
            {/* Progress Bar Section */}
            <div>
              <div className="font-semibold mb-1">Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="h-2 rounded-full flex">
                  <div className="h-2 rounded-l-full" style={{ width: "53%", backgroundColor: "#10B981" }}></div>
                  <div className="h-2" style={{ width: "41%", backgroundColor: "#1E9ADF" }}></div>
                  <div className="h-2 rounded-r-full" style={{ width: "6%", backgroundColor: "#E5E7EB" }}></div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs" style={{ color: "#636466" }}>
                <span>Not started: {project.progress.notStarted}</span>
                <span>In progress: {project.progress.inProgress}</span>
                <span>Completed: {project.progress.completed}</span>
              </div>
            </div>
            {/* Recent Update Section */}
            <div>
              <div className="font-semibold mb-1 flex items-center gap-2">Recent update <span className="flex items-center px-2 py-0.5 rounded bg-gray-100 text-xs"><MessageSquare className="h-4 w-4 mr-1" /> {project.recentUpdate.count} new</span></div>
              <div className="text-sm">{project.recentUpdate.text}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
