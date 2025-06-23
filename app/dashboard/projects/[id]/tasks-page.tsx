"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Grid, List, Plus } from "lucide-react"

const sampleTasks = [
  {
    title: "Define SLAT Objectives",
    status: "Completed",
    assignees: ["PS"],
    subTasks: 5,
    subTasksDone: 5,
    due: "Jan 15, 2025"
  },
  {
    title: "Select Trust Jurisdiction",
    status: "Completed",
    assignees: ["RA"],
    subTasks: 4,
    subTasksDone: 4,
    due: "Jan 22, 2025"
  },
  {
    title: "Review Marital Property Status",
    status: "Completed",
    assignees: ["JD"],
    subTasks: 3,
    subTasksDone: 3,
    due: "Jan 28, 2025"
  },
  {
    title: "Draft Trust Documents",
    status: "In progress",
    assignees: ["AK"],
    subTasks: 6,
    subTasksDone: 4,
    due: "Feb 10, 2025"
  },
  {
    title: "Identify Trust Funding Assets",
    status: "In progress",
    assignees: ["MP"],
    subTasks: 5,
    subTasksDone: 3,
    due: "Feb 15, 2025"
  },
  {
    title: "Appoint Trustees",
    status: "In progress",
    assignees: ["PS", "RA"],
    subTasks: 4,
    subTasksDone: 2,
    due: "Feb 22, 2025"
  },
  {
    title: "Develop Distribution Guidelines",
    status: "Not started",
    assignees: ["JD"],
    subTasks: 4,
    subTasksDone: 0,
    due: "Mar 1, 2025"
  },
  {
    title: "Coordinate with Existing Estate Plan",
    status: "Not started",
    assignees: ["AK"],
    subTasks: 3,
    subTasksDone: 0,
    due: "Mar 8, 2025"
  }
]

const statusColors = {
  "Completed": "bg-green-100 text-green-800",
  "In progress": "bg-blue-100 text-blue-800",
  "Not started": "bg-gray-100 text-gray-800"
}

export default function TasksPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div className="flex flex-col gap-6">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Project tasks</h2>
          <p className="text-gray-500">Track and manage your project tasks and assignments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={view === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setView('grid')}><Grid className="w-4 h-4" /></Button>
          <Button variant={view === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setView('list')}><List className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm"><Plus className="w-4 h-4 mr-1" /> New task</Button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleTasks.map((task, idx) => (
          <Card key={idx} className="p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className={(statusColors as Record<string, string>)[task.status] + ' text-xs font-medium px-2 py-0.5'}>{task.status}</Badge>
                {task.assignees.map((a, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs font-medium ml-1 border border-gray-200">{a}</span>
                ))}
              </div>
              <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
            </div>
            <div className="font-semibold text-base mt-1 mb-2">{task.title}</div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Sub-tasks: {task.subTasksDone}/{task.subTasks}</span>
              <span>Due date: {task.due}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 