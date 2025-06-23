"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProjectDetailSheet } from "./project-detail-sheet"

// Example usage of the ProjectDetailSheet component
export function ProjectDetailSheetExample() {
  const [isOpen, setIsOpen] = useState(false)

  // Sample project data
  const sampleProject = {
    id: "2",
    title: "Taxes",
    status: "Draft",
    description: "Develop a relationship with a CPA to help begin tax planning - the earlier you start, the better the results. Learn about ways to reduce taxes through payroll withholdings, credits and deductions. Leverage tax-loss harvesting managers to tax-efficiently manage investments.",
    progress: 0,
    currentPhase: "Tax Planning Phase",
    teamMembers: [
      { initials: "JF", name: "Jane Foster", avatar: "/placeholder-user.jpg" },
      { initials: "MK", name: "Mike Kelly", avatar: "/placeholder-user.jpg" },
      { initials: "SL", name: "Sarah Lee", avatar: "/placeholder-user.jpg" }
    ],
    lastEdited: "1d ago",
    lastEditedBy: "Jane Foster",
    tasks: [
      {
        id: "1",
        title: "Tax Strategy Review",
        status: "In progress",
        assignees: [
          { initials: "JF", name: "Jane Foster" },
          { initials: "MK", name: "Mike Kelly" }
        ],
        subTasksCompleted: 0,
        totalSubTasks: 5,
        dueDate: "Mar 20, 2024"
      },
      {
        id: "2",
        title: "Documentation Update",
        status: "In progress",
        assignees: [
          { initials: "JF", name: "Jane Foster" },
          { initials: "MK", name: "Mike Kelly" }
        ],
        subTasksCompleted: 0,
        totalSubTasks: 5,
        dueDate: "Mar 20, 2024"
      }
    ],
    decisions: [
      {
        id: "1",
        title: "Approve Exit Strategy",
        amount: "16,000 USD",
        status: "Needs work",
        assignee: { initials: "PS", name: "Paul Smith" },
        stepsCompleted: 2,
        totalSteps: 5,
        dueDate: "Mar 15, 2024"
      },
      {
        id: "2",
        title: "Evaluate Investment Options",
        amount: "16,000 USD",
        status: "In progress",
        assignee: { initials: "RA", name: "Rachel Adams" },
        stepsCompleted: 3,
        totalSteps: 6,
        dueDate: "Mar 20, 2024"
      },
      {
        id: "3",
        title: "Confirm Tax Strategy",
        amount: "16,000 USD",
        status: "In progress",
        assignee: { initials: "JD", name: "John Doe" },
        stepsCompleted: 1,
        totalSteps: 4,
        dueDate: "Mar 25, 2024"
      },
      {
        id: "4",
        title: "Review Legal Compliance",
        amount: "16,000 USD",
        status: "In progress",
        assignee: { initials: "AK", name: "Alice Kim" },
        stepsCompleted: 4,
        totalSteps: 7,
        dueDate: "Apr 1, 2024"
      },
      {
        id: "5",
        title: "Assess Market Conditions",
        amount: "16,000 USD",
        status: "Needs work",
        assignee: { initials: "MP", name: "Mark Peterson" },
        stepsCompleted: 2,
        totalSteps: 5,
        dueDate: "Apr 5, 2024"
      }
    ],
    documents: [
      {
        id: "1",
        title: "Tax Planning Checklist",
        size: "0.8MB"
      }
    ],
    aiInsights: {
      requiredFromYou: [
        "Review and approve pending decisions",
        "Update task progress and deadlines",
        "Provide feedback on team suggestions"
      ],
      recentUpdates: [
        "0 tasks completed",
        "New team member added",
        "Progress increased by 15%"
      ],
      currentStatus: [
        "8 tasks in progress",
        "Upcoming milestone next week",
        "Team collaboration needed"
      ],
      nextSteps: [
        "Review tax implications",
        "Schedule team sync",
        "Update documentation"
      ]
    }
  }

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>
        Open Project Detail Sheet
      </Button>
      
      <ProjectDetailSheet
        open={isOpen}
        onOpenChange={setIsOpen}
        project={sampleProject}
      />
    </div>
  )
} 